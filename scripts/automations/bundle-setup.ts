import { marked } from "marked";
import * as cheerio from "cheerio";
import { getProductBySku } from "../../functions/products/getProductBySKU";
import OpenAI from "openai";
import { beautyfeaturesPrompt } from "../../chat/prompts";
import { getAllProductImages } from "../../functions/images/getAllProductImages";
import { writeFile } from "fs/promises";
import path from "path";
import Replicate from "replicate";
import { createProductImageFromBuffer } from "../../functions/images/createProductImage";
import { updateProduct } from "../../functions/products/updateProduct";
require("../../config/config").config("bf");
const replicate = new Replicate({
  auth: process.env.REPLICATE_API_KEY,
});

/*
  this is an export from perceptium
*/
const bundleMapping = [
  {
    bundle_sku: "100047",
    bundle_name: "Decleor Face Essential Cleansing Salon Size Duo",
    component_sku: "6800",
    component_name: "Decleor Aroma Cleanse Cleansing Milk with Neroli 400ml",
    component_qty: 1,
  },
  {
    bundle_sku: "100047",
    bundle_name: "Decleor Face Essential Cleansing Salon Size Duo",
    component_sku: "6801",
    component_name: "Decleor Aroma Cleanse Tonifying Lotion with Neroli 400ml",
    component_qty: 1,
  },
  {
    bundle_sku: "100870A",
    bundle_name: "Angelsounds Fetal Doppler - Pocket Size",
    component_sku: "100870",
    component_name: "Angelsounds Fetal Doppler - Pocket Size",
    component_qty: 1,
  },
  {
    bundle_sku: "100870A",
    bundle_name: "Angelsounds Fetal Doppler - Pocket Size",
    component_sku: "4707",
    component_name: "Ultrasound Gel 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "100918",
    bundle_name: "Fertility Bundle 50% OFF",
    component_sku: "40976",
    component_name: "Early Pregnancy Tests - 10 Pack",
    component_qty: 1,
  },
  {
    bundle_sku: "100918",
    bundle_name: "Fertility Bundle 50% OFF",
    component_sku: "40977",
    component_name: "Ovulation Tests - 10 Tests",
    component_qty: 1,
  },
  {
    bundle_sku: "100918",
    bundle_name: "Fertility Bundle 50% OFF",
    component_sku: "4204",
    component_name: "Preseed - Sperm Friendly Lubricant",
    component_qty: 1,
  },
  {
    bundle_sku: "10097",
    bundle_name: "Olaplex Complete Collection",
    component_sku: "5183",
    component_name: "OLAPLEX No. 3 Hair Perfector 100ml",
    component_qty: 1,
  },
  {
    bundle_sku: "10097",
    bundle_name: "Olaplex Complete Collection",
    component_sku: "7179",
    component_name: "Olaplex No.4 Bond Maintenance Shampoo 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "10097",
    bundle_name: "Olaplex Complete Collection",
    component_sku: "7180",
    component_name: "Olaplex No.5 Bond Maintenance Conditioner 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "10097",
    bundle_name: "Olaplex Complete Collection",
    component_sku: "7604",
    component_name: "Olaplex No.6 Bond Smoother",
    component_qty: 1,
  },
  {
    bundle_sku: "10097",
    bundle_name: "Olaplex Complete Collection",
    component_sku: "7924",
    component_name: "Olaplex No.7 Bonding Oil 30ml",
    component_qty: 1,
  },
  {
    bundle_sku: "10097",
    bundle_name: "Olaplex Complete Collection",
    component_sku: "8799",
    component_name:
      "Olaplex No.0 Intensive Bond Building Treatment 155ml Spray Nozzle",
    component_qty: 1,
  },
  {
    bundle_sku: "10097",
    bundle_name: "Olaplex Complete Collection",
    component_sku: "9949",
    component_name: "Olaplex No.8 Bond Intense Moisture Mask 100ml",
    component_qty: 1,
  },
  {
    bundle_sku: "10098",
    bundle_name: "Olaplex Protect and Care Solution Bundle",
    component_sku: "7604",
    component_name: "Olaplex No.6 Bond Smoother",
    component_qty: 1,
  },
  {
    bundle_sku: "10098",
    bundle_name: "Olaplex Protect and Care Solution Bundle",
    component_sku: "7924",
    component_name: "Olaplex No.7 Bonding Oil 30ml",
    component_qty: 1,
  },
  {
    bundle_sku: "10098",
    bundle_name: "Olaplex Protect and Care Solution Bundle",
    component_sku: "9949",
    component_name: "Olaplex No.8 Bond Intense Moisture Mask 100ml",
    component_qty: 1,
  },
  {
    bundle_sku: "10123",
    bundle_name: "Kerastase Ultime Bundle",
    component_sku: "8722",
    component_name:
      "Kerastase Elixir Ultime Sublime Cleansing Oil Shampoo 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "10123",
    bundle_name: "Kerastase Ultime Bundle",
    component_sku: "9142",
    component_name: "Kerastase Elixir Ultime Masque 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "10123",
    bundle_name: "Kerastase Ultime Bundle",
    component_sku: "9144",
    component_name: "Kerastase Elixir Ultime Soin 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "10123",
    bundle_name: "Kerastase Ultime Bundle",
    component_sku: "KER_E022410",
    component_name: "Kerastase  Elixir Ultime 100ml",
    component_qty: 1,
  },
  {
    bundle_sku: "10127",
    bundle_name: "Moroccanoil Blow-Dry Collection - Free 25ml Treatment Oil",
    component_sku: "5885",
    component_name: "Moroccanoil Blow-Dry Concentrate 50ml",
    component_qty: 1,
  },
  {
    bundle_sku: "10127",
    bundle_name: "Moroccanoil Blow-Dry Collection - Free 25ml Treatment Oil",
    component_sku: "6868",
    component_name: "Moroccanoil Body Dry Body Oil 100ml",
    component_qty: 1,
  },
  {
    bundle_sku: "10127",
    bundle_name: "Moroccanoil Blow-Dry Collection - Free 25ml Treatment Oil",
    component_sku: "MOR_MO0029",
    component_name: "Moroccanoil Treatment - 25ml",
    component_qty: 1,
  },
  {
    bundle_sku: "10128",
    bundle_name: "Moroccanoil Curl Collection Bundle - Free 25ml Treatment Oil",
    component_sku: "5874",
    component_name:
      "Moroccanoil Luminous Hairspray Strong Hold Travel Size 75ml",
    component_qty: 1,
  },
  {
    bundle_sku: "10128",
    bundle_name: "Moroccanoil Curl Collection Bundle - Free 25ml Treatment Oil",
    component_sku: "MOR_MO0006",
    component_name: "Moroccanoil Intense Curl Cream - 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "10128",
    bundle_name: "Moroccanoil Curl Collection Bundle - Free 25ml Treatment Oil",
    component_sku: "MOR_MO0029",
    component_name: "Moroccanoil Treatment - 25ml",
    component_qty: 1,
  },
  {
    bundle_sku: "10128",
    bundle_name: "Moroccanoil Curl Collection Bundle - Free 25ml Treatment Oil",
    component_sku: "MOR_MO0053",
    component_name: "Moroccanoil - Curl Defining Cream 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "10128",
    bundle_name: "Moroccanoil Curl Collection Bundle - Free 25ml Treatment Oil",
    component_sku: "MOR_MO0054",
    component_name: "Moroccanoil - Curl Control Mousse 150ml",
    component_qty: 1,
  },
  {
    bundle_sku: "10129",
    bundle_name: "Moroccanoil Dry Shampoo Bundle",
    component_sku: "5022",
    component_name: "Moroccanoil - Dry Shampoo Dark Tones 205ml",
    component_qty: 1,
  },
  {
    bundle_sku: "10129",
    bundle_name: "Moroccanoil Dry Shampoo Bundle",
    component_sku: "5023",
    component_name: "Moroccanoil - Dry Shampoo Light Tones 217ml",
    component_qty: 1,
  },
  {
    bundle_sku: "10130",
    bundle_name: "Moroccanoil Dry Shampoo Collection - Free 25ml Treatment Oil",
    component_sku: "5022",
    component_name: "Moroccanoil - Dry Shampoo Dark Tones 205ml",
    component_qty: 1,
  },
  {
    bundle_sku: "10130",
    bundle_name: "Moroccanoil Dry Shampoo Collection - Free 25ml Treatment Oil",
    component_sku: "5023",
    component_name: "Moroccanoil - Dry Shampoo Light Tones 217ml",
    component_qty: 1,
  },
  {
    bundle_sku: "10130",
    bundle_name: "Moroccanoil Dry Shampoo Collection - Free 25ml Treatment Oil",
    component_sku: "9797",
    component_name: "Moroccanoil Dry Texture Spray 60ml",
    component_qty: 1,
  },
  {
    bundle_sku: "10130",
    bundle_name: "Moroccanoil Dry Shampoo Collection - Free 25ml Treatment Oil",
    component_sku: "MOR_MO0029",
    component_name: "Moroccanoil Treatment - 25ml",
    component_qty: 1,
  },
  {
    bundle_sku: "10130",
    bundle_name: "Moroccanoil Dry Shampoo Collection - Free 25ml Treatment Oil",
    component_sku: "MOR_MO0075",
    component_name: "Moroccanoil Dry Scalp Treatment - 45ml",
    component_qty: 1,
  },
  {
    bundle_sku: "10131",
    bundle_name:
      "Moroccanoil Extra Volume Shampoo & Conditioner 500ml - Free 25ml Treatment Oil",
    component_sku: "MOR_BUNDLE",
    component_name: "Moroccanoil Extra Volume Shampoo & Conditioner 500ml DUO",
    component_qty: 1,
  },
  {
    bundle_sku: "10131",
    bundle_name:
      "Moroccanoil Extra Volume Shampoo & Conditioner 500ml - Free 25ml Treatment Oil",
    component_sku: "MOR_MO0029",
    component_name: "Moroccanoil Treatment - 25ml",
    component_qty: 1,
  },
  {
    bundle_sku: "10132",
    bundle_name:
      "Moroccanoil Hydrating Shampoo & Conditioner 500ml - Free 25ml Treatment Oil",
    component_sku: "MOR_MO0029",
    component_name: "Moroccanoil Treatment - 25ml",
    component_qty: 1,
  },
  {
    bundle_sku: "10132",
    bundle_name:
      "Moroccanoil Hydrating Shampoo & Conditioner 500ml - Free 25ml Treatment Oil",
    component_sku: "MOR_MO0098",
    component_name: "Moroccanoil Hydrating Shampoo & Conditioner 500ml DUO",
    component_qty: 1,
  },
  {
    bundle_sku: "10133",
    bundle_name:
      "Moroccanoil Light Treatment Oil 25ml - Buy 3 Get 4 x 10mls Free",
    component_sku: "9058",
    component_name: "Moroccanoil Light Treatment Oil 10ml",
    component_qty: 4,
  },
  {
    bundle_sku: "10133",
    bundle_name:
      "Moroccanoil Light Treatment Oil 25ml - Buy 3 Get 4 x 10mls Free",
    component_sku: "MOR_MO0040",
    component_name: "Moroccanoil Light Treatment Oil 25ml",
    component_qty: 3,
  },
  {
    bundle_sku: "10134",
    bundle_name:
      "Moroccanoil Moisture Repair Shampoo & Conditioner 500ml - Free 25ml Treatment Oil",
    component_sku: "MOR_MO0029",
    component_name: "Moroccanoil Treatment - 25ml",
    component_qty: 1,
  },
  {
    bundle_sku: "10134",
    bundle_name:
      "Moroccanoil Moisture Repair Shampoo & Conditioner 500ml - Free 25ml Treatment Oil",
    component_sku: "MOR_MOISTURE",
    component_name:
      "Moroccanoil Moisture Repair Shampoo & Conditioner 500ml DUO",
    component_qty: 1,
  },
  {
    bundle_sku: "10135",
    bundle_name: "Moroccanoil Repair Bundle - Free 25ml Treatment Oil",
    component_sku: "MOR_MO0018",
    component_name: "Moroccanoil - Moisture Repair Shampoo 250ml",
    component_qty: 2,
  },
  {
    bundle_sku: "10135",
    bundle_name: "Moroccanoil Repair Bundle - Free 25ml Treatment Oil",
    component_sku: "MOR_MO0020",
    component_name: "Moroccanoil Moisture Repair Conditioner 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "10135",
    bundle_name: "Moroccanoil Repair Bundle - Free 25ml Treatment Oil",
    component_sku: "MOR_MO0029",
    component_name: "Moroccanoil Treatment - 25ml",
    component_qty: 1,
  },
  {
    bundle_sku: "10136",
    bundle_name: "Moroccanoil Travel Collection - Free 25ml Treatment Oil",
    component_sku: "5873",
    component_name: "Moroccanoil Hydrating Style Cream Travel Size 75ml",
    component_qty: 1,
  },
  {
    bundle_sku: "10136",
    bundle_name: "Moroccanoil Travel Collection - Free 25ml Treatment Oil",
    component_sku: "5877",
    component_name: "Moroccanoil Glimmer Shine Spray Travel Size 50ml",
    component_qty: 1,
  },
  {
    bundle_sku: "10136",
    bundle_name: "Moroccanoil Travel Collection - Free 25ml Treatment Oil",
    component_sku: "5878",
    component_name: "Moroccanoil Curl Defining Cream Travel Size 75ml",
    component_qty: 1,
  },
  {
    bundle_sku: "10136",
    bundle_name: "Moroccanoil Travel Collection - Free 25ml Treatment Oil",
    component_sku: "5879",
    component_name: "Moroccanoil Hydrating Mask Light Travel Size 75ml",
    component_qty: 1,
  },
  {
    bundle_sku: "10136",
    bundle_name: "Moroccanoil Travel Collection - Free 25ml Treatment Oil",
    component_sku: "5880",
    component_name: "Moroccanoil Restorative Hair Mask Travel Size 75ml",
    component_qty: 1,
  },
  {
    bundle_sku: "10136",
    bundle_name: "Moroccanoil Travel Collection - Free 25ml Treatment Oil",
    component_sku: "5884",
    component_name: "Moroccanoil Travel Size Repair Conditioner 70ml",
    component_qty: 1,
  },
  {
    bundle_sku: "10136",
    bundle_name: "Moroccanoil Travel Collection - Free 25ml Treatment Oil",
    component_sku: "MOR_MO0029",
    component_name: "Moroccanoil Treatment - 25ml",
    component_qty: 1,
  },
  {
    bundle_sku: "10137",
    bundle_name: "Moroccanoil Treatment Oil 25ml - Buy 3 Get 4 x 10mls Free",
    component_sku: "9059",
    component_name: "Moroccanoil Treatment Oil 10ml",
    component_qty: 4,
  },
  {
    bundle_sku: "10137",
    bundle_name: "Moroccanoil Treatment Oil 25ml - Buy 3 Get 4 x 10mls Free",
    component_sku: "MOR_MO0029",
    component_name: "Moroccanoil Treatment - 25ml",
    component_qty: 3,
  },
  {
    bundle_sku: "10138",
    bundle_name: "Moroccanoil Volume Collection - Free 50ml Treatment Oil",
    component_sku: "9797",
    component_name: "Moroccanoil Dry Texture Spray 60ml",
    component_qty: 1,
  },
  {
    bundle_sku: "10138",
    bundle_name: "Moroccanoil Volume Collection - Free 50ml Treatment Oil",
    component_sku: "MOR_MO0040",
    component_name: "Moroccanoil Light Treatment Oil 25ml",
    component_qty: 1,
  },
  {
    bundle_sku: "10138",
    bundle_name: "Moroccanoil Volume Collection - Free 50ml Treatment Oil",
    component_sku: "mor_mo0042",
    component_name: "Moroccanoil light Treatment Oil 125ml",
    component_qty: 1,
  },
  {
    bundle_sku: "10138",
    bundle_name: "Moroccanoil Volume Collection - Free 50ml Treatment Oil",
    component_sku: "MOR_P018823",
    component_name: "Moroccanoil Root Boost 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "10139",
    bundle_name: "Eleven Keep My Blonde - Collection",
    component_sku: "7898",
    component_name: "Eleven Keep My Blonde Shampoo 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "10139",
    bundle_name: "Eleven Keep My Blonde - Collection",
    component_sku: "7900",
    component_name: "Eleven Keep My Colour Treatment Blonde 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "10140",
    bundle_name: "Joico Blonde Life Brightening - Ultimate Collection",
    component_sku: "6192",
    component_name: "Joico Blonde Life Brightening Conditioner 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "10140",
    bundle_name: "Joico Blonde Life Brightening - Ultimate Collection",
    component_sku: "6193",
    component_name: "Joico Blonde Life Brightening Shampoo 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "10140",
    bundle_name: "Joico Blonde Life Brightening - Ultimate Collection",
    component_sku: "7748",
    component_name:
      "Joico Blonde Life Brilliant Tone Violet Smoothing Foam 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "10140",
    bundle_name: "Joico Blonde Life Brightening - Ultimate Collection",
    component_sku: "8283",
    component_name: "Joico Blonde Life Brightening Masque 150ml",
    component_qty: 1,
  },
  {
    bundle_sku: "10141",
    bundle_name: "Joico Blonde Life Violet - Ultimate Collection",
    component_sku: "7748",
    component_name:
      "Joico Blonde Life Brilliant Tone Violet Smoothing Foam 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "10141",
    bundle_name: "Joico Blonde Life Violet - Ultimate Collection",
    component_sku: "8027",
    component_name: "Joico Blonde Life Violet Shampoo 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "10141",
    bundle_name: "Joico Blonde Life Violet - Ultimate Collection",
    component_sku: "8028",
    component_name: "Joico Blonde Life Violet Conditioner 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "10141",
    bundle_name: "Joico Blonde Life Violet - Ultimate Collection",
    component_sku: "8283",
    component_name: "Joico Blonde Life Brightening Masque 150ml",
    component_qty: 1,
  },
  {
    bundle_sku: "10142",
    bundle_name: "Kerastase Blond Absolu - Ultimate Collection",
    component_sku: "8774",
    component_name: "Kerastase Blond Absolu Bain Ultra-Violet 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "10142",
    bundle_name: "Kerastase Blond Absolu - Ultimate Collection",
    component_sku: "8775",
    component_name: "Kerastase Blond Absolu Bain Lumiére 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "10142",
    bundle_name: "Kerastase Blond Absolu - Ultimate Collection",
    component_sku: "8776",
    component_name: "Kerastase Blond Absolu Fondant Cicaflash 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "10142",
    bundle_name: "Kerastase Blond Absolu - Ultimate Collection",
    component_sku: "8777",
    component_name: "Kerastase Blond Absolu Cicaplasme 150ml",
    component_qty: 1,
  },
  {
    bundle_sku: "10142",
    bundle_name: "Kerastase Blond Absolu - Ultimate Collection",
    component_sku: "8778",
    component_name: "Kerastase Blond Absolu Masque Ultra-Violet 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "10143",
    bundle_name: "NAK Blonde - Ultimate Collection",
    component_sku: "8935",
    component_name: "NAK Blonde Shampoo 350ml",
    component_qty: 1,
  },
  {
    bundle_sku: "10143",
    bundle_name: "NAK Blonde - Ultimate Collection",
    component_sku: "8937",
    component_name: "NAK Blonde Conditioner 375ml",
    component_qty: 1,
  },
  {
    bundle_sku: "10143",
    bundle_name: "NAK Blonde - Ultimate Collection",
    component_sku: "8949",
    component_name: "NAK Blonde Plus10v Toning Foam 143ml",
    component_qty: 1,
  },
  {
    bundle_sku: "10143",
    bundle_name: "NAK Blonde - Ultimate Collection",
    component_sku: "8950",
    component_name: "NAK Platinum Blonde Treatment 150ml",
    component_qty: 1,
  },
  {
    bundle_sku: "10144",
    bundle_name: "Pureology Strength Cure Best Blonde - Collection",
    component_sku: "5051",
    component_name: "Pureology Strength Cure Best Blonde Shampoo 266ml",
    component_qty: 1,
  },
  {
    bundle_sku: "10144",
    bundle_name: "Pureology Strength Cure Best Blonde - Collection",
    component_sku: "5056",
    component_name: "Pureology Strength Cure Blonde Conditioner 266ml",
    component_qty: 1,
  },
  {
    bundle_sku: "10145",
    bundle_name: "Protect My Blonde - Ultimate Collection - Staff Picks",
    component_sku: "5023",
    component_name: "Moroccanoil - Dry Shampoo Light Tones 217ml",
    component_qty: 1,
  },
  {
    bundle_sku: "10145",
    bundle_name: "Protect My Blonde - Ultimate Collection - Staff Picks",
    component_sku: "6192",
    component_name: "Joico Blonde Life Brightening Conditioner 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "10145",
    bundle_name: "Protect My Blonde - Ultimate Collection - Staff Picks",
    component_sku: "6193",
    component_name: "Joico Blonde Life Brightening Shampoo 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "10145",
    bundle_name: "Protect My Blonde - Ultimate Collection - Staff Picks",
    component_sku: "7900",
    component_name: "Eleven Keep My Colour Treatment Blonde 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "10145",
    bundle_name: "Protect My Blonde - Ultimate Collection - Staff Picks",
    component_sku: "8283",
    component_name: "Joico Blonde Life Brightening Masque 150ml",
    component_qty: 1,
  },
  {
    bundle_sku: "10194A",
    bundle_name: "Kerastase Curl Manifesto - Ultimate Collection",
    component_sku: "10188",
    component_name: "Kerastase Curl Manifesto Bain Hydratation Douceur 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "10194A",
    bundle_name: "Kerastase Curl Manifesto - Ultimate Collection",
    component_sku: "10189",
    component_name:
      "Kerastase Curl Manifesto Fondant Hydratation Essentielle 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "10194A",
    bundle_name: "Kerastase Curl Manifesto - Ultimate Collection",
    component_sku: "10190",
    component_name:
      "Kerastase Curl Manifesto Masque Beurre Haute Nutrition 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "10194A",
    bundle_name: "Kerastase Curl Manifesto - Ultimate Collection",
    component_sku: "10191",
    component_name: "Kerastase Curl Manifesto Crème De Jour Fondamentale 150ml",
    component_qty: 1,
  },
  {
    bundle_sku: "10194A",
    bundle_name: "Kerastase Curl Manifesto - Ultimate Collection",
    component_sku: "10192",
    component_name: "Kerastase Curl Manifesto Huile Sublime Repair 50ml",
    component_qty: 1,
  },
  {
    bundle_sku: "10194A",
    bundle_name: "Kerastase Curl Manifesto - Ultimate Collection",
    component_sku: "10193",
    component_name: "Kerastase Curl Manifesto Gelée Curl Contour 150ml",
    component_qty: 1,
  },
  {
    bundle_sku: "10194A",
    bundle_name: "Kerastase Curl Manifesto - Ultimate Collection",
    component_sku: "10194",
    component_name: "Kerastase Curl Manifesto Fresh Absolu Spray 190ml",
    component_qty: 1,
  },
  {
    bundle_sku: "10197",
    bundle_name: "Dermalogica Hyperpigmentation Bundle",
    component_sku: "6508",
    component_name: "Dermalogica Biolumin-C Serum 30ml",
    component_qty: 1,
  },
  {
    bundle_sku: "10197",
    bundle_name: "Dermalogica Hyperpigmentation Bundle",
    component_sku: "7601",
    component_name: "Dermalogica Age Bright Clearing Serum 30ml",
    component_qty: 1,
  },
  {
    bundle_sku: "10197",
    bundle_name: "Dermalogica Hyperpigmentation Bundle",
    component_sku: "7602",
    component_name: "Dermalogica Age Bright Spot Fader 15ml",
    component_qty: 1,
  },
  {
    bundle_sku: "10197",
    bundle_name: "Dermalogica Hyperpigmentation Bundle",
    component_sku: "9454",
    component_name: "Dermalogica PowerBright Dark Spot Serum 30ml",
    component_qty: 1,
  },
  {
    bundle_sku: "10209",
    bundle_name: "Joico Hydrasplash Ultimate Bundle",
    component_sku: "8223",
    component_name: "Joico HydraSplash Hydrating Shampoo 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "10209",
    bundle_name: "Joico Hydrasplash Ultimate Bundle",
    component_sku: "8224",
    component_name: "Joico HydraSplash Hydrating Conditioner 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "10209",
    bundle_name: "Joico Hydrasplash Ultimate Bundle",
    component_sku: "8225",
    component_name: "Joico HydraSplash Gelée Masque 150ml",
    component_qty: 1,
  },
  {
    bundle_sku: "10209",
    bundle_name: "Joico Hydrasplash Ultimate Bundle",
    component_sku: "8226",
    component_name: "Joico HydraSplash Replenishing Leave-In 100ml",
    component_qty: 1,
  },
  {
    bundle_sku: "10210",
    bundle_name: "Joico Colour Therapy Ultimate Bundle",
    component_sku: "6200",
    component_name: "Joico K-Pak Color Therapy Conditioner 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "10210",
    bundle_name: "Joico Colour Therapy Ultimate Bundle",
    component_sku: "6246",
    component_name: "Joico K-Pak Color Therapy Shampoo 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "10210",
    bundle_name: "Joico Colour Therapy Ultimate Bundle",
    component_sku: "6298",
    component_name: "Joico K-Pak Color Therapy Luster Lock 150ml",
    component_qty: 1,
  },
  {
    bundle_sku: "10210",
    bundle_name: "Joico Colour Therapy Ultimate Bundle",
    component_sku: "8621",
    component_name: "Joico K-Pak Color Therapy Luster Lock Spray 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "10210",
    bundle_name: "Joico Colour Therapy Ultimate Bundle",
    component_sku: "8622",
    component_name: "Joico K-Pak Color Therapy Luster Lock Oil Lite 63ml",
    component_qty: 1,
  },
  {
    bundle_sku: "10211",
    bundle_name: "Joico Joifull Ultimate Bundle",
    component_sku: "7992",
    component_name: "Joico Joifull Volume Condtioner 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "10211",
    bundle_name: "Joico Joifull Ultimate Bundle",
    component_sku: "7993",
    component_name: "Joico Joifull Volume Shampoo 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "10211",
    bundle_name: "Joico Joifull Ultimate Bundle",
    component_sku: "7994",
    component_name: "Joico Joifull Volume Styler 100ml",
    component_qty: 1,
  },
  {
    bundle_sku: "10257A",
    bundle_name: "Pureology Hydrate Sheer Shampoo & Conditioner 266ml",
    component_sku: "10256",
    component_name: "Pureology Hydrate Sheer Shampoo 266ml",
    component_qty: 1,
  },
  {
    bundle_sku: "10257A",
    bundle_name: "Pureology Hydrate Sheer Shampoo & Conditioner 266ml",
    component_sku: "10257",
    component_name: "Pureology Hydrate Sheer Conditioner 266ml",
    component_qty: 1,
  },
  {
    bundle_sku: "10303",
    bundle_name: "Joico Defy Damage Protective Shield & Sleepover Foil",
    component_sku: "7507",
    component_name: "Joico Defy Damage Protective Shield 50ml",
    component_qty: 1,
  },
  {
    bundle_sku: "10305",
    bundle_name: "Dermalogica Normal / Dry Skin Bundle",
    component_sku: "101106",
    component_name: "Dermalogica Special Cleansing Gel 500ml",
    component_qty: 1,
  },
  {
    bundle_sku: "10305",
    bundle_name: "Dermalogica Normal / Dry Skin Bundle",
    component_sku: "110631",
    component_name: "Dermalogica Skin Smoothing Cream 100ml",
    component_qty: 1,
  },
  {
    bundle_sku: "10305",
    bundle_name: "Dermalogica Normal / Dry Skin Bundle",
    component_sku: "110700",
    component_name: "Dermalogica Daily Microfoliant 74g",
    component_qty: 1,
  },
  {
    bundle_sku: "10306",
    bundle_name: "Dermalogica Dry / Very Dry Skin Bundle",
    component_sku: "101106",
    component_name: "Dermalogica Special Cleansing Gel 500ml",
    component_qty: 1,
  },
  {
    bundle_sku: "10306",
    bundle_name: "Dermalogica Dry / Very Dry Skin Bundle",
    component_sku: "110625",
    component_name: "Dermalogica Intensive Moisture Balance 100ml",
    component_qty: 1,
  },
  {
    bundle_sku: "10306",
    bundle_name: "Dermalogica Dry / Very Dry Skin Bundle",
    component_sku: "110700",
    component_name: "Dermalogica Daily Microfoliant 74g",
    component_qty: 1,
  },
  {
    bundle_sku: "10307",
    bundle_name: "Dermalogica Oily Skin Bundle",
    component_sku: "101106",
    component_name: "Dermalogica Special Cleansing Gel 500ml",
    component_qty: 1,
  },
  {
    bundle_sku: "10307",
    bundle_name: "Dermalogica Oily Skin Bundle",
    component_sku: "110700",
    component_name: "Dermalogica Daily Microfoliant 74g",
    component_qty: 1,
  },
  {
    bundle_sku: "10307",
    bundle_name: "Dermalogica Oily Skin Bundle",
    component_sku: "111598",
    component_name: "Dermalogica Active Moist 100ml",
    component_qty: 1,
  },
  {
    bundle_sku: "10308",
    bundle_name: "Dermalogica Aging Skin Bundle",
    component_sku: "103605",
    component_name: "Dermalogica Super Rich Repair Moisturiser 50ml",
    component_qty: 1,
  },
  {
    bundle_sku: "10308",
    bundle_name: "Dermalogica Aging Skin Bundle",
    component_sku: "106053",
    component_name: "Dermalogica Multivitamin Power Firm Eye Cream 15ml",
    component_qty: 1,
  },
  {
    bundle_sku: "10308",
    bundle_name: "Dermalogica Aging Skin Bundle",
    component_sku: "111006",
    component_name: "Dermalogica Dynamic Skin Recovery SPF50 50ml",
    component_qty: 1,
  },
  {
    bundle_sku: "10309",
    bundle_name: "Dermlogica Ultra Calming Bundle",
    component_sku: "110542",
    component_name: "Dermalogica UltraCalming Cleanser 500ml",
    component_qty: 1,
  },
  {
    bundle_sku: "10309",
    bundle_name: "Dermlogica Ultra Calming Bundle",
    component_sku: "110616",
    component_name: "Dermalogica Multi-active Toner 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "10309",
    bundle_name: "Dermlogica Ultra Calming Bundle",
    component_sku: "6244",
    component_name: "Dermalogica UltraCalming Calm Water Gel 50ml",
    component_qty: 1,
  },
  {
    bundle_sku: "10310",
    bundle_name: "Dermalogica Clear Start Bundle",
    component_sku: "110910",
    component_name: "Dermalogica Clear Start Foaming Wash 177ml",
    component_qty: 1,
  },
  {
    bundle_sku: "10310",
    bundle_name: "Dermalogica Clear Start Bundle",
    component_sku: "6797",
    component_name: "Dermalogica Breakout Clearing Booster 30ml",
    component_qty: 1,
  },
  {
    bundle_sku: "10310",
    bundle_name: "Dermalogica Clear Start Bundle",
    component_sku: "6798",
    component_name: "Dermalogica Blackhead Clearing Fizz Mask 50ml",
    component_qty: 1,
  },
  {
    bundle_sku: "10310",
    bundle_name: "Dermalogica Clear Start Bundle",
    component_sku: "7603",
    component_name: "Dermalogica Clear Start Clearing Defense SPF30 59ml",
    component_qty: 1,
  },
  {
    bundle_sku: "10311",
    bundle_name: "Dermalogica SPF Bundle",
    component_sku: "110634",
    component_name: "Dermalogica Solar Defense Booster SPF50",
    component_qty: 1,
  },
  {
    bundle_sku: "10311",
    bundle_name: "Dermalogica SPF Bundle",
    component_sku: "110905",
    component_name: "Dermalogica Protection 50 Sport SPF50 156ml",
    component_qty: 1,
  },
  {
    bundle_sku: "10320",
    bundle_name: "Mio Body Moisturiser with Free Skin Tight Body Serum",
    component_sku: "10319",
    component_name: "Mio Skin Tight Body Serum 30ml",
    component_qty: 1,
  },
  {
    bundle_sku: "10320",
    bundle_name: "Mio Body Moisturiser with Free Skin Tight Body Serum",
    component_sku: "8615",
    component_name: "Mio Golden Hour Body Moisturiser",
    component_qty: 1,
  },
  {
    bundle_sku: "10355",
    bundle_name: "Mio Skin Tight Body Serum Buy 2 Get 1 Free",
    component_sku: "10319",
    component_name: "Mio Skin Tight Body Serum 30ml",
    component_qty: 3,
  },
  {
    bundle_sku: "10361a",
    bundle_name:
      "Alfaparf Semi Di Lino - Reconstruction Gift Set with Free Cristalli Liquidi 30ml",
    component_sku: "10361",
    component_name:
      "Alfaparf Semi Di Lino - Reconstruction Gift Set - Limited Edition",
    component_qty: 1,
  },
  {
    bundle_sku: "10361a",
    bundle_name:
      "Alfaparf Semi Di Lino - Reconstruction Gift Set with Free Cristalli Liquidi 30ml",
    component_sku: "6481",
    component_name: "Alfaparf Semi Di Lino Diamond Cryst Liquid 30Ml",
    component_qty: 1,
  },
  {
    bundle_sku: "10362a",
    bundle_name:
      "Alfaparf Semi Di Lino - Moisture Gift Set with Free Cristalli Liquidi 15ml",
    component_sku: "10362",
    component_name:
      "Alfaparf Semi Di Lino - Moisture Gift Set - Limited Edition",
    component_qty: 1,
  },
  {
    bundle_sku: "10362a",
    bundle_name:
      "Alfaparf Semi Di Lino - Moisture Gift Set with Free Cristalli Liquidi 15ml",
    component_sku: "6471",
    component_name:
      "Alfaparf Semi Di Lino Moisture Nutritive Leave-In Conditioner 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "10362a",
    bundle_name:
      "Alfaparf Semi Di Lino - Moisture Gift Set with Free Cristalli Liquidi 15ml",
    component_sku: "6481A",
    component_name: "Alfaparf Semi Di Lino Diamond Cryst Liquid 15ml",
    component_qty: 1,
  },
  {
    bundle_sku: "10363a",
    bundle_name:
      "Alfaparf Semi Di Lino - Diamond Gift Set with Free Cristalli Liquidi 15ml",
    component_sku: "10363",
    component_name:
      "Alfaparf Semi Di Lino - Diamond Gift Set - Limited Edition",
    component_qty: 1,
  },
  {
    bundle_sku: "10363a",
    bundle_name:
      "Alfaparf Semi Di Lino - Diamond Gift Set with Free Cristalli Liquidi 15ml",
    component_sku: "6476",
    component_name: "Alfaparf Semi Di Lino Diamond Illuminating Mask 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "10363a",
    bundle_name:
      "Alfaparf Semi Di Lino - Diamond Gift Set with Free Cristalli Liquidi 15ml",
    component_sku: "6481A",
    component_name: "Alfaparf Semi Di Lino Diamond Cryst Liquid 15ml",
    component_qty: 1,
  },
  {
    bundle_sku: "10364a",
    bundle_name:
      "Alfaparf Semi Di Lino - Volume Gift Set with Free Cristalli Liquidi 30ml",
    component_sku: "10364",
    component_name: "Alfaparf Semi Di Lino - Volume Gift Set - Limited Edition",
    component_qty: 1,
  },
  {
    bundle_sku: "10364a",
    bundle_name:
      "Alfaparf Semi Di Lino - Volume Gift Set with Free Cristalli Liquidi 30ml",
    component_sku: "6481",
    component_name: "Alfaparf Semi Di Lino Diamond Cryst Liquid 30Ml",
    component_qty: 1,
  },
  {
    bundle_sku: "10364b",
    bundle_name:
      "Alfaparf Semi Di Lino - Volume Gift Set with Alfaparf Semi Di Lino Volumizing Spray 125ml ",
    component_sku: "10364",
    component_name: "Alfaparf Semi Di Lino - Volume Gift Set - Limited Edition",
    component_qty: 1,
  },
  {
    bundle_sku: "10364b",
    bundle_name:
      "Alfaparf Semi Di Lino - Volume Gift Set with Alfaparf Semi Di Lino Volumizing Spray 125ml ",
    component_sku: "8000",
    component_name: "Alfaparf Semi Di Lino Volumizing Spray 125ml",
    component_qty: 1,
  },
  {
    bundle_sku: "10365a",
    bundle_name:
      "Alfaparf Semi Di Lino - Curls Gift Set with Free Cristalli Liquidi 30ml",
    component_sku: "10365",
    component_name: "Alfaparf Semi Di Lino - Curls Gift Set - Limited Edition",
    component_qty: 1,
  },
  {
    bundle_sku: "10365a",
    bundle_name:
      "Alfaparf Semi Di Lino - Curls Gift Set with Free Cristalli Liquidi 30ml",
    component_sku: "6481",
    component_name: "Alfaparf Semi Di Lino Diamond Cryst Liquid 30Ml",
    component_qty: 1,
  },
  {
    bundle_sku: "10377",
    bundle_name: "Alfaparf Semi Di Lino Moisture - Hair Care Trio",
    component_sku: "6469",
    component_name: "Alfaparf Semi Di Lino Moisture Nutritive Shampoo 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "10377",
    bundle_name: "Alfaparf Semi Di Lino Moisture - Hair Care Trio",
    component_sku: "6470",
    component_name: "Alfaparf Semi Di Lino Moisture Nutritive Mask 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "10377",
    bundle_name: "Alfaparf Semi Di Lino Moisture - Hair Care Trio",
    component_sku: "6471",
    component_name:
      "Alfaparf Semi Di Lino Moisture Nutritive Leave-In Conditioner 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "10399",
    bundle_name: "Kerastase Curl Manifesto Wavy To Curly Hair Routine",
    component_sku: "10188",
    component_name: "Kerastase Curl Manifesto Bain Hydratation Douceur 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "10399",
    bundle_name: "Kerastase Curl Manifesto Wavy To Curly Hair Routine",
    component_sku: "10189",
    component_name:
      "Kerastase Curl Manifesto Fondant Hydratation Essentielle 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "10399",
    bundle_name: "Kerastase Curl Manifesto Wavy To Curly Hair Routine",
    component_sku: "10191",
    component_name: "Kerastase Curl Manifesto Crème De Jour Fondamentale 150ml",
    component_qty: 1,
  },
  {
    bundle_sku: "10399",
    bundle_name: "Kerastase Curl Manifesto Wavy To Curly Hair Routine",
    component_sku: "10194",
    component_name: "Kerastase Curl Manifesto Fresh Absolu Spray 190ml",
    component_qty: 1,
  },
  {
    bundle_sku: "10400",
    bundle_name: "Kerastase Curl Manifesto Very Curly Hair Routine",
    component_sku: "10188",
    component_name: "Kerastase Curl Manifesto Bain Hydratation Douceur 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "10400",
    bundle_name: "Kerastase Curl Manifesto Very Curly Hair Routine",
    component_sku: "10190",
    component_name:
      "Kerastase Curl Manifesto Masque Beurre Haute Nutrition 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "10400",
    bundle_name: "Kerastase Curl Manifesto Very Curly Hair Routine",
    component_sku: "10191",
    component_name: "Kerastase Curl Manifesto Crème De Jour Fondamentale 150ml",
    component_qty: 1,
  },
  {
    bundle_sku: "10400",
    bundle_name: "Kerastase Curl Manifesto Very Curly Hair Routine",
    component_sku: "10194",
    component_name: "Kerastase Curl Manifesto Fresh Absolu Spray 190ml",
    component_qty: 1,
  },
  {
    bundle_sku: "10401",
    bundle_name: "Kerastase Curl Manifesto Coily Hair Routine",
    component_sku: "10188",
    component_name: "Kerastase Curl Manifesto Bain Hydratation Douceur 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "10401",
    bundle_name: "Kerastase Curl Manifesto Coily Hair Routine",
    component_sku: "10190",
    component_name:
      "Kerastase Curl Manifesto Masque Beurre Haute Nutrition 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "10401",
    bundle_name: "Kerastase Curl Manifesto Coily Hair Routine",
    component_sku: "10191",
    component_name: "Kerastase Curl Manifesto Crème De Jour Fondamentale 150ml",
    component_qty: 1,
  },
  {
    bundle_sku: "10401",
    bundle_name: "Kerastase Curl Manifesto Coily Hair Routine",
    component_sku: "10192",
    component_name: "Kerastase Curl Manifesto Huile Sublime Repair 50ml",
    component_qty: 1,
  },
  {
    bundle_sku: "10401",
    bundle_name: "Kerastase Curl Manifesto Coily Hair Routine",
    component_sku: "10193",
    component_name: "Kerastase Curl Manifesto Gelée Curl Contour 150ml",
    component_qty: 1,
  },
  {
    bundle_sku: "10401",
    bundle_name: "Kerastase Curl Manifesto Coily Hair Routine",
    component_sku: "10194",
    component_name: "Kerastase Curl Manifesto Fresh Absolu Spray 190ml",
    component_qty: 1,
  },
  {
    bundle_sku: "10443",
    bundle_name: "NUXE Toning Mist and Micellar Water Soothing Bundle",
    component_sku: "10442",
    component_name: "NUXE Very Rose 3-in-1 Soothing Micellar Water 100ml GWP",
    component_qty: 1,
  },
  {
    bundle_sku: "10443",
    bundle_name: "NUXE Toning Mist and Micellar Water Soothing Bundle",
    component_sku: "9950",
    component_name: "NUXE Very Rose Refreshing Tonic Lotion 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "10453",
    bundle_name: "Redken All Soft Solution Bundle",
    component_sku: "10446",
    component_name: "Redken All Soft 500ml Duo",
    component_qty: 1,
  },
  {
    bundle_sku: "10453",
    bundle_name: "Redken All Soft Solution Bundle",
    component_sku: "REDK_P042690",
    component_name: "Redken - All Soft Heavy Cream 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "10454",
    bundle_name: "Redken Extreme Solution Bundle",
    component_sku: "10445",
    component_name: "Redken Extreme 500ml Duo",
    component_qty: 1,
  },
  {
    bundle_sku: "10454",
    bundle_name: "Redken Extreme Solution Bundle",
    component_sku: "REDK_P029530",
    component_name: "Redken - Extreme Strength Builder 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "10455",
    bundle_name: "Redken Acidic Bonding Concentrate Solution Bundle",
    component_sku: "9762",
    component_name: "Redken Acidic Bonding Concentrate Shampoo 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "10455",
    bundle_name: "Redken Acidic Bonding Concentrate Solution Bundle",
    component_sku: "9763",
    component_name: "Redken Acidic Bonding Concentrate Conditioner 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "10455",
    bundle_name: "Redken Acidic Bonding Concentrate Solution Bundle",
    component_sku: "9764",
    component_name:
      "Redken Acidic Perfecting Concentrate Leave-In Treatment 150ml",
    component_qty: 1,
  },
  {
    bundle_sku: "10545",
    bundle_name:
      "L'Oreal Steampod V3 Bundle with FREE Travel Case By KARL LAGERFELD",
    component_sku: "10544",
    component_name: "L'Oreal Steampod V3 Travel Case By KARL LAGERFELD",
    component_qty: 1,
  },
  {
    bundle_sku: "10545",
    bundle_name:
      "L'Oreal Steampod V3 Bundle with FREE Travel Case By KARL LAGERFELD",
    component_sku: "9631a",
    component_name: "L'Oreal Steampod V3 x Karl Lagerfeld",
    component_qty: 1,
  },
  {
    bundle_sku: "10551",
    bundle_name: "Color Wow Dream Coat 200ml With FREE Dream Coat 50ml",
    component_sku: "10147",
    component_name: "Color Wow Dream Coat Travel Size - 50ml",
    component_qty: 1,
  },
  {
    bundle_sku: "10551",
    bundle_name: "Color Wow Dream Coat 200ml With FREE Dream Coat 50ml",
    component_sku: "7494",
    component_name: "Color Wow Dream Coat 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "10552",
    bundle_name: "Olaplex Blonde Enhancer Bundle",
    component_sku: "10490",
    component_name: "Olaplex No.4P Blonde Enhancer Toning Shampoo 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "10552",
    bundle_name: "Olaplex Blonde Enhancer Bundle",
    component_sku: "7179",
    component_name: "Olaplex No.4 Bond Maintenance Shampoo 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "10569",
    bundle_name: "Joico Colorful Anti-Fade Bundle",
    component_sku: "10541",
    component_name: "Joico Colorful Anti-Fade Shampoo 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "10569",
    bundle_name: "Joico Colorful Anti-Fade Bundle",
    component_sku: "10542",
    component_name: "Joico Colorful Anti-Fade Conditioner 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "10569",
    bundle_name: "Joico Colorful Anti-Fade Bundle",
    component_sku: "10543",
    component_name: "Joico Colorful Glow Beyond Anti-Fade Serum 63ml",
    component_qty: 1,
  },
  {
    bundle_sku: "10688A",
    bundle_name: "Ariana Grande Cloud Eau de Parfum Spray 50ml Bundle of 1",
    component_sku: "10688",
    component_name: "Ariana Grande Cloud Eau de Parfum Spray 50ml",
    component_qty: 1,
  },
  {
    bundle_sku: "10730A",
    bundle_name:
      "BeautiEdit - Medium - Tan Treat Hydrate Self-Tanning Foam & MIT",
    component_sku: "10730",
    component_name: "BeautiEdit Tan Medium - 3 in 1 Self Tanning Foam",
    component_qty: 1,
  },
  {
    bundle_sku: "10730A",
    bundle_name:
      "BeautiEdit - Medium - Tan Treat Hydrate Self-Tanning Foam & MIT",
    component_sku: "10733",
    component_name: "BeautiEdit Soft Velvet Tanning Mitt",
    component_qty: 1,
  },
  {
    bundle_sku: "10730B",
    bundle_name: "BeautiEdit Tan Medium - 3 in 1 Self Tanning Foam & MITT",
    component_sku: "10730",
    component_name: "BeautiEdit Tan Medium - 3 in 1 Self Tanning Foam",
    component_qty: 1,
  },
  {
    bundle_sku: "10730B",
    bundle_name: "BeautiEdit Tan Medium - 3 in 1 Self Tanning Foam & MITT",
    component_sku: "10733",
    component_name: "BeautiEdit Soft Velvet Tanning Mitt",
    component_qty: 1,
  },
  {
    bundle_sku: "10731A",
    bundle_name: "BeautiEdit Tan Dark - 3 in 1 Self Tanning Foam & MITT",
    component_sku: "10733",
    component_name: "BeautiEdit Soft Velvet Tanning Mitt",
    component_qty: 1,
  },
  {
    bundle_sku: "10732A",
    bundle_name: "BeautiEdit Tan Ultra Dark - 3 in 1 Self Tanning Foam & MITT",
    component_sku: "10732",
    component_name: "BeautiEdit Tan Ultra Dark - 3 in 1 Self Tanning Foam",
    component_qty: 1,
  },
  {
    bundle_sku: "10732A",
    bundle_name: "BeautiEdit Tan Ultra Dark - 3 in 1 Self Tanning Foam & MITT",
    component_sku: "10733",
    component_name: "BeautiEdit Soft Velvet Tanning Mitt",
    component_qty: 1,
  },
  {
    bundle_sku: "10902",
    bundle_name: "Color Wow Dream Coat 200ml with FREE Dream Filter 50ml",
    component_sku: "7494",
    component_name: "Color Wow Dream Coat 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "10903",
    bundle_name: "Color Wow Dream Filter 200ml with FREE Dream Filter 50ml",
    component_sku: "7657",
    component_name: "Color Wow Dream Filter 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "11047",
    bundle_name: "Color Wow Style Ultimate Travel Duo",
    component_sku: "11045",
    component_name: "Color Wow Flexible Hair Spray 50ml",
    component_qty: 1,
  },
  {
    bundle_sku: "11047",
    bundle_name: "Color Wow Style Ultimate Travel Duo",
    component_sku: "11046",
    component_name: "Color Wow Style on Steroids Spray 50ml",
    component_qty: 1,
  },
  {
    bundle_sku: "11048",
    bundle_name: "Color Wow Dream Filter 200ml plus FREE Ultimate Travel Duo's",
    component_sku: "11045",
    component_name: "Color Wow Flexible Hair Spray 50ml",
    component_qty: 1,
  },
  {
    bundle_sku: "11048",
    bundle_name: "Color Wow Dream Filter 200ml plus FREE Ultimate Travel Duo's",
    component_sku: "11046",
    component_name: "Color Wow Style on Steroids Spray 50ml",
    component_qty: 1,
  },
  {
    bundle_sku: "11048",
    bundle_name: "Color Wow Dream Filter 200ml plus FREE Ultimate Travel Duo's",
    component_sku: "7657",
    component_name: "Color Wow Dream Filter 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "11049",
    bundle_name: "Color Wow Dream Coat 200ml plus FREE Ultimate Travel Duo's",
    component_sku: "11045",
    component_name: "Color Wow Flexible Hair Spray 50ml",
    component_qty: 1,
  },
  {
    bundle_sku: "11049",
    bundle_name: "Color Wow Dream Coat 200ml plus FREE Ultimate Travel Duo's",
    component_sku: "11046",
    component_name: "Color Wow Style on Steroids Spray 50ml",
    component_qty: 1,
  },
  {
    bundle_sku: "11049",
    bundle_name: "Color Wow Dream Coat 200ml plus FREE Ultimate Travel Duo's",
    component_sku: "7494",
    component_name: "Color Wow Dream Coat 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "11050",
    bundle_name:
      "Color Wow Dream Coat & Dream Filter 200ml Plus Free Travel Duo's",
    component_sku: "11045",
    component_name: "Color Wow Flexible Hair Spray 50ml",
    component_qty: 1,
  },
  {
    bundle_sku: "11050",
    bundle_name:
      "Color Wow Dream Coat & Dream Filter 200ml Plus Free Travel Duo's",
    component_sku: "11046",
    component_name: "Color Wow Style on Steroids Spray 50ml",
    component_qty: 1,
  },
  {
    bundle_sku: "11050",
    bundle_name:
      "Color Wow Dream Coat & Dream Filter 200ml Plus Free Travel Duo's",
    component_sku: "7494",
    component_name: "Color Wow Dream Coat 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "11050",
    bundle_name:
      "Color Wow Dream Coat & Dream Filter 200ml Plus Free Travel Duo's",
    component_sku: "7657",
    component_name: "Color Wow Dream Filter 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "11074",
    bundle_name: "Alfaparf Semi Di Lino - Blonde Shampoo & Conditioner Bundle",
    component_sku: "11038",
    component_name: "Alfaparf Anti-Yellow Low Blonde Shampoo 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "11074",
    bundle_name: "Alfaparf Semi Di Lino - Blonde Shampoo & Conditioner Bundle",
    component_sku: "11040",
    component_name: "Alfaparf Anti-Yellow Blonde Conditioner 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "11075",
    bundle_name:
      "Alfaparf Semi Di Lino - Brunette Shampoo & Conditioner Bundle",
    component_sku: "11039",
    component_name: "Alfapaf Anti-Orange Low Brunette Shampoo 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "11075",
    bundle_name:
      "Alfaparf Semi Di Lino - Brunette Shampoo & Conditioner Bundle",
    component_sku: "11041",
    component_name: "Alfaparf Brunette Conditioner 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "11076",
    bundle_name: "Alfaparf Semi Di Lino - Blonde Anti-Yellow Trio",
    component_sku: "11038",
    component_name: "Alfaparf Anti-Yellow Low Blonde Shampoo 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "11076",
    bundle_name: "Alfaparf Semi Di Lino - Blonde Anti-Yellow Trio",
    component_sku: "11040",
    component_name: "Alfaparf Anti-Yellow Blonde Conditioner 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "11076",
    bundle_name: "Alfaparf Semi Di Lino - Blonde Anti-Yellow Trio",
    component_sku: "11042",
    component_name: "Alfaparf Anti-Yellow Blonde Spray 125ml",
    component_qty: 1,
  },
  {
    bundle_sku: "11077",
    bundle_name: "Moroccanoil - Treat, Hydrate & Restore Bundle",
    component_sku: "MOR_MO0008",
    component_name: "Moroccanoil Intense Hydrating Mask 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "11077",
    bundle_name: "Moroccanoil - Treat, Hydrate & Restore Bundle",
    component_sku: "MOR_MO0011",
    component_name: "Moroccanoil Restorative Hair Mask - 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "11077",
    bundle_name: "Moroccanoil - Treat, Hydrate & Restore Bundle",
    component_sku: "mor_mo0041",
    component_name: "Moroccanoil Treatment Oil 125ml for the price of 100ml",
    component_qty: 1,
  },
  {
    bundle_sku: "11077A",
    bundle_name: "Moroccanoil -  Light Tones Treat, Hydrate & Restore Bundle",
    component_sku: "MOR_MO0008",
    component_name: "Moroccanoil Intense Hydrating Mask 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "11077A",
    bundle_name: "Moroccanoil -  Light Tones Treat, Hydrate & Restore Bundle",
    component_sku: "MOR_MO0011",
    component_name: "Moroccanoil Restorative Hair Mask - 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "11077A",
    bundle_name: "Moroccanoil -  Light Tones Treat, Hydrate & Restore Bundle",
    component_sku: "mor_mo0042",
    component_name: "Moroccanoil light Treatment Oil 125ml",
    component_qty: 1,
  },
  {
    bundle_sku: "11152",
    bundle_name: "NAK Platinum Blonde Trio 100ml Bundle",
    component_sku: "11149",
    component_name: "NAK Blonde Conditioner 100ml",
    component_qty: 1,
  },
  {
    bundle_sku: "11152",
    bundle_name: "NAK Platinum Blonde Trio 100ml Bundle",
    component_sku: "11150",
    component_name: "NAK Platinum Blonde Anti-Yellow Shampoo 80ml",
    component_qty: 1,
  },
  {
    bundle_sku: "11152",
    bundle_name: "NAK Platinum Blonde Trio 100ml Bundle",
    component_sku: "11151",
    component_name: "NAK Platinum Blonde Anti-Yellow Treatment 50ml",
    component_qty: 1,
  },
  {
    bundle_sku: "11166",
    bundle_name:
      "Kerastase Blond Absolu Bain Lumière Refill Pouch & Refillable Bottle",
    component_sku: "11166a",
    component_name: "Kerastase Blond Absolu Bain Lumière Refillable Bottle",
    component_qty: 1,
  },
  {
    bundle_sku: "11166",
    bundle_name:
      "Kerastase Blond Absolu Bain Lumière Refill Pouch & Refillable Bottle",
    component_sku: "11172",
    component_name: "Kerastase Bain Lumière Refill Pouch",
    component_qty: 1,
  },
  {
    bundle_sku: "11167",
    bundle_name:
      "Kerastase Genesis Bain Hydra-Fortifiant Refill Pouch & Refillable Bottle",
    component_sku: "11167a",
    component_name: "Kerastase Genesis Bain Hydra-Fortifiant Refillable Bottle",
    component_qty: 1,
  },
  {
    bundle_sku: "11167",
    bundle_name:
      "Kerastase Genesis Bain Hydra-Fortifiant Refill Pouch & Refillable Bottle",
    component_sku: "11173",
    component_name: "Kerastase Bain Hydra-Fortifiant Refill Pouch",
    component_qty: 1,
  },
  {
    bundle_sku: "11168",
    bundle_name:
      "Kerastase Genesis Bain Nutri-Fortifiant Refill Pouch & Refillable Bottle",
    component_sku: "11167a",
    component_name: "Kerastase Genesis Bain Hydra-Fortifiant Refillable Bottle",
    component_qty: 1,
  },
  {
    bundle_sku: "11168",
    bundle_name:
      "Kerastase Genesis Bain Nutri-Fortifiant Refill Pouch & Refillable Bottle",
    component_sku: "11174",
    component_name: "Kerastase Bain Nutri-Fortifiant Refill Pouch",
    component_qty: 1,
  },
  {
    bundle_sku: "11169",
    bundle_name:
      "Kerastase Nutritive Bain Satin Riche Refill Pouch & Refillable Bottle",
    component_sku: "11169a",
    component_name: "Kerastase Nutritive Bain Satin Riche Refillable Bottle",
    component_qty: 1,
  },
  {
    bundle_sku: "11169",
    bundle_name:
      "Kerastase Nutritive Bain Satin Riche Refill Pouch & Refillable Bottle",
    component_sku: "11175",
    component_name: "Kerastase Bain Satin Riche Refill Pouch",
    component_qty: 1,
  },
  {
    bundle_sku: "11170",
    bundle_name:
      "Kerastase Bain Force Architecte Refill Pouch & Refillable Bottle",
    component_sku: "11170a",
    component_name: "Kerastase Bain Force Architecte Refillable Bottle",
    component_qty: 1,
  },
  {
    bundle_sku: "11170",
    bundle_name:
      "Kerastase Bain Force Architecte Refill Pouch & Refillable Bottle",
    component_sku: "11176",
    component_name: "Kerastase Bain Force Architecte Refill Pouch",
    component_qty: 1,
  },
  {
    bundle_sku: "11171",
    bundle_name:
      "Kerastase Chroma Absolu Bain Respect Riche Refill Pouch & Refillable Bottle",
    component_sku: "11171a",
    component_name: "Kerastase Chroma Absolu Bain Respect Refillable Bottle",
    component_qty: 1,
  },
  {
    bundle_sku: "11171",
    bundle_name:
      "Kerastase Chroma Absolu Bain Respect Riche Refill Pouch & Refillable Bottle",
    component_sku: "11177",
    component_name: "Kerastase Bain Riche Chroma Respect Refill Pouch",
    component_qty: 1,
  },
  {
    bundle_sku: "11338",
    bundle_name: "Olaplex The Anti Damage Duo - No.3 & No.9",
    component_sku: "11286",
    component_name: "Olaplex No 9 Bond Serum 90ml",
    component_qty: 1,
  },
  {
    bundle_sku: "11338",
    bundle_name: "Olaplex The Anti Damage Duo - No.3 & No.9",
    component_sku: "5183",
    component_name: "OLAPLEX No. 3 Hair Perfector 100ml",
    component_qty: 1,
  },
  {
    bundle_sku: "11350",
    bundle_name: "Kerastase Genesis Homme Ultimate Collection",
    component_sku: "11374",
    component_name:
      "Kerastase Genesis Homme Daily Purifying Fortifying Shampoo - 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "11350",
    bundle_name: "Kerastase Genesis Homme Ultimate Collection",
    component_sku: "11375",
    component_name:
      "Kerastase Genesis Homme Thickness Boosting Shampoo - 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "11350",
    bundle_name: "Kerastase Genesis Homme Ultimate Collection",
    component_sku: "11376",
    component_name:
      "Kerastase Genesis Homme Strength & Thickness Boosting Spray - 150ml",
    component_qty: 1,
  },
  {
    bundle_sku: "11350",
    bundle_name: "Kerastase Genesis Homme Ultimate Collection",
    component_sku: "11377",
    component_name:
      "Kerastase Genesis Homme Instant Thickening Molding Clay - 75ml",
    component_qty: 1,
  },
  {
    bundle_sku: "11350",
    bundle_name: "Kerastase Genesis Homme Ultimate Collection",
    component_sku: "11378",
    component_name:
      "Kerastase Genesis Homme Daily Anti-Hair Fall Fortifying Serum - 90ml",
    component_qty: 1,
  },
  {
    bundle_sku: "11353",
    bundle_name: "Kerastase Genesis Homme Styling Collection",
    component_sku: "11376",
    component_name:
      "Kerastase Genesis Homme Strength & Thickness Boosting Spray - 150ml",
    component_qty: 1,
  },
  {
    bundle_sku: "11353",
    bundle_name: "Kerastase Genesis Homme Styling Collection",
    component_sku: "11377",
    component_name:
      "Kerastase Genesis Homme Instant Thickening Molding Clay - 75ml",
    component_qty: 1,
  },
  {
    bundle_sku: "11353",
    bundle_name: "Kerastase Genesis Homme Styling Collection",
    component_sku: "11378",
    component_name:
      "Kerastase Genesis Homme Daily Anti-Hair Fall Fortifying Serum - 90ml",
    component_qty: 1,
  },
  {
    bundle_sku: "11359A",
    bundle_name: "Pureology Nanoworks Gold Shampoo & Conditioner 266ml",
    component_sku: "11358",
    component_name: "Pureology Nanoworks Gold Shampoo 266ml",
    component_qty: 1,
  },
  {
    bundle_sku: "11359A",
    bundle_name: "Pureology Nanoworks Gold Shampoo & Conditioner 266ml",
    component_sku: "11359",
    component_name: "Pureology Nanoworks Gold Conditioner 266ml",
    component_qty: 1,
  },
  {
    bundle_sku: "11388",
    bundle_name: "Kerastase Genesis Homme Thickness Collection",
    component_sku: "11375",
    component_name:
      "Kerastase Genesis Homme Thickness Boosting Shampoo - 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "11388",
    bundle_name: "Kerastase Genesis Homme Thickness Collection",
    component_sku: "11376",
    component_name:
      "Kerastase Genesis Homme Strength & Thickness Boosting Spray - 150ml",
    component_qty: 1,
  },
  {
    bundle_sku: "11388",
    bundle_name: "Kerastase Genesis Homme Thickness Collection",
    component_sku: "11377",
    component_name:
      "Kerastase Genesis Homme Instant Thickening Molding Clay - 75ml",
    component_qty: 1,
  },
  {
    bundle_sku: "11389",
    bundle_name: "Kerastase Genesis Homme Fortifying Collection",
    component_sku: "11374",
    component_name:
      "Kerastase Genesis Homme Daily Purifying Fortifying Shampoo - 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "11389",
    bundle_name: "Kerastase Genesis Homme Fortifying Collection",
    component_sku: "11378",
    component_name:
      "Kerastase Genesis Homme Daily Anti-Hair Fall Fortifying Serum - 90ml",
    component_qty: 1,
  },
  {
    bundle_sku: "11497",
    bundle_name: "Color Wow Dream Coat & Money Masque Bundle",
    component_sku: "11393",
    component_name: "Color Wow and Chris Appleton Money Masque 215ml",
    component_qty: 1,
  },
  {
    bundle_sku: "11497",
    bundle_name: "Color Wow Dream Coat & Money Masque Bundle",
    component_sku: "7494",
    component_name: "Color Wow Dream Coat 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "11498",
    bundle_name: "Color Wow Dream Filter & Money Masque Bundle",
    component_sku: "11393",
    component_name: "Color Wow and Chris Appleton Money Masque 215ml",
    component_qty: 1,
  },
  {
    bundle_sku: "11498",
    bundle_name: "Color Wow Dream Filter & Money Masque Bundle",
    component_sku: "7657",
    component_name: "Color Wow Dream Filter 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "11499",
    bundle_name: "Color Wow Shampoo, Conditioner & Money Masque Bundle",
    component_sku: "11393",
    component_name: "Color Wow and Chris Appleton Money Masque 215ml",
    component_qty: 1,
  },
  {
    bundle_sku: "11499",
    bundle_name: "Color Wow Shampoo, Conditioner & Money Masque Bundle",
    component_sku: "4976",
    component_name:
      "Color Wow Colour Security Conditioner (Normal/Thick) 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "11499",
    bundle_name: "Color Wow Shampoo, Conditioner & Money Masque Bundle",
    component_sku: "7654",
    component_name: "Color Wow Security Shampoo 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "11500",
    bundle_name: "Color Wow Ultimate Styling Bundle",
    component_sku: "11393",
    component_name: "Color Wow and Chris Appleton Money Masque 215ml",
    component_qty: 1,
  },
  {
    bundle_sku: "11500",
    bundle_name: "Color Wow Ultimate Styling Bundle",
    component_sku: "7494",
    component_name: "Color Wow Dream Coat 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "11500",
    bundle_name: "Color Wow Ultimate Styling Bundle",
    component_sku: "7655",
    component_name: "Color Wow Raise the Roots 150ml",
    component_qty: 1,
  },
  {
    bundle_sku: "11500",
    bundle_name: "Color Wow Ultimate Styling Bundle",
    component_sku: "7988",
    component_name: "Color Wow EXTRA Mist-ical Shine Spray 162ml",
    component_qty: 1,
  },
  {
    bundle_sku: "11553A",
    bundle_name: "BeautiEdit PRISTINE - Express Self Tanning Foam 150ml & Mitt",
    component_sku: "10733",
    component_name: "BeautiEdit Soft Velvet Tanning Mitt",
    component_qty: 1,
  },
  {
    bundle_sku: "11553A",
    bundle_name: "BeautiEdit PRISTINE - Express Self Tanning Foam 150ml & Mitt",
    component_sku: "11553",
    component_name:
      "BeautiEdit PRISTINE - Express Self Tanning Mousse / Foam 150ml - Limited Edition",
    component_qty: 1,
  },
  {
    bundle_sku: "11553Z",
    bundle_name: "BeautiEdit - Glow Hero's",
    component_sku: "10730",
    component_name: "BeautiEdit Tan Medium - 3 in 1 Self Tanning Foam",
    component_qty: 1,
  },
  {
    bundle_sku: "11553Z",
    bundle_name: "BeautiEdit - Glow Hero's",
    component_sku: "10733",
    component_name: "BeautiEdit Soft Velvet Tanning Mitt",
    component_qty: 1,
  },
  {
    bundle_sku: "11553Z",
    bundle_name: "BeautiEdit - Glow Hero's",
    component_sku: "11553",
    component_name:
      "BeautiEdit PRISTINE - Express Self Tanning Mousse / Foam 150ml - Limited Edition",
    component_qty: 1,
  },
  {
    bundle_sku: "11553Z",
    bundle_name: "BeautiEdit - Glow Hero's",
    component_sku: "11553B",
    component_name:
      "BeautiEdit - Decadence by Lorraine Keane **Limited Edition**",
    component_qty: 1,
  },
  {
    bundle_sku: "11749",
    bundle_name: "L'Oreal Steampod V3 White with FREE Paddle Brush",
    component_sku: "9631",
    component_name: "L'Oreal Steampod V3 White",
    component_qty: 1,
  },
  {
    bundle_sku: "11750",
    bundle_name:
      "L'Oreal Steampod with FREE Steam-Active Milk 150ml & Paddle Brush",
    component_sku: "11746",
    component_name: "L'Oreal Steampod Normal Fine Milk 150ml",
    component_qty: 1,
  },
  {
    bundle_sku: "11750",
    bundle_name:
      "L'Oreal Steampod with FREE Steam-Active Milk 150ml & Paddle Brush",
    component_sku: "9631",
    component_name: "L'Oreal Steampod V3 White",
    component_qty: 1,
  },
  {
    bundle_sku: "11795",
    bundle_name: "L'Oréal Professionnel Pro Longer Duo With FREE Mask",
    component_sku: "11471",
    component_name: "L'Oréal Professionnel Pro Longer Shampoo 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "11795",
    bundle_name: "L'Oréal Professionnel Pro Longer Duo With FREE Mask",
    component_sku: "11472",
    component_name: "L'Oréal Professionnel Pro Longer Conditioner 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "11797",
    bundle_name: "L'Oréal Professionnel Vitamino Color Duo With FREE Mask",
    component_sku: "11452",
    component_name: "L'Oréal Professionnel Vitamino Color Shampoo - 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "11797",
    bundle_name: "L'Oréal Professionnel Vitamino Color Duo With FREE Mask",
    component_sku: "11453",
    component_name: "L'Oréal Professionnel Vitamino Conditioner 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "11798",
    bundle_name: "L'Oréal Professionnel Absolut Repair Golden With FREE Mask",
    component_sku: "11458",
    component_name: "L'Oréal Professionnel Absolut Repair Shampoo - 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "11798",
    bundle_name: "L'Oréal Professionnel Absolut Repair Golden With FREE Mask",
    component_sku: "11459",
    component_name: "L'Oréal Professionnel Absolut Repair Conditioner 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "11798",
    bundle_name: "L'Oréal Professionnel Absolut Repair Golden With FREE Mask",
    component_sku: "11791",
    component_name:
      "L'Oréal Professionnel Absolut Repair Golden Lightweight Mask 75ml",
    component_qty: 1,
  },
  {
    bundle_sku: "11849",
    bundle_name: "CeraVe Best Sellers Duo",
    component_sku: "11295",
    component_name: "CeraVe Moisturising Cream Tube - 177ml",
    component_qty: 1,
  },
  {
    bundle_sku: "11849",
    bundle_name: "CeraVe Best Sellers Duo",
    component_sku: "8788",
    component_name: "CeraVe Hydrating Cleanser (Pump) 236ml",
    component_qty: 1,
  },
  {
    bundle_sku: "11850",
    bundle_name: "Kerastase Blond Absolu Shine and Hydrating Duo",
    component_sku: "8775",
    component_name: "Kerastase Blond Absolu Bain Lumiére 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "11850",
    bundle_name: "Kerastase Blond Absolu Shine and Hydrating Duo",
    component_sku: "8776",
    component_name: "Kerastase Blond Absolu Fondant Cicaflash 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "11851",
    bundle_name: "Olaplex Bonding Duo",
    component_sku: "7604",
    component_name: "Olaplex No.6 Bond Smoother",
    component_qty: 1,
  },
  {
    bundle_sku: "11851",
    bundle_name: "Olaplex Bonding Duo",
    component_sku: "7924",
    component_name: "Olaplex No.7 Bonding Oil 30ml",
    component_qty: 1,
  },
  {
    bundle_sku: "11852",
    bundle_name: "Redken Acidic Bonding Shampoo and Conditioner Duo",
    component_sku: "9762",
    component_name: "Redken Acidic Bonding Concentrate Shampoo 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "11852",
    bundle_name: "Redken Acidic Bonding Shampoo and Conditioner Duo",
    component_sku: "9763",
    component_name: "Redken Acidic Bonding Concentrate Conditioner 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "11853",
    bundle_name: "The Ordinary Caffeine Solution 5% + EGCG Duo",
    component_sku: "5755",
    component_name: "The Ordinary Caffeine Solution 5% + EGCG 30ml",
    component_qty: 2,
  },
  {
    bundle_sku: "11854",
    bundle_name: "The Ordinary Hyaluronic Acid 2% + B5 Hydration Duo",
    component_sku: "5673",
    component_name: "The Ordinary Hyaluronic Acid 2% + B5 - 30ml",
    component_qty: 2,
  },
  {
    bundle_sku: "11855",
    bundle_name: "Kerastase Densifique Bain Densite 250ml Duo",
    component_sku: "9140",
    component_name: "Kerastase Densifique Bain Stemfree 250ml",
    component_qty: 2,
  },
  {
    bundle_sku: "11856",
    bundle_name: "The Ordinary Anti-Ageing Hydration Duo",
    component_sku: "5667",
    component_name: "The Ordinary Buffet 30ml",
    component_qty: 1,
  },
  {
    bundle_sku: "11856",
    bundle_name: "The Ordinary Anti-Ageing Hydration Duo",
    component_sku: "5673",
    component_name: "The Ordinary Hyaluronic Acid 2% + B5 - 30ml",
    component_qty: 1,
  },
  {
    bundle_sku: "11857",
    bundle_name: "Kerastase Genesis Duo for Normal to Oily Hair",
    component_sku: "8779",
    component_name: "Kerastase Genesis Bain Hydra-Fortifiant 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "11857",
    bundle_name: "Kerastase Genesis Duo for Normal to Oily Hair",
    component_sku: "8781",
    component_name: "Kerastase Genesis Fondant Renforçateur 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "11858",
    bundle_name: "Olaplex No.7 and No.3 Duo",
    component_sku: "5183",
    component_name: "OLAPLEX No. 3 Hair Perfector 100ml",
    component_qty: 1,
  },
  {
    bundle_sku: "11858",
    bundle_name: "Olaplex No.7 and No.3 Duo",
    component_sku: "7924",
    component_name: "Olaplex No.7 Bonding Oil 30ml",
    component_qty: 1,
  },
  {
    bundle_sku: "11859",
    bundle_name: "CeraVe Your Best Skin PM Duo",
    component_sku: "11289",
    component_name: "CeraVe Facial Moist Lotion No Spf - 52ml",
    component_qty: 1,
  },
  {
    bundle_sku: "11859",
    bundle_name: "CeraVe Your Best Skin PM Duo",
    component_sku: "11292",
    component_name: "CeraVe Hydrating Cleanser - 236ml",
    component_qty: 1,
  },
  {
    bundle_sku: "11860",
    bundle_name: "Redken All Soft Mega Shampoo and Conditioner Duo",
    component_sku: "6439",
    component_name: "Redken All Soft Mega Conditioner 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "11860",
    bundle_name: "Redken All Soft Mega Shampoo and Conditioner Duo",
    component_sku: "6440",
    component_name: "Redken All Soft Mega Shampoo 300ml (Very Dry Hair)",
    component_qty: 1,
  },
  {
    bundle_sku: "11861",
    bundle_name: "Olaplex No.3 and No.6 Duo",
    component_sku: "5183",
    component_name: "OLAPLEX No. 3 Hair Perfector 100ml",
    component_qty: 1,
  },
  {
    bundle_sku: "11861",
    bundle_name: "Olaplex No.3 and No.6 Duo",
    component_sku: "7604",
    component_name: "Olaplex No.6 Bond Smoother",
    component_qty: 1,
  },
  {
    bundle_sku: "11862",
    bundle_name: "Kerastase Blond Absolu Neutralise and Condition Duo",
    component_sku: "8774",
    component_name: "Kerastase Blond Absolu Bain Ultra-Violet 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "11862",
    bundle_name: "Kerastase Blond Absolu Neutralise and Condition Duo",
    component_sku: "8776",
    component_name: "Kerastase Blond Absolu Fondant Cicaflash 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "11863",
    bundle_name: "Cerave Cleanser Large Duo",
    component_sku: "11294",
    component_name: "CeraVe Moisturising Cream Jar - 340g",
    component_qty: 1,
  },
  {
    bundle_sku: "11863",
    bundle_name: "Cerave Cleanser Large Duo",
    component_sku: "8789",
    component_name: "CeraVe Hydrating Cleanser (Pump) 473ml",
    component_qty: 1,
  },
  {
    bundle_sku: "11864",
    bundle_name: "Kerastase Resistance Therepiste Serum 30ml Duo",
    component_sku: "KER_E1490200",
    component_name: "Kerastase Resistance Therapiste Serum 30ml",
    component_qty: 2,
  },
  {
    bundle_sku: "11865",
    bundle_name: "CeraVe Cleanse the Day Away Duo",
    component_sku: "11289",
    component_name: "CeraVe Facial Moist Lotion No Spf - 52ml",
    component_qty: 1,
  },
  {
    bundle_sku: "11865",
    bundle_name: "CeraVe Cleanse the Day Away Duo",
    component_sku: "11290",
    component_name: "CeraVe Foaming Cleanser - 236ml",
    component_qty: 1,
  },
  {
    bundle_sku: "11866",
    bundle_name: "Redken Extreme Shampoo 300ml Duo",
    component_sku: "REDK_P027970",
    component_name: "Redken - Extreme Shampoo 300ml",
    component_qty: 2,
  },
  {
    bundle_sku: "11867",
    bundle_name: "Redken Color Extend Magnetic Shampoo 300ml Duo",
    component_sku: "REDK_P042820",
    component_name: "Redken - Colour Extend Magnetics Shampoo 300ml",
    component_qty: 2,
  },
  {
    bundle_sku: "11868",
    bundle_name: "L'Oréal Professionnel Inforcer Shampoo and Conditioner Duo",
    component_sku: "11468",
    component_name: "L'Oréal Professionnel Inforcer Shampoo 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "11868",
    bundle_name: "L'Oréal Professionnel Inforcer Shampoo and Conditioner Duo",
    component_sku: "11469",
    component_name: "L'Oréal Professionnel Inforcer Conditioner 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "11869",
    bundle_name: "Kerastase Resistance Volumifique Bain 250ml Duo",
    component_sku: "KER_4402026",
    component_name: "Kerastase  Resistance Volumifique Bain 250ml",
    component_qty: 2,
  },
  {
    bundle_sku: "11870",
    bundle_name: "Kerastase Densifique Conditioner 200ml Duo",
    component_sku: "9135",
    component_name: "Kerastase Densifique Conditioner 200ml",
    component_qty: 2,
  },
  {
    bundle_sku: "11871",
    bundle_name:
      "Kerastase Specifique Bain Anti-Pelliculaire Shampoo 250ml Duo",
    component_sku: "5207",
    component_name: "Kerastase Specifique Bain Anti-Pelliculaire 250ml",
    component_qty: 2,
  },
  {
    bundle_sku: "11872",
    bundle_name: "Kerastase Genesis Masque and Shampoo Duo",
    component_sku: "8780",
    component_name: "Kerastase Genesis Bain Nutri-Fortifiant 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "11872",
    bundle_name: "Kerastase Genesis Masque and Shampoo Duo",
    component_sku: "8782",
    component_name: "Kerastase Genesis Masque Reconstituant 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "11873",
    bundle_name:
      "L'Oréal Professionnel Blondifier Gloss Shampoo and Conditioner Duo",
    component_sku: "11477",
    component_name: "L'Oréal Professionnel Blondifier Gloss Shampoo 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "11873",
    bundle_name:
      "L'Oréal Professionnel Blondifier Gloss Shampoo and Conditioner Duo",
    component_sku: "11479",
    component_name: "L'Oréal Professionnel Blondifier Conditioner - 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "11874",
    bundle_name: "Redken Curvaceous Cream Duo",
    component_sku: "REDK_CCOND.",
    component_name: "Redken - Curvaceous Conditioner 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "11874",
    bundle_name: "Redken Curvaceous Cream Duo",
    component_sku: "REDK_CSHAM.",
    component_name: "Redken - Curvaceous Shampoo 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "11875",
    bundle_name: "Kerastase Resistance Therapiste Soin 200ml Duo",
    component_sku: "9129",
    component_name: "Kerastase Resistance Therapiste Soin 200ml",
    component_qty: 2,
  },
  {
    bundle_sku: "11876",
    bundle_name: "Kerastase Resistance Ciment Anti-Usure 200ml Duo",
    component_sku: "KER_E046500",
    component_name: "Kerastase Resistance Ciment Anti Usure 200ml",
    component_qty: 2,
  },
  {
    bundle_sku: "11877",
    bundle_name: "Redken One United Multi-Benefit Treatment 150ml Duo",
    component_sku: "5011",
    component_name: "Redken - One United 150ml",
    component_qty: 2,
  },
  {
    bundle_sku: "11878",
    bundle_name: "Kerastase Densifique Bain Homme 250ml Duo",
    component_sku: "9134",
    component_name: "Kerastase Densifique Bain Homme 250ml",
    component_qty: 2,
  },
  {
    bundle_sku: "12123",
    bundle_name: "Joico Blonde Life Shampoo & Conditioner Gift Set 2022",
    component_sku: "6192",
    component_name: "Joico Blonde Life Brightening Conditioner 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "12123",
    bundle_name: "Joico Blonde Life Shampoo & Conditioner Gift Set 2022",
    component_sku: "6193",
    component_name: "Joico Blonde Life Brightening Shampoo 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "12124",
    bundle_name: "Joico Colorful Shampoo & Conditioner Gift Set 2022",
    component_sku: "10541",
    component_name: "Joico Colorful Anti-Fade Shampoo 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "12124",
    bundle_name: "Joico Colorful Shampoo & Conditioner Gift Set 2022",
    component_sku: "10542",
    component_name: "Joico Colorful Anti-Fade Conditioner 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "12125",
    bundle_name: "Joico Defy Damage Shampoo & Conditioner Gift Set 2022",
    component_sku: "7508",
    component_name: "Joico Defy Damage Protective Shampoo 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "12125",
    bundle_name: "Joico Defy Damage Shampoo & Conditioner Gift Set 2022",
    component_sku: "7509",
    component_name: "Joico Defy Damage Protective Conditioner 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "12126",
    bundle_name: "Joico Hydrasplash Shampoo & Conditioner Gift Set 2022",
    component_sku: "8223",
    component_name: "Joico HydraSplash Hydrating Shampoo 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "12126",
    bundle_name: "Joico Hydrasplash Shampoo & Conditioner Gift Set 2022",
    component_sku: "8224",
    component_name: "Joico HydraSplash Hydrating Conditioner 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "12127",
    bundle_name: "Joico JoiFull Volume Shampoo & Conditioner Gift Set 2022",
    component_sku: "7992",
    component_name: "Joico Joifull Volume Condtioner 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "12127",
    bundle_name: "Joico JoiFull Volume Shampoo & Conditioner Gift Set 2022",
    component_sku: "7993",
    component_name: "Joico Joifull Volume Shampoo 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "12263",
    bundle_name: "Olaplex Shampoo & Conditioner 1 Litre Bundle",
    component_sku: "12261",
    component_name: "Olaplex No.4 Bond Maintenance Shampoo 1 Litre",
    component_qty: 1,
  },
  {
    bundle_sku: "12263",
    bundle_name: "Olaplex Shampoo & Conditioner 1 Litre Bundle",
    component_sku: "12262",
    component_name: "Olaplex No.5 Bond Maintenance Conditioner 1 Litre",
    component_qty: 1,
  },
  {
    bundle_sku: "12335",
    bundle_name: "Turn Down The Heat Damage Bundle",
    component_sku: "5183",
    component_name: "OLAPLEX No. 3 Hair Perfector 100ml",
    component_qty: 1,
  },
  {
    bundle_sku: "12335",
    bundle_name: "Turn Down The Heat Damage Bundle",
    component_sku: "6347",
    component_name: "Moroccanoil Perfect Defense 225ml (Heat Protection)",
    component_qty: 1,
  },
  {
    bundle_sku: "12335",
    bundle_name: "Turn Down The Heat Damage Bundle",
    component_sku: "9128",
    component_name: "Kerastase Resistance Bain Therapiste 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "12335",
    bundle_name: "Turn Down The Heat Damage Bundle",
    component_sku: "KER_E1490200",
    component_name: "Kerastase Resistance Therapiste Serum 30ml",
    component_qty: 1,
  },
  {
    bundle_sku: "12336",
    bundle_name: "The Bleach Recovery Bundle",
    component_sku: "11264",
    component_name: "K18 Leave-In Molecular Repair Hair Mask 50ml",
    component_qty: 1,
  },
  {
    bundle_sku: "12336",
    bundle_name: "The Bleach Recovery Bundle",
    component_sku: "11265",
    component_name:
      "K18 Biomimetic Hairscience Professional Molecular Repair Mist 150ml",
    component_qty: 1,
  },
  {
    bundle_sku: "12336",
    bundle_name: "The Bleach Recovery Bundle",
    component_sku: "9911",
    component_name: "Redken Extreme Bleach Recovery Treatment Shampoo 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "12336",
    bundle_name: "The Bleach Recovery Bundle",
    component_sku: "9912",
    component_name: "Redken Extreme Bleach Recovery Lamellar Water 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "12336",
    bundle_name: "The Bleach Recovery Bundle",
    component_sku: "9913",
    component_name: "Redken Extreme Bleach Recovery Cica Cream 150ml",
    component_qty: 1,
  },
  {
    bundle_sku: "12337",
    bundle_name: "Quench Your Hair Bundle",
    component_sku: "6198",
    component_name: "Joico K-Pak Intense Hydrator 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "12337",
    bundle_name: "Quench Your Hair Bundle",
    component_sku: "6346",
    component_name: "Moroccanoil Mending Infusion 75ml (Split Ends)",
    component_qty: 1,
  },
  {
    bundle_sku: "12337",
    bundle_name: "Quench Your Hair Bundle",
    component_sku: "9949",
    component_name: "Olaplex No.8 Bond Intense Moisture Mask 100ml",
    component_qty: 1,
  },
  {
    bundle_sku: "12337",
    bundle_name: "Quench Your Hair Bundle",
    component_sku: "MOR_MO0018",
    component_name: "Moroccanoil - Moisture Repair Shampoo 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "12337",
    bundle_name: "Quench Your Hair Bundle",
    component_sku: "MOR_MO0020",
    component_name: "Moroccanoil Moisture Repair Conditioner 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "12338",
    bundle_name: "Calm Your Scalp Bundle",
    component_sku: "11104",
    component_name:
      "The Inkey List Glycolic Acid Exfoliating Scalp Scrub 150ml",
    component_qty: 1,
  },
  {
    bundle_sku: "12338",
    bundle_name: "Calm Your Scalp Bundle",
    component_sku: "11485A",
    component_name: "L'Oréal Professionnel Sensi Balance Shampoo 500ml",
    component_qty: 1,
  },
  {
    bundle_sku: "12338",
    bundle_name: "Calm Your Scalp Bundle",
    component_sku: "9123",
    component_name: "Kerastase Specifique Cure Apaisante Inten 12*6ml",
    component_qty: 1,
  },
  {
    bundle_sku: "12339",
    bundle_name: "Kerastase Symbiose Anti Dandruff Bundle",
    component_sku: "12255",
    component_name:
      "Kérastase Symbiose Micro-Exfoliating Cellular Treatment 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "12339",
    bundle_name: "Kerastase Symbiose Anti Dandruff Bundle",
    component_sku: "12256",
    component_name:
      "Kérastase Symbiose Purifying Anti-Dandruff Cellular Shampoo 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "12339",
    bundle_name: "Kerastase Symbiose Anti Dandruff Bundle",
    component_sku: "12257",
    component_name:
      "Kérastase Symbiose Moisturising Anti-Dandruff Cellular Shampoo 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "12339",
    bundle_name: "Kerastase Symbiose Anti Dandruff Bundle",
    component_sku: "12258",
    component_name:
      "Kérastase Symbiose Detangling Soothing Cellular Conditioner 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "12339",
    bundle_name: "Kerastase Symbiose Anti Dandruff Bundle",
    component_sku: "12259",
    component_name: "Kérastase Symbiose Masque Intense Revitalising Mask 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "12339",
    bundle_name: "Kerastase Symbiose Anti Dandruff Bundle",
    component_sku: "12260",
    component_name:
      "Kérastase Symbiose Intensive Anti-Dandruff Cellular Night Serum 90ml",
    component_qty: 1,
  },
  {
    bundle_sku: "12340",
    bundle_name: "Greasy No More Bundle",
    component_sku: "10918",
    component_name: "Kerastase Specifique Potentialiste Serum 90ml",
    component_qty: 1,
  },
  {
    bundle_sku: "12340",
    bundle_name: "Greasy No More Bundle",
    component_sku: "10919",
    component_name: "Kerastase Specifique Argile Equilibrante 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "12340",
    bundle_name: "Greasy No More Bundle",
    component_sku: "11476",
    component_name: "L'Oréal Professionnel Pure Resource Shampoo - 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "12341",
    bundle_name: "Bye-Bye Dry Scalp Bundle",
    component_sku: "11485A",
    component_name: "L'Oréal Professionnel Sensi Balance Shampoo 500ml",
    component_qty: 1,
  },
  {
    bundle_sku: "12341",
    bundle_name: "Bye-Bye Dry Scalp Bundle",
    component_sku: "11695",
    component_name:
      "The Ordinary Natural Moisturizing Factors + HA for Scalp 60ml",
    component_qty: 1,
  },
  {
    bundle_sku: "12341",
    bundle_name: "Bye-Bye Dry Scalp Bundle",
    component_sku: "9122",
    component_name: "Kerastase Specifique Masque Hydra Apaisant 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "12341",
    bundle_name: "Bye-Bye Dry Scalp Bundle",
    component_sku: "MOR_MO0075",
    component_name: "Moroccanoil Dry Scalp Treatment - 45ml",
    component_qty: 1,
  },
  {
    bundle_sku: "12405",
    bundle_name: "Mum's The Word Bundle",
    component_sku: "10935",
    component_name: "NUXE Bougie Candle GWP",
    component_qty: 1,
  },
  {
    bundle_sku: "12405",
    bundle_name: "Mum's The Word Bundle",
    component_sku: "11026",
    component_name: "Carter Beauty Revitalise Retinol & Collagen Mask",
    component_qty: 1,
  },
  {
    bundle_sku: "12405",
    bundle_name: "Mum's The Word Bundle",
    component_sku: "MOR_MO0029",
    component_name: "Moroccanoil Treatment - 25ml",
    component_qty: 1,
  },
  {
    bundle_sku: "12750",
    bundle_name:
      "Moroccanoil Oil Eurovision Treatment Original - 125ml For The Price of 100ml",
    component_sku: "mor_mo0041",
    component_name: "Moroccanoil Treatment Oil 125ml for the price of 100ml",
    component_qty: 1,
  },
  {
    bundle_sku: "12756",
    bundle_name: "Alfaparf Semi Di Lino Smooth Extra Value Bundle",
    component_sku: "10497A",
    component_name: "Alfaparf Semi Di Lino Smooth - Holiday Gift Set",
    component_qty: 1,
  },
  {
    bundle_sku: "12756",
    bundle_name: "Alfaparf Semi Di Lino Smooth Extra Value Bundle",
    component_sku: "11414",
    component_name: "Alfaparf Semi Di Lino Smooth Vegan Duo Set",
    component_qty: 1,
  },
  {
    bundle_sku: "12756",
    bundle_name: "Alfaparf Semi Di Lino Smooth Extra Value Bundle",
    component_sku: "11503",
    component_name: "Alfaparf Semi di Lino Capri Smooth Beauty Routine",
    component_qty: 1,
  },
  {
    bundle_sku: "12756",
    bundle_name: "Alfaparf Semi Di Lino Smooth Extra Value Bundle",
    component_sku: "6481A",
    component_name: "Alfaparf Semi Di Lino Diamond Cryst Liquid 15ml",
    component_qty: 1,
  },
  {
    bundle_sku: "12756A",
    bundle_name: "Smooth Extra Value Bundle",
    component_sku: "12756",
    component_name: "Alfaparf Semi Di Lino Smooth Extra Value Bundle",
    component_qty: 1,
  },
  {
    bundle_sku: "12757",
    bundle_name: "Alfaparf Semi Di Lino Smooth Deluxe Bundle",
    component_sku: "10497A",
    component_name: "Alfaparf Semi Di Lino Smooth - Holiday Gift Set",
    component_qty: 1,
  },
  {
    bundle_sku: "12757",
    bundle_name: "Alfaparf Semi Di Lino Smooth Deluxe Bundle",
    component_sku: "11414",
    component_name: "Alfaparf Semi Di Lino Smooth Vegan Duo Set",
    component_qty: 1,
  },
  {
    bundle_sku: "12757",
    bundle_name: "Alfaparf Semi Di Lino Smooth Deluxe Bundle",
    component_sku: "6481A",
    component_name: "Alfaparf Semi Di Lino Diamond Cryst Liquid 15ml",
    component_qty: 1,
  },
  {
    bundle_sku: "12757A",
    bundle_name: "Smooth Deluxe Bundle",
    component_sku: "12757",
    component_name: "Alfaparf Semi Di Lino Smooth Deluxe Bundle",
    component_qty: 1,
  },
  {
    bundle_sku: "12758",
    bundle_name:
      "Alfaparf Semi Di Lino Smooth Holiday Gift Set PLUS Free Cristalli Liquidi 15ml",
    component_sku: "10497A",
    component_name: "Alfaparf Semi Di Lino Smooth - Holiday Gift Set",
    component_qty: 1,
  },
  {
    bundle_sku: "12758",
    bundle_name:
      "Alfaparf Semi Di Lino Smooth Holiday Gift Set PLUS Free Cristalli Liquidi 15ml",
    component_sku: "6481A",
    component_name: "Alfaparf Semi Di Lino Diamond Cryst Liquid 15ml",
    component_qty: 1,
  },
  {
    bundle_sku: "12758A",
    bundle_name: "Smooth Holiday Gift Set PLUS Free Cristalli Liquidi 15ml",
    component_sku: "12758",
    component_name:
      "Alfaparf Semi Di Lino Smooth Holiday Gift Set PLUS Free Cristalli Liquidi 15ml",
    component_qty: 1,
  },
  {
    bundle_sku: "12885",
    bundle_name: "Beaba 2 Piece Camele'O Bundle - Premium",
    component_sku: "10022",
    component_name: "Beaba Camele’O 1st-Stage Baby Bath - Light Grey",
    component_qty: 1,
  },
  {
    bundle_sku: "12885",
    bundle_name: "Beaba 2 Piece Camele'O Bundle - Premium",
    component_sku: "10025",
    component_name: "Beaba Camele’O Stand For Camele’O Bath - Light Mist",
    component_qty: 1,
  },
  {
    bundle_sku: "12886",
    bundle_name: "Beaba 3 Piece Camele'O Bundle - Ultra Premium",
    component_sku: "10022",
    component_name: "Beaba Camele’O 1st-Stage Baby Bath - Light Grey",
    component_qty: 1,
  },
  {
    bundle_sku: "12886",
    bundle_name: "Beaba 3 Piece Camele'O Bundle - Ultra Premium",
    component_sku: "10025",
    component_name: "Beaba Camele’O Stand For Camele’O Bath - Light Mist",
    component_qty: 1,
  },
  {
    bundle_sku: "12886",
    bundle_name: "Beaba 3 Piece Camele'O Bundle - Ultra Premium",
    component_sku: "12595",
    component_name: "Beaba Camélé’O Changing Topper & Mat - Light Mist",
    component_qty: 1,
  },
  {
    bundle_sku: "12887",
    bundle_name: "Beaba Babycook Express Weaning Bundle - Grey With Blue Set",
    component_sku: "12593",
    component_name:
      "Beaba Babycook® Solo Express Grey Baby Food Steamer Blender",
    component_qty: 1,
  },
  {
    bundle_sku: "12887",
    bundle_name: "Beaba Babycook Express Weaning Bundle - Grey With Blue Set",
    component_sku: "12615",
    component_name: "Beaba Pasta / Rice cooker - Babycook® Solo Express",
    component_qty: 1,
  },
  {
    bundle_sku: "12887",
    bundle_name: "Beaba Babycook Express Weaning Bundle - Grey With Blue Set",
    component_sku: "12617",
    component_name:
      "Beaba Silicone multiportions Weaning Storage Trays 6 x 90 ml light mist",
    component_qty: 1,
  },
  {
    bundle_sku: "12888",
    bundle_name: "Beaba Babycook Express Weaning Bundle - Grey With Pink Set",
    component_sku: "12593",
    component_name:
      "Beaba Babycook® Solo Express Grey Baby Food Steamer Blender",
    component_qty: 1,
  },
  {
    bundle_sku: "12888",
    bundle_name: "Beaba Babycook Express Weaning Bundle - Grey With Pink Set",
    component_sku: "12610",
    component_name: "Beaba Silicone meal set (3 pcs) - pink",
    component_qty: 1,
  },
  {
    bundle_sku: "12888",
    bundle_name: "Beaba Babycook Express Weaning Bundle - Grey With Pink Set",
    component_sku: "12615",
    component_name: "Beaba Pasta / Rice cooker - Babycook® Solo Express",
    component_qty: 1,
  },
  {
    bundle_sku: "12888",
    bundle_name: "Beaba Babycook Express Weaning Bundle - Grey With Pink Set",
    component_sku: "12617",
    component_name:
      "Beaba Silicone multiportions Weaning Storage Trays 6 x 90 ml light mist",
    component_qty: 1,
  },
  {
    bundle_sku: "12889",
    bundle_name: "Beaba Babycook Neo Basics Bundle - Eucalyptus",
    component_sku: "10002",
    component_name: "Beaba Babycook Neo Baby Food Steamer Blender - Eucalyptus",
    component_qty: 1,
  },
  {
    bundle_sku: "12889",
    bundle_name: "Beaba Babycook Neo Basics Bundle - Eucalyptus",
    component_sku: "12613",
    component_name:
      "Beaba Set of 2 Glass Storage Jars (150 ml airy green / 250 ml light mist)",
    component_qty: 1,
  },
  {
    bundle_sku: "12889",
    bundle_name: "Beaba Babycook Neo Basics Bundle - Eucalyptus",
    component_sku: "12616",
    component_name: "Beaba Pasta / Rice cooker - Babycook® NEO",
    component_qty: 1,
  },
  {
    bundle_sku: "12890",
    bundle_name: "Beaba Babycook Neo Basics Bundle - Grey / White",
    component_sku: "12613",
    component_name:
      "Beaba Set of 2 Glass Storage Jars (150 ml airy green / 250 ml light mist)",
    component_qty: 1,
  },
  {
    bundle_sku: "12890",
    bundle_name: "Beaba Babycook Neo Basics Bundle - Grey / White",
    component_sku: "12616",
    component_name: "Beaba Pasta / Rice cooker - Babycook® NEO",
    component_qty: 1,
  },
  {
    bundle_sku: "12890",
    bundle_name: "Beaba Babycook Neo Basics Bundle - Grey / White",
    component_sku: "8088",
    component_name: "BÃ©aba 4 in 1 Babycook NEO Grey/White",
    component_qty: 1,
  },
  {
    bundle_sku: "12891",
    bundle_name: "Beaba Babycook Neo Basics Bundle - Night Blue",
    component_sku: "12110",
    component_name: "Beaba Glass Storage Jars 150ml Pink & 250ml Dark Blue",
    component_qty: 1,
  },
  {
    bundle_sku: "12891",
    bundle_name: "Beaba Babycook Neo Basics Bundle - Night Blue",
    component_sku: "12616",
    component_name: "Beaba Pasta / Rice cooker - Babycook® NEO",
    component_qty: 1,
  },
  {
    bundle_sku: "12891",
    bundle_name: "Beaba Babycook Neo Basics Bundle - Night Blue",
    component_sku: "8089",
    component_name: "BÃ©aba 4 in 1 Babycook NEO Night Blue",
    component_qty: 1,
  },
  {
    bundle_sku: "12892",
    bundle_name: "Beaba Babycook Neo Weaning Bundle - Eucalyptus",
    component_sku: "10002",
    component_name: "Beaba Babycook Neo Baby Food Steamer Blender - Eucalyptus",
    component_qty: 1,
  },
  {
    bundle_sku: "12892",
    bundle_name: "Beaba Babycook Neo Weaning Bundle - Eucalyptus",
    component_sku: "10014",
    component_name: "Beaba Silicone Meal Set (4 pcs) - Eucalyptus",
    component_qty: 1,
  },
  {
    bundle_sku: "12892",
    bundle_name: "Beaba Babycook Neo Weaning Bundle - Eucalyptus",
    component_sku: "12613",
    component_name:
      "Beaba Set of 2 Glass Storage Jars (150 ml airy green / 250 ml light mist)",
    component_qty: 1,
  },
  {
    bundle_sku: "12892",
    bundle_name: "Beaba Babycook Neo Weaning Bundle - Eucalyptus",
    component_sku: "12616",
    component_name: "Beaba Pasta / Rice cooker - Babycook® NEO",
    component_qty: 1,
  },
  {
    bundle_sku: "12893",
    bundle_name: "Beaba Babycook Neo Weaning Bundle - Grey / White",
    component_sku: "12611",
    component_name: "Beaba Silicone meal set (4 pcs) - Jungle Mist",
    component_qty: 1,
  },
  {
    bundle_sku: "12893",
    bundle_name: "Beaba Babycook Neo Weaning Bundle - Grey / White",
    component_sku: "12613",
    component_name:
      "Beaba Set of 2 Glass Storage Jars (150 ml airy green / 250 ml light mist)",
    component_qty: 1,
  },
  {
    bundle_sku: "12893",
    bundle_name: "Beaba Babycook Neo Weaning Bundle - Grey / White",
    component_sku: "12616",
    component_name: "Beaba Pasta / Rice cooker - Babycook® NEO",
    component_qty: 1,
  },
  {
    bundle_sku: "12893",
    bundle_name: "Beaba Babycook Neo Weaning Bundle - Grey / White",
    component_sku: "8088",
    component_name: "BÃ©aba 4 in 1 Babycook NEO Grey/White",
    component_qty: 1,
  },
  {
    bundle_sku: "12894",
    bundle_name: "Beaba Babycook Neo Weaning Bundle - Night Blue",
    component_sku: "10013",
    component_name: "Beaba Silicone Meal Set (4 pcs) - Night Blue",
    component_qty: 1,
  },
  {
    bundle_sku: "12894",
    bundle_name: "Beaba Babycook Neo Weaning Bundle - Night Blue",
    component_sku: "12110",
    component_name: "Beaba Glass Storage Jars 150ml Pink & 250ml Dark Blue",
    component_qty: 1,
  },
  {
    bundle_sku: "12894",
    bundle_name: "Beaba Babycook Neo Weaning Bundle - Night Blue",
    component_sku: "12616",
    component_name: "Beaba Pasta / Rice cooker - Babycook® NEO",
    component_qty: 1,
  },
  {
    bundle_sku: "12894",
    bundle_name: "Beaba Babycook Neo Weaning Bundle - Night Blue",
    component_sku: "8089",
    component_name: "BÃ©aba 4 in 1 Babycook NEO Night Blue",
    component_qty: 1,
  },
  {
    bundle_sku: "12895",
    bundle_name: "Beaba Babycook Solo Express Basics Bundle - Grey",
    component_sku: "12593",
    component_name:
      "Beaba Babycook® Solo Express Grey Baby Food Steamer Blender",
    component_qty: 1,
  },
  {
    bundle_sku: "12895",
    bundle_name: "Beaba Babycook Solo Express Basics Bundle - Grey",
    component_sku: "12615",
    component_name: "Beaba Pasta / Rice cooker - Babycook® Solo Express",
    component_qty: 1,
  },
  {
    bundle_sku: "12895",
    bundle_name: "Beaba Babycook Solo Express Basics Bundle - Grey",
    component_sku: "12617",
    component_name:
      "Beaba Silicone multiportions Weaning Storage Trays 6 x 90 ml light mist",
    component_qty: 1,
  },
  {
    bundle_sku: "12896",
    bundle_name: "Beaba Cameleo & Lotus Thermometer Bundle V1",
    component_sku: "10022",
    component_name: "Beaba Camele’O 1st-Stage Baby Bath - Light Grey",
    component_qty: 1,
  },
  {
    bundle_sku: "12896",
    bundle_name: "Beaba Cameleo & Lotus Thermometer Bundle V1",
    component_sku: "10025",
    component_name: "Beaba Camele’O Stand For Camele’O Bath - Light Mist",
    component_qty: 1,
  },
  {
    bundle_sku: "12896",
    bundle_name: "Beaba Cameleo & Lotus Thermometer Bundle V1",
    component_sku: "10027",
    component_name:
      "Beaba Lotus Multi-Functional Digital Thermometer - Green/Blue",
    component_qty: 1,
  },
  {
    bundle_sku: "12897",
    bundle_name: "Beaba Cameleo & Lotus Thermometer Bundle V2",
    component_sku: "10024",
    component_name: "Beaba Camele’O 1st-Stage Baby Bath - Old Pink",
    component_qty: 1,
  },
  {
    bundle_sku: "12897",
    bundle_name: "Beaba Cameleo & Lotus Thermometer Bundle V2",
    component_sku: "10025",
    component_name: "Beaba Camele’O Stand For Camele’O Bath - Light Mist",
    component_qty: 1,
  },
  {
    bundle_sku: "12897",
    bundle_name: "Beaba Cameleo & Lotus Thermometer Bundle V2",
    component_sku: "10028",
    component_name:
      "Beaba Lotus Multi-Functional Digital Thermometer - Old Pink",
    component_qty: 1,
  },
  {
    bundle_sku: "12898",
    bundle_name: "Beaba Cameleo & Transatdo Bundle",
    component_sku: "10026",
    component_name: "Beaba Transatdo 1st-Stage Baby Bath Support - Blue/Grey",
    component_qty: 1,
  },
  {
    bundle_sku: "12898",
    bundle_name: "Beaba Cameleo & Transatdo Bundle",
    component_sku: "12596",
    component_name: "Beaba Camélé’O Pop Up Baby Bath - Green/Blue",
    component_qty: 1,
  },
  {
    bundle_sku: "12899",
    bundle_name: "Beaba Silicone Meal Seat And Bibs Bundle - Grey / Blue",
    component_sku: "12600",
    component_name: "Beaba Set of 2 Silicone Bibs - Light Mist/Old Blue",
    component_qty: 1,
  },
  {
    bundle_sku: "12899",
    bundle_name: "Beaba Silicone Meal Seat And Bibs Bundle - Grey / Blue",
    component_sku: "12609",
    component_name: "Beaba Silicone meal set (3 pcs) - blue",
    component_qty: 1,
  },
  {
    bundle_sku: "12899A",
    bundle_name: "Beaba Silicone Meal Seat And Bibs Bundle - Grey / Pink",
    component_sku: "12601",
    component_name: "Beaba Set of 2 Silicone Bibs - Light Mist/Old Pink",
    component_qty: 1,
  },
  {
    bundle_sku: "12899A",
    bundle_name: "Beaba Silicone Meal Seat And Bibs Bundle - Grey / Pink",
    component_sku: "12610",
    component_name: "Beaba Silicone meal set (3 pcs) - pink",
    component_qty: 1,
  },
  {
    bundle_sku: "12900",
    bundle_name: "Cerave Large Moisturising Cream Duo",
    component_sku: "11294",
    component_name: "CeraVe Moisturising Cream Jar - 340g",
    component_qty: 1,
  },
  {
    bundle_sku: "12900",
    bundle_name: "Cerave Large Moisturising Cream Duo",
    component_sku: "11296",
    component_name: "CeraVe Reparative Hand Cream - 50ml",
    component_qty: 1,
  },
  {
    bundle_sku: "12901",
    bundle_name: "Cerave Medium Moisturising Duo",
    component_sku: "11295",
    component_name: "CeraVe Moisturising Cream Tube - 177ml",
    component_qty: 1,
  },
  {
    bundle_sku: "12901",
    bundle_name: "Cerave Medium Moisturising Duo",
    component_sku: "11296",
    component_name: "CeraVe Reparative Hand Cream - 50ml",
    component_qty: 1,
  },
  {
    bundle_sku: "12902",
    bundle_name: "Cocoonababy & Cocoonacover Bundle - White",
    component_sku: "12605",
    component_name:
      "Red Castle Cocoonacover - Fleur de coton ® Lightweight 1.0 Tog - White",
    component_qty: 1,
  },
  {
    bundle_sku: "12902",
    bundle_name: "Cocoonababy & Cocoonacover Bundle - White",
    component_sku: "5180",
    component_name: "Red Castle Cocoonababy Nest",
    component_qty: 1,
  },
  {
    bundle_sku: "12902A",
    bundle_name: "Cocoonababy & Cocoonacover Bundle - DREAMY CLOUD",
    component_sku: "12602",
    component_name: "Red Castle Cocoonababy® Pod Support Nest - Dreamy Cloud",
    component_qty: 1,
  },
  {
    bundle_sku: "12902A",
    bundle_name: "Cocoonababy & Cocoonacover Bundle - DREAMY CLOUD",
    component_sku: "12605",
    component_name:
      "Red Castle Cocoonacover - Fleur de coton ® Lightweight 1.0 Tog - White",
    component_qty: 1,
  },
  {
    bundle_sku: "12903",
    bundle_name:
      "Kerastase Aura Botanica Soin Fondamental Conditioner 200ml Duo",
    component_sku: "5398",
    component_name: "Kerastase Aura Botanica Soin Fondant Conditioner 200ml",
    component_qty: 2,
  },
  {
    bundle_sku: "12904",
    bundle_name:
      "Kerastase Blond Absolu Shine And Hydrating Duo For Everyday Use",
    component_sku: "8775",
    component_name: "Kerastase Blond Absolu Bain Lumiére 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "12904",
    bundle_name:
      "Kerastase Blond Absolu Shine And Hydrating Duo For Everyday Use",
    component_sku: "8776",
    component_name: "Kerastase Blond Absolu Fondant Cicaflash 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "12905",
    bundle_name: "Kerastase Densifique Bain Densite (250ml) Duo",
    component_sku: "9140",
    component_name: "Kerastase Densifique Bain Stemfree 250ml",
    component_qty: 2,
  },
  {
    bundle_sku: "12906",
    bundle_name: "Kerastase Densifique Bain Homme (250ml) Duo",
    component_sku: "9134",
    component_name: "Kerastase Densifique Bain Homme 250ml",
    component_qty: 2,
  },
  {
    bundle_sku: "12908",
    bundle_name: "Kerastase Discipline Bain Fluidealiste (250ml) Duo",
    component_sku: "KER_E1023000",
    component_name: "Kerastase Discipline Bain Fluidealiste 250ml",
    component_qty: 2,
  },
  {
    bundle_sku: "12910",
    bundle_name: "Kerastase Elixir Ultime L'Original Hair Oil Duo 100ml",
    component_sku: "KER_E022410",
    component_name: "Kerastase  Elixir Ultime 100ml",
    component_qty: 2,
  },
  {
    bundle_sku: "12911",
    bundle_name: "Kerastase Elixir Ultime Rose Hair Oil Duo 100ml",
    component_sku: "9143",
    component_name: "Kerastase Elixir Ultime Huile Rose 100ml",
    component_qty: 2,
  },
  {
    bundle_sku: "12912",
    bundle_name: "Kerastase Genesis Duo For Normal To Oily Hair",
    component_sku: "8779",
    component_name: "Kerastase Genesis Bain Hydra-Fortifiant 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "12912",
    bundle_name: "Kerastase Genesis Duo For Normal To Oily Hair",
    component_sku: "8781",
    component_name: "Kerastase Genesis Fondant Renforçateur 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "12913",
    bundle_name: "Kerastase Genesis Duo For Thick To Dry Hair",
    component_sku: "8780",
    component_name: "Kerastase Genesis Bain Nutri-Fortifiant 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "12913",
    bundle_name: "Kerastase Genesis Duo For Thick To Dry Hair",
    component_sku: "8782",
    component_name: "Kerastase Genesis Masque Reconstituant 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "12914",
    bundle_name: "Kerastase Nutritive Bain Satin Riche 250ml Duo",
    component_sku: "KER_4402082",
    component_name: "Kerastase  Nutritive Bain Satin Riche 250ml",
    component_qty: 2,
  },
  {
    bundle_sku: "12915",
    bundle_name: "Kerastase Nutritive Lait Vital 200ml Duo",
    component_sku: "KER_4401984",
    component_name: "Kerastase Nutritive Lait Vital 200ml",
    component_qty: 2,
  },
  {
    bundle_sku: "12916",
    bundle_name:
      "Kerastase Nutritive Masquintense Cheveux Epais For Thick Hair 200ml Duo",
    component_sku: "KER_44015370",
    component_name: "Kerastase Nutritive Masquintense Riche 200ml",
    component_qty: 2,
  },
  {
    bundle_sku: "12917",
    bundle_name:
      "Kerastase Resistance Ciment Anti-Usure - Vita Ciment Advance (200ml) Duo",
    component_sku: "KER_E046500",
    component_name: "Kerastase Resistance Ciment Anti Usure 200ml",
    component_qty: 2,
  },
  {
    bundle_sku: "12918",
    bundle_name: "Kerastase Resistance Therapiste Shampoo And Masque Duo",
    component_sku: "9128",
    component_name: "Kerastase Resistance Bain Therapiste 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "12918",
    bundle_name: "Kerastase Resistance Therapiste Shampoo And Masque Duo",
    component_sku: "9130",
    component_name: "Kerastase Resistance Therapiste Masque 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "12919",
    bundle_name: "Kerastase Resistance Therepiste Serum Duo 30ml",
    component_sku: "KER_E1490200",
    component_name: "Kerastase Resistance Therapiste Serum 30ml",
    component_qty: 2,
  },
  {
    bundle_sku: "12920",
    bundle_name: "Kerastase Resistance Volumifique Bain (250ml) Duo",
    component_sku: "KER_4402026",
    component_name: "Kerastase  Resistance Volumifique Bain 250ml",
    component_qty: 2,
  },
  {
    bundle_sku: "12921",
    bundle_name: "Kerastase Specifique Dermo-Calm Bain Vital Shampoo 250ml Duo",
    component_sku: "8793A",
    component_name: "Kérastase Specifique Bain Vital Dermo-Calm 250ml",
    component_qty: 2,
  },
  {
    bundle_sku: "12922",
    bundle_name:
      "L'Oreal Professionnel Serie Expert Blondifier Gloss Shampoo And Conditioner Duo",
    component_sku: "11477",
    component_name: "L'Oréal Professionnel Blondifier Gloss Shampoo 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "12922",
    bundle_name:
      "L'Oreal Professionnel Serie Expert Blondifier Gloss Shampoo And Conditioner Duo",
    component_sku: "11479",
    component_name: "L'Oréal Professionnel Blondifier Conditioner - 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "12924",
    bundle_name:
      "L'Oreal Professionnel Serie Expert Inforcer Shampoo And Masque Duo",
    component_sku: "11468",
    component_name: "L'Oréal Professionnel Inforcer Shampoo 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "12924",
    bundle_name:
      "L'Oreal Professionnel Serie Expert Inforcer Shampoo And Masque Duo",
    component_sku: "11470",
    component_name: "L'Oréal Professionnel Inforcer Mask 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "12925",
    bundle_name:
      "Redken Acidic Bonding Concentrate Shampoo And Conditioner Duo",
    component_sku: "9762",
    component_name: "Redken Acidic Bonding Concentrate Shampoo 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "12925",
    bundle_name:
      "Redken Acidic Bonding Concentrate Shampoo And Conditioner Duo",
    component_sku: "9763",
    component_name: "Redken Acidic Bonding Concentrate Conditioner 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "12926",
    bundle_name: "Redken All Soft Conditioner Duo (2 X 250ml)",
    component_sku: "REDK_P042560",
    component_name: "Redken - All Soft Conditioner 300ml",
    component_qty: 2,
  },
  {
    bundle_sku: "12927",
    bundle_name: "Redken All Soft Heavy Cream Duo (2 X 250ml)",
    component_sku: "REDK_P042690",
    component_name: "Redken - All Soft Heavy Cream 250ml",
    component_qty: 2,
  },
  {
    bundle_sku: "12928",
    bundle_name: "Redken All Soft Shampoo Duo (2 X 300ml)",
    component_sku: "REDK_P042480",
    component_name: "Redken - All Soft Shampoo 300ml",
    component_qty: 2,
  },
  {
    bundle_sku: "12930",
    bundle_name: "Redken Color Extend Brownlights Duo",
    component_sku: "8021",
    component_name: "Redken Color Extend Brownlights Blue Toning Shampoo 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "12930",
    bundle_name: "Redken Color Extend Brownlights Duo",
    component_sku: "8022",
    component_name:
      "Redken Color Extend Brownlights Blue Toning Conditioner 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "12931",
    bundle_name: "Redken Color Extend Magnetic Shampoo Duo (2 X 300ml)",
    component_sku: "REDK_P042820",
    component_name: "Redken - Colour Extend Magnetics Shampoo 300ml",
    component_qty: 2,
  },
  {
    bundle_sku: "12932",
    bundle_name: "Redken Curvaceous Conditioner Duo (2 X 250ml)",
    component_sku: "REDK_CCOND.",
    component_name: "Redken - Curvaceous Conditioner 250ml",
    component_qty: 2,
  },
  {
    bundle_sku: "12933",
    bundle_name: "Redken Curvaceous High Foam Shampoo Duo (2 X 300ml)",
    component_sku: "REDK_CSHAM.",
    component_name: "Redken - Curvaceous Shampoo 300ml",
    component_qty: 2,
  },
  {
    bundle_sku: "12934",
    bundle_name: "Redken Extreme Anti-Snap Treatment Duo (2 X 250ml)",
    component_sku: "REDK_P027920",
    component_name: "Redken - Extreme Anti Snap 250ml",
    component_qty: 2,
  },
  {
    bundle_sku: "12935",
    bundle_name: "Redken Extreme Bundle With Free One United",
    component_sku: "5011",
    component_name: "Redken - One United 150ml",
    component_qty: 1,
  },
  {
    bundle_sku: "12935",
    bundle_name: "Redken Extreme Bundle With Free One United",
    component_sku: "REDK_P027790",
    component_name: "Redken - Extreme Conditioner 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "12935",
    bundle_name: "Redken Extreme Bundle With Free One United",
    component_sku: "REDK_P027970",
    component_name: "Redken - Extreme Shampoo 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "12936",
    bundle_name: "Redken Extreme Conditioner Duo (2 X 300ml)",
    component_sku: "REDK_P027790",
    component_name: "Redken - Extreme Conditioner 300ml",
    component_qty: 2,
  },
  {
    bundle_sku: "12937",
    bundle_name: "Redken Extreme Shampoo Duo (2 X 300ml)",
    component_sku: "REDK_P027970",
    component_name: "Redken - Extreme Shampoo 300ml",
    component_qty: 2,
  },
  {
    bundle_sku: "12939",
    bundle_name: "The Ordinary Anti-Ageing Hydration Duo 2 X 30ml",
    component_sku: "5667",
    component_name: "The Ordinary Buffet 30ml",
    component_qty: 1,
  },
  {
    bundle_sku: "12939",
    bundle_name: "The Ordinary Anti-Ageing Hydration Duo 2 X 30ml",
    component_sku: "5673",
    component_name: "The Ordinary Hyaluronic Acid 2% + B5 - 30ml",
    component_qty: 1,
  },
  {
    bundle_sku: "12940",
    bundle_name:
      "The Ordinary Hyaluronic Acid 2% + B5 Hydration Support Formula Duo 2 X 30ml",
    component_sku: "5673",
    component_name: "The Ordinary Hyaluronic Acid 2% + B5 - 30ml",
    component_qty: 2,
  },
  {
    bundle_sku: "13037",
    bundle_name: "Color WOW Colour Rescue Bundle",
    component_sku: "7494",
    component_name: "Color Wow Dream Coat 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "13037",
    bundle_name: "Color WOW Colour Rescue Bundle",
    component_sku: "7657",
    component_name: "Color Wow Dream Filter 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "13038",
    bundle_name: "Alfaparf Goodbye Dry Bundle - Moisture",
    component_sku: "6469",
    component_name: "Alfaparf Semi Di Lino Moisture Nutritive Shampoo 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "13038",
    bundle_name: "Alfaparf Goodbye Dry Bundle - Moisture",
    component_sku: "6470",
    component_name: "Alfaparf Semi Di Lino Moisture Nutritive Mask 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "13038",
    bundle_name: "Alfaparf Goodbye Dry Bundle - Moisture",
    component_sku: "6473",
    component_name:
      "Alfaparf Semi Di Lino Moisture Nutritive Detangling Fluid 125ml",
    component_qty: 1,
  },
  {
    bundle_sku: "13039",
    bundle_name: "The K18 Damage Control Bundle",
    component_sku: "11262",
    component_name:
      "K18 Biomimetic Hairscience Professional Molecular Repair Hair Mask 150ml",
    component_qty: 1,
  },
  {
    bundle_sku: "13039",
    bundle_name: "The K18 Damage Control Bundle",
    component_sku: "11265",
    component_name:
      "K18 Biomimetic Hairscience Professional Molecular Repair Mist 150ml",
    component_qty: 1,
  },
  {
    bundle_sku: "13040",
    bundle_name: "Alfaparf The Scalp Rescue Bundle",
    component_sku: "7682",
    component_name: "Alfaparf Semi Di Lino Scalp RENEW Energize Shampoo 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "13040",
    bundle_name: "Alfaparf The Scalp Rescue Bundle",
    component_sku: "7685",
    component_name: "Alfaparf Semi Di Lino Scalp RENEW Energise Tonic 125ml",
    component_qty: 1,
  },
  {
    bundle_sku: "13040",
    bundle_name: "Alfaparf The Scalp Rescue Bundle",
    component_sku: "7686",
    component_name:
      "Alfaparf Semi Di Lino Scalp Rebalance Gentle Exfoliating Scrub 150ml",
    component_qty: 1,
  },
  {
    bundle_sku: "13041",
    bundle_name: "Staff Favourites: The Haircare Heroes Bundle",
    component_sku: "11262",
    component_name:
      "K18 Biomimetic Hairscience Professional Molecular Repair Hair Mask 150ml",
    component_qty: 1,
  },
  {
    bundle_sku: "13041",
    bundle_name: "Staff Favourites: The Haircare Heroes Bundle",
    component_sku: "11265",
    component_name:
      "K18 Biomimetic Hairscience Professional Molecular Repair Mist 150ml",
    component_qty: 1,
  },
  {
    bundle_sku: "13041",
    bundle_name: "Staff Favourites: The Haircare Heroes Bundle",
    component_sku: "6469",
    component_name: "Alfaparf Semi Di Lino Moisture Nutritive Shampoo 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "13041",
    bundle_name: "Staff Favourites: The Haircare Heroes Bundle",
    component_sku: "6470",
    component_name: "Alfaparf Semi Di Lino Moisture Nutritive Mask 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "13041",
    bundle_name: "Staff Favourites: The Haircare Heroes Bundle",
    component_sku: "6473",
    component_name:
      "Alfaparf Semi Di Lino Moisture Nutritive Detangling Fluid 125ml",
    component_qty: 1,
  },
  {
    bundle_sku: "13041",
    bundle_name: "Staff Favourites: The Haircare Heroes Bundle",
    component_sku: "6479",
    component_name:
      "Alfaparf Semi Di Lino Diamond Extraordinary All-In1- Fluid 125ml",
    component_qty: 1,
  },
  {
    bundle_sku: "13041",
    bundle_name: "Staff Favourites: The Haircare Heroes Bundle",
    component_sku: "7494",
    component_name: "Color Wow Dream Coat 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "13041",
    bundle_name: "Staff Favourites: The Haircare Heroes Bundle",
    component_sku: "7657",
    component_name: "Color Wow Dream Filter 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "13041",
    bundle_name: "Staff Favourites: The Haircare Heroes Bundle",
    component_sku: "7682",
    component_name: "Alfaparf Semi Di Lino Scalp RENEW Energize Shampoo 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "13041",
    bundle_name: "Staff Favourites: The Haircare Heroes Bundle",
    component_sku: "7685",
    component_name: "Alfaparf Semi Di Lino Scalp RENEW Energise Tonic 125ml",
    component_qty: 1,
  },
  {
    bundle_sku: "13041",
    bundle_name: "Staff Favourites: The Haircare Heroes Bundle",
    component_sku: "7686",
    component_name:
      "Alfaparf Semi Di Lino Scalp Rebalance Gentle Exfoliating Scrub 150ml",
    component_qty: 1,
  },
  {
    bundle_sku: "13093",
    bundle_name: "Kerastase Soleil Travel Kit GWP",
    component_sku: "13087",
    component_name: "Kerastase Soleil UV Creme 50ml GWP",
    component_qty: 1,
  },
  {
    bundle_sku: "13093",
    bundle_name: "Kerastase Soleil Travel Kit GWP",
    component_sku: "13088",
    component_name: "Kerastase Soleil Huile Sirene 50ml GWP",
    component_qty: 1,
  },
  {
    bundle_sku: "13093",
    bundle_name: "Kerastase Soleil Travel Kit GWP",
    component_sku: "13089",
    component_name: "Kerastase Soleil Bain 80ml GWP",
    component_qty: 1,
  },
  {
    bundle_sku: "13093",
    bundle_name: "Kerastase Soleil Travel Kit GWP",
    component_sku: "13090",
    component_name: "Kerastase Soleil Tote Bag GWP",
    component_qty: 1,
  },
  {
    bundle_sku: "13211",
    bundle_name: "The Full Face Perfection Collection Makeup Bundle",
    component_sku: "11959",
    component_name: "Inglot Eye Kit - The Super Smokes Edit",
    component_qty: 1,
  },
  {
    bundle_sku: "13211",
    bundle_name: "The Full Face Perfection Collection Makeup Bundle",
    component_sku: "12085",
    component_name: "Revolution Soft Glamour Brush Set",
    component_qty: 1,
  },
  {
    bundle_sku: "13211",
    bundle_name: "The Full Face Perfection Collection Makeup Bundle",
    component_sku: "12784",
    component_name: "SOSU Radiance Base Primer Glow",
    component_qty: 1,
  },
  {
    bundle_sku: "13211",
    bundle_name: "The Full Face Perfection Collection Makeup Bundle",
    component_sku: "12795",
    component_name: "SOSU Wand Concealer Light No 4",
    component_qty: 1,
  },
  {
    bundle_sku: "13211",
    bundle_name: "The Full Face Perfection Collection Makeup Bundle",
    component_sku: "12799",
    component_name: "SOSU Eye Voltage Brow Pencil Medium",
    component_qty: 1,
  },
  {
    bundle_sku: "13211",
    bundle_name: "The Full Face Perfection Collection Makeup Bundle",
    component_sku: "12808",
    component_name: "SOSU Birthday Suit Lipstick",
    component_qty: 1,
  },
  {
    bundle_sku: "13211",
    bundle_name: "The Full Face Perfection Collection Makeup Bundle",
    component_sku: "12809",
    component_name: "SOSU Birthday Suit Lip Liner Pencil",
    component_qty: 1,
  },
  {
    bundle_sku: "13211",
    bundle_name: "The Full Face Perfection Collection Makeup Bundle",
    component_sku: "12856",
    component_name: "Luna By Lisa Silk Foundation Shade 4 - Medium 35ml",
    component_qty: 1,
  },
  {
    bundle_sku: "13211",
    bundle_name: "The Full Face Perfection Collection Makeup Bundle",
    component_sku: "13061",
    component_name: "Secrets By Sinead Ultimate Beauty Palette",
    component_qty: 1,
  },
  {
    bundle_sku: "13211",
    bundle_name: "The Full Face Perfection Collection Makeup Bundle",
    component_sku: "9097",
    component_name: "So Sue Me Blender Sponge",
    component_qty: 1,
  },
  {
    bundle_sku: "13216",
    bundle_name:
      "L'Oréal Professionnel Absolut Repair Bundle - FREE 100ml Shampoo",
    component_sku: "11458",
    component_name: "L'Oréal Professionnel Absolut Repair Shampoo - 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "13216",
    bundle_name:
      "L'Oréal Professionnel Absolut Repair Bundle - FREE 100ml Shampoo",
    component_sku: "11459",
    component_name: "L'Oréal Professionnel Absolut Repair Conditioner 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "13217",
    bundle_name:
      "L'Oréal Professionnel Absolut Repair Super Size Bundle - FREE 100ml Shampoo",
    component_sku: "12543",
    component_name: "Loreal Professionnel Absolut Repair Shampoo 1500ml",
    component_qty: 1,
  },
  {
    bundle_sku: "13217",
    bundle_name:
      "L'Oréal Professionnel Absolut Repair Super Size Bundle - FREE 100ml Shampoo",
    component_sku: "12557",
    component_name: "Loreal Professionnel Absolut Repair Conditioner 750ml",
    component_qty: 1,
  },
  {
    bundle_sku: "13218",
    bundle_name:
      "L'Oréal Professionnel Absolut Repair Collection - FREE 100ml Shampoo",
    component_sku: "11458",
    component_name: "L'Oréal Professionnel Absolut Repair Shampoo - 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "13218",
    bundle_name:
      "L'Oréal Professionnel Absolut Repair Collection - FREE 100ml Shampoo",
    component_sku: "11459",
    component_name: "L'Oréal Professionnel Absolut Repair Conditioner 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "13218",
    bundle_name:
      "L'Oréal Professionnel Absolut Repair Collection - FREE 100ml Shampoo",
    component_sku: "11460",
    component_name: "L'Oréal Professionnel Absolut Repair Mask 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "13219",
    bundle_name:
      "L'Oréal Professionnel Absolut Repair Shampoo 750ml + 100ml FREE",
    component_sku: "12558",
    component_name: "Loreal Professionnel Absolut Repair Shampoo 750ml",
    component_qty: 1,
  },
  {
    bundle_sku: "13220",
    bundle_name:
      "L'Oreal Professionnel Metal Detox ULTIMATE Collection + FREE 100ml Shampoo",
    component_sku: "11351",
    component_name:
      "Loreal Professionnel Metal Detox Anti-Metal Cleansing Cream Shampoo 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "13220",
    bundle_name:
      "L'Oreal Professionnel Metal Detox ULTIMATE Collection + FREE 100ml Shampoo",
    component_sku: "11352",
    component_name:
      "Loreal Professionnel Metal Detox Anti-Deposit Protector Mask 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "13220",
    bundle_name:
      "L'Oreal Professionnel Metal Detox ULTIMATE Collection + FREE 100ml Shampoo",
    component_sku: "11988",
    component_name:
      "L'Oreal Professionnel Metal Detox Anti-Deposit Protector Concentrated Oil 50ml",
    component_qty: 1,
  },
  {
    bundle_sku: "13220",
    bundle_name:
      "L'Oreal Professionnel Metal Detox ULTIMATE Collection + FREE 100ml Shampoo",
    component_sku: "12771",
    component_name:
      "L'Oréal Professionnel Metal Detox Anti-Metal High Protection Cream 100ml",
    component_qty: 1,
  },
  {
    bundle_sku: "13221",
    bundle_name: "L'Oreal Professionnel Metal Detox Duo + FREE 100ml Shampoo",
    component_sku: "11351",
    component_name:
      "Loreal Professionnel Metal Detox Anti-Metal Cleansing Cream Shampoo 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "13221",
    bundle_name: "L'Oreal Professionnel Metal Detox Duo + FREE 100ml Shampoo",
    component_sku: "11352",
    component_name:
      "Loreal Professionnel Metal Detox Anti-Deposit Protector Mask 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "13222",
    bundle_name:
      "L'Oreal Professionnel Metal Detox Collection + FREE 100ml Shampoo",
    component_sku: "11352",
    component_name:
      "Loreal Professionnel Metal Detox Anti-Deposit Protector Mask 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "13222",
    bundle_name:
      "L'Oreal Professionnel Metal Detox Collection + FREE 100ml Shampoo",
    component_sku: "11988",
    component_name:
      "L'Oreal Professionnel Metal Detox Anti-Deposit Protector Concentrated Oil 50ml",
    component_qty: 1,
  },
  {
    bundle_sku: "13222",
    bundle_name:
      "L'Oreal Professionnel Metal Detox Collection + FREE 100ml Shampoo",
    component_sku: "12771",
    component_name:
      "L'Oréal Professionnel Metal Detox Anti-Metal High Protection Cream 100ml",
    component_qty: 1,
  },
  {
    bundle_sku: "13223",
    bundle_name: "L'Oréal Professionnel Pro Longer Shampoo 1500ml + 100ml FREE",
    component_sku: "12545",
    component_name: "Loreal Professionnel Pro Longer Shampoo 1500ml",
    component_qty: 1,
  },
  {
    bundle_sku: "13224",
    bundle_name:
      "L'Oréal Professionnel Pro Longer Collection + 100ml Shampoo FREE",
    component_sku: "11471",
    component_name: "L'Oréal Professionnel Pro Longer Shampoo 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "13224",
    bundle_name:
      "L'Oréal Professionnel Pro Longer Collection + 100ml Shampoo FREE",
    component_sku: "11473",
    component_name: "L'Oréal Professionnel Pro Longer Mask 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "13225",
    bundle_name:
      "L'Oréal Professionnel Serié Expert Scalp Advanced Treatment Bundle + FREE 75ml Mask",
    component_sku: "12680",
    component_name:
      "L'Oréal Professionnel Serié Expert Scalp Advanced Anti-Discomfort Dermo-Regulator Shampoo 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "13225",
    bundle_name:
      "L'Oréal Professionnel Serié Expert Scalp Advanced Treatment Bundle + FREE 75ml Mask",
    component_sku: "12681",
    component_name:
      "L'Oréal Professionnel Serié Expert Scalp Advanced Anti-Discomfort Hair Treatment 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "13225",
    bundle_name:
      "L'Oréal Professionnel Serié Expert Scalp Advanced Treatment Bundle + FREE 75ml Mask",
    component_sku: "13143",
    component_name:
      "Loreal Professionnel Scalp Advanced Anti-Oiliness Mask 75ml GWP",
    component_qty: 1,
  },
  {
    bundle_sku: "13226",
    bundle_name:
      "L'Oréal Professionnel Serié Expert Scalp Advanced Treatment Bundle + FREE 100ml Shampoo",
    component_sku: "12679",
    component_name:
      "L'Oréal Professionnel Serié Expert Aminexil Hair Ampoules 10x6ml",
    component_qty: 1,
  },
  {
    bundle_sku: "13226",
    bundle_name:
      "L'Oréal Professionnel Serié Expert Scalp Advanced Treatment Bundle + FREE 100ml Shampoo",
    component_sku: "12686",
    component_name:
      "L'Oréal Professionnel Serié Expert Advanced Denser Hair Serum for Thinning Hair 90ml",
    component_qty: 1,
  },
  {
    bundle_sku: "13226",
    bundle_name:
      "L'Oréal Professionnel Serié Expert Scalp Advanced Treatment Bundle + FREE 100ml Shampoo",
    component_sku: "13142",
    component_name:
      "Loreal Professionnel Scalp Advanced Anti-Discomfort Shampoo 100ml GWP",
    component_qty: 1,
  },
  {
    bundle_sku: "13227",
    bundle_name:
      "L'Oréal Professionnel Serié Expert ULTIMATE Scalp Advanced Treatment + FREE 100ml Shampoo",
    component_sku: "12681",
    component_name:
      "L'Oréal Professionnel Serié Expert Scalp Advanced Anti-Discomfort Hair Treatment 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "13227",
    bundle_name:
      "L'Oréal Professionnel Serié Expert ULTIMATE Scalp Advanced Treatment + FREE 100ml Shampoo",
    component_sku: "12683",
    component_name:
      "L'Oréal Professionnel Serié Expert Scalp Advanced Anti-Oiliness 2-in-1 Deep Purifier Clay Hair Mask 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "13227",
    bundle_name:
      "L'Oréal Professionnel Serié Expert ULTIMATE Scalp Advanced Treatment + FREE 100ml Shampoo",
    component_sku: "12686",
    component_name:
      "L'Oréal Professionnel Serié Expert Advanced Denser Hair Serum for Thinning Hair 90ml",
    component_qty: 1,
  },
  {
    bundle_sku: "13227",
    bundle_name:
      "L'Oréal Professionnel Serié Expert ULTIMATE Scalp Advanced Treatment + FREE 100ml Shampoo",
    component_sku: "13144",
    component_name:
      "Loreal Professionnel Scalp Advanced Anti-Oiliness Shampoo 100ml GWP",
    component_qty: 1,
  },
  {
    bundle_sku: "13228",
    bundle_name: "L'Oréal Professionnel Silver Collection + FREE 75ml Mask",
    component_sku: "11456",
    component_name: "L'Oréal Professionnel Silver Shampoo 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "13228",
    bundle_name: "L'Oréal Professionnel Silver Collection + FREE 75ml Mask",
    component_sku: "11457",
    component_name: "L'Oréal Professionnel Silver Conditioner 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "13228",
    bundle_name: "L'Oréal Professionnel Silver Collection + FREE 75ml Mask",
    component_sku: "13143",
    component_name:
      "Loreal Professionnel Scalp Advanced Anti-Oiliness Mask 75ml GWP",
    component_qty: 1,
  },
  {
    bundle_sku: "13229",
    bundle_name:
      "L'Oréal Professionnel Serié Expert Scalp Advanced Duo + FREE 100ml Shampoo",
    component_sku: "12681",
    component_name:
      "L'Oréal Professionnel Serié Expert Scalp Advanced Anti-Discomfort Hair Treatment 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "13229",
    bundle_name:
      "L'Oréal Professionnel Serié Expert Scalp Advanced Duo + FREE 100ml Shampoo",
    component_sku: "12683",
    component_name:
      "L'Oréal Professionnel Serié Expert Scalp Advanced Anti-Oiliness 2-in-1 Deep Purifier Clay Hair Mask 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "13229",
    bundle_name:
      "L'Oréal Professionnel Serié Expert Scalp Advanced Duo + FREE 100ml Shampoo",
    component_sku: "13142",
    component_name:
      "Loreal Professionnel Scalp Advanced Anti-Discomfort Shampoo 100ml GWP",
    component_qty: 1,
  },
  {
    bundle_sku: "13230",
    bundle_name:
      "L'Oréal Professionnel Vitamino Shampoo & Conditioner DUO + FREE 75ml Mask",
    component_sku: "11452",
    component_name: "L'Oréal Professionnel Vitamino Color Shampoo - 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "13230",
    bundle_name:
      "L'Oréal Professionnel Vitamino Shampoo & Conditioner DUO + FREE 75ml Mask",
    component_sku: "11453",
    component_name: "L'Oréal Professionnel Vitamino Conditioner 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "13231",
    bundle_name:
      "L'Oréal Professionnel Vitamino Colour Shampoo 1500ml + 100ml FREE",
    component_sku: "12551",
    component_name: "Loreal Professionnel Vitamino Colour Shampoo 1500ml",
    component_qty: 1,
  },
  {
    bundle_sku: "13232",
    bundle_name:
      "L'Oréal Professionnel Vitamino Mask & Conditioner + FREE 100ml Shampoo",
    component_sku: "11453",
    component_name: "L'Oréal Professionnel Vitamino Conditioner 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "13232",
    bundle_name:
      "L'Oréal Professionnel Vitamino Mask & Conditioner + FREE 100ml Shampoo",
    component_sku: "11454",
    component_name: "L'Oréal Professionnel Vitamino Color Mask 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "13233",
    bundle_name:
      "L'Oréal Professionnel Vitamino SUPER SIZE Shampoo & Conditioner DUO + FREE 100ml Shampoo",
    component_sku: "12551",
    component_name: "Loreal Professionnel Vitamino Colour Shampoo 1500ml",
    component_qty: 1,
  },
  {
    bundle_sku: "13233",
    bundle_name:
      "L'Oréal Professionnel Vitamino SUPER SIZE Shampoo & Conditioner DUO + FREE 100ml Shampoo",
    component_sku: "12562",
    component_name: "Loreal Professionnel Vitamino Colour Conditioner 750ml",
    component_qty: 1,
  },
  {
    bundle_sku: "13234",
    bundle_name:
      "L'Oréal Professionnel Vitamino Colour ULTIMATE Collection + 75ml FREE",
    component_sku: "11452",
    component_name: "L'Oréal Professionnel Vitamino Color Shampoo - 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "13234",
    bundle_name:
      "L'Oréal Professionnel Vitamino Colour ULTIMATE Collection + 75ml FREE",
    component_sku: "11453",
    component_name: "L'Oréal Professionnel Vitamino Conditioner 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "13234",
    bundle_name:
      "L'Oréal Professionnel Vitamino Colour ULTIMATE Collection + 75ml FREE",
    component_sku: "11455",
    component_name:
      "L'Oréal Professionnel Vitamino Color 10 in 1 Multi-Benefit Leave In Treatment",
    component_qty: 1,
  },
  {
    bundle_sku: "13292A",
    bundle_name: "BeautiEdit Trilogy of Elixirs Bundle",
    component_sku: "13289",
    component_name: "BeautiEdit Nourished - Daily Glow Fix",
    component_qty: 1,
  },
  {
    bundle_sku: "13292A",
    bundle_name: "BeautiEdit Trilogy of Elixirs Bundle",
    component_sku: "13290",
    component_name: "BeautiEdit Restored - Night Time Recovery",
    component_qty: 1,
  },
  {
    bundle_sku: "13292A",
    bundle_name: "BeautiEdit Trilogy of Elixirs Bundle",
    component_sku: "13291",
    component_name: "BeautiEdit Repaired - Ultimate Hair Care",
    component_qty: 1,
  },
  {
    bundle_sku: "13293A",
    bundle_name: "BeautiEdit - Be Berry Bronzed Bundle",
    component_sku: "10733",
    component_name: "BeautiEdit Soft Velvet Tanning Mitt",
    component_qty: 1,
  },
  {
    bundle_sku: "13293A",
    bundle_name: "BeautiEdit - Be Berry Bronzed Bundle",
    component_sku: "13292",
    component_name: "BeautiEdit Berry Bronze Foam 150ml",
    component_qty: 1,
  },
  {
    bundle_sku: "13294A",
    bundle_name: "BeautiEdit - Glow On The Go Bundle",
    component_sku: "10733",
    component_name: "BeautiEdit Soft Velvet Tanning Mitt",
    component_qty: 1,
  },
  {
    bundle_sku: "13294A",
    bundle_name: "BeautiEdit - Glow On The Go Bundle",
    component_sku: "11553",
    component_name:
      "BeautiEdit PRISTINE - Express Self Tanning Mousse / Foam 150ml - Limited Edition",
    component_qty: 1,
  },
  {
    bundle_sku: "13294A",
    bundle_name: "BeautiEdit - Glow On The Go Bundle",
    component_sku: "11553B",
    component_name:
      "BeautiEdit - Decadence by Lorraine Keane **Limited Edition**",
    component_qty: 1,
  },
  {
    bundle_sku: "13295A",
    bundle_name: "BeautiEdit - The Dream Team Medium Bundle",
    component_sku: "10730",
    component_name: "BeautiEdit Tan Medium - 3 in 1 Self Tanning Foam",
    component_qty: 1,
  },
  {
    bundle_sku: "13295A",
    bundle_name: "BeautiEdit - The Dream Team Medium Bundle",
    component_sku: "10733",
    component_name: "BeautiEdit Soft Velvet Tanning Mitt",
    component_qty: 1,
  },
  {
    bundle_sku: "13295A",
    bundle_name: "BeautiEdit - The Dream Team Medium Bundle",
    component_sku: "11553B",
    component_name:
      "BeautiEdit - Decadence by Lorraine Keane **Limited Edition**",
    component_qty: 1,
  },
  {
    bundle_sku: "13296A",
    bundle_name: "BeautiEdit - The Dream Team Ultra Dark Bundle",
    component_sku: "10732",
    component_name: "BeautiEdit Tan Ultra Dark - 3 in 1 Self Tanning Foam",
    component_qty: 1,
  },
  {
    bundle_sku: "13296A",
    bundle_name: "BeautiEdit - The Dream Team Ultra Dark Bundle",
    component_sku: "10733",
    component_name: "BeautiEdit Soft Velvet Tanning Mitt",
    component_qty: 1,
  },
  {
    bundle_sku: "13296A",
    bundle_name: "BeautiEdit - The Dream Team Ultra Dark Bundle",
    component_sku: "11553B",
    component_name:
      "BeautiEdit - Decadence by Lorraine Keane **Limited Edition**",
    component_qty: 1,
  },
  {
    bundle_sku: "13310",
    bundle_name: "Beauty Box : Get Your Glam On",
    component_sku: "12108",
    component_name:
      "Matrix Total Results Miracle Creator 20 Multi-Tasking Treatment Spray30ml GWP",
    component_qty: 1,
  },
  {
    bundle_sku: "13310",
    bundle_name: "Beauty Box : Get Your Glam On",
    component_sku: "12267",
    component_name: "Kerastase Elixir Ultime L'Huile Original Deluxe 15ml​ GWP",
    component_qty: 1,
  },
  {
    bundle_sku: "13310",
    bundle_name: "Beauty Box : Get Your Glam On",
    component_sku: "12790",
    component_name: "SOSU Gigi Eye Lashes Black Box",
    component_qty: 1,
  },
  {
    bundle_sku: "13310",
    bundle_name: "Beauty Box : Get Your Glam On",
    component_sku: "12815",
    component_name: "Dripping Gold Medium Mousse",
    component_qty: 1,
  },
  {
    bundle_sku: "13310",
    bundle_name: "Beauty Box : Get Your Glam On",
    component_sku: "12821",
    component_name: "Dripping Gold Velvet Thumb Tanning Mitt With Cuff",
    component_qty: 1,
  },
  {
    bundle_sku: "13310",
    bundle_name: "Beauty Box : Get Your Glam On",
    component_sku: "13060",
    component_name: "Luna By Lisa Compact Mirror GWP",
    component_qty: 1,
  },
  {
    bundle_sku: "13310",
    bundle_name: "Beauty Box : Get Your Glam On",
    component_sku: "13061",
    component_name: "Secrets By Sinead Ultimate Beauty Palette",
    component_qty: 1,
  },
  {
    bundle_sku: "13310",
    bundle_name: "Beauty Box : Get Your Glam On",
    component_sku: "13184",
    component_name:
      "Sculpted by Aimee Line & Shine Lipliner & Gloss Duo - Rose",
    component_qty: 1,
  },
  {
    bundle_sku: "13310",
    bundle_name: "Beauty Box : Get Your Glam On",
    component_sku: "20510",
    component_name: "Beauty Box Regular Sleeve",
    component_qty: 1,
  },
  {
    bundle_sku: "13365A",
    bundle_name: "Aveeno Baby Dermexa Bundle",
    component_sku: "13363",
    component_name: "Aveeno Baby Dermexa Good Night Balm 75ml",
    component_qty: 1,
  },
  {
    bundle_sku: "13365A",
    bundle_name: "Aveeno Baby Dermexa Bundle",
    component_sku: "13364",
    component_name: "Aveeno Baby Dermexa Cream Dry/Itchy Skin 150ml",
    component_qty: 1,
  },
  {
    bundle_sku: "13365A",
    bundle_name: "Aveeno Baby Dermexa Bundle",
    component_sku: "13365",
    component_name: "Aveeno Baby Dermexa Moisturising Wash 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "13643",
    bundle_name: "Isoclean 165ml Brush Cleaner & 525ml Refill Bundle",
    component_sku: "11214",
    component_name: "Isoclean 165ml Dip Tray Easy Pour",
    component_qty: 1,
  },
  {
    bundle_sku: "13643",
    bundle_name: "Isoclean 165ml Brush Cleaner & 525ml Refill Bundle",
    component_sku: "11216",
    component_name: "Isoclean Makeup Brush Cleaner Refill 525ml",
    component_qty: 1,
  },
  {
    bundle_sku: "13673",
    bundle_name: "HD Brows Pro Brow Pencil & Sharpener Bundle - Black",
    component_sku: "13641",
    component_name: "HD Brows Pro Pencil Black",
    component_qty: 1,
  },
  {
    bundle_sku: "13673",
    bundle_name: "HD Brows Pro Brow Pencil & Sharpener Bundle - Black",
    component_sku: "13642",
    component_name: "HD Brows Pro Pencil Super Shaper Sharpener",
    component_qty: 1,
  },
  {
    bundle_sku: "13933",
    bundle_name: "Kérastase Blond Absolu - The Three Step Regime Bundle",
    component_sku: "8775",
    component_name: "Kerastase Blond Absolu Bain Lumiére 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "13933",
    bundle_name: "Kérastase Blond Absolu - The Three Step Regime Bundle",
    component_sku: "8776",
    component_name: "Kerastase Blond Absolu Fondant Cicaflash 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "13933",
    bundle_name: "Kérastase Blond Absolu - The Three Step Regime Bundle",
    component_sku: "9226",
    component_name: "Kerastase Blond Absolu Cicanuit Overnight Hair Serum 90Ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14027",
    bundle_name: "Color WOW Dream Coat & Dream Filter Bundle - TRAVEL SIZE",
    component_sku: "10147",
    component_name: "Color Wow Dream Coat Travel Size - 50ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14028",
    bundle_name: "Color Wow Dream Filter & Money Masque Bundle - TRAVEL SIZE",
    component_sku: "13930",
    component_name: "Color WOW Money Masque 50ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14029",
    bundle_name: "Color Wow Dream Coat & Money Masque Bundle - TRAVEL SIZE",
    component_sku: "10147",
    component_name: "Color Wow Dream Coat Travel Size - 50ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14029",
    bundle_name: "Color Wow Dream Coat & Money Masque Bundle - TRAVEL SIZE",
    component_sku: "13930",
    component_name: "Color WOW Money Masque 50ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14030",
    bundle_name:
      "Color WOW Extra Strength Dream Coat & Dream Filter Bundle - TRAVEL SIZE",
    component_sku: "13932",
    component_name: "Color WOW Extra Strength Dream Coat 50ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14031",
    bundle_name: "Color WOW Travel Sized Treats Bundle",
    component_sku: "10147",
    component_name: "Color Wow Dream Coat Travel Size - 50ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14031",
    bundle_name: "Color WOW Travel Sized Treats Bundle",
    component_sku: "13930",
    component_name: "Color WOW Money Masque 50ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14031",
    bundle_name: "Color WOW Travel Sized Treats Bundle",
    component_sku: "13932",
    component_name: "Color WOW Extra Strength Dream Coat 50ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14031",
    bundle_name: "Color WOW Travel Sized Treats Bundle",
    component_sku: "7833",
    component_name: "Color Wow Security Shampoo 75ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14031",
    bundle_name: "Color WOW Travel Sized Treats Bundle",
    component_sku: "7834",
    component_name: "Color Wow Security Conditioner Fine To Normal 75ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14032A",
    bundle_name: "Premium Makeup Blending Sponge By BeautyFeatures GWP",
    component_sku: "14032",
    component_name: "Premium Makeup Blending Sponge By BeautyFeatures 1PK",
    component_qty: 1,
  },
  {
    bundle_sku: "14032B",
    bundle_name: "Premium Makeup Blending Sponge By BeautyFeatures 2 PK",
    component_sku: "14032",
    component_name: "Premium Makeup Blending Sponge By BeautyFeatures 1PK",
    component_qty: 2,
  },
  {
    bundle_sku: "14032C",
    bundle_name: "Premium Makeup Blending Sponge By BeautyFeatures 5pk",
    component_sku: "14032",
    component_name: "Premium Makeup Blending Sponge By BeautyFeatures 1PK",
    component_qty: 5,
  },
  {
    bundle_sku: "14032D",
    bundle_name: "Premium Makeup Blending Sponge By BeautyFeatures 10PK",
    component_sku: "14032",
    component_name: "Premium Makeup Blending Sponge By BeautyFeatures 1PK",
    component_qty: 10,
  },
  {
    bundle_sku: "14042",
    bundle_name: "Beauty Bliss Beauty Box",
    component_sku: "12108",
    component_name:
      "Matrix Total Results Miracle Creator 20 Multi-Tasking Treatment Spray30ml GWP",
    component_qty: 1,
  },
  {
    bundle_sku: "14042",
    bundle_name: "Beauty Bliss Beauty Box",
    component_sku: "12272",
    component_name:
      "Kerastase Resistance Masque Force Architecte Deluxe 30ml​ GWP",
    component_qty: 1,
  },
  {
    bundle_sku: "14042",
    bundle_name: "Beauty Bliss Beauty Box",
    component_sku: "13100",
    component_name: "Decleor Hydrating Trio GWP",
    component_qty: 1,
  },
  {
    bundle_sku: "14042",
    bundle_name: "Beauty Bliss Beauty Box",
    component_sku: "13565",
    component_name: "Dripping Gold Cherry Lip Oil",
    component_qty: 1,
  },
  {
    bundle_sku: "14042",
    bundle_name: "Beauty Bliss Beauty Box",
    component_sku: "13572",
    component_name: "SOSU Pro Blender",
    component_qty: 1,
  },
  {
    bundle_sku: "14042",
    bundle_name: "Beauty Bliss Beauty Box",
    component_sku: "20295",
    component_name: "Large Black Box",
    component_qty: 1,
  },
  {
    bundle_sku: "14042",
    bundle_name: "Beauty Bliss Beauty Box",
    component_sku: "20511",
    component_name: "Beauty Box Large Sleeve",
    component_qty: 1,
  },
  {
    bundle_sku: "14042",
    bundle_name: "Beauty Bliss Beauty Box",
    component_sku: "20521",
    component_name: "BeautyFeatures Vent Hairbrush with Nylon & Boar Bristles",
    component_qty: 1,
  },
  {
    bundle_sku: "14043",
    bundle_name: "Skin & Hair Heroes Beauty Box",
    component_sku: "11091",
    component_name: "The Ordinary The Daily Set (50ml x1, 30ml x2)",
    component_qty: 1,
  },
  {
    bundle_sku: "14043",
    bundle_name: "Skin & Hair Heroes Beauty Box",
    component_sku: "12267",
    component_name: "Kerastase Elixir Ultime L'Huile Original Deluxe 15ml​ GWP",
    component_qty: 1,
  },
  {
    bundle_sku: "14043",
    bundle_name: "Skin & Hair Heroes Beauty Box",
    component_sku: "14032",
    component_name: "Premium Makeup Blending Sponge By BeautyFeatures 1PK",
    component_qty: 1,
  },
  {
    bundle_sku: "14043",
    bundle_name: "Skin & Hair Heroes Beauty Box",
    component_sku: "20510",
    component_name: "Beauty Box Regular Sleeve",
    component_qty: 1,
  },
  {
    bundle_sku: "14044",
    bundle_name: "Pamper & Unwind Beauty Box",
    component_sku: "12151",
    component_name: "The Ordinary Multi-Peptide Lash & Brow Serum 5ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14044",
    bundle_name: "Pamper & Unwind Beauty Box",
    component_sku: "12268",
    component_name: "Kerastase Genesis Masque Deluxe 30ml​ GWP",
    component_qty: 1,
  },
  {
    bundle_sku: "14044",
    bundle_name: "Pamper & Unwind Beauty Box",
    component_sku: "12761",
    component_name: "Dermalogica Phyto Nature Oxygen Liquid Cream, 5ml GWP",
    component_qty: 1,
  },
  {
    bundle_sku: "14044",
    bundle_name: "Pamper & Unwind Beauty Box",
    component_sku: "12803",
    component_name: "SOSU Tweezers",
    component_qty: 1,
  },
  {
    bundle_sku: "14044",
    bundle_name: "Pamper & Unwind Beauty Box",
    component_sku: "13060",
    component_name: "Luna By Lisa Compact Mirror GWP",
    component_qty: 1,
  },
  {
    bundle_sku: "14044",
    bundle_name: "Pamper & Unwind Beauty Box",
    component_sku: "20510",
    component_name: "Beauty Box Regular Sleeve",
    component_qty: 1,
  },
  {
    bundle_sku: "14044",
    bundle_name: "Pamper & Unwind Beauty Box",
    component_sku: "8702",
    component_name: "Mio Clay Away Body Cleanser 30ml GWP",
    component_qty: 1,
  },
  {
    bundle_sku: "14045",
    bundle_name: "Treat Yourself Beauty Box",
    component_sku: "12267",
    component_name: "Kerastase Elixir Ultime L'Huile Original Deluxe 15ml​ GWP",
    component_qty: 1,
  },
  {
    bundle_sku: "14045",
    bundle_name: "Treat Yourself Beauty Box",
    component_sku: "12761",
    component_name: "Dermalogica Phyto Nature Oxygen Liquid Cream, 5ml GWP",
    component_qty: 1,
  },
  {
    bundle_sku: "14045",
    bundle_name: "Treat Yourself Beauty Box",
    component_sku: "13558",
    component_name: "True Beauty Eye Essentials Volume 1",
    component_qty: 1,
  },
  {
    bundle_sku: "14045",
    bundle_name: "Treat Yourself Beauty Box",
    component_sku: "13644",
    component_name: "Isoclean 20ml Brush Cleaner Sample",
    component_qty: 1,
  },
  {
    bundle_sku: "14045",
    bundle_name: "Treat Yourself Beauty Box",
    component_sku: "14032",
    component_name: "Premium Makeup Blending Sponge By BeautyFeatures 1PK",
    component_qty: 1,
  },
  {
    bundle_sku: "14045",
    bundle_name: "Treat Yourself Beauty Box",
    component_sku: "20270",
    component_name: "Real Techniques Chroma Perfect Finish Kit",
    component_qty: 1,
  },
  {
    bundle_sku: "14045",
    bundle_name: "Treat Yourself Beauty Box",
    component_sku: "20295",
    component_name: "Large Black Box",
    component_qty: 1,
  },
  {
    bundle_sku: "14045",
    bundle_name: "Treat Yourself Beauty Box",
    component_sku: "20511",
    component_name: "Beauty Box Large Sleeve",
    component_qty: 1,
  },
  {
    bundle_sku: "14046",
    bundle_name: "Self Care & Hair Beauty Box",
    component_sku: "11091",
    component_name: "The Ordinary The Daily Set (50ml x1, 30ml x2)",
    component_qty: 1,
  },
  {
    bundle_sku: "14046",
    bundle_name: "Self Care & Hair Beauty Box",
    component_sku: "13143",
    component_name:
      "Loreal Professionnel Scalp Advanced Anti-Oiliness Mask 75ml GWP",
    component_qty: 1,
  },
  {
    bundle_sku: "14046",
    bundle_name: "Self Care & Hair Beauty Box",
    component_sku: "13144",
    component_name:
      "Loreal Professionnel Scalp Advanced Anti-Oiliness Shampoo 100ml GWP",
    component_qty: 1,
  },
  {
    bundle_sku: "14046",
    bundle_name: "Self Care & Hair Beauty Box",
    component_sku: "14032",
    component_name: "Premium Makeup Blending Sponge By BeautyFeatures 1PK",
    component_qty: 1,
  },
  {
    bundle_sku: "14046",
    bundle_name: "Self Care & Hair Beauty Box",
    component_sku: "20510",
    component_name: "Beauty Box Regular Sleeve",
    component_qty: 1,
  },
  {
    bundle_sku: "14047",
    bundle_name: "Beauty On The Go Beauty Box",
    component_sku: "11003",
    component_name: "Inglot False Lash Effect Mascara",
    component_qty: 1,
  },
  {
    bundle_sku: "14047",
    bundle_name: "Beauty On The Go Beauty Box",
    component_sku: "12108",
    component_name:
      "Matrix Total Results Miracle Creator 20 Multi-Tasking Treatment Spray30ml GWP",
    component_qty: 1,
  },
  {
    bundle_sku: "14047",
    bundle_name: "Beauty On The Go Beauty Box",
    component_sku: "12272",
    component_name:
      "Kerastase Resistance Masque Force Architecte Deluxe 30ml​ GWP",
    component_qty: 1,
  },
  {
    bundle_sku: "14047",
    bundle_name: "Beauty On The Go Beauty Box",
    component_sku: "12539",
    component_name: "Zadig & Voltaire Tote Bag GWP",
    component_qty: 1,
  },
  {
    bundle_sku: "14047",
    bundle_name: "Beauty On The Go Beauty Box",
    component_sku: "13059",
    component_name: "Bare By Vogue Water Bottle GWP",
    component_qty: 1,
  },
  {
    bundle_sku: "14047",
    bundle_name: "Beauty On The Go Beauty Box",
    component_sku: "13565",
    component_name: "Dripping Gold Cherry Lip Oil",
    component_qty: 1,
  },
  {
    bundle_sku: "14047",
    bundle_name: "Beauty On The Go Beauty Box",
    component_sku: "20510",
    component_name: "Beauty Box Regular Sleeve",
    component_qty: 1,
  },
  {
    bundle_sku: "14049",
    bundle_name: "The Ultimate Beauty Treasure Chest",
    component_sku: "10935A",
    component_name: "NUXE Prodigieux Néroli Candle GWP",
    component_qty: 1,
  },
  {
    bundle_sku: "14049",
    bundle_name: "The Ultimate Beauty Treasure Chest",
    component_sku: "12539",
    component_name: "Zadig & Voltaire Tote Bag GWP",
    component_qty: 1,
  },
  {
    bundle_sku: "14049",
    bundle_name: "The Ultimate Beauty Treasure Chest",
    component_sku: "12761",
    component_name: "Dermalogica Phyto Nature Oxygen Liquid Cream, 5ml GWP",
    component_qty: 1,
  },
  {
    bundle_sku: "14049",
    bundle_name: "The Ultimate Beauty Treasure Chest",
    component_sku: "13059",
    component_name: "Bare By Vogue Water Bottle GWP",
    component_qty: 1,
  },
  {
    bundle_sku: "14049",
    bundle_name: "The Ultimate Beauty Treasure Chest",
    component_sku: "13060",
    component_name: "Luna By Lisa Compact Mirror GWP",
    component_qty: 1,
  },
  {
    bundle_sku: "14049",
    bundle_name: "The Ultimate Beauty Treasure Chest",
    component_sku: "13061",
    component_name: "Secrets By Sinead Ultimate Beauty Palette",
    component_qty: 1,
  },
  {
    bundle_sku: "14049",
    bundle_name: "The Ultimate Beauty Treasure Chest",
    component_sku: "13559",
    component_name: "True Beauty Aideen Kate Manifest Lipgloss",
    component_qty: 1,
  },
  {
    bundle_sku: "14049",
    bundle_name: "The Ultimate Beauty Treasure Chest",
    component_sku: "13574",
    component_name: "SOSU Pink Handle Brush Collection - Face",
    component_qty: 1,
  },
  {
    bundle_sku: "14049",
    bundle_name: "The Ultimate Beauty Treasure Chest",
    component_sku: "13644",
    component_name: "Isoclean 20ml Brush Cleaner Sample",
    component_qty: 1,
  },
  {
    bundle_sku: "14049",
    bundle_name: "The Ultimate Beauty Treasure Chest",
    component_sku: "14032",
    component_name: "Premium Makeup Blending Sponge By BeautyFeatures 1PK",
    component_qty: 1,
  },
  {
    bundle_sku: "14049",
    bundle_name: "The Ultimate Beauty Treasure Chest",
    component_sku: "8702",
    component_name: "Mio Clay Away Body Cleanser 30ml GWP",
    component_qty: 1,
  },
  {
    bundle_sku: "14136",
    bundle_name:
      "Alfaparf Semi Di Lino Density Thickening Shampoo & Conditioner Bundle",
    component_sku: "14050",
    component_name:
      "Alfaparf Semi Di Lino Density Thickening Low Shampoo 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14136",
    bundle_name:
      "Alfaparf Semi Di Lino Density Thickening Shampoo & Conditioner Bundle",
    component_sku: "14051",
    component_name:
      "Alfaparf Semi Di Lino Density Thickening Conditioner 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14137",
    bundle_name:
      "Alfaparf Semi Di Lino Density Thickening Bundle - The Full Routine",
    component_sku: "14050",
    component_name:
      "Alfaparf Semi Di Lino Density Thickening Low Shampoo 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14137",
    bundle_name:
      "Alfaparf Semi Di Lino Density Thickening Bundle - The Full Routine",
    component_sku: "14051",
    component_name:
      "Alfaparf Semi Di Lino Density Thickening Conditioner 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14137",
    bundle_name:
      "Alfaparf Semi Di Lino Density Thickening Bundle - The Full Routine",
    component_sku: "14052",
    component_name: "Alfaparf Semi Di Lino Density Thickening Lotion 6 x 13ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14137",
    bundle_name:
      "Alfaparf Semi Di Lino Density Thickening Bundle - The Full Routine",
    component_sku: "14053",
    component_name:
      "Alfaparf Semi Di Lino Density Thickening Leave in Cream 125ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14138",
    bundle_name: "Kérastase Nutritive - The Four Step Routine Bundle",
    component_sku: "12828",
    component_name:
      "Kérastase Nutritive Nutri-Supplement Split Ends Serum For Dry Hair & Split Ends 50ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14138",
    bundle_name: "Kérastase Nutritive - The Four Step Routine Bundle",
    component_sku: "13323",
    component_name: "Kérastase Nutritive Bain Satin Hydrating (Dry Hair) 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14138",
    bundle_name: "Kérastase Nutritive - The Four Step Routine Bundle",
    component_sku: "KER_44015370",
    component_name: "Kerastase Nutritive Masquintense Riche 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14138",
    bundle_name: "Kérastase Nutritive - The Four Step Routine Bundle",
    component_sku: "KER_4401984",
    component_name: "Kerastase Nutritive Lait Vital 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14195",
    bundle_name:
      "L'Oreal Professionnel Serie Expert Absolut Repair Molecular Trio",
    component_sku: "13213",
    component_name:
      "L'Oréal Professionnel Absolut Repair Molecular, Molecular Repairing Leave-in Mask for Damaged Hair 100ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14195",
    bundle_name:
      "L'Oreal Professionnel Serie Expert Absolut Repair Molecular Trio",
    component_sku: "13214",
    component_name:
      "L'Oréal Professionnel Absolut Repair Molecular Deep Molecular Repairing Hair Rinse-off Serum for Damaged Hair 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14195",
    bundle_name:
      "L'Oreal Professionnel Serie Expert Absolut Repair Molecular Trio",
    component_sku: "13284",
    component_name:
      "L'Oréal Professionnel Absolut Repair Molecular Sulfate-Free Molecular Repairing Shampoo 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14196",
    bundle_name:
      "L'Oreal Professionnel Serie Expert Absolut Repair Molecular Duo",
    component_sku: "13214",
    component_name:
      "L'Oréal Professionnel Absolut Repair Molecular Deep Molecular Repairing Hair Rinse-off Serum for Damaged Hair 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14196",
    bundle_name:
      "L'Oreal Professionnel Serie Expert Absolut Repair Molecular Duo",
    component_sku: "13284",
    component_name:
      "L'Oréal Professionnel Absolut Repair Molecular Sulfate-Free Molecular Repairing Shampoo 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14197",
    bundle_name: "L'Oréal Professionnel Serie Expert Absolut Repair Routine",
    component_sku: "11458",
    component_name: "L'Oréal Professionnel Absolut Repair Shampoo - 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14197",
    bundle_name: "L'Oréal Professionnel Serie Expert Absolut Repair Routine",
    component_sku: "11459",
    component_name: "L'Oréal Professionnel Absolut Repair Conditioner 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14197",
    bundle_name: "L'Oréal Professionnel Serie Expert Absolut Repair Routine",
    component_sku: "11462",
    component_name:
      "L'Oréal Professionnel Absolut Repair 10 in 1 leave in oil - 90ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14198",
    bundle_name:
      "L'Oreal Professionnel Serie Expert Scalp Advanced Anti-Dandruff Shampoo and Hair Treatment Duo",
    component_sku: "12681",
    component_name:
      "L'Oréal Professionnel Serié Expert Scalp Advanced Anti-Discomfort Hair Treatment 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14198",
    bundle_name:
      "L'Oreal Professionnel Serie Expert Scalp Advanced Anti-Dandruff Shampoo and Hair Treatment Duo",
    component_sku: "12682",
    component_name:
      "L'Oréal Professionnel Serié Expert Scalp Advanced Anti-Dandruff Dermo-Clarifier Shampoo 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14199",
    bundle_name:
      "L'Oréal Professionnel Pro Longer Shampoo, Conditioner and Cream Trio",
    component_sku: "11471",
    component_name: "L'Oréal Professionnel Pro Longer Shampoo 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14199",
    bundle_name:
      "L'Oréal Professionnel Pro Longer Shampoo, Conditioner and Cream Trio",
    component_sku: "11472",
    component_name: "L'Oréal Professionnel Pro Longer Conditioner 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14199",
    bundle_name:
      "L'Oréal Professionnel Pro Longer Shampoo, Conditioner and Cream Trio",
    component_sku: "11474",
    component_name: "L'Oréal Professionnel Pro Longer 10 in 1 Cream 150ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14200",
    bundle_name: "L'Oréal Professionnel Serie Expert Inforcer Trio",
    component_sku: "11468",
    component_name: "L'Oréal Professionnel Inforcer Shampoo 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14200",
    bundle_name: "L'Oréal Professionnel Serie Expert Inforcer Trio",
    component_sku: "11469",
    component_name: "L'Oréal Professionnel Inforcer Conditioner 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14200",
    bundle_name: "L'Oréal Professionnel Serie Expert Inforcer Trio",
    component_sku: "11470",
    component_name: "L'Oréal Professionnel Inforcer Mask 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14201",
    bundle_name:
      "Kérastase Densifique Shampoo and Conditioner Hair Duo Routine",
    component_sku: "9135",
    component_name: "Kerastase Densifique Conditioner 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14201",
    bundle_name:
      "Kérastase Densifique Shampoo and Conditioner Hair Duo Routine",
    component_sku: "9140",
    component_name: "Kerastase Densifique Bain Stemfree 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14202",
    bundle_name:
      "Kérastase Genesis Anti-Hair Fall Duo for Normal/Oily Hair and Free Travel Size Duo",
    component_sku: "11667",
    component_name: "Kerastase Genesis Fondant Renforcateur 75ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14202",
    bundle_name:
      "Kérastase Genesis Anti-Hair Fall Duo for Normal/Oily Hair and Free Travel Size Duo",
    component_sku: "8779",
    component_name: "Kerastase Genesis Bain Hydra-Fortifiant 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14202",
    bundle_name:
      "Kérastase Genesis Anti-Hair Fall Duo for Normal/Oily Hair and Free Travel Size Duo",
    component_sku: "8781",
    component_name: "Kerastase Genesis Fondant Renforçateur 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14203",
    bundle_name: "Kérastase Chroma Absolu Duo - Fine to Medium Hair",
    component_sku: "11031",
    component_name: "Kérastase Chroma Absolu Bain Opaque Shampoo 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14203",
    bundle_name: "Kérastase Chroma Absolu Duo - Fine to Medium Hair",
    component_sku: "11033",
    component_name: "Kérastase Chroma Absolu Repairing Fondant 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14204",
    bundle_name:
      "Kérastase Genesis Shampoo, Conditioner and Serum Hair Trio Routine",
    component_sku: "8780",
    component_name: "Kerastase Genesis Bain Nutri-Fortifiant 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14204",
    bundle_name:
      "Kérastase Genesis Shampoo, Conditioner and Serum Hair Trio Routine",
    component_sku: "8781",
    component_name: "Kerastase Genesis Fondant Renforçateur 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14204",
    bundle_name:
      "Kérastase Genesis Shampoo, Conditioner and Serum Hair Trio Routine",
    component_sku: "8785",
    component_name: "Kerastase Genesis Serum Anti-Chute Fortifiant 90ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14205",
    bundle_name:
      "Kérastase Genesis Anti Hair-Fall Fortifying Serum 90ml with Travel Size Duo",
    component_sku: "11667",
    component_name: "Kerastase Genesis Fondant Renforcateur 75ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14205",
    bundle_name:
      "Kérastase Genesis Anti Hair-Fall Fortifying Serum 90ml with Travel Size Duo",
    component_sku: "8785",
    component_name: "Kerastase Genesis Serum Anti-Chute Fortifiant 90ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14206",
    bundle_name: "Kérastase Very Curly Hair Duo Bundle",
    component_sku: "10188",
    component_name: "Kerastase Curl Manifesto Bain Hydratation Douceur 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14206",
    bundle_name: "Kérastase Very Curly Hair Duo Bundle",
    component_sku: "10189",
    component_name:
      "Kerastase Curl Manifesto Fondant Hydratation Essentielle 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14207",
    bundle_name:
      "Kérastase Symbiose Anti-Dandruff Cleanse and Condition Duo for Dry Scalps",
    component_sku: "12257",
    component_name:
      "Kérastase Symbiose Moisturising Anti-Dandruff Cellular Shampoo 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14207",
    bundle_name:
      "Kérastase Symbiose Anti-Dandruff Cleanse and Condition Duo for Dry Scalps",
    component_sku: "12258",
    component_name:
      "Kérastase Symbiose Detangling Soothing Cellular Conditioner 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14208",
    bundle_name: "Kérastase Elixir Ultime L'Original Elixir Ultime Bundle",
    component_sku: "13247",
    component_name: "Kérastase Elixir Ultime L'original Oil 30ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14208",
    bundle_name: "Kérastase Elixir Ultime L'Original Elixir Ultime Bundle",
    component_sku: "KER_E022410",
    component_name: "Kerastase  Elixir Ultime 100ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14209",
    bundle_name:
      "Kérastase Discipline Bain Fluidealiste Gentle and Fondant Fluidealiste Bundle",
    component_sku: "13312",
    component_name:
      "Kérastase Discipline Bain Fluidealiste Gentle Sulfate Free 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14209",
    bundle_name:
      "Kérastase Discipline Bain Fluidealiste Gentle and Fondant Fluidealiste Bundle",
    component_sku: "KER_E1121000",
    component_name: "Kerastase Discipline Fondant Fluidealiste 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14210",
    bundle_name: "Kérastase Nutritive Nourishment Boosters Duo for Dry Hair",
    component_sku: "11644",
    component_name: "Kerastase Nutritive 8H Magic Night Serum 90ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14210",
    bundle_name: "Kérastase Nutritive Nourishment Boosters Duo for Dry Hair",
    component_sku: "12828",
    component_name:
      "Kérastase Nutritive Nutri-Supplement Split Ends Serum For Dry Hair & Split Ends 50ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14211",
    bundle_name: "Kérastase Masque Resistance Therapiste Elixir Bundle",
    component_sku: "9130",
    component_name: "Kerastase Resistance Therapiste Masque 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14211",
    bundle_name: "Kérastase Masque Resistance Therapiste Elixir Bundle",
    component_sku: "KER_E022410",
    component_name: "Kerastase  Elixir Ultime 100ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14212",
    bundle_name:
      "Kérastase Symbiose Anti-Dandruff Cleanse and Condition Duo for Oily Scalps",
    component_sku: "12256",
    component_name:
      "Kérastase Symbiose Purifying Anti-Dandruff Cellular Shampoo 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14212",
    bundle_name:
      "Kérastase Symbiose Anti-Dandruff Cleanse and Condition Duo for Oily Scalps",
    component_sku: "12258",
    component_name:
      "Kérastase Symbiose Detangling Soothing Cellular Conditioner 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14213",
    bundle_name:
      "Kérastase Extentioniste Everyday 3 Step Routine for Healthy-Looking Lengths",
    component_sku: "6729",
    component_name: "Kerastase Resistance Bain Extentioniste Shampoo 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14213",
    bundle_name:
      "Kérastase Extentioniste Everyday 3 Step Routine for Healthy-Looking Lengths",
    component_sku: "6730",
    component_name:
      "Kerastase Resistance Fondant Extentioniste Conditioner 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14213",
    bundle_name:
      "Kérastase Extentioniste Everyday 3 Step Routine for Healthy-Looking Lengths",
    component_sku: "9653",
    component_name: "Kerastase Resistance Thermique Extentioniste 150ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14214",
    bundle_name: "Kérastase Resistance Reconstructing 3 Step Regime",
    component_sku: "9130",
    component_name: "Kerastase Resistance Therapiste Masque 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14214",
    bundle_name: "Kérastase Resistance Reconstructing 3 Step Regime",
    component_sku: "KER_E046500",
    component_name: "Kerastase Resistance Ciment Anti Usure 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14214",
    bundle_name: "Kérastase Resistance Reconstructing 3 Step Regime",
    component_sku: "KER_E057430",
    component_name: "Kerastase Bain De Force Architecte 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14215",
    bundle_name:
      "Kérastase Resistance Strengthening Trio For Fine to Medium Hair",
    component_sku: "KER_4402020",
    component_name: "Kerastase  Resistance Ciment Thermique 150ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14215",
    bundle_name:
      "Kérastase Resistance Strengthening Trio For Fine to Medium Hair",
    component_sku: "KER_E046500",
    component_name: "Kerastase Resistance Ciment Anti Usure 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14215",
    bundle_name:
      "Kérastase Resistance Strengthening Trio For Fine to Medium Hair",
    component_sku: "KER_E057430",
    component_name: "Kerastase Bain De Force Architecte 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14216",
    bundle_name: "Kérastase Chroma Absolu Duo - Medium to Thick Hair",
    component_sku: "11032",
    component_name: "Kérastase Chroma Absolu Bain Limpid Shampoo 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14216",
    bundle_name: "Kérastase Chroma Absolu Duo - Medium to Thick Hair",
    component_sku: "11034",
    component_name: "Kérastase Chroma Absolu Mask 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14217",
    bundle_name: "Kérastase Blond Absolu Shine, Strength and Neutralising Trio",
    component_sku: "8774",
    component_name: "Kerastase Blond Absolu Bain Ultra-Violet 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14217",
    bundle_name: "Kérastase Blond Absolu Shine, Strength and Neutralising Trio",
    component_sku: "8775",
    component_name: "Kerastase Blond Absolu Bain Lumiére 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14217",
    bundle_name: "Kérastase Blond Absolu Shine, Strength and Neutralising Trio",
    component_sku: "8776",
    component_name: "Kerastase Blond Absolu Fondant Cicaflash 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14218",
    bundle_name:
      "Kérastase Nutritive Nourishing Essentials Bundle for Fine-Medium Dry Hair",
    component_sku: "11644",
    component_name: "Kerastase Nutritive 8H Magic Night Serum 90ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14218",
    bundle_name:
      "Kérastase Nutritive Nourishing Essentials Bundle for Fine-Medium Dry Hair",
    component_sku: "13323",
    component_name: "Kérastase Nutritive Bain Satin Hydrating (Dry Hair) 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14218",
    bundle_name:
      "Kérastase Nutritive Nourishing Essentials Bundle for Fine-Medium Dry Hair",
    component_sku: "KER_4401984",
    component_name: "Kerastase Nutritive Lait Vital 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14219",
    bundle_name: "Kérastase Resistance Ciment Thermique 150ml Duo",
    component_sku: "KER_4402020",
    component_name: "Kerastase  Resistance Ciment Thermique 150ml",
    component_qty: 2,
  },
  {
    bundle_sku: "14220",
    bundle_name:
      "Kérastase Resistance Therapiste Shampoo, Masque and Serum Trio",
    component_sku: "9128",
    component_name: "Kerastase Resistance Bain Therapiste 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14220",
    bundle_name:
      "Kérastase Resistance Therapiste Shampoo, Masque and Serum Trio",
    component_sku: "9130",
    component_name: "Kerastase Resistance Therapiste Masque 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14220",
    bundle_name:
      "Kérastase Resistance Therapiste Shampoo, Masque and Serum Trio",
    component_sku: "KER_E1490200",
    component_name: "Kerastase Resistance Therapiste Serum 30ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14221",
    bundle_name: "Kérastase Discipline Bain Fluidealiste Gentle 250ml Duo",
    component_sku: "13312",
    component_name:
      "Kérastase Discipline Bain Fluidealiste Gentle Sulfate Free 250ml",
    component_qty: 2,
  },
  {
    bundle_sku: "14222",
    bundle_name: "Kérastase Discipline 3 Step Smoothing Anti-Frizz Routine",
    component_sku: "14223",
    component_name: "Kerastase Discipline Keratin Thermique Crème (150ml)",
    component_qty: 1,
  },
  {
    bundle_sku: "14222",
    bundle_name: "Kérastase Discipline 3 Step Smoothing Anti-Frizz Routine",
    component_sku: "KER_E1023000",
    component_name: "Kerastase Discipline Bain Fluidealiste 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14222",
    bundle_name: "Kérastase Discipline 3 Step Smoothing Anti-Frizz Routine",
    component_sku: "KER_E1121000",
    component_name: "Kerastase Discipline Fondant Fluidealiste 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14224",
    bundle_name:
      "Kérastase Chronologiste Youth Revitalising Bain Regenerant Shampoo 250ml Duo",
    component_sku: "8975",
    component_name: "Kerastase Chronologiste Bain Regenerant Shampoo 250ml",
    component_qty: 2,
  },
  {
    bundle_sku: "14225",
    bundle_name:
      "Kérastase Blond Absolu Ultra Violet Shampoo, Masque and Conditioner Trio",
    component_sku: "8774",
    component_name: "Kerastase Blond Absolu Bain Ultra-Violet 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14225",
    bundle_name:
      "Kérastase Blond Absolu Ultra Violet Shampoo, Masque and Conditioner Trio",
    component_sku: "8776",
    component_name: "Kerastase Blond Absolu Fondant Cicaflash 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14225",
    bundle_name:
      "Kérastase Blond Absolu Ultra Violet Shampoo, Masque and Conditioner Trio",
    component_sku: "8778",
    component_name: "Kerastase Blond Absolu Masque Ultra-Violet 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14229",
    bundle_name: "Kérastase Extentioniste Regime for Healthy-Looking Lengths",
    component_sku: "6729",
    component_name: "Kerastase Resistance Bain Extentioniste Shampoo 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14229",
    bundle_name: "Kérastase Extentioniste Regime for Healthy-Looking Lengths",
    component_sku: "6730",
    component_name:
      "Kerastase Resistance Fondant Extentioniste Conditioner 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14229",
    bundle_name: "Kérastase Extentioniste Regime for Healthy-Looking Lengths",
    component_sku: "6731",
    component_name: "Kerastase Resistance Masque Extentioniste 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14229",
    bundle_name: "Kérastase Extentioniste Regime for Healthy-Looking Lengths",
    component_sku: "6732",
    component_name: "Kerastase Resistance Serum Extentioniste 50ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14229",
    bundle_name: "Kérastase Extentioniste Regime for Healthy-Looking Lengths",
    component_sku: "9653",
    component_name: "Kerastase Resistance Thermique Extentioniste 150ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14230",
    bundle_name:
      "Kérastase Blond Absolu Shampoo, Conditioner and Oil Hair Routine for Lightened or Highlighted Hair",
    component_sku: "8775",
    component_name: "Kerastase Blond Absolu Bain Lumiére 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14230",
    bundle_name:
      "Kérastase Blond Absolu Shampoo, Conditioner and Oil Hair Routine for Lightened or Highlighted Hair",
    component_sku: "8776",
    component_name: "Kerastase Blond Absolu Fondant Cicaflash 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14230",
    bundle_name:
      "Kérastase Blond Absolu Shampoo, Conditioner and Oil Hair Routine for Lightened or Highlighted Hair",
    component_sku: "9225",
    component_name: "Kerastase Huile Cicaextreme 100Ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14231",
    bundle_name: "Kérastase Specifique Bain Prévention Shampoo 250ml Duo",
    component_sku: "13336",
    component_name: "Kérastase Specifique Bain Prevention 250ml",
    component_qty: 2,
  },
  {
    bundle_sku: "14232",
    bundle_name:
      "Kérastase Nutritive Nourishing Essentials Bundle for Medium-Thick Very Dry Hair",
    component_sku: "11644",
    component_name: "Kerastase Nutritive 8H Magic Night Serum 90ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14232",
    bundle_name:
      "Kérastase Nutritive Nourishing Essentials Bundle for Medium-Thick Very Dry Hair",
    component_sku: "13323",
    component_name: "Kérastase Nutritive Bain Satin Hydrating (Dry Hair) 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14232",
    bundle_name:
      "Kérastase Nutritive Nourishing Essentials Bundle for Medium-Thick Very Dry Hair",
    component_sku: "KER_44015370",
    component_name: "Kerastase Nutritive Masquintense Riche 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14233",
    bundle_name: "Kérastase Coily Hair Duos Bundle",
    component_sku: "10188",
    component_name: "Kerastase Curl Manifesto Bain Hydratation Douceur 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14233",
    bundle_name: "Kérastase Coily Hair Duos Bundle",
    component_sku: "10190",
    component_name:
      "Kerastase Curl Manifesto Masque Beurre Haute Nutrition 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14234",
    bundle_name:
      "Kérastase Blond Absolu Shampoo, Conditioner and Treatment Hair Routine for Lightened or Highlighted Hair",
    component_sku: "8775",
    component_name: "Kerastase Blond Absolu Bain Lumiére 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14234",
    bundle_name:
      "Kérastase Blond Absolu Shampoo, Conditioner and Treatment Hair Routine for Lightened or Highlighted Hair",
    component_sku: "8776",
    component_name: "Kerastase Blond Absolu Fondant Cicaflash 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14234",
    bundle_name:
      "Kérastase Blond Absolu Shampoo, Conditioner and Treatment Hair Routine for Lightened or Highlighted Hair",
    component_sku: "8777",
    component_name: "Kerastase Blond Absolu Cicaplasme 150ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14235",
    bundle_name: "Kérastase Discipline Fondant Fluidealiste 200ml Duo",
    component_sku: "KER_E1121000",
    component_name: "Kerastase Discipline Fondant Fluidealiste 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14236",
    bundle_name: "Kérastase Resistance Therapiste Bain 250ml Duo",
    component_sku: "9128",
    component_name: "Kerastase Resistance Bain Therapiste 250ml",
    component_qty: 2,
  },
  {
    bundle_sku: "14237",
    bundle_name: "Kérastase Complete Care For Wavy To Curly Hair Bundle",
    component_sku: "10188",
    component_name: "Kerastase Curl Manifesto Bain Hydratation Douceur 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14237",
    bundle_name: "Kérastase Complete Care For Wavy To Curly Hair Bundle",
    component_sku: "10189",
    component_name:
      "Kerastase Curl Manifesto Fondant Hydratation Essentielle 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14237",
    bundle_name: "Kérastase Complete Care For Wavy To Curly Hair Bundle",
    component_sku: "10193",
    component_name: "Kerastase Curl Manifesto Gelée Curl Contour 150ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14237",
    bundle_name: "Kérastase Complete Care For Wavy To Curly Hair Bundle",
    component_sku: "10194",
    component_name: "Kerastase Curl Manifesto Fresh Absolu Spray 190ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14238",
    bundle_name: "Kérastase Specifique Stimuliste Hair Thickener 125ml Duo",
    component_sku: "9127",
    component_name: "Kerastase Specifique Stimuliste 125ml",
    component_qty: 2,
  },
  {
    bundle_sku: "14239",
    bundle_name:
      "Kérastase Symbiose Anti-Dandruff Exfoliate and Cleanse Duo for Dry Scalps",
    component_sku: "12255",
    component_name:
      "Kérastase Symbiose Micro-Exfoliating Cellular Treatment 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14239",
    bundle_name:
      "Kérastase Symbiose Anti-Dandruff Exfoliate and Cleanse Duo for Dry Scalps",
    component_sku: "12257",
    component_name:
      "Kérastase Symbiose Moisturising Anti-Dandruff Cellular Shampoo 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14240",
    bundle_name:
      "Kérastase Symbiose Anti-Dandruff Exfoliate and Cleanse Duo for Oily Scalps",
    component_sku: "12255",
    component_name:
      "Kérastase Symbiose Micro-Exfoliating Cellular Treatment 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14240",
    bundle_name:
      "Kérastase Symbiose Anti-Dandruff Exfoliate and Cleanse Duo for Oily Scalps",
    component_sku: "12256",
    component_name:
      "Kérastase Symbiose Purifying Anti-Dandruff Cellular Shampoo 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14241",
    bundle_name:
      "Kérastase Symbiose 3 Step Anti-Dandruff System for Dry Scalps",
    component_sku: "12257",
    component_name:
      "Kérastase Symbiose Moisturising Anti-Dandruff Cellular Shampoo 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14241",
    bundle_name:
      "Kérastase Symbiose 3 Step Anti-Dandruff System for Dry Scalps",
    component_sku: "12258",
    component_name:
      "Kérastase Symbiose Detangling Soothing Cellular Conditioner 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14241",
    bundle_name:
      "Kérastase Symbiose 3 Step Anti-Dandruff System for Dry Scalps",
    component_sku: "12260",
    component_name:
      "Kérastase Symbiose Intensive Anti-Dandruff Cellular Night Serum 90ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14242",
    bundle_name: "Kérastase Chroma Absolu Trio - Fine to Medium Hair",
    component_sku: "11031",
    component_name: "Kérastase Chroma Absolu Bain Opaque Shampoo 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14242",
    bundle_name: "Kérastase Chroma Absolu Trio - Fine to Medium Hair",
    component_sku: "11033",
    component_name: "Kérastase Chroma Absolu Repairing Fondant 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14242",
    bundle_name: "Kérastase Chroma Absolu Trio - Fine to Medium Hair",
    component_sku: "11036",
    component_name: "Kérastase Chroma Absolu Leave In Serum 150ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14243",
    bundle_name: "Kérastase Resistance Therepiste Serum Duo 30ml",
    component_sku: "KER_E1490200",
    component_name: "Kerastase Resistance Therapiste Serum 30ml",
    component_qty: 2,
  },
  {
    bundle_sku: "14244",
    bundle_name: "Kérastase Blond Absolu Protect and Hydrate Duo",
    component_sku: "13236",
    component_name:
      "Kérastase Blond Absolu 2% Pure Hyaluronic Acid Scalp and Hair Serum 50ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14244",
    bundle_name: "Kérastase Blond Absolu Protect and Hydrate Duo",
    component_sku: "8777",
    component_name: "Kerastase Blond Absolu Cicaplasme 150ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14245",
    bundle_name:
      "Kérastase Blond Absolu Ultraviolet Shampoo, Conditioner and Oil Trio for Brightening Blonde Hair",
    component_sku: "8774",
    component_name: "Kerastase Blond Absolu Bain Ultra-Violet 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14245",
    bundle_name:
      "Kérastase Blond Absolu Ultraviolet Shampoo, Conditioner and Oil Trio for Brightening Blonde Hair",
    component_sku: "8776",
    component_name: "Kerastase Blond Absolu Fondant Cicaflash 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14245",
    bundle_name:
      "Kérastase Blond Absolu Ultraviolet Shampoo, Conditioner and Oil Trio for Brightening Blonde Hair",
    component_sku: "9225",
    component_name: "Kerastase Huile Cicaextreme 100Ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14246",
    bundle_name:
      "Kérastase Blond Absolu Lumiere Shampoo, Conditioner and Masque Trio",
    component_sku: "8775",
    component_name: "Kerastase Blond Absolu Bain Lumiére 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14246",
    bundle_name:
      "Kérastase Blond Absolu Lumiere Shampoo, Conditioner and Masque Trio",
    component_sku: "8776",
    component_name: "Kerastase Blond Absolu Fondant Cicaflash 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14246",
    bundle_name:
      "Kérastase Blond Absolu Lumiere Shampoo, Conditioner and Masque Trio",
    component_sku: "8778",
    component_name: "Kerastase Blond Absolu Masque Ultra-Violet 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14247",
    bundle_name: "Kérastase Curly Hair Heroes Bundle",
    component_sku: "10188",
    component_name: "Kerastase Curl Manifesto Bain Hydratation Douceur 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14247",
    bundle_name: "Kérastase Curly Hair Heroes Bundle",
    component_sku: "10189",
    component_name:
      "Kerastase Curl Manifesto Fondant Hydratation Essentielle 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14247",
    bundle_name: "Kérastase Curly Hair Heroes Bundle",
    component_sku: "10194",
    component_name: "Kerastase Curl Manifesto Fresh Absolu Spray 190ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14248",
    bundle_name:
      "Kérastase Nutritive Daily Nourishing Regime for Medium-Thick Very Dry Hair",
    component_sku: "11644",
    component_name: "Kerastase Nutritive 8H Magic Night Serum 90ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14248",
    bundle_name:
      "Kérastase Nutritive Daily Nourishing Regime for Medium-Thick Very Dry Hair",
    component_sku: "12828",
    component_name:
      "Kérastase Nutritive Nutri-Supplement Split Ends Serum For Dry Hair & Split Ends 50ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14248",
    bundle_name:
      "Kérastase Nutritive Daily Nourishing Regime for Medium-Thick Very Dry Hair",
    component_sku: "13323",
    component_name: "Kérastase Nutritive Bain Satin Hydrating (Dry Hair) 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14248",
    bundle_name:
      "Kérastase Nutritive Daily Nourishing Regime for Medium-Thick Very Dry Hair",
    component_sku: "KER_44015370",
    component_name: "Kerastase Nutritive Masquintense Riche 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14249",
    bundle_name:
      "Kérastase Nutritive Daily Nourishing Regime for Fine-Medium Dry Hair",
    component_sku: "11644",
    component_name: "Kerastase Nutritive 8H Magic Night Serum 90ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14249",
    bundle_name:
      "Kérastase Nutritive Daily Nourishing Regime for Fine-Medium Dry Hair",
    component_sku: "12828",
    component_name:
      "Kérastase Nutritive Nutri-Supplement Split Ends Serum For Dry Hair & Split Ends 50ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14249",
    bundle_name:
      "Kérastase Nutritive Daily Nourishing Regime for Fine-Medium Dry Hair",
    component_sku: "13323",
    component_name: "Kérastase Nutritive Bain Satin Hydrating (Dry Hair) 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14249",
    bundle_name:
      "Kérastase Nutritive Daily Nourishing Regime for Fine-Medium Dry Hair",
    component_sku: "KER_4401984",
    component_name: "Kerastase Nutritive Lait Vital 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14250",
    bundle_name: "Kérastase Chroma Absolu Trio - Medium to Thick Hair",
    component_sku: "11032",
    component_name: "Kérastase Chroma Absolu Bain Limpid Shampoo 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14250",
    bundle_name: "Kérastase Chroma Absolu Trio - Medium to Thick Hair",
    component_sku: "11034",
    component_name: "Kérastase Chroma Absolu Mask 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14250",
    bundle_name: "Kérastase Chroma Absolu Trio - Medium to Thick Hair",
    component_sku: "11036",
    component_name: "Kérastase Chroma Absolu Leave In Serum 150ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14251",
    bundle_name:
      "Kérastase Densifique Shampoo, Conditioner and Ultime Oil Hair Trio Routine",
    component_sku: "9135",
    component_name: "Kerastase Densifique Conditioner 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14251",
    bundle_name:
      "Kérastase Densifique Shampoo, Conditioner and Ultime Oil Hair Trio Routine",
    component_sku: "9140",
    component_name: "Kerastase Densifique Bain Stemfree 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14251",
    bundle_name:
      "Kérastase Densifique Shampoo, Conditioner and Ultime Oil Hair Trio Routine",
    component_sku: "KER_E022410",
    component_name: "Kerastase  Elixir Ultime 100ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14252",
    bundle_name:
      "Kérastase Symbiose Anti-Dandruff Cleanse and Treat Duo for Oily Scalps",
    component_sku: "12256",
    component_name:
      "Kérastase Symbiose Purifying Anti-Dandruff Cellular Shampoo 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14252",
    bundle_name:
      "Kérastase Symbiose Anti-Dandruff Cleanse and Treat Duo for Oily Scalps",
    component_sku: "12260",
    component_name:
      "Kérastase Symbiose Intensive Anti-Dandruff Cellular Night Serum 90ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14253",
    bundle_name:
      "Kérastase Symbiose Anti-Dandruff Cleanse and Treat Duo for Dry Scalps",
    component_sku: "12257",
    component_name:
      "Kérastase Symbiose Moisturising Anti-Dandruff Cellular Shampoo 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14253",
    bundle_name:
      "Kérastase Symbiose Anti-Dandruff Cleanse and Treat Duo for Dry Scalps",
    component_sku: "12260",
    component_name:
      "Kérastase Symbiose Intensive Anti-Dandruff Cellular Night Serum 90ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14254",
    bundle_name: "Kérastase Chroma Absolu Hydrate, Strengthen and Shine Trio",
    component_sku: "11031",
    component_name: "Kérastase Chroma Absolu Bain Opaque Shampoo 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14254",
    bundle_name: "Kérastase Chroma Absolu Hydrate, Strengthen and Shine Trio",
    component_sku: "11033",
    component_name: "Kérastase Chroma Absolu Repairing Fondant 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14254",
    bundle_name: "Kérastase Chroma Absolu Hydrate, Strengthen and Shine Trio",
    component_sku: "11037",
    component_name: "Kérastase Chroma Absolu Soin Acid Chroma Gloss 210ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14255",
    bundle_name: "Kérastase Discipline Maskeratine 200ml Duo",
    component_sku: "9132",
    component_name: "Kerastase Discipline Maskeratine 200ml",
    component_qty: 2,
  },
  {
    bundle_sku: "14256",
    bundle_name: "Kérastase Complete Care for Coily Hair Bundle",
    component_sku: "10188",
    component_name: "Kerastase Curl Manifesto Bain Hydratation Douceur 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14256",
    bundle_name: "Kérastase Complete Care for Coily Hair Bundle",
    component_sku: "10190",
    component_name:
      "Kerastase Curl Manifesto Masque Beurre Haute Nutrition 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14256",
    bundle_name: "Kérastase Complete Care for Coily Hair Bundle",
    component_sku: "10191",
    component_name: "Kerastase Curl Manifesto Crème De Jour Fondamentale 150ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14256",
    bundle_name: "Kérastase Complete Care for Coily Hair Bundle",
    component_sku: "10192",
    component_name: "Kerastase Curl Manifesto Huile Sublime Repair 50ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14256",
    bundle_name: "Kérastase Complete Care for Coily Hair Bundle",
    component_sku: "10193",
    component_name: "Kerastase Curl Manifesto Gelée Curl Contour 150ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14256",
    bundle_name: "Kérastase Complete Care for Coily Hair Bundle",
    component_sku: "10194",
    component_name: "Kerastase Curl Manifesto Fresh Absolu Spray 190ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14257",
    bundle_name: "Kérastase Curl Nourishment Bundle",
    component_sku: "10188",
    component_name: "Kerastase Curl Manifesto Bain Hydratation Douceur 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14257",
    bundle_name: "Kérastase Curl Nourishment Bundle",
    component_sku: "10189",
    component_name:
      "Kerastase Curl Manifesto Fondant Hydratation Essentielle 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14257",
    bundle_name: "Kérastase Curl Nourishment Bundle",
    component_sku: "10192",
    component_name: "Kerastase Curl Manifesto Huile Sublime Repair 50ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14258",
    bundle_name:
      "Kérastase Symbiose 3 Step Anti-Dandruff System for Oily Scalps",
    component_sku: "12256",
    component_name:
      "Kérastase Symbiose Purifying Anti-Dandruff Cellular Shampoo 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14258",
    bundle_name:
      "Kérastase Symbiose 3 Step Anti-Dandruff System for Oily Scalps",
    component_sku: "12258",
    component_name:
      "Kérastase Symbiose Detangling Soothing Cellular Conditioner 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14258",
    bundle_name:
      "Kérastase Symbiose 3 Step Anti-Dandruff System for Oily Scalps",
    component_sku: "12260",
    component_name:
      "Kérastase Symbiose Intensive Anti-Dandruff Cellular Night Serum 90ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14259",
    bundle_name:
      "Kérastase Nutritive Root To Tip Hydrating Heroes Nourish and Smooth Bundle for Medium-Thick Very Dry Hair",
    component_sku: "12828",
    component_name:
      "Kérastase Nutritive Nutri-Supplement Split Ends Serum For Dry Hair & Split Ends 50ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14259",
    bundle_name:
      "Kérastase Nutritive Root To Tip Hydrating Heroes Nourish and Smooth Bundle for Medium-Thick Very Dry Hair",
    component_sku: "13323",
    component_name: "Kérastase Nutritive Bain Satin Hydrating (Dry Hair) 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14259",
    bundle_name:
      "Kérastase Nutritive Root To Tip Hydrating Heroes Nourish and Smooth Bundle for Medium-Thick Very Dry Hair",
    component_sku: "KER_44015370",
    component_name: "Kerastase Nutritive Masquintense Riche 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14260",
    bundle_name:
      "Kérastase Nutritive Root To Tip Hydrating Heroes Nourish and Smooth Bundle for Fine-Medium Dry Hair",
    component_sku: "12828",
    component_name:
      "Kérastase Nutritive Nutri-Supplement Split Ends Serum For Dry Hair & Split Ends 50ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14260",
    bundle_name:
      "Kérastase Nutritive Root To Tip Hydrating Heroes Nourish and Smooth Bundle for Fine-Medium Dry Hair",
    component_sku: "13323",
    component_name: "Kérastase Nutritive Bain Satin Hydrating (Dry Hair) 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14260",
    bundle_name:
      "Kérastase Nutritive Root To Tip Hydrating Heroes Nourish and Smooth Bundle for Fine-Medium Dry Hair",
    component_sku: "KER_4401984",
    component_name: "Kerastase Nutritive Lait Vital 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14261",
    bundle_name: "Kérastase Resistance Therapiste Masque 200ml Duo",
    component_sku: "9130",
    component_name: "Kerastase Resistance Therapiste Masque 200ml",
    component_qty: 2,
  },
  {
    bundle_sku: "14262",
    bundle_name: "Kérastase Discipline Keratin Thermique Creme 150ml Duo",
    component_sku: "14223",
    component_name: "Kerastase Discipline Keratin Thermique Crème (150ml)",
    component_qty: 2,
  },
  {
    bundle_sku: "14263",
    bundle_name: "Kérastase Masque Force Architecte 200ml Duo",
    component_sku: "KER_E029600",
    component_name: "Kerastase Masque Force Architecte 200ml",
    component_qty: 2,
  },
  {
    bundle_sku: "14264",
    bundle_name:
      "Kérastase Specifique Masque Hydra-Apaisant Conditioner 200ml Duo",
    component_sku: "9122",
    component_name: "Kerastase Specifique Masque Hydra Apaisant 200ml",
    component_qty: 2,
  },
  {
    bundle_sku: "14265",
    bundle_name: "Kérastase Complete Care For Very Curly Hair Bundle",
    component_sku: "10188",
    component_name: "Kerastase Curl Manifesto Bain Hydratation Douceur 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14265",
    bundle_name: "Kérastase Complete Care For Very Curly Hair Bundle",
    component_sku: "10190",
    component_name:
      "Kerastase Curl Manifesto Masque Beurre Haute Nutrition 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14265",
    bundle_name: "Kérastase Complete Care For Very Curly Hair Bundle",
    component_sku: "10192",
    component_name: "Kerastase Curl Manifesto Huile Sublime Repair 50ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14265",
    bundle_name: "Kérastase Complete Care For Very Curly Hair Bundle",
    component_sku: "10194",
    component_name: "Kerastase Curl Manifesto Fresh Absolu Spray 190ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14266",
    bundle_name: "Kérastase Coily Hair Heroes Bundle",
    component_sku: "10188",
    component_name: "Kerastase Curl Manifesto Bain Hydratation Douceur 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14266",
    bundle_name: "Kérastase Coily Hair Heroes Bundle",
    component_sku: "10190",
    component_name:
      "Kerastase Curl Manifesto Masque Beurre Haute Nutrition 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14266",
    bundle_name: "Kérastase Coily Hair Heroes Bundle",
    component_sku: "10191",
    component_name: "Kerastase Curl Manifesto Crème De Jour Fondamentale 150ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14266",
    bundle_name: "Kérastase Coily Hair Heroes Bundle",
    component_sku: "10192",
    component_name: "Kerastase Curl Manifesto Huile Sublime Repair 50ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14266",
    bundle_name: "Kérastase Coily Hair Heroes Bundle",
    component_sku: "10194",
    component_name: "Kerastase Curl Manifesto Fresh Absolu Spray 190ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14267",
    bundle_name:
      "Kérastase Blond Absolu Ultraviolet Shampoo, Conditioner and Treatment Routine for Brightening Blonde Hair",
    component_sku: "8774",
    component_name: "Kerastase Blond Absolu Bain Ultra-Violet 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14267",
    bundle_name:
      "Kérastase Blond Absolu Ultraviolet Shampoo, Conditioner and Treatment Routine for Brightening Blonde Hair",
    component_sku: "8776",
    component_name: "Kerastase Blond Absolu Fondant Cicaflash 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14267",
    bundle_name:
      "Kérastase Blond Absolu Ultraviolet Shampoo, Conditioner and Treatment Routine for Brightening Blonde Hair",
    component_sku: "8777",
    component_name: "Kerastase Blond Absolu Cicaplasme 150ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14268",
    bundle_name:
      "Kérastase Blond Absolu Neutralise, Condition and Hydrate Trio",
    component_sku: "13236",
    component_name:
      "Kérastase Blond Absolu 2% Pure Hyaluronic Acid Scalp and Hair Serum 50ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14268",
    bundle_name:
      "Kérastase Blond Absolu Neutralise, Condition and Hydrate Trio",
    component_sku: "8774",
    component_name: "Kerastase Blond Absolu Bain Ultra-Violet 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14268",
    bundle_name:
      "Kérastase Blond Absolu Neutralise, Condition and Hydrate Trio",
    component_sku: "8776",
    component_name: "Kerastase Blond Absolu Fondant Cicaflash 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14269",
    bundle_name:
      "Kérastase Symbiose Anti-Dandruff Cleanse and Nourish Duo for Oily Scalps",
    component_sku: "12256",
    component_name:
      "Kérastase Symbiose Purifying Anti-Dandruff Cellular Shampoo 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14269",
    bundle_name:
      "Kérastase Symbiose Anti-Dandruff Cleanse and Nourish Duo for Oily Scalps",
    component_sku: "12259",
    component_name: "Kérastase Symbiose Masque Intense Revitalising Mask 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14270",
    bundle_name:
      "Kérastase Symbiose Anti-Dandruff Cleanse and Nourish Duo for Dry Scalps",
    component_sku: "12257",
    component_name:
      "Kérastase Symbiose Moisturising Anti-Dandruff Cellular Shampoo 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14270",
    bundle_name:
      "Kérastase Symbiose Anti-Dandruff Cleanse and Nourish Duo for Dry Scalps",
    component_sku: "12259",
    component_name: "Kérastase Symbiose Masque Intense Revitalising Mask 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14271",
    bundle_name: "Kérastase Chroma Absolu Nourish, Neutralise and Shine Trio",
    component_sku: "11032",
    component_name: "Kérastase Chroma Absolu Bain Limpid Shampoo 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14271",
    bundle_name: "Kérastase Chroma Absolu Nourish, Neutralise and Shine Trio",
    component_sku: "11035",
    component_name: "Kérastase Chroma Absolu Colour Correcting Mask 150ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14271",
    bundle_name: "Kérastase Chroma Absolu Nourish, Neutralise and Shine Trio",
    component_sku: "11037",
    component_name: "Kérastase Chroma Absolu Soin Acid Chroma Gloss 210ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14272",
    bundle_name: "Kérastase Densifique Masque Densite 200ml Duo",
    component_sku: "9133",
    component_name: "Kerastase Densifique Masque Recovery Stemox 200ml",
    component_qty: 2,
  },
  {
    bundle_sku: "14273",
    bundle_name:
      "Pureology Nanoworks Gold Shampoo, Conditioner and Color Fanatic Leave In Conditioner Bundle For Dry, Dull Hair",
    component_sku: "10354",
    component_name: "Pureology Color Fanatic Leave-In Spray 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14273",
    bundle_name:
      "Pureology Nanoworks Gold Shampoo, Conditioner and Color Fanatic Leave In Conditioner Bundle For Dry, Dull Hair",
    component_sku: "11358",
    component_name: "Pureology Nanoworks Gold Shampoo 266ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14273",
    bundle_name:
      "Pureology Nanoworks Gold Shampoo, Conditioner and Color Fanatic Leave In Conditioner Bundle For Dry, Dull Hair",
    component_sku: "11359",
    component_name: "Pureology Nanoworks Gold Conditioner 266ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14274",
    bundle_name:
      "Pureology Hydrate Sheer Shampoo, Conditioner and Color Fanatic Leave In Conditioner Bundle For Fine, Dry Hair",
    component_sku: "10256",
    component_name: "Pureology Hydrate Sheer Shampoo 266ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14274",
    bundle_name:
      "Pureology Hydrate Sheer Shampoo, Conditioner and Color Fanatic Leave In Conditioner Bundle For Fine, Dry Hair",
    component_sku: "10257",
    component_name: "Pureology Hydrate Sheer Conditioner 266ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14274",
    bundle_name:
      "Pureology Hydrate Sheer Shampoo, Conditioner and Color Fanatic Leave In Conditioner Bundle For Fine, Dry Hair",
    component_sku: "10354",
    component_name: "Pureology Color Fanatic Leave-In Spray 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14275",
    bundle_name:
      "Pureology Hydrate Shampoo, Conditioner and Color Fanatic Leave In Conditioner Moisturising Bundle For Dry Hair",
    component_sku: "10354",
    component_name: "Pureology Color Fanatic Leave-In Spray 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14275",
    bundle_name:
      "Pureology Hydrate Shampoo, Conditioner and Color Fanatic Leave In Conditioner Moisturising Bundle For Dry Hair",
    component_sku: "5048",
    component_name: "Pureology - Pure Hydrate Shampoo 266ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14275",
    bundle_name:
      "Pureology Hydrate Shampoo, Conditioner and Color Fanatic Leave In Conditioner Moisturising Bundle For Dry Hair",
    component_sku: "5053",
    component_name: "Pureology - Pure Hydrate Conditioner 266ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14276",
    bundle_name:
      "Pureology Strength Cure Shampoo, Conditioner and Color Fanatic Leave In Conditioner Bundle For Damaged Hair",
    component_sku: "10354",
    component_name: "Pureology Color Fanatic Leave-In Spray 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14276",
    bundle_name:
      "Pureology Strength Cure Shampoo, Conditioner and Color Fanatic Leave In Conditioner Bundle For Damaged Hair",
    component_sku: "5052",
    component_name: "Pureology - Strength Cure Shampoo 266ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14276",
    bundle_name:
      "Pureology Strength Cure Shampoo, Conditioner and Color Fanatic Leave In Conditioner Bundle For Damaged Hair",
    component_sku: "5057",
    component_name: "Pureology - Strength Cure Conditioner 266ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14277",
    bundle_name:
      "Pureology Pure Volume Shampoo and Conditioner Bundle For Fine, Flat Hair",
    component_sku: "5068",
    component_name: "Pureology - Colour Fanatic 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14277",
    bundle_name:
      "Pureology Pure Volume Shampoo and Conditioner Bundle For Fine, Flat Hair",
    component_sku: "6076",
    component_name: "Pureology - Pure Volume Shampoo 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14277",
    bundle_name:
      "Pureology Pure Volume Shampoo and Conditioner Bundle For Fine, Flat Hair",
    component_sku: "6077",
    component_name: "Pureology - Pure Volume Conditioner 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14278",
    bundle_name:
      "Pureology Smooth Perfection Shampoo and Conditioner Smoothing Bundle For Dry Hair",
    component_sku: "5050",
    component_name: "Pureology - Smooth Perfection Shampoo 266ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14278",
    bundle_name:
      "Pureology Smooth Perfection Shampoo and Conditioner Smoothing Bundle For Dry Hair",
    component_sku: "5055",
    component_name: "Pureology - Smooth Perfection Conditioner 266ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14279",
    bundle_name:
      "Redken Acidic Bonding Concentrate Intensive Pre-Treatment, Shampoo, Conditioner Bond Repair Bundle For Damaged Hair",
    component_sku: "12001",
    component_name:
      "Redken Acidic Bonding Concentrate Intensive Pre-Treatment 150ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14279",
    bundle_name:
      "Redken Acidic Bonding Concentrate Intensive Pre-Treatment, Shampoo, Conditioner Bond Repair Bundle For Damaged Hair",
    component_sku: "9762",
    component_name: "Redken Acidic Bonding Concentrate Shampoo 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14279",
    bundle_name:
      "Redken Acidic Bonding Concentrate Intensive Pre-Treatment, Shampoo, Conditioner Bond Repair Bundle For Damaged Hair",
    component_sku: "9763",
    component_name: "Redken Acidic Bonding Concentrate Conditioner 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14280",
    bundle_name:
      "Redken Acidic Bonding Concentrate Shampoo, Conditioner and 5-Minute Liquid Hair Mask Bond Repair Bundle For Damaged Hair",
    component_sku: "13069",
    component_name:
      "Redken Acidic Bonding Concentrate 5-Minute Liquid Mask 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14280",
    bundle_name:
      "Redken Acidic Bonding Concentrate Shampoo, Conditioner and 5-Minute Liquid Hair Mask Bond Repair Bundle For Damaged Hair",
    component_sku: "9762",
    component_name: "Redken Acidic Bonding Concentrate Shampoo 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14280",
    bundle_name:
      "Redken Acidic Bonding Concentrate Shampoo, Conditioner and 5-Minute Liquid Hair Mask Bond Repair Bundle For Damaged Hair",
    component_sku: "9763",
    component_name: "Redken Acidic Bonding Concentrate Conditioner 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14281",
    bundle_name:
      "Redken All Soft Shampoo, Conditioner and Moisture Restore Leave In Conditioner, Hydrating Bundle, Softness & Shine, for Dry Hair",
    component_sku: "12626",
    component_name: "Redken All Soft Moisture Leave In Treatment 150ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14281",
    bundle_name:
      "Redken All Soft Shampoo, Conditioner and Moisture Restore Leave In Conditioner, Hydrating Bundle, Softness & Shine, for Dry Hair",
    component_sku: "REDK_P042480",
    component_name: "Redken - All Soft Shampoo 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14281",
    bundle_name:
      "Redken All Soft Shampoo, Conditioner and Moisture Restore Leave In Conditioner, Hydrating Bundle, Softness & Shine, for Dry Hair",
    component_sku: "REDK_P042560",
    component_name: "Redken - All Soft Conditioner 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14282",
    bundle_name:
      "Redken All Soft Shampoo, Conditioner and One United Multi-Benefit Leave In Conditioner Spray Hydrating Bundle for Dry Hair",
    component_sku: "5011",
    component_name: "Redken - One United 150ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14282",
    bundle_name:
      "Redken All Soft Shampoo, Conditioner and One United Multi-Benefit Leave In Conditioner Spray Hydrating Bundle for Dry Hair",
    component_sku: "REDK_P042480",
    component_name: "Redken - All Soft Shampoo 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14282",
    bundle_name:
      "Redken All Soft Shampoo, Conditioner and One United Multi-Benefit Leave In Conditioner Spray Hydrating Bundle for Dry Hair",
    component_sku: "REDK_P042560",
    component_name: "Redken - All Soft Conditioner 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14283",
    bundle_name:
      "Redken Extreme Shampoo, Conditioner and Anti-Snap Leave In Conditioner Spray Bundle For Damaged Hair",
    component_sku: "REDK_P027790",
    component_name: "Redken - Extreme Conditioner 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14283",
    bundle_name:
      "Redken Extreme Shampoo, Conditioner and Anti-Snap Leave In Conditioner Spray Bundle For Damaged Hair",
    component_sku: "REDK_P027920",
    component_name: "Redken - Extreme Anti Snap 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14283",
    bundle_name:
      "Redken Extreme Shampoo, Conditioner and Anti-Snap Leave In Conditioner Spray Bundle For Damaged Hair",
    component_sku: "REDK_P027970",
    component_name: "Redken - Extreme Shampoo 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14284",
    bundle_name:
      "Redken Extreme Shampoo, Conditioner and One United Multi-Benefit Leave In Conditioner Spray Bundle For Damaged Hair",
    component_sku: "5011",
    component_name: "Redken - One United 150ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14284",
    bundle_name:
      "Redken Extreme Shampoo, Conditioner and One United Multi-Benefit Leave In Conditioner Spray Bundle For Damaged Hair",
    component_sku: "REDK_P027790",
    component_name: "Redken - Extreme Conditioner 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14284",
    bundle_name:
      "Redken Extreme Shampoo, Conditioner and One United Multi-Benefit Leave In Conditioner Spray Bundle For Damaged Hair",
    component_sku: "REDK_P027970",
    component_name: "Redken - Extreme Shampoo 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14285",
    bundle_name:
      "Redken Volume Injection Shampoo and Conditioner Bundle For Fine Flat Hair",
    component_sku: "10184",
    component_name: "Redken Volume Injection Shampoo 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14285",
    bundle_name:
      "Redken Volume Injection Shampoo and Conditioner Bundle For Fine Flat Hair",
    component_sku: "13337",
    component_name: "Redken Volume Injection Conditioner 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14286",
    bundle_name:
      "Kérastase Genesis Anti-Fall Haircare Bundle For Dry, Weak Hair",
    component_sku: "8780",
    component_name: "Kerastase Genesis Bain Nutri-Fortifiant 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14286",
    bundle_name:
      "Kérastase Genesis Anti-Fall Haircare Bundle For Dry, Weak Hair",
    component_sku: "8781",
    component_name: "Kerastase Genesis Fondant Renforçateur 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14286",
    bundle_name:
      "Kérastase Genesis Anti-Fall Haircare Bundle For Dry, Weak Hair",
    component_sku: "8783",
    component_name: "Kerastase Genesis Défense Thermique 150ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14286",
    bundle_name:
      "Kérastase Genesis Anti-Fall Haircare Bundle For Dry, Weak Hair",
    component_sku: "8785",
    component_name: "Kerastase Genesis Serum Anti-Chute Fortifiant 90ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14287",
    bundle_name:
      "Kérastase Genesis Nourishing & Fortifying Regime Bundle For Dry, Weakened Hair",
    component_sku: "8780",
    component_name: "Kerastase Genesis Bain Nutri-Fortifiant 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14287",
    bundle_name:
      "Kérastase Genesis Nourishing & Fortifying Regime Bundle For Dry, Weakened Hair",
    component_sku: "8782",
    component_name: "Kerastase Genesis Masque Reconstituant 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14287",
    bundle_name:
      "Kérastase Genesis Nourishing & Fortifying Regime Bundle For Dry, Weakened Hair",
    component_sku: "8783",
    component_name: "Kerastase Genesis Défense Thermique 150ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14287",
    bundle_name:
      "Kérastase Genesis Nourishing & Fortifying Regime Bundle For Dry, Weakened Hair",
    component_sku: "8785",
    component_name: "Kerastase Genesis Serum Anti-Chute Fortifiant 90ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14288",
    bundle_name: "Kérastase Blond Absolu Routine for Honey Blonde Hair",
    component_sku: "13236",
    component_name:
      "Kérastase Blond Absolu 2% Pure Hyaluronic Acid Scalp and Hair Serum 50ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14288",
    bundle_name: "Kérastase Blond Absolu Routine for Honey Blonde Hair",
    component_sku: "8775",
    component_name: "Kerastase Blond Absolu Bain Lumiére 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14288",
    bundle_name: "Kérastase Blond Absolu Routine for Honey Blonde Hair",
    component_sku: "8776",
    component_name: "Kerastase Blond Absolu Fondant Cicaflash 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14288",
    bundle_name: "Kérastase Blond Absolu Routine for Honey Blonde Hair",
    component_sku: "8777",
    component_name: "Kerastase Blond Absolu Cicaplasme 150ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14288",
    bundle_name: "Kérastase Blond Absolu Routine for Honey Blonde Hair",
    component_sku: "9226",
    component_name: "Kerastase Blond Absolu Cicanuit Overnight Hair Serum 90Ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14289",
    bundle_name: "Kérastase Blond Absolu Routine for Cool-Toned Blonde Hair",
    component_sku: "13236",
    component_name:
      "Kérastase Blond Absolu 2% Pure Hyaluronic Acid Scalp and Hair Serum 50ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14289",
    bundle_name: "Kérastase Blond Absolu Routine for Cool-Toned Blonde Hair",
    component_sku: "8774",
    component_name: "Kerastase Blond Absolu Bain Ultra-Violet 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14289",
    bundle_name: "Kérastase Blond Absolu Routine for Cool-Toned Blonde Hair",
    component_sku: "8775",
    component_name: "Kerastase Blond Absolu Bain Lumiére 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14289",
    bundle_name: "Kérastase Blond Absolu Routine for Cool-Toned Blonde Hair",
    component_sku: "8777",
    component_name: "Kerastase Blond Absolu Cicaplasme 150ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14289",
    bundle_name: "Kérastase Blond Absolu Routine for Cool-Toned Blonde Hair",
    component_sku: "9224",
    component_name: "Kerastase Masque Cicaextreme 200Ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14289",
    bundle_name: "Kérastase Blond Absolu Routine for Cool-Toned Blonde Hair",
    component_sku: "9225",
    component_name: "Kerastase Huile Cicaextreme 100Ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14290",
    bundle_name: "Kérastase Blond Absolu Routine for Blonde Hair & Scalp",
    component_sku: "13236",
    component_name:
      "Kérastase Blond Absolu 2% Pure Hyaluronic Acid Scalp and Hair Serum 50ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14290",
    bundle_name: "Kérastase Blond Absolu Routine for Blonde Hair & Scalp",
    component_sku: "8775",
    component_name: "Kerastase Blond Absolu Bain Lumiére 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14290",
    bundle_name: "Kérastase Blond Absolu Routine for Blonde Hair & Scalp",
    component_sku: "8776",
    component_name: "Kerastase Blond Absolu Fondant Cicaflash 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14290",
    bundle_name: "Kérastase Blond Absolu Routine for Blonde Hair & Scalp",
    component_sku: "9225",
    component_name: "Kerastase Huile Cicaextreme 100Ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14291",
    bundle_name:
      "Kérastase Blond Absolu Routine for Damaged Highlighted/Blonde Hair",
    component_sku: "13236",
    component_name:
      "Kérastase Blond Absolu 2% Pure Hyaluronic Acid Scalp and Hair Serum 50ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14291",
    bundle_name:
      "Kérastase Blond Absolu Routine for Damaged Highlighted/Blonde Hair",
    component_sku: "8775",
    component_name: "Kerastase Blond Absolu Bain Lumiére 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14291",
    bundle_name:
      "Kérastase Blond Absolu Routine for Damaged Highlighted/Blonde Hair",
    component_sku: "8776",
    component_name: "Kerastase Blond Absolu Fondant Cicaflash 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14291",
    bundle_name:
      "Kérastase Blond Absolu Routine for Damaged Highlighted/Blonde Hair",
    component_sku: "8777",
    component_name: "Kerastase Blond Absolu Cicaplasme 150ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14291",
    bundle_name:
      "Kérastase Blond Absolu Routine for Damaged Highlighted/Blonde Hair",
    component_sku: "9224",
    component_name: "Kerastase Masque Cicaextreme 200Ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14291",
    bundle_name:
      "Kérastase Blond Absolu Routine for Damaged Highlighted/Blonde Hair",
    component_sku: "9225",
    component_name: "Kerastase Huile Cicaextreme 100Ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14291",
    bundle_name:
      "Kérastase Blond Absolu Routine for Damaged Highlighted/Blonde Hair",
    component_sku: "9226",
    component_name: "Kerastase Blond Absolu Cicanuit Overnight Hair Serum 90Ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14292",
    bundle_name: "Kérastase The Ultimate Heroes Bundle",
    component_sku: "13321",
    component_name: "Kérastase Fresh Affair Dry Shampoo 150g",
    component_qty: 1,
  },
  {
    bundle_sku: "14292",
    bundle_name: "Kérastase The Ultimate Heroes Bundle",
    component_sku: "KER_4402020",
    component_name: "Kerastase  Resistance Ciment Thermique 150ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14292",
    bundle_name: "Kérastase The Ultimate Heroes Bundle",
    component_sku: "KER_E022410",
    component_name: "Kerastase  Elixir Ultime 100ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14293",
    bundle_name: "Kérastase Resistance Damaged Hair Duo",
    component_sku: "KER_E029600",
    component_name: "Kerastase Masque Force Architecte 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14293",
    bundle_name: "Kérastase Resistance Damaged Hair Duo",
    component_sku: "KER_E057430",
    component_name: "Kerastase Bain De Force Architecte 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14294",
    bundle_name:
      "Kérastase Résistance Extensioniste Routine Haircare Bundle for Damaged Hair",
    component_sku: "6729",
    component_name: "Kerastase Resistance Bain Extentioniste Shampoo 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14294",
    bundle_name:
      "Kérastase Résistance Extensioniste Routine Haircare Bundle for Damaged Hair",
    component_sku: "6730",
    component_name:
      "Kerastase Resistance Fondant Extentioniste Conditioner 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14294",
    bundle_name:
      "Kérastase Résistance Extensioniste Routine Haircare Bundle for Damaged Hair",
    component_sku: "6731",
    component_name: "Kerastase Resistance Masque Extentioniste 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14294",
    bundle_name:
      "Kérastase Résistance Extensioniste Routine Haircare Bundle for Damaged Hair",
    component_sku: "6732",
    component_name: "Kerastase Resistance Serum Extentioniste 50ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14294",
    bundle_name:
      "Kérastase Résistance Extensioniste Routine Haircare Bundle for Damaged Hair",
    component_sku: "9653",
    component_name: "Kerastase Resistance Thermique Extentioniste 150ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14301",
    bundle_name:
      "Olaplex No.4P Blonde Enhancer Toning Shampoo & Olaplex No.5P Blond Enhancing Toner Conditioner 1 Litre Duo",
    component_sku: "14299",
    component_name: "Olaplex No.4P Blonde Enhancer Toning Shampoo 1 Litre",
    component_qty: 1,
  },
  {
    bundle_sku: "14301",
    bundle_name:
      "Olaplex No.4P Blonde Enhancer Toning Shampoo & Olaplex No.5P Blond Enhancing Toner Conditioner 1 Litre Duo",
    component_sku: "14300",
    component_name: "Olaplex No 5P Blond Enhancing Toner Conditioner 1 Litre",
    component_qty: 1,
  },
  {
    bundle_sku: "14414",
    bundle_name: "Ruth Bergin's Healthy Hair Favourites Bundle",
    component_sku: "14053",
    component_name:
      "Alfaparf Semi Di Lino Density Thickening Leave in Cream 125ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14414",
    bundle_name: "Ruth Bergin's Healthy Hair Favourites Bundle",
    component_sku: "5051",
    component_name: "Pureology Strength Cure Best Blonde Shampoo 266ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14414",
    bundle_name: "Ruth Bergin's Healthy Hair Favourites Bundle",
    component_sku: "6465",
    component_name:
      "Alfaparf Semi Di Lino Reconstruction Reparative Low Shampoo 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14414",
    bundle_name: "Ruth Bergin's Healthy Hair Favourites Bundle",
    component_sku: "6470",
    component_name: "Alfaparf Semi Di Lino Moisture Nutritive Mask 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14414",
    bundle_name: "Ruth Bergin's Healthy Hair Favourites Bundle",
    component_sku: "7657",
    component_name: "Color Wow Dream Filter 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14414",
    bundle_name: "Ruth Bergin's Healthy Hair Favourites Bundle",
    component_sku: "7686",
    component_name:
      "Alfaparf Semi Di Lino Scalp Rebalance Gentle Exfoliating Scrub 150ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14429",
    bundle_name: "The Winter Beauty Box",
    component_sku: "12273",
    component_name:
      "Kerastase Resistance Bain Force Architecte Deluxe 30ml​ GWP",
    component_qty: 1,
  },
  {
    bundle_sku: "14429",
    bundle_name: "The Winter Beauty Box",
    component_sku: "12761",
    component_name: "Dermalogica Phyto Nature Oxygen Liquid Cream, 5ml GWP",
    component_qty: 1,
  },
  {
    bundle_sku: "14429",
    bundle_name: "The Winter Beauty Box",
    component_sku: "13968",
    component_name: "Avène Cleanance Cleansing Gel 25ml GWP",
    component_qty: 1,
  },
  {
    bundle_sku: "14429",
    bundle_name: "The Winter Beauty Box",
    component_sku: "13970",
    component_name: "Klorane Mango Conditioner 50ml GWP",
    component_qty: 1,
  },
  {
    bundle_sku: "14429",
    bundle_name: "The Winter Beauty Box",
    component_sku: "20510",
    component_name: "Beauty Box Regular Sleeve",
    component_qty: 1,
  },
  {
    bundle_sku: "14429",
    bundle_name: "The Winter Beauty Box",
    component_sku: "8702",
    component_name: "Mio Clay Away Body Cleanser 30ml GWP",
    component_qty: 1,
  },
  {
    bundle_sku: "14459",
    bundle_name: "The Energize & Stimulate Hair Growth Box",
    component_sku: "13084",
    component_name: "The Belle Brush - Scalp Brush",
    component_qty: 1,
  },
  {
    bundle_sku: "14459",
    bundle_name: "The Energize & Stimulate Hair Growth Box",
    component_sku: "20295",
    component_name: "Large Black Box",
    component_qty: 1,
  },
  {
    bundle_sku: "14459",
    bundle_name: "The Energize & Stimulate Hair Growth Box",
    component_sku: "20511",
    component_name: "Beauty Box Large Sleeve",
    component_qty: 1,
  },
  {
    bundle_sku: "14459",
    bundle_name: "The Energize & Stimulate Hair Growth Box",
    component_sku: "6282",
    component_name: "Actyva P Factor Scalp Hair Loss Treatment 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14459",
    bundle_name: "The Energize & Stimulate Hair Growth Box",
    component_sku: "7537",
    component_name: "The Ordinary Multi-Peptide Serum for Hair Density - 60ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14459",
    bundle_name: "The Energize & Stimulate Hair Growth Box",
    component_sku: "7682",
    component_name: "Alfaparf Semi Di Lino Scalp RENEW Energize Shampoo 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14459",
    bundle_name: "The Energize & Stimulate Hair Growth Box",
    component_sku: "7685",
    component_name: "Alfaparf Semi Di Lino Scalp RENEW Energise Tonic 125ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14459",
    bundle_name: "The Energize & Stimulate Hair Growth Box",
    component_sku: "7689",
    component_name: "Alfaparf Semi Di Lino Scalp RENEW Energize Lotion 12X10ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14460",
    bundle_name: "The Anti-Hair Loss Box",
    component_sku: "100101",
    component_name: "Nioxin -  System Kit 2 (Noticeably Thinning, Fine)",
    component_qty: 1,
  },
  {
    bundle_sku: "14460",
    bundle_name: "The Anti-Hair Loss Box",
    component_sku: "13084",
    component_name: "The Belle Brush - Scalp Brush",
    component_qty: 1,
  },
  {
    bundle_sku: "14460",
    bundle_name: "The Anti-Hair Loss Box",
    component_sku: "20295",
    component_name: "Large Black Box",
    component_qty: 1,
  },
  {
    bundle_sku: "14460",
    bundle_name: "The Anti-Hair Loss Box",
    component_sku: "20510",
    component_name: "Beauty Box Regular Sleeve",
    component_qty: 1,
  },
  {
    bundle_sku: "14460",
    bundle_name: "The Anti-Hair Loss Box",
    component_sku: "5001",
    component_name: "Nioxin - Night Density Rescue 70ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14460",
    bundle_name: "The Anti-Hair Loss Box",
    component_sku: "9963",
    component_name: "Nioxin Anti-Hairloss Serum 70ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14493",
    bundle_name:
      "Kérastase Première Decalcifying Pre-Shampoo with Travel Size Shampoo for Damaged Hair",
    component_sku: "14035",
    component_name:
      "Kérastase Première Decalcifying Repairing Pre-Shampoo Treatment 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14494",
    bundle_name:
      "Kérastase Première Decalcifying Repairing Pre-Shampoo & Shampoo Duo for Damaged Hair",
    component_sku: "14035",
    component_name:
      "Kérastase Première Decalcifying Repairing Pre-Shampoo Treatment 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14494",
    bundle_name:
      "Kérastase Première Decalcifying Repairing Pre-Shampoo & Shampoo Duo for Damaged Hair",
    component_sku: "14036",
    component_name:
      "Kérastase Première Decalcifying System Reparative Shampoo 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14495",
    bundle_name:
      "Kérastase Première Decalcifying Repairing Shampoo & Conditioner Duo for Damaged Hair",
    component_sku: "14036",
    component_name:
      "Kérastase Première Decalcifying System Reparative Shampoo 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14495",
    bundle_name:
      "Kérastase Première Decalcifying Repairing Shampoo & Conditioner Duo for Damaged Hair",
    component_sku: "14037",
    component_name:
      "Kérastase Première Anti-Rigidity Decalcifying Repairing Conditioner 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14496",
    bundle_name: "The Mum To Be Beauty Box",
    component_sku: "10935B",
    component_name: "NUXE Prodigieux Floral Candle GWP",
    component_qty: 1,
  },
  {
    bundle_sku: "14496",
    bundle_name: "The Mum To Be Beauty Box",
    component_sku: "11140",
    component_name: "Mama Mio Oh Natural Pregnancy Deodorant 70ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14496",
    bundle_name: "The Mum To Be Beauty Box",
    component_sku: "14022",
    component_name: "Avène Tolerance Hydra-10 Hydrating Fluid GWP 5ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14496",
    bundle_name: "The Mum To Be Beauty Box",
    component_sku: "20510",
    component_name: "Beauty Box Regular Sleeve",
    component_qty: 1,
  },
  {
    bundle_sku: "14496",
    bundle_name: "The Mum To Be Beauty Box",
    component_sku: "4705",
    component_name: "Mama Mio - The Tummy Rub Oil 120ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14496",
    bundle_name: "The Mum To Be Beauty Box",
    component_sku: "8702",
    component_name: "Mio Clay Away Body Cleanser 30ml GWP",
    component_qty: 1,
  },
  {
    bundle_sku: "14496",
    bundle_name: "The Mum To Be Beauty Box",
    component_sku: "9014",
    component_name: "Mama Mio Tummy Scrub 2 x 5ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14521",
    bundle_name: "Kérastase Première -The Full Routine Bundle",
    component_sku: "14035",
    component_name:
      "Kérastase Première Decalcifying Repairing Pre-Shampoo Treatment 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14521",
    bundle_name: "Kérastase Première -The Full Routine Bundle",
    component_sku: "14036",
    component_name:
      "Kérastase Première Decalcifying System Reparative Shampoo 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14521",
    bundle_name: "Kérastase Première -The Full Routine Bundle",
    component_sku: "14037",
    component_name:
      "Kérastase Première Anti-Rigidity Decalcifying Repairing Conditioner 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14521",
    bundle_name: "Kérastase Première -The Full Routine Bundle",
    component_sku: "14038",
    component_name:
      "Kérastase Première Anti-Breakage Reparative Filler Mask 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14521",
    bundle_name: "Kérastase Première -The Full Routine Bundle",
    component_sku: "14039",
    component_name:
      "Kérastase Première Anti-Frizz Reparative Filler Serum 90ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14521",
    bundle_name: "Kérastase Première -The Full Routine Bundle",
    component_sku: "14040",
    component_name: "Kérastase Première Intensive Shine Repairing Oil 30ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14522",
    bundle_name: "Redken Acidic Color Gloss Shampoo & Conditioner Duo",
    component_sku: "14141",
    component_name: "Redken Acidic Color Gloss Sulfate-Free Shampoo 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14522",
    bundle_name: "Redken Acidic Color Gloss Shampoo & Conditioner Duo",
    component_sku: "14142",
    component_name: "Redken Acidic Color Gloss Conditioner 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14523",
    bundle_name: "Redken Acidic Color Gloss - The Full Routine Bundle",
    component_sku: "14141",
    component_name: "Redken Acidic Color Gloss Sulfate-Free Shampoo 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14523",
    bundle_name: "Redken Acidic Color Gloss - The Full Routine Bundle",
    component_sku: "14142",
    component_name: "Redken Acidic Color Gloss Conditioner 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14523",
    bundle_name: "Redken Acidic Color Gloss - The Full Routine Bundle",
    component_sku: "14143",
    component_name: "Redken Acidic Color Gloss Heat Protection Treatment 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14523",
    bundle_name: "Redken Acidic Color Gloss - The Full Routine Bundle",
    component_sku: "14144",
    component_name:
      "Redken Acidic Color Gloss Activated Glass Gloss Treatment 237ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14590",
    bundle_name: "Redken Acidic Color Gloss Condition & Treat Duo",
    component_sku: "14142",
    component_name: "Redken Acidic Color Gloss Conditioner 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14590",
    bundle_name: "Redken Acidic Color Gloss Condition & Treat Duo",
    component_sku: "14144",
    component_name:
      "Redken Acidic Color Gloss Activated Glass Gloss Treatment 237ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14591",
    bundle_name:
      "Redken Acidic Color Gloss Shampoo, Conditioner & Leave In Heat Protectant Treatment Bundle",
    component_sku: "14141",
    component_name: "Redken Acidic Color Gloss Sulfate-Free Shampoo 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14591",
    bundle_name:
      "Redken Acidic Color Gloss Shampoo, Conditioner & Leave In Heat Protectant Treatment Bundle",
    component_sku: "14142",
    component_name: "Redken Acidic Color Gloss Conditioner 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14591",
    bundle_name:
      "Redken Acidic Color Gloss Shampoo, Conditioner & Leave In Heat Protectant Treatment Bundle",
    component_sku: "14143",
    component_name: "Redken Acidic Color Gloss Heat Protection Treatment 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14592",
    bundle_name:
      "Redken Acidic Color Gloss Shampoo, Conditioner & Glass Gloss Treatment Bundle",
    component_sku: "14141",
    component_name: "Redken Acidic Color Gloss Sulfate-Free Shampoo 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14592",
    bundle_name:
      "Redken Acidic Color Gloss Shampoo, Conditioner & Glass Gloss Treatment Bundle",
    component_sku: "14142",
    component_name: "Redken Acidic Color Gloss Conditioner 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14592",
    bundle_name:
      "Redken Acidic Color Gloss Shampoo, Conditioner & Glass Gloss Treatment Bundle",
    component_sku: "14144",
    component_name:
      "Redken Acidic Color Gloss Activated Glass Gloss Treatment 237ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14743",
    bundle_name: "Dermalogica - The Calming & Nourishing Bundle",
    component_sku: "10121",
    component_name: "Dermalogica Smart Response Serum 30ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14743",
    bundle_name: "Dermalogica - The Calming & Nourishing Bundle",
    component_sku: "11311",
    component_name: "Dermalogica Daily Milkfoliant 74g",
    component_qty: 1,
  },
  {
    bundle_sku: "14743",
    bundle_name: "Dermalogica - The Calming & Nourishing Bundle",
    component_sku: "12745",
    component_name: "Dermalogica Micellar Prebiotic Precleanse 150 ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14743",
    bundle_name: "Dermalogica - The Calming & Nourishing Bundle",
    component_sku: "7453",
    component_name: "Dermalogica Prisma Protect SPF30 50ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14744",
    bundle_name: "Dermalogica -  The Clearing & Brightening Bundle",
    component_sku: "110700",
    component_name: "Dermalogica Daily Microfoliant 74g",
    component_qty: 1,
  },
  {
    bundle_sku: "14744",
    bundle_name: "Dermalogica -  The Clearing & Brightening Bundle",
    component_sku: "8282",
    component_name: "Dermalogica Retinol Clearing Oil 30ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14745",
    bundle_name: "Dermalogica - The Dark Spot Bundle",
    component_sku: "11259",
    component_name: "Dermalogica Powerbright Overnight Cream 50ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14745",
    bundle_name: "Dermalogica - The Dark Spot Bundle",
    component_sku: "11260",
    component_name: "Dermalogica Powerbright moisturizer spf 50 50ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14745",
    bundle_name: "Dermalogica - The Dark Spot Bundle",
    component_sku: "14519",
    component_name: "Dermalogica Powerbright Dark Spot Peel",
    component_qty: 1,
  },
  {
    bundle_sku: "14745",
    bundle_name: "Dermalogica - The Dark Spot Bundle",
    component_sku: "9454",
    component_name: "Dermalogica PowerBright Dark Spot Serum 30ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14758",
    bundle_name: "Alfaparf Bundle For Dull & Thin Hair",
    component_sku: "14051",
    component_name:
      "Alfaparf Semi Di Lino Density Thickening Conditioner 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14758",
    bundle_name: "Alfaparf Bundle For Dull & Thin Hair",
    component_sku: "14053",
    component_name:
      "Alfaparf Semi Di Lino Density Thickening Leave in Cream 125ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14758",
    bundle_name: "Alfaparf Bundle For Dull & Thin Hair",
    component_sku: "14686",
    component_name: "Alfaparf Sublime Cristalli Di Seta 45ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14758",
    bundle_name: "Alfaparf Bundle For Dull & Thin Hair",
    component_sku: "6474",
    component_name: "Alfaparf Semi Di Lino Diamond Illuminating Shampoo 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14759",
    bundle_name: "Alfaparf Bundle For Hair Loss/PostPartum Hair Loss",
    component_sku: "14051",
    component_name:
      "Alfaparf Semi Di Lino Density Thickening Conditioner 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14759",
    bundle_name: "Alfaparf Bundle For Hair Loss/PostPartum Hair Loss",
    component_sku: "14053",
    component_name:
      "Alfaparf Semi Di Lino Density Thickening Leave in Cream 125ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14759",
    bundle_name: "Alfaparf Bundle For Hair Loss/PostPartum Hair Loss",
    component_sku: "7682",
    component_name: "Alfaparf Semi Di Lino Scalp RENEW Energize Shampoo 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14759",
    bundle_name: "Alfaparf Bundle For Hair Loss/PostPartum Hair Loss",
    component_sku: "7689",
    component_name: "Alfaparf Semi Di Lino Scalp RENEW Energize Lotion 12X10ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14760",
    bundle_name: "Alfaparf Bundle For Fine Hair With Dry Ends",
    component_sku: "14051",
    component_name:
      "Alfaparf Semi Di Lino Density Thickening Conditioner 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14760",
    bundle_name: "Alfaparf Bundle For Fine Hair With Dry Ends",
    component_sku: "6469",
    component_name: "Alfaparf Semi Di Lino Moisture Nutritive Shampoo 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14760",
    bundle_name: "Alfaparf Bundle For Fine Hair With Dry Ends",
    component_sku: "6470",
    component_name: "Alfaparf Semi Di Lino Moisture Nutritive Mask 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14760",
    bundle_name: "Alfaparf Bundle For Fine Hair With Dry Ends",
    component_sku: "6482",
    component_name: "Alfaparf Semi Di Lino Diamond Crystalli Liquidi 50ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14761",
    bundle_name: "Alfaparf Bundle For Hair That Lacks Shine & Gloss",
    component_sku: "6474",
    component_name: "Alfaparf Semi Di Lino Diamond Illuminating Shampoo 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14761",
    bundle_name: "Alfaparf Bundle For Hair That Lacks Shine & Gloss",
    component_sku: "6475",
    component_name:
      "Alfaparf Semi Di Lino Diamond Illuminating Conditioner 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14761",
    bundle_name: "Alfaparf Bundle For Hair That Lacks Shine & Gloss",
    component_sku: "6478",
    component_name:
      "Alfaparf Semi Di Lino Sublime Illuminating Shine Lotion 12 * 13ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14762",
    bundle_name: "Alfaparf Bundle For Hair That Lacks Volume",
    component_sku: "14053",
    component_name:
      "Alfaparf Semi Di Lino Density Thickening Leave in Cream 125ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14762",
    bundle_name: "Alfaparf Bundle For Hair That Lacks Volume",
    component_sku: "7999",
    component_name: "Alfaparf Semi Di Lino Volumizing Shampoo 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14762",
    bundle_name: "Alfaparf Bundle For Hair That Lacks Volume",
    component_sku: "8000",
    component_name: "Alfaparf Semi Di Lino Volumizing Spray 125ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14762",
    bundle_name: "Alfaparf Bundle For Hair That Lacks Volume",
    component_sku: "8001",
    component_name: "Alfaparf Semi Di Lino Volumizing Mousse Conditioner 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14763",
    bundle_name: "Alfaparf Bundle For Curly Hair With a Sensitive Scalp",
    component_sku: "7687",
    component_name: "Alfaparf Semi Di Lino Scalp RELIEF Calming Shampoo 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14763",
    bundle_name: "Alfaparf Bundle For Curly Hair With a Sensitive Scalp",
    component_sku: "7688",
    component_name: "Alfaparf Semi Di Lino Scalp RELIEF Calming Tonic 125ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14763",
    bundle_name: "Alfaparf Bundle For Curly Hair With a Sensitive Scalp",
    component_sku: "8714",
    component_name: "Alfaparf Semi Di Lino Curls Enhancing Conditioner 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14763",
    bundle_name: "Alfaparf Bundle For Curly Hair With a Sensitive Scalp",
    component_sku: "8717",
    component_name: "Alfaparf Semi Di Lino Curls Defining Cream 125ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14764",
    bundle_name: "Alfaparf Bundle For Hair That's Rebellious, Dry & Frizzy",
    component_sku: "6470",
    component_name: "Alfaparf Semi Di Lino Moisture Nutritive Mask 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14764",
    bundle_name: "Alfaparf Bundle For Hair That's Rebellious, Dry & Frizzy",
    component_sku: "9895",
    component_name: "Alfaparf Semi Di Lino Smooth Cream 125ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14764",
    bundle_name: "Alfaparf Bundle For Hair That's Rebellious, Dry & Frizzy",
    component_sku: "9898",
    component_name: "Alfaparf Semi Di Lino Smooth Oil 100ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14764",
    bundle_name: "Alfaparf Bundle For Hair That's Rebellious, Dry & Frizzy",
    component_sku: "9899",
    component_name: "Alfaparf Semi Di Lino Smooth Shampoo 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14779",
    bundle_name: "The Sunkissed Beauty Box",
    component_sku: "10733",
    component_name: "BeautiEdit Soft Velvet Tanning Mitt",
    component_qty: 1,
  },
  {
    bundle_sku: "14779",
    bundle_name: "The Sunkissed Beauty Box",
    component_sku: "12266",
    component_name: "Kerastase Genesis Bain Deluxe 30ml​ GWP",
    component_qty: 1,
  },
  {
    bundle_sku: "14779",
    bundle_name: "The Sunkissed Beauty Box",
    component_sku: "12268",
    component_name: "Kerastase Genesis Masque Deluxe 30ml​ GWP",
    component_qty: 1,
  },
  {
    bundle_sku: "14779",
    bundle_name: "The Sunkissed Beauty Box",
    component_sku: "12816",
    component_name: "Dripping Gold Dark Mousse",
    component_qty: 1,
  },
  {
    bundle_sku: "14779",
    bundle_name: "The Sunkissed Beauty Box",
    component_sku: "13565",
    component_name: "Dripping Gold Cherry Lip Oil",
    component_qty: 1,
  },
  {
    bundle_sku: "14779",
    bundle_name: "The Sunkissed Beauty Box",
    component_sku: "14032",
    component_name: "Premium Makeup Blending Sponge By BeautyFeatures 1PK",
    component_qty: 1,
  },
  {
    bundle_sku: "14779",
    bundle_name: "The Sunkissed Beauty Box",
    component_sku: "20510",
    component_name: "Beauty Box Regular Sleeve",
    component_qty: 1,
  },
  {
    bundle_sku: "14779",
    bundle_name: "The Sunkissed Beauty Box",
    component_sku: "8702",
    component_name: "Mio Clay Away Body Cleanser 30ml GWP",
    component_qty: 1,
  },
  {
    bundle_sku: "14779",
    bundle_name: "The Sunkissed Beauty Box",
    component_sku: "9102",
    component_name: "Dripping Gold Wonder Water Med/Dark Coconut 100ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14780",
    bundle_name: "The Luxe Beauty Box",
    component_sku: "10935A",
    component_name: "NUXE Prodigieux Néroli Candle GWP",
    component_qty: 1,
  },
  {
    bundle_sku: "14780",
    bundle_name: "The Luxe Beauty Box",
    component_sku: "12267",
    component_name: "Kerastase Elixir Ultime L'Huile Original Deluxe 15ml​ GWP",
    component_qty: 1,
  },
  {
    bundle_sku: "14780",
    bundle_name: "The Luxe Beauty Box",
    component_sku: "12269",
    component_name:
      "Kerastase Nutritive 8H Magic Night Repair Deluxe 30ml​ GWP",
    component_qty: 1,
  },
  {
    bundle_sku: "14780",
    bundle_name: "The Luxe Beauty Box",
    component_sku: "12279",
    component_name: "Kerastase Chroma Absolu Bain Riche Deluxe 30ml​ GWP",
    component_qty: 1,
  },
  {
    bundle_sku: "14780",
    bundle_name: "The Luxe Beauty Box",
    component_sku: "13059",
    component_name: "Bare By Vogue Water Bottle GWP",
    component_qty: 1,
  },
  {
    bundle_sku: "14780",
    bundle_name: "The Luxe Beauty Box",
    component_sku: "13061",
    component_name: "Secrets By Sinead Ultimate Beauty Palette",
    component_qty: 1,
  },
  {
    bundle_sku: "14780",
    bundle_name: "The Luxe Beauty Box",
    component_sku: "14032",
    component_name: "Premium Makeup Blending Sponge By BeautyFeatures 1PK",
    component_qty: 1,
  },
  {
    bundle_sku: "14780",
    bundle_name: "The Luxe Beauty Box",
    component_sku: "14362",
    component_name: "Revolution 5D Lash Mascara",
    component_qty: 1,
  },
  {
    bundle_sku: "14780",
    bundle_name: "The Luxe Beauty Box",
    component_sku: "20510",
    component_name: "Beauty Box Regular Sleeve",
    component_qty: 1,
  },
  {
    bundle_sku: "14781",
    bundle_name: "The Blissful Beauty Box",
    component_sku: "12272",
    component_name:
      "Kerastase Resistance Masque Force Architecte Deluxe 30ml​ GWP",
    component_qty: 1,
  },
  {
    bundle_sku: "14781",
    bundle_name: "The Blissful Beauty Box",
    component_sku: "12273",
    component_name:
      "Kerastase Resistance Bain Force Architecte Deluxe 30ml​ GWP",
    component_qty: 1,
  },
  {
    bundle_sku: "14781",
    bundle_name: "The Blissful Beauty Box",
    component_sku: "12761",
    component_name: "Dermalogica Phyto Nature Oxygen Liquid Cream, 5ml GWP",
    component_qty: 1,
  },
  {
    bundle_sku: "14781",
    bundle_name: "The Blissful Beauty Box",
    component_sku: "14022",
    component_name: "Avène Tolerance Hydra-10 Hydrating Fluid GWP 5ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14781",
    bundle_name: "The Blissful Beauty Box",
    component_sku: "14032",
    component_name: "Premium Makeup Blending Sponge By BeautyFeatures 1PK",
    component_qty: 1,
  },
  {
    bundle_sku: "14781",
    bundle_name: "The Blissful Beauty Box",
    component_sku: "14355",
    component_name: "Oh K! Collagen Under Eye Mask",
    component_qty: 1,
  },
  {
    bundle_sku: "14781",
    bundle_name: "The Blissful Beauty Box",
    component_sku: "20510",
    component_name: "Beauty Box Regular Sleeve",
    component_qty: 1,
  },
  {
    bundle_sku: "14781",
    bundle_name: "The Blissful Beauty Box",
    component_sku: "5365",
    component_name: "The Wet Brush Pro Original Detangling Brush - Black",
    component_qty: 1,
  },
  {
    bundle_sku: "14782",
    bundle_name: "The Relax & Revive Beauty Box",
    component_sku: "10935A",
    component_name: "NUXE Prodigieux Néroli Candle GWP",
    component_qty: 1,
  },
  {
    bundle_sku: "14782",
    bundle_name: "The Relax & Revive Beauty Box",
    component_sku: "12278",
    component_name: "Kerastase Chroma Absolu Masque Deluxe 30ml​ GWP",
    component_qty: 1,
  },
  {
    bundle_sku: "14782",
    bundle_name: "The Relax & Revive Beauty Box",
    component_sku: "13867",
    component_name: "Distinct Beauty Cleansing Mitt",
    component_qty: 1,
  },
  {
    bundle_sku: "14782",
    bundle_name: "The Relax & Revive Beauty Box",
    component_sku: "14032",
    component_name: "Premium Makeup Blending Sponge By BeautyFeatures 1PK",
    component_qty: 1,
  },
  {
    bundle_sku: "14782",
    bundle_name: "The Relax & Revive Beauty Box",
    component_sku: "14348",
    component_name: "Oh K! Vitamin C Watermelon Sheet Mask",
    component_qty: 1,
  },
  {
    bundle_sku: "14782",
    bundle_name: "The Relax & Revive Beauty Box",
    component_sku: "14612",
    component_name:
      "Green Angel Rest & Calm Irish Bath Salt (Lavender, Orange) White",
    component_qty: 1,
  },
  {
    bundle_sku: "14782",
    bundle_name: "The Relax & Revive Beauty Box",
    component_sku: "14683",
    component_name: "Dermalogica Skin Awakening Heroes GWP",
    component_qty: 1,
  },
  {
    bundle_sku: "14782",
    bundle_name: "The Relax & Revive Beauty Box",
    component_sku: "20510",
    component_name: "Beauty Box Regular Sleeve",
    component_qty: 1,
  },
  {
    bundle_sku: "14783",
    bundle_name: "The BeautyFeatures Faves Box",
    component_sku: "12108",
    component_name:
      "Matrix Total Results Miracle Creator 20 Multi-Tasking Treatment Spray30ml GWP",
    component_qty: 1,
  },
  {
    bundle_sku: "14783",
    bundle_name: "The BeautyFeatures Faves Box",
    component_sku: "13580",
    component_name: "SOSU Bonnie Lash 3/4 Day Lash",
    component_qty: 1,
  },
  {
    bundle_sku: "14783",
    bundle_name: "The BeautyFeatures Faves Box",
    component_sku: "14032",
    component_name: "Premium Makeup Blending Sponge By BeautyFeatures 1PK",
    component_qty: 1,
  },
  {
    bundle_sku: "14783",
    bundle_name: "The BeautyFeatures Faves Box",
    component_sku: "14341",
    component_name: "Iconic London Silk Glow Duo - Rose Glow",
    component_qty: 1,
  },
  {
    bundle_sku: "14783",
    bundle_name: "The BeautyFeatures Faves Box",
    component_sku: "14351",
    component_name: "Oh K! Cherry Gel Lip Mask",
    component_qty: 1,
  },
  {
    bundle_sku: "14783",
    bundle_name: "The BeautyFeatures Faves Box",
    component_sku: "20510",
    component_name: "Beauty Box Regular Sleeve",
    component_qty: 1,
  },
  {
    bundle_sku: "14784",
    bundle_name: "The Irish Owned Brands Beauty Box",
    component_sku: "13059",
    component_name: "Bare By Vogue Water Bottle GWP",
    component_qty: 1,
  },
  {
    bundle_sku: "14784",
    bundle_name: "The Irish Owned Brands Beauty Box",
    component_sku: "13060",
    component_name: "Luna By Lisa Compact Mirror GWP",
    component_qty: 1,
  },
  {
    bundle_sku: "14784",
    bundle_name: "The Irish Owned Brands Beauty Box",
    component_sku: "13080",
    component_name: "He-Shi Luxury Velvet Tanning Mitt",
    component_qty: 1,
  },
  {
    bundle_sku: "14784",
    bundle_name: "The Irish Owned Brands Beauty Box",
    component_sku: "13082",
    component_name:
      "He-Shi Travel Size Medium/Dark Day to Day Gradual Tan 50ml",
    component_qty: 1,
  },
  {
    bundle_sku: "14784",
    bundle_name: "The Irish Owned Brands Beauty Box",
    component_sku: "14032",
    component_name: "Premium Makeup Blending Sponge By BeautyFeatures 1PK",
    component_qty: 1,
  },
  {
    bundle_sku: "14784",
    bundle_name: "The Irish Owned Brands Beauty Box",
    component_sku: "14153",
    component_name: "Bahama Skin Cotton Pads Set of 2 - Reusable",
    component_qty: 1,
  },
  {
    bundle_sku: "14784",
    bundle_name: "The Irish Owned Brands Beauty Box",
    component_sku: "14602",
    component_name: "Green Angel Cleansing Lotion - Seaweed",
    component_qty: 1,
  },
  {
    bundle_sku: "14784",
    bundle_name: "The Irish Owned Brands Beauty Box",
    component_sku: "20510",
    component_name: "Beauty Box Regular Sleeve",
    component_qty: 1,
  },
  {
    bundle_sku: "14784",
    bundle_name: "The Irish Owned Brands Beauty Box",
    component_sku: "9115",
    component_name: "So Sue Me The Sunset Trio",
    component_qty: 1,
  },
  {
    bundle_sku: "1866003",
    bundle_name: "BEAUTIEDIT Soft Velvet Tan Mitt",
    component_sku: "10733",
    component_name: "BeautiEdit Soft Velvet Tanning Mitt",
    component_qty: 1,
  },
  {
    bundle_sku: "1866010",
    bundle_name: "BEAUTIEDIT Restored Night Time Recovery Serum",
    component_sku: "13290",
    component_name: "BeautiEdit Restored - Night Time Recovery",
    component_qty: 1,
  },
  {
    bundle_sku: "20199",
    bundle_name: "Alfaparf Sunshine Shampoo & Conditioner Bundle",
    component_sku: "20109",
    component_name:
      "Alfaparf Semi Di Lino Sunshine After Sun Low Shampoo 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20199",
    bundle_name: "Alfaparf Sunshine Shampoo & Conditioner Bundle",
    component_sku: "20110",
    component_name: "Alfaparf Semi Di Lino Sunshine After Sun Treatment 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20200",
    bundle_name: "Alfaparf Sunshine - The Full Routine Bundle",
    component_sku: "20109",
    component_name:
      "Alfaparf Semi Di Lino Sunshine After Sun Low Shampoo 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20200",
    bundle_name: "Alfaparf Sunshine - The Full Routine Bundle",
    component_sku: "20110",
    component_name: "Alfaparf Semi Di Lino Sunshine After Sun Treatment 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20200",
    bundle_name: "Alfaparf Sunshine - The Full Routine Bundle",
    component_sku: "20111",
    component_name: "Alfaparf Semi Di Lino Sunshine Hair Protective Oil 125ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20200",
    bundle_name: "Alfaparf Sunshine - The Full Routine Bundle",
    component_sku: "20112",
    component_name: "Alfaparf Semi Di Lino Sunshine Hair Protective Milk 125ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20230",
    bundle_name: "Alfaparf Semi Di Lino - MOISTURE Bundle - SAVE 20 Euro",
    component_sku: "6469",
    component_name: "Alfaparf Semi Di Lino Moisture Nutritive Shampoo 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20230",
    bundle_name: "Alfaparf Semi Di Lino - MOISTURE Bundle - SAVE 20 Euro",
    component_sku: "6470",
    component_name: "Alfaparf Semi Di Lino Moisture Nutritive Mask 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20230",
    bundle_name: "Alfaparf Semi Di Lino - MOISTURE Bundle - SAVE 20 Euro",
    component_sku: "6481A",
    component_name: "Alfaparf Semi Di Lino Diamond Cryst Liquid 15ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20231",
    bundle_name: "Alfaparf Semi Di Lino - DIAMOND Bundle - SAVE 20 Euro",
    component_sku: "13248",
    component_name: "Alfaparf Semi Di Lino - Diamond Gift Set",
    component_qty: 1,
  },
  {
    bundle_sku: "20232",
    bundle_name: "Alfaparf Semi Di Lino - RECONSTRUCTION Bundle - SAVE 20 Euro",
    component_sku: "13250",
    component_name: "Alfaparf Semi Di Lino - Reconstruction Gift Set",
    component_qty: 1,
  },
  {
    bundle_sku: "20233",
    bundle_name: "Alfaparf Semi Di Lino - SMOOTH Bundle - SAVE 30 Euro",
    component_sku: "13253",
    component_name: "Alfaparf Semi Di Lino - Smooth Gift Set",
    component_qty: 1,
  },
  {
    bundle_sku: "20277",
    bundle_name: "Pure Indulgence Beauty Box",
    component_sku: "12272",
    component_name:
      "Kerastase Resistance Masque Force Architecte Deluxe 30ml​ GWP",
    component_qty: 1,
  },
  {
    bundle_sku: "20277",
    bundle_name: "Pure Indulgence Beauty Box",
    component_sku: "12273",
    component_name:
      "Kerastase Resistance Bain Force Architecte Deluxe 30ml​ GWP",
    component_qty: 1,
  },
  {
    bundle_sku: "20277",
    bundle_name: "Pure Indulgence Beauty Box",
    component_sku: "13059",
    component_name: "Bare By Vogue Water Bottle GWP",
    component_qty: 1,
  },
  {
    bundle_sku: "20277",
    bundle_name: "Pure Indulgence Beauty Box",
    component_sku: "13969",
    component_name:
      "Avéne Cleanance Comedomed Anti-Blemishes Concentrate 5ml GWP",
    component_qty: 1,
  },
  {
    bundle_sku: "20277",
    bundle_name: "Pure Indulgence Beauty Box",
    component_sku: "14032",
    component_name: "Premium Makeup Blending Sponge By BeautyFeatures 1PK",
    component_qty: 1,
  },
  {
    bundle_sku: "20277",
    bundle_name: "Pure Indulgence Beauty Box",
    component_sku: "14078",
    component_name: "Ziaja Goats Milk Creamy Shower Gel 500ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20277",
    bundle_name: "Pure Indulgence Beauty Box",
    component_sku: "14110",
    component_name:
      "Ziaja Moisturising Hand Cream - Ucuuba Butter 5% Urea 80ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20277",
    bundle_name: "Pure Indulgence Beauty Box",
    component_sku: "14111",
    component_name: "Ziaja Hand Soap - Tamarind & Green Orange 270ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20277",
    bundle_name: "Pure Indulgence Beauty Box",
    component_sku: "20295",
    component_name: "Large Black Box",
    component_qty: 1,
  },
  {
    bundle_sku: "20277",
    bundle_name: "Pure Indulgence Beauty Box",
    component_sku: "20511",
    component_name: "Beauty Box Large Sleeve",
    component_qty: 1,
  },
  {
    bundle_sku: "20291",
    bundle_name: "BeautyFeatures Ultimate Beauty Box - Limited Edition",
    component_sku: "11666",
    component_name: "Kerastase Nutritive nectar Thermique 50ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20291",
    bundle_name: "BeautyFeatures Ultimate Beauty Box - Limited Edition",
    component_sku: "11772",
    component_name: "Dermalogica Melting Moisture Masque 10ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20291",
    bundle_name: "BeautyFeatures Ultimate Beauty Box - Limited Edition",
    component_sku: "12269",
    component_name:
      "Kerastase Nutritive 8H Magic Night Repair Deluxe 30ml​ GWP",
    component_qty: 1,
  },
  {
    bundle_sku: "20291",
    bundle_name: "BeautyFeatures Ultimate Beauty Box - Limited Edition",
    component_sku: "12539",
    component_name: "Zadig & Voltaire Tote Bag GWP",
    component_qty: 1,
  },
  {
    bundle_sku: "20291",
    bundle_name: "BeautyFeatures Ultimate Beauty Box - Limited Edition",
    component_sku: "12761",
    component_name: "Dermalogica Phyto Nature Oxygen Liquid Cream, 5ml GWP",
    component_qty: 1,
  },
  {
    bundle_sku: "20291",
    bundle_name: "BeautyFeatures Ultimate Beauty Box - Limited Edition",
    component_sku: "13060",
    component_name: "Luna By Lisa Compact Mirror GWP",
    component_qty: 1,
  },
  {
    bundle_sku: "20291",
    bundle_name: "BeautyFeatures Ultimate Beauty Box - Limited Edition",
    component_sku: "13249",
    component_name: "Alfaparf Semi Di Lino - Moisture Gift Set",
    component_qty: 1,
  },
  {
    bundle_sku: "20291",
    bundle_name: "BeautyFeatures Ultimate Beauty Box - Limited Edition",
    component_sku: "14032",
    component_name: "Premium Makeup Blending Sponge By BeautyFeatures 1PK",
    component_qty: 1,
  },
  {
    bundle_sku: "20291",
    bundle_name: "BeautyFeatures Ultimate Beauty Box - Limited Edition",
    component_sku: "20270",
    component_name: "Real Techniques Chroma Perfect Finish Kit",
    component_qty: 1,
  },
  {
    bundle_sku: "20291",
    bundle_name: "BeautyFeatures Ultimate Beauty Box - Limited Edition",
    component_sku: "20295",
    component_name: "Large Black Box",
    component_qty: 1,
  },
  {
    bundle_sku: "20291",
    bundle_name: "BeautyFeatures Ultimate Beauty Box - Limited Edition",
    component_sku: "20511",
    component_name: "Beauty Box Large Sleeve",
    component_qty: 1,
  },
  {
    bundle_sku: "20302",
    bundle_name: "Mama to be Bundle",
    component_sku: "100870",
    component_name: "Angelsounds Fetal Doppler - Pocket Size",
    component_qty: 1,
  },
  {
    bundle_sku: "20302",
    bundle_name: "Mama to be Bundle",
    component_sku: "4007",
    component_name: "Dreamgenii Pregnancy Pillow",
    component_qty: 1,
  },
  {
    bundle_sku: "20302",
    bundle_name: "Mama to be Bundle",
    component_sku: "40188",
    component_name: "Carriwell Maternity Support Band Black Medium",
    component_qty: 1,
  },
  {
    bundle_sku: "20302",
    bundle_name: "Mama to be Bundle",
    component_sku: "4247",
    component_name: "Bio Oil 60ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20302",
    bundle_name: "Mama to be Bundle",
    component_sku: "5939",
    component_name: "Morning Sickness Sea-Band Mama",
    component_qty: 2,
  },
  {
    bundle_sku: "20303",
    bundle_name: "Labour of Love Bundle",
    component_sku: "4860",
    component_name: "Obi Tens ( Simple/Great Value + Booster)",
    component_qty: 1,
  },
  {
    bundle_sku: "20303",
    bundle_name: "Labour of Love Bundle",
    component_sku: "6338",
    component_name: "Birthing Ball 65cm",
    component_qty: 1,
  },
  {
    bundle_sku: "20303",
    bundle_name: "Labour of Love Bundle",
    component_sku: "6339",
    component_name: "Gymnic Pump for Birthing Ball",
    component_qty: 1,
  },
  {
    bundle_sku: "20303",
    bundle_name: "Labour of Love Bundle",
    component_sku: "8611",
    component_name: "Mio Liquid Yoga Space Spray",
    component_qty: 1,
  },
  {
    bundle_sku: "20304",
    bundle_name: "New Mum V-Love Bundle",
    component_sku: "11688",
    component_name: "Multi-Mam After Birth Spray 75",
    component_qty: 1,
  },
  {
    bundle_sku: "20304",
    bundle_name: "New Mum V-Love Bundle",
    component_sku: "11929",
    component_name: "Lansinoh Post-Birth Peri Wash Bottle",
    component_qty: 1,
  },
  {
    bundle_sku: "20304",
    bundle_name: "New Mum V-Love Bundle",
    component_sku: "40182",
    component_name: "Carriwell Hospital Panties - 4 Pack - Washable",
    component_qty: 1,
  },
  {
    bundle_sku: "20304",
    bundle_name: "New Mum V-Love Bundle",
    component_sku: "41530",
    component_name: "Medicare Maternity Pads - 10 Pack",
    component_qty: 1,
  },
  {
    bundle_sku: "20304",
    bundle_name: "New Mum V-Love Bundle",
    component_sku: "43379",
    component_name: "Vitabiotics Pregnacare New Mum",
    component_qty: 1,
  },
  {
    bundle_sku: "20305",
    bundle_name: "C-Section Mama Bundle",
    component_sku: "40182",
    component_name: "Carriwell Hospital Panties - 4 Pack - Washable",
    component_qty: 1,
  },
  {
    bundle_sku: "20305",
    bundle_name: "C-Section Mama Bundle",
    component_sku: "41530",
    component_name: "Medicare Maternity Pads - 10 Pack",
    component_qty: 1,
  },
  {
    bundle_sku: "20305",
    bundle_name: "C-Section Mama Bundle",
    component_sku: "43379",
    component_name: "Vitabiotics Pregnacare New Mum",
    component_qty: 1,
  },
  {
    bundle_sku: "20305",
    bundle_name: "C-Section Mama Bundle",
    component_sku: "5288",
    component_name: "Theraline C-Section Belt",
    component_qty: 1,
  },
  {
    bundle_sku: "20306",
    bundle_name: "New Baby Bundle",
    component_sku: "10023",
    component_name: "Beaba Camele’O 1st-Stage Baby Bath - Green/Blue",
    component_qty: 1,
  },
  {
    bundle_sku: "20306",
    bundle_name: "New Baby Bundle",
    component_sku: "10764",
    component_name: "Sleepytot Baby Comforter Bunny (Grey)",
    component_qty: 1,
  },
  {
    bundle_sku: "20306",
    bundle_name: "New Baby Bundle",
    component_sku: "11838",
    component_name: "Nuby Nasal Aspirator Sucker",
    component_qty: 1,
  },
  {
    bundle_sku: "20306",
    bundle_name: "New Baby Bundle",
    component_sku: "20060",
    component_name: "NUK Mommy Feels Soother Grey 0-9 Months, set of 2",
    component_qty: 1,
  },
  {
    bundle_sku: "20306",
    bundle_name: "New Baby Bundle",
    component_sku: "20102",
    component_name: "Childs Farm Baby Bedtime Suitcase",
    component_qty: 1,
  },
  {
    bundle_sku: "20306",
    bundle_name: "New Baby Bundle",
    component_sku: "20358",
    component_name: "Digital Basal Fertility Thermometer - Water Resistant",
    component_qty: 1,
  },
  {
    bundle_sku: "20307",
    bundle_name: "Breast Feeding Bundle",
    component_sku: "20079",
    component_name: "Lansinoh Organic Nipple Balm",
    component_qty: 1,
  },
  {
    bundle_sku: "20307",
    bundle_name: "Breast Feeding Bundle",
    component_sku: "41470",
    component_name: "Lansinoh Milk Storage Bags - 25",
    component_qty: 1,
  },
  {
    bundle_sku: "20307",
    bundle_name: "Breast Feeding Bundle",
    component_sku: "4634",
    component_name:
      "Vitabiotics Pregnacare Breast-Feeding Supplement 84 Tablets/Caps",
    component_qty: 1,
  },
  {
    bundle_sku: "20307",
    bundle_name: "Breast Feeding Bundle",
    component_sku: "7250",
    component_name: "Haakaa New Mum Starter Pack",
    component_qty: 1,
  },
  {
    bundle_sku: "20389",
    bundle_name: "Dermalogica Cleanse & Hydrate Beauty Box",
    component_sku: "12745",
    component_name: "Dermalogica Micellar Prebiotic Precleanse 150 ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20389",
    bundle_name: "Dermalogica Cleanse & Hydrate Beauty Box",
    component_sku: "20383",
    component_name:
      "Dermalogica Special Cleansing Gel Trial Size 15ml - FOR BEAUTY BOX",
    component_qty: 1,
  },
  {
    bundle_sku: "20389",
    bundle_name: "Dermalogica Cleanse & Hydrate Beauty Box",
    component_sku: "20384",
    component_name:
      "Dermalogica Circular Hydration Serum Trial Size 3ml - FOR BEAUTY BOX",
    component_qty: 1,
  },
  {
    bundle_sku: "20389",
    bundle_name: "Dermalogica Cleanse & Hydrate Beauty Box",
    component_sku: "20386",
    component_name:
      "Dermalogica Travel Size Daily Microfoliant 13g - FOR BEAUTY BOX",
    component_qty: 1,
  },
  {
    bundle_sku: "20389",
    bundle_name: "Dermalogica Cleanse & Hydrate Beauty Box",
    component_sku: "20387",
    component_name:
      "Dermalogica Skin Smoothing Cream Travel Size 15ml - FOR BEAUTY BOX",
    component_qty: 1,
  },
  {
    bundle_sku: "20389",
    bundle_name: "Dermalogica Cleanse & Hydrate Beauty Box",
    component_sku: "20510",
    component_name: "Beauty Box Regular Sleeve",
    component_qty: 1,
  },
  {
    bundle_sku: "20499",
    bundle_name: "Hair Repair Haven Beauty Box",
    component_sku: "11262",
    component_name:
      "K18 Biomimetic Hairscience Professional Molecular Repair Hair Mask 150ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20499",
    bundle_name: "Hair Repair Haven Beauty Box",
    component_sku: "12046",
    component_name: "Sigma Beauty Holiday Glam Brush Set",
    component_qty: 1,
  },
  {
    bundle_sku: "20499",
    bundle_name: "Hair Repair Haven Beauty Box",
    component_sku: "13100",
    component_name: "Decleor Hydrating Trio GWP",
    component_qty: 1,
  },
  {
    bundle_sku: "20499",
    bundle_name: "Hair Repair Haven Beauty Box",
    component_sku: "14032C",
    component_name: "Premium Makeup Blending Sponge By BeautyFeatures 5pk",
    component_qty: 1,
  },
  {
    bundle_sku: "20499",
    bundle_name: "Hair Repair Haven Beauty Box",
    component_sku: "20295",
    component_name: "Large Black Box",
    component_qty: 1,
  },
  {
    bundle_sku: "20499",
    bundle_name: "Hair Repair Haven Beauty Box",
    component_sku: "20511",
    component_name: "Beauty Box Large Sleeve",
    component_qty: 1,
  },
  {
    bundle_sku: "20499",
    bundle_name: "Hair Repair Haven Beauty Box",
    component_sku: "8296",
    component_name: "OLAPLEX No. 3 Hair Perfector 250ml - Limited Edition",
    component_qty: 1,
  },
  {
    bundle_sku: "20500",
    bundle_name: "Hair, Brow & Skin Essentials Beauty Box",
    component_sku: "11286",
    component_name: "Olaplex No 9 Bond Serum 90ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20500",
    bundle_name: "Hair, Brow & Skin Essentials Beauty Box",
    component_sku: "11566",
    component_name: "Hollywood Browzer - Brow Perfector - Black",
    component_qty: 1,
  },
  {
    bundle_sku: "20500",
    bundle_name: "Hair, Brow & Skin Essentials Beauty Box",
    component_sku: "14032C",
    component_name: "Premium Makeup Blending Sponge By BeautyFeatures 5pk",
    component_qty: 1,
  },
  {
    bundle_sku: "20500",
    bundle_name: "Hair, Brow & Skin Essentials Beauty Box",
    component_sku: "20510",
    component_name: "Beauty Box Regular Sleeve",
    component_qty: 1,
  },
  {
    bundle_sku: "20500",
    bundle_name: "Hair, Brow & Skin Essentials Beauty Box",
    component_sku: "9678",
    component_name: "La Roche-Posay Effaclar Clarifying Toner 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20501",
    bundle_name: "Hair & Skin Harmony Beauty Box",
    component_sku: "11286",
    component_name: "Olaplex No 9 Bond Serum 90ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20501",
    bundle_name: "Hair & Skin Harmony Beauty Box",
    component_sku: "13142",
    component_name:
      "Loreal Professionnel Scalp Advanced Anti-Discomfort Shampoo 100ml GWP",
    component_qty: 1,
  },
  {
    bundle_sku: "20501",
    bundle_name: "Hair & Skin Harmony Beauty Box",
    component_sku: "14032C",
    component_name: "Premium Makeup Blending Sponge By BeautyFeatures 5pk",
    component_qty: 1,
  },
  {
    bundle_sku: "20501",
    bundle_name: "Hair & Skin Harmony Beauty Box",
    component_sku: "20510",
    component_name: "Beauty Box Regular Sleeve",
    component_qty: 1,
  },
  {
    bundle_sku: "20501",
    bundle_name: "Hair & Skin Harmony Beauty Box",
    component_sku: "8296",
    component_name: "OLAPLEX No. 3 Hair Perfector 250ml - Limited Edition",
    component_qty: 1,
  },
  {
    bundle_sku: "20502",
    bundle_name: "Beloved Brands Beauty Box",
    component_sku: "13142",
    component_name:
      "Loreal Professionnel Scalp Advanced Anti-Discomfort Shampoo 100ml GWP",
    component_qty: 1,
  },
  {
    bundle_sku: "20502",
    bundle_name: "Beloved Brands Beauty Box",
    component_sku: "13297",
    component_name: "Joico Defy Damage Seasonal Kit",
    component_qty: 1,
  },
  {
    bundle_sku: "20502",
    bundle_name: "Beloved Brands Beauty Box",
    component_sku: "14032C",
    component_name: "Premium Makeup Blending Sponge By BeautyFeatures 5pk",
    component_qty: 1,
  },
  {
    bundle_sku: "20502",
    bundle_name: "Beloved Brands Beauty Box",
    component_sku: "20510",
    component_name: "Beauty Box Regular Sleeve",
    component_qty: 1,
  },
  {
    bundle_sku: "20502",
    bundle_name: "Beloved Brands Beauty Box",
    component_sku: "mor_mo0042",
    component_name: "Moroccanoil light Treatment Oil 125ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20503",
    bundle_name: "Day To Night Radiance Beauty Box",
    component_sku: "13144",
    component_name:
      "Loreal Professionnel Scalp Advanced Anti-Oiliness Shampoo 100ml GWP",
    component_qty: 1,
  },
  {
    bundle_sku: "20503",
    bundle_name: "Day To Night Radiance Beauty Box",
    component_sku: "13456",
    component_name: "SOSU Kissmass Lip Trio",
    component_qty: 1,
  },
  {
    bundle_sku: "20503",
    bundle_name: "Day To Night Radiance Beauty Box",
    component_sku: "14032C",
    component_name: "Premium Makeup Blending Sponge By BeautyFeatures 5pk",
    component_qty: 1,
  },
  {
    bundle_sku: "20503",
    bundle_name: "Day To Night Radiance Beauty Box",
    component_sku: "20510",
    component_name: "Beauty Box Regular Sleeve",
    component_qty: 1,
  },
  {
    bundle_sku: "20503",
    bundle_name: "Day To Night Radiance Beauty Box",
    component_sku: "9141A",
    component_name: "Kerastase Elixir L'Huile Legere Pride Edition 2022 100ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20512",
    bundle_name:
      "L'Oréal Professionnel SteamPod 3.0 with FREE Absolut Repair Shampoo 100ml & Absolut Repair Molecular Liquid Treatment 75ml",
    component_sku: "9631",
    component_name: "L'Oreal Steampod V3 White",
    component_qty: 1,
  },
  {
    bundle_sku: "20513",
    bundle_name:
      "L'Oréal Professionnel SteamPod 4.0 with FREE 30ml Kerastase Resistance Shampoo, Mask & Ciment Thermiqe",
    component_sku: "12109",
    component_name: "L'Oreal Professionnel Steampod 4.0",
    component_qty: 1,
  },
  {
    bundle_sku: "20513",
    bundle_name:
      "L'Oréal Professionnel SteamPod 4.0 with FREE 30ml Kerastase Resistance Shampoo, Mask & Ciment Thermiqe",
    component_sku: "12271",
    component_name: "Kerastase Resistance Ciment Thermique Deluxe 30ml​ GWP",
    component_qty: 1,
  },
  {
    bundle_sku: "20513",
    bundle_name:
      "L'Oréal Professionnel SteamPod 4.0 with FREE 30ml Kerastase Resistance Shampoo, Mask & Ciment Thermiqe",
    component_sku: "12272",
    component_name:
      "Kerastase Resistance Masque Force Architecte Deluxe 30ml​ GWP",
    component_qty: 1,
  },
  {
    bundle_sku: "20513",
    bundle_name:
      "L'Oréal Professionnel SteamPod 4.0 with FREE 30ml Kerastase Resistance Shampoo, Mask & Ciment Thermiqe",
    component_sku: "12273",
    component_name:
      "Kerastase Resistance Bain Force Architecte Deluxe 30ml​ GWP",
    component_qty: 1,
  },
  {
    bundle_sku: "20522",
    bundle_name: "Isoclean Cleanse & Smooth Bundle",
    component_sku: "13664",
    component_name: "e.l.f. Holy Hydration! Makeup Melting Cleansing Balm",
    component_qty: 1,
  },
  {
    bundle_sku: "20522",
    bundle_name: "Isoclean Cleanse & Smooth Bundle",
    component_sku: "20117",
    component_name: "ISOCLEAN Cotton Cleansing Towels - 60 Pack",
    component_qty: 1,
  },
  {
    bundle_sku: "20522",
    bundle_name: "Isoclean Cleanse & Smooth Bundle",
    component_sku: "20122",
    component_name: "ISOCLEAN Facial Dermablade Razor",
    component_qty: 1,
  },
  {
    bundle_sku: "20523",
    bundle_name: "Isoclean Introduction Bundle",
    component_sku: "12948",
    component_name: "Isoclean 100ml Spray Top Brush Cleaner",
    component_qty: 1,
  },
  {
    bundle_sku: "20523",
    bundle_name: "Isoclean Introduction Bundle",
    component_sku: "12950",
    component_name: "Isoclean Carbon Soap (solid)",
    component_qty: 1,
  },
  {
    bundle_sku: "20524",
    bundle_name: "Isoclean Scent Lovers Bundle",
    component_sku: "20118",
    component_name: "ISOCLEAN Cosmic Makeup Brush Cleaner - 275ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20524",
    bundle_name: "Isoclean Scent Lovers Bundle",
    component_sku: "20119",
    component_name:
      "ISOCLEAN Cosmic Makeup Brush Cleaner Eco Refill Pouch -275ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20525",
    bundle_name: "Isoclean Makeup Artists Favourites Bundle",
    component_sku: "12949",
    component_name: "Isoclean Biocidal Surface Cleaner 525ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20525",
    bundle_name: "Isoclean Makeup Artists Favourites Bundle",
    component_sku: "20114",
    component_name: "ISOCLEAN Makeup Brush Cleaner with Spray Top - 525ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20527",
    bundle_name: "Beauty Features Complete Care Bundle",
    component_sku: "14032",
    component_name: "Premium Makeup Blending Sponge By BeautyFeatures 1PK",
    component_qty: 1,
  },
  {
    bundle_sku: "20527",
    bundle_name: "Beauty Features Complete Care Bundle",
    component_sku: "20516",
    component_name:
      "BeautyFeatures Reusable Premium Cleansing Pads with Cuffs - 3 Pack",
    component_qty: 1,
  },
  {
    bundle_sku: "20527",
    bundle_name: "Beauty Features Complete Care Bundle",
    component_sku: "20517",
    component_name:
      "BeautyFeatures Resuable Bamboo Fibre Cleansing Mitts - 2 Pack",
    component_qty: 1,
  },
  {
    bundle_sku: "20527",
    bundle_name: "Beauty Features Complete Care Bundle",
    component_sku: "20518",
    component_name: "BeautyFeatures Silk Heatless Curler",
    component_qty: 1,
  },
  {
    bundle_sku: "20527",
    bundle_name: "Beauty Features Complete Care Bundle",
    component_sku: "20519",
    component_name: "BeautyFeatures Microfibre Hair Towel",
    component_qty: 1,
  },
  {
    bundle_sku: "20527",
    bundle_name: "Beauty Features Complete Care Bundle",
    component_sku: "20520",
    component_name: "BeautyFeatures Detangling Hairbrush",
    component_qty: 1,
  },
  {
    bundle_sku: "20527",
    bundle_name: "Beauty Features Complete Care Bundle",
    component_sku: "20521",
    component_name: "BeautyFeatures Vent Hairbrush with Nylon & Boar Bristles",
    component_qty: 1,
  },
  {
    bundle_sku: "20528",
    bundle_name: "BeautyFeatures Hair Therapy Bundle",
    component_sku: "20519",
    component_name: "BeautyFeatures Microfibre Hair Towel",
    component_qty: 1,
  },
  {
    bundle_sku: "20528",
    bundle_name: "BeautyFeatures Hair Therapy Bundle",
    component_sku: "20521",
    component_name: "BeautyFeatures Vent Hairbrush with Nylon & Boar Bristles",
    component_qty: 1,
  },
  {
    bundle_sku: "20528",
    bundle_name: "BeautyFeatures Hair Therapy Bundle",
    component_sku: "20646",
    component_name: "Alfaparf Semi Di Lino Moisture Christmas Gift Set 2024",
    component_qty: 1,
  },
  {
    bundle_sku: "20529",
    bundle_name: "BeautyFeatures Hair & Skin Night In Beauty Box",
    component_sku: "13297",
    component_name: "Joico Defy Damage Seasonal Kit",
    component_qty: 1,
  },
  {
    bundle_sku: "20529",
    bundle_name: "BeautyFeatures Hair & Skin Night In Beauty Box",
    component_sku: "14090",
    component_name: "Ziaja Goats Milk Milky Face Wash 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20529",
    bundle_name: "BeautyFeatures Hair & Skin Night In Beauty Box",
    component_sku: "20295",
    component_name: "Large Black Box",
    component_qty: 1,
  },
  {
    bundle_sku: "20529",
    bundle_name: "BeautyFeatures Hair & Skin Night In Beauty Box",
    component_sku: "20511",
    component_name: "Beauty Box Large Sleeve",
    component_qty: 1,
  },
  {
    bundle_sku: "20529",
    bundle_name: "BeautyFeatures Hair & Skin Night In Beauty Box",
    component_sku: "20516",
    component_name:
      "BeautyFeatures Reusable Premium Cleansing Pads with Cuffs - 3 Pack",
    component_qty: 1,
  },
  {
    bundle_sku: "20529",
    bundle_name: "BeautyFeatures Hair & Skin Night In Beauty Box",
    component_sku: "20518",
    component_name: "BeautyFeatures Silk Heatless Curler",
    component_qty: 1,
  },
  {
    bundle_sku: "20529",
    bundle_name: "BeautyFeatures Hair & Skin Night In Beauty Box",
    component_sku: "20519",
    component_name: "BeautyFeatures Microfibre Hair Towel",
    component_qty: 1,
  },
  {
    bundle_sku: "20530",
    bundle_name: "BeautyFeatures Mega Value Box",
    component_sku: "11772",
    component_name: "Dermalogica Melting Moisture Masque 10ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20530",
    bundle_name: "BeautyFeatures Mega Value Box",
    component_sku: "13867",
    component_name: "Distinct Beauty Cleansing Mitt",
    component_qty: 1,
  },
  {
    bundle_sku: "20530",
    bundle_name: "BeautyFeatures Mega Value Box",
    component_sku: "14032",
    component_name: "Premium Makeup Blending Sponge By BeautyFeatures 1PK",
    component_qty: 1,
  },
  {
    bundle_sku: "20530",
    bundle_name: "BeautyFeatures Mega Value Box",
    component_sku: "20510",
    component_name: "Beauty Box Regular Sleeve",
    component_qty: 1,
  },
  {
    bundle_sku: "20530",
    bundle_name: "BeautyFeatures Mega Value Box",
    component_sku: "20520",
    component_name: "BeautyFeatures Detangling Hairbrush",
    component_qty: 1,
  },
  {
    bundle_sku: "20531",
    bundle_name: "BeautyFeatures Cleanse the Day Away Beauty Box",
    component_sku: "13405",
    component_name: "Elemis Pro-Collagen Cleansing Balm 100g",
    component_qty: 1,
  },
  {
    bundle_sku: "20531",
    bundle_name: "BeautyFeatures Cleanse the Day Away Beauty Box",
    component_sku: "13968",
    component_name: "Avène Cleanance Cleansing Gel 25ml GWP",
    component_qty: 1,
  },
  {
    bundle_sku: "20531",
    bundle_name: "BeautyFeatures Cleanse the Day Away Beauty Box",
    component_sku: "20295",
    component_name: "Large Black Box",
    component_qty: 1,
  },
  {
    bundle_sku: "20531",
    bundle_name: "BeautyFeatures Cleanse the Day Away Beauty Box",
    component_sku: "20511",
    component_name: "Beauty Box Large Sleeve",
    component_qty: 1,
  },
  {
    bundle_sku: "20531",
    bundle_name: "BeautyFeatures Cleanse the Day Away Beauty Box",
    component_sku: "20516",
    component_name:
      "BeautyFeatures Reusable Premium Cleansing Pads with Cuffs - 3 Pack",
    component_qty: 1,
  },
  {
    bundle_sku: "20531",
    bundle_name: "BeautyFeatures Cleanse the Day Away Beauty Box",
    component_sku: "20517",
    component_name:
      "BeautyFeatures Resuable Bamboo Fibre Cleansing Mitts - 2 Pack",
    component_qty: 1,
  },
  {
    bundle_sku: "20532",
    bundle_name: "BeautyFeatures Go With the Glow Beauty Box",
    component_sku: "11417A",
    component_name: "Pestle & Mortar Glow Drops 30ml GWP",
    component_qty: 1,
  },
  {
    bundle_sku: "20532",
    bundle_name: "BeautyFeatures Go With the Glow Beauty Box",
    component_sku: "13565",
    component_name: "Dripping Gold Cherry Lip Oil",
    component_qty: 1,
  },
  {
    bundle_sku: "20532",
    bundle_name: "BeautyFeatures Go With the Glow Beauty Box",
    component_sku: "14032",
    component_name: "Premium Makeup Blending Sponge By BeautyFeatures 1PK",
    component_qty: 1,
  },
  {
    bundle_sku: "20532",
    bundle_name: "BeautyFeatures Go With the Glow Beauty Box",
    component_sku: "14336",
    component_name: "Iconic London Radiance Booster Champagne Glow",
    component_qty: 1,
  },
  {
    bundle_sku: "20532",
    bundle_name: "BeautyFeatures Go With the Glow Beauty Box",
    component_sku: "20295",
    component_name: "Large Black Box",
    component_qty: 1,
  },
  {
    bundle_sku: "20532",
    bundle_name: "BeautyFeatures Go With the Glow Beauty Box",
    component_sku: "20511",
    component_name: "Beauty Box Large Sleeve",
    component_qty: 1,
  },
  {
    bundle_sku: "20532",
    bundle_name: "BeautyFeatures Go With the Glow Beauty Box",
    component_sku: "20521",
    component_name: "BeautyFeatures Vent Hairbrush with Nylon & Boar Bristles",
    component_qty: 1,
  },
  {
    bundle_sku: "20533",
    bundle_name: "BeautyFeatures Ultimate Hair Heroes Bundle",
    component_sku: "20518",
    component_name: "BeautyFeatures Silk Heatless Curler",
    component_qty: 1,
  },
  {
    bundle_sku: "20533",
    bundle_name: "BeautyFeatures Ultimate Hair Heroes Bundle",
    component_sku: "20519",
    component_name: "BeautyFeatures Microfibre Hair Towel",
    component_qty: 1,
  },
  {
    bundle_sku: "20533",
    bundle_name: "BeautyFeatures Ultimate Hair Heroes Bundle",
    component_sku: "20520",
    component_name: "BeautyFeatures Detangling Hairbrush",
    component_qty: 1,
  },
  {
    bundle_sku: "20533",
    bundle_name: "BeautyFeatures Ultimate Hair Heroes Bundle",
    component_sku: "20521",
    component_name: "BeautyFeatures Vent Hairbrush with Nylon & Boar Bristles",
    component_qty: 1,
  },
  {
    bundle_sku: "20623",
    bundle_name: "Kevin Murphy Smooth Again Shampoo & Conditioner Duo",
    component_sku: "20562",
    component_name: "Kevin Murphy Smooth Again Wash 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20623",
    bundle_name: "Kevin Murphy Smooth Again Shampoo & Conditioner Duo",
    component_sku: "20563",
    component_name: "Kevin Murphy Smooth Again Rinse 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20624",
    bundle_name: "Kevin Murphy Young Again Shampoo & Conditioner Duo",
    component_sku: "20556",
    component_name: "Kevin Murphy Young Again Wash 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20624",
    bundle_name: "Kevin Murphy Young Again Shampoo & Conditioner Duo",
    component_sku: "20557",
    component_name: "Kevin Murphy Young Again Rinse 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20625",
    bundle_name: "Kevin Murphy Angel Shampoo & Conditioner Duo",
    component_sku: "20605",
    component_name: "Kevin Murphy Angel Rinse 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20625",
    bundle_name: "Kevin Murphy Angel Shampoo & Conditioner Duo",
    component_sku: "20605A",
    component_name: "Kevin Murphy Angel Wash 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20626",
    bundle_name: "Kevin Murphy Hydrate Me Shampoo & Conditioner Duo",
    component_sku: "20581",
    component_name: "Kevin Murphy Hydrate Me Wash 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20626",
    bundle_name: "Kevin Murphy Hydrate Me Shampoo & Conditioner Duo",
    component_sku: "20582",
    component_name: "Kevin Murphy Hydrate Me Rinse 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20627",
    bundle_name: "Kevin Murphy Plumping Shampoo & Conditioner Duo",
    component_sku: "20544",
    component_name: "Kevin Murphy Plumping Rinse 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20627",
    bundle_name: "Kevin Murphy Plumping Shampoo & Conditioner Duo",
    component_sku: "20575",
    component_name: "Kevin Murphy Plumping Wash 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20628",
    bundle_name: "Kevin Murphy Everlasting Colour Shampoo & Conditioner Duo",
    component_sku: "20590",
    component_name: "Kevin Murphy Everlasting Colour Wash 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20628",
    bundle_name: "Kevin Murphy Everlasting Colour Shampoo & Conditioner Duo",
    component_sku: "20591",
    component_name: "Kevin Murphy Everlasting Colour Rinse 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20629",
    bundle_name: "Kevin Murphy Repair Me Shampoo & Conditioner Duo",
    component_sku: "20573",
    component_name: "Kevin Murphy Repair Me Wash 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20629",
    bundle_name: "Kevin Murphy Repair Me Shampoo & Conditioner Duo",
    component_sku: "20574",
    component_name: "Kevin Murphy Repair Me Rinse 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20630",
    bundle_name: "Kevin Murphy Killer Curls Shampoo & Conditioner Duo",
    component_sku: "20547",
    component_name: "Kevin Murphy Killer Curls Wash 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20630",
    bundle_name: "Kevin Murphy Killer Curls Shampoo & Conditioner Duo",
    component_sku: "20548",
    component_name: "Kevin Murphy Killer Curls Rinse 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20631",
    bundle_name: "Kevin Murphy Blonde Angel Shampoo & Conditioner Duo",
    component_sku: "20600",
    component_name: "Kevin Murphy Blonde Angel Wash 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20631",
    bundle_name: "Kevin Murphy Blonde Angel Shampoo & Conditioner Duo",
    component_sku: "20601",
    component_name: "Kevin Murphy Blonde Angel Rinse 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20632",
    bundle_name: "Kevin Murphy Healthy Scalp Bundle",
    component_sku: "20568",
    component_name: "Kevin Murphy Scalp Spa Wash 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20632",
    bundle_name: "Kevin Murphy Healthy Scalp Bundle",
    component_sku: "20569",
    component_name: "Kevin Murphy Scalp Spa Treatment 170ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20632",
    bundle_name: "Kevin Murphy Healthy Scalp Bundle",
    component_sku: "20570",
    component_name: "Kevin Murphy Scalp Spa Serum 45ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20632",
    bundle_name: "Kevin Murphy Healthy Scalp Bundle",
    component_sku: "20571",
    component_name: "Kevin Murphy Scalp Spa Scrub 180ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20633",
    bundle_name: "Kevin Murphy Bundle for Frizzy Hair",
    component_sku: "20562",
    component_name: "Kevin Murphy Smooth Again Wash 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20633",
    bundle_name: "Kevin Murphy Bundle for Frizzy Hair",
    component_sku: "20563",
    component_name: "Kevin Murphy Smooth Again Rinse 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20633",
    bundle_name: "Kevin Murphy Bundle for Frizzy Hair",
    component_sku: "20564",
    component_name: "Kevin Murphy Smooth Again Anti Frizz Treatment 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20634",
    bundle_name: "Kevin Murphy Bundle for Aging & Brittle Hair",
    component_sku: "20535",
    component_name: "Kevin Murphy Young Again Masque 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20634",
    bundle_name: "Kevin Murphy Bundle for Aging & Brittle Hair",
    component_sku: "20536",
    component_name: "Kevin Murphy Young Again Leave-in Treatment 100ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20634",
    bundle_name: "Kevin Murphy Bundle for Aging & Brittle Hair",
    component_sku: "20537",
    component_name: "Kevin Murphy Young Again Dry Conditioner 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20634",
    bundle_name: "Kevin Murphy Bundle for Aging & Brittle Hair",
    component_sku: "20556",
    component_name: "Kevin Murphy Young Again Wash 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20634",
    bundle_name: "Kevin Murphy Bundle for Aging & Brittle Hair",
    component_sku: "20557",
    component_name: "Kevin Murphy Young Again Rinse 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20635",
    bundle_name: "Kevin Murphy Bundle for Fine, Limp Hair",
    component_sku: "20554",
    component_name: "Kevin Murphy Anti Gravity 150ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20635",
    bundle_name: "Kevin Murphy Bundle for Fine, Limp Hair",
    component_sku: "20555",
    component_name: "Kevin Murphy Angel Masque 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20635",
    bundle_name: "Kevin Murphy Bundle for Fine, Limp Hair",
    component_sku: "20597",
    component_name: "Kevin Murphy Body Builder 400ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20635",
    bundle_name: "Kevin Murphy Bundle for Fine, Limp Hair",
    component_sku: "20604",
    component_name: "Kevin Murphy Anti Gravity Spray 150ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20635",
    bundle_name: "Kevin Murphy Bundle for Fine, Limp Hair",
    component_sku: "20605",
    component_name: "Kevin Murphy Angel Rinse 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20635",
    bundle_name: "Kevin Murphy Bundle for Fine, Limp Hair",
    component_sku: "20605A",
    component_name: "Kevin Murphy Angel Wash 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20636",
    bundle_name: "Kevin Murphy Bundle for Dry Hair",
    component_sku: "20538",
    component_name: "Kevin Murphy Untangled 150ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20636",
    bundle_name: "Kevin Murphy Bundle for Dry Hair",
    component_sku: "20565",
    component_name: "Kevin Murphy Shimmer Shine 100ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20636",
    bundle_name: "Kevin Murphy Bundle for Dry Hair",
    component_sku: "20581",
    component_name: "Kevin Murphy Hydrate Me Wash 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20636",
    bundle_name: "Kevin Murphy Bundle for Dry Hair",
    component_sku: "20582",
    component_name: "Kevin Murphy Hydrate Me Rinse 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20636",
    bundle_name: "Kevin Murphy Bundle for Dry Hair",
    component_sku: "20583",
    component_name: "Kevin Murphy Hydrate Masque 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20637",
    bundle_name: "Kevin Murphy Trio For Colour Treated Hair",
    component_sku: "20549",
    component_name: "Kevin Murphy Everlasting Colour Leave-In Treatment 150ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20637",
    bundle_name: "Kevin Murphy Trio For Colour Treated Hair",
    component_sku: "20590",
    component_name: "Kevin Murphy Everlasting Colour Wash 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20637",
    bundle_name: "Kevin Murphy Trio For Colour Treated Hair",
    component_sku: "20591",
    component_name: "Kevin Murphy Everlasting Colour Rinse 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20638",
    bundle_name: "Kevin Murphy Bundle For Fine, Thin Hair",
    component_sku: "20544",
    component_name: "Kevin Murphy Plumping Rinse 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20638",
    bundle_name: "Kevin Murphy Bundle For Fine, Thin Hair",
    component_sku: "20561",
    component_name: "Kevin Murphy Staying Alive 150ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20638",
    bundle_name: "Kevin Murphy Bundle For Fine, Thin Hair",
    component_sku: "20575",
    component_name: "Kevin Murphy Plumping Wash 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20638",
    bundle_name: "Kevin Murphy Bundle For Fine, Thin Hair",
    component_sku: "20587",
    component_name: "Kevin Murphy Full Again 150ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20638",
    bundle_name: "Kevin Murphy Bundle For Fine, Thin Hair",
    component_sku: "20594",
    component_name: "Kevin Murphy Doo Over 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20638",
    bundle_name: "Kevin Murphy Bundle For Fine, Thin Hair",
    component_sku: "20596",
    component_name: "Kevin Murphy Body Mass 100ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20639",
    bundle_name: "Kevin Murphy Bundle for Curly Hair",
    component_sku: "20546",
    component_name: "Kevin Murphy Killer Twirls 150ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20639",
    bundle_name: "Kevin Murphy Bundle for Curly Hair",
    component_sku: "20547",
    component_name: "Kevin Murphy Killer Curls Wash 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20639",
    bundle_name: "Kevin Murphy Bundle for Curly Hair",
    component_sku: "20548",
    component_name: "Kevin Murphy Killer Curls Rinse 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20639",
    bundle_name: "Kevin Murphy Bundle for Curly Hair",
    component_sku: "20577",
    component_name: "Kevin Murphy Motion Lotion 150ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20639",
    bundle_name: "Kevin Murphy Bundle for Curly Hair",
    component_sku: "20580",
    component_name: "Kevin Murphy Killer Curls 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20640",
    bundle_name: "Kevin Murhpy Bundle For Damaged Hair",
    component_sku: "20543",
    component_name: "Kevin Murphy Restore 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20640",
    bundle_name: "Kevin Murhpy Bundle For Damaged Hair",
    component_sku: "20573",
    component_name: "Kevin Murphy Repair Me Wash 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20640",
    bundle_name: "Kevin Murhpy Bundle For Damaged Hair",
    component_sku: "20574",
    component_name: "Kevin Murphy Repair Me Rinse 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20640",
    bundle_name: "Kevin Murhpy Bundle For Damaged Hair",
    component_sku: "20578",
    component_name: "Kevin Murphy Leave In Repair 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20641",
    bundle_name: "Kevin Murphy Bundle for Blonde Hair",
    component_sku: "20541",
    component_name: "Kevin Murphy Shimmer Me Blonde 100ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20641",
    bundle_name: "Kevin Murphy Bundle for Blonde Hair",
    component_sku: "20600",
    component_name: "Kevin Murphy Blonde Angel Wash 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20641",
    bundle_name: "Kevin Murphy Bundle for Blonde Hair",
    component_sku: "20601",
    component_name: "Kevin Murphy Blonde Angel Rinse 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20647",
    bundle_name: "Alfaparf Semi Di Lino Diamond Christmas Gift Set 2024",
    component_sku: "20643A",
    component_name: "Alfaparf GIFT BOX for Diamond Set",
    component_qty: 1,
  },
  {
    bundle_sku: "20649",
    bundle_name: "Alfaparf Semi Di Lino Reconstruction Christmas Gift Set 2024",
    component_sku: "22449",
    component_name:
      "Alfaparf Semi Di Lino Reconstruction Christmas Gift Set 2025",
    component_qty: 1,
  },
  {
    bundle_sku: "20650",
    bundle_name: "Alfaparf Moisture Shampoo & Conditioner Bundle",
    component_sku: "6469",
    component_name: "Alfaparf Semi Di Lino Moisture Nutritive Shampoo 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20650",
    bundle_name: "Alfaparf Moisture Shampoo & Conditioner Bundle",
    component_sku: "6471",
    component_name:
      "Alfaparf Semi Di Lino Moisture Nutritive Leave-In Conditioner 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20651",
    bundle_name: "Alfaparf Diamond Shampoo & Conditioner Bundle",
    component_sku: "6474",
    component_name: "Alfaparf Semi Di Lino Diamond Illuminating Shampoo 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20651",
    bundle_name: "Alfaparf Diamond Shampoo & Conditioner Bundle",
    component_sku: "6475",
    component_name:
      "Alfaparf Semi Di Lino Diamond Illuminating Conditioner 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20652",
    bundle_name: "Alfaparf Reconstruction Shampoo & Mask Bundle",
    component_sku: "6465",
    component_name:
      "Alfaparf Semi Di Lino Reconstruction Reparative Low Shampoo 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20652",
    bundle_name: "Alfaparf Reconstruction Shampoo & Mask Bundle",
    component_sku: "6466",
    component_name:
      "Alfaparf Semi Di Lino Reconstruction Reparative Mask 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20656",
    bundle_name:
      "Alfaparf Density Shampoo & Conditioner Duo with FREE Detangling Hairbrush",
    component_sku: "14050",
    component_name:
      "Alfaparf Semi Di Lino Density Thickening Low Shampoo 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20656",
    bundle_name:
      "Alfaparf Density Shampoo & Conditioner Duo with FREE Detangling Hairbrush",
    component_sku: "14051",
    component_name:
      "Alfaparf Semi Di Lino Density Thickening Conditioner 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20656",
    bundle_name:
      "Alfaparf Density Shampoo & Conditioner Duo with FREE Detangling Hairbrush",
    component_sku: "20520",
    component_name: "BeautyFeatures Detangling Hairbrush",
    component_qty: 1,
  },
  {
    bundle_sku: "20657",
    bundle_name:
      "Alfaparf Diamond Shampoo & Conditioner Duo with FREE Detangling Hairbrush",
    component_sku: "20520",
    component_name: "BeautyFeatures Detangling Hairbrush",
    component_qty: 1,
  },
  {
    bundle_sku: "20657",
    bundle_name:
      "Alfaparf Diamond Shampoo & Conditioner Duo with FREE Detangling Hairbrush",
    component_sku: "6474",
    component_name: "Alfaparf Semi Di Lino Diamond Illuminating Shampoo 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20657",
    bundle_name:
      "Alfaparf Diamond Shampoo & Conditioner Duo with FREE Detangling Hairbrush",
    component_sku: "6475",
    component_name:
      "Alfaparf Semi Di Lino Diamond Illuminating Conditioner 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20658",
    bundle_name:
      "Alfaparf Moisture Shampoo & Conditioner Duo with FREE Detangling Hairbrush",
    component_sku: "20520",
    component_name: "BeautyFeatures Detangling Hairbrush",
    component_qty: 1,
  },
  {
    bundle_sku: "20658",
    bundle_name:
      "Alfaparf Moisture Shampoo & Conditioner Duo with FREE Detangling Hairbrush",
    component_sku: "6469",
    component_name: "Alfaparf Semi Di Lino Moisture Nutritive Shampoo 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20658",
    bundle_name:
      "Alfaparf Moisture Shampoo & Conditioner Duo with FREE Detangling Hairbrush",
    component_sku: "6471",
    component_name:
      "Alfaparf Semi Di Lino Moisture Nutritive Leave-In Conditioner 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20659",
    bundle_name:
      "Alfaparf Smooth Shampoo & Conditioner Duo with FREE Detangling Hairbrush",
    component_sku: "20520",
    component_name: "BeautyFeatures Detangling Hairbrush",
    component_qty: 1,
  },
  {
    bundle_sku: "20659",
    bundle_name:
      "Alfaparf Smooth Shampoo & Conditioner Duo with FREE Detangling Hairbrush",
    component_sku: "9894",
    component_name: "Alfaparf Semi Di Lino Smooth Conditioner 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20659",
    bundle_name:
      "Alfaparf Smooth Shampoo & Conditioner Duo with FREE Detangling Hairbrush",
    component_sku: "9899",
    component_name: "Alfaparf Semi Di Lino Smooth Shampoo 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20660",
    bundle_name:
      "Alfaparf Curls Shampoo & Conditioner Duo with FREE Detangling Hairbrush",
    component_sku: "20520",
    component_name: "BeautyFeatures Detangling Hairbrush",
    component_qty: 1,
  },
  {
    bundle_sku: "20660",
    bundle_name:
      "Alfaparf Curls Shampoo & Conditioner Duo with FREE Detangling Hairbrush",
    component_sku: "8713",
    component_name: "Alfaparf Semi Di Lino Curls Low Shampoo 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20660",
    bundle_name:
      "Alfaparf Curls Shampoo & Conditioner Duo with FREE Detangling Hairbrush",
    component_sku: "8714",
    component_name: "Alfaparf Semi Di Lino Curls Enhancing Conditioner 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20661",
    bundle_name:
      "Alfaparf Blonde Shampoo & Conditioner Duo with FREE Detangling Hairbrush",
    component_sku: "11038",
    component_name: "Alfaparf Anti-Yellow Low Blonde Shampoo 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20661",
    bundle_name:
      "Alfaparf Blonde Shampoo & Conditioner Duo with FREE Detangling Hairbrush",
    component_sku: "11040",
    component_name: "Alfaparf Anti-Yellow Blonde Conditioner 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20661",
    bundle_name:
      "Alfaparf Blonde Shampoo & Conditioner Duo with FREE Detangling Hairbrush",
    component_sku: "20520",
    component_name: "BeautyFeatures Detangling Hairbrush",
    component_qty: 1,
  },
  {
    bundle_sku: "20662",
    bundle_name:
      "Alfaparf Brunette Shampoo & Conditioner Duo with FREE Detangling Hairbrush",
    component_sku: "11039",
    component_name: "Alfapaf Anti-Orange Low Brunette Shampoo 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20662",
    bundle_name:
      "Alfaparf Brunette Shampoo & Conditioner Duo with FREE Detangling Hairbrush",
    component_sku: "11041",
    component_name: "Alfaparf Brunette Conditioner 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20662",
    bundle_name:
      "Alfaparf Brunette Shampoo & Conditioner Duo with FREE Detangling Hairbrush",
    component_sku: "20520",
    component_name: "BeautyFeatures Detangling Hairbrush",
    component_qty: 1,
  },
  {
    bundle_sku: "20663",
    bundle_name:
      "Alfaparf Reconstruction Shampoo & Mask Duo with FREE Detangling Hairbrush",
    component_sku: "20520",
    component_name: "BeautyFeatures Detangling Hairbrush",
    component_qty: 1,
  },
  {
    bundle_sku: "20663",
    bundle_name:
      "Alfaparf Reconstruction Shampoo & Mask Duo with FREE Detangling Hairbrush",
    component_sku: "6465",
    component_name:
      "Alfaparf Semi Di Lino Reconstruction Reparative Low Shampoo 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20663",
    bundle_name:
      "Alfaparf Reconstruction Shampoo & Mask Duo with FREE Detangling Hairbrush",
    component_sku: "6466",
    component_name:
      "Alfaparf Semi Di Lino Reconstruction Reparative Mask 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20664",
    bundle_name:
      "Olaplex No. 4 Shampoo & No.5 Conditioner Duo with FREE Detangling Hairbrush",
    component_sku: "20520",
    component_name: "BeautyFeatures Detangling Hairbrush",
    component_qty: 1,
  },
  {
    bundle_sku: "20664",
    bundle_name:
      "Olaplex No. 4 Shampoo & No.5 Conditioner Duo with FREE Detangling Hairbrush",
    component_sku: "7179",
    component_name: "Olaplex No.4 Bond Maintenance Shampoo 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20664",
    bundle_name:
      "Olaplex No. 4 Shampoo & No.5 Conditioner Duo with FREE Detangling Hairbrush",
    component_sku: "7180",
    component_name: "Olaplex No.5 Bond Maintenance Conditioner 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20665",
    bundle_name:
      "Olaplex No.4P Blonde Shampoo & No.5P Blonde Conditioner with FREE Detangling Hairbrush",
    component_sku: "10490",
    component_name: "Olaplex No.4P Blonde Enhancer Toning Shampoo 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20665",
    bundle_name:
      "Olaplex No.4P Blonde Shampoo & No.5P Blonde Conditioner with FREE Detangling Hairbrush",
    component_sku: "13296",
    component_name: "Olaplex No.5P Blonde Enhancing Toning Conditioner",
    component_qty: 1,
  },
  {
    bundle_sku: "20665",
    bundle_name:
      "Olaplex No.4P Blonde Shampoo & No.5P Blonde Conditioner with FREE Detangling Hairbrush",
    component_sku: "20520",
    component_name: "BeautyFeatures Detangling Hairbrush",
    component_qty: 1,
  },
  {
    bundle_sku: "20666",
    bundle_name:
      "Moroccanoil Hydrating Shampoo & Conditioner Duo with FREE Detangling Hairbrush",
    component_sku: "20520",
    component_name: "BeautyFeatures Detangling Hairbrush",
    component_qty: 1,
  },
  {
    bundle_sku: "20666",
    bundle_name:
      "Moroccanoil Hydrating Shampoo & Conditioner Duo with FREE Detangling Hairbrush",
    component_sku: "MOR_MO0094",
    component_name: "Moroccanoil - Hydrating Shampoo 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20666",
    bundle_name:
      "Moroccanoil Hydrating Shampoo & Conditioner Duo with FREE Detangling Hairbrush",
    component_sku: "MOR_MO0096",
    component_name: "Moroccanoil - Hydrating Conditioner 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20667",
    bundle_name:
      "Moroccanoil Moisture Repair Shampoo & Conditioner Duo with FREE Detangling Hairbrush",
    component_sku: "20520",
    component_name: "BeautyFeatures Detangling Hairbrush",
    component_qty: 1,
  },
  {
    bundle_sku: "20667",
    bundle_name:
      "Moroccanoil Moisture Repair Shampoo & Conditioner Duo with FREE Detangling Hairbrush",
    component_sku: "MOR_MO0018",
    component_name: "Moroccanoil - Moisture Repair Shampoo 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20667",
    bundle_name:
      "Moroccanoil Moisture Repair Shampoo & Conditioner Duo with FREE Detangling Hairbrush",
    component_sku: "MOR_MO0020",
    component_name: "Moroccanoil Moisture Repair Conditioner 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20668",
    bundle_name:
      "Redken Extreme Shampoo & Conditioner Duo with FREE Detangling Hairbrush",
    component_sku: "20520",
    component_name: "BeautyFeatures Detangling Hairbrush",
    component_qty: 1,
  },
  {
    bundle_sku: "20668",
    bundle_name:
      "Redken Extreme Shampoo & Conditioner Duo with FREE Detangling Hairbrush",
    component_sku: "REDK_P027790",
    component_name: "Redken - Extreme Conditioner 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20668",
    bundle_name:
      "Redken Extreme Shampoo & Conditioner Duo with FREE Detangling Hairbrush",
    component_sku: "REDK_P027970",
    component_name: "Redken - Extreme Shampoo 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20669",
    bundle_name:
      "Kerastase Nutritive Shampoo & Conditioner Duo with FREE Detangling Hairbrush",
    component_sku: "13323",
    component_name: "Kérastase Nutritive Bain Satin Hydrating (Dry Hair) 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20669",
    bundle_name:
      "Kerastase Nutritive Shampoo & Conditioner Duo with FREE Detangling Hairbrush",
    component_sku: "20520",
    component_name: "BeautyFeatures Detangling Hairbrush",
    component_qty: 1,
  },
  {
    bundle_sku: "20669",
    bundle_name:
      "Kerastase Nutritive Shampoo & Conditioner Duo with FREE Detangling Hairbrush",
    component_sku: "KER_4401984",
    component_name: "Kerastase Nutritive Lait Vital 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20670",
    bundle_name:
      "Kerastase Blond Absolu Shampoo & Conditioner Duo with FREE Detangling Hairbrush",
    component_sku: "20520",
    component_name: "BeautyFeatures Detangling Hairbrush",
    component_qty: 1,
  },
  {
    bundle_sku: "20670",
    bundle_name:
      "Kerastase Blond Absolu Shampoo & Conditioner Duo with FREE Detangling Hairbrush",
    component_sku: "8775",
    component_name: "Kerastase Blond Absolu Bain Lumiére 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20670",
    bundle_name:
      "Kerastase Blond Absolu Shampoo & Conditioner Duo with FREE Detangling Hairbrush",
    component_sku: "8776",
    component_name: "Kerastase Blond Absolu Fondant Cicaflash 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20671",
    bundle_name:
      "Kerastase Genesis Shampoo & Conditioner Duo with FREE Detangling Hairbrush",
    component_sku: "20520",
    component_name: "BeautyFeatures Detangling Hairbrush",
    component_qty: 1,
  },
  {
    bundle_sku: "20671",
    bundle_name:
      "Kerastase Genesis Shampoo & Conditioner Duo with FREE Detangling Hairbrush",
    component_sku: "8779",
    component_name: "Kerastase Genesis Bain Hydra-Fortifiant 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20671",
    bundle_name:
      "Kerastase Genesis Shampoo & Conditioner Duo with FREE Detangling Hairbrush",
    component_sku: "8781",
    component_name: "Kerastase Genesis Fondant Renforçateur 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20672",
    bundle_name:
      "Alfaparf Density Shampoo & Conditioner Duo with FREE Micro Fibre Hair Towel",
    component_sku: "14050",
    component_name:
      "Alfaparf Semi Di Lino Density Thickening Low Shampoo 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20672",
    bundle_name:
      "Alfaparf Density Shampoo & Conditioner Duo with FREE Micro Fibre Hair Towel",
    component_sku: "14051",
    component_name:
      "Alfaparf Semi Di Lino Density Thickening Conditioner 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20672",
    bundle_name:
      "Alfaparf Density Shampoo & Conditioner Duo with FREE Micro Fibre Hair Towel",
    component_sku: "20519",
    component_name: "BeautyFeatures Microfibre Hair Towel",
    component_qty: 1,
  },
  {
    bundle_sku: "20673",
    bundle_name:
      "Alfaparf Diamond Shampoo & Conditioner Duo with FREE Micro Fibre Hair Towel",
    component_sku: "20519",
    component_name: "BeautyFeatures Microfibre Hair Towel",
    component_qty: 1,
  },
  {
    bundle_sku: "20673",
    bundle_name:
      "Alfaparf Diamond Shampoo & Conditioner Duo with FREE Micro Fibre Hair Towel",
    component_sku: "6474",
    component_name: "Alfaparf Semi Di Lino Diamond Illuminating Shampoo 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20673",
    bundle_name:
      "Alfaparf Diamond Shampoo & Conditioner Duo with FREE Micro Fibre Hair Towel",
    component_sku: "6475",
    component_name:
      "Alfaparf Semi Di Lino Diamond Illuminating Conditioner 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20674",
    bundle_name:
      "Alfaparf Moisture Shampoo & Conditioner Duo with FREE Micro Fibre Hair Towel",
    component_sku: "20519",
    component_name: "BeautyFeatures Microfibre Hair Towel",
    component_qty: 1,
  },
  {
    bundle_sku: "20674",
    bundle_name:
      "Alfaparf Moisture Shampoo & Conditioner Duo with FREE Micro Fibre Hair Towel",
    component_sku: "6469",
    component_name: "Alfaparf Semi Di Lino Moisture Nutritive Shampoo 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20674",
    bundle_name:
      "Alfaparf Moisture Shampoo & Conditioner Duo with FREE Micro Fibre Hair Towel",
    component_sku: "6471",
    component_name:
      "Alfaparf Semi Di Lino Moisture Nutritive Leave-In Conditioner 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20675",
    bundle_name:
      "Alfaparf Smooth Shampoo & Conditioner Duo with FREE Micro Fibre Hair Towel",
    component_sku: "20519",
    component_name: "BeautyFeatures Microfibre Hair Towel",
    component_qty: 1,
  },
  {
    bundle_sku: "20675",
    bundle_name:
      "Alfaparf Smooth Shampoo & Conditioner Duo with FREE Micro Fibre Hair Towel",
    component_sku: "9894",
    component_name: "Alfaparf Semi Di Lino Smooth Conditioner 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20675",
    bundle_name:
      "Alfaparf Smooth Shampoo & Conditioner Duo with FREE Micro Fibre Hair Towel",
    component_sku: "9899",
    component_name: "Alfaparf Semi Di Lino Smooth Shampoo 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20676",
    bundle_name:
      "Alfaparf Curls Shampoo & Conditioner Duo with FREE Micro Fibre Hair Towel",
    component_sku: "20519",
    component_name: "BeautyFeatures Microfibre Hair Towel",
    component_qty: 1,
  },
  {
    bundle_sku: "20676",
    bundle_name:
      "Alfaparf Curls Shampoo & Conditioner Duo with FREE Micro Fibre Hair Towel",
    component_sku: "8713",
    component_name: "Alfaparf Semi Di Lino Curls Low Shampoo 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20676",
    bundle_name:
      "Alfaparf Curls Shampoo & Conditioner Duo with FREE Micro Fibre Hair Towel",
    component_sku: "8714",
    component_name: "Alfaparf Semi Di Lino Curls Enhancing Conditioner 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20677",
    bundle_name:
      "Alfaparf Blonde Shampoo & Conditioner Duo with FREE Micro Fibre Hair Towel",
    component_sku: "11038",
    component_name: "Alfaparf Anti-Yellow Low Blonde Shampoo 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20677",
    bundle_name:
      "Alfaparf Blonde Shampoo & Conditioner Duo with FREE Micro Fibre Hair Towel",
    component_sku: "11040",
    component_name: "Alfaparf Anti-Yellow Blonde Conditioner 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20677",
    bundle_name:
      "Alfaparf Blonde Shampoo & Conditioner Duo with FREE Micro Fibre Hair Towel",
    component_sku: "20519",
    component_name: "BeautyFeatures Microfibre Hair Towel",
    component_qty: 1,
  },
  {
    bundle_sku: "20678",
    bundle_name:
      "Alfaparf Brunette Shampoo & Conditioner Duo with FREE Micro Fibre Hair Towel",
    component_sku: "11039",
    component_name: "Alfapaf Anti-Orange Low Brunette Shampoo 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20678",
    bundle_name:
      "Alfaparf Brunette Shampoo & Conditioner Duo with FREE Micro Fibre Hair Towel",
    component_sku: "11041",
    component_name: "Alfaparf Brunette Conditioner 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20678",
    bundle_name:
      "Alfaparf Brunette Shampoo & Conditioner Duo with FREE Micro Fibre Hair Towel",
    component_sku: "20519",
    component_name: "BeautyFeatures Microfibre Hair Towel",
    component_qty: 1,
  },
  {
    bundle_sku: "20679",
    bundle_name:
      "Alfaparf Reconstruction Shampoo & Mask Duo with FREE Micro Fibre Hair Towel",
    component_sku: "20519",
    component_name: "BeautyFeatures Microfibre Hair Towel",
    component_qty: 1,
  },
  {
    bundle_sku: "20679",
    bundle_name:
      "Alfaparf Reconstruction Shampoo & Mask Duo with FREE Micro Fibre Hair Towel",
    component_sku: "6465",
    component_name:
      "Alfaparf Semi Di Lino Reconstruction Reparative Low Shampoo 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20679",
    bundle_name:
      "Alfaparf Reconstruction Shampoo & Mask Duo with FREE Micro Fibre Hair Towel",
    component_sku: "6466",
    component_name:
      "Alfaparf Semi Di Lino Reconstruction Reparative Mask 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20680",
    bundle_name:
      "Olaplex No. 4 Shampoo & No.5 Conditioner Duo with FREE Micro Fibre Hair Towel",
    component_sku: "20519",
    component_name: "BeautyFeatures Microfibre Hair Towel",
    component_qty: 1,
  },
  {
    bundle_sku: "20680",
    bundle_name:
      "Olaplex No. 4 Shampoo & No.5 Conditioner Duo with FREE Micro Fibre Hair Towel",
    component_sku: "7179",
    component_name: "Olaplex No.4 Bond Maintenance Shampoo 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20680",
    bundle_name:
      "Olaplex No. 4 Shampoo & No.5 Conditioner Duo with FREE Micro Fibre Hair Towel",
    component_sku: "7180",
    component_name: "Olaplex No.5 Bond Maintenance Conditioner 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20681",
    bundle_name:
      "Olaplex No.4P Blonde Shampoo & No.5P Blonde Conditioner with FREE Micro Fibre Hair Towel",
    component_sku: "10490",
    component_name: "Olaplex No.4P Blonde Enhancer Toning Shampoo 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20681",
    bundle_name:
      "Olaplex No.4P Blonde Shampoo & No.5P Blonde Conditioner with FREE Micro Fibre Hair Towel",
    component_sku: "13296",
    component_name: "Olaplex No.5P Blonde Enhancing Toning Conditioner",
    component_qty: 1,
  },
  {
    bundle_sku: "20681",
    bundle_name:
      "Olaplex No.4P Blonde Shampoo & No.5P Blonde Conditioner with FREE Micro Fibre Hair Towel",
    component_sku: "20519",
    component_name: "BeautyFeatures Microfibre Hair Towel",
    component_qty: 1,
  },
  {
    bundle_sku: "20682",
    bundle_name:
      "Moroccanoil Hydrating Shampoo & Conditioner Duo with FREE Micro Fibre Hair Towel",
    component_sku: "20519",
    component_name: "BeautyFeatures Microfibre Hair Towel",
    component_qty: 1,
  },
  {
    bundle_sku: "20682",
    bundle_name:
      "Moroccanoil Hydrating Shampoo & Conditioner Duo with FREE Micro Fibre Hair Towel",
    component_sku: "MOR_MO0094",
    component_name: "Moroccanoil - Hydrating Shampoo 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20682",
    bundle_name:
      "Moroccanoil Hydrating Shampoo & Conditioner Duo with FREE Micro Fibre Hair Towel",
    component_sku: "MOR_MO0096",
    component_name: "Moroccanoil - Hydrating Conditioner 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20683",
    bundle_name:
      "Moroccanoil Moisture Repair Shampoo & Conditioner Duo with FREE Micro Fibre Hair Towel",
    component_sku: "20519",
    component_name: "BeautyFeatures Microfibre Hair Towel",
    component_qty: 1,
  },
  {
    bundle_sku: "20683",
    bundle_name:
      "Moroccanoil Moisture Repair Shampoo & Conditioner Duo with FREE Micro Fibre Hair Towel",
    component_sku: "MOR_MO0018",
    component_name: "Moroccanoil - Moisture Repair Shampoo 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20683",
    bundle_name:
      "Moroccanoil Moisture Repair Shampoo & Conditioner Duo with FREE Micro Fibre Hair Towel",
    component_sku: "MOR_MO0020",
    component_name: "Moroccanoil Moisture Repair Conditioner 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20684",
    bundle_name:
      "Redken Extreme Shampoo & Conditioner Duo with FREE Micro Fibre Hair Towel",
    component_sku: "20519",
    component_name: "BeautyFeatures Microfibre Hair Towel",
    component_qty: 1,
  },
  {
    bundle_sku: "20684",
    bundle_name:
      "Redken Extreme Shampoo & Conditioner Duo with FREE Micro Fibre Hair Towel",
    component_sku: "REDK_P027790",
    component_name: "Redken - Extreme Conditioner 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20684",
    bundle_name:
      "Redken Extreme Shampoo & Conditioner Duo with FREE Micro Fibre Hair Towel",
    component_sku: "REDK_P027970",
    component_name: "Redken - Extreme Shampoo 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20685",
    bundle_name:
      "Kerastase Nutritive Shampoo & Conditioner Duo with FREE Micro Fibre Hair Towel",
    component_sku: "13323",
    component_name: "Kérastase Nutritive Bain Satin Hydrating (Dry Hair) 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20685",
    bundle_name:
      "Kerastase Nutritive Shampoo & Conditioner Duo with FREE Micro Fibre Hair Towel",
    component_sku: "20519",
    component_name: "BeautyFeatures Microfibre Hair Towel",
    component_qty: 1,
  },
  {
    bundle_sku: "20685",
    bundle_name:
      "Kerastase Nutritive Shampoo & Conditioner Duo with FREE Micro Fibre Hair Towel",
    component_sku: "KER_4401984",
    component_name: "Kerastase Nutritive Lait Vital 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20686",
    bundle_name:
      "Kerastase Blond Absolu Shampoo & Conditioner Duo with FREE Micro Fibre Hair Towel",
    component_sku: "20519",
    component_name: "BeautyFeatures Microfibre Hair Towel",
    component_qty: 1,
  },
  {
    bundle_sku: "20686",
    bundle_name:
      "Kerastase Blond Absolu Shampoo & Conditioner Duo with FREE Micro Fibre Hair Towel",
    component_sku: "8775",
    component_name: "Kerastase Blond Absolu Bain Lumiére 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20686",
    bundle_name:
      "Kerastase Blond Absolu Shampoo & Conditioner Duo with FREE Micro Fibre Hair Towel",
    component_sku: "8776",
    component_name: "Kerastase Blond Absolu Fondant Cicaflash 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20687",
    bundle_name:
      "Kerastase Genesis Shampoo & Conditioner Duo with FREE Micro Fibre Hair Towel",
    component_sku: "20519",
    component_name: "BeautyFeatures Microfibre Hair Towel",
    component_qty: 1,
  },
  {
    bundle_sku: "20687",
    bundle_name:
      "Kerastase Genesis Shampoo & Conditioner Duo with FREE Micro Fibre Hair Towel",
    component_sku: "8779",
    component_name: "Kerastase Genesis Bain Hydra-Fortifiant 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20687",
    bundle_name:
      "Kerastase Genesis Shampoo & Conditioner Duo with FREE Micro Fibre Hair Towel",
    component_sku: "8781",
    component_name: "Kerastase Genesis Fondant Renforçateur 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20712",
    bundle_name: "BeautyFeatures Blonde Discovery Beauty Box",
    component_sku: "12274",
    component_name: "Kerastase Blond Cicaflash Deluxe 30ml​ GWP",
    component_qty: 1,
  },
  {
    bundle_sku: "20712",
    bundle_name: "BeautyFeatures Blonde Discovery Beauty Box",
    component_sku: "12276",
    component_name: "Kerastase Blond Huile Deluxe 15ml​ GWP",
    component_qty: 1,
  },
  {
    bundle_sku: "20712",
    bundle_name: "BeautyFeatures Blonde Discovery Beauty Box",
    component_sku: "12280",
    component_name: "Kerastase Huile Cicaextreme 50ml GWP",
    component_qty: 1,
  },
  {
    bundle_sku: "20712",
    bundle_name: "BeautyFeatures Blonde Discovery Beauty Box",
    component_sku: "12281",
    component_name: "Kerastase Bain Lumiere 80ml​ GWP",
    component_qty: 1,
  },
  {
    bundle_sku: "20712",
    bundle_name: "BeautyFeatures Blonde Discovery Beauty Box",
    component_sku: "20510",
    component_name: "Beauty Box Regular Sleeve",
    component_qty: 1,
  },
  {
    bundle_sku: "20712",
    bundle_name: "BeautyFeatures Blonde Discovery Beauty Box",
    component_sku: "20520",
    component_name: "BeautyFeatures Detangling Hairbrush",
    component_qty: 1,
  },
  {
    bundle_sku: "20713",
    bundle_name: "BeautyFeatures Colour Treated Hair Discovery Beauty Box",
    component_sku: "12277",
    component_name: "Kerastase Chroma Absolu Fluide Deluxe 15ml​ GWP",
    component_qty: 1,
  },
  {
    bundle_sku: "20713",
    bundle_name: "BeautyFeatures Colour Treated Hair Discovery Beauty Box",
    component_sku: "12278",
    component_name: "Kerastase Chroma Absolu Masque Deluxe 30ml​ GWP",
    component_qty: 1,
  },
  {
    bundle_sku: "20713",
    bundle_name: "BeautyFeatures Colour Treated Hair Discovery Beauty Box",
    component_sku: "12279",
    component_name: "Kerastase Chroma Absolu Bain Riche Deluxe 30ml​ GWP",
    component_qty: 1,
  },
  {
    bundle_sku: "20713",
    bundle_name: "BeautyFeatures Colour Treated Hair Discovery Beauty Box",
    component_sku: "20295",
    component_name: "Large Black Box",
    component_qty: 1,
  },
  {
    bundle_sku: "20713",
    bundle_name: "BeautyFeatures Colour Treated Hair Discovery Beauty Box",
    component_sku: "20511",
    component_name: "Beauty Box Large Sleeve",
    component_qty: 1,
  },
  {
    bundle_sku: "20713",
    bundle_name: "BeautyFeatures Colour Treated Hair Discovery Beauty Box",
    component_sku: "20520",
    component_name: "BeautyFeatures Detangling Hairbrush",
    component_qty: 1,
  },
  {
    bundle_sku: "20713",
    bundle_name: "BeautyFeatures Colour Treated Hair Discovery Beauty Box",
    component_sku: "20928",
    component_name:
      "L'Oreal Professionnel Vitmino Color Spectrum Mask 75ml GWP",
    component_qty: 1,
  },
  {
    bundle_sku: "20715",
    bundle_name: "BeautyFeatures The Hard Water Hair Discovery Beauty Box",
    component_sku: "20295",
    component_name: "Large Black Box",
    component_qty: 1,
  },
  {
    bundle_sku: "20715",
    bundle_name: "BeautyFeatures The Hard Water Hair Discovery Beauty Box",
    component_sku: "20511",
    component_name: "Beauty Box Large Sleeve",
    component_qty: 1,
  },
  {
    bundle_sku: "20715",
    bundle_name: "BeautyFeatures The Hard Water Hair Discovery Beauty Box",
    component_sku: "20520",
    component_name: "BeautyFeatures Detangling Hairbrush",
    component_qty: 1,
  },
  {
    bundle_sku: "20716",
    bundle_name: "BeautyFeatures The Cleanse & Glow Box",
    component_sku: "11417A",
    component_name: "Pestle & Mortar Glow Drops 30ml GWP",
    component_qty: 1,
  },
  {
    bundle_sku: "20716",
    bundle_name: "BeautyFeatures The Cleanse & Glow Box",
    component_sku: "12269",
    component_name:
      "Kerastase Nutritive 8H Magic Night Repair Deluxe 30ml​ GWP",
    component_qty: 1,
  },
  {
    bundle_sku: "20716",
    bundle_name: "BeautyFeatures The Cleanse & Glow Box",
    component_sku: "12290",
    component_name: "Redken All Soft Conditioner GWP",
    component_qty: 1,
  },
  {
    bundle_sku: "20716",
    bundle_name: "BeautyFeatures The Cleanse & Glow Box",
    component_sku: "13405",
    component_name: "Elemis Pro-Collagen Cleansing Balm 100g",
    component_qty: 1,
  },
  {
    bundle_sku: "20716",
    bundle_name: "BeautyFeatures The Cleanse & Glow Box",
    component_sku: "20295",
    component_name: "Large Black Box",
    component_qty: 1,
  },
  {
    bundle_sku: "20716",
    bundle_name: "BeautyFeatures The Cleanse & Glow Box",
    component_sku: "20511",
    component_name: "Beauty Box Large Sleeve",
    component_qty: 1,
  },
  {
    bundle_sku: "20716",
    bundle_name: "BeautyFeatures The Cleanse & Glow Box",
    component_sku: "20517",
    component_name:
      "BeautyFeatures Resuable Bamboo Fibre Cleansing Mitts - 2 Pack",
    component_qty: 1,
  },
  {
    bundle_sku: "20716",
    bundle_name: "BeautyFeatures The Cleanse & Glow Box",
    component_sku: "20520",
    component_name: "BeautyFeatures Detangling Hairbrush",
    component_qty: 1,
  },
  {
    bundle_sku: "20725",
    bundle_name: "L'Oréal Professionnel Steampod 3.0 MEGA Bundle",
    component_sku: "12153",
    component_name: "Redken Acidic Bonding Concentrate Shampoo 50ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20725",
    bundle_name: "L'Oréal Professionnel Steampod 3.0 MEGA Bundle",
    component_sku: "12272",
    component_name:
      "Kerastase Resistance Masque Force Architecte Deluxe 30ml​ GWP",
    component_qty: 1,
  },
  {
    bundle_sku: "20725",
    bundle_name: "L'Oréal Professionnel Steampod 3.0 MEGA Bundle",
    component_sku: "12273",
    component_name:
      "Kerastase Resistance Bain Force Architecte Deluxe 30ml​ GWP",
    component_qty: 1,
  },
  {
    bundle_sku: "20725",
    bundle_name: "L'Oréal Professionnel Steampod 3.0 MEGA Bundle",
    component_sku: "20520",
    component_name: "BeautyFeatures Detangling Hairbrush",
    component_qty: 1,
  },
  {
    bundle_sku: "20725",
    bundle_name: "L'Oréal Professionnel Steampod 3.0 MEGA Bundle",
    component_sku: "9631",
    component_name: "L'Oreal Steampod V3 White",
    component_qty: 1,
  },
  {
    bundle_sku: "20726",
    bundle_name: "L'Oréal Professionnel Steampod 4.0 MEGA Bundle",
    component_sku: "12109",
    component_name: "L'Oreal Professionnel Steampod 4.0",
    component_qty: 1,
  },
  {
    bundle_sku: "20726",
    bundle_name: "L'Oréal Professionnel Steampod 4.0 MEGA Bundle",
    component_sku: "12153",
    component_name: "Redken Acidic Bonding Concentrate Shampoo 50ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20726",
    bundle_name: "L'Oréal Professionnel Steampod 4.0 MEGA Bundle",
    component_sku: "12272",
    component_name:
      "Kerastase Resistance Masque Force Architecte Deluxe 30ml​ GWP",
    component_qty: 1,
  },
  {
    bundle_sku: "20726",
    bundle_name: "L'Oréal Professionnel Steampod 4.0 MEGA Bundle",
    component_sku: "12273",
    component_name:
      "Kerastase Resistance Bain Force Architecte Deluxe 30ml​ GWP",
    component_qty: 1,
  },
  {
    bundle_sku: "20726",
    bundle_name: "L'Oréal Professionnel Steampod 4.0 MEGA Bundle",
    component_sku: "20520",
    component_name: "BeautyFeatures Detangling Hairbrush",
    component_qty: 1,
  },
  {
    bundle_sku: "20821",
    bundle_name: "Kerastase Gloss Absolu Bundle - The Full Routine",
    component_sku: "20805",
    component_name: "Kerastase Gloss Absolu Bain Hydra Glaze Shampoo 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20821",
    bundle_name: "Kerastase Gloss Absolu Bundle - The Full Routine",
    component_sku: "20808",
    component_name: "Kerastase Gloss Absolu Insta Glaze Conditioner 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20821",
    bundle_name: "Kerastase Gloss Absolu Bundle - The Full Routine",
    component_sku: "20809",
    component_name:
      "Kerastase Gloss Absolu Anti-Frizz Glaze Milk All In 1 Spray 190ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20821",
    bundle_name: "Kerastase Gloss Absolu Bundle - The Full Routine",
    component_sku: "20810",
    component_name: "Kerastase Gloss Absolu Glaze Drops Hair Oil 45ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20822",
    bundle_name:
      "Kerastase Gloss Absolu Shampoo, Conditioner & Leave in Spray Bundle",
    component_sku: "20805",
    component_name: "Kerastase Gloss Absolu Bain Hydra Glaze Shampoo 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20822",
    bundle_name:
      "Kerastase Gloss Absolu Shampoo, Conditioner & Leave in Spray Bundle",
    component_sku: "20808",
    component_name: "Kerastase Gloss Absolu Insta Glaze Conditioner 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20822",
    bundle_name:
      "Kerastase Gloss Absolu Shampoo, Conditioner & Leave in Spray Bundle",
    component_sku: "20809",
    component_name:
      "Kerastase Gloss Absolu Anti-Frizz Glaze Milk All In 1 Spray 190ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20823",
    bundle_name:
      "Kerastase Gloss Absolu Shampoo, Conditioner & Hair Oil Bundle",
    component_sku: "20805",
    component_name: "Kerastase Gloss Absolu Bain Hydra Glaze Shampoo 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20823",
    bundle_name:
      "Kerastase Gloss Absolu Shampoo, Conditioner & Hair Oil Bundle",
    component_sku: "20808",
    component_name: "Kerastase Gloss Absolu Insta Glaze Conditioner 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20823",
    bundle_name:
      "Kerastase Gloss Absolu Shampoo, Conditioner & Hair Oil Bundle",
    component_sku: "20810",
    component_name: "Kerastase Gloss Absolu Glaze Drops Hair Oil 45ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20824",
    bundle_name: "Kerastase Gloss Absolu Shampoo & Conditioner Duo",
    component_sku: "20805",
    component_name: "Kerastase Gloss Absolu Bain Hydra Glaze Shampoo 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20824",
    bundle_name: "Kerastase Gloss Absolu Shampoo & Conditioner Duo",
    component_sku: "20808",
    component_name: "Kerastase Gloss Absolu Insta Glaze Conditioner 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20825",
    bundle_name:
      "L'Oréal Professionnel Vitamino Color Spectrum Shampoo & Mask Duo",
    component_sku: "20814",
    component_name:
      "L'Oréal Professionnel Vitamino Color Spectrum Rinse Off Hair Mask 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20825",
    bundle_name:
      "L'Oréal Professionnel Vitamino Color Spectrum Shampoo & Mask Duo",
    component_sku: "20819",
    component_name:
      "L'Oréal Professionnel Vitamino Color Spectrum Shampoo 500ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20826",
    bundle_name:
      "L'Oréal Professionnel Vitamino Color Spectrum Shampoo, Mask & Serum Bundle",
    component_sku: "20813",
    component_name:
      "L'Oréal Professionnel Vitamino Color Spectrum Shampoo 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20826",
    bundle_name:
      "L'Oréal Professionnel Vitamino Color Spectrum Shampoo, Mask & Serum Bundle",
    component_sku: "20814",
    component_name:
      "L'Oréal Professionnel Vitamino Color Spectrum Rinse Off Hair Mask 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20826",
    bundle_name:
      "L'Oréal Professionnel Vitamino Color Spectrum Shampoo, Mask & Serum Bundle",
    component_sku: "20815",
    component_name:
      "L'Oréal Professionnel Vitamino Color Spectrum Glass Shine Serum 50ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20827",
    bundle_name:
      "L'Oréal Professionnel Vitamino Color Spectrum Shampoo 300ml & Refill Pack",
    component_sku: "20813",
    component_name:
      "L'Oréal Professionnel Vitamino Color Spectrum Shampoo 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20827",
    bundle_name:
      "L'Oréal Professionnel Vitamino Color Spectrum Shampoo 300ml & Refill Pack",
    component_sku: "20820",
    component_name:
      "L'Oréal Professionnel Vitamino Color Spectrum Shampoo Refill Pack 500ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20828",
    bundle_name:
      "L'Oréal Professionnel Vitamino Color Spectrum Shampoo 500ml & Refill Pack",
    component_sku: "20819",
    component_name:
      "L'Oréal Professionnel Vitamino Color Spectrum Shampoo 500ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20828",
    bundle_name:
      "L'Oréal Professionnel Vitamino Color Spectrum Shampoo 500ml & Refill Pack",
    component_sku: "20820",
    component_name:
      "L'Oréal Professionnel Vitamino Color Spectrum Shampoo Refill Pack 500ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20836",
    bundle_name: "Kérastase Gloss Absolu Shampoo Duo",
    component_sku: "20805",
    component_name: "Kerastase Gloss Absolu Bain Hydra Glaze Shampoo 250ml",
    component_qty: 2,
  },
  {
    bundle_sku: "20837",
    bundle_name: "Kérastase Gloss Absolu Conditioner Duo",
    component_sku: "20808",
    component_name: "Kerastase Gloss Absolu Insta Glaze Conditioner 250ml",
    component_qty: 2,
  },
  {
    bundle_sku: "20838",
    bundle_name:
      "Alfaparf Moisture Gift Set with FREE BeautyFeatures Detangling Hairbrush",
    component_sku: "20520",
    component_name: "BeautyFeatures Detangling Hairbrush",
    component_qty: 1,
  },
  {
    bundle_sku: "20838",
    bundle_name:
      "Alfaparf Moisture Gift Set with FREE BeautyFeatures Detangling Hairbrush",
    component_sku: "20646",
    component_name: "Alfaparf Semi Di Lino Moisture Christmas Gift Set 2024",
    component_qty: 1,
  },
  {
    bundle_sku: "20839",
    bundle_name:
      "Alfaparf Diamond Gift Set with FREE BeautyFeatures Detangling Hairbrush",
    component_sku: "20520",
    component_name: "BeautyFeatures Detangling Hairbrush",
    component_qty: 1,
  },
  {
    bundle_sku: "20839",
    bundle_name:
      "Alfaparf Diamond Gift Set with FREE BeautyFeatures Detangling Hairbrush",
    component_sku: "20647",
    component_name: "Alfaparf Semi Di Lino Diamond Christmas Gift Set 2024",
    component_qty: 1,
  },
  {
    bundle_sku: "20840",
    bundle_name:
      "Alfaparf Density Gift Set with FREE BeautyFeatures Detangling Hairbrush",
    component_sku: "20520",
    component_name: "BeautyFeatures Detangling Hairbrush",
    component_qty: 1,
  },
  {
    bundle_sku: "20840",
    bundle_name:
      "Alfaparf Density Gift Set with FREE BeautyFeatures Detangling Hairbrush",
    component_sku: "20648",
    component_name: "Alfaparf Semi Di Lino Density Christmas Gift Set 2025",
    component_qty: 1,
  },
  {
    bundle_sku: "20841",
    bundle_name:
      "Alfaparf Reconstruction Gift Set with FREE BeautyFeatures Detangling Hairbrush",
    component_sku: "20520",
    component_name: "BeautyFeatures Detangling Hairbrush",
    component_qty: 1,
  },
  {
    bundle_sku: "20841",
    bundle_name:
      "Alfaparf Reconstruction Gift Set with FREE BeautyFeatures Detangling Hairbrush",
    component_sku: "20649",
    component_name:
      "Alfaparf Semi Di Lino Reconstruction Christmas Gift Set 2024",
    component_qty: 1,
  },
  {
    bundle_sku: "20844",
    bundle_name: "Kerastase Resistance Shampoo & Conditioner Duo",
    component_sku: "KER_E046500",
    component_name: "Kerastase Resistance Ciment Anti Usure 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20844",
    bundle_name: "Kerastase Resistance Shampoo & Conditioner Duo",
    component_sku: "KER_E057430",
    component_name: "Kerastase Bain De Force Architecte 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20845",
    bundle_name: "Kerastase Resistance Shampoo, Conditioner & Mask Trio",
    component_sku: "KER_E029600",
    component_name: "Kerastase Masque Force Architecte 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20845",
    bundle_name: "Kerastase Resistance Shampoo, Conditioner & Mask Trio",
    component_sku: "KER_E046500",
    component_name: "Kerastase Resistance Ciment Anti Usure 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20845",
    bundle_name: "Kerastase Resistance Shampoo, Conditioner & Mask Trio",
    component_sku: "KER_E057430",
    component_name: "Kerastase Bain De Force Architecte 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20846",
    bundle_name: "Kerastase Resistance Bundle - The Full Routine",
    component_sku: "KER_4402020",
    component_name: "Kerastase  Resistance Ciment Thermique 150ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20846",
    bundle_name: "Kerastase Resistance Bundle - The Full Routine",
    component_sku: "KER_E029600",
    component_name: "Kerastase Masque Force Architecte 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20846",
    bundle_name: "Kerastase Resistance Bundle - The Full Routine",
    component_sku: "KER_E046500",
    component_name: "Kerastase Resistance Ciment Anti Usure 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20846",
    bundle_name: "Kerastase Resistance Bundle - The Full Routine",
    component_sku: "KER_E057430",
    component_name: "Kerastase Bain De Force Architecte 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20847",
    bundle_name: "Kerastase Resistance Bain Force Architecte Shampoo 250ml Duo",
    component_sku: "KER_E057430",
    component_name: "Kerastase Bain De Force Architecte 250ml",
    component_qty: 2,
  },
  {
    bundle_sku: "20848",
    bundle_name:
      "Kerastase Resistance Shampoo & Conditioner Duo With FREE BeautyFeatures Detangling Hairbrush",
    component_sku: "20520",
    component_name: "BeautyFeatures Detangling Hairbrush",
    component_qty: 1,
  },
  {
    bundle_sku: "20848",
    bundle_name:
      "Kerastase Resistance Shampoo & Conditioner Duo With FREE BeautyFeatures Detangling Hairbrush",
    component_sku: "KER_E046500",
    component_name: "Kerastase Resistance Ciment Anti Usure 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20848",
    bundle_name:
      "Kerastase Resistance Shampoo & Conditioner Duo With FREE BeautyFeatures Detangling Hairbrush",
    component_sku: "KER_E057430",
    component_name: "Kerastase Bain De Force Architecte 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20849",
    bundle_name:
      "Kerastase Resistance Shampoo, Conditioner & Mask Trio With FREE BeautyFeatures Hair Towel",
    component_sku: "20519",
    component_name: "BeautyFeatures Microfibre Hair Towel",
    component_qty: 1,
  },
  {
    bundle_sku: "20849",
    bundle_name:
      "Kerastase Resistance Shampoo, Conditioner & Mask Trio With FREE BeautyFeatures Hair Towel",
    component_sku: "KER_E029600",
    component_name: "Kerastase Masque Force Architecte 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20849",
    bundle_name:
      "Kerastase Resistance Shampoo, Conditioner & Mask Trio With FREE BeautyFeatures Hair Towel",
    component_sku: "KER_E046500",
    component_name: "Kerastase Resistance Ciment Anti Usure 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20849",
    bundle_name:
      "Kerastase Resistance Shampoo, Conditioner & Mask Trio With FREE BeautyFeatures Hair Towel",
    component_sku: "KER_E057430",
    component_name: "Kerastase Bain De Force Architecte 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20850",
    bundle_name:
      "Kerastase Premiere Pre-Shampoo, Shampoo, Conditioner & Mask Bundle",
    component_sku: "14035",
    component_name:
      "Kérastase Première Decalcifying Repairing Pre-Shampoo Treatment 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20850",
    bundle_name:
      "Kerastase Premiere Pre-Shampoo, Shampoo, Conditioner & Mask Bundle",
    component_sku: "14036",
    component_name:
      "Kérastase Première Decalcifying System Reparative Shampoo 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20850",
    bundle_name:
      "Kerastase Premiere Pre-Shampoo, Shampoo, Conditioner & Mask Bundle",
    component_sku: "14037",
    component_name:
      "Kérastase Première Anti-Rigidity Decalcifying Repairing Conditioner 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20850",
    bundle_name:
      "Kerastase Premiere Pre-Shampoo, Shampoo, Conditioner & Mask Bundle",
    component_sku: "14038",
    component_name:
      "Kérastase Première Anti-Breakage Reparative Filler Mask 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20851",
    bundle_name:
      "Kerastase Premiere Pre-Shampoo, Shampoo, Conditioner & Mask Bundle With FREE Hair Towel",
    component_sku: "14035",
    component_name:
      "Kérastase Première Decalcifying Repairing Pre-Shampoo Treatment 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20851",
    bundle_name:
      "Kerastase Premiere Pre-Shampoo, Shampoo, Conditioner & Mask Bundle With FREE Hair Towel",
    component_sku: "14036",
    component_name:
      "Kérastase Première Decalcifying System Reparative Shampoo 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20851",
    bundle_name:
      "Kerastase Premiere Pre-Shampoo, Shampoo, Conditioner & Mask Bundle With FREE Hair Towel",
    component_sku: "14037",
    component_name:
      "Kérastase Première Anti-Rigidity Decalcifying Repairing Conditioner 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20851",
    bundle_name:
      "Kerastase Premiere Pre-Shampoo, Shampoo, Conditioner & Mask Bundle With FREE Hair Towel",
    component_sku: "14038",
    component_name:
      "Kérastase Première Anti-Breakage Reparative Filler Mask 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20851",
    bundle_name:
      "Kerastase Premiere Pre-Shampoo, Shampoo, Conditioner & Mask Bundle With FREE Hair Towel",
    component_sku: "20519",
    component_name: "BeautyFeatures Microfibre Hair Towel",
    component_qty: 1,
  },
  {
    bundle_sku: "20852",
    bundle_name: "Kerastase Premiere Pre Shampoo, Shampoo & Mask Bundle",
    component_sku: "14035",
    component_name:
      "Kérastase Première Decalcifying Repairing Pre-Shampoo Treatment 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20852",
    bundle_name: "Kerastase Premiere Pre Shampoo, Shampoo & Mask Bundle",
    component_sku: "14036",
    component_name:
      "Kérastase Première Decalcifying System Reparative Shampoo 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20852",
    bundle_name: "Kerastase Premiere Pre Shampoo, Shampoo & Mask Bundle",
    component_sku: "14038",
    component_name:
      "Kérastase Première Anti-Breakage Reparative Filler Mask 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20853",
    bundle_name: "Kerastase Premiere Shampoo, Conditioner & Repairing Oil Trio",
    component_sku: "14036",
    component_name:
      "Kérastase Première Decalcifying System Reparative Shampoo 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20853",
    bundle_name: "Kerastase Premiere Shampoo, Conditioner & Repairing Oil Trio",
    component_sku: "14037",
    component_name:
      "Kérastase Première Anti-Rigidity Decalcifying Repairing Conditioner 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20853",
    bundle_name: "Kerastase Premiere Shampoo, Conditioner & Repairing Oil Trio",
    component_sku: "14040",
    component_name: "Kérastase Première Intensive Shine Repairing Oil 30ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20854",
    bundle_name:
      "Kérastase Première Decalcifying System Reparative Shampoo 250ml Duo",
    component_sku: "14036",
    component_name:
      "Kérastase Première Decalcifying System Reparative Shampoo 250ml",
    component_qty: 2,
  },
  {
    bundle_sku: "20855",
    bundle_name:
      "Kérastase Première Shampoo & Condtioner Duo With FREE BeautyFeatures Detangling Hairbrush",
    component_sku: "14036",
    component_name:
      "Kérastase Première Decalcifying System Reparative Shampoo 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20855",
    bundle_name:
      "Kérastase Première Shampoo & Condtioner Duo With FREE BeautyFeatures Detangling Hairbrush",
    component_sku: "14037",
    component_name:
      "Kérastase Première Anti-Rigidity Decalcifying Repairing Conditioner 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20855",
    bundle_name:
      "Kérastase Première Shampoo & Condtioner Duo With FREE BeautyFeatures Detangling Hairbrush",
    component_sku: "20520",
    component_name: "BeautyFeatures Detangling Hairbrush",
    component_qty: 1,
  },
  {
    bundle_sku: "20856",
    bundle_name: "Kérastase Première Condtioner Duo Pack",
    component_sku: "14037",
    component_name:
      "Kérastase Première Anti-Rigidity Decalcifying Repairing Conditioner 200ml",
    component_qty: 2,
  },
  {
    bundle_sku: "20857",
    bundle_name: "Kerastase Genesis Homme Thickness Boosting Shampoo 250ml Duo",
    component_sku: "11375",
    component_name:
      "Kerastase Genesis Homme Thickness Boosting Shampoo - 250ml",
    component_qty: 2,
  },
  {
    bundle_sku: "20858",
    bundle_name: "Kérastase Symbiose Shampoo, Conditioner & Mask Trio",
    component_sku: "12257",
    component_name:
      "Kérastase Symbiose Moisturising Anti-Dandruff Cellular Shampoo 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20858",
    bundle_name: "Kérastase Symbiose Shampoo, Conditioner & Mask Trio",
    component_sku: "12258",
    component_name:
      "Kérastase Symbiose Detangling Soothing Cellular Conditioner 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20858",
    bundle_name: "Kérastase Symbiose Shampoo, Conditioner & Mask Trio",
    component_sku: "12259",
    component_name: "Kérastase Symbiose Masque Intense Revitalising Mask 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20859",
    bundle_name:
      "Kérastase Symbiose Shampoo, Conditioner & Mask Trio With FREE Hair Towel",
    component_sku: "12257",
    component_name:
      "Kérastase Symbiose Moisturising Anti-Dandruff Cellular Shampoo 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20859",
    bundle_name:
      "Kérastase Symbiose Shampoo, Conditioner & Mask Trio With FREE Hair Towel",
    component_sku: "12258",
    component_name:
      "Kérastase Symbiose Detangling Soothing Cellular Conditioner 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20859",
    bundle_name:
      "Kérastase Symbiose Shampoo, Conditioner & Mask Trio With FREE Hair Towel",
    component_sku: "12259",
    component_name: "Kérastase Symbiose Masque Intense Revitalising Mask 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20859",
    bundle_name:
      "Kérastase Symbiose Shampoo, Conditioner & Mask Trio With FREE Hair Towel",
    component_sku: "20519",
    component_name: "BeautyFeatures Microfibre Hair Towel",
    component_qty: 1,
  },
  {
    bundle_sku: "20860",
    bundle_name:
      "Kérastase Symbiose Shampoo & Conditioner With FREE BeautyFeatures Detangling Hairbrush",
    component_sku: "12257",
    component_name:
      "Kérastase Symbiose Moisturising Anti-Dandruff Cellular Shampoo 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20860",
    bundle_name:
      "Kérastase Symbiose Shampoo & Conditioner With FREE BeautyFeatures Detangling Hairbrush",
    component_sku: "12258",
    component_name:
      "Kérastase Symbiose Detangling Soothing Cellular Conditioner 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20860",
    bundle_name:
      "Kérastase Symbiose Shampoo & Conditioner With FREE BeautyFeatures Detangling Hairbrush",
    component_sku: "20520",
    component_name: "BeautyFeatures Detangling Hairbrush",
    component_qty: 1,
  },
  {
    bundle_sku: "20861",
    bundle_name:
      "Kérastase Symbiose Moisturising Anti-Dandruff Cellular Shampoo 250ml Duo",
    component_sku: "12257",
    component_name:
      "Kérastase Symbiose Moisturising Anti-Dandruff Cellular Shampoo 250ml",
    component_qty: 2,
  },
  {
    bundle_sku: "20862",
    bundle_name:
      "Elemis Radiance Renewal Cleansing Bundle with FREE Cleansing Mitts",
    component_sku: "13387",
    component_name: "Elemis Superfood Blackcurrant Jelly Exfoliator 50ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20862",
    bundle_name:
      "Elemis Radiance Renewal Cleansing Bundle with FREE Cleansing Mitts",
    component_sku: "13405",
    component_name: "Elemis Pro-Collagen Cleansing Balm 100g",
    component_qty: 1,
  },
  {
    bundle_sku: "20862",
    bundle_name:
      "Elemis Radiance Renewal Cleansing Bundle with FREE Cleansing Mitts",
    component_sku: "20517",
    component_name:
      "BeautyFeatures Resuable Bamboo Fibre Cleansing Mitts - 2 Pack",
    component_qty: 1,
  },
  {
    bundle_sku: "20863",
    bundle_name: "Elemis Collagen Boost Bundle with FREE Cleansing Mitts",
    component_sku: "13406",
    component_name: "Elemis Pro-Collagen Super Serum Elixir 15ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20863",
    bundle_name: "Elemis Collagen Boost Bundle with FREE Cleansing Mitts",
    component_sku: "13413",
    component_name: "Elemis Pro-Collagen Naked Cleansing Balm 100g",
    component_qty: 1,
  },
  {
    bundle_sku: "20863",
    bundle_name: "Elemis Collagen Boost Bundle with FREE Cleansing Mitts",
    component_sku: "20517",
    component_name:
      "BeautyFeatures Resuable Bamboo Fibre Cleansing Mitts - 2 Pack",
    component_qty: 1,
  },
  {
    bundle_sku: "20864",
    bundle_name:
      "Dermalogica Skin Renewing Duo With FREE Cleansing Pads & Cuffs",
    component_sku: "110631",
    component_name: "Dermalogica Skin Smoothing Cream 100ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20864",
    bundle_name:
      "Dermalogica Skin Renewing Duo With FREE Cleansing Pads & Cuffs",
    component_sku: "20516",
    component_name:
      "BeautyFeatures Reusable Premium Cleansing Pads with Cuffs - 3 Pack",
    component_qty: 1,
  },
  {
    bundle_sku: "20864",
    bundle_name:
      "Dermalogica Skin Renewing Duo With FREE Cleansing Pads & Cuffs",
    component_sku: "7215",
    component_name: "Dermalogica Intensive Moisture Cleanser 150ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20865",
    bundle_name:
      "Dermalogica Oil Be Gone Bundle With FREE Cleansing Pads & Cuffs",
    component_sku: "110700",
    component_name: "Dermalogica Daily Microfoliant 74g",
    component_qty: 1,
  },
  {
    bundle_sku: "20865",
    bundle_name:
      "Dermalogica Oil Be Gone Bundle With FREE Cleansing Pads & Cuffs",
    component_sku: "111598",
    component_name: "Dermalogica Active Moist 100ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20865",
    bundle_name:
      "Dermalogica Oil Be Gone Bundle With FREE Cleansing Pads & Cuffs",
    component_sku: "20516",
    component_name:
      "BeautyFeatures Reusable Premium Cleansing Pads with Cuffs - 3 Pack",
    component_qty: 1,
  },
  {
    bundle_sku: "20865",
    bundle_name:
      "Dermalogica Oil Be Gone Bundle With FREE Cleansing Pads & Cuffs",
    component_sku: "5887",
    component_name: "Dermalogica Special Cleansing Gel 50ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20866",
    bundle_name:
      "Dermalogica Teen Skin Starter Bundle With FREE Cleansing Pads & Cuffs",
    component_sku: "100851",
    component_name: "Dermalogica Clear Start Hydrating Lotion 60ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20866",
    bundle_name:
      "Dermalogica Teen Skin Starter Bundle With FREE Cleansing Pads & Cuffs",
    component_sku: "10280",
    component_name:
      "Dermalogica Clear Start Breakout Clearing Foaming Wash 296ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20866",
    bundle_name:
      "Dermalogica Teen Skin Starter Bundle With FREE Cleansing Pads & Cuffs",
    component_sku: "11234",
    component_name: "Dermalogica Clear Start Post-Break Out Fix",
    component_qty: 1,
  },
  {
    bundle_sku: "20866",
    bundle_name:
      "Dermalogica Teen Skin Starter Bundle With FREE Cleansing Pads & Cuffs",
    component_sku: "20516",
    component_name:
      "BeautyFeatures Reusable Premium Cleansing Pads with Cuffs - 3 Pack",
    component_qty: 1,
  },
  {
    bundle_sku: "20867",
    bundle_name:
      "The Ordinary Shine Control Squad Bundle With FREE Cleansing Pads & Cuffs",
    component_sku: "11088",
    component_name: "The Ordinary Niacinamide 10% + Zinc 1% - 60ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20867",
    bundle_name:
      "The Ordinary Shine Control Squad Bundle With FREE Cleansing Pads & Cuffs",
    component_sku: "20516",
    component_name:
      "BeautyFeatures Reusable Premium Cleansing Pads with Cuffs - 3 Pack",
    component_qty: 1,
  },
  {
    bundle_sku: "20867",
    bundle_name:
      "The Ordinary Shine Control Squad Bundle With FREE Cleansing Pads & Cuffs",
    component_sku: "5756",
    component_name: "The Ordinary Natural Moisturising Factors + HA 30ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20867",
    bundle_name:
      "The Ordinary Shine Control Squad Bundle With FREE Cleansing Pads & Cuffs",
    component_sku: "8203",
    component_name: "The Ordinary Squalane Cleanser 150ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20868",
    bundle_name:
      "The Ordinary Dry Skin Saviours with FREE Cleansing Pads & Cuffs",
    component_sku: "20516",
    component_name:
      "BeautyFeatures Reusable Premium Cleansing Pads with Cuffs - 3 Pack",
    component_qty: 1,
  },
  {
    bundle_sku: "20868",
    bundle_name:
      "The Ordinary Dry Skin Saviours with FREE Cleansing Pads & Cuffs",
    component_sku: "5673",
    component_name: "The Ordinary Hyaluronic Acid 2% + B5 - 30ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20868",
    bundle_name:
      "The Ordinary Dry Skin Saviours with FREE Cleansing Pads & Cuffs",
    component_sku: "5756",
    component_name: "The Ordinary Natural Moisturising Factors + HA 30ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20868",
    bundle_name:
      "The Ordinary Dry Skin Saviours with FREE Cleansing Pads & Cuffs",
    component_sku: "8203",
    component_name: "The Ordinary Squalane Cleanser 150ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20869",
    bundle_name:
      "The Inkey List Combination Skin Balance Bundle with FREE Cleansing Pads & Cuff",
    component_sku: "20517",
    component_name:
      "BeautyFeatures Resuable Bamboo Fibre Cleansing Mitts - 2 Pack",
    component_qty: 1,
  },
  {
    bundle_sku: "20869",
    bundle_name:
      "The Inkey List Combination Skin Balance Bundle with FREE Cleansing Pads & Cuff",
    component_sku: "7165",
    component_name: "The INKEY list Hyaluronic Acid Serum 30ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20869",
    bundle_name:
      "The Inkey List Combination Skin Balance Bundle with FREE Cleansing Pads & Cuff",
    component_sku: "7634",
    component_name: "The INKEY-List - Sailcylic Acid Cleanser 150ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20869",
    bundle_name:
      "The Inkey List Combination Skin Balance Bundle with FREE Cleansing Pads & Cuff",
    component_sku: "8533",
    component_name: "The Inkey List Peptide Moisturiser 50ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20870",
    bundle_name: "Kérastase Symbiose Moisturising Anti-Dandruff 250ml Duo",
    component_sku: "12257",
    component_name:
      "Kérastase Symbiose Moisturising Anti-Dandruff Cellular Shampoo 250ml",
    component_qty: 2,
  },
  {
    bundle_sku: "20871",
    bundle_name: "Kérastase Nutritive Shampoo, Conditioner & Mask Trio",
    component_sku: "KER_44015370",
    component_name: "Kerastase Nutritive Masquintense Riche 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20871",
    bundle_name: "Kérastase Nutritive Shampoo, Conditioner & Mask Trio",
    component_sku: "KER_4401984",
    component_name: "Kerastase Nutritive Lait Vital 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20871",
    bundle_name: "Kérastase Nutritive Shampoo, Conditioner & Mask Trio",
    component_sku: "KER_4402082",
    component_name: "Kerastase  Nutritive Bain Satin Riche 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20872",
    bundle_name:
      "Kérastase Nutritive Shampoo, Conditioner & Mask Trio With FREE BeautyFeatures Hair Towel",
    component_sku: "20519",
    component_name: "BeautyFeatures Microfibre Hair Towel",
    component_qty: 1,
  },
  {
    bundle_sku: "20872",
    bundle_name:
      "Kérastase Nutritive Shampoo, Conditioner & Mask Trio With FREE BeautyFeatures Hair Towel",
    component_sku: "KER_44015370",
    component_name: "Kerastase Nutritive Masquintense Riche 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20872",
    bundle_name:
      "Kérastase Nutritive Shampoo, Conditioner & Mask Trio With FREE BeautyFeatures Hair Towel",
    component_sku: "KER_4401984",
    component_name: "Kerastase Nutritive Lait Vital 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20872",
    bundle_name:
      "Kérastase Nutritive Shampoo, Conditioner & Mask Trio With FREE BeautyFeatures Hair Towel",
    component_sku: "KER_4402082",
    component_name: "Kerastase  Nutritive Bain Satin Riche 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20873",
    bundle_name: "Kérastase Blond Absolu Bain Lumiere & Mask Duo",
    component_sku: "8775",
    component_name: "Kerastase Blond Absolu Bain Lumiére 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20873",
    bundle_name: "Kérastase Blond Absolu Bain Lumiere & Mask Duo",
    component_sku: "8778",
    component_name: "Kerastase Blond Absolu Masque Ultra-Violet 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20874",
    bundle_name: "Kérastase Blond Absolu Bain Ultra-Violet & Mask Duo",
    component_sku: "8774",
    component_name: "Kerastase Blond Absolu Bain Ultra-Violet 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20874",
    bundle_name: "Kérastase Blond Absolu Bain Ultra-Violet & Mask Duo",
    component_sku: "8778",
    component_name: "Kerastase Blond Absolu Masque Ultra-Violet 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20875",
    bundle_name:
      "Kérastase Blond Absolu Bain Lumiere & Mask Duo With FREE Hair Towel",
    component_sku: "20519",
    component_name: "BeautyFeatures Microfibre Hair Towel",
    component_qty: 1,
  },
  {
    bundle_sku: "20875",
    bundle_name:
      "Kérastase Blond Absolu Bain Lumiere & Mask Duo With FREE Hair Towel",
    component_sku: "8775",
    component_name: "Kerastase Blond Absolu Bain Lumiére 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20875",
    bundle_name:
      "Kérastase Blond Absolu Bain Lumiere & Mask Duo With FREE Hair Towel",
    component_sku: "8778",
    component_name: "Kerastase Blond Absolu Masque Ultra-Violet 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20876",
    bundle_name:
      "Kérastase Blond Absolu Bain Ultra-Violet & Mask Duo With FREE Hair Towel",
    component_sku: "20519",
    component_name: "BeautyFeatures Microfibre Hair Towel",
    component_qty: 1,
  },
  {
    bundle_sku: "20876",
    bundle_name:
      "Kérastase Blond Absolu Bain Ultra-Violet & Mask Duo With FREE Hair Towel",
    component_sku: "8774",
    component_name: "Kerastase Blond Absolu Bain Ultra-Violet 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20876",
    bundle_name:
      "Kérastase Blond Absolu Bain Ultra-Violet & Mask Duo With FREE Hair Towel",
    component_sku: "8778",
    component_name: "Kerastase Blond Absolu Masque Ultra-Violet 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20877",
    bundle_name: "Kérastase Blond Absolu Bundle - The Full Routine",
    component_sku: "13236",
    component_name:
      "Kérastase Blond Absolu 2% Pure Hyaluronic Acid Scalp and Hair Serum 50ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20877",
    bundle_name: "Kérastase Blond Absolu Bundle - The Full Routine",
    component_sku: "20379",
    component_name: "Kerastase Blond Absolu Huile Cicaextreme Hair Oil 75ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20877",
    bundle_name: "Kérastase Blond Absolu Bundle - The Full Routine",
    component_sku: "8774",
    component_name: "Kerastase Blond Absolu Bain Ultra-Violet 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20877",
    bundle_name: "Kérastase Blond Absolu Bundle - The Full Routine",
    component_sku: "8775",
    component_name: "Kerastase Blond Absolu Bain Lumiére 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20877",
    bundle_name: "Kérastase Blond Absolu Bundle - The Full Routine",
    component_sku: "8776",
    component_name: "Kerastase Blond Absolu Fondant Cicaflash 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20877",
    bundle_name: "Kérastase Blond Absolu Bundle - The Full Routine",
    component_sku: "8777",
    component_name: "Kerastase Blond Absolu Cicaplasme 150ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20877",
    bundle_name: "Kérastase Blond Absolu Bundle - The Full Routine",
    component_sku: "9226",
    component_name: "Kerastase Blond Absolu Cicanuit Overnight Hair Serum 90Ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20878",
    bundle_name: "Kérastase Blond Absolu Bain Lumiere 250ml Duo",
    component_sku: "8775",
    component_name: "Kerastase Blond Absolu Bain Lumiére 250ml",
    component_qty: 2,
  },
  {
    bundle_sku: "20879",
    bundle_name: "Kérastase Blond Absolu Bain Ultra-Violet 250ml Duo",
    component_sku: "8774",
    component_name: "Kerastase Blond Absolu Bain Ultra-Violet 250ml",
    component_qty: 2,
  },
  {
    bundle_sku: "20880",
    bundle_name: "Kérastase Blond Absolu Fondant Cicaflash 250ml Duo",
    component_sku: "8776",
    component_name: "Kerastase Blond Absolu Fondant Cicaflash 250ml",
    component_qty: 2,
  },
  {
    bundle_sku: "20881",
    bundle_name:
      "Kérastase Gloss Absolu Shampoo & Conditioner Duo With Free BeautyFeatures Detangling Hair Brush",
    component_sku: "20520",
    component_name: "BeautyFeatures Detangling Hairbrush",
    component_qty: 1,
  },
  {
    bundle_sku: "20881",
    bundle_name:
      "Kérastase Gloss Absolu Shampoo & Conditioner Duo With Free BeautyFeatures Detangling Hair Brush",
    component_sku: "20805",
    component_name: "Kerastase Gloss Absolu Bain Hydra Glaze Shampoo 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20881",
    bundle_name:
      "Kérastase Gloss Absolu Shampoo & Conditioner Duo With Free BeautyFeatures Detangling Hair Brush",
    component_sku: "20808",
    component_name: "Kerastase Gloss Absolu Insta Glaze Conditioner 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20882",
    bundle_name: "Kérastase Curl Manifesto Shampoo & Conditioner Duo",
    component_sku: "10188",
    component_name: "Kerastase Curl Manifesto Bain Hydratation Douceur 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20882",
    bundle_name: "Kérastase Curl Manifesto Shampoo & Conditioner Duo",
    component_sku: "10189",
    component_name:
      "Kerastase Curl Manifesto Fondant Hydratation Essentielle 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20883",
    bundle_name: "Kérastase Curl Manifesto Shampoo, Conditioner & Mask Trio",
    component_sku: "10188",
    component_name: "Kerastase Curl Manifesto Bain Hydratation Douceur 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20883",
    bundle_name: "Kérastase Curl Manifesto Shampoo, Conditioner & Mask Trio",
    component_sku: "10189",
    component_name:
      "Kerastase Curl Manifesto Fondant Hydratation Essentielle 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20883",
    bundle_name: "Kérastase Curl Manifesto Shampoo, Conditioner & Mask Trio",
    component_sku: "10190",
    component_name:
      "Kerastase Curl Manifesto Masque Beurre Haute Nutrition 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20884",
    bundle_name:
      "Kérastase Curl Manifesto Shampoo & Conditioner Duo With FREE Detangling Hairbrush",
    component_sku: "10188",
    component_name: "Kerastase Curl Manifesto Bain Hydratation Douceur 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20884",
    bundle_name:
      "Kérastase Curl Manifesto Shampoo & Conditioner Duo With FREE Detangling Hairbrush",
    component_sku: "10189",
    component_name:
      "Kerastase Curl Manifesto Fondant Hydratation Essentielle 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20884",
    bundle_name:
      "Kérastase Curl Manifesto Shampoo & Conditioner Duo With FREE Detangling Hairbrush",
    component_sku: "20520",
    component_name: "BeautyFeatures Detangling Hairbrush",
    component_qty: 1,
  },
  {
    bundle_sku: "20885",
    bundle_name: "Kérastase Curl Manifesto Shampoo & Mask Duo",
    component_sku: "10188",
    component_name: "Kerastase Curl Manifesto Bain Hydratation Douceur 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20885",
    bundle_name: "Kérastase Curl Manifesto Shampoo & Mask Duo",
    component_sku: "10190",
    component_name:
      "Kerastase Curl Manifesto Masque Beurre Haute Nutrition 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20886",
    bundle_name: "Kérastase Curl Manifesto Shampoo & Mask With FREE Hair Towel",
    component_sku: "10188",
    component_name: "Kerastase Curl Manifesto Bain Hydratation Douceur 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20886",
    bundle_name: "Kérastase Curl Manifesto Shampoo & Mask With FREE Hair Towel",
    component_sku: "10190",
    component_name:
      "Kerastase Curl Manifesto Masque Beurre Haute Nutrition 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20886",
    bundle_name: "Kérastase Curl Manifesto Shampoo & Mask With FREE Hair Towel",
    component_sku: "20519",
    component_name: "BeautyFeatures Microfibre Hair Towel",
    component_qty: 1,
  },
  {
    bundle_sku: "20887",
    bundle_name:
      "Kérastase Curl Manifesto Shampoo, Conditioner & Sublime Repair Oil Trio",
    component_sku: "10188",
    component_name: "Kerastase Curl Manifesto Bain Hydratation Douceur 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20887",
    bundle_name:
      "Kérastase Curl Manifesto Shampoo, Conditioner & Sublime Repair Oil Trio",
    component_sku: "10189",
    component_name:
      "Kerastase Curl Manifesto Fondant Hydratation Essentielle 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20887",
    bundle_name:
      "Kérastase Curl Manifesto Shampoo, Conditioner & Sublime Repair Oil Trio",
    component_sku: "10192",
    component_name: "Kerastase Curl Manifesto Huile Sublime Repair 50ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20888",
    bundle_name: "Kérastase Curl Manifesto Bain Hydratation Douceur 250ml Duo",
    component_sku: "10188",
    component_name: "Kerastase Curl Manifesto Bain Hydratation Douceur 250ml",
    component_qty: 2,
  },
  {
    bundle_sku: "20889",
    bundle_name: "Kérastase Discipline Shampoo & Mask Duo",
    component_sku: "9132",
    component_name: "Kerastase Discipline Maskeratine 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20889",
    bundle_name: "Kérastase Discipline Shampoo & Mask Duo",
    component_sku: "KER_E1023000",
    component_name: "Kerastase Discipline Bain Fluidealiste 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20890",
    bundle_name:
      "Kérastase Curl Manifesto Fondant Hydratation Essentielle 250ml Duo",
    component_sku: "10189",
    component_name:
      "Kerastase Curl Manifesto Fondant Hydratation Essentielle 250ml",
    component_qty: 2,
  },
  {
    bundle_sku: "20891",
    bundle_name: "Kérastase Densifique Shampoo & Conditioner Duo",
    component_sku: "9135",
    component_name: "Kerastase Densifique Conditioner 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20891",
    bundle_name: "Kérastase Densifique Shampoo & Conditioner Duo",
    component_sku: "9140",
    component_name: "Kerastase Densifique Bain Stemfree 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20892",
    bundle_name:
      "Kérastase Densifique Shampoo & Conditioner With FREE Detangling Hairbrush",
    component_sku: "20520",
    component_name: "BeautyFeatures Detangling Hairbrush",
    component_qty: 1,
  },
  {
    bundle_sku: "20892",
    bundle_name:
      "Kérastase Densifique Shampoo & Conditioner With FREE Detangling Hairbrush",
    component_sku: "9135",
    component_name: "Kerastase Densifique Conditioner 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20892",
    bundle_name:
      "Kérastase Densifique Shampoo & Conditioner With FREE Detangling Hairbrush",
    component_sku: "9140",
    component_name: "Kerastase Densifique Bain Stemfree 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20893",
    bundle_name: "Kérastase Densifique Shampoo & Mask Duo",
    component_sku: "9133",
    component_name: "Kerastase Densifique Masque Recovery Stemox 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20893",
    bundle_name: "Kérastase Densifique Shampoo & Mask Duo",
    component_sku: "9140",
    component_name: "Kerastase Densifique Bain Stemfree 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20894",
    bundle_name: "Kérastase Densifique Shampoo & Mask Duo With FREE Hair Towel",
    component_sku: "20519",
    component_name: "BeautyFeatures Microfibre Hair Towel",
    component_qty: 1,
  },
  {
    bundle_sku: "20894",
    bundle_name: "Kérastase Densifique Shampoo & Mask Duo With FREE Hair Towel",
    component_sku: "9133",
    component_name: "Kerastase Densifique Masque Recovery Stemox 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20894",
    bundle_name: "Kérastase Densifique Shampoo & Mask Duo With FREE Hair Towel",
    component_sku: "9140",
    component_name: "Kerastase Densifique Bain Stemfree 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20895",
    bundle_name: "Kérastase Densifique Shampoo, Conditioner & Mask Trio",
    component_sku: "9133",
    component_name: "Kerastase Densifique Masque Recovery Stemox 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20895",
    bundle_name: "Kérastase Densifique Shampoo, Conditioner & Mask Trio",
    component_sku: "9135",
    component_name: "Kerastase Densifique Conditioner 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20895",
    bundle_name: "Kérastase Densifique Shampoo, Conditioner & Mask Trio",
    component_sku: "9140",
    component_name: "Kerastase Densifique Bain Stemfree 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20896",
    bundle_name: "Kérastase Elixir Ultime Sublime Shampoo & Conditioner Duo",
    component_sku: "8722",
    component_name:
      "Kerastase Elixir Ultime Sublime Cleansing Oil Shampoo 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20896",
    bundle_name: "Kérastase Elixir Ultime Sublime Shampoo & Conditioner Duo",
    component_sku: "9144",
    component_name: "Kerastase Elixir Ultime Soin 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20897",
    bundle_name:
      "Kérastase Elixir Ultime Sublime Cleansing Oil Shampoo 250ml Duo",
    component_sku: "8722",
    component_name:
      "Kerastase Elixir Ultime Sublime Cleansing Oil Shampoo 250ml",
    component_qty: 2,
  },
  {
    bundle_sku: "20898",
    bundle_name: "Kérastase Elixir Ultime Shampoo, Conditioner & Mask Trio",
    component_sku: "8722",
    component_name:
      "Kerastase Elixir Ultime Sublime Cleansing Oil Shampoo 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20898",
    bundle_name: "Kérastase Elixir Ultime Shampoo, Conditioner & Mask Trio",
    component_sku: "9142",
    component_name: "Kerastase Elixir Ultime Masque 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20898",
    bundle_name: "Kérastase Elixir Ultime Shampoo, Conditioner & Mask Trio",
    component_sku: "9144",
    component_name: "Kerastase Elixir Ultime Soin 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20899",
    bundle_name: "Kérastase Elixir Ultime Shampoo & Mask Duo",
    component_sku: "8722",
    component_name:
      "Kerastase Elixir Ultime Sublime Cleansing Oil Shampoo 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20899",
    bundle_name: "Kérastase Elixir Ultime Shampoo & Mask Duo",
    component_sku: "9142",
    component_name: "Kerastase Elixir Ultime Masque 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20900",
    bundle_name:
      "Kérastase Elixir Ultime Shampoo & Mask Duo With FREE Hair Towel",
    component_sku: "20519",
    component_name: "BeautyFeatures Microfibre Hair Towel",
    component_qty: 1,
  },
  {
    bundle_sku: "20900",
    bundle_name:
      "Kérastase Elixir Ultime Shampoo & Mask Duo With FREE Hair Towel",
    component_sku: "8722",
    component_name:
      "Kerastase Elixir Ultime Sublime Cleansing Oil Shampoo 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20900",
    bundle_name:
      "Kérastase Elixir Ultime Shampoo & Mask Duo With FREE Hair Towel",
    component_sku: "9142",
    component_name: "Kerastase Elixir Ultime Masque 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20901",
    bundle_name:
      "Kérastase Elixir Ultime Shampoo & Conditioner Duo With Free Detangling Hairbrush",
    component_sku: "20520",
    component_name: "BeautyFeatures Detangling Hairbrush",
    component_qty: 1,
  },
  {
    bundle_sku: "20901",
    bundle_name:
      "Kérastase Elixir Ultime Shampoo & Conditioner Duo With Free Detangling Hairbrush",
    component_sku: "8722",
    component_name:
      "Kerastase Elixir Ultime Sublime Cleansing Oil Shampoo 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20901",
    bundle_name:
      "Kérastase Elixir Ultime Shampoo & Conditioner Duo With Free Detangling Hairbrush",
    component_sku: "9144",
    component_name: "Kerastase Elixir Ultime Soin 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20902",
    bundle_name: "Kérastase Elixir Ultime Shampoo, Conditioner & Oil Trio",
    component_sku: "14790",
    component_name: "Kérastase Elixir Ultime Hair Oil L'Huile Originale 30ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20902",
    bundle_name: "Kérastase Elixir Ultime Shampoo, Conditioner & Oil Trio",
    component_sku: "8722",
    component_name:
      "Kerastase Elixir Ultime Sublime Cleansing Oil Shampoo 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20902",
    bundle_name: "Kérastase Elixir Ultime Shampoo, Conditioner & Oil Trio",
    component_sku: "9144",
    component_name: "Kerastase Elixir Ultime Soin 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20903",
    bundle_name: "Kérastase Elixir Ultime Soin Conditioner 200ml Duo",
    component_sku: "9144",
    component_name: "Kerastase Elixir Ultime Soin 200ml",
    component_qty: 2,
  },
  {
    bundle_sku: "20904",
    bundle_name:
      "Kérastase Genesis Shampoo, Conditioner & Mask Trio - Fine, Oily Hair",
    component_sku: "8779",
    component_name: "Kerastase Genesis Bain Hydra-Fortifiant 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20904",
    bundle_name:
      "Kérastase Genesis Shampoo, Conditioner & Mask Trio - Fine, Oily Hair",
    component_sku: "8781",
    component_name: "Kerastase Genesis Fondant Renforçateur 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20904",
    bundle_name:
      "Kérastase Genesis Shampoo, Conditioner & Mask Trio - Fine, Oily Hair",
    component_sku: "8782",
    component_name: "Kerastase Genesis Masque Reconstituant 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20905",
    bundle_name:
      "Kérastase Genesis Shampoo, Conditioner & Mask Trio - Thick, Dry Hair",
    component_sku: "8780",
    component_name: "Kerastase Genesis Bain Nutri-Fortifiant 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20905",
    bundle_name:
      "Kérastase Genesis Shampoo, Conditioner & Mask Trio - Thick, Dry Hair",
    component_sku: "8781",
    component_name: "Kerastase Genesis Fondant Renforçateur 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20905",
    bundle_name:
      "Kérastase Genesis Shampoo, Conditioner & Mask Trio - Thick, Dry Hair",
    component_sku: "8782",
    component_name: "Kerastase Genesis Masque Reconstituant 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20906",
    bundle_name:
      "Kérastase Genesis Shampoo, Conditioner & Serum Trio - Fine, Oily Hair",
    component_sku: "8779",
    component_name: "Kerastase Genesis Bain Hydra-Fortifiant 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20906",
    bundle_name:
      "Kérastase Genesis Shampoo, Conditioner & Serum Trio - Fine, Oily Hair",
    component_sku: "8781",
    component_name: "Kerastase Genesis Fondant Renforçateur 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20906",
    bundle_name:
      "Kérastase Genesis Shampoo, Conditioner & Serum Trio - Fine, Oily Hair",
    component_sku: "8785",
    component_name: "Kerastase Genesis Serum Anti-Chute Fortifiant 90ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20907",
    bundle_name:
      "Kérastase Genesis Shampoo, Conditioner & Serum Trio - Thick, Dry Hair",
    component_sku: "8780",
    component_name: "Kerastase Genesis Bain Nutri-Fortifiant 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20907",
    bundle_name:
      "Kérastase Genesis Shampoo, Conditioner & Serum Trio - Thick, Dry Hair",
    component_sku: "8781",
    component_name: "Kerastase Genesis Fondant Renforçateur 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20907",
    bundle_name:
      "Kérastase Genesis Shampoo, Conditioner & Serum Trio - Thick, Dry Hair",
    component_sku: "8785",
    component_name: "Kerastase Genesis Serum Anti-Chute Fortifiant 90ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20908",
    bundle_name: "Kérastase Genesis Bain Hydra-Fortifiant 250ml Duo",
    component_sku: "8779",
    component_name: "Kerastase Genesis Bain Hydra-Fortifiant 250ml",
    component_qty: 2,
  },
  {
    bundle_sku: "20909",
    bundle_name: "Kérastase Genesis Bain Nutri-Fortifiant 250ml Duo",
    component_sku: "8780",
    component_name: "Kerastase Genesis Bain Nutri-Fortifiant 250ml",
    component_qty: 2,
  },
  {
    bundle_sku: "20910",
    bundle_name: "Kérastase Genesis Fondant Renforçateur 200ml Duo",
    component_sku: "8781",
    component_name: "Kerastase Genesis Fondant Renforçateur 200ml",
    component_qty: 2,
  },
  {
    bundle_sku: "20911",
    bundle_name: "L'Oréal Professionnel Absolut Repair Shampoo & Mask Duo",
    component_sku: "11458",
    component_name: "L'Oréal Professionnel Absolut Repair Shampoo - 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20911",
    bundle_name: "L'Oréal Professionnel Absolut Repair Shampoo & Mask Duo",
    component_sku: "11460",
    component_name: "L'Oréal Professionnel Absolut Repair Mask 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20912",
    bundle_name:
      "L'Oréal Professionnel Absolut Repair Shampoo & Mask Duo With FREE Hair Towel",
    component_sku: "11458",
    component_name: "L'Oréal Professionnel Absolut Repair Shampoo - 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20912",
    bundle_name:
      "L'Oréal Professionnel Absolut Repair Shampoo & Mask Duo With FREE Hair Towel",
    component_sku: "11460",
    component_name: "L'Oréal Professionnel Absolut Repair Mask 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20912",
    bundle_name:
      "L'Oréal Professionnel Absolut Repair Shampoo & Mask Duo With FREE Hair Towel",
    component_sku: "20519",
    component_name: "BeautyFeatures Microfibre Hair Towel",
    component_qty: 1,
  },
  {
    bundle_sku: "20913",
    bundle_name: "L'Oréal Professionnel Absolut Repair Shampoo 300ml Duo",
    component_sku: "11458",
    component_name: "L'Oréal Professionnel Absolut Repair Shampoo - 300ml",
    component_qty: 2,
  },
  {
    bundle_sku: "20914",
    bundle_name: "L'Oréal Professionnel Absolut Repair Conditioner 200ml Duo",
    component_sku: "11459",
    component_name: "L'Oréal Professionnel Absolut Repair Conditioner 200ml",
    component_qty: 2,
  },
  {
    bundle_sku: "20915",
    bundle_name:
      "L'Oréal Professionnel Absolut Repair Shampoo & Conditioner with FREE Hairbrush",
    component_sku: "11458",
    component_name: "L'Oréal Professionnel Absolut Repair Shampoo - 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20915",
    bundle_name:
      "L'Oréal Professionnel Absolut Repair Shampoo & Conditioner with FREE Hairbrush",
    component_sku: "11459",
    component_name: "L'Oréal Professionnel Absolut Repair Conditioner 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20915",
    bundle_name:
      "L'Oréal Professionnel Absolut Repair Shampoo & Conditioner with FREE Hairbrush",
    component_sku: "20520",
    component_name: "BeautyFeatures Detangling Hairbrush",
    component_qty: 1,
  },
  {
    bundle_sku: "20916",
    bundle_name:
      "L'Oréal Professionnel Absolut Repair Bundle - The Full Routine",
    component_sku: "11458",
    component_name: "L'Oréal Professionnel Absolut Repair Shampoo - 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20916",
    bundle_name:
      "L'Oréal Professionnel Absolut Repair Bundle - The Full Routine",
    component_sku: "11459",
    component_name: "L'Oréal Professionnel Absolut Repair Conditioner 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20916",
    bundle_name:
      "L'Oréal Professionnel Absolut Repair Bundle - The Full Routine",
    component_sku: "11462",
    component_name:
      "L'Oréal Professionnel Absolut Repair 10 in 1 leave in oil - 90ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20929",
    bundle_name:
      "L'Oréal Professionnel Curl Expression Moisturising & Hydrating Shampoo 300ml Duo",
    component_sku: "11427",
    component_name:
      "L'Oréal Professionnel Curl Expression Moisturising & Hydrating Shampoo 300ml",
    component_qty: 2,
  },
  {
    bundle_sku: "20930",
    bundle_name:
      "L'Oréal Professionnel Curl Expression Shampoo & Conditioner Duo",
    component_sku: "11427",
    component_name:
      "L'Oréal Professionnel Curl Expression Moisturising & Hydrating Shampoo 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20930",
    bundle_name:
      "L'Oréal Professionnel Curl Expression Shampoo & Conditioner Duo",
    component_sku: "11431",
    component_name:
      "L'Oréal Professionnel Curl Expression Long-Lasting Leave in Moisturiser 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20931",
    bundle_name:
      "L'Oréal Professionnel Curl Expression Shampoo & Conditioner With FREE Detangling Hairbrush",
    component_sku: "11427",
    component_name:
      "L'Oréal Professionnel Curl Expression Moisturising & Hydrating Shampoo 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20931",
    bundle_name:
      "L'Oréal Professionnel Curl Expression Shampoo & Conditioner With FREE Detangling Hairbrush",
    component_sku: "11431",
    component_name:
      "L'Oréal Professionnel Curl Expression Long-Lasting Leave in Moisturiser 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20931",
    bundle_name:
      "L'Oréal Professionnel Curl Expression Shampoo & Conditioner With FREE Detangling Hairbrush",
    component_sku: "20520",
    component_name: "BeautyFeatures Detangling Hairbrush",
    component_qty: 1,
  },
  {
    bundle_sku: "20932",
    bundle_name:
      "L'Oréal Professionnel Curl Expression Shampoo, Conditioner & Mask Trio",
    component_sku: "11427",
    component_name:
      "L'Oréal Professionnel Curl Expression Moisturising & Hydrating Shampoo 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20932",
    bundle_name:
      "L'Oréal Professionnel Curl Expression Shampoo, Conditioner & Mask Trio",
    component_sku: "11428",
    component_name:
      "L'Oréal Professionnel Curl Expression Hair Mask for Curls & Coils 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20932",
    bundle_name:
      "L'Oréal Professionnel Curl Expression Shampoo, Conditioner & Mask Trio",
    component_sku: "11431",
    component_name:
      "L'Oréal Professionnel Curl Expression Long-Lasting Leave in Moisturiser 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20933",
    bundle_name:
      "L'Oréal Professionnel Curl Expression Shampoo & Mask With FREE Microfibre Hair Towel",
    component_sku: "11427",
    component_name:
      "L'Oréal Professionnel Curl Expression Moisturising & Hydrating Shampoo 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20933",
    bundle_name:
      "L'Oréal Professionnel Curl Expression Shampoo & Mask With FREE Microfibre Hair Towel",
    component_sku: "11428",
    component_name:
      "L'Oréal Professionnel Curl Expression Hair Mask for Curls & Coils 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20933",
    bundle_name:
      "L'Oréal Professionnel Curl Expression Shampoo & Mask With FREE Microfibre Hair Towel",
    component_sku: "20519",
    component_name: "BeautyFeatures Microfibre Hair Towel",
    component_qty: 1,
  },
  {
    bundle_sku: "20934",
    bundle_name:
      "L'Oréal Professionnel Curl Expression Bundle - The Full Routine",
    component_sku: "11425",
    component_name:
      "L'Oréal Professionnel Curl Expression Curl-Activator Jelly 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20934",
    bundle_name:
      "L'Oréal Professionnel Curl Expression Bundle - The Full Routine",
    component_sku: "11427",
    component_name:
      "L'Oréal Professionnel Curl Expression Moisturising & Hydrating Shampoo 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20934",
    bundle_name:
      "L'Oréal Professionnel Curl Expression Bundle - The Full Routine",
    component_sku: "11428",
    component_name:
      "L'Oréal Professionnel Curl Expression Hair Mask for Curls & Coils 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20934",
    bundle_name:
      "L'Oréal Professionnel Curl Expression Bundle - The Full Routine",
    component_sku: "11430",
    component_name:
      "L'Oréal Professionnel Curl Expression Multi-benefit 10 in 1 Mousse 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20934",
    bundle_name:
      "L'Oréal Professionnel Curl Expression Bundle - The Full Routine",
    component_sku: "11431",
    component_name:
      "L'Oréal Professionnel Curl Expression Long-Lasting Leave in Moisturiser 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20934",
    bundle_name:
      "L'Oréal Professionnel Curl Expression Bundle - The Full Routine",
    component_sku: "11432",
    component_name:
      "L'Oréal Professionnel Curl Expression Curl Reviving Spray: Caring Water Mist 190ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20934",
    bundle_name:
      "L'Oréal Professionnel Curl Expression Bundle - The Full Routine",
    component_sku: "11433",
    component_name:
      "L'Oréal Professionnel Curl Expression Drying Accelerator 150ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20935",
    bundle_name:
      "L'Oréal Professionnel Curl Expression Long-Lasting Leave in Moisturiser 200ml Duo",
    component_sku: "11431",
    component_name:
      "L'Oréal Professionnel Curl Expression Long-Lasting Leave in Moisturiser 200ml",
    component_qty: 2,
  },
  {
    bundle_sku: "20936",
    bundle_name:
      "L'Oréal Professionnel Metal Detox Shampoo & Mask Duo with FREE Detangling Hairbrush",
    component_sku: "11351",
    component_name:
      "Loreal Professionnel Metal Detox Anti-Metal Cleansing Cream Shampoo 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20936",
    bundle_name:
      "L'Oréal Professionnel Metal Detox Shampoo & Mask Duo with FREE Detangling Hairbrush",
    component_sku: "11352",
    component_name:
      "Loreal Professionnel Metal Detox Anti-Deposit Protector Mask 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20936",
    bundle_name:
      "L'Oréal Professionnel Metal Detox Shampoo & Mask Duo with FREE Detangling Hairbrush",
    component_sku: "20520",
    component_name: "BeautyFeatures Detangling Hairbrush",
    component_qty: 1,
  },
  {
    bundle_sku: "20937",
    bundle_name: "L'Oréal Professionnel Metal Detox Shampoo, Mask & Oil Trio",
    component_sku: "11351",
    component_name:
      "Loreal Professionnel Metal Detox Anti-Metal Cleansing Cream Shampoo 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20937",
    bundle_name: "L'Oréal Professionnel Metal Detox Shampoo, Mask & Oil Trio",
    component_sku: "11352",
    component_name:
      "Loreal Professionnel Metal Detox Anti-Deposit Protector Mask 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20937",
    bundle_name: "L'Oréal Professionnel Metal Detox Shampoo, Mask & Oil Trio",
    component_sku: "11988",
    component_name:
      "L'Oreal Professionnel Metal Detox Anti-Deposit Protector Concentrated Oil 50ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20938",
    bundle_name: "L'Oréal Professionnel Metal Detox Bundle - The Full Routine",
    component_sku: "11351",
    component_name:
      "Loreal Professionnel Metal Detox Anti-Metal Cleansing Cream Shampoo 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20938",
    bundle_name: "L'Oréal Professionnel Metal Detox Bundle - The Full Routine",
    component_sku: "11352",
    component_name:
      "Loreal Professionnel Metal Detox Anti-Deposit Protector Mask 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20938",
    bundle_name: "L'Oréal Professionnel Metal Detox Bundle - The Full Routine",
    component_sku: "11988",
    component_name:
      "L'Oreal Professionnel Metal Detox Anti-Deposit Protector Concentrated Oil 50ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20938",
    bundle_name: "L'Oréal Professionnel Metal Detox Bundle - The Full Routine",
    component_sku: "12771",
    component_name:
      "L'Oréal Professionnel Metal Detox Anti-Metal High Protection Cream 100ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20938",
    bundle_name: "L'Oréal Professionnel Metal Detox Bundle - The Full Routine",
    component_sku: "14413",
    component_name:
      "L’Oréal Professionnel Metal Detox Anti-Porosity Filler Pre-Shampoo Treatment 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20939",
    bundle_name:
      "L'Oréal Professionnel Metal Detox Anti-Metal Cleansing Cream Shampoo 300ml Duo",
    component_sku: "11351",
    component_name:
      "Loreal Professionnel Metal Detox Anti-Metal Cleansing Cream Shampoo 300ml",
    component_qty: 2,
  },
  {
    bundle_sku: "20940",
    bundle_name:
      "L'Oréal Professionnel Metal Detox Anti-Deposit Protector Mask 250ml Duo",
    component_sku: "11352",
    component_name:
      "Loreal Professionnel Metal Detox Anti-Deposit Protector Mask 250ml",
    component_qty: 2,
  },
  {
    bundle_sku: "20941",
    bundle_name:
      "L'Oréal Professionnel Pro Longer Shampoo & Conditioner Duo With FREE Hairbrush",
    component_sku: "11471",
    component_name: "L'Oréal Professionnel Pro Longer Shampoo 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20941",
    bundle_name:
      "L'Oréal Professionnel Pro Longer Shampoo & Conditioner Duo With FREE Hairbrush",
    component_sku: "11472",
    component_name: "L'Oréal Professionnel Pro Longer Conditioner 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20941",
    bundle_name:
      "L'Oréal Professionnel Pro Longer Shampoo & Conditioner Duo With FREE Hairbrush",
    component_sku: "20520",
    component_name: "BeautyFeatures Detangling Hairbrush",
    component_qty: 1,
  },
  {
    bundle_sku: "20942",
    bundle_name:
      "L'Oréal Professionnel Pro Longer Shampoo, Conditioner & Mask Trio",
    component_sku: "11471",
    component_name: "L'Oréal Professionnel Pro Longer Shampoo 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20942",
    bundle_name:
      "L'Oréal Professionnel Pro Longer Shampoo, Conditioner & Mask Trio",
    component_sku: "11472",
    component_name: "L'Oréal Professionnel Pro Longer Conditioner 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20942",
    bundle_name:
      "L'Oréal Professionnel Pro Longer Shampoo, Conditioner & Mask Trio",
    component_sku: "11473",
    component_name: "L'Oréal Professionnel Pro Longer Mask 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20943",
    bundle_name:
      "L'Oréal Professionnel Pro Longer Shampoo & Mask With FREE Microfibre Hair Towel",
    component_sku: "11471",
    component_name: "L'Oréal Professionnel Pro Longer Shampoo 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20943",
    bundle_name:
      "L'Oréal Professionnel Pro Longer Shampoo & Mask With FREE Microfibre Hair Towel",
    component_sku: "11473",
    component_name: "L'Oréal Professionnel Pro Longer Mask 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20943",
    bundle_name:
      "L'Oréal Professionnel Pro Longer Shampoo & Mask With FREE Microfibre Hair Towel",
    component_sku: "20519",
    component_name: "BeautyFeatures Microfibre Hair Towel",
    component_qty: 1,
  },
  {
    bundle_sku: "20944",
    bundle_name: "L'Oréal Professionnel Pro Longer Bundle - The Full Routine",
    component_sku: "11471",
    component_name: "L'Oréal Professionnel Pro Longer Shampoo 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20944",
    bundle_name: "L'Oréal Professionnel Pro Longer Bundle - The Full Routine",
    component_sku: "11472",
    component_name: "L'Oréal Professionnel Pro Longer Conditioner 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20944",
    bundle_name: "L'Oréal Professionnel Pro Longer Bundle - The Full Routine",
    component_sku: "11473",
    component_name: "L'Oréal Professionnel Pro Longer Mask 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20944",
    bundle_name: "L'Oréal Professionnel Pro Longer Bundle - The Full Routine",
    component_sku: "11474",
    component_name: "L'Oréal Professionnel Pro Longer 10 in 1 Cream 150ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20945",
    bundle_name: "L'Oréal Professionnel Pro Longer Shampoo 300ml Duo",
    component_sku: "11471",
    component_name: "L'Oréal Professionnel Pro Longer Shampoo 300ml",
    component_qty: 2,
  },
  {
    bundle_sku: "20946",
    bundle_name: "L'Oréal Professionnel Pro Longer Conditioner 200ml Duo",
    component_sku: "11472",
    component_name: "L'Oréal Professionnel Pro Longer Conditioner 200ml",
    component_qty: 2,
  },
  {
    bundle_sku: "20947",
    bundle_name:
      "L'Oréal Professionnel Inforcer Shampoo & Conditioner With FREE Detangling Hairbrush",
    component_sku: "11468",
    component_name: "L'Oréal Professionnel Inforcer Shampoo 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20947",
    bundle_name:
      "L'Oréal Professionnel Inforcer Shampoo & Conditioner With FREE Detangling Hairbrush",
    component_sku: "11469",
    component_name: "L'Oréal Professionnel Inforcer Conditioner 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20947",
    bundle_name:
      "L'Oréal Professionnel Inforcer Shampoo & Conditioner With FREE Detangling Hairbrush",
    component_sku: "20520",
    component_name: "BeautyFeatures Detangling Hairbrush",
    component_qty: 1,
  },
  {
    bundle_sku: "20948",
    bundle_name:
      "L'Oréal Professionnel Inforcer Shampoo & Mask With FREE Microfibre Hair Towel",
    component_sku: "11468",
    component_name: "L'Oréal Professionnel Inforcer Shampoo 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20948",
    bundle_name:
      "L'Oréal Professionnel Inforcer Shampoo & Mask With FREE Microfibre Hair Towel",
    component_sku: "11470",
    component_name: "L'Oréal Professionnel Inforcer Mask 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20948",
    bundle_name:
      "L'Oréal Professionnel Inforcer Shampoo & Mask With FREE Microfibre Hair Towel",
    component_sku: "20519",
    component_name: "BeautyFeatures Microfibre Hair Towel",
    component_qty: 1,
  },
  {
    bundle_sku: "20949",
    bundle_name: "L'Oréal Professionnel Inforcer Shampoo 300ml Duo",
    component_sku: "11468",
    component_name: "L'Oréal Professionnel Inforcer Shampoo 300ml",
    component_qty: 2,
  },
  {
    bundle_sku: "20950",
    bundle_name: "L'Oréal Professionnel Inforcer Conditioner 200ml Duo",
    component_sku: "11469",
    component_name: "L'Oréal Professionnel Inforcer Conditioner 200ml",
    component_qty: 2,
  },
  {
    bundle_sku: "20951",
    bundle_name:
      "L'Oréal Professionnel Absolut Repair Molecular Shampoo & Mask Duo",
    component_sku: "13284",
    component_name:
      "L'Oréal Professionnel Absolut Repair Molecular Sulfate-Free Molecular Repairing Shampoo 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20951",
    bundle_name:
      "L'Oréal Professionnel Absolut Repair Molecular Shampoo & Mask Duo",
    component_sku: "20465",
    component_name:
      "L'Oreal Professional Absolut Repair Molecular Rinse off Hair Mask 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20952",
    bundle_name:
      "L'Oréal Professionnel Absolut Repair Molecular Shampoo & Mask With FREE Detangling Hairbrush",
    component_sku: "13284",
    component_name:
      "L'Oréal Professionnel Absolut Repair Molecular Sulfate-Free Molecular Repairing Shampoo 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20952",
    bundle_name:
      "L'Oréal Professionnel Absolut Repair Molecular Shampoo & Mask With FREE Detangling Hairbrush",
    component_sku: "20465",
    component_name:
      "L'Oreal Professional Absolut Repair Molecular Rinse off Hair Mask 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20952",
    bundle_name:
      "L'Oréal Professionnel Absolut Repair Molecular Shampoo & Mask With FREE Detangling Hairbrush",
    component_sku: "20520",
    component_name: "BeautyFeatures Detangling Hairbrush",
    component_qty: 1,
  },
  {
    bundle_sku: "20953",
    bundle_name:
      "L'Oréal Professionnel Absolut Repair Molecular Shampoo & Mask With FREE Microfibre Hair Towel",
    component_sku: "13284",
    component_name:
      "L'Oréal Professionnel Absolut Repair Molecular Sulfate-Free Molecular Repairing Shampoo 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20953",
    bundle_name:
      "L'Oréal Professionnel Absolut Repair Molecular Shampoo & Mask With FREE Microfibre Hair Towel",
    component_sku: "20465",
    component_name:
      "L'Oreal Professional Absolut Repair Molecular Rinse off Hair Mask 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20953",
    bundle_name:
      "L'Oréal Professionnel Absolut Repair Molecular Shampoo & Mask With FREE Microfibre Hair Towel",
    component_sku: "20519",
    component_name: "BeautyFeatures Microfibre Hair Towel",
    component_qty: 1,
  },
  {
    bundle_sku: "20954",
    bundle_name:
      "L'Oréal Professionnel Absolut Repair Molecular Sulfate-Free Molecular Repairing Shampoo 300ml Duo",
    component_sku: "13284",
    component_name:
      "L'Oréal Professionnel Absolut Repair Molecular Sulfate-Free Molecular Repairing Shampoo 300ml",
    component_qty: 2,
  },
  {
    bundle_sku: "20955",
    bundle_name:
      "L'Oréal Professionnel Absolut Repair Molecular Rinse off Hair Mask 250ml Duo",
    component_sku: "20465",
    component_name:
      "L'Oreal Professional Absolut Repair Molecular Rinse off Hair Mask 250ml",
    component_qty: 2,
  },
  {
    bundle_sku: "20956",
    bundle_name: "L'Oréal Professionnel Silver Shampoo & Conditioner Duo",
    component_sku: "11456",
    component_name: "L'Oréal Professionnel Silver Shampoo 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20956",
    bundle_name: "L'Oréal Professionnel Silver Shampoo & Conditioner Duo",
    component_sku: "11457",
    component_name: "L'Oréal Professionnel Silver Conditioner 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20957",
    bundle_name:
      "L'Oréal Professionnel Silver Shampoo & Conditioner With Free Detangling Hairbrush",
    component_sku: "11456",
    component_name: "L'Oréal Professionnel Silver Shampoo 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20957",
    bundle_name:
      "L'Oréal Professionnel Silver Shampoo & Conditioner With Free Detangling Hairbrush",
    component_sku: "11457",
    component_name: "L'Oréal Professionnel Silver Conditioner 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20957",
    bundle_name:
      "L'Oréal Professionnel Silver Shampoo & Conditioner With Free Detangling Hairbrush",
    component_sku: "20520",
    component_name: "BeautyFeatures Detangling Hairbrush",
    component_qty: 1,
  },
  {
    bundle_sku: "20958",
    bundle_name: "L'Oréal Professionnel Silver Shampoo 300ml Duo",
    component_sku: "11456",
    component_name: "L'Oréal Professionnel Silver Shampoo 300ml",
    component_qty: 2,
  },
  {
    bundle_sku: "20959",
    bundle_name: "L'Oréal Professionnel Silver Conditioner 200ml Duo",
    component_sku: "11457",
    component_name: "L'Oréal Professionnel Silver Conditioner 200ml",
    component_qty: 2,
  },
  {
    bundle_sku: "20960",
    bundle_name: "L'Oréal Professionnel Liss Unlimited Shampoo & Mask Duo",
    component_sku: "11483",
    component_name: "L'Oréal Professionnel Liss Unlimited Shampoo 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20960",
    bundle_name: "L'Oréal Professionnel Liss Unlimited Shampoo & Mask Duo",
    component_sku: "11484",
    component_name: "L'Oréal Professionnel Liss Unlimited Mask - 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20961",
    bundle_name:
      "L'Oréal Professionnel Liss Unlimited Shampoo & Mask With FREE Detangling Hairbrush",
    component_sku: "11483",
    component_name: "L'Oréal Professionnel Liss Unlimited Shampoo 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20961",
    bundle_name:
      "L'Oréal Professionnel Liss Unlimited Shampoo & Mask With FREE Detangling Hairbrush",
    component_sku: "11484",
    component_name: "L'Oréal Professionnel Liss Unlimited Mask - 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20961",
    bundle_name:
      "L'Oréal Professionnel Liss Unlimited Shampoo & Mask With FREE Detangling Hairbrush",
    component_sku: "20520",
    component_name: "BeautyFeatures Detangling Hairbrush",
    component_qty: 1,
  },
  {
    bundle_sku: "20962",
    bundle_name:
      "L'Oréal Professionnel Liss Unlimited Shampoo & Mask With FREE Microfibre Hair Towel",
    component_sku: "11483",
    component_name: "L'Oréal Professionnel Liss Unlimited Shampoo 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20962",
    bundle_name:
      "L'Oréal Professionnel Liss Unlimited Shampoo & Mask With FREE Microfibre Hair Towel",
    component_sku: "11484",
    component_name: "L'Oréal Professionnel Liss Unlimited Mask - 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20962",
    bundle_name:
      "L'Oréal Professionnel Liss Unlimited Shampoo & Mask With FREE Microfibre Hair Towel",
    component_sku: "20519",
    component_name: "BeautyFeatures Microfibre Hair Towel",
    component_qty: 1,
  },
  {
    bundle_sku: "20963",
    bundle_name: "L'Oréal Professionnel Liss Unlimited Shampoo 300ml Duo",
    component_sku: "11483",
    component_name: "L'Oréal Professionnel Liss Unlimited Shampoo 300ml",
    component_qty: 2,
  },
  {
    bundle_sku: "20964",
    bundle_name: "L'Oréal Professionnel Liss Unlimited Mask 250ml Duo",
    component_sku: "11484",
    component_name: "L'Oréal Professionnel Liss Unlimited Mask - 250ml",
    component_qty: 2,
  },
  {
    bundle_sku: "20965",
    bundle_name:
      "L'Oréal Professionnel Vitamino Color Shampoo & Conditioner With FREE Detangling Brush",
    component_sku: "11452",
    component_name: "L'Oréal Professionnel Vitamino Color Shampoo - 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20965",
    bundle_name:
      "L'Oréal Professionnel Vitamino Color Shampoo & Conditioner With FREE Detangling Brush",
    component_sku: "11453",
    component_name: "L'Oréal Professionnel Vitamino Conditioner 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20965",
    bundle_name:
      "L'Oréal Professionnel Vitamino Color Shampoo & Conditioner With FREE Detangling Brush",
    component_sku: "20520",
    component_name: "BeautyFeatures Detangling Hairbrush",
    component_qty: 1,
  },
  {
    bundle_sku: "20966",
    bundle_name: "L'Oréal Professionnel Vitamino Color Shampoo & Mask",
    component_sku: "11452",
    component_name: "L'Oréal Professionnel Vitamino Color Shampoo - 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20966",
    bundle_name: "L'Oréal Professionnel Vitamino Color Shampoo & Mask",
    component_sku: "11454",
    component_name: "L'Oréal Professionnel Vitamino Color Mask 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20967",
    bundle_name:
      "L'Oréal Professionnel Vitamino Color Shampoo & Mask With FREE Microfibre Hair Towel",
    component_sku: "11452",
    component_name: "L'Oréal Professionnel Vitamino Color Shampoo - 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20967",
    bundle_name:
      "L'Oréal Professionnel Vitamino Color Shampoo & Mask With FREE Microfibre Hair Towel",
    component_sku: "11454",
    component_name: "L'Oréal Professionnel Vitamino Color Mask 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20967",
    bundle_name:
      "L'Oréal Professionnel Vitamino Color Shampoo & Mask With FREE Microfibre Hair Towel",
    component_sku: "20519",
    component_name: "BeautyFeatures Microfibre Hair Towel",
    component_qty: 1,
  },
  {
    bundle_sku: "20968",
    bundle_name:
      "L'Oréal Professionnel Vitamino Color Shampoo, Conditioner & 10 in 1 Multi-Benefit Leave In Treatment",
    component_sku: "11452",
    component_name: "L'Oréal Professionnel Vitamino Color Shampoo - 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20968",
    bundle_name:
      "L'Oréal Professionnel Vitamino Color Shampoo, Conditioner & 10 in 1 Multi-Benefit Leave In Treatment",
    component_sku: "11453",
    component_name: "L'Oréal Professionnel Vitamino Conditioner 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20968",
    bundle_name:
      "L'Oréal Professionnel Vitamino Color Shampoo, Conditioner & 10 in 1 Multi-Benefit Leave In Treatment",
    component_sku: "11455",
    component_name:
      "L'Oréal Professionnel Vitamino Color 10 in 1 Multi-Benefit Leave In Treatment",
    component_qty: 1,
  },
  {
    bundle_sku: "20969",
    bundle_name:
      "L'Oréal Professionnel Vitamino Color Bundle - The Full Routine",
    component_sku: "11452",
    component_name: "L'Oréal Professionnel Vitamino Color Shampoo - 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20969",
    bundle_name:
      "L'Oréal Professionnel Vitamino Color Bundle - The Full Routine",
    component_sku: "11453",
    component_name: "L'Oréal Professionnel Vitamino Conditioner 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20969",
    bundle_name:
      "L'Oréal Professionnel Vitamino Color Bundle - The Full Routine",
    component_sku: "11454",
    component_name: "L'Oréal Professionnel Vitamino Color Mask 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20969",
    bundle_name:
      "L'Oréal Professionnel Vitamino Color Bundle - The Full Routine",
    component_sku: "11455",
    component_name:
      "L'Oréal Professionnel Vitamino Color 10 in 1 Multi-Benefit Leave In Treatment",
    component_qty: 1,
  },
  {
    bundle_sku: "20970",
    bundle_name: "L'Oréal Professionnel Vitamino Color Shampoo 300ml Duo",
    component_sku: "11452",
    component_name: "L'Oréal Professionnel Vitamino Color Shampoo - 300ml",
    component_qty: 2,
  },
  {
    bundle_sku: "20971",
    bundle_name: "L'Oréal Professionnel Vitamino Color Conditioner 200ml Duo",
    component_sku: "11453",
    component_name: "L'Oréal Professionnel Vitamino Conditioner 200ml",
    component_qty: 2,
  },
  {
    bundle_sku: "20978",
    bundle_name:
      "Pureology Hydrate Shampoo & Conditioner With FREE BeautyFeatures Detangling Hairbrush",
    component_sku: "20520",
    component_name: "BeautyFeatures Detangling Hairbrush",
    component_qty: 1,
  },
  {
    bundle_sku: "20978",
    bundle_name:
      "Pureology Hydrate Shampoo & Conditioner With FREE BeautyFeatures Detangling Hairbrush",
    component_sku: "5048",
    component_name: "Pureology - Pure Hydrate Shampoo 266ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20978",
    bundle_name:
      "Pureology Hydrate Shampoo & Conditioner With FREE BeautyFeatures Detangling Hairbrush",
    component_sku: "5053",
    component_name: "Pureology - Pure Hydrate Conditioner 266ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20979",
    bundle_name:
      "Pureology Hydrate Sheer Shampoo & Conditioner With FREE BeautyFeatures Detangling Hairbrush",
    component_sku: "10256",
    component_name: "Pureology Hydrate Sheer Shampoo 266ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20979",
    bundle_name:
      "Pureology Hydrate Sheer Shampoo & Conditioner With FREE BeautyFeatures Detangling Hairbrush",
    component_sku: "10257",
    component_name: "Pureology Hydrate Sheer Conditioner 266ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20979",
    bundle_name:
      "Pureology Hydrate Sheer Shampoo & Conditioner With FREE BeautyFeatures Detangling Hairbrush",
    component_sku: "20520",
    component_name: "BeautyFeatures Detangling Hairbrush",
    component_qty: 1,
  },
  {
    bundle_sku: "20980",
    bundle_name:
      "Pureology Strength Cure Shampoo & Conditioner With FREE BeautyFeatures Detangling Hairbrush",
    component_sku: "20520",
    component_name: "BeautyFeatures Detangling Hairbrush",
    component_qty: 1,
  },
  {
    bundle_sku: "20980",
    bundle_name:
      "Pureology Strength Cure Shampoo & Conditioner With FREE BeautyFeatures Detangling Hairbrush",
    component_sku: "5052",
    component_name: "Pureology - Strength Cure Shampoo 266ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20980",
    bundle_name:
      "Pureology Strength Cure Shampoo & Conditioner With FREE BeautyFeatures Detangling Hairbrush",
    component_sku: "5057",
    component_name: "Pureology - Strength Cure Conditioner 266ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20981",
    bundle_name:
      "Pureology Smooth Perfection Shampoo & Conditioner With FREE BeautyFeatures Detangling Hairbrush",
    component_sku: "20520",
    component_name: "BeautyFeatures Detangling Hairbrush",
    component_qty: 1,
  },
  {
    bundle_sku: "20981",
    bundle_name:
      "Pureology Smooth Perfection Shampoo & Conditioner With FREE BeautyFeatures Detangling Hairbrush",
    component_sku: "5050",
    component_name: "Pureology - Smooth Perfection Shampoo 266ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20981",
    bundle_name:
      "Pureology Smooth Perfection Shampoo & Conditioner With FREE BeautyFeatures Detangling Hairbrush",
    component_sku: "5055",
    component_name: "Pureology - Smooth Perfection Conditioner 266ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20982",
    bundle_name:
      "Pureology Nanoworks Shampoo & Conditioner With FREE BeautyFeatures Detangling Hairbrush",
    component_sku: "11358",
    component_name: "Pureology Nanoworks Gold Shampoo 266ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20982",
    bundle_name:
      "Pureology Nanoworks Shampoo & Conditioner With FREE BeautyFeatures Detangling Hairbrush",
    component_sku: "11359",
    component_name: "Pureology Nanoworks Gold Conditioner 266ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20982",
    bundle_name:
      "Pureology Nanoworks Shampoo & Conditioner With FREE BeautyFeatures Detangling Hairbrush",
    component_sku: "20520",
    component_name: "BeautyFeatures Detangling Hairbrush",
    component_qty: 1,
  },
  {
    bundle_sku: "20983",
    bundle_name:
      "Pureology Strength Cure Blonde Shampoo & Conditioner With FREE BeautyFeatures Detangling Hairbrush",
    component_sku: "20520",
    component_name: "BeautyFeatures Detangling Hairbrush",
    component_qty: 1,
  },
  {
    bundle_sku: "20983",
    bundle_name:
      "Pureology Strength Cure Blonde Shampoo & Conditioner With FREE BeautyFeatures Detangling Hairbrush",
    component_sku: "5051",
    component_name: "Pureology Strength Cure Best Blonde Shampoo 266ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20983",
    bundle_name:
      "Pureology Strength Cure Blonde Shampoo & Conditioner With FREE BeautyFeatures Detangling Hairbrush",
    component_sku: "5056",
    component_name: "Pureology Strength Cure Blonde Conditioner 266ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20984",
    bundle_name: "Pureology Hydrate Shampoo, Conditioner & Mask Trio",
    component_sku: "5048",
    component_name: "Pureology - Pure Hydrate Shampoo 266ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20984",
    bundle_name: "Pureology Hydrate Shampoo, Conditioner & Mask Trio",
    component_sku: "5053",
    component_name: "Pureology - Pure Hydrate Conditioner 266ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20984",
    bundle_name: "Pureology Hydrate Shampoo, Conditioner & Mask Trio",
    component_sku: "6258",
    component_name: "Pureology Pure Hydrate Superfood Mask  200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20985",
    bundle_name: "Pureology Hydrate Shampoo & Mask Duo",
    component_sku: "5048",
    component_name: "Pureology - Pure Hydrate Shampoo 266ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20985",
    bundle_name: "Pureology Hydrate Shampoo & Mask Duo",
    component_sku: "6258",
    component_name: "Pureology Pure Hydrate Superfood Mask  200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20986",
    bundle_name:
      "Pureology Hydrate Shampoo & Mask With FREE Microfibre Hair Towel",
    component_sku: "20519",
    component_name: "BeautyFeatures Microfibre Hair Towel",
    component_qty: 1,
  },
  {
    bundle_sku: "20986",
    bundle_name:
      "Pureology Hydrate Shampoo & Mask With FREE Microfibre Hair Towel",
    component_sku: "5048",
    component_name: "Pureology - Pure Hydrate Shampoo 266ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20986",
    bundle_name:
      "Pureology Hydrate Shampoo & Mask With FREE Microfibre Hair Towel",
    component_sku: "6258",
    component_name: "Pureology Pure Hydrate Superfood Mask  200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20987",
    bundle_name: "Pureology Hydrate Shampoo 266ml Duo",
    component_sku: "5048",
    component_name: "Pureology - Pure Hydrate Shampoo 266ml",
    component_qty: 2,
  },
  {
    bundle_sku: "20988",
    bundle_name: "Pureology Hydrate Conditioner 266ml Duo",
    component_sku: "5053",
    component_name: "Pureology - Pure Hydrate Conditioner 266ml",
    component_qty: 2,
  },
  {
    bundle_sku: "20989",
    bundle_name: "Pureology Hydrate Sheer Shampoo 266ml Duo",
    component_sku: "10256",
    component_name: "Pureology Hydrate Sheer Shampoo 266ml",
    component_qty: 2,
  },
  {
    bundle_sku: "20990",
    bundle_name: "Pureology Hydrate Sheer Conditioner 266ml Duo",
    component_sku: "10257",
    component_name: "Pureology Hydrate Sheer Conditioner 266ml",
    component_qty: 2,
  },
  {
    bundle_sku: "20991",
    bundle_name: "Pureology Strength Cure Shampoo, Conditioner & Mask Trio",
    component_sku: "5052",
    component_name: "Pureology - Strength Cure Shampoo 266ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20991",
    bundle_name: "Pureology Strength Cure Shampoo, Conditioner & Mask Trio",
    component_sku: "5057",
    component_name: "Pureology - Strength Cure Conditioner 266ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20991",
    bundle_name: "Pureology Strength Cure Shampoo, Conditioner & Mask Trio",
    component_sku: "6259",
    component_name: "Pureology Strength Cure Superfood Mask 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20992",
    bundle_name: "Pureology Strength Cure Shampoo & Mask Duo",
    component_sku: "5052",
    component_name: "Pureology - Strength Cure Shampoo 266ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20992",
    bundle_name: "Pureology Strength Cure Shampoo & Mask Duo",
    component_sku: "6259",
    component_name: "Pureology Strength Cure Superfood Mask 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20993",
    bundle_name:
      "Pureology Strength Cure Shampoo & Mask With FREE Microfibre Hair Towel",
    component_sku: "20519",
    component_name: "BeautyFeatures Microfibre Hair Towel",
    component_qty: 1,
  },
  {
    bundle_sku: "20993",
    bundle_name:
      "Pureology Strength Cure Shampoo & Mask With FREE Microfibre Hair Towel",
    component_sku: "5052",
    component_name: "Pureology - Strength Cure Shampoo 266ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20993",
    bundle_name:
      "Pureology Strength Cure Shampoo & Mask With FREE Microfibre Hair Towel",
    component_sku: "6259",
    component_name: "Pureology Strength Cure Superfood Mask 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20994",
    bundle_name: "Pureology Strength Cure Shampoo 266ml Duo",
    component_sku: "5052",
    component_name: "Pureology - Strength Cure Shampoo 266ml",
    component_qty: 2,
  },
  {
    bundle_sku: "20995",
    bundle_name: "Pureology Strength Cure Conditioner 266ml Duo",
    component_sku: "5057",
    component_name: "Pureology - Strength Cure Conditioner 266ml",
    component_qty: 2,
  },
  {
    bundle_sku: "20996",
    bundle_name:
      "Pureology Smooth Perfection Shampoo, Conditioner & Serum Trio",
    component_sku: "13332",
    component_name: "Pureology Smooth Perfection Smoothing Serum 150ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20996",
    bundle_name:
      "Pureology Smooth Perfection Shampoo, Conditioner & Serum Trio",
    component_sku: "5050",
    component_name: "Pureology - Smooth Perfection Shampoo 266ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20996",
    bundle_name:
      "Pureology Smooth Perfection Shampoo, Conditioner & Serum Trio",
    component_sku: "5055",
    component_name: "Pureology - Smooth Perfection Conditioner 266ml",
    component_qty: 1,
  },
  {
    bundle_sku: "20997",
    bundle_name: "Pureology Smooth Perfection Shampoo 266ml Duo",
    component_sku: "5050",
    component_name: "Pureology - Smooth Perfection Shampoo 266ml",
    component_qty: 2,
  },
  {
    bundle_sku: "20998",
    bundle_name: "Pureology Smooth Perfection Conditioner 266ml Duo",
    component_sku: "5055",
    component_name: "Pureology - Smooth Perfection Conditioner 266ml",
    component_qty: 2,
  },
  {
    bundle_sku: "20999",
    bundle_name: "Pureology Nanoworks Shampoo 266ml Duo",
    component_sku: "11358",
    component_name: "Pureology Nanoworks Gold Shampoo 266ml",
    component_qty: 2,
  },
  {
    bundle_sku: "21000",
    bundle_name: "Pureology Nanoworks Conditioner 266ml Duo",
    component_sku: "11359",
    component_name: "Pureology Nanoworks Gold Conditioner 266ml",
    component_qty: 2,
  },
  {
    bundle_sku: "21001",
    bundle_name: "Pureology Strength Cure Blonde Shampoo 266ml Duo",
    component_sku: "5051",
    component_name: "Pureology Strength Cure Best Blonde Shampoo 266ml",
    component_qty: 2,
  },
  {
    bundle_sku: "21002",
    bundle_name: "Pureology Strength Cure Blonde Conditioner 266ml Duo",
    component_sku: "5056",
    component_name: "Pureology Strength Cure Blonde Conditioner 266ml",
    component_qty: 2,
  },
  {
    bundle_sku: "21004",
    bundle_name: "Redken Extreme Shampoo, Conditioner & Mask Trio",
    component_sku: "REDK_P027790",
    component_name: "Redken - Extreme Conditioner 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21004",
    bundle_name: "Redken Extreme Shampoo, Conditioner & Mask Trio",
    component_sku: "REDK_P027970",
    component_name: "Redken - Extreme Shampoo 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21004",
    bundle_name: "Redken Extreme Shampoo, Conditioner & Mask Trio",
    component_sku: "REDK_P029530",
    component_name: "Redken - Extreme Strength Builder 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21005",
    bundle_name: "Redken Extreme Shampoo & Mask Duo",
    component_sku: "REDK_P027970",
    component_name: "Redken - Extreme Shampoo 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21005",
    bundle_name: "Redken Extreme Shampoo & Mask Duo",
    component_sku: "REDK_P029530",
    component_name: "Redken - Extreme Strength Builder 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21006",
    bundle_name: "Redken Extreme Bundle - The Full Routine",
    component_sku: "7692",
    component_name: "Redken Extreme Play Safe 230C 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21006",
    bundle_name: "Redken Extreme Bundle - The Full Routine",
    component_sku: "REDK_P027790",
    component_name: "Redken - Extreme Conditioner 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21006",
    bundle_name: "Redken Extreme Bundle - The Full Routine",
    component_sku: "REDK_P027920",
    component_name: "Redken - Extreme Anti Snap 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21006",
    bundle_name: "Redken Extreme Bundle - The Full Routine",
    component_sku: "REDK_P027970",
    component_name: "Redken - Extreme Shampoo 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21006",
    bundle_name: "Redken Extreme Bundle - The Full Routine",
    component_sku: "REDK_P029530",
    component_name: "Redken - Extreme Strength Builder 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21007",
    bundle_name:
      "Redken Acidic Bonding Concentrate Shampoo & Conditioner With FREE Detangling Hairbrush",
    component_sku: "20520",
    component_name: "BeautyFeatures Detangling Hairbrush",
    component_qty: 1,
  },
  {
    bundle_sku: "21007",
    bundle_name:
      "Redken Acidic Bonding Concentrate Shampoo & Conditioner With FREE Detangling Hairbrush",
    component_sku: "9762",
    component_name: "Redken Acidic Bonding Concentrate Shampoo 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21007",
    bundle_name:
      "Redken Acidic Bonding Concentrate Shampoo & Conditioner With FREE Detangling Hairbrush",
    component_sku: "9763",
    component_name: "Redken Acidic Bonding Concentrate Conditioner 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21008",
    bundle_name: "Redken Acidic Bonding Concentrate Shampoo & Mask Duo",
    component_sku: "13069",
    component_name:
      "Redken Acidic Bonding Concentrate 5-Minute Liquid Mask 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21008",
    bundle_name: "Redken Acidic Bonding Concentrate Shampoo & Mask Duo",
    component_sku: "9762",
    component_name: "Redken Acidic Bonding Concentrate Shampoo 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21009",
    bundle_name:
      "Redken Acidic Bonding Concentrate Shampoo & Mask Duo With FREE Microfibre Hair Towel",
    component_sku: "13069",
    component_name:
      "Redken Acidic Bonding Concentrate 5-Minute Liquid Mask 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21009",
    bundle_name:
      "Redken Acidic Bonding Concentrate Shampoo & Mask Duo With FREE Microfibre Hair Towel",
    component_sku: "20519",
    component_name: "BeautyFeatures Microfibre Hair Towel",
    component_qty: 1,
  },
  {
    bundle_sku: "21009",
    bundle_name:
      "Redken Acidic Bonding Concentrate Shampoo & Mask Duo With FREE Microfibre Hair Towel",
    component_sku: "9762",
    component_name: "Redken Acidic Bonding Concentrate Shampoo 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21010",
    bundle_name: "Redken Acidic Bonding Concentrate Shampoo 300ml Duo",
    component_sku: "9762",
    component_name: "Redken Acidic Bonding Concentrate Shampoo 300ml",
    component_qty: 2,
  },
  {
    bundle_sku: "21011",
    bundle_name: "Redken Acidic Bonding Concentrate Conditioner 300ml Duo",
    component_sku: "9763",
    component_name: "Redken Acidic Bonding Concentrate Conditioner 300ml",
    component_qty: 2,
  },
  {
    bundle_sku: "21012",
    bundle_name:
      "Redken Colour Extend Blondage Shampoo & Conditioner With FREE Detangling Hairbrush",
    component_sku: "20520",
    component_name: "BeautyFeatures Detangling Hairbrush",
    component_qty: 1,
  },
  {
    bundle_sku: "21012",
    bundle_name:
      "Redken Colour Extend Blondage Shampoo & Conditioner With FREE Detangling Hairbrush",
    component_sku: "7608",
    component_name: "Redken Colour Extend Blondage Shampoo 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21012",
    bundle_name:
      "Redken Colour Extend Blondage Shampoo & Conditioner With FREE Detangling Hairbrush",
    component_sku: "7609",
    component_name: "Redken Color Extend Blondage Conditioner 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21013",
    bundle_name: "Redken Colour Extend Blondage Shampoo & Mask Duo",
    component_sku: "7608",
    component_name: "Redken Colour Extend Blondage Shampoo 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21013",
    bundle_name: "Redken Colour Extend Blondage Shampoo & Mask Duo",
    component_sku: "8490",
    component_name: "Redken Blondage Anti-Brass mask 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21014",
    bundle_name:
      "Redken Colour Extend Blondage Shampoo & Mask Duo With FREE Microfibre Hair Towel",
    component_sku: "20519",
    component_name: "BeautyFeatures Microfibre Hair Towel",
    component_qty: 1,
  },
  {
    bundle_sku: "21014",
    bundle_name:
      "Redken Colour Extend Blondage Shampoo & Mask Duo With FREE Microfibre Hair Towel",
    component_sku: "7608",
    component_name: "Redken Colour Extend Blondage Shampoo 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21014",
    bundle_name:
      "Redken Colour Extend Blondage Shampoo & Mask Duo With FREE Microfibre Hair Towel",
    component_sku: "8490",
    component_name: "Redken Blondage Anti-Brass mask 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21015",
    bundle_name: "Redken Colour Extend Blondage Shampoo 300ml Duo",
    component_sku: "7608",
    component_name: "Redken Colour Extend Blondage Shampoo 300ml",
    component_qty: 2,
  },
  {
    bundle_sku: "21016",
    bundle_name: "Redken Colour Extend Blondage Conditioner 300ml Duo",
    component_sku: "7609",
    component_name: "Redken Color Extend Blondage Conditioner 300ml",
    component_qty: 2,
  },
  {
    bundle_sku: "21017",
    bundle_name:
      "Redken Acidic Color Gloss Shampoo & Conditioner With FREE Detangling Hairbrush",
    component_sku: "14141",
    component_name: "Redken Acidic Color Gloss Sulfate-Free Shampoo 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21017",
    bundle_name:
      "Redken Acidic Color Gloss Shampoo & Conditioner With FREE Detangling Hairbrush",
    component_sku: "14142",
    component_name: "Redken Acidic Color Gloss Conditioner 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21017",
    bundle_name:
      "Redken Acidic Color Gloss Shampoo & Conditioner With FREE Detangling Hairbrush",
    component_sku: "20520",
    component_name: "BeautyFeatures Detangling Hairbrush",
    component_qty: 1,
  },
  {
    bundle_sku: "21018",
    bundle_name: "Redken Acidic Color Gloss Shampoo 300ml Duo",
    component_sku: "14141",
    component_name: "Redken Acidic Color Gloss Sulfate-Free Shampoo 300ml",
    component_qty: 2,
  },
  {
    bundle_sku: "21019",
    bundle_name: "Redken Acidic Color Gloss Conditioner 300ml Duo",
    component_sku: "14142",
    component_name: "Redken Acidic Color Gloss Conditioner 300ml",
    component_qty: 2,
  },
  {
    bundle_sku: "21020",
    bundle_name:
      "Redken All Soft Shampoo & Conditioner Duo With FREE Detangling Hairbrush",
    component_sku: "20520",
    component_name: "BeautyFeatures Detangling Hairbrush",
    component_qty: 1,
  },
  {
    bundle_sku: "21020",
    bundle_name:
      "Redken All Soft Shampoo & Conditioner Duo With FREE Detangling Hairbrush",
    component_sku: "REDK_P042480",
    component_name: "Redken - All Soft Shampoo 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21020",
    bundle_name:
      "Redken All Soft Shampoo & Conditioner Duo With FREE Detangling Hairbrush",
    component_sku: "REDK_P042560",
    component_name: "Redken - All Soft Conditioner 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21021",
    bundle_name: "Redken All Soft Shampoo & Mask Duo",
    component_sku: "REDK_P042480",
    component_name: "Redken - All Soft Shampoo 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21021",
    bundle_name: "Redken All Soft Shampoo & Mask Duo",
    component_sku: "REDK_P042690",
    component_name: "Redken - All Soft Heavy Cream 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21022",
    bundle_name:
      "Redken All Soft Shampoo & Mask Duo With FREE Microfibre Hair Towel",
    component_sku: "20519",
    component_name: "BeautyFeatures Microfibre Hair Towel",
    component_qty: 1,
  },
  {
    bundle_sku: "21022",
    bundle_name:
      "Redken All Soft Shampoo & Mask Duo With FREE Microfibre Hair Towel",
    component_sku: "REDK_P042480",
    component_name: "Redken - All Soft Shampoo 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21022",
    bundle_name:
      "Redken All Soft Shampoo & Mask Duo With FREE Microfibre Hair Towel",
    component_sku: "REDK_P042690",
    component_name: "Redken - All Soft Heavy Cream 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21023",
    bundle_name: "Redken All Soft Bundle - The Full Routine",
    component_sku: "6443",
    component_name: "Redken All Soft Mega Hydramelt 150ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21023",
    bundle_name: "Redken All Soft Bundle - The Full Routine",
    component_sku: "8493",
    component_name: "Redken All Soft Argan-6 Oil 111ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21023",
    bundle_name: "Redken All Soft Bundle - The Full Routine",
    component_sku: "REDK_P042480",
    component_name: "Redken - All Soft Shampoo 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21023",
    bundle_name: "Redken All Soft Bundle - The Full Routine",
    component_sku: "REDK_P042560",
    component_name: "Redken - All Soft Conditioner 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21023",
    bundle_name: "Redken All Soft Bundle - The Full Routine",
    component_sku: "REDK_P042690",
    component_name: "Redken - All Soft Heavy Cream 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21024",
    bundle_name: "Redken All Soft Shampoo, Conditioner & Oil Bundle",
    component_sku: "8493",
    component_name: "Redken All Soft Argan-6 Oil 111ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21024",
    bundle_name: "Redken All Soft Shampoo, Conditioner & Oil Bundle",
    component_sku: "REDK_P042480",
    component_name: "Redken - All Soft Shampoo 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21024",
    bundle_name: "Redken All Soft Shampoo, Conditioner & Oil Bundle",
    component_sku: "REDK_P042560",
    component_name: "Redken - All Soft Conditioner 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21025",
    bundle_name: "Redken Extreme Lengths Shampoo & Conditioner Duo",
    component_sku: "13313",
    component_name: "Redken Extreme Length Conditioner 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21025",
    bundle_name: "Redken Extreme Lengths Shampoo & Conditioner Duo",
    component_sku: "13314",
    component_name: "Redken Extreme Length Shampoo 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21026",
    bundle_name:
      "Redken Extreme Lengths Shampoo & Conditioner Duo With FREE Detangling Hairbrush",
    component_sku: "13313",
    component_name: "Redken Extreme Length Conditioner 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21026",
    bundle_name:
      "Redken Extreme Lengths Shampoo & Conditioner Duo With FREE Detangling Hairbrush",
    component_sku: "13314",
    component_name: "Redken Extreme Length Shampoo 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21026",
    bundle_name:
      "Redken Extreme Lengths Shampoo & Conditioner Duo With FREE Detangling Hairbrush",
    component_sku: "20520",
    component_name: "BeautyFeatures Detangling Hairbrush",
    component_qty: 1,
  },
  {
    bundle_sku: "21027",
    bundle_name:
      "Redken Extreme Lengths Shampoo, Conditioner & Leave In Treatment Trio",
    component_sku: "13313",
    component_name: "Redken Extreme Length Conditioner 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21027",
    bundle_name:
      "Redken Extreme Lengths Shampoo, Conditioner & Leave In Treatment Trio",
    component_sku: "13314",
    component_name: "Redken Extreme Length Shampoo 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21027",
    bundle_name:
      "Redken Extreme Lengths Shampoo, Conditioner & Leave In Treatment Trio",
    component_sku: "13315",
    component_name:
      "Redken Extreme Length Leave In Treatment With Biotin 150ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21028",
    bundle_name: "Redken Extreme Lengths Shampoo & Leave In Treatment Duo",
    component_sku: "13314",
    component_name: "Redken Extreme Length Shampoo 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21028",
    bundle_name: "Redken Extreme Lengths Shampoo & Leave In Treatment Duo",
    component_sku: "13315",
    component_name:
      "Redken Extreme Length Leave In Treatment With Biotin 150ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21029",
    bundle_name:
      "Redken Extreme Lengths Shampoo & Leave In Treatment Duo With FREE Microfibre Hair Towel",
    component_sku: "13314",
    component_name: "Redken Extreme Length Shampoo 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21029",
    bundle_name:
      "Redken Extreme Lengths Shampoo & Leave In Treatment Duo With FREE Microfibre Hair Towel",
    component_sku: "13315",
    component_name:
      "Redken Extreme Length Leave In Treatment With Biotin 150ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21029",
    bundle_name:
      "Redken Extreme Lengths Shampoo & Leave In Treatment Duo With FREE Microfibre Hair Towel",
    component_sku: "20519",
    component_name: "BeautyFeatures Microfibre Hair Towel",
    component_qty: 1,
  },
  {
    bundle_sku: "21030",
    bundle_name: "Redken Extreme Lengths Shampoo 300ml Duo",
    component_sku: "13314",
    component_name: "Redken Extreme Length Shampoo 300ml",
    component_qty: 2,
  },
  {
    bundle_sku: "21031",
    bundle_name: "Redken Extreme Lengths Conditioner 300ml Duo",
    component_sku: "13313",
    component_name: "Redken Extreme Length Conditioner 300ml",
    component_qty: 2,
  },
  {
    bundle_sku: "21032",
    bundle_name: "Redken Blondage High Bright Shampoo & Conditioner Duo",
    component_sku: "11200",
    component_name: "Redken Blondage High Bright Shampoo 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21032",
    bundle_name: "Redken Blondage High Bright Shampoo & Conditioner Duo",
    component_sku: "11201",
    component_name: "Redken Blondage High Bright Conditioner 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21033",
    bundle_name:
      "Redken Blondage High Bright Shampoo & Conditioner Duo With FREE Detangling Hairbrush",
    component_sku: "11200",
    component_name: "Redken Blondage High Bright Shampoo 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21033",
    bundle_name:
      "Redken Blondage High Bright Shampoo & Conditioner Duo With FREE Detangling Hairbrush",
    component_sku: "11201",
    component_name: "Redken Blondage High Bright Conditioner 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21033",
    bundle_name:
      "Redken Blondage High Bright Shampoo & Conditioner Duo With FREE Detangling Hairbrush",
    component_sku: "20520",
    component_name: "BeautyFeatures Detangling Hairbrush",
    component_qty: 1,
  },
  {
    bundle_sku: "21034",
    bundle_name:
      "Redken Blondage High Bright Pre Shampoo, Shampoo & Conditioner Trio",
    component_sku: "11199",
    component_name: "Redken Blondage High Bright Pre-Treatment",
    component_qty: 1,
  },
  {
    bundle_sku: "21034",
    bundle_name:
      "Redken Blondage High Bright Pre Shampoo, Shampoo & Conditioner Trio",
    component_sku: "11200",
    component_name: "Redken Blondage High Bright Shampoo 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21034",
    bundle_name:
      "Redken Blondage High Bright Pre Shampoo, Shampoo & Conditioner Trio",
    component_sku: "11201",
    component_name: "Redken Blondage High Bright Conditioner 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21035",
    bundle_name: "Redken Blondage High Bright Shampoo 300ml Duo",
    component_sku: "11200",
    component_name: "Redken Blondage High Bright Shampoo 300ml",
    component_qty: 2,
  },
  {
    bundle_sku: "21036",
    bundle_name: "Redken Blondage High Bright Conditioner 300ml Duo",
    component_sku: "11201",
    component_name: "Redken Blondage High Bright Conditioner 300ml",
    component_qty: 2,
  },
  {
    bundle_sku: "21037",
    bundle_name:
      "Reken Volume Injection Shampoo & Conditioner Duo With FREE Detangling Hairbrush",
    component_sku: "10184",
    component_name: "Redken Volume Injection Shampoo 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21037",
    bundle_name:
      "Reken Volume Injection Shampoo & Conditioner Duo With FREE Detangling Hairbrush",
    component_sku: "13337",
    component_name: "Redken Volume Injection Conditioner 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21037",
    bundle_name:
      "Reken Volume Injection Shampoo & Conditioner Duo With FREE Detangling Hairbrush",
    component_sku: "20520",
    component_name: "BeautyFeatures Detangling Hairbrush",
    component_qty: 1,
  },
  {
    bundle_sku: "21038",
    bundle_name: "Reken Volume Injection Shampoo 300ml Duo",
    component_sku: "10184",
    component_name: "Redken Volume Injection Shampoo 300ml",
    component_qty: 2,
  },
  {
    bundle_sku: "21039",
    bundle_name: "Reken Volume Injection Conditioner 300ml Duo",
    component_sku: "13337",
    component_name: "Redken Volume Injection Conditioner 300ml",
    component_qty: 2,
  },
  {
    bundle_sku: "21040",
    bundle_name: "Redken Acidic Bonding Curls Shampoo & Conditioner Duo",
    component_sku: "20285",
    component_name: "Redken Acidic Bonding Curls Shampoo 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21040",
    bundle_name: "Redken Acidic Bonding Curls Shampoo & Conditioner Duo",
    component_sku: "20286",
    component_name: "Redken Acidic Bonding Curls Conditioner 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21041",
    bundle_name:
      "Redken Acidic Bonding Curls Shampoo & Conditioner With FREE Detangling Hairbrush",
    component_sku: "20285",
    component_name: "Redken Acidic Bonding Curls Shampoo 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21041",
    bundle_name:
      "Redken Acidic Bonding Curls Shampoo & Conditioner With FREE Detangling Hairbrush",
    component_sku: "20286",
    component_name: "Redken Acidic Bonding Curls Conditioner 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21041",
    bundle_name:
      "Redken Acidic Bonding Curls Shampoo & Conditioner With FREE Detangling Hairbrush",
    component_sku: "20520",
    component_name: "BeautyFeatures Detangling Hairbrush",
    component_qty: 1,
  },
  {
    bundle_sku: "21042",
    bundle_name:
      "Redken Acidic Bonding Curls Shampoo, Conditioner & Leave In Treatment Trio",
    component_sku: "20285",
    component_name: "Redken Acidic Bonding Curls Shampoo 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21042",
    bundle_name:
      "Redken Acidic Bonding Curls Shampoo, Conditioner & Leave In Treatment Trio",
    component_sku: "20286",
    component_name: "Redken Acidic Bonding Curls Conditioner 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21042",
    bundle_name:
      "Redken Acidic Bonding Curls Shampoo, Conditioner & Leave In Treatment Trio",
    component_sku: "20287",
    component_name: "Redken Acidic Bonding Curls Leave-In Treatment 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21043",
    bundle_name: "Redken Acidic Bonding Curls Shampoo & Leave In Treatment Duo",
    component_sku: "20285",
    component_name: "Redken Acidic Bonding Curls Shampoo 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21043",
    bundle_name: "Redken Acidic Bonding Curls Shampoo & Leave In Treatment Duo",
    component_sku: "20287",
    component_name: "Redken Acidic Bonding Curls Leave-In Treatment 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21044",
    bundle_name:
      "Redken Acidic Bonding Curls Shampoo & Leave In Treatment With FREE Microfibre Hair Towel",
    component_sku: "20285",
    component_name: "Redken Acidic Bonding Curls Shampoo 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21044",
    bundle_name:
      "Redken Acidic Bonding Curls Shampoo & Leave In Treatment With FREE Microfibre Hair Towel",
    component_sku: "20287",
    component_name: "Redken Acidic Bonding Curls Leave-In Treatment 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21044",
    bundle_name:
      "Redken Acidic Bonding Curls Shampoo & Leave In Treatment With FREE Microfibre Hair Towel",
    component_sku: "20519",
    component_name: "BeautyFeatures Microfibre Hair Towel",
    component_qty: 1,
  },
  {
    bundle_sku: "21045",
    bundle_name: "Redken Acidic Bonding Curls Complete Set",
    component_sku: "20285",
    component_name: "Redken Acidic Bonding Curls Shampoo 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21045",
    bundle_name: "Redken Acidic Bonding Curls Complete Set",
    component_sku: "20286",
    component_name: "Redken Acidic Bonding Curls Conditioner 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21045",
    bundle_name: "Redken Acidic Bonding Curls Complete Set",
    component_sku: "20287",
    component_name: "Redken Acidic Bonding Curls Leave-In Treatment 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21045",
    bundle_name: "Redken Acidic Bonding Curls Complete Set",
    component_sku: "20288",
    component_name: "Redken Hydrating Curl Cream 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21045",
    bundle_name: "Redken Acidic Bonding Curls Complete Set",
    component_sku: "20289",
    component_name: "Redken Sculpting Curl Gel 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21045",
    bundle_name: "Redken Acidic Bonding Curls Complete Set",
    component_sku: "20290",
    component_name: "Redken Refreshing Curl Mist 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21046",
    bundle_name: "Redken Acidic Bonding Curls Curl Protection & Control Set",
    component_sku: "20287",
    component_name: "Redken Acidic Bonding Curls Leave-In Treatment 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21046",
    bundle_name: "Redken Acidic Bonding Curls Curl Protection & Control Set",
    component_sku: "20288",
    component_name: "Redken Hydrating Curl Cream 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21046",
    bundle_name: "Redken Acidic Bonding Curls Curl Protection & Control Set",
    component_sku: "20289",
    component_name: "Redken Sculpting Curl Gel 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21046",
    bundle_name: "Redken Acidic Bonding Curls Curl Protection & Control Set",
    component_sku: "20290",
    component_name: "Redken Refreshing Curl Mist 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21047",
    bundle_name: "Redken Acidic Bonding Curls Curl Holding Trio",
    component_sku: "20285",
    component_name: "Redken Acidic Bonding Curls Shampoo 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21047",
    bundle_name: "Redken Acidic Bonding Curls Curl Holding Trio",
    component_sku: "20286",
    component_name: "Redken Acidic Bonding Curls Conditioner 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21047",
    bundle_name: "Redken Acidic Bonding Curls Curl Holding Trio",
    component_sku: "20289",
    component_name: "Redken Sculpting Curl Gel 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21048",
    bundle_name: "Redken Acidic Bonding Curls Curl Defining Trio",
    component_sku: "20285",
    component_name: "Redken Acidic Bonding Curls Shampoo 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21048",
    bundle_name: "Redken Acidic Bonding Curls Curl Defining Trio",
    component_sku: "20286",
    component_name: "Redken Acidic Bonding Curls Conditioner 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21048",
    bundle_name: "Redken Acidic Bonding Curls Curl Defining Trio",
    component_sku: "20288",
    component_name: "Redken Hydrating Curl Cream 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21049",
    bundle_name: "Redken Acidic Bonding Curls Curl Refreshing Trio",
    component_sku: "20285",
    component_name: "Redken Acidic Bonding Curls Shampoo 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21049",
    bundle_name: "Redken Acidic Bonding Curls Curl Refreshing Trio",
    component_sku: "20286",
    component_name: "Redken Acidic Bonding Curls Conditioner 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21049",
    bundle_name: "Redken Acidic Bonding Curls Curl Refreshing Trio",
    component_sku: "20290",
    component_name: "Redken Refreshing Curl Mist 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21050",
    bundle_name: "Redken Acidic Bonding Curls Shampoo 300ml Duo",
    component_sku: "20285",
    component_name: "Redken Acidic Bonding Curls Shampoo 300ml",
    component_qty: 2,
  },
  {
    bundle_sku: "21051",
    bundle_name: "Redken Acidic Bonding Curls Conditioner 300ml Duo",
    component_sku: "20286",
    component_name: "Redken Acidic Bonding Curls Conditioner 300ml",
    component_qty: 2,
  },
  {
    bundle_sku: "21052",
    bundle_name: "Redken All Soft Mega Curls Shampoo & Conditioner Duo",
    component_sku: "12627",
    component_name: "Redken All Soft Mega Curl Shampoo 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21052",
    bundle_name: "Redken All Soft Mega Curls Shampoo & Conditioner Duo",
    component_sku: "13311",
    component_name: "Redken All Soft Mega Curl Conditioner 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21053",
    bundle_name:
      "Redken All Soft Mega Curls Shampoo & Conditioner With FREE Detangling Hairbrush",
    component_sku: "12627",
    component_name: "Redken All Soft Mega Curl Shampoo 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21053",
    bundle_name:
      "Redken All Soft Mega Curls Shampoo & Conditioner With FREE Detangling Hairbrush",
    component_sku: "13311",
    component_name: "Redken All Soft Mega Curl Conditioner 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21053",
    bundle_name:
      "Redken All Soft Mega Curls Shampoo & Conditioner With FREE Detangling Hairbrush",
    component_sku: "20520",
    component_name: "BeautyFeatures Detangling Hairbrush",
    component_qty: 1,
  },
  {
    bundle_sku: "21054",
    bundle_name:
      "Redken All Soft Mega Curls Shampoo, Conditioner & Leave In Conditioner Trio",
    component_sku: "12627",
    component_name: "Redken All Soft Mega Curl Shampoo 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21054",
    bundle_name:
      "Redken All Soft Mega Curls Shampoo, Conditioner & Leave In Conditioner Trio",
    component_sku: "12628",
    component_name:
      "Redken All Soft Mega Curl Hydramelt Leave In Conditioner 150ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21054",
    bundle_name:
      "Redken All Soft Mega Curls Shampoo, Conditioner & Leave In Conditioner Trio",
    component_sku: "13311",
    component_name: "Redken All Soft Mega Curl Conditioner 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21055",
    bundle_name: "Redken All Soft Mega Curls Shampoo 300ml Duo",
    component_sku: "12627",
    component_name: "Redken All Soft Mega Curl Shampoo 300ml",
    component_qty: 2,
  },
  {
    bundle_sku: "21056",
    bundle_name: "Redken All Soft Mega Curls Conditioner 300ml Duo",
    component_sku: "13311",
    component_name: "Redken All Soft Mega Curl Conditioner 300ml",
    component_qty: 2,
  },
  {
    bundle_sku: "21059",
    bundle_name: "Matrix Instacure Shampoo & Conditioner Duo",
    component_sku: "11740",
    component_name: "Matrix Instacure Anti-Breakage Shampoo 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21059",
    bundle_name: "Matrix Instacure Shampoo & Conditioner Duo",
    component_sku: "11741",
    component_name: "Matrix Instacure Anti-Breakage Conditioner 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21060",
    bundle_name:
      "Matrix Instacure Shampoo & Conditioner Duo With FREE Detangling Hairbrush",
    component_sku: "11740",
    component_name: "Matrix Instacure Anti-Breakage Shampoo 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21060",
    bundle_name:
      "Matrix Instacure Shampoo & Conditioner Duo With FREE Detangling Hairbrush",
    component_sku: "11741",
    component_name: "Matrix Instacure Anti-Breakage Conditioner 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21060",
    bundle_name:
      "Matrix Instacure Shampoo & Conditioner Duo With FREE Detangling Hairbrush",
    component_sku: "20520",
    component_name: "BeautyFeatures Detangling Hairbrush",
    component_qty: 1,
  },
  {
    bundle_sku: "21061",
    bundle_name:
      "Matrix Instacure Shampoo,Conditioner & Anti Porosity Spray Trio",
    component_sku: "11740",
    component_name: "Matrix Instacure Anti-Breakage Shampoo 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21061",
    bundle_name:
      "Matrix Instacure Shampoo,Conditioner & Anti Porosity Spray Trio",
    component_sku: "11741",
    component_name: "Matrix Instacure Anti-Breakage Conditioner 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21061",
    bundle_name:
      "Matrix Instacure Shampoo,Conditioner & Anti Porosity Spray Trio",
    component_sku: "11742",
    component_name: "Matrix Instacure Anti-Breakage Porosity Spray 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21062",
    bundle_name: "Matrix A Curl Can Dream Shampoo & Mask Duo",
    component_sku: "11992",
    component_name: "Matrix A Curl Can Dream Gentle Shampoo 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21062",
    bundle_name: "Matrix A Curl Can Dream Shampoo & Mask Duo",
    component_sku: "11993",
    component_name: "Matrix A Curl Can Dream Rich Mask 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21063",
    bundle_name:
      "Matrix A Curl Can Dream Shampoo & Mask Duo With FREE Microfibre Hair Towel",
    component_sku: "11992",
    component_name: "Matrix A Curl Can Dream Gentle Shampoo 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21063",
    bundle_name:
      "Matrix A Curl Can Dream Shampoo & Mask Duo With FREE Microfibre Hair Towel",
    component_sku: "11993",
    component_name: "Matrix A Curl Can Dream Rich Mask 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21063",
    bundle_name:
      "Matrix A Curl Can Dream Shampoo & Mask Duo With FREE Microfibre Hair Towel",
    component_sku: "20519",
    component_name: "BeautyFeatures Microfibre Hair Towel",
    component_qty: 1,
  },
  {
    bundle_sku: "21064",
    bundle_name: "Matrix Total Results Brass Off Shampoo & Conditioner Duo",
    component_sku: "8248",
    component_name: "Matrix Total Results Brass Off Shampoo 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21064",
    bundle_name: "Matrix Total Results Brass Off Shampoo & Conditioner Duo",
    component_sku: "8249",
    component_name: "Matrix Total Results Brass Off Conditioner 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21065",
    bundle_name:
      "Matrix Total Results Brass Off Shampoo & Conditioner Duo With FREE Detangling Hairbrush",
    component_sku: "20520",
    component_name: "BeautyFeatures Detangling Hairbrush",
    component_qty: 1,
  },
  {
    bundle_sku: "21065",
    bundle_name:
      "Matrix Total Results Brass Off Shampoo & Conditioner Duo With FREE Detangling Hairbrush",
    component_sku: "8248",
    component_name: "Matrix Total Results Brass Off Shampoo 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21065",
    bundle_name:
      "Matrix Total Results Brass Off Shampoo & Conditioner Duo With FREE Detangling Hairbrush",
    component_sku: "8249",
    component_name: "Matrix Total Results Brass Off Conditioner 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21066",
    bundle_name: "Matrix A Curl Can Dream Bundle - The Full Routine",
    component_sku: "11991",
    component_name: "Matrix A Curl Can Dream Light Hold Defining Gel 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21066",
    bundle_name: "Matrix A Curl Can Dream Bundle - The Full Routine",
    component_sku: "11992",
    component_name: "Matrix A Curl Can Dream Gentle Shampoo 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21066",
    bundle_name: "Matrix A Curl Can Dream Bundle - The Full Routine",
    component_sku: "11993",
    component_name: "Matrix A Curl Can Dream Rich Mask 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21066",
    bundle_name: "Matrix A Curl Can Dream Bundle - The Full Routine",
    component_sku: "11994",
    component_name: "Matrix A Curl Can Dream Moisturising Cream 500ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21067",
    bundle_name: "Matrix Instacure Shampoo 300ml Duo",
    component_sku: "11740",
    component_name: "Matrix Instacure Anti-Breakage Shampoo 300ml",
    component_qty: 2,
  },
  {
    bundle_sku: "21068",
    bundle_name: "Matrix Instacure Conditioner 300ml Duo",
    component_sku: "11741",
    component_name: "Matrix Instacure Anti-Breakage Conditioner 300ml",
    component_qty: 2,
  },
  {
    bundle_sku: "21069",
    bundle_name: "Matrix A Curl Can Dream Shampoo 300ml Duo",
    component_sku: "11992",
    component_name: "Matrix A Curl Can Dream Gentle Shampoo 300ml",
    component_qty: 2,
  },
  {
    bundle_sku: "21070",
    bundle_name: "Matrix Total Results Brass Off Shampoo 300ml Duo",
    component_sku: "8248",
    component_name: "Matrix Total Results Brass Off Shampoo 300ml",
    component_qty: 2,
  },
  {
    bundle_sku: "21071",
    bundle_name: "Matrix Total Results Brass Off Conditioner 300ml Duo",
    component_sku: "8249",
    component_name: "Matrix Total Results Brass Off Conditioner 300ml",
    component_qty: 2,
  },
  {
    bundle_sku: "21073",
    bundle_name: "Matrix Keep Me Vivid Shampoo 300ml Duo",
    component_sku: "8250",
    component_name: "Matrix Total Results Keep Me Vivid Shampoo 300ml",
    component_qty: 2,
  },
  {
    bundle_sku: "21074",
    bundle_name: "Matrix Keep Me Vivid Conditioner 300ml Duo",
    component_sku: "8251",
    component_name: "Matrix Total Results Keep Me Vivid Conditioner 300ml",
    component_qty: 2,
  },
  {
    bundle_sku: "21075",
    bundle_name:
      "Matrix Keep Me Vivid Shampoo & Conditioner Duo With FREE Detangling Hairbrush",
    component_sku: "20520",
    component_name: "BeautyFeatures Detangling Hairbrush",
    component_qty: 1,
  },
  {
    bundle_sku: "21075",
    bundle_name:
      "Matrix Keep Me Vivid Shampoo & Conditioner Duo With FREE Detangling Hairbrush",
    component_sku: "8250",
    component_name: "Matrix Total Results Keep Me Vivid Shampoo 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21075",
    bundle_name:
      "Matrix Keep Me Vivid Shampoo & Conditioner Duo With FREE Detangling Hairbrush",
    component_sku: "8251",
    component_name: "Matrix Total Results Keep Me Vivid Conditioner 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21081",
    bundle_name: "Milkshake Silver Shine Shampoo & Conditioner Duo",
    component_sku: "14568",
    component_name: "Milkshake Silver Shine Shampoo 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21081",
    bundle_name: "Milkshake Silver Shine Shampoo & Conditioner Duo",
    component_sku: "14570",
    component_name: "Milkshake Silver Shine Conditioner 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21082",
    bundle_name:
      "Milkshake Silver Shine Shampoo & Conditioner Duo With FREE Detangling Hairbrush",
    component_sku: "14569",
    component_name: "Milkshake Silver Shine Light Shampoo 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21082",
    bundle_name:
      "Milkshake Silver Shine Shampoo & Conditioner Duo With FREE Detangling Hairbrush",
    component_sku: "14570",
    component_name: "Milkshake Silver Shine Conditioner 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21082",
    bundle_name:
      "Milkshake Silver Shine Shampoo & Conditioner Duo With FREE Detangling Hairbrush",
    component_sku: "20520",
    component_name: "BeautyFeatures Detangling Hairbrush",
    component_qty: 1,
  },
  {
    bundle_sku: "21083",
    bundle_name:
      "Milkshake Silver Shine Shampoo, Conditioner & Whipped Cream Trio",
    component_sku: "14565",
    component_name: "Milkshake Silver Shine Whipped Cream 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21083",
    bundle_name:
      "Milkshake Silver Shine Shampoo, Conditioner & Whipped Cream Trio",
    component_sku: "14569",
    component_name: "Milkshake Silver Shine Light Shampoo 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21083",
    bundle_name:
      "Milkshake Silver Shine Shampoo, Conditioner & Whipped Cream Trio",
    component_sku: "14570",
    component_name: "Milkshake Silver Shine Conditioner 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21084",
    bundle_name: "Milkshake Colour Maintainer Shampoo & Conditioner Duo",
    component_sku: "14527",
    component_name: "Milkshake Colour Maintainer Shampoo 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21084",
    bundle_name: "Milkshake Colour Maintainer Shampoo & Conditioner Duo",
    component_sku: "14528",
    component_name: "Milkshake Colour Maintainer Conditioner 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21085",
    bundle_name:
      "Milkshake Colour Maintainer Shampoo & Conditioner Duo With FREE Detangling Hairbrush",
    component_sku: "14527",
    component_name: "Milkshake Colour Maintainer Shampoo 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21085",
    bundle_name:
      "Milkshake Colour Maintainer Shampoo & Conditioner Duo With FREE Detangling Hairbrush",
    component_sku: "14528",
    component_name: "Milkshake Colour Maintainer Conditioner 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21085",
    bundle_name:
      "Milkshake Colour Maintainer Shampoo & Conditioner Duo With FREE Detangling Hairbrush",
    component_sku: "20520",
    component_name: "BeautyFeatures Detangling Hairbrush",
    component_qty: 1,
  },
  {
    bundle_sku: "21086",
    bundle_name: "Milkshake Volume Solution Shampoo & Conditioner Duo",
    component_sku: "14555",
    component_name: "Milkshake Volume Solution Shampoo 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21086",
    bundle_name: "Milkshake Volume Solution Shampoo & Conditioner Duo",
    component_sku: "14556",
    component_name: "Milkshake Volume Solution Conditioner 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21087",
    bundle_name:
      "Milkshake Volume Solution Shampoo & Conditioner Duo With FREE Detangling Hairbrush",
    component_sku: "14555",
    component_name: "Milkshake Volume Solution Shampoo 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21087",
    bundle_name:
      "Milkshake Volume Solution Shampoo & Conditioner Duo With FREE Detangling Hairbrush",
    component_sku: "14556",
    component_name: "Milkshake Volume Solution Conditioner 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21087",
    bundle_name:
      "Milkshake Volume Solution Shampoo & Conditioner Duo With FREE Detangling Hairbrush",
    component_sku: "20520",
    component_name: "BeautyFeatures Detangling Hairbrush",
    component_qty: 1,
  },
  {
    bundle_sku: "21088",
    bundle_name: "Milkshake Integrity Shampoo & Conditioner Duo",
    component_sku: "14538",
    component_name: "Milkshake Integrity Nourishing Shampoo 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21088",
    bundle_name: "Milkshake Integrity Shampoo & Conditioner Duo",
    component_sku: "14539",
    component_name: "Milkshake Integrity Nourishing Conditioner 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21089",
    bundle_name:
      "Milkshake Integrity Shampoo & Conditioner Duo With FREE Detangling Hairbrush",
    component_sku: "14538",
    component_name: "Milkshake Integrity Nourishing Shampoo 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21089",
    bundle_name:
      "Milkshake Integrity Shampoo & Conditioner Duo With FREE Detangling Hairbrush",
    component_sku: "14539",
    component_name: "Milkshake Integrity Nourishing Conditioner 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21089",
    bundle_name:
      "Milkshake Integrity Shampoo & Conditioner Duo With FREE Detangling Hairbrush",
    component_sku: "20520",
    component_name: "BeautyFeatures Detangling Hairbrush",
    component_qty: 1,
  },
  {
    bundle_sku: "21090",
    bundle_name: "Milkshake Integrity Bundle - The Full Routine",
    component_sku: "14538",
    component_name: "Milkshake Integrity Nourishing Shampoo 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21090",
    bundle_name: "Milkshake Integrity Bundle - The Full Routine",
    component_sku: "14539",
    component_name: "Milkshake Integrity Nourishing Conditioner 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21090",
    bundle_name: "Milkshake Integrity Bundle - The Full Routine",
    component_sku: "14540",
    component_name: "Milkshake Integrity Intensive Treatment 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21090",
    bundle_name: "Milkshake Integrity Bundle - The Full Routine",
    component_sku: "14541",
    component_name: "Milkshake Integrity Repairing Hair Lotion 8 x 10ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21091",
    bundle_name: "Milkshake Moisture Plus Shampoo & Conditioner Duo",
    component_sku: "14546",
    component_name: "Milkshake Moisture Plus Shampoo 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21091",
    bundle_name: "Milkshake Moisture Plus Shampoo & Conditioner Duo",
    component_sku: "14547",
    component_name: "Milkshake Moisture Plus Conditioner 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21092",
    bundle_name:
      "Milkshake Moisture Plus Shampoo & Conditioner Duo With FREE Detangling Hairbrush",
    component_sku: "14546",
    component_name: "Milkshake Moisture Plus Shampoo 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21092",
    bundle_name:
      "Milkshake Moisture Plus Shampoo & Conditioner Duo With FREE Detangling Hairbrush",
    component_sku: "14547",
    component_name: "Milkshake Moisture Plus Conditioner 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21092",
    bundle_name:
      "Milkshake Moisture Plus Shampoo & Conditioner Duo With FREE Detangling Hairbrush",
    component_sku: "20520",
    component_name: "BeautyFeatures Detangling Hairbrush",
    component_qty: 1,
  },
  {
    bundle_sku: "21093",
    bundle_name:
      "Milkshake Moisture Plus Shampoo, Conditioner & Whipped Cream Trio",
    component_sku: "14546",
    component_name: "Milkshake Moisture Plus Shampoo 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21093",
    bundle_name:
      "Milkshake Moisture Plus Shampoo, Conditioner & Whipped Cream Trio",
    component_sku: "14547",
    component_name: "Milkshake Moisture Plus Conditioner 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21093",
    bundle_name:
      "Milkshake Moisture Plus Shampoo, Conditioner & Whipped Cream Trio",
    component_sku: "14548",
    component_name: "Milkshake Moisture Plus Whipped Cream 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21094",
    bundle_name: "Milkshake Curl Passion Shampoo & Conditioner Duo",
    component_sku: "14551",
    component_name: "Milkshake Curl Passion Shampoo 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21094",
    bundle_name: "Milkshake Curl Passion Shampoo & Conditioner Duo",
    component_sku: "14552",
    component_name: "Milkshake Curl Passion Conditioner 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21095",
    bundle_name:
      "Milkshake Curl Passion Shampoo & Conditioner Duo With FREE Detangling Hairbrush",
    component_sku: "14551",
    component_name: "Milkshake Curl Passion Shampoo 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21095",
    bundle_name:
      "Milkshake Curl Passion Shampoo & Conditioner Duo With FREE Detangling Hairbrush",
    component_sku: "14552",
    component_name: "Milkshake Curl Passion Conditioner 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21095",
    bundle_name:
      "Milkshake Curl Passion Shampoo & Conditioner Duo With FREE Detangling Hairbrush",
    component_sku: "20520",
    component_name: "BeautyFeatures Detangling Hairbrush",
    component_qty: 1,
  },
  {
    bundle_sku: "21096",
    bundle_name: "Milkshake Curl Passion Bundle - The Full Routine",
    component_sku: "14551",
    component_name: "Milkshake Curl Passion Shampoo 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21096",
    bundle_name: "Milkshake Curl Passion Bundle - The Full Routine",
    component_sku: "14552",
    component_name: "Milkshake Curl Passion Conditioner 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21096",
    bundle_name: "Milkshake Curl Passion Bundle - The Full Routine",
    component_sku: "14553",
    component_name: "Milkshake Curl Passion Curl Perfectionist 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21096",
    bundle_name: "Milkshake Curl Passion Bundle - The Full Routine",
    component_sku: "14554",
    component_name: "Milkshake Curl Passion Curl Shaper 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21097",
    bundle_name: "Milkshake Energizing Shampoo & Conditioner Duo",
    component_sku: "14561",
    component_name: "Milkshake Energizing Shampoo 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21097",
    bundle_name: "Milkshake Energizing Shampoo & Conditioner Duo",
    component_sku: "14562",
    component_name: "Milkshake Energizing Conditioner 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21098",
    bundle_name:
      "Milkshake Energizing Shampoo & Conditioner Duo With FREE Detangling Hairbrush",
    component_sku: "14561",
    component_name: "Milkshake Energizing Shampoo 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21098",
    bundle_name:
      "Milkshake Energizing Shampoo & Conditioner Duo With FREE Detangling Hairbrush",
    component_sku: "14562",
    component_name: "Milkshake Energizing Conditioner 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21098",
    bundle_name:
      "Milkshake Energizing Shampoo & Conditioner Duo With FREE Detangling Hairbrush",
    component_sku: "20520",
    component_name: "BeautyFeatures Detangling Hairbrush",
    component_qty: 1,
  },
  {
    bundle_sku: "21099",
    bundle_name:
      "Milkshake Energizing Shampoo, Conditioner & Scalp Treatment Trio",
    component_sku: "14561",
    component_name: "Milkshake Energizing Shampoo 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21099",
    bundle_name:
      "Milkshake Energizing Shampoo, Conditioner & Scalp Treatment Trio",
    component_sku: "14562",
    component_name: "Milkshake Energizing Conditioner 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21099",
    bundle_name:
      "Milkshake Energizing Shampoo, Conditioner & Scalp Treatment Trio",
    component_sku: "14563",
    component_name: "Milkshake Energizing Scalp Treatment 30ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21100",
    bundle_name: "Milkshake Glistening Trio",
    component_sku: "14549",
    component_name: "Milkshake Glistening Serum 100ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21100",
    bundle_name: "Milkshake Glistening Trio",
    component_sku: "14550",
    component_name: "Milkshake Glistening Spray 100ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21100",
    bundle_name: "Milkshake Glistening Trio",
    component_sku: "14560",
    component_name: "Milkshake Glistening Argan Oil 50ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21101",
    bundle_name: "Milkshake Cold Brunette Shampoo & Conditioner Duo",
    component_sku: "14571",
    component_name: "Milkshake Cold Brunette Shampoo 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21101",
    bundle_name: "Milkshake Cold Brunette Shampoo & Conditioner Duo",
    component_sku: "14572",
    component_name: "Milkshake Cold Brunette Conditioner 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21102",
    bundle_name:
      "Milkshake Cold Brunette Shampoo & Conditioner Duo With FREE Detangling Hairbrush",
    component_sku: "14571",
    component_name: "Milkshake Cold Brunette Shampoo 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21102",
    bundle_name:
      "Milkshake Cold Brunette Shampoo & Conditioner Duo With FREE Detangling Hairbrush",
    component_sku: "14572",
    component_name: "Milkshake Cold Brunette Conditioner 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21102",
    bundle_name:
      "Milkshake Cold Brunette Shampoo & Conditioner Duo With FREE Detangling Hairbrush",
    component_sku: "20520",
    component_name: "BeautyFeatures Detangling Hairbrush",
    component_qty: 1,
  },
  {
    bundle_sku: "21103",
    bundle_name: "Milkshake Icy Blond Shampoo & Conditioner Duo",
    component_sku: "14573",
    component_name: "Milkshake Icy Blond Shampoo 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21103",
    bundle_name: "Milkshake Icy Blond Shampoo & Conditioner Duo",
    component_sku: "14574",
    component_name: "Milkshake Icy Blond Conditioner 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21104",
    bundle_name:
      "Milkshake Icy Blond Shampoo & Conditioner Duo With FREE Detangling Hairbrush",
    component_sku: "14573",
    component_name: "Milkshake Icy Blond Shampoo 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21104",
    bundle_name:
      "Milkshake Icy Blond Shampoo & Conditioner Duo With FREE Detangling Hairbrush",
    component_sku: "14574",
    component_name: "Milkshake Icy Blond Conditioner 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21104",
    bundle_name:
      "Milkshake Icy Blond Shampoo & Conditioner Duo With FREE Detangling Hairbrush",
    component_sku: "20520",
    component_name: "BeautyFeatures Detangling Hairbrush",
    component_qty: 1,
  },
  {
    bundle_sku: "21105",
    bundle_name: "Milkshake Pink Lemonade Shampoo & Conditioner Duo",
    component_sku: "14566",
    component_name: "Milkshake Pink Lemonade Shampoo 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21105",
    bundle_name: "Milkshake Pink Lemonade Shampoo & Conditioner Duo",
    component_sku: "14567",
    component_name: "Milkshake Pink Lemonade Conditioner 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21106",
    bundle_name:
      "Milkshake Pink Lemonade Shampoo & Conditioner Duo With FREE Detangling Hairbrush",
    component_sku: "14566",
    component_name: "Milkshake Pink Lemonade Shampoo 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21106",
    bundle_name:
      "Milkshake Pink Lemonade Shampoo & Conditioner Duo With FREE Detangling Hairbrush",
    component_sku: "14567",
    component_name: "Milkshake Pink Lemonade Conditioner 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21106",
    bundle_name:
      "Milkshake Pink Lemonade Shampoo & Conditioner Duo With FREE Detangling Hairbrush",
    component_sku: "20520",
    component_name: "BeautyFeatures Detangling Hairbrush",
    component_qty: 1,
  },
  {
    bundle_sku: "21107",
    bundle_name: "R+Co On A Cloud Shampoo & Mask Duo",
    component_sku: "13955",
    component_name: "R+Co On A Cloud Baobab Oil Repair Masque 147ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21107",
    bundle_name: "R+Co On A Cloud Shampoo & Mask Duo",
    component_sku: "13956",
    component_name: "R+Co On A Cloud  Baobab Repair Shampoo 251ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21108",
    bundle_name:
      "R+Co On A Cloud Shampoo & Mask Duo FREE Microfibre Hair Towel",
    component_sku: "13955",
    component_name: "R+Co On A Cloud Baobab Oil Repair Masque 147ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21108",
    bundle_name:
      "R+Co On A Cloud Shampoo & Mask Duo FREE Microfibre Hair Towel",
    component_sku: "13956",
    component_name: "R+Co On A Cloud  Baobab Repair Shampoo 251ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21108",
    bundle_name:
      "R+Co On A Cloud Shampoo & Mask Duo FREE Microfibre Hair Towel",
    component_sku: "20519",
    component_name: "BeautyFeatures Microfibre Hair Towel",
    component_qty: 1,
  },
  {
    bundle_sku: "21109",
    bundle_name: "R+Co On A Cloud Shampoo, Mask & Styler Trio",
    component_sku: "13946",
    component_name: "R+Co On A Cloud Baobab Repair Splash On Styler 124ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21109",
    bundle_name: "R+Co On A Cloud Shampoo, Mask & Styler Trio",
    component_sku: "13955",
    component_name: "R+Co On A Cloud Baobab Oil Repair Masque 147ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21109",
    bundle_name: "R+Co On A Cloud Shampoo, Mask & Styler Trio",
    component_sku: "13956",
    component_name: "R+Co On A Cloud  Baobab Repair Shampoo 251ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21110",
    bundle_name: "R+Co Television Shampoo & Conditioner Duo",
    component_sku: "8729",
    component_name: "R+Co Television Perfect Hair Shampoo 241ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21110",
    bundle_name: "R+Co Television Shampoo & Conditioner Duo",
    component_sku: "8730",
    component_name: "R+Co Television Perfect Hair Conditioner 241ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21111",
    bundle_name:
      "R+Co Television Shampoo & Conditioner Duo With FREE Detangling Hairbrush",
    component_sku: "20520",
    component_name: "BeautyFeatures Detangling Hairbrush",
    component_qty: 1,
  },
  {
    bundle_sku: "21111",
    bundle_name:
      "R+Co Television Shampoo & Conditioner Duo With FREE Detangling Hairbrush",
    component_sku: "8729",
    component_name: "R+Co Television Perfect Hair Shampoo 241ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21111",
    bundle_name:
      "R+Co Television Shampoo & Conditioner Duo With FREE Detangling Hairbrush",
    component_sku: "8730",
    component_name: "R+Co Television Perfect Hair Conditioner 241ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21112",
    bundle_name: "R+Co Dallas Biotin Shampoo & Conditioner Duo",
    component_sku: "8727",
    component_name: "R+Co Dallas Biotin Thickening Shampoo 251ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21112",
    bundle_name: "R+Co Dallas Biotin Shampoo & Conditioner Duo",
    component_sku: "8728",
    component_name: "R+Co Dallas Biotin Thickening Conditioner 251ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21113",
    bundle_name:
      "R+Co Dallas Biotin Shampoo & Conditioner Duo With FREE Detangling Hairbrush",
    component_sku: "20520",
    component_name: "BeautyFeatures Detangling Hairbrush",
    component_qty: 1,
  },
  {
    bundle_sku: "21113",
    bundle_name:
      "R+Co Dallas Biotin Shampoo & Conditioner Duo With FREE Detangling Hairbrush",
    component_sku: "8727",
    component_name: "R+Co Dallas Biotin Thickening Shampoo 251ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21113",
    bundle_name:
      "R+Co Dallas Biotin Shampoo & Conditioner Duo With FREE Detangling Hairbrush",
    component_sku: "8728",
    component_name: "R+Co Dallas Biotin Thickening Conditioner 251ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21114",
    bundle_name: "R+Co Bel Air Shampoo & Conditioner Duo",
    component_sku: "8725",
    component_name:
      "R+Co Bel Air Smoothing Shampoo + Anti Oxidant Complex 251ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21114",
    bundle_name: "R+Co Bel Air Shampoo & Conditioner Duo",
    component_sku: "8726",
    component_name:
      "R+Co Bel Air Smoothing Conditioner + Anti Oxidant Complex 241ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21115",
    bundle_name:
      "R+Co Bel Air Shampoo & Conditioner Duo With FREE Detangling Hairbrush",
    component_sku: "20520",
    component_name: "BeautyFeatures Detangling Hairbrush",
    component_qty: 1,
  },
  {
    bundle_sku: "21115",
    bundle_name:
      "R+Co Bel Air Shampoo & Conditioner Duo With FREE Detangling Hairbrush",
    component_sku: "8725",
    component_name:
      "R+Co Bel Air Smoothing Shampoo + Anti Oxidant Complex 251ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21115",
    bundle_name:
      "R+Co Bel Air Shampoo & Conditioner Duo With FREE Detangling Hairbrush",
    component_sku: "8726",
    component_name:
      "R+Co Bel Air Smoothing Conditioner + Anti Oxidant Complex 241ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21116",
    bundle_name: "R+Co Gemstone Shampoo & Conditioner Duo",
    component_sku: "11258",
    component_name: "R+Co GEMSTONE Color Conditioner 251ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21116",
    bundle_name: "R+Co Gemstone Shampoo & Conditioner Duo",
    component_sku: "8731",
    component_name: "R+Co Gemstone Color Shampoo 251ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21117",
    bundle_name:
      "R+Co Gemstone Shampoo & Conditioner Duo With FREE Detangling Hairbrush",
    component_sku: "11258",
    component_name: "R+Co GEMSTONE Color Conditioner 251ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21117",
    bundle_name:
      "R+Co Gemstone Shampoo & Conditioner Duo With FREE Detangling Hairbrush",
    component_sku: "20520",
    component_name: "BeautyFeatures Detangling Hairbrush",
    component_qty: 1,
  },
  {
    bundle_sku: "21117",
    bundle_name:
      "R+Co Gemstone Shampoo & Conditioner Duo With FREE Detangling Hairbrush",
    component_sku: "8731",
    component_name: "R+Co Gemstone Color Shampoo 251ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21118",
    bundle_name: "R+Co Gemstone Bundle - The Full Routine",
    component_sku: "11230",
    component_name: "R+Co Gemstone Pre-Shampoo Colour Protect Masque 172ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21118",
    bundle_name: "R+Co Gemstone Bundle - The Full Routine",
    component_sku: "11231",
    component_name: "R+Co Gemstone Ultra Shine Glossing Treatment 147ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21118",
    bundle_name: "R+Co Gemstone Bundle - The Full Routine",
    component_sku: "11258",
    component_name: "R+Co GEMSTONE Color Conditioner 251ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21118",
    bundle_name: "R+Co Gemstone Bundle - The Full Routine",
    component_sku: "8731",
    component_name: "R+Co Gemstone Color Shampoo 251ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21119",
    bundle_name: "R+Co Atlantis Shampoo & Conditioner Duo",
    component_sku: "8723",
    component_name: "R+Co Atlantis Moisturizing B5 Shampoo 241ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21119",
    bundle_name: "R+Co Atlantis Shampoo & Conditioner Duo",
    component_sku: "8724",
    component_name: "R+Co Atlantis Moisturizing B5 Conditioner 241ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21120",
    bundle_name:
      "R+Co Atlantis Shampoo & Conditioner Duo With FREE Detangling Hairbrush",
    component_sku: "20520",
    component_name: "BeautyFeatures Detangling Hairbrush",
    component_qty: 1,
  },
  {
    bundle_sku: "21120",
    bundle_name:
      "R+Co Atlantis Shampoo & Conditioner Duo With FREE Detangling Hairbrush",
    component_sku: "8723",
    component_name: "R+Co Atlantis Moisturizing B5 Shampoo 241ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21120",
    bundle_name:
      "R+Co Atlantis Shampoo & Conditioner Duo With FREE Detangling Hairbrush",
    component_sku: "8724",
    component_name: "R+Co Atlantis Moisturizing B5 Conditioner 241ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21121",
    bundle_name: "R+Co Bleu Ingenious Shampoo & Conditioner Duo",
    component_sku: "20239",
    component_name: "R+Co Bleu Ingenious Thickening Conditioner 201ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21121",
    bundle_name: "R+Co Bleu Ingenious Shampoo & Conditioner Duo",
    component_sku: "20240",
    component_name: "R+Co Bleu Ingenious Thickening Shampoo 251ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21122",
    bundle_name:
      "R+Co Ingenious Shampoo & Conditioner Duo With FREE Detangling Hairbrush",
    component_sku: "20239",
    component_name: "R+Co Bleu Ingenious Thickening Conditioner 201ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21122",
    bundle_name:
      "R+Co Ingenious Shampoo & Conditioner Duo With FREE Detangling Hairbrush",
    component_sku: "20240",
    component_name: "R+Co Bleu Ingenious Thickening Shampoo 251ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21122",
    bundle_name:
      "R+Co Ingenious Shampoo & Conditioner Duo With FREE Detangling Hairbrush",
    component_sku: "20520",
    component_name: "BeautyFeatures Detangling Hairbrush",
    component_qty: 1,
  },
  {
    bundle_sku: "21123",
    bundle_name: "R+Co Bleu Ingenious Shampoo & Mask Duo",
    component_sku: "20240",
    component_name: "R+Co Bleu Ingenious Thickening Shampoo 251ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21123",
    bundle_name: "R+Co Bleu Ingenious Shampoo & Mask Duo",
    component_sku: "20249",
    component_name: "R+Co Bleu Ingenious Mask 148ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21124",
    bundle_name:
      "R+Co Bleu Ingenious Shampoo & Mask Duo With FREE Microfibre Hair Towel",
    component_sku: "20240",
    component_name: "R+Co Bleu Ingenious Thickening Shampoo 251ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21124",
    bundle_name:
      "R+Co Bleu Ingenious Shampoo & Mask Duo With FREE Microfibre Hair Towel",
    component_sku: "20249",
    component_name: "R+Co Bleu Ingenious Mask 148ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21124",
    bundle_name:
      "R+Co Bleu Ingenious Shampoo & Mask Duo With FREE Microfibre Hair Towel",
    component_sku: "20520",
    component_name: "BeautyFeatures Detangling Hairbrush",
    component_qty: 1,
  },
  {
    bundle_sku: "21125",
    bundle_name: "R+Co Bleu Ingenious Shampoo, Conditioner & Mask Trio",
    component_sku: "20239",
    component_name: "R+Co Bleu Ingenious Thickening Conditioner 201ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21125",
    bundle_name: "R+Co Bleu Ingenious Shampoo, Conditioner & Mask Trio",
    component_sku: "20240",
    component_name: "R+Co Bleu Ingenious Thickening Shampoo 251ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21125",
    bundle_name: "R+Co Bleu Ingenious Shampoo, Conditioner & Mask Trio",
    component_sku: "20249",
    component_name: "R+Co Bleu Ingenious Mask 148ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21126",
    bundle_name: "R+Co Bleu Primary Color Shampoo & Conditioner Duo",
    component_sku: "20244",
    component_name: "R+Co Bleu Primary Color Conditioner 201ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21126",
    bundle_name: "R+Co Bleu Primary Color Shampoo & Conditioner Duo",
    component_sku: "20245",
    component_name: "R+Co Bleu Primary Color Shampoo 251ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21127",
    bundle_name:
      "R+Co Primary Color Shampoo & Conditioner Duo With FREE Detangling Hairbrush",
    component_sku: "20244",
    component_name: "R+Co Bleu Primary Color Conditioner 201ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21127",
    bundle_name:
      "R+Co Primary Color Shampoo & Conditioner Duo With FREE Detangling Hairbrush",
    component_sku: "20245",
    component_name: "R+Co Bleu Primary Color Shampoo 251ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21127",
    bundle_name:
      "R+Co Primary Color Shampoo & Conditioner Duo With FREE Detangling Hairbrush",
    component_sku: "20520",
    component_name: "BeautyFeatures Detangling Hairbrush",
    component_qty: 1,
  },
  {
    bundle_sku: "21128",
    bundle_name: "R+Co Primary Color Shampoo & Mask Duo",
    component_sku: "20238",
    component_name: "R+Co Bleu Primary Color Masque 148ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21128",
    bundle_name: "R+Co Primary Color Shampoo & Mask Duo",
    component_sku: "20245",
    component_name: "R+Co Bleu Primary Color Shampoo 251ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21129",
    bundle_name:
      "R+Co Bleu Primary Color Shampoo & Mask Duo With FREE Microfibre Hair Towel",
    component_sku: "20238",
    component_name: "R+Co Bleu Primary Color Masque 148ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21129",
    bundle_name:
      "R+Co Bleu Primary Color Shampoo & Mask Duo With FREE Microfibre Hair Towel",
    component_sku: "20245",
    component_name: "R+Co Bleu Primary Color Shampoo 251ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21129",
    bundle_name:
      "R+Co Bleu Primary Color Shampoo & Mask Duo With FREE Microfibre Hair Towel",
    component_sku: "20519",
    component_name: "BeautyFeatures Microfibre Hair Towel",
    component_qty: 1,
  },
  {
    bundle_sku: "21130",
    bundle_name: "R+Co Bleu Primary Color Shampoo, Conditioner & Mask Trio",
    component_sku: "20238",
    component_name: "R+Co Bleu Primary Color Masque 148ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21130",
    bundle_name: "R+Co Bleu Primary Color Shampoo, Conditioner & Mask Trio",
    component_sku: "20244",
    component_name: "R+Co Bleu Primary Color Conditioner 201ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21130",
    bundle_name: "R+Co Bleu Primary Color Shampoo, Conditioner & Mask Trio",
    component_sku: "20245",
    component_name: "R+Co Bleu Primary Color Shampoo 251ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21131",
    bundle_name: "R+Co Hydration & Moisture Bundle For Dry & Dehydrated Hair",
    component_sku: "13961",
    component_name: "R+Co Sun Catcher Vitamin C Leave In Conditioner 124ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21131",
    bundle_name: "R+Co Hydration & Moisture Bundle For Dry & Dehydrated Hair",
    component_sku: "8723",
    component_name: "R+Co Atlantis Moisturizing B5 Shampoo 241ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21131",
    bundle_name: "R+Co Hydration & Moisture Bundle For Dry & Dehydrated Hair",
    component_sku: "8724",
    component_name: "R+Co Atlantis Moisturizing B5 Conditioner 241ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21131",
    bundle_name: "R+Co Hydration & Moisture Bundle For Dry & Dehydrated Hair",
    component_sku: "8732",
    component_name: "R+Co High Dive Moisture + Shine Crème 147ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21132",
    bundle_name: "R+Co Volume & Thickness Boost Bundle For Fine & Limp Hair",
    component_sku: "13945",
    component_name: "R+Co Dallas Thicken Treat 89ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21132",
    bundle_name: "R+Co Volume & Thickness Boost Bundle For Fine & Limp Hair",
    component_sku: "8727",
    component_name: "R+Co Dallas Biotin Thickening Shampoo 251ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21132",
    bundle_name: "R+Co Volume & Thickness Boost Bundle For Fine & Limp Hair",
    component_sku: "8728",
    component_name: "R+Co Dallas Biotin Thickening Conditioner 251ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21132",
    bundle_name: "R+Co Volume & Thickness Boost Bundle For Fine & Limp Hair",
    component_sku: "8735",
    component_name: "R+Co Rodeo Star Thickening Style Foam 150ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21133",
    bundle_name: "R+Co Ultimate Curl Definition Bundle For Curly & Wavy Hair",
    component_sku: "13944",
    component_name: "R+Co Ringtone Curl Cream 177ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21133",
    bundle_name: "R+Co Ultimate Curl Definition Bundle For Curly & Wavy Hair",
    component_sku: "20265",
    component_name: "R+Co Bleu Curl Shampoo 251ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21133",
    bundle_name: "R+Co Ultimate Curl Definition Bundle For Curly & Wavy Hair",
    component_sku: "20266",
    component_name: "R+Co Bleu Curl Conditioner 201ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21133",
    bundle_name: "R+Co Ultimate Curl Definition Bundle For Curly & Wavy Hair",
    component_sku: "8740",
    component_name: "R+Co Turntable Curl Defining Crème 147ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21134",
    bundle_name: "R+Co Bleu Curl Shampoo & Conditioner Duo",
    component_sku: "20265",
    component_name: "R+Co Bleu Curl Shampoo 251ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21134",
    bundle_name: "R+Co Bleu Curl Shampoo & Conditioner Duo",
    component_sku: "20266",
    component_name: "R+Co Bleu Curl Conditioner 201ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21135",
    bundle_name:
      "R+Co Bleu Curl Shampoo & Conditioner Duo With FREE Detangling Hairbrush",
    component_sku: "20265",
    component_name: "R+Co Bleu Curl Shampoo 251ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21135",
    bundle_name:
      "R+Co Bleu Curl Shampoo & Conditioner Duo With FREE Detangling Hairbrush",
    component_sku: "20266",
    component_name: "R+Co Bleu Curl Conditioner 201ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21135",
    bundle_name:
      "R+Co Bleu Curl Shampoo & Conditioner Duo With FREE Detangling Hairbrush",
    component_sku: "20520",
    component_name: "BeautyFeatures Detangling Hairbrush",
    component_qty: 1,
  },
  {
    bundle_sku: "21136",
    bundle_name: "R+ Co Smooth & Frizz-Free Bundle For Frizz-Prone Hair",
    component_sku: "13936",
    component_name: "R+Co Two Way Mirror Smoothing Oil 60ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21136",
    bundle_name: "R+ Co Smooth & Frizz-Free Bundle For Frizz-Prone Hair",
    component_sku: "8725",
    component_name:
      "R+Co Bel Air Smoothing Shampoo + Anti Oxidant Complex 251ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21136",
    bundle_name: "R+ Co Smooth & Frizz-Free Bundle For Frizz-Prone Hair",
    component_sku: "8726",
    component_name:
      "R+Co Bel Air Smoothing Conditioner + Anti Oxidant Complex 241ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21136",
    bundle_name: "R+ Co Smooth & Frizz-Free Bundle For Frizz-Prone Hair",
    component_sku: "8741",
    component_name: "R+Co Moon Landing Anti-Humidity Spray 180m",
    component_qty: 1,
  },
  {
    bundle_sku: "21137",
    bundle_name: "R+Co Texture & Beachy Waves Bundle",
    component_sku: "13951",
    component_name: "R+Co Sail Soft Wave Spray 147ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21137",
    bundle_name: "R+Co Texture & Beachy Waves Bundle",
    component_sku: "20264",
    component_name: "R+Co Bleu Rose Water Wave Spray 201ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21137",
    bundle_name: "R+Co Texture & Beachy Waves Bundle",
    component_sku: "8736",
    component_name: "R+Co Sand Castle Dry Texture Crème 62g",
    component_qty: 1,
  },
  {
    bundle_sku: "21137",
    bundle_name: "R+Co Texture & Beachy Waves Bundle",
    component_sku: "8742",
    component_name: "R+Co Balloon Dry Volume Spray 173ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21138",
    bundle_name: "R+ Co Ultimate Shine & Gloss Bundle",
    component_sku: "13936",
    component_name: "R+Co Two Way Mirror Smoothing Oil 60ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21138",
    bundle_name: "R+ Co Ultimate Shine & Gloss Bundle",
    component_sku: "20258",
    component_name: "R+Co Bleu Reflect Shine Spray 104ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21138",
    bundle_name: "R+ Co Ultimate Shine & Gloss Bundle",
    component_sku: "8733",
    component_name: "R+Co Waterfall Moisture + Shine Lotion 147ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21138",
    bundle_name: "R+ Co Ultimate Shine & Gloss Bundle",
    component_sku: "8739",
    component_name: "R+Co Trophy Shine + Texture Spray 198ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21139",
    bundle_name: "R+Co Dry Shampoo & Refresh Bundle",
    component_sku: "13939",
    component_name: "R+Co Badlands Dry Shampoo Paste 62g",
    component_qty: 1,
  },
  {
    bundle_sku: "21139",
    bundle_name: "R+Co Dry Shampoo & Refresh Bundle",
    component_sku: "13943",
    component_name: "R+Co Skyline Volume Powder 28 g",
    component_qty: 1,
  },
  {
    bundle_sku: "21139",
    bundle_name: "R+Co Dry Shampoo & Refresh Bundle",
    component_sku: "20246",
    component_name: "R+Co Bleu Retroactive Dry Shampoo 192ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21139",
    bundle_name: "R+Co Dry Shampoo & Refresh Bundle",
    component_sku: "8737",
    component_name: "R+Co Death Valley Dry Shampoo 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21140",
    bundle_name: "R+Co Essential Everyday Haircare Bundle",
    component_sku: "13942",
    component_name: "R+Co Zipper Multitasking Styling Lotion177ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21140",
    bundle_name: "R+Co Essential Everyday Haircare Bundle",
    component_sku: "20251",
    component_name: "R+Co Bleu Super Style Creme 148ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21140",
    bundle_name: "R+Co Essential Everyday Haircare Bundle",
    component_sku: "8729",
    component_name: "R+Co Television Perfect Hair Shampoo 241ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21140",
    bundle_name: "R+Co Essential Everyday Haircare Bundle",
    component_sku: "8730",
    component_name: "R+Co Television Perfect Hair Conditioner 241ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21141",
    bundle_name: "R+Co Dallas Thickening Bundle - The Full Routine",
    component_sku: "13945",
    component_name: "R+Co Dallas Thicken Treat 89ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21141",
    bundle_name: "R+Co Dallas Thickening Bundle - The Full Routine",
    component_sku: "8727",
    component_name: "R+Co Dallas Biotin Thickening Shampoo 251ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21141",
    bundle_name: "R+Co Dallas Thickening Bundle - The Full Routine",
    component_sku: "8728",
    component_name: "R+Co Dallas Biotin Thickening Conditioner 251ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21141",
    bundle_name: "R+Co Dallas Thickening Bundle - The Full Routine",
    component_sku: "8738",
    component_name: "R+Co Dallas Thickening Spray 251ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21469",
    bundle_name:
      "Alfaparf Density Shampoo & Conditioner Duo with FREE Vent Hairbrush",
    component_sku: "14050",
    component_name:
      "Alfaparf Semi Di Lino Density Thickening Low Shampoo 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21469",
    bundle_name:
      "Alfaparf Density Shampoo & Conditioner Duo with FREE Vent Hairbrush",
    component_sku: "14051",
    component_name:
      "Alfaparf Semi Di Lino Density Thickening Conditioner 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21469",
    bundle_name:
      "Alfaparf Density Shampoo & Conditioner Duo with FREE Vent Hairbrush",
    component_sku: "20521",
    component_name: "BeautyFeatures Vent Hairbrush with Nylon & Boar Bristles",
    component_qty: 1,
  },
  {
    bundle_sku: "21470",
    bundle_name:
      "Alfaparf Diamond Shampoo & Conditioner Duo with FREE Vent Hairbrush",
    component_sku: "20521",
    component_name: "BeautyFeatures Vent Hairbrush with Nylon & Boar Bristles",
    component_qty: 1,
  },
  {
    bundle_sku: "21470",
    bundle_name:
      "Alfaparf Diamond Shampoo & Conditioner Duo with FREE Vent Hairbrush",
    component_sku: "6474",
    component_name: "Alfaparf Semi Di Lino Diamond Illuminating Shampoo 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21470",
    bundle_name:
      "Alfaparf Diamond Shampoo & Conditioner Duo with FREE Vent Hairbrush",
    component_sku: "6475",
    component_name:
      "Alfaparf Semi Di Lino Diamond Illuminating Conditioner 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21471",
    bundle_name:
      "Alfaparf Moisture Shampoo & Conditioner Duo with FREE Vent Hairbrush",
    component_sku: "20521",
    component_name: "BeautyFeatures Vent Hairbrush with Nylon & Boar Bristles",
    component_qty: 1,
  },
  {
    bundle_sku: "21471",
    bundle_name:
      "Alfaparf Moisture Shampoo & Conditioner Duo with FREE Vent Hairbrush",
    component_sku: "6469",
    component_name: "Alfaparf Semi Di Lino Moisture Nutritive Shampoo 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21471",
    bundle_name:
      "Alfaparf Moisture Shampoo & Conditioner Duo with FREE Vent Hairbrush",
    component_sku: "6471",
    component_name:
      "Alfaparf Semi Di Lino Moisture Nutritive Leave-In Conditioner 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21472",
    bundle_name:
      "Alfaparf Smooth Shampoo & Conditioner Duo with FREE Vent Hairbrush",
    component_sku: "20521",
    component_name: "BeautyFeatures Vent Hairbrush with Nylon & Boar Bristles",
    component_qty: 1,
  },
  {
    bundle_sku: "21472",
    bundle_name:
      "Alfaparf Smooth Shampoo & Conditioner Duo with FREE Vent Hairbrush",
    component_sku: "9894",
    component_name: "Alfaparf Semi Di Lino Smooth Conditioner 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21472",
    bundle_name:
      "Alfaparf Smooth Shampoo & Conditioner Duo with FREE Vent Hairbrush",
    component_sku: "9899",
    component_name: "Alfaparf Semi Di Lino Smooth Shampoo 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21473",
    bundle_name:
      "Alfaparf Curls Shampoo & Conditioner Duo with FREE Vent Hairbrush",
    component_sku: "20521",
    component_name: "BeautyFeatures Vent Hairbrush with Nylon & Boar Bristles",
    component_qty: 1,
  },
  {
    bundle_sku: "21473",
    bundle_name:
      "Alfaparf Curls Shampoo & Conditioner Duo with FREE Vent Hairbrush",
    component_sku: "8713",
    component_name: "Alfaparf Semi Di Lino Curls Low Shampoo 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21473",
    bundle_name:
      "Alfaparf Curls Shampoo & Conditioner Duo with FREE Vent Hairbrush",
    component_sku: "8714",
    component_name: "Alfaparf Semi Di Lino Curls Enhancing Conditioner 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21474",
    bundle_name:
      "Alfaparf Blonde Shampoo & Conditioner Duo with FREE Vent Hairbrush",
    component_sku: "11038",
    component_name: "Alfaparf Anti-Yellow Low Blonde Shampoo 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21474",
    bundle_name:
      "Alfaparf Blonde Shampoo & Conditioner Duo with FREE Vent Hairbrush",
    component_sku: "11040",
    component_name: "Alfaparf Anti-Yellow Blonde Conditioner 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21474",
    bundle_name:
      "Alfaparf Blonde Shampoo & Conditioner Duo with FREE Vent Hairbrush",
    component_sku: "20521",
    component_name: "BeautyFeatures Vent Hairbrush with Nylon & Boar Bristles",
    component_qty: 1,
  },
  {
    bundle_sku: "21475",
    bundle_name:
      "Alfaparf Brunette Shampoo & Conditioner Duo with FREE Vent Hairbrush",
    component_sku: "11039",
    component_name: "Alfapaf Anti-Orange Low Brunette Shampoo 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21475",
    bundle_name:
      "Alfaparf Brunette Shampoo & Conditioner Duo with FREE Vent Hairbrush",
    component_sku: "11041",
    component_name: "Alfaparf Brunette Conditioner 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21475",
    bundle_name:
      "Alfaparf Brunette Shampoo & Conditioner Duo with FREE Vent Hairbrush",
    component_sku: "20521",
    component_name: "BeautyFeatures Vent Hairbrush with Nylon & Boar Bristles",
    component_qty: 1,
  },
  {
    bundle_sku: "21476",
    bundle_name:
      "Alfaparf Reconstruction Shampoo & Mask Duo with FREE Vent Hairbrush",
    component_sku: "20521",
    component_name: "BeautyFeatures Vent Hairbrush with Nylon & Boar Bristles",
    component_qty: 1,
  },
  {
    bundle_sku: "21476",
    bundle_name:
      "Alfaparf Reconstruction Shampoo & Mask Duo with FREE Vent Hairbrush",
    component_sku: "6465",
    component_name:
      "Alfaparf Semi Di Lino Reconstruction Reparative Low Shampoo 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21476",
    bundle_name:
      "Alfaparf Reconstruction Shampoo & Mask Duo with FREE Vent Hairbrush",
    component_sku: "6466",
    component_name:
      "Alfaparf Semi Di Lino Reconstruction Reparative Mask 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21479",
    bundle_name:
      "Moroccanoil Hydrating Shampoo & Conditioner Duo with Vent Hairbrush",
    component_sku: "20521",
    component_name: "BeautyFeatures Vent Hairbrush with Nylon & Boar Bristles",
    component_qty: 1,
  },
  {
    bundle_sku: "21479",
    bundle_name:
      "Moroccanoil Hydrating Shampoo & Conditioner Duo with Vent Hairbrush",
    component_sku: "MOR_MO0094",
    component_name: "Moroccanoil - Hydrating Shampoo 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21479",
    bundle_name:
      "Moroccanoil Hydrating Shampoo & Conditioner Duo with Vent Hairbrush",
    component_sku: "MOR_MO0096",
    component_name: "Moroccanoil - Hydrating Conditioner 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21480",
    bundle_name:
      "Moroccanoil Moisture Repair Shampoo & Conditioner Duo with FREE Vent Hairbrush",
    component_sku: "20521",
    component_name: "BeautyFeatures Vent Hairbrush with Nylon & Boar Bristles",
    component_qty: 1,
  },
  {
    bundle_sku: "21480",
    bundle_name:
      "Moroccanoil Moisture Repair Shampoo & Conditioner Duo with FREE Vent Hairbrush",
    component_sku: "MOR_MO0018",
    component_name: "Moroccanoil - Moisture Repair Shampoo 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21480",
    bundle_name:
      "Moroccanoil Moisture Repair Shampoo & Conditioner Duo with FREE Vent Hairbrush",
    component_sku: "MOR_MO0020",
    component_name: "Moroccanoil Moisture Repair Conditioner 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21481",
    bundle_name:
      "Redken Extreme Shampoo & Conditioner Duo with FREE Vent Hairbrush",
    component_sku: "20521",
    component_name: "BeautyFeatures Vent Hairbrush with Nylon & Boar Bristles",
    component_qty: 1,
  },
  {
    bundle_sku: "21481",
    bundle_name:
      "Redken Extreme Shampoo & Conditioner Duo with FREE Vent Hairbrush",
    component_sku: "REDK_P027790",
    component_name: "Redken - Extreme Conditioner 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21481",
    bundle_name:
      "Redken Extreme Shampoo & Conditioner Duo with FREE Vent Hairbrush",
    component_sku: "REDK_P027970",
    component_name: "Redken - Extreme Shampoo 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21482",
    bundle_name:
      "Kerastase Nutritive Shampoo & Conditioner Duo with FREE Vent Hairbrush",
    component_sku: "13323",
    component_name: "Kérastase Nutritive Bain Satin Hydrating (Dry Hair) 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21482",
    bundle_name:
      "Kerastase Nutritive Shampoo & Conditioner Duo with FREE Vent Hairbrush",
    component_sku: "20521",
    component_name: "BeautyFeatures Vent Hairbrush with Nylon & Boar Bristles",
    component_qty: 1,
  },
  {
    bundle_sku: "21482",
    bundle_name:
      "Kerastase Nutritive Shampoo & Conditioner Duo with FREE Vent Hairbrush",
    component_sku: "KER_4401984",
    component_name: "Kerastase Nutritive Lait Vital 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21483",
    bundle_name:
      "Kerastase Blond Absolu Shampoo & Conditioner Duo with Vent Hairbrush",
    component_sku: "20521",
    component_name: "BeautyFeatures Vent Hairbrush with Nylon & Boar Bristles",
    component_qty: 1,
  },
  {
    bundle_sku: "21483",
    bundle_name:
      "Kerastase Blond Absolu Shampoo & Conditioner Duo with Vent Hairbrush",
    component_sku: "8774",
    component_name: "Kerastase Blond Absolu Bain Ultra-Violet 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21483",
    bundle_name:
      "Kerastase Blond Absolu Shampoo & Conditioner Duo with Vent Hairbrush",
    component_sku: "8776",
    component_name: "Kerastase Blond Absolu Fondant Cicaflash 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21484",
    bundle_name:
      "Kerastase Genesis Shampoo & Conditioner Duo with FREE Vent Hairbrush",
    component_sku: "20521",
    component_name: "BeautyFeatures Vent Hairbrush with Nylon & Boar Bristles",
    component_qty: 1,
  },
  {
    bundle_sku: "21484",
    bundle_name:
      "Kerastase Genesis Shampoo & Conditioner Duo with FREE Vent Hairbrush",
    component_sku: "8779",
    component_name: "Kerastase Genesis Bain Hydra-Fortifiant 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21484",
    bundle_name:
      "Kerastase Genesis Shampoo & Conditioner Duo with FREE Vent Hairbrush",
    component_sku: "8781",
    component_name: "Kerastase Genesis Fondant Renforçateur 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21485",
    bundle_name:
      "Kérastase Curl Manifesto Shampoo & Conditioner Duo With FREE Vent Hairbrush",
    component_sku: "10188",
    component_name: "Kerastase Curl Manifesto Bain Hydratation Douceur 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21485",
    bundle_name:
      "Kérastase Curl Manifesto Shampoo & Conditioner Duo With FREE Vent Hairbrush",
    component_sku: "10189",
    component_name:
      "Kerastase Curl Manifesto Fondant Hydratation Essentielle 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21485",
    bundle_name:
      "Kérastase Curl Manifesto Shampoo & Conditioner Duo With FREE Vent Hairbrush",
    component_sku: "20521",
    component_name: "BeautyFeatures Vent Hairbrush with Nylon & Boar Bristles",
    component_qty: 1,
  },
  {
    bundle_sku: "21486",
    bundle_name:
      "Kérastase Densifique Shampoo & Conditioner With FREE Vent Hairbrush",
    component_sku: "20521",
    component_name: "BeautyFeatures Vent Hairbrush with Nylon & Boar Bristles",
    component_qty: 1,
  },
  {
    bundle_sku: "21486",
    bundle_name:
      "Kérastase Densifique Shampoo & Conditioner With FREE Vent Hairbrush",
    component_sku: "9135",
    component_name: "Kerastase Densifique Conditioner 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21486",
    bundle_name:
      "Kérastase Densifique Shampoo & Conditioner With FREE Vent Hairbrush",
    component_sku: "9140",
    component_name: "Kerastase Densifique Bain Stemfree 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21487",
    bundle_name:
      "Kérastase Elixir Ultime Shampoo & Conditioner Duo With Free Vent Hairbrush",
    component_sku: "20521",
    component_name: "BeautyFeatures Vent Hairbrush with Nylon & Boar Bristles",
    component_qty: 1,
  },
  {
    bundle_sku: "21487",
    bundle_name:
      "Kérastase Elixir Ultime Shampoo & Conditioner Duo With Free Vent Hairbrush",
    component_sku: "20903",
    component_name: "Kérastase Elixir Ultime Soin Conditioner 200ml Duo",
    component_qty: 1,
  },
  {
    bundle_sku: "21487",
    bundle_name:
      "Kérastase Elixir Ultime Shampoo & Conditioner Duo With Free Vent Hairbrush",
    component_sku: "8722",
    component_name:
      "Kerastase Elixir Ultime Sublime Cleansing Oil Shampoo 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21488",
    bundle_name:
      "L'Oréal Professionnel Curl Expression Shampoo & Conditioner With FREE Vent Hairbrush",
    component_sku: "11427",
    component_name:
      "L'Oréal Professionnel Curl Expression Moisturising & Hydrating Shampoo 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21488",
    bundle_name:
      "L'Oréal Professionnel Curl Expression Shampoo & Conditioner With FREE Vent Hairbrush",
    component_sku: "11431",
    component_name:
      "L'Oréal Professionnel Curl Expression Long-Lasting Leave in Moisturiser 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21488",
    bundle_name:
      "L'Oréal Professionnel Curl Expression Shampoo & Conditioner With FREE Vent Hairbrush",
    component_sku: "20521",
    component_name: "BeautyFeatures Vent Hairbrush with Nylon & Boar Bristles",
    component_qty: 1,
  },
  {
    bundle_sku: "21489",
    bundle_name:
      "L'Oréal Professionnel Metal Detox Shampoo & Mask Duo with FREE Vent Hairbrush",
    component_sku: "11351",
    component_name:
      "Loreal Professionnel Metal Detox Anti-Metal Cleansing Cream Shampoo 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21489",
    bundle_name:
      "L'Oréal Professionnel Metal Detox Shampoo & Mask Duo with FREE Vent Hairbrush",
    component_sku: "11352",
    component_name:
      "Loreal Professionnel Metal Detox Anti-Deposit Protector Mask 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21489",
    bundle_name:
      "L'Oréal Professionnel Metal Detox Shampoo & Mask Duo with FREE Vent Hairbrush",
    component_sku: "20521",
    component_name: "BeautyFeatures Vent Hairbrush with Nylon & Boar Bristles",
    component_qty: 1,
  },
  {
    bundle_sku: "21490",
    bundle_name:
      "L'Oréal Professionnel Inforcer Shampoo & Conditioner With FREE Vent Hairbrush",
    component_sku: "11468",
    component_name: "L'Oréal Professionnel Inforcer Shampoo 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21490",
    bundle_name:
      "L'Oréal Professionnel Inforcer Shampoo & Conditioner With FREE Vent Hairbrush",
    component_sku: "11469",
    component_name: "L'Oréal Professionnel Inforcer Conditioner 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21490",
    bundle_name:
      "L'Oréal Professionnel Inforcer Shampoo & Conditioner With FREE Vent Hairbrush",
    component_sku: "20521",
    component_name: "BeautyFeatures Vent Hairbrush with Nylon & Boar Bristles",
    component_qty: 1,
  },
  {
    bundle_sku: "21491",
    bundle_name:
      "L'Oréal Professionnel Absolut Repair Molecular Shampoo & Mask With FREE Vent Hairbrush",
    component_sku: "13284",
    component_name:
      "L'Oréal Professionnel Absolut Repair Molecular Sulfate-Free Molecular Repairing Shampoo 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21491",
    bundle_name:
      "L'Oréal Professionnel Absolut Repair Molecular Shampoo & Mask With FREE Vent Hairbrush",
    component_sku: "20465",
    component_name:
      "L'Oreal Professional Absolut Repair Molecular Rinse off Hair Mask 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21491",
    bundle_name:
      "L'Oréal Professionnel Absolut Repair Molecular Shampoo & Mask With FREE Vent Hairbrush",
    component_sku: "20521",
    component_name: "BeautyFeatures Vent Hairbrush with Nylon & Boar Bristles",
    component_qty: 1,
  },
  {
    bundle_sku: "21492",
    bundle_name:
      "L'Oréal Professionnel Silver Shampoo & Conditioner With Free Vent Hairbrush",
    component_sku: "11456",
    component_name: "L'Oréal Professionnel Silver Shampoo 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21492",
    bundle_name:
      "L'Oréal Professionnel Silver Shampoo & Conditioner With Free Vent Hairbrush",
    component_sku: "11457",
    component_name: "L'Oréal Professionnel Silver Conditioner 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21492",
    bundle_name:
      "L'Oréal Professionnel Silver Shampoo & Conditioner With Free Vent Hairbrush",
    component_sku: "20521",
    component_name: "BeautyFeatures Vent Hairbrush with Nylon & Boar Bristles",
    component_qty: 1,
  },
  {
    bundle_sku: "21493",
    bundle_name:
      "L'Oréal Professionnel Liss Unlimited Shampoo & Mask With FREE Vent Hairbrush",
    component_sku: "11483",
    component_name: "L'Oréal Professionnel Liss Unlimited Shampoo 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21493",
    bundle_name:
      "L'Oréal Professionnel Liss Unlimited Shampoo & Mask With FREE Vent Hairbrush",
    component_sku: "11484",
    component_name: "L'Oréal Professionnel Liss Unlimited Mask - 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21493",
    bundle_name:
      "L'Oréal Professionnel Liss Unlimited Shampoo & Mask With FREE Vent Hairbrush",
    component_sku: "20521",
    component_name: "BeautyFeatures Vent Hairbrush with Nylon & Boar Bristles",
    component_qty: 1,
  },
  {
    bundle_sku: "21555",
    bundle_name: "Color WOW - The Bestselling Blowdry Bundle",
    component_sku: "7494",
    component_name: "Color Wow Dream Coat 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21555",
    bundle_name: "Color WOW - The Bestselling Blowdry Bundle",
    component_sku: "7656",
    component_name: "Color Wow Style On Steroids 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21555",
    bundle_name: "Color WOW - The Bestselling Blowdry Bundle",
    component_sku: "7657",
    component_name: "Color Wow Dream Filter 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21556",
    bundle_name: "Color WOW - The Blonde Brilliance Bundle",
    component_sku: "11393",
    component_name: "Color Wow and Chris Appleton Money Masque 215ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21556",
    bundle_name: "Color WOW - The Blonde Brilliance Bundle",
    component_sku: "7492",
    component_name: "Color Wow Kale Tonic 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21556",
    bundle_name: "Color WOW - The Blonde Brilliance Bundle",
    component_sku: "7657",
    component_name: "Color Wow Dream Filter 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21557",
    bundle_name: "Color WOW - The Workout-Proof Hair Bundle",
    component_sku: "5032",
    component_name: "Color Wow Coconut Cocktail Bionic Tonic 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21557",
    bundle_name: "Color WOW - The Workout-Proof Hair Bundle",
    component_sku: "7654",
    component_name: "Color Wow Security Shampoo 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21557",
    bundle_name: "Color WOW - The Workout-Proof Hair Bundle",
    component_sku: "7656",
    component_name: "Color Wow Style On Steroids 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21558",
    bundle_name: "Isoclean Daily Brush Cleanse Duo",
    component_sku: "12948",
    component_name: "Isoclean 100ml Spray Top Brush Cleaner",
    component_qty: 1,
  },
  {
    bundle_sku: "21558",
    bundle_name: "Isoclean Daily Brush Cleanse Duo",
    component_sku: "20117",
    component_name: "ISOCLEAN Cotton Cleansing Towels - 60 Pack",
    component_qty: 1,
  },
  {
    bundle_sku: "21559",
    bundle_name: "Isoclean Ultimate Brush Rescue Kit",
    component_sku: "11214",
    component_name: "Isoclean 165ml Dip Tray Easy Pour",
    component_qty: 1,
  },
  {
    bundle_sku: "21559",
    bundle_name: "Isoclean Ultimate Brush Rescue Kit",
    component_sku: "11216",
    component_name: "Isoclean Makeup Brush Cleaner Refill 525ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21559",
    bundle_name: "Isoclean Ultimate Brush Rescue Kit",
    component_sku: "12950",
    component_name: "Isoclean Carbon Soap (solid)",
    component_qty: 1,
  },
  {
    bundle_sku: "21560",
    bundle_name: "Isoclean Clear Skin Essentials Bundle",
    component_sku: "12949",
    component_name: "Isoclean Biocidal Surface Cleaner 525ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21560",
    bundle_name: "Isoclean Clear Skin Essentials Bundle",
    component_sku: "20124",
    component_name: "ISOCLEAN  Microfibre Makeup Towel -White",
    component_qty: 1,
  },
  {
    bundle_sku: "21560",
    bundle_name: "Isoclean Clear Skin Essentials Bundle",
    component_sku: "20507",
    component_name: "Isoclean Hypochlorous Cleansing Solution 165ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21561",
    bundle_name: "Silverette Starter Bundle",
    component_sku: "13255",
    component_name: "Silverette Cleaning Set",
    component_qty: 1,
  },
  {
    bundle_sku: "21561",
    bundle_name: "Silverette Starter Bundle",
    component_sku: "5692",
    component_name:
      "Silverette Nursing Cups - The Orginal Cup, Pure 925 Silver",
    component_qty: 1,
  },
  {
    bundle_sku: "21562",
    bundle_name: "Silverette Starter Bundle - XL",
    component_sku: "13255",
    component_name: "Silverette Cleaning Set",
    component_qty: 1,
  },
  {
    bundle_sku: "21562",
    bundle_name: "Silverette Starter Bundle - XL",
    component_sku: "5692A",
    component_name:
      "Silverette Nursing Cups - The Orginal Cup, Pure 925 Silver - XL",
    component_qty: 1,
  },
  {
    bundle_sku: "21563",
    bundle_name:
      "L'Oréal Professionnel Serié Expert Absolut Repair Molecular Shampoo 300ml + FREE 100ml Mini",
    component_sku: "13284",
    component_name:
      "L'Oréal Professionnel Absolut Repair Molecular Sulfate-Free Molecular Repairing Shampoo 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21564",
    bundle_name:
      "L'Oréal Professionnel Serié Expert Absolut Repair Molecular Shampoo And Mask + FREE 100ml Mini",
    component_sku: "13284",
    component_name:
      "L'Oréal Professionnel Absolut Repair Molecular Sulfate-Free Molecular Repairing Shampoo 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21564",
    bundle_name:
      "L'Oréal Professionnel Serié Expert Absolut Repair Molecular Shampoo And Mask + FREE 100ml Mini",
    component_sku: "20465",
    component_name:
      "L'Oreal Professional Absolut Repair Molecular Rinse off Hair Mask 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21565",
    bundle_name:
      "L'Oréal Professionnel Metal Detox Shampoo 300ml + FREE 100ml Mini",
    component_sku: "11351",
    component_name:
      "Loreal Professionnel Metal Detox Anti-Metal Cleansing Cream Shampoo 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21566",
    bundle_name:
      "L'Oréal Professionnel Metal Detox Shampoo & Mask + FREE 100ml Mini",
    component_sku: "11351",
    component_name:
      "Loreal Professionnel Metal Detox Anti-Metal Cleansing Cream Shampoo 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21566",
    bundle_name:
      "L'Oréal Professionnel Metal Detox Shampoo & Mask + FREE 100ml Mini",
    component_sku: "11352",
    component_name:
      "Loreal Professionnel Metal Detox Anti-Deposit Protector Mask 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21567",
    bundle_name:
      "Kerastase Blond Absolu Bain Lumiere 250ml Shampoo + FREE 80ml Mini",
    component_sku: "12281",
    component_name: "Kerastase Bain Lumiere 80ml​ GWP",
    component_qty: 1,
  },
  {
    bundle_sku: "21567",
    bundle_name:
      "Kerastase Blond Absolu Bain Lumiere 250ml Shampoo + FREE 80ml Mini",
    component_sku: "8775",
    component_name: "Kerastase Blond Absolu Bain Lumiére 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21568",
    bundle_name:
      "Kerastase Blond Absolu Bain Lumiere Shampoo And Cicaflash Conditioner + FREE 80ml Mini Shampoo",
    component_sku: "12281",
    component_name: "Kerastase Bain Lumiere 80ml​ GWP",
    component_qty: 1,
  },
  {
    bundle_sku: "21568",
    bundle_name:
      "Kerastase Blond Absolu Bain Lumiere Shampoo And Cicaflash Conditioner + FREE 80ml Mini Shampoo",
    component_sku: "8775",
    component_name: "Kerastase Blond Absolu Bain Lumiére 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21568",
    bundle_name:
      "Kerastase Blond Absolu Bain Lumiere Shampoo And Cicaflash Conditioner + FREE 80ml Mini Shampoo",
    component_sku: "8776",
    component_name: "Kerastase Blond Absolu Fondant Cicaflash 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21569",
    bundle_name:
      "Kerastase Nutritive Bain Satin Riche Shampoo 250ml + FREE 80ml Mini Shampoo",
    component_sku: "KER_4402082",
    component_name: "Kerastase  Nutritive Bain Satin Riche 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21570",
    bundle_name:
      "Kerastase Nutritive Bain Satin Riche Shampoo & Conditioner + FREE 80ml Mini Shampoo",
    component_sku: "KER_4401984",
    component_name: "Kerastase Nutritive Lait Vital 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21570",
    bundle_name:
      "Kerastase Nutritive Bain Satin Riche Shampoo & Conditioner + FREE 80ml Mini Shampoo",
    component_sku: "KER_4402082",
    component_name: "Kerastase  Nutritive Bain Satin Riche 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21610",
    bundle_name:
      "Moroccanoil Dry Shampoo Light Tones 217ml + Hydrating Conditioner 250ml PLUS FREE Leave In Conditioner 50ml",
    component_sku: "21353",
    component_name: "Moroccanoil Leave In Conditioner 50ml GWP",
    component_qty: 1,
  },
  {
    bundle_sku: "21610",
    bundle_name:
      "Moroccanoil Dry Shampoo Light Tones 217ml + Hydrating Conditioner 250ml PLUS FREE Leave In Conditioner 50ml",
    component_sku: "5023",
    component_name: "Moroccanoil - Dry Shampoo Light Tones 217ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21610",
    bundle_name:
      "Moroccanoil Dry Shampoo Light Tones 217ml + Hydrating Conditioner 250ml PLUS FREE Leave In Conditioner 50ml",
    component_sku: "MOR_MO0096",
    component_name: "Moroccanoil - Hydrating Conditioner 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21611",
    bundle_name:
      "Moroccanoil Dry Shampoo Dark Tones 217ml + Hydrating Conditioner 250ml PLUS FREE Leave In Conditioner 50ml",
    component_sku: "21353",
    component_name: "Moroccanoil Leave In Conditioner 50ml GWP",
    component_qty: 1,
  },
  {
    bundle_sku: "21611",
    bundle_name:
      "Moroccanoil Dry Shampoo Dark Tones 217ml + Hydrating Conditioner 250ml PLUS FREE Leave In Conditioner 50ml",
    component_sku: "5022",
    component_name: "Moroccanoil - Dry Shampoo Dark Tones 205ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21611",
    bundle_name:
      "Moroccanoil Dry Shampoo Dark Tones 217ml + Hydrating Conditioner 250ml PLUS FREE Leave In Conditioner 50ml",
    component_sku: "MOR_MO0096",
    component_name: "Moroccanoil - Hydrating Conditioner 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21612",
    bundle_name:
      "Moroccanoil Blonde Purple Shampoo & Conditioner Duo 500ml + Hydrating Conditioner 250ml PLUS FREE Leave In Conditioner 50ml",
    component_sku: "12574",
    component_name: "Moroccanoil Blonde Purple Shampoo & Conditioner Duo 500ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21612",
    bundle_name:
      "Moroccanoil Blonde Purple Shampoo & Conditioner Duo 500ml + Hydrating Conditioner 250ml PLUS FREE Leave In Conditioner 50ml",
    component_sku: "21353",
    component_name: "Moroccanoil Leave In Conditioner 50ml GWP",
    component_qty: 1,
  },
  {
    bundle_sku: "21612",
    bundle_name:
      "Moroccanoil Blonde Purple Shampoo & Conditioner Duo 500ml + Hydrating Conditioner 250ml PLUS FREE Leave In Conditioner 50ml",
    component_sku: "MOR_MO0096",
    component_name: "Moroccanoil - Hydrating Conditioner 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21613",
    bundle_name:
      "Moroccanoil Hydrating Shampoo 250ml + Hydrating Conditioner 250ml PLUS FREE Leave In Conditioner 50ml",
    component_sku: "21353",
    component_name: "Moroccanoil Leave In Conditioner 50ml GWP",
    component_qty: 1,
  },
  {
    bundle_sku: "21613",
    bundle_name:
      "Moroccanoil Hydrating Shampoo 250ml + Hydrating Conditioner 250ml PLUS FREE Leave In Conditioner 50ml",
    component_sku: "MOR_MO0094",
    component_name: "Moroccanoil - Hydrating Shampoo 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21613",
    bundle_name:
      "Moroccanoil Hydrating Shampoo 250ml + Hydrating Conditioner 250ml PLUS FREE Leave In Conditioner 50ml",
    component_sku: "MOR_MO0096",
    component_name: "Moroccanoil - Hydrating Conditioner 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21614",
    bundle_name:
      "Moroccanoil Moisture Repair Shampoo 250ml + Hydrating Conditioner 250ml PLUS FREE Leave In Conditioner 50ml",
    component_sku: "21353",
    component_name: "Moroccanoil Leave In Conditioner 50ml GWP",
    component_qty: 1,
  },
  {
    bundle_sku: "21614",
    bundle_name:
      "Moroccanoil Moisture Repair Shampoo 250ml + Hydrating Conditioner 250ml PLUS FREE Leave In Conditioner 50ml",
    component_sku: "MOR_MO0018",
    component_name: "Moroccanoil - Moisture Repair Shampoo 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21614",
    bundle_name:
      "Moroccanoil Moisture Repair Shampoo 250ml + Hydrating Conditioner 250ml PLUS FREE Leave In Conditioner 50ml",
    component_sku: "MOR_MO0096",
    component_name: "Moroccanoil - Hydrating Conditioner 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21615",
    bundle_name:
      "L'Oréal Professionnel Absolut Repair Shampoo 300ml + Vitamino Conditioner 200ml + FREE Metal Detox Shampoo 100ml",
    component_sku: "11453",
    component_name: "L'Oréal Professionnel Vitamino Conditioner 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21615",
    bundle_name:
      "L'Oréal Professionnel Absolut Repair Shampoo 300ml + Vitamino Conditioner 200ml + FREE Metal Detox Shampoo 100ml",
    component_sku: "11458",
    component_name: "L'Oréal Professionnel Absolut Repair Shampoo - 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21616",
    bundle_name:
      "Moroccanoil Clarifying Shampoo 250ml + Hydrating Conditioner 250ml PLUS FREE Leave In Conditioner 50ml",
    component_sku: "21353",
    component_name: "Moroccanoil Leave In Conditioner 50ml GWP",
    component_qty: 1,
  },
  {
    bundle_sku: "21616",
    bundle_name:
      "Moroccanoil Clarifying Shampoo 250ml + Hydrating Conditioner 250ml PLUS FREE Leave In Conditioner 50ml",
    component_sku: "MOR_MO0079",
    component_name: "Moroccanoil Clarifying Shampoo 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21616",
    bundle_name:
      "Moroccanoil Clarifying Shampoo 250ml + Hydrating Conditioner 250ml PLUS FREE Leave In Conditioner 50ml",
    component_sku: "MOR_MO0096",
    component_name: "Moroccanoil - Hydrating Conditioner 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21617",
    bundle_name:
      "L'Oréal Professionnel Silver Shampoo 300ml + Vitamino Conditioner 200ml PLUS FREE Metal Detox Anti-Metal Cleansing Cream Shampoo",
    component_sku: "11453",
    component_name: "L'Oréal Professionnel Vitamino Conditioner 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21617",
    bundle_name:
      "L'Oréal Professionnel Silver Shampoo 300ml + Vitamino Conditioner 200ml PLUS FREE Metal Detox Anti-Metal Cleansing Cream Shampoo",
    component_sku: "11456",
    component_name: "L'Oréal Professionnel Silver Shampoo 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21618",
    bundle_name:
      "L'Oréal Professionnel Vitamino Color Shampoo 300ml + Vitamino Conditioner 200ml PLUS FREE Metal Detox Shampoo 100ml",
    component_sku: "11452",
    component_name: "L'Oréal Professionnel Vitamino Color Shampoo - 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21618",
    bundle_name:
      "L'Oréal Professionnel Vitamino Color Shampoo 300ml + Vitamino Conditioner 200ml PLUS FREE Metal Detox Shampoo 100ml",
    component_sku: "11453",
    component_name: "L'Oréal Professionnel Vitamino Conditioner 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21619",
    bundle_name:
      "Moroccanoil Hydrating Shampoo & Conditioner 500ml DUO + Hydrating Conditioner 250ml PLUS FREE Leave In Conditioner 50ml",
    component_sku: "21353",
    component_name: "Moroccanoil Leave In Conditioner 50ml GWP",
    component_qty: 1,
  },
  {
    bundle_sku: "21619",
    bundle_name:
      "Moroccanoil Hydrating Shampoo & Conditioner 500ml DUO + Hydrating Conditioner 250ml PLUS FREE Leave In Conditioner 50ml",
    component_sku: "MOR_MO0096",
    component_name: "Moroccanoil - Hydrating Conditioner 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21619",
    bundle_name:
      "Moroccanoil Hydrating Shampoo & Conditioner 500ml DUO + Hydrating Conditioner 250ml PLUS FREE Leave In Conditioner 50ml",
    component_sku: "MOR_MO0098",
    component_name: "Moroccanoil Hydrating Shampoo & Conditioner 500ml DUO",
    component_qty: 1,
  },
  {
    bundle_sku: "21620",
    bundle_name:
      "Matrix Glow Mania Shampoo 300ml + Glow Mania Color Protecting Conditioner 300ml + FREE Total Results Dark Envy Conditioner 50ml",
    component_sku: "12107",
    component_name: "Matrix Total Results Dark Envy Conditioner 50ml GWP",
    component_qty: 1,
  },
  {
    bundle_sku: "21620",
    bundle_name:
      "Matrix Glow Mania Shampoo 300ml + Glow Mania Color Protecting Conditioner 300ml + FREE Total Results Dark Envy Conditioner 50ml",
    component_sku: "21335",
    component_name: "Matrix Glow Mania Color Protecting Shampoo 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21620",
    bundle_name:
      "Matrix Glow Mania Shampoo 300ml + Glow Mania Color Protecting Conditioner 300ml + FREE Total Results Dark Envy Conditioner 50ml",
    component_sku: "21336",
    component_name: "Matrix Glow Mania Color Protecting Conditioner 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21621",
    bundle_name:
      "Moroccanoil Extra Volume Shampoo 250ml + Hydrating Conditioner 250ml PLUS FREE Leave In Conditioner 50ml",
    component_sku: "21353",
    component_name: "Moroccanoil Leave In Conditioner 50ml GWP",
    component_qty: 1,
  },
  {
    bundle_sku: "21621",
    bundle_name:
      "Moroccanoil Extra Volume Shampoo 250ml + Hydrating Conditioner 250ml PLUS FREE Leave In Conditioner 50ml",
    component_sku: "MOR_MO0043",
    component_name: "Moroccanoil Extra Volume Shampoo 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21621",
    bundle_name:
      "Moroccanoil Extra Volume Shampoo 250ml + Hydrating Conditioner 250ml PLUS FREE Leave In Conditioner 50ml",
    component_sku: "MOR_MO0096",
    component_name: "Moroccanoil - Hydrating Conditioner 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21622",
    bundle_name:
      "L'Oréal Professionnel Vitamino Color Shampoo 500ml + Vitamino Conditioner 200ml PLUS FREE Metal Detox Shampoo 100ml",
    component_sku: "11453",
    component_name: "L'Oréal Professionnel Vitamino Conditioner 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21622",
    bundle_name:
      "L'Oréal Professionnel Vitamino Color Shampoo 500ml + Vitamino Conditioner 200ml PLUS FREE Metal Detox Shampoo 100ml",
    component_sku: "20444",
    component_name: "L'Oreal Professional Vitamino Color Shampoo 500ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21622",
    bundle_name:
      "L'Oréal Professionnel Vitamino Color Shampoo 500ml + Vitamino Conditioner 200ml PLUS FREE Metal Detox Shampoo 100ml",
    component_sku: "21353",
    component_name: "Moroccanoil Leave In Conditioner 50ml GWP",
    component_qty: 1,
  },
  {
    bundle_sku: "21623",
    bundle_name:
      "L'Oréal Professionnel Vitamino Color Spectrum Shampoo Refill 500ml, Mask 250ml + Free Metal Detox Shampoo 100ml",
    component_sku: "20814",
    component_name:
      "L'Oréal Professionnel Vitamino Color Spectrum Rinse Off Hair Mask 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21623",
    bundle_name:
      "L'Oréal Professionnel Vitamino Color Spectrum Shampoo Refill 500ml, Mask 250ml + Free Metal Detox Shampoo 100ml",
    component_sku: "20820",
    component_name:
      "L'Oréal Professionnel Vitamino Color Spectrum Shampoo Refill Pack 500ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21624",
    bundle_name:
      "L'Oréal Professionnel Absolut Repair Molecular Shampoo 500ml, Mask 250ml PLUS FREE Metal Detox Shampoo 100ml",
    component_sku: "20449",
    component_name:
      "L'Oreal Professional Absolut Repair Molecular Shampoo 500ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21624",
    bundle_name:
      "L'Oréal Professionnel Absolut Repair Molecular Shampoo 500ml, Mask 250ml PLUS FREE Metal Detox Shampoo 100ml",
    component_sku: "20465",
    component_name:
      "L'Oreal Professional Absolut Repair Molecular Rinse off Hair Mask 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21625",
    bundle_name:
      "L'Oréal Professionnel Curl Expression Moisturising & Hydrating Shampoo 300ml + Mask 250ml PLUS FREE Metal Detox Shampoo 100ml",
    component_sku: "11427",
    component_name:
      "L'Oréal Professionnel Curl Expression Moisturising & Hydrating Shampoo 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21625",
    bundle_name:
      "L'Oréal Professionnel Curl Expression Moisturising & Hydrating Shampoo 300ml + Mask 250ml PLUS FREE Metal Detox Shampoo 100ml",
    component_sku: "11428",
    component_name:
      "L'Oréal Professionnel Curl Expression Hair Mask for Curls & Coils 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21626",
    bundle_name:
      "L'Oréal Professionnel Vitamino Color Spectrum Shampoo 300ml + Vitamino Conditioner 200ml + FREE Metal Detox Shampoo 100m",
    component_sku: "11453",
    component_name: "L'Oréal Professionnel Vitamino Conditioner 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21626",
    bundle_name:
      "L'Oréal Professionnel Vitamino Color Spectrum Shampoo 300ml + Vitamino Conditioner 200ml + FREE Metal Detox Shampoo 100m",
    component_sku: "20813",
    component_name:
      "L'Oréal Professionnel Vitamino Color Spectrum Shampoo 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21627",
    bundle_name:
      "Matrix A Curl Can Dream Shampoo 300ml + Glow Mania Conditioner 300ml + FREE Dark Envy Conditioner 50ml",
    component_sku: "11992",
    component_name: "Matrix A Curl Can Dream Gentle Shampoo 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21627",
    bundle_name:
      "Matrix A Curl Can Dream Shampoo 300ml + Glow Mania Conditioner 300ml + FREE Dark Envy Conditioner 50ml",
    component_sku: "12106",
    component_name: "Matrix Total Results Dark Envy Toning Shampoo 50ml GWP",
    component_qty: 1,
  },
  {
    bundle_sku: "21627",
    bundle_name:
      "Matrix A Curl Can Dream Shampoo 300ml + Glow Mania Conditioner 300ml + FREE Dark Envy Conditioner 50ml",
    component_sku: "21336",
    component_name: "Matrix Glow Mania Color Protecting Conditioner 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21628",
    bundle_name:
      "L'Oréal Professionnel Pro Longer Shampoo 300ml + Vitamino Conditioner 200ml + FREE Metal Detox Shampoo 100ml",
    component_sku: "11453",
    component_name: "L'Oréal Professionnel Vitamino Conditioner 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21628",
    bundle_name:
      "L'Oréal Professionnel Pro Longer Shampoo 300ml + Vitamino Conditioner 200ml + FREE Metal Detox Shampoo 100ml",
    component_sku: "11471",
    component_name: "L'Oréal Professionnel Pro Longer Shampoo 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21629",
    bundle_name:
      "L'Oréal Professionnel Vitamino Color Spectrum Blue Tinted Shampoo 300ml + Vitamino Conditioner 200ml + FREE Metal Detox Shampoo",
    component_sku: "11453",
    component_name: "L'Oréal Professionnel Vitamino Conditioner 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21629",
    bundle_name:
      "L'Oréal Professionnel Vitamino Color Spectrum Blue Tinted Shampoo 300ml + Vitamino Conditioner 200ml + FREE Metal Detox Shampoo",
    component_sku: "20813",
    component_name:
      "L'Oréal Professionnel Vitamino Color Spectrum Shampoo 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21630",
    bundle_name:
      "L'Oréal Professionnel Metal Detox Shampoo 300ml + Vitamino Conditioner 200ml + FREE Metal Detox Shampoo 100ml",
    component_sku: "11351",
    component_name:
      "Loreal Professionnel Metal Detox Anti-Metal Cleansing Cream Shampoo 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21630",
    bundle_name:
      "L'Oréal Professionnel Metal Detox Shampoo 300ml + Vitamino Conditioner 200ml + FREE Metal Detox Shampoo 100ml",
    component_sku: "11453",
    component_name: "L'Oréal Professionnel Vitamino Conditioner 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21631",
    bundle_name:
      "L'Oréal Professionnel Metal Detox Shampoo 500ml + Vitamino Conditioner 200ml + FREE Metal Detox Shampoo 100ml",
    component_sku: "11453",
    component_name: "L'Oréal Professionnel Vitamino Conditioner 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21631",
    bundle_name:
      "L'Oréal Professionnel Metal Detox Shampoo 500ml + Vitamino Conditioner 200ml + FREE Metal Detox Shampoo 100ml",
    component_sku: "14412",
    component_name: "L’Oreal Professionnel Metal Detox Shampoo 500ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21632",
    bundle_name:
      "L'Oréal Professionnel Metal Detox Shampoo Refill 500ml + Vitamino Conditioner 200ml + FREE Metal Detox Shampoo 100ml",
    component_sku: "11453",
    component_name: "L'Oréal Professionnel Vitamino Conditioner 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21632",
    bundle_name:
      "L'Oréal Professionnel Metal Detox Shampoo Refill 500ml + Vitamino Conditioner 200ml + FREE Metal Detox Shampoo 100ml",
    component_sku: "20448",
    component_name: "L'Oreal Professional Metal Detox Shampoo Refill 500ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21633",
    bundle_name:
      "L'Oréal Professionnel Vitamino Color Spectrum Purple Shampoo 300ml + Vitamino Conditioner 200ml + Metal Detox Shampoo 200ml",
    component_sku: "11453",
    component_name: "L'Oréal Professionnel Vitamino Conditioner 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21633",
    bundle_name:
      "L'Oréal Professionnel Vitamino Color Spectrum Purple Shampoo 300ml + Vitamino Conditioner 200ml + Metal Detox Shampoo 200ml",
    component_sku: "20816",
    component_name:
      "L'Oréal Professionnel Vitamino Color Spectrum Purple Tinted Shampoo 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21634",
    bundle_name:
      "Moroccanoil Curl Enhance Shampoo 250ml + Hydrating Conditioner 250ml PLUS FREE Leave In Conditioner 50ml",
    component_sku: "13343",
    component_name: "Moroccanoil Curl Enhance Shampoo 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21634",
    bundle_name:
      "Moroccanoil Curl Enhance Shampoo 250ml + Hydrating Conditioner 250ml PLUS FREE Leave In Conditioner 50ml",
    component_sku: "21353",
    component_name: "Moroccanoil Leave In Conditioner 50ml GWP",
    component_qty: 1,
  },
  {
    bundle_sku: "21634",
    bundle_name:
      "Moroccanoil Curl Enhance Shampoo 250ml + Hydrating Conditioner 250ml PLUS FREE Leave In Conditioner 50ml",
    component_sku: "MOR_MO0096",
    component_name: "Moroccanoil - Hydrating Conditioner 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21635",
    bundle_name:
      "Act+Acre Stem Cell Cleanse Shampoo 198ml + Hair Conditioner 296ml PLUS FREE Daily Hydro Serum 15ml",
    component_sku: "13510",
    component_name: "Act+Acre Hair Conditioner 296ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21635",
    bundle_name:
      "Act+Acre Stem Cell Cleanse Shampoo 198ml + Hair Conditioner 296ml PLUS FREE Daily Hydro Serum 15ml",
    component_sku: "20218",
    component_name: "Act+Acre Stem Cell Cleanse Shampoo 296ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21635",
    bundle_name:
      "Act+Acre Stem Cell Cleanse Shampoo 198ml + Hair Conditioner 296ml PLUS FREE Daily Hydro Serum 15ml",
    component_sku: "20708",
    component_name: "Act + Acre Daily Hydro Serum 15ml GWP",
    component_qty: 1,
  },
  {
    bundle_sku: "21636",
    bundle_name:
      "L'Oréal Professionnel Absolut Repair Molecular Shampoo 300ml + Vitamino Conditioner 200ml + FREE Metal Detox Shampoo 100ml",
    component_sku: "11453",
    component_name: "L'Oréal Professionnel Vitamino Conditioner 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21636",
    bundle_name:
      "L'Oréal Professionnel Absolut Repair Molecular Shampoo 300ml + Vitamino Conditioner 200ml + FREE Metal Detox Shampoo 100ml",
    component_sku: "13284",
    component_name:
      "L'Oréal Professionnel Absolut Repair Molecular Sulfate-Free Molecular Repairing Shampoo 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21637",
    bundle_name:
      "L'Oréal Professionnel Liss Unlimited Shampoo 1500ml + Vitamino Conditioner 200ml + FREE Metal Detox Shampoo 100ml",
    component_sku: "11453",
    component_name: "L'Oréal Professionnel Vitamino Conditioner 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21637",
    bundle_name:
      "L'Oréal Professionnel Liss Unlimited Shampoo 1500ml + Vitamino Conditioner 200ml + FREE Metal Detox Shampoo 100ml",
    component_sku: "12552",
    component_name: "Loreal Professionnel Liss Unlimited Shampoo 1500ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21638",
    bundle_name:
      "Matrix Keep Me Vivid Shampoo 300ml + Glow Mania Conditioner 300ml + FREE Dark Envy Conditioner 50ml",
    component_sku: "12107",
    component_name: "Matrix Total Results Dark Envy Conditioner 50ml GWP",
    component_qty: 1,
  },
  {
    bundle_sku: "21638",
    bundle_name:
      "Matrix Keep Me Vivid Shampoo 300ml + Glow Mania Conditioner 300ml + FREE Dark Envy Conditioner 50ml",
    component_sku: "21336",
    component_name: "Matrix Glow Mania Color Protecting Conditioner 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21638",
    bundle_name:
      "Matrix Keep Me Vivid Shampoo 300ml + Glow Mania Conditioner 300ml + FREE Dark Envy Conditioner 50ml",
    component_sku: "8250",
    component_name: "Matrix Total Results Keep Me Vivid Shampoo 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21639",
    bundle_name:
      "Act+Acre Dry Shampoo 17g + Hair Conditioner 296ml PLUS FREE Daily Hydro Serum 15ml",
    component_sku: "13510",
    component_name: "Act+Acre Hair Conditioner 296ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21639",
    bundle_name:
      "Act+Acre Dry Shampoo 17g + Hair Conditioner 296ml PLUS FREE Daily Hydro Serum 15ml",
    component_sku: "13512",
    component_name: "Act+Acre Dry Shampoo 17G",
    component_qty: 1,
  },
  {
    bundle_sku: "21639",
    bundle_name:
      "Act+Acre Dry Shampoo 17g + Hair Conditioner 296ml PLUS FREE Daily Hydro Serum 15ml",
    component_sku: "20708",
    component_name: "Act + Acre Daily Hydro Serum 15ml GWP",
    component_qty: 1,
  },
  {
    bundle_sku: "21640",
    bundle_name:
      "L'Oréal Professionnel Absolut Repair Molecular Shampoo Refill 500ml + Vitamino Conditioner 200ml + FREE Metal Detox Shampoo 100m",
    component_sku: "11453",
    component_name: "L'Oréal Professionnel Vitamino Conditioner 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21640",
    bundle_name:
      "L'Oréal Professionnel Absolut Repair Molecular Shampoo Refill 500ml + Vitamino Conditioner 200ml + FREE Metal Detox Shampoo 100m",
    component_sku: "20450",
    component_name:
      "L'Oreal Professional Absolut Repair Molecular Shampoo Refill 500ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21641",
    bundle_name:
      "L'Oréal Professionnel Scalp Advanced Shampoo 500ml Refill + Vitamino Conditioner 200ml + FREE Metal Detox Shampoo 100ml",
    component_sku: "11453",
    component_name: "L'Oréal Professionnel Vitamino Conditioner 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21641",
    bundle_name:
      "L'Oréal Professionnel Scalp Advanced Shampoo 500ml Refill + Vitamino Conditioner 200ml + FREE Metal Detox Shampoo 100ml",
    component_sku: "20464",
    component_name:
      "L'Oreal Professional Scalp Advanced Anti-Discomfort Shampoo 500ml Refill",
    component_qty: 1,
  },
  {
    bundle_sku: "21642",
    bundle_name:
      "L'Oréal Professionnel Serioxyl Advanced Purifier & Bodifier Shampoo 300ml + Vitamino Conditioner 200ml + FREE Metal Detox Shampo",
    component_sku: "11453",
    component_name: "L'Oréal Professionnel Vitamino Conditioner 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21642",
    bundle_name:
      "L'Oréal Professionnel Serioxyl Advanced Purifier & Bodifier Shampoo 300ml + Vitamino Conditioner 200ml + FREE Metal Detox Shampo",
    component_sku: "12685",
    component_name:
      "L'Oréal Professionnel Serié Expert Serioxyl Advanced Purifier & Bodifier Shampoo 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21643",
    bundle_name:
      "L'Oréal Professionnel Vitamino Color Spectrum Shampoo 500ml + Vitamino Conditioner 200ml + FREE Metal Detox Shampoo 100ml",
    component_sku: "11453",
    component_name: "L'Oréal Professionnel Vitamino Conditioner 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21643",
    bundle_name:
      "L'Oréal Professionnel Vitamino Color Spectrum Shampoo 500ml + Vitamino Conditioner 200ml + FREE Metal Detox Shampoo 100ml",
    component_sku: "20819",
    component_name:
      "L'Oréal Professionnel Vitamino Color Spectrum Shampoo 500ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21644",
    bundle_name:
      "Moroccanoil Blonde Perfecting Shampoo 200ml + Hydrating Conditioner 250ml PLUS FREE Leave In Conditioner 50ml",
    component_sku: "21353",
    component_name: "Moroccanoil Leave In Conditioner 50ml GWP",
    component_qty: 1,
  },
  {
    bundle_sku: "21644",
    bundle_name:
      "Moroccanoil Blonde Perfecting Shampoo 200ml + Hydrating Conditioner 250ml PLUS FREE Leave In Conditioner 50ml",
    component_sku: "8207",
    component_name: "Moroccanoil Blonde Perfecting Shampoo 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21644",
    bundle_name:
      "Moroccanoil Blonde Perfecting Shampoo 200ml + Hydrating Conditioner 250ml PLUS FREE Leave In Conditioner 50ml",
    component_sku: "MOR_MO0096",
    component_name: "Moroccanoil - Hydrating Conditioner 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21649",
    bundle_name:
      "Redken Extreme Shampoo 300ml + Conditioner 300ml + FREE 50ml Conditioner",
    component_sku: "REDK_P027790",
    component_name: "Redken - Extreme Conditioner 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21649",
    bundle_name:
      "Redken Extreme Shampoo 300ml + Conditioner 300ml + FREE 50ml Conditioner",
    component_sku: "REDK_P027970",
    component_name: "Redken - Extreme Shampoo 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21650",
    bundle_name:
      "Pureology Hydrate Shampoo & Conditioner 266ml + FREE 50ml Conditioner",
    component_sku: "5048",
    component_name: "Pureology - Pure Hydrate Shampoo 266ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21650",
    bundle_name:
      "Pureology Hydrate Shampoo & Conditioner 266ml + FREE 50ml Conditioner",
    component_sku: "5053",
    component_name: "Pureology - Pure Hydrate Conditioner 266ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21651",
    bundle_name:
      "Kerastase Chroma Absolu Bain Riche Shampoo 250ml + Chroma Absolu Conditioner 200ml + FREE 75ML Conditioner",
    component_sku: "11031",
    component_name: "Kérastase Chroma Absolu Bain Opaque Shampoo 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21651",
    bundle_name:
      "Kerastase Chroma Absolu Bain Riche Shampoo 250ml + Chroma Absolu Conditioner 200ml + FREE 75ML Conditioner",
    component_sku: "11033",
    component_name: "Kérastase Chroma Absolu Repairing Fondant 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21651",
    bundle_name:
      "Kerastase Chroma Absolu Bain Riche Shampoo 250ml + Chroma Absolu Conditioner 200ml + FREE 75ML Conditioner",
    component_sku: "11156",
    component_name:
      "Kerastase Chroma Absolu Fondant Cica Chroma Conditioner 75ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21713",
    bundle_name:
      "Hollywood Browzer Hollywood Smoother + Cryo Roller Kit - Rose Gold",
    component_sku: "11569",
    component_name: "Hollywood Smoother - Rose Gold",
    component_qty: 1,
  },
  {
    bundle_sku: "21713",
    bundle_name:
      "Hollywood Browzer Hollywood Smoother + Cryo Roller Kit - Rose Gold",
    component_sku: "21720",
    component_name:
      "Hollywood Browzer Cryo Roller - Attachment Head for The Hollywood Smoother",
    component_qty: 1,
  },
  {
    bundle_sku: "21714",
    bundle_name:
      "Hollywood Browzer Hollywood Smoother + Cryo Roller Kit - Pearl White",
    component_sku: "11568",
    component_name: "Hollywood Smoother - Pearl White",
    component_qty: 1,
  },
  {
    bundle_sku: "21714",
    bundle_name:
      "Hollywood Browzer Hollywood Smoother + Cryo Roller Kit - Pearl White",
    component_sku: "21720",
    component_name:
      "Hollywood Browzer Cryo Roller - Attachment Head for The Hollywood Smoother",
    component_qty: 1,
  },
  {
    bundle_sku: "21801",
    bundle_name: "The Autumn Glow Beauty Box",
    component_sku: "11417A",
    component_name: "Pestle & Mortar Glow Drops 30ml GWP",
    component_qty: 1,
  },
  {
    bundle_sku: "21801",
    bundle_name: "The Autumn Glow Beauty Box",
    component_sku: "12267",
    component_name: "Kerastase Elixir Ultime L'Huile Original Deluxe 15ml​ GWP",
    component_qty: 1,
  },
  {
    bundle_sku: "21801",
    bundle_name: "The Autumn Glow Beauty Box",
    component_sku: "13059",
    component_name: "Bare By Vogue Water Bottle GWP",
    component_qty: 1,
  },
  {
    bundle_sku: "21801",
    bundle_name: "The Autumn Glow Beauty Box",
    component_sku: "20270",
    component_name: "Real Techniques Chroma Perfect Finish Kit",
    component_qty: 1,
  },
  {
    bundle_sku: "21801",
    bundle_name: "The Autumn Glow Beauty Box",
    component_sku: "20295",
    component_name: "Large Black Box",
    component_qty: 1,
  },
  {
    bundle_sku: "21801",
    bundle_name: "The Autumn Glow Beauty Box",
    component_sku: "20511",
    component_name: "Beauty Box Large Sleeve",
    component_qty: 1,
  },
  {
    bundle_sku: "21801",
    bundle_name: "The Autumn Glow Beauty Box",
    component_sku: "20520",
    component_name: "BeautyFeatures Detangling Hairbrush",
    component_qty: 1,
  },
  {
    bundle_sku: "21801",
    bundle_name: "The Autumn Glow Beauty Box",
    component_sku: "21682",
    component_name:
      "The Ordinary Saccharomyces Ferment 30% Milky Toner 100ml GWP",
    component_qty: 1,
  },
  {
    bundle_sku: "21801",
    bundle_name: "The Autumn Glow Beauty Box",
    component_sku: "21683",
    component_name: "The Ordinary Hyaluronic Acid 2% + B5 - 60ml GWP",
    component_qty: 1,
  },
  {
    bundle_sku: "21835",
    bundle_name: "Matrix Food For Soft Shampoo 300ml + FREE 75ml Shampoo",
    component_sku: "21373",
    component_name: "Matrix Food For Soft Hydrating Shampoo 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21835",
    bundle_name: "Matrix Food For Soft Shampoo 300ml + FREE 75ml Shampoo",
    component_sku: "21821",
    component_name: "Matrix Food For Soft Shampoo 75ml GWP",
    component_qty: 1,
  },
  {
    bundle_sku: "21836",
    bundle_name:
      "Matrix Food For Soft Conditioner 300ml + FREE 50ml Conditioner",
    component_sku: "21381",
    component_name: "Matrix Food For Soft Detangling Conditioner 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21836",
    bundle_name:
      "Matrix Food For Soft Conditioner 300ml + FREE 50ml Conditioner",
    component_sku: "21822",
    component_name: "Matrix Food For Soft Conditioner 50ml GWP",
    component_qty: 1,
  },
  {
    bundle_sku: "21837",
    bundle_name:
      "Matrix Total Results Brass Off Shampoo 300ml + FREE 75ml Shampoo",
    component_sku: "21823",
    component_name: "Matrix Total Results Brass Off Shampoo 75ml GWP",
    component_qty: 1,
  },
  {
    bundle_sku: "21837",
    bundle_name:
      "Matrix Total Results Brass Off Shampoo 300ml + FREE 75ml Shampoo",
    component_sku: "8248",
    component_name: "Matrix Total Results Brass Off Shampoo 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21838",
    bundle_name:
      "Matrix Total Results Brass Off Conditioner 300ml + FREE 50ml Conditioner",
    component_sku: "21386",
    component_name:
      "Matrix Brass Off Colour Protecting Blue Toning Conditioner 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21838",
    bundle_name:
      "Matrix Total Results Brass Off Conditioner 300ml + FREE 50ml Conditioner",
    component_sku: "21824",
    component_name: "Matrix Total Results Brass Off Conditioner 50ml GWP",
    component_qty: 1,
  },
  {
    bundle_sku: "21839",
    bundle_name: "Beauty of Joseon Deep Double Cleansing Duo",
    component_sku: "21581",
    component_name:
      "Beauty of Joseon Ginseng Cleansing Oil Waterproof Makeup Remover 210ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21839",
    bundle_name: "Beauty of Joseon Deep Double Cleansing Duo",
    component_sku: "21592",
    component_name: "Beauty of Joseon Green Plum Refreshing Cleanser 100ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21840",
    bundle_name: "Beauty of Joseon All Day Sun Duo",
    component_sku: "21575",
    component_name:
      "Beauty of Joseon Matte Sun Stick Mugwort + Camilia SPF50+ 18g",
    component_qty: 1,
  },
  {
    bundle_sku: "21840",
    bundle_name: "Beauty of Joseon All Day Sun Duo",
    component_sku: "21652",
    component_name:
      "Beauty of Joseon Relief Sun Rice + Probiotics SP50+ PA ++++ 50ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21841",
    bundle_name: "Beauty of Joseon Glass Skin Duo",
    component_sku: "21580",
    component_name: "Beauty of Joseon Glow Serum Propolis + Niacinamide 30ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21841",
    bundle_name: "Beauty of Joseon Glass Skin Duo",
    component_sku: "21582",
    component_name:
      "Beauty of Joseon Dynasty Cream Hydrating Face Moisturiser 100ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21842",
    bundle_name: "Beauty of Joseon Perfect Hanbang Sun Trio",
    component_sku: "21575",
    component_name:
      "Beauty of Joseon Matte Sun Stick Mugwort + Camilia SPF50+ 18g",
    component_qty: 1,
  },
  {
    bundle_sku: "21842",
    bundle_name: "Beauty of Joseon Perfect Hanbang Sun Trio",
    component_sku: "21577",
    component_name:
      "Beauty of Joseon Serums Ginseng Moist Sun Serum PA++++ SPF50+ 50ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21842",
    bundle_name: "Beauty of Joseon Perfect Hanbang Sun Trio",
    component_sku: "21652",
    component_name:
      "Beauty of Joseon Relief Sun Rice + Probiotics SP50+ PA ++++ 50ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21843",
    bundle_name: "Beauty of Joseon Glow Boosting Duo",
    component_sku: "21580",
    component_name: "Beauty of Joseon Glow Serum Propolis + Niacinamide 30ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21843",
    bundle_name: "Beauty of Joseon Glow Boosting Duo",
    component_sku: "21588",
    component_name: "Beauty of Joseon Glow Deep Serum Rice + Arbutin 30ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21844",
    bundle_name: "Beauty of Joseon Bright & Firming Duo",
    component_sku: "21589",
    component_name: "Beauty of Joseon Light On Serum Centella + Vita C 30ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21844",
    bundle_name: "Beauty of Joseon Bright & Firming Duo",
    component_sku: "21591",
    component_name: "Beauty of Joseon Revive Eye Serum Ginseng + Retinal 30ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21845",
    bundle_name: "K Beauty Favourites Bundle",
    component_sku: "14403",
    component_name: "COSRX Advanced Snail 96 Mucin Power Essence",
    component_qty: 1,
  },
  {
    bundle_sku: "21845",
    bundle_name: "K Beauty Favourites Bundle",
    component_sku: "21581",
    component_name:
      "Beauty of Joseon Ginseng Cleansing Oil Waterproof Makeup Remover 210ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21845",
    bundle_name: "K Beauty Favourites Bundle",
    component_sku: "21591",
    component_name: "Beauty of Joseon Revive Eye Serum Ginseng + Retinal 30ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21845",
    bundle_name: "K Beauty Favourites Bundle",
    component_sku: "21652",
    component_name:
      "Beauty of Joseon Relief Sun Rice + Probiotics SP50+ PA ++++ 50ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21845",
    bundle_name: "K Beauty Favourites Bundle",
    component_sku: "21670",
    component_name: "Medicube Collagen Night Wrapping Mask 75ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21845",
    bundle_name: "K Beauty Favourites Bundle",
    component_sku: "21673",
    component_name: "Mixsoon Bean Essence 50ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21845",
    bundle_name: "K Beauty Favourites Bundle",
    component_sku: "21675",
    component_name: "Skin1004 Madagascar Centella Ampoule Serum 100ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21845",
    bundle_name: "K Beauty Favourites Bundle",
    component_sku: "21681",
    component_name: "LANEIGE Lip Sleeping Mask - Berry 20g",
    component_qty: 1,
  },
  {
    bundle_sku: "21846",
    bundle_name: "K Beauty Clear & Calm Bundle For Breakout Prone Skin",
    component_sku: "14403",
    component_name: "COSRX Advanced Snail 96 Mucin Power Essence",
    component_qty: 1,
  },
  {
    bundle_sku: "21846",
    bundle_name: "K Beauty Clear & Calm Bundle For Breakout Prone Skin",
    component_sku: "21580",
    component_name: "Beauty of Joseon Glow Serum Propolis + Niacinamide 30ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21846",
    bundle_name: "K Beauty Clear & Calm Bundle For Breakout Prone Skin",
    component_sku: "21675",
    component_name: "Skin1004 Madagascar Centella Ampoule Serum 100ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21846",
    bundle_name: "K Beauty Clear & Calm Bundle For Breakout Prone Skin",
    component_sku: "21679",
    component_name: "Some By Mi AHA-BHA-PHA 30 Days Miracle Toner 150ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21847",
    bundle_name: "K Beauty Prep & Brighten Bundle For Uneven Skin",
    component_sku: "21580",
    component_name: "Beauty of Joseon Glow Serum Propolis + Niacinamide 30ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21847",
    bundle_name: "K Beauty Prep & Brighten Bundle For Uneven Skin",
    component_sku: "21667",
    component_name: "Anua Peach 70% Niacin Serum 30ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21847",
    bundle_name: "K Beauty Prep & Brighten Bundle For Uneven Skin",
    component_sku: "21679",
    component_name: "Some By Mi AHA-BHA-PHA 30 Days Miracle Toner 150ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21848",
    bundle_name: "Hollywood Browzer Hero Dermaplaning Starter Kit",
    component_sku: "11555",
    component_name: "Hollywood Browzer - Single - Black",
    component_qty: 1,
  },
  {
    bundle_sku: "21848",
    bundle_name: "Hollywood Browzer Hero Dermaplaning Starter Kit",
    component_sku: "11572",
    component_name: "Hollywood Browzer Deluxe Microfiber Puff - Black",
    component_qty: 1,
  },
  {
    bundle_sku: "21848",
    bundle_name: "Hollywood Browzer Hero Dermaplaning Starter Kit",
    component_sku: "11576",
    component_name: "Hollywood Beauty 5X Magnification Mirror - Black",
    component_qty: 1,
  },
  {
    bundle_sku: "21848",
    bundle_name: "Hollywood Browzer Hero Dermaplaning Starter Kit",
    component_sku: "11578",
    component_name: "Hollywood Browzer Microfibre Cleansing Pads - Black",
    component_qty: 1,
  },
  {
    bundle_sku: "21848",
    bundle_name: "Hollywood Browzer Hero Dermaplaning Starter Kit",
    component_sku: "21893",
    component_name: "Hollywood Browzer Gold Bag",
    component_qty: 1,
  },
  {
    bundle_sku: "21849",
    bundle_name: "Hollywood Browzer Hero Sonic Dermaplaner Rose Gold Bundle",
    component_sku: "11569",
    component_name: "Hollywood Smoother - Rose Gold",
    component_qty: 1,
  },
  {
    bundle_sku: "21849",
    bundle_name: "Hollywood Browzer Hero Sonic Dermaplaner Rose Gold Bundle",
    component_sku: "11572",
    component_name: "Hollywood Browzer Deluxe Microfiber Puff - Black",
    component_qty: 1,
  },
  {
    bundle_sku: "21849",
    bundle_name: "Hollywood Browzer Hero Sonic Dermaplaner Rose Gold Bundle",
    component_sku: "11576",
    component_name: "Hollywood Beauty 5X Magnification Mirror - Black",
    component_qty: 1,
  },
  {
    bundle_sku: "21849",
    bundle_name: "Hollywood Browzer Hero Sonic Dermaplaner Rose Gold Bundle",
    component_sku: "11578",
    component_name: "Hollywood Browzer Microfibre Cleansing Pads - Black",
    component_qty: 1,
  },
  {
    bundle_sku: "21849",
    bundle_name: "Hollywood Browzer Hero Sonic Dermaplaner Rose Gold Bundle",
    component_sku: "21893",
    component_name: "Hollywood Browzer Gold Bag",
    component_qty: 1,
  },
  {
    bundle_sku: "21850",
    bundle_name: "Hollywood Browzer Hero Sonic + Ice Therapy Rose Gold",
    component_sku: "11569",
    component_name: "Hollywood Smoother - Rose Gold",
    component_qty: 1,
  },
  {
    bundle_sku: "21850",
    bundle_name: "Hollywood Browzer Hero Sonic + Ice Therapy Rose Gold",
    component_sku: "11572",
    component_name: "Hollywood Browzer Deluxe Microfiber Puff - Black",
    component_qty: 1,
  },
  {
    bundle_sku: "21850",
    bundle_name: "Hollywood Browzer Hero Sonic + Ice Therapy Rose Gold",
    component_sku: "11576",
    component_name: "Hollywood Beauty 5X Magnification Mirror - Black",
    component_qty: 1,
  },
  {
    bundle_sku: "21850",
    bundle_name: "Hollywood Browzer Hero Sonic + Ice Therapy Rose Gold",
    component_sku: "11578",
    component_name: "Hollywood Browzer Microfibre Cleansing Pads - Black",
    component_qty: 1,
  },
  {
    bundle_sku: "21850",
    bundle_name: "Hollywood Browzer Hero Sonic + Ice Therapy Rose Gold",
    component_sku: "21852",
    component_name: "Hollywood Browzer Ice Therapy Tool",
    component_qty: 1,
  },
  {
    bundle_sku: "21850",
    bundle_name: "Hollywood Browzer Hero Sonic + Ice Therapy Rose Gold",
    component_sku: "21893",
    component_name: "Hollywood Browzer Gold Bag",
    component_qty: 1,
  },
  {
    bundle_sku: "21851",
    bundle_name: "Hollywood Browzer Summer Skin on The Go Bundle",
    component_sku: "11555",
    component_name: "Hollywood Browzer - Single - Black",
    component_qty: 3,
  },
  {
    bundle_sku: "21851",
    bundle_name: "Hollywood Browzer Summer Skin on The Go Bundle",
    component_sku: "11574",
    component_name: "Hollywood Beauty Art Deco Compact Mirror - Black",
    component_qty: 1,
  },
  {
    bundle_sku: "21851",
    bundle_name: "Hollywood Browzer Summer Skin on The Go Bundle",
    component_sku: "21893",
    component_name: "Hollywood Browzer Gold Bag",
    component_qty: 1,
  },
  {
    bundle_sku: "21894",
    bundle_name:
      "Hollywood Browzer Duo Gold Kit With Microfibre Puff, Pads & Gold Bag",
    component_sku: "11561",
    component_name: "Hollywood Browzer - Duo - Gold",
    component_qty: 1,
  },
  {
    bundle_sku: "21894",
    bundle_name:
      "Hollywood Browzer Duo Gold Kit With Microfibre Puff, Pads & Gold Bag",
    component_sku: "11572",
    component_name: "Hollywood Browzer Deluxe Microfiber Puff - Black",
    component_qty: 1,
  },
  {
    bundle_sku: "21894",
    bundle_name:
      "Hollywood Browzer Duo Gold Kit With Microfibre Puff, Pads & Gold Bag",
    component_sku: "11578",
    component_name: "Hollywood Browzer Microfibre Cleansing Pads - Black",
    component_qty: 1,
  },
  {
    bundle_sku: "21894",
    bundle_name:
      "Hollywood Browzer Duo Gold Kit With Microfibre Puff, Pads & Gold Bag",
    component_sku: "21893",
    component_name: "Hollywood Browzer Gold Bag",
    component_qty: 1,
  },
  {
    bundle_sku: "21926",
    bundle_name:
      "Beauty of Joseon Deep Double Cleansing Duo With BeautyFeatures Cleansing Mitts",
    component_sku: "20517",
    component_name:
      "BeautyFeatures Resuable Bamboo Fibre Cleansing Mitts - 2 Pack",
    component_qty: 1,
  },
  {
    bundle_sku: "21926",
    bundle_name:
      "Beauty of Joseon Deep Double Cleansing Duo With BeautyFeatures Cleansing Mitts",
    component_sku: "21581",
    component_name:
      "Beauty of Joseon Ginseng Cleansing Oil Waterproof Makeup Remover 210ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21926",
    bundle_name:
      "Beauty of Joseon Deep Double Cleansing Duo With BeautyFeatures Cleansing Mitts",
    component_sku: "21592",
    component_name: "Beauty of Joseon Green Plum Refreshing Cleanser 100ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21927",
    bundle_name:
      "Beauty of Joseon Deep Double Cleansing Duo With BeautyFeatures Cleansing Pads",
    component_sku: "20516",
    component_name:
      "BeautyFeatures Reusable Premium Cleansing Pads with Cuffs - 3 Pack",
    component_qty: 1,
  },
  {
    bundle_sku: "21927",
    bundle_name:
      "Beauty of Joseon Deep Double Cleansing Duo With BeautyFeatures Cleansing Pads",
    component_sku: "21581",
    component_name:
      "Beauty of Joseon Ginseng Cleansing Oil Waterproof Makeup Remover 210ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21927",
    bundle_name:
      "Beauty of Joseon Deep Double Cleansing Duo With BeautyFeatures Cleansing Pads",
    component_sku: "21592",
    component_name: "Beauty of Joseon Green Plum Refreshing Cleanser 100ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21943",
    bundle_name:
      "Redken All Soft Shampoo & Conditioner Duo Plus FREE Mini Shampoo & Conditioner",
    component_sku: "12290",
    component_name: "Redken All Soft Conditioner GWP",
    component_qty: 1,
  },
  {
    bundle_sku: "21943",
    bundle_name:
      "Redken All Soft Shampoo & Conditioner Duo Plus FREE Mini Shampoo & Conditioner",
    component_sku: "REDK_P042480",
    component_name: "Redken - All Soft Shampoo 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21943",
    bundle_name:
      "Redken All Soft Shampoo & Conditioner Duo Plus FREE Mini Shampoo & Conditioner",
    component_sku: "REDK_P042560",
    component_name: "Redken - All Soft Conditioner 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21944",
    bundle_name:
      "Redken Acidic Bonding Concentrate Shampoo & Conditioner Duo Plus FREE Mini Shampoo & Conditioner",
    component_sku: "12288",
    component_name: "Redken Acidic Bonding Concentrate Conditioner GWP",
    component_qty: 1,
  },
  {
    bundle_sku: "21944",
    bundle_name:
      "Redken Acidic Bonding Concentrate Shampoo & Conditioner Duo Plus FREE Mini Shampoo & Conditioner",
    component_sku: "9762",
    component_name: "Redken Acidic Bonding Concentrate Shampoo 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21944",
    bundle_name:
      "Redken Acidic Bonding Concentrate Shampoo & Conditioner Duo Plus FREE Mini Shampoo & Conditioner",
    component_sku: "9763",
    component_name: "Redken Acidic Bonding Concentrate Conditioner 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21945",
    bundle_name:
      "Redken Acidic Color Gloss Shampoo & Conditioner Duo Plus FREE Mini Shampoo & Conditioner",
    component_sku: "14141",
    component_name: "Redken Acidic Color Gloss Sulfate-Free Shampoo 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21945",
    bundle_name:
      "Redken Acidic Color Gloss Shampoo & Conditioner Duo Plus FREE Mini Shampoo & Conditioner",
    component_sku: "14142",
    component_name: "Redken Acidic Color Gloss Conditioner 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21945",
    bundle_name:
      "Redken Acidic Color Gloss Shampoo & Conditioner Duo Plus FREE Mini Shampoo & Conditioner",
    component_sku: "20925",
    component_name: "Redken Acidic Color Gloss Shampoo 75ml GWP",
    component_qty: 1,
  },
  {
    bundle_sku: "21945",
    bundle_name:
      "Redken Acidic Color Gloss Shampoo & Conditioner Duo Plus FREE Mini Shampoo & Conditioner",
    component_sku: "20926",
    component_name: "Redken Acidic Color Gloss Conditioner 50ml GWP",
    component_qty: 1,
  },
  {
    bundle_sku: "21946",
    bundle_name:
      "Pureology Hydrate Shampoo & Conditioner Duo Plus FREE Mini Shampoo & Conditioner",
    component_sku: "5048",
    component_name: "Pureology - Pure Hydrate Shampoo 266ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21946",
    bundle_name:
      "Pureology Hydrate Shampoo & Conditioner Duo Plus FREE Mini Shampoo & Conditioner",
    component_sku: "5053",
    component_name: "Pureology - Pure Hydrate Conditioner 266ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21947",
    bundle_name:
      "Pureology Strength Cure Shampoo & Conditioner Duo Plus FREE Mini Shampoo & Conditioner",
    component_sku: "5052",
    component_name: "Pureology - Strength Cure Shampoo 266ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21947",
    bundle_name:
      "Pureology Strength Cure Shampoo & Conditioner Duo Plus FREE Mini Shampoo & Conditioner",
    component_sku: "5057",
    component_name: "Pureology - Strength Cure Conditioner 266ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21948",
    bundle_name:
      "Kerastase Genesis Shampoo & Conditioner Duo Plus FREE Mini Shampoo & Mask",
    component_sku: "12268",
    component_name: "Kerastase Genesis Masque Deluxe 30ml​ GWP",
    component_qty: 1,
  },
  {
    bundle_sku: "21948",
    bundle_name:
      "Kerastase Genesis Shampoo & Conditioner Duo Plus FREE Mini Shampoo & Mask",
    component_sku: "8779",
    component_name: "Kerastase Genesis Bain Hydra-Fortifiant 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21948",
    bundle_name:
      "Kerastase Genesis Shampoo & Conditioner Duo Plus FREE Mini Shampoo & Mask",
    component_sku: "8781",
    component_name: "Kerastase Genesis Fondant Renforçateur 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21949",
    bundle_name:
      "Kerastase Gloss Absolu Shampoo & Conditioner Duo Plus FREE Mini Shampoo & Conditioner",
    component_sku: "20805",
    component_name: "Kerastase Gloss Absolu Bain Hydra Glaze Shampoo 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21949",
    bundle_name:
      "Kerastase Gloss Absolu Shampoo & Conditioner Duo Plus FREE Mini Shampoo & Conditioner",
    component_sku: "20808",
    component_name: "Kerastase Gloss Absolu Insta Glaze Conditioner 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21949",
    bundle_name:
      "Kerastase Gloss Absolu Shampoo & Conditioner Duo Plus FREE Mini Shampoo & Conditioner",
    component_sku: "20921",
    component_name: "Kerastase Gloss Absolu Conditioner 30ml GWP",
    component_qty: 1,
  },
  {
    bundle_sku: "21949",
    bundle_name:
      "Kerastase Gloss Absolu Shampoo & Conditioner Duo Plus FREE Mini Shampoo & Conditioner",
    component_sku: "21464",
    component_name: "Kerastase Gloss Absolu Bain 80ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21950",
    bundle_name:
      "Kerastase Nutritive Shampoo & Conditioner Duo Plus FREE Mini Shampoo & Conditioner",
    component_sku: "20919",
    component_name: "Kerastase Nutritive Lait Vital 30ml GWP",
    component_qty: 1,
  },
  {
    bundle_sku: "21950",
    bundle_name:
      "Kerastase Nutritive Shampoo & Conditioner Duo Plus FREE Mini Shampoo & Conditioner",
    component_sku: "KER_4401984",
    component_name: "Kerastase Nutritive Lait Vital 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21950",
    bundle_name:
      "Kerastase Nutritive Shampoo & Conditioner Duo Plus FREE Mini Shampoo & Conditioner",
    component_sku: "KER_4402082",
    component_name: "Kerastase  Nutritive Bain Satin Riche 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21951",
    bundle_name:
      "Kerastase Resistance Shampoo & Conditioner Duo Plus FREE Mini Shampoo 30ml & Heat Protector 50ml",
    component_sku: "12273",
    component_name:
      "Kerastase Resistance Bain Force Architecte Deluxe 30ml​ GWP",
    component_qty: 1,
  },
  {
    bundle_sku: "21951",
    bundle_name:
      "Kerastase Resistance Shampoo & Conditioner Duo Plus FREE Mini Shampoo 30ml & Heat Protector 50ml",
    component_sku: "KER_E046500",
    component_name: "Kerastase Resistance Ciment Anti Usure 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "21951",
    bundle_name:
      "Kerastase Resistance Shampoo & Conditioner Duo Plus FREE Mini Shampoo 30ml & Heat Protector 50ml",
    component_sku: "KER_E057430",
    component_name: "Kerastase Bain De Force Architecte 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22232",
    bundle_name:
      "Korean Skincare Dry Skin Bundle with FREE BeautyFeatures Cleansing Mitts",
    component_sku: "20517",
    component_name:
      "BeautyFeatures Resuable Bamboo Fibre Cleansing Mitts - 2 Pack",
    component_qty: 1,
  },
  {
    bundle_sku: "22232",
    bundle_name:
      "Korean Skincare Dry Skin Bundle with FREE BeautyFeatures Cleansing Mitts",
    component_sku: "21580",
    component_name: "Beauty of Joseon Glow Serum Propolis + Niacinamide 30ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22232",
    bundle_name:
      "Korean Skincare Dry Skin Bundle with FREE BeautyFeatures Cleansing Mitts",
    component_sku: "21583",
    component_name: "Beauty of Joseon Ginseng Essence Water 150ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22232",
    bundle_name:
      "Korean Skincare Dry Skin Bundle with FREE BeautyFeatures Cleansing Mitts",
    component_sku: "22036",
    component_name: "CosRx Low-pH Good Morning Gel Cleanser 150ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22232",
    bundle_name:
      "Korean Skincare Dry Skin Bundle with FREE BeautyFeatures Cleansing Mitts",
    component_sku: "22066",
    component_name:
      "Haruharu Wonder Black Rice Hyaluronic Cream Unscented 50ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22233",
    bundle_name:
      "Korean Skincare Oily Skin Bundle with FREE BeautyFeatures Cleansing Mitts",
    component_sku: "20517",
    component_name:
      "BeautyFeatures Resuable Bamboo Fibre Cleansing Mitts - 2 Pack",
    component_qty: 1,
  },
  {
    bundle_sku: "22233",
    bundle_name:
      "Korean Skincare Oily Skin Bundle with FREE BeautyFeatures Cleansing Mitts",
    component_sku: "21585",
    component_name: "Beauty of Joseon Red Bean Water Gel 100ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22233",
    bundle_name:
      "Korean Skincare Oily Skin Bundle with FREE BeautyFeatures Cleansing Mitts",
    component_sku: "22049",
    component_name: "CosRx Salicylic Acid Daily Gentle Cleanser 150ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22233",
    bundle_name:
      "Korean Skincare Oily Skin Bundle with FREE BeautyFeatures Cleansing Mitts",
    component_sku: "22086",
    component_name: "Skin1004 Madagascar Centella Poremizing Clear Toner 210ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22233",
    bundle_name:
      "Korean Skincare Oily Skin Bundle with FREE BeautyFeatures Cleansing Mitts",
    component_sku: "22119",
    component_name: "Some By Mi 30 Days AHA, BHA, PHA Miracle Serum 50ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22233",
    bundle_name:
      "Korean Skincare Oily Skin Bundle with FREE BeautyFeatures Cleansing Mitts",
    component_sku: "22175",
    component_name:
      "Some By Mi Super Matcha Intensive Pore Cleaning & Tightening Clay Mask 100g",
    component_qty: 1,
  },
  {
    bundle_sku: "22234",
    bundle_name:
      "Korean Skincare Combination Skin Bundle with FREE BeautyFeatures Cleansing Mitts",
    component_sku: "20517",
    component_name:
      "BeautyFeatures Resuable Bamboo Fibre Cleansing Mitts - 2 Pack",
    component_qty: 1,
  },
  {
    bundle_sku: "22234",
    bundle_name:
      "Korean Skincare Combination Skin Bundle with FREE BeautyFeatures Cleansing Mitts",
    component_sku: "21588",
    component_name: "Beauty of Joseon Glow Deep Serum Rice + Arbutin 30ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22234",
    bundle_name:
      "Korean Skincare Combination Skin Bundle with FREE BeautyFeatures Cleansing Mitts",
    component_sku: "21595",
    component_name:
      "Beauty of Joseon Green Plum Refreshing AHA + BHA Toner 150ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22234",
    bundle_name:
      "Korean Skincare Combination Skin Bundle with FREE BeautyFeatures Cleansing Mitts",
    component_sku: "22052",
    component_name: "Skin1004 Madagascar Centella Light Cleansing Oil 30ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22234",
    bundle_name:
      "Korean Skincare Combination Skin Bundle with FREE BeautyFeatures Cleansing Mitts",
    component_sku: "22085",
    component_name: "Round Lab Birch Juice Moisturising Cream 80ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22234",
    bundle_name:
      "Korean Skincare Combination Skin Bundle with FREE BeautyFeatures Cleansing Mitts",
    component_sku: "22148",
    component_name: "Some By Mi Real Aloe Soothing Care Sheet Mask 20g",
    component_qty: 1,
  },
  {
    bundle_sku: "22235",
    bundle_name:
      "Korean Skincare Sensitive Skin Bundle with FREE BeautyFeatures Cleansing Mitts",
    component_sku: "20517",
    component_name:
      "BeautyFeatures Resuable Bamboo Fibre Cleansing Mitts - 2 Pack",
    component_qty: 1,
  },
  {
    bundle_sku: "22235",
    bundle_name:
      "Korean Skincare Sensitive Skin Bundle with FREE BeautyFeatures Cleansing Mitts",
    component_sku: "21587",
    component_name: "Beauty of Joseon Calming Serum Green Tea & Panthenol 30ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22235",
    bundle_name:
      "Korean Skincare Sensitive Skin Bundle with FREE BeautyFeatures Cleansing Mitts",
    component_sku: "22038",
    component_name: "Skin1004 Madagascar Centella Soothing Cream 75ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22235",
    bundle_name:
      "Korean Skincare Sensitive Skin Bundle with FREE BeautyFeatures Cleansing Mitts",
    component_sku: "22077",
    component_name: "CosRx Advanced Snail Mucin Power Gel Cleanser 150ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22235",
    bundle_name:
      "Korean Skincare Sensitive Skin Bundle with FREE BeautyFeatures Cleansing Mitts",
    component_sku: "22113",
    component_name: "Haruharu Wonder Black Bamboo Mist 150ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22235",
    bundle_name:
      "Korean Skincare Sensitive Skin Bundle with FREE BeautyFeatures Cleansing Mitts",
    component_sku: "22218",
    component_name: "Anua Heartleaf Soothing Toner 500ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22236",
    bundle_name:
      "Korean Skincare Anti Aging Skin Bundle with FREE BeautyFeatures Cleansing Mitts",
    component_sku: "20517",
    component_name:
      "BeautyFeatures Resuable Bamboo Fibre Cleansing Mitts - 2 Pack",
    component_qty: 1,
  },
  {
    bundle_sku: "22236",
    bundle_name:
      "Korean Skincare Anti Aging Skin Bundle with FREE BeautyFeatures Cleansing Mitts",
    component_sku: "21590",
    component_name: "Beauty of Joseon Revive Serum Ginseng + Snail Mucin 30ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22236",
    bundle_name:
      "Korean Skincare Anti Aging Skin Bundle with FREE BeautyFeatures Cleansing Mitts",
    component_sku: "21591",
    component_name: "Beauty of Joseon Revive Eye Serum Ginseng + Retinal 30ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22236",
    bundle_name:
      "Korean Skincare Anti Aging Skin Bundle with FREE BeautyFeatures Cleansing Mitts",
    component_sku: "22043",
    component_name: "Medicube Collagen Jelly Cream 50ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22236",
    bundle_name:
      "Korean Skincare Anti Aging Skin Bundle with FREE BeautyFeatures Cleansing Mitts",
    component_sku: "22158",
    component_name: "Round Lab 1025 Dodko Cleansing Oil 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22236",
    bundle_name:
      "Korean Skincare Anti Aging Skin Bundle with FREE BeautyFeatures Cleansing Mitts",
    component_sku: "22200",
    component_name: "Haruharu Wonder Black Rice Hyaluronic Essence 50ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22237",
    bundle_name:
      "Korean Skincare Teen Skin Bundle with FREE BeautyFeatures Cleansing Mitts",
    component_sku: "20517",
    component_name:
      "BeautyFeatures Resuable Bamboo Fibre Cleansing Mitts - 2 Pack",
    component_qty: 1,
  },
  {
    bundle_sku: "22237",
    bundle_name:
      "Korean Skincare Teen Skin Bundle with FREE BeautyFeatures Cleansing Mitts",
    component_sku: "22029",
    component_name: "CosRx Acne Pimple Master Patch - 24 Pack",
    component_qty: 1,
  },
  {
    bundle_sku: "22237",
    bundle_name:
      "Korean Skincare Teen Skin Bundle with FREE BeautyFeatures Cleansing Mitts",
    component_sku: "22068",
    component_name: "CosRx Oil-Free Ultra Moisturising Lotion 100ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22237",
    bundle_name:
      "Korean Skincare Teen Skin Bundle with FREE BeautyFeatures Cleansing Mitts",
    component_sku: "22071",
    component_name:
      "Some By Mi 30 Days AHA, BHA, PHA Miracle Cleansing Foam 100ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22237",
    bundle_name:
      "Korean Skincare Teen Skin Bundle with FREE BeautyFeatures Cleansing Mitts",
    component_sku: "22102",
    component_name: "Some By Mi Retinol Intense Reactivating Serum 30ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22237",
    bundle_name:
      "Korean Skincare Teen Skin Bundle with FREE BeautyFeatures Cleansing Mitts",
    component_sku: "22131",
    component_name:
      "Skin1004 Madagascar Centella Tea-Trica Purifying Toner 210ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22238",
    bundle_name:
      "Korean Skincare Brightening Bundle with FREE BeautyFeatures Cleansing Mitts",
    component_sku: "20517",
    component_name:
      "BeautyFeatures Resuable Bamboo Fibre Cleansing Mitts - 2 Pack",
    component_qty: 1,
  },
  {
    bundle_sku: "22238",
    bundle_name:
      "Korean Skincare Brightening Bundle with FREE BeautyFeatures Cleansing Mitts",
    component_sku: "22041",
    component_name: "Dr. Althea Vitamin C Boosting Serum 30ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22238",
    bundle_name:
      "Korean Skincare Brightening Bundle with FREE BeautyFeatures Cleansing Mitts",
    component_sku: "22088",
    component_name: "Some By Mi Real Vitamin Brightening Care Sheet Mask 20g",
    component_qty: 1,
  },
  {
    bundle_sku: "22238",
    bundle_name:
      "Korean Skincare Brightening Bundle with FREE BeautyFeatures Cleansing Mitts",
    component_sku: "22134",
    component_name: "CosRx Low pH Niacinamide Micellar Cleansing Water 400ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22238",
    bundle_name:
      "Korean Skincare Brightening Bundle with FREE BeautyFeatures Cleansing Mitts",
    component_sku: "22172",
    component_name: "Round Lab Soybean Nourishing Cream 80ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22238",
    bundle_name:
      "Korean Skincare Brightening Bundle with FREE BeautyFeatures Cleansing Mitts",
    component_sku: "22182",
    component_name:
      "Some By Mi Galactomyces Glutathione Glow Milky Toner 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22239",
    bundle_name:
      "Korean Skincare Minimalist Bundle with FREE BeautyFeatures Cleansing Mitts",
    component_sku: "20517",
    component_name:
      "BeautyFeatures Resuable Bamboo Fibre Cleansing Mitts - 2 Pack",
    component_qty: 1,
  },
  {
    bundle_sku: "22239",
    bundle_name:
      "Korean Skincare Minimalist Bundle with FREE BeautyFeatures Cleansing Mitts",
    component_sku: "22028",
    component_name:
      "Beauty Of Joseon Relief Sun Aqua-Fresh Rice + B5 Sunscreen PA++++ SPF50+ 50ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22239",
    bundle_name:
      "Korean Skincare Minimalist Bundle with FREE BeautyFeatures Cleansing Mitts",
    component_sku: "22036",
    component_name: "CosRx Low-pH Good Morning Gel Cleanser 150ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22239",
    bundle_name:
      "Korean Skincare Minimalist Bundle with FREE BeautyFeatures Cleansing Mitts",
    component_sku: "22100",
    component_name: "Numbuzin No. 3 Skin Softening Serum 50ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22239",
    bundle_name:
      "Korean Skincare Minimalist Bundle with FREE BeautyFeatures Cleansing Mitts",
    component_sku: "22187",
    component_name: "Round Lab Birch Juice Moisturising Toner 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22239",
    bundle_name:
      "Korean Skincare Minimalist Bundle with FREE BeautyFeatures Cleansing Mitts",
    component_sku: "22215",
    component_name: "Anua Heartleaf Intense Calming Cream 50ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22243",
    bundle_name:
      "Dermalogica Daily Milkfoliant & Circular Hydration Serum with FREE Exfoliating & Hydrating Essentials Kit",
    component_sku: "11141",
    component_name: "Dermalogica Circular Hydration Serum 30ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22243",
    bundle_name:
      "Dermalogica Daily Milkfoliant & Circular Hydration Serum with FREE Exfoliating & Hydrating Essentials Kit",
    component_sku: "11311",
    component_name: "Dermalogica Daily Milkfoliant 74g",
    component_qty: 1,
  },
  {
    bundle_sku: "22243",
    bundle_name:
      "Dermalogica Daily Milkfoliant & Circular Hydration Serum with FREE Exfoliating & Hydrating Essentials Kit",
    component_sku: "20842",
    component_name:
      "Dermalogica Daily Exfoliation and Hydrating Essentials GWP",
    component_qty: 1,
  },
  {
    bundle_sku: "22327",
    bundle_name: "K-Beauty Best-Selling Icons Beauty Box",
    component_sku: "14403",
    component_name: "COSRX Advanced Snail 96 Mucin Power Essence",
    component_qty: 1,
  },
  {
    bundle_sku: "22327",
    bundle_name: "K-Beauty Best-Selling Icons Beauty Box",
    component_sku: "20295",
    component_name: "Large Black Box",
    component_qty: 1,
  },
  {
    bundle_sku: "22327",
    bundle_name: "K-Beauty Best-Selling Icons Beauty Box",
    component_sku: "20511",
    component_name: "Beauty Box Large Sleeve",
    component_qty: 1,
  },
  {
    bundle_sku: "22327",
    bundle_name: "K-Beauty Best-Selling Icons Beauty Box",
    component_sku: "20517",
    component_name:
      "BeautyFeatures Resuable Bamboo Fibre Cleansing Mitts - 2 Pack",
    component_qty: 1,
  },
  {
    bundle_sku: "22327",
    bundle_name: "K-Beauty Best-Selling Icons Beauty Box",
    component_sku: "21591",
    component_name: "Beauty of Joseon Revive Eye Serum Ginseng + Retinal 30ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22327",
    bundle_name: "K-Beauty Best-Selling Icons Beauty Box",
    component_sku: "21652",
    component_name:
      "Beauty of Joseon Relief Sun Rice + Probiotics SP50+ PA ++++ 50ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22327",
    bundle_name: "K-Beauty Best-Selling Icons Beauty Box",
    component_sku: "21669",
    component_name: "Medicube Zero Pore Pad 155g - 70 Pack",
    component_qty: 1,
  },
  {
    bundle_sku: "22327",
    bundle_name: "K-Beauty Best-Selling Icons Beauty Box",
    component_sku: "21670",
    component_name: "Medicube Collagen Night Wrapping Mask 75ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22327",
    bundle_name: "K-Beauty Best-Selling Icons Beauty Box",
    component_sku: "21681",
    component_name: "LANEIGE Lip Sleeping Mask - Berry 20g",
    component_qty: 1,
  },
  {
    bundle_sku: "22328",
    bundle_name: "K-Beauty Dry Skin Beauty Box For Deep Hydration + Repair",
    component_sku: "14403",
    component_name: "COSRX Advanced Snail 96 Mucin Power Essence",
    component_qty: 1,
  },
  {
    bundle_sku: "22328",
    bundle_name: "K-Beauty Dry Skin Beauty Box For Deep Hydration + Repair",
    component_sku: "20295",
    component_name: "Large Black Box",
    component_qty: 1,
  },
  {
    bundle_sku: "22328",
    bundle_name: "K-Beauty Dry Skin Beauty Box For Deep Hydration + Repair",
    component_sku: "20511",
    component_name: "Beauty Box Large Sleeve",
    component_qty: 1,
  },
  {
    bundle_sku: "22328",
    bundle_name: "K-Beauty Dry Skin Beauty Box For Deep Hydration + Repair",
    component_sku: "20517",
    component_name:
      "BeautyFeatures Resuable Bamboo Fibre Cleansing Mitts - 2 Pack",
    component_qty: 1,
  },
  {
    bundle_sku: "22328",
    bundle_name: "K-Beauty Dry Skin Beauty Box For Deep Hydration + Repair",
    component_sku: "21667",
    component_name: "Anua Peach 70% Niacin Serum 30ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22328",
    bundle_name: "K-Beauty Dry Skin Beauty Box For Deep Hydration + Repair",
    component_sku: "21681",
    component_name: "LANEIGE Lip Sleeping Mask - Berry 20g",
    component_qty: 1,
  },
  {
    bundle_sku: "22328",
    bundle_name: "K-Beauty Dry Skin Beauty Box For Deep Hydration + Repair",
    component_sku: "21809",
    component_name: "Haruharu Wonder Black Rice Hyaluronic Toner 150ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22328",
    bundle_name: "K-Beauty Dry Skin Beauty Box For Deep Hydration + Repair",
    component_sku: "21854",
    component_name: "Beauty of Joseon Dynasty Cream 50ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22329",
    bundle_name: "K-Beauty Oily / Acne-Prone Skin Beauty Box",
    component_sku: "14405",
    component_name: "COSRX BHA Blackhead Power Liquid 100ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22329",
    bundle_name: "K-Beauty Oily / Acne-Prone Skin Beauty Box",
    component_sku: "20295",
    component_name: "Large Black Box",
    component_qty: 1,
  },
  {
    bundle_sku: "22329",
    bundle_name: "K-Beauty Oily / Acne-Prone Skin Beauty Box",
    component_sku: "20511",
    component_name: "Beauty Box Large Sleeve",
    component_qty: 1,
  },
  {
    bundle_sku: "22329",
    bundle_name: "K-Beauty Oily / Acne-Prone Skin Beauty Box",
    component_sku: "20517",
    component_name:
      "BeautyFeatures Resuable Bamboo Fibre Cleansing Mitts - 2 Pack",
    component_qty: 1,
  },
  {
    bundle_sku: "22329",
    bundle_name: "K-Beauty Oily / Acne-Prone Skin Beauty Box",
    component_sku: "21679",
    component_name: "Some By Mi AHA-BHA-PHA 30 Days Miracle Toner 150ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22329",
    bundle_name: "K-Beauty Oily / Acne-Prone Skin Beauty Box",
    component_sku: "21807",
    component_name: "Axis-Y Dark Spot Correcting Glow Serum 50ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22329",
    bundle_name: "K-Beauty Oily / Acne-Prone Skin Beauty Box",
    component_sku: "22206",
    component_name: "Anua Heartleaf Pore Control Cleansing Oil 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22330",
    bundle_name: "K-Beauty Combination Skin Beauty Box",
    component_sku: "14402",
    component_name: "COSRX Advanced Snail 92 All In One Cream Tube 50g",
    component_qty: 1,
  },
  {
    bundle_sku: "22330",
    bundle_name: "K-Beauty Combination Skin Beauty Box",
    component_sku: "20295",
    component_name: "Large Black Box",
    component_qty: 1,
  },
  {
    bundle_sku: "22330",
    bundle_name: "K-Beauty Combination Skin Beauty Box",
    component_sku: "20511",
    component_name: "Beauty Box Large Sleeve",
    component_qty: 1,
  },
  {
    bundle_sku: "22330",
    bundle_name: "K-Beauty Combination Skin Beauty Box",
    component_sku: "20517",
    component_name:
      "BeautyFeatures Resuable Bamboo Fibre Cleansing Mitts - 2 Pack",
    component_qty: 1,
  },
  {
    bundle_sku: "22330",
    bundle_name: "K-Beauty Combination Skin Beauty Box",
    component_sku: "21580",
    component_name: "Beauty of Joseon Glow Serum Propolis + Niacinamide 30ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22330",
    bundle_name: "K-Beauty Combination Skin Beauty Box",
    component_sku: "21666",
    component_name: "Anua Heartleaf 77% Soothing Toner 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22330",
    bundle_name: "K-Beauty Combination Skin Beauty Box",
    component_sku: "22072",
    component_name:
      "Skin1004 Madagascar Centella Poremizing Fresh Ampoule 30ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22330",
    bundle_name: "K-Beauty Combination Skin Beauty Box",
    component_sku: "22200",
    component_name: "Haruharu Wonder Black Rice Hyaluronic Essence 50ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22331",
    bundle_name: "K-Beauty Sensitive Skin Beauty Box",
    component_sku: "20295",
    component_name: "Large Black Box",
    component_qty: 1,
  },
  {
    bundle_sku: "22331",
    bundle_name: "K-Beauty Sensitive Skin Beauty Box",
    component_sku: "20511",
    component_name: "Beauty Box Large Sleeve",
    component_qty: 1,
  },
  {
    bundle_sku: "22331",
    bundle_name: "K-Beauty Sensitive Skin Beauty Box",
    component_sku: "20517",
    component_name:
      "BeautyFeatures Resuable Bamboo Fibre Cleansing Mitts - 2 Pack",
    component_qty: 1,
  },
  {
    bundle_sku: "22331",
    bundle_name: "K-Beauty Sensitive Skin Beauty Box",
    component_sku: "21652",
    component_name:
      "Beauty of Joseon Relief Sun Rice + Probiotics SP50+ PA ++++ 50ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22331",
    bundle_name: "K-Beauty Sensitive Skin Beauty Box",
    component_sku: "21666",
    component_name: "Anua Heartleaf 77% Soothing Toner 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22331",
    bundle_name: "K-Beauty Sensitive Skin Beauty Box",
    component_sku: "21819",
    component_name: "Dr. Althea 147 Barrier Cream 50ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22331",
    bundle_name: "K-Beauty Sensitive Skin Beauty Box",
    component_sku: "22066",
    component_name:
      "Haruharu Wonder Black Rice Hyaluronic Cream Unscented 50ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22332",
    bundle_name: "K-Beauty Mature/Aging Skin Beauty Box",
    component_sku: "14403",
    component_name: "COSRX Advanced Snail 96 Mucin Power Essence",
    component_qty: 1,
  },
  {
    bundle_sku: "22332",
    bundle_name: "K-Beauty Mature/Aging Skin Beauty Box",
    component_sku: "20295",
    component_name: "Large Black Box",
    component_qty: 1,
  },
  {
    bundle_sku: "22332",
    bundle_name: "K-Beauty Mature/Aging Skin Beauty Box",
    component_sku: "20511",
    component_name: "Beauty Box Large Sleeve",
    component_qty: 1,
  },
  {
    bundle_sku: "22332",
    bundle_name: "K-Beauty Mature/Aging Skin Beauty Box",
    component_sku: "20517",
    component_name:
      "BeautyFeatures Resuable Bamboo Fibre Cleansing Mitts - 2 Pack",
    component_qty: 1,
  },
  {
    bundle_sku: "22332",
    bundle_name: "K-Beauty Mature/Aging Skin Beauty Box",
    component_sku: "21590",
    component_name: "Beauty of Joseon Revive Serum Ginseng + Snail Mucin 30ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22332",
    bundle_name: "K-Beauty Mature/Aging Skin Beauty Box",
    component_sku: "21672",
    component_name: "Medicube Triple Collagen Toner 140ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22332",
    bundle_name: "K-Beauty Mature/Aging Skin Beauty Box",
    component_sku: "21811",
    component_name: "Haruharu Wonder Black Rice Bakuchiol Eye Cream 20ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22332",
    bundle_name: "K-Beauty Mature/Aging Skin Beauty Box",
    component_sku: "22043",
    component_name: "Medicube Collagen Jelly Cream 50ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22332",
    bundle_name: "K-Beauty Mature/Aging Skin Beauty Box",
    component_sku: "22078",
    component_name: "Some By Mi Retinol Intensive Reactivating Sheet Mask 22g",
    component_qty: 1,
  },
  {
    bundle_sku: "22357",
    bundle_name:
      "SRC C-Section Recovery Mini Shorts + Scar Repair Care Bundle - XXS",
    component_sku: "22018",
    component_name: "SRC Scar Repair Care Silicone Sheets - 6 Pack",
    component_qty: 1,
  },
  {
    bundle_sku: "22357",
    bundle_name:
      "SRC C-Section Recovery Mini Shorts + Scar Repair Care Bundle - XXS",
    component_sku: "22262",
    component_name: "SRC C-Section Recovery Mini Shorts - XXS",
    component_qty: 1,
  },
  {
    bundle_sku: "22358",
    bundle_name:
      "SRC C-Section Recovery Mini Shorts + Scar Repair Care Bundle - XS",
    component_sku: "22018",
    component_name: "SRC Scar Repair Care Silicone Sheets - 6 Pack",
    component_qty: 1,
  },
  {
    bundle_sku: "22358",
    bundle_name:
      "SRC C-Section Recovery Mini Shorts + Scar Repair Care Bundle - XS",
    component_sku: "22263",
    component_name: "SRC C-Section Recovery Mini Shorts - XS",
    component_qty: 1,
  },
  {
    bundle_sku: "22359",
    bundle_name:
      "SRC C-Section Recovery Mini Shorts + Scar Repair Care Bundle - S",
    component_sku: "22018",
    component_name: "SRC Scar Repair Care Silicone Sheets - 6 Pack",
    component_qty: 1,
  },
  {
    bundle_sku: "22359",
    bundle_name:
      "SRC C-Section Recovery Mini Shorts + Scar Repair Care Bundle - S",
    component_sku: "22264",
    component_name: "SRC C-Section Recovery Mini Shorts - S",
    component_qty: 1,
  },
  {
    bundle_sku: "22360",
    bundle_name:
      "SRC C-Section Recovery Mini Shorts + Scar Repair Care Bundle - M",
    component_sku: "22018",
    component_name: "SRC Scar Repair Care Silicone Sheets - 6 Pack",
    component_qty: 1,
  },
  {
    bundle_sku: "22360",
    bundle_name:
      "SRC C-Section Recovery Mini Shorts + Scar Repair Care Bundle - M",
    component_sku: "22265",
    component_name: "SRC C-Section Recovery Mini Shorts - M",
    component_qty: 1,
  },
  {
    bundle_sku: "22361",
    bundle_name:
      "SRC C-Section Recovery Mini Shorts + Scar Repair Care Bundle - L",
    component_sku: "22018",
    component_name: "SRC Scar Repair Care Silicone Sheets - 6 Pack",
    component_qty: 1,
  },
  {
    bundle_sku: "22361",
    bundle_name:
      "SRC C-Section Recovery Mini Shorts + Scar Repair Care Bundle - L",
    component_sku: "22266",
    component_name: "SRC C-Section Recovery Mini Shorts - L",
    component_qty: 1,
  },
  {
    bundle_sku: "22362",
    bundle_name:
      "SRC C-Section Recovery Mini Shorts + Scar Repair Care Bundle - XL",
    component_sku: "22018",
    component_name: "SRC Scar Repair Care Silicone Sheets - 6 Pack",
    component_qty: 1,
  },
  {
    bundle_sku: "22362",
    bundle_name:
      "SRC C-Section Recovery Mini Shorts + Scar Repair Care Bundle - XL",
    component_sku: "22267",
    component_name: "SRC C-Section Recovery Mini Shorts - XL",
    component_qty: 1,
  },
  {
    bundle_sku: "22363",
    bundle_name:
      "SRC C-Section Recovery Mini Shorts + Scar Repair Care Bundle - XXL",
    component_sku: "22018",
    component_name: "SRC Scar Repair Care Silicone Sheets - 6 Pack",
    component_qty: 1,
  },
  {
    bundle_sku: "22363",
    bundle_name:
      "SRC C-Section Recovery Mini Shorts + Scar Repair Care Bundle - XXL",
    component_sku: "22297",
    component_name: "SRC Postpartum Recovery Mini Shorts - XXL",
    component_qty: 1,
  },
  {
    bundle_sku: "22364",
    bundle_name:
      "SRC C-Section Recovery Shorts + Scar Repair Care Bundle - XXS",
    component_sku: "22011",
    component_name: "SRC C-Section Recovery Shorts - XXS",
    component_qty: 1,
  },
  {
    bundle_sku: "22364",
    bundle_name:
      "SRC C-Section Recovery Shorts + Scar Repair Care Bundle - XXS",
    component_sku: "22018",
    component_name: "SRC Scar Repair Care Silicone Sheets - 6 Pack",
    component_qty: 1,
  },
  {
    bundle_sku: "22365",
    bundle_name: "SRC C-Section Recovery Shorts + Scar Repair Care Bundle - XS",
    component_sku: "22012",
    component_name: "SRC C-Section Recovery Shorts -XS",
    component_qty: 1,
  },
  {
    bundle_sku: "22365",
    bundle_name: "SRC C-Section Recovery Shorts + Scar Repair Care Bundle - XS",
    component_sku: "22018",
    component_name: "SRC Scar Repair Care Silicone Sheets - 6 Pack",
    component_qty: 1,
  },
  {
    bundle_sku: "22366",
    bundle_name: "SRC C-Section Recovery Shorts + Scar Repair Care Bundle - S",
    component_sku: "22013",
    component_name: "SRC C-Section Recovery Short - S",
    component_qty: 1,
  },
  {
    bundle_sku: "22366",
    bundle_name: "SRC C-Section Recovery Shorts + Scar Repair Care Bundle - S",
    component_sku: "22018",
    component_name: "SRC Scar Repair Care Silicone Sheets - 6 Pack",
    component_qty: 1,
  },
  {
    bundle_sku: "22367",
    bundle_name: "SRC C-Section Recovery Shorts + Scar Repair Care Bundle - M",
    component_sku: "22014",
    component_name: "SRC C-Section Recovery Shorts - M",
    component_qty: 1,
  },
  {
    bundle_sku: "22367",
    bundle_name: "SRC C-Section Recovery Shorts + Scar Repair Care Bundle - M",
    component_sku: "22018",
    component_name: "SRC Scar Repair Care Silicone Sheets - 6 Pack",
    component_qty: 1,
  },
  {
    bundle_sku: "22368",
    bundle_name: "SRC C-Section Recovery Shorts + Scar Repair Care Bundle - L",
    component_sku: "22015",
    component_name: "SRC C-Section Recovery Shorts - L",
    component_qty: 1,
  },
  {
    bundle_sku: "22368",
    bundle_name: "SRC C-Section Recovery Shorts + Scar Repair Care Bundle - L",
    component_sku: "22018",
    component_name: "SRC Scar Repair Care Silicone Sheets - 6 Pack",
    component_qty: 1,
  },
  {
    bundle_sku: "22369",
    bundle_name: "SRC C-Section Recovery Shorts + Scar Repair Care Bundle - XL",
    component_sku: "22016",
    component_name: "SRC C-Section Recovery Shorts - XL",
    component_qty: 1,
  },
  {
    bundle_sku: "22369",
    bundle_name: "SRC C-Section Recovery Shorts + Scar Repair Care Bundle - XL",
    component_sku: "22018",
    component_name: "SRC Scar Repair Care Silicone Sheets - 6 Pack",
    component_qty: 1,
  },
  {
    bundle_sku: "22370",
    bundle_name:
      "SRC C-Section Recovery Shorts + Scar Repair Care Bundle - XXL",
    component_sku: "22017",
    component_name: "SRC C-Section Recovery Shorts - XXL",
    component_qty: 1,
  },
  {
    bundle_sku: "22370",
    bundle_name:
      "SRC C-Section Recovery Shorts + Scar Repair Care Bundle - XXL",
    component_sku: "22018",
    component_name: "SRC Scar Repair Care Silicone Sheets - 6 Pack",
    component_qty: 1,
  },
  {
    bundle_sku: "22371",
    bundle_name:
      "SRC C-Section Recovery Leggings + Scar Repair Care Bundle - XXS",
    component_sku: "22018",
    component_name: "SRC Scar Repair Care Silicone Sheets - 6 Pack",
    component_qty: 1,
  },
  {
    bundle_sku: "22371",
    bundle_name:
      "SRC C-Section Recovery Leggings + Scar Repair Care Bundle - XXS",
    component_sku: "22269",
    component_name: "SRC C-Section Recovery Leggings - XXS",
    component_qty: 1,
  },
  {
    bundle_sku: "22372",
    bundle_name:
      "SRC C-Section Recovery Leggings + Scar Repair Care Bundle - XS",
    component_sku: "22018",
    component_name: "SRC Scar Repair Care Silicone Sheets - 6 Pack",
    component_qty: 1,
  },
  {
    bundle_sku: "22372",
    bundle_name:
      "SRC C-Section Recovery Leggings + Scar Repair Care Bundle - XS",
    component_sku: "22270",
    component_name: "SRC C-Section Recovery Leggings - XS",
    component_qty: 1,
  },
  {
    bundle_sku: "22373",
    bundle_name:
      "SRC C-Section Recovery Leggings + Scar Repair Care Bundle - S",
    component_sku: "22018",
    component_name: "SRC Scar Repair Care Silicone Sheets - 6 Pack",
    component_qty: 1,
  },
  {
    bundle_sku: "22373",
    bundle_name:
      "SRC C-Section Recovery Leggings + Scar Repair Care Bundle - S",
    component_sku: "22271",
    component_name: "SRC C-Section Recovery Leggings - S",
    component_qty: 1,
  },
  {
    bundle_sku: "22374",
    bundle_name:
      "SRC C-Section Recovery Leggings + Scar Repair Care Bundle - M",
    component_sku: "22018",
    component_name: "SRC Scar Repair Care Silicone Sheets - 6 Pack",
    component_qty: 1,
  },
  {
    bundle_sku: "22374",
    bundle_name:
      "SRC C-Section Recovery Leggings + Scar Repair Care Bundle - M",
    component_sku: "22272",
    component_name: "SRC C-Section Recovery Leggings - M",
    component_qty: 1,
  },
  {
    bundle_sku: "22375",
    bundle_name:
      "SRC C-Section Recovery Leggings + Scar Repair Care Bundle - L",
    component_sku: "22018",
    component_name: "SRC Scar Repair Care Silicone Sheets - 6 Pack",
    component_qty: 1,
  },
  {
    bundle_sku: "22375",
    bundle_name:
      "SRC C-Section Recovery Leggings + Scar Repair Care Bundle - L",
    component_sku: "22273",
    component_name: "SRC C-Section Recovery Leggings - L",
    component_qty: 1,
  },
  {
    bundle_sku: "22376",
    bundle_name:
      "SRC C-Section Recovery Leggings + Scar Repair Care Bundle - XL",
    component_sku: "22018",
    component_name: "SRC Scar Repair Care Silicone Sheets - 6 Pack",
    component_qty: 1,
  },
  {
    bundle_sku: "22376",
    bundle_name:
      "SRC C-Section Recovery Leggings + Scar Repair Care Bundle - XL",
    component_sku: "22274",
    component_name: "SRC C-Section Recovery Leggings - XL",
    component_qty: 1,
  },
  {
    bundle_sku: "22377",
    bundle_name:
      "SRC C-Section Recovery Leggings + Scar Repair Care Bundle - XXL",
    component_sku: "22018",
    component_name: "SRC Scar Repair Care Silicone Sheets - 6 Pack",
    component_qty: 1,
  },
  {
    bundle_sku: "22377",
    bundle_name:
      "SRC C-Section Recovery Leggings + Scar Repair Care Bundle - XXL",
    component_sku: "22275",
    component_name: "SRC C-Section Recovery Leggings - XXL",
    component_qty: 1,
  },
  {
    bundle_sku: "22378",
    bundle_name:
      "SRC Restore Prolapse & Continence Support Mini Shorts 2 Pack - Black & Champagne - XXS",
    component_sku: "21990",
    component_name:
      "SRC Restore Prolapse & Continence Support Mini Shorts- XXS Black",
    component_qty: 1,
  },
  {
    bundle_sku: "22378",
    bundle_name:
      "SRC Restore Prolapse & Continence Support Mini Shorts 2 Pack - Black & Champagne - XXS",
    component_sku: "21997",
    component_name:
      "SRC Restore Prolapse & Continence Support Mini Shorts- XXS Champagne",
    component_qty: 1,
  },
  {
    bundle_sku: "22379",
    bundle_name:
      "SRC Restore Prolapse & Continence Support Mini Shorts 2 Pack - Black & Champagne - XS",
    component_sku: "21991",
    component_name:
      "SRC Restore Prolapse & Continence Support Mini Shorts- XS Black",
    component_qty: 1,
  },
  {
    bundle_sku: "22379",
    bundle_name:
      "SRC Restore Prolapse & Continence Support Mini Shorts 2 Pack - Black & Champagne - XS",
    component_sku: "21998",
    component_name:
      "SRC Restore Prolapse & Continence Support Mini Shorts- XS Champagne",
    component_qty: 1,
  },
  {
    bundle_sku: "22380",
    bundle_name:
      "SRC Restore Prolapse & Continence Support Mini Shorts 2 Pack - Black & Champagne - S",
    component_sku: "21992",
    component_name:
      "SRC Restore Prolapse & Continence Support Mini Shorts- S Black",
    component_qty: 1,
  },
  {
    bundle_sku: "22380",
    bundle_name:
      "SRC Restore Prolapse & Continence Support Mini Shorts 2 Pack - Black & Champagne - S",
    component_sku: "21999",
    component_name:
      "SRC Restore Prolapse & Continence Support Mini Shorts- S Champagne",
    component_qty: 1,
  },
  {
    bundle_sku: "22381",
    bundle_name:
      "SRC Restore Prolapse & Continence Support Mini Shorts 2 Pack - Black & Champagne - M",
    component_sku: "21993",
    component_name:
      "SRC Restore Prolapse & Continence Support Mini Shorts- M Black",
    component_qty: 1,
  },
  {
    bundle_sku: "22381",
    bundle_name:
      "SRC Restore Prolapse & Continence Support Mini Shorts 2 Pack - Black & Champagne - M",
    component_sku: "22000",
    component_name:
      "SRC Restore Prolapse & Continence Support Mini Shorts- M Champagne",
    component_qty: 1,
  },
  {
    bundle_sku: "22382",
    bundle_name:
      "SRC Restore Prolapse & Continence Support Mini Shorts 2 Pack - Black & Champagne - L",
    component_sku: "21994",
    component_name:
      "SRC Restore Prolapse & Continence Support Mini Shorts- L Black",
    component_qty: 1,
  },
  {
    bundle_sku: "22382",
    bundle_name:
      "SRC Restore Prolapse & Continence Support Mini Shorts 2 Pack - Black & Champagne - L",
    component_sku: "22001",
    component_name:
      "SRC Restore Prolapse & Continence Support Mini Shorts- L Champagne",
    component_qty: 1,
  },
  {
    bundle_sku: "22383",
    bundle_name:
      "SRC Restore Prolapse & Continence Support Mini Shorts 2 Pack - Black & Champagne- XL",
    component_sku: "21995",
    component_name:
      "SRC Restore Prolapse & Continence Support Mini Shorts- XL Black",
    component_qty: 1,
  },
  {
    bundle_sku: "22383",
    bundle_name:
      "SRC Restore Prolapse & Continence Support Mini Shorts 2 Pack - Black & Champagne- XL",
    component_sku: "22002",
    component_name:
      "SRC Restore Prolapse & Continence Support Mini Shorts- XL Champagne",
    component_qty: 1,
  },
  {
    bundle_sku: "22384",
    bundle_name:
      "SRC Restore Prolapse & Continence Support Mini Shorts 2 Pack - Black & Champagne - XXL",
    component_sku: "21996",
    component_name:
      "SRC Restore Prolapse & Continence Support Mini Shorts- XXL Black",
    component_qty: 1,
  },
  {
    bundle_sku: "22384",
    bundle_name:
      "SRC Restore Prolapse & Continence Support Mini Shorts 2 Pack - Black & Champagne - XXL",
    component_sku: "22003",
    component_name:
      "SRC Restore Prolapse & Continence Support Mini Shorts- XXL Champagne",
    component_qty: 1,
  },
  {
    bundle_sku: "22385",
    bundle_name:
      "SRC Restore Prolapse & Continence Support Leggings & Mini Shorts Bundle - Black XXS",
    component_sku: "21990",
    component_name:
      "SRC Restore Prolapse & Continence Support Mini Shorts- XXS Black",
    component_qty: 1,
  },
  {
    bundle_sku: "22385",
    bundle_name:
      "SRC Restore Prolapse & Continence Support Leggings & Mini Shorts Bundle - Black XXS",
    component_sku: "22248",
    component_name:
      "SRC Restore Leggings For Prolapse & Continence Treatment - Black XXS",
    component_qty: 1,
  },
  {
    bundle_sku: "22386",
    bundle_name:
      "SRC Restore Prolapse & Continence Support Leggings & Mini Shorts Bundle - Black XS",
    component_sku: "21991",
    component_name:
      "SRC Restore Prolapse & Continence Support Mini Shorts- XS Black",
    component_qty: 1,
  },
  {
    bundle_sku: "22386",
    bundle_name:
      "SRC Restore Prolapse & Continence Support Leggings & Mini Shorts Bundle - Black XS",
    component_sku: "22249",
    component_name:
      "SRC Restore Leggings For Prolapse & Continence Treatment - Black XS",
    component_qty: 1,
  },
  {
    bundle_sku: "22387",
    bundle_name:
      "SRC Restore Prolapse & Continence Support Leggings & Mini Shorts Bundle - Black S",
    component_sku: "21992",
    component_name:
      "SRC Restore Prolapse & Continence Support Mini Shorts- S Black",
    component_qty: 1,
  },
  {
    bundle_sku: "22387",
    bundle_name:
      "SRC Restore Prolapse & Continence Support Leggings & Mini Shorts Bundle - Black S",
    component_sku: "22250",
    component_name:
      "SRC Restore Leggings For Prolapse & Continence Treatment - Black S",
    component_qty: 1,
  },
  {
    bundle_sku: "22388",
    bundle_name:
      "SRC Restore Prolapse & Continence Support Leggings & Mini Shorts Bundle - Black M",
    component_sku: "21993",
    component_name:
      "SRC Restore Prolapse & Continence Support Mini Shorts- M Black",
    component_qty: 1,
  },
  {
    bundle_sku: "22388",
    bundle_name:
      "SRC Restore Prolapse & Continence Support Leggings & Mini Shorts Bundle - Black M",
    component_sku: "22251",
    component_name:
      "SRC Restore Leggings For Prolapse & Continence Treatment - Black M",
    component_qty: 1,
  },
  {
    bundle_sku: "22389",
    bundle_name:
      "SRC Restore Prolapse & Continence Support Leggings & Mini Shorts Bundle - Black L",
    component_sku: "21994",
    component_name:
      "SRC Restore Prolapse & Continence Support Mini Shorts- L Black",
    component_qty: 1,
  },
  {
    bundle_sku: "22389",
    bundle_name:
      "SRC Restore Prolapse & Continence Support Leggings & Mini Shorts Bundle - Black L",
    component_sku: "22252",
    component_name:
      "SRC Restore Leggings For Prolapse & Continence Treatment - Black L",
    component_qty: 1,
  },
  {
    bundle_sku: "22390",
    bundle_name:
      "SRC Restore Prolapse & Continence Support Leggings & Mini Shorts Bundle - Black XL",
    component_sku: "21995",
    component_name:
      "SRC Restore Prolapse & Continence Support Mini Shorts- XL Black",
    component_qty: 1,
  },
  {
    bundle_sku: "22390",
    bundle_name:
      "SRC Restore Prolapse & Continence Support Leggings & Mini Shorts Bundle - Black XL",
    component_sku: "22253",
    component_name:
      "SRC Restore Leggings For Prolapse & Continence Treatment - Black XL",
    component_qty: 1,
  },
  {
    bundle_sku: "22391",
    bundle_name:
      "SRC Restore Prolapse & Continence Support Leggings & Mini Shorts Bundle - Black XXL",
    component_sku: "21996",
    component_name:
      "SRC Restore Prolapse & Continence Support Mini Shorts- XXL Black",
    component_qty: 1,
  },
  {
    bundle_sku: "22391",
    bundle_name:
      "SRC Restore Prolapse & Continence Support Leggings & Mini Shorts Bundle - Black XXL",
    component_sku: "22254",
    component_name:
      "SRC Restore Leggings For Prolapse & Continence Treatment - Black XXL",
    component_qty: 1,
  },
  {
    bundle_sku: "22425",
    bundle_name: "Sabrina Carpenter Body Mist Collection Bundle",
    component_sku: "20789",
    component_name: "Sabrina Carpenter Sweet Tooth Body Mist 236ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22425",
    bundle_name: "Sabrina Carpenter Body Mist Collection Bundle",
    component_sku: "20792",
    component_name: "Sabrina Carpenter Caramel Dreams Body Mist 236ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22425",
    bundle_name: "Sabrina Carpenter Body Mist Collection Bundle",
    component_sku: "20795",
    component_name: "Sabrina Carpenter Cherry Baby Body Mist 236ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22425",
    bundle_name: "Sabrina Carpenter Body Mist Collection Bundle",
    component_sku: "22319",
    component_name: "Sabrina Carpenter Me Espresso 236ml Body Mist",
    component_qty: 1,
  },
  {
    bundle_sku: "22426",
    bundle_name:
      "Sabrina Carpenter Caramel Dreams Eau De Parfum 30ml & Body Mist Duo",
    component_sku: "20790",
    component_name: "Sabrina Carpenter Caramel Dreams Eau De Parfum 30ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22426",
    bundle_name:
      "Sabrina Carpenter Caramel Dreams Eau De Parfum 30ml & Body Mist Duo",
    component_sku: "20792",
    component_name: "Sabrina Carpenter Caramel Dreams Body Mist 236ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22427",
    bundle_name:
      "Sabrina Carpenter Cherry Baby Eau De Parfum 30ml & Body Mist Duo",
    component_sku: "20794",
    component_name: "Sabrina Carpenter Cherry Baby Eau De Parfum 30ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22427",
    bundle_name:
      "Sabrina Carpenter Cherry Baby Eau De Parfum 30ml & Body Mist Duo",
    component_sku: "20795",
    component_name: "Sabrina Carpenter Cherry Baby Body Mist 236ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22428",
    bundle_name:
      "Sabrina Carpenter Sweet Tooth Eau De Parfum 30ml & Body Mist Duo",
    component_sku: "20788",
    component_name: "Sabrina Carpenter Sweet Tooth Eau De Parfum 30ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22428",
    bundle_name:
      "Sabrina Carpenter Sweet Tooth Eau De Parfum 30ml & Body Mist Duo",
    component_sku: "20789",
    component_name: "Sabrina Carpenter Sweet Tooth Body Mist 236ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22429",
    bundle_name:
      "Sabrina Carpenter Me Espresso Eau De Parfum 30ml & Body Mist Duo",
    component_sku: "22317",
    component_name: "Sabrina Carpenter Me Espresso 30ml Eau De Parfum",
    component_qty: 1,
  },
  {
    bundle_sku: "22429",
    bundle_name:
      "Sabrina Carpenter Me Espresso Eau De Parfum 30ml & Body Mist Duo",
    component_sku: "22319",
    component_name: "Sabrina Carpenter Me Espresso 236ml Body Mist",
    component_qty: 1,
  },
  {
    bundle_sku: "22430",
    bundle_name: "Sabrina Carpenter Cherry Baby & Sweet Tooth Body Mist Duo",
    component_sku: "20789",
    component_name: "Sabrina Carpenter Sweet Tooth Body Mist 236ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22430",
    bundle_name: "Sabrina Carpenter Cherry Baby & Sweet Tooth Body Mist Duo",
    component_sku: "20795",
    component_name: "Sabrina Carpenter Cherry Baby Body Mist 236ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22431",
    bundle_name:
      "Alfaparf Semi Di Lino Styling Thermal Protector 300ml & Texture Dry Shampoo 300ml Duo",
    component_sku: "20722",
    component_name: "Alfaparf Semi Di Lino Styling Texture Dry Shampoo 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22431",
    bundle_name:
      "Alfaparf Semi Di Lino Styling Thermal Protector 300ml & Texture Dry Shampoo 300ml Duo",
    component_sku: "20764",
    component_name: "Alfaparf Semi Di Lino Styling Thermal Protector 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22438",
    bundle_name: "Nioxin System 1 Shampoo & Conditioner Bundle",
    component_sku: "100108",
    component_name: "Nioxin Cleanser 1 - 300ml (Shampoo)",
    component_qty: 1,
  },
  {
    bundle_sku: "22438",
    bundle_name: "Nioxin System 1 Shampoo & Conditioner Bundle",
    component_sku: "100109",
    component_name: "Nioxin Scalp Revitaliser 1 - 300ml (Conditioner)",
    component_qty: 1,
  },
  {
    bundle_sku: "22439",
    bundle_name: "Nioxin System 2 Shampoo & Conditioner Bundle",
    component_sku: "100111",
    component_name: "Nioxin Cleanser 2 - 300ml (Shampoo)",
    component_qty: 1,
  },
  {
    bundle_sku: "22439",
    bundle_name: "Nioxin System 2 Shampoo & Conditioner Bundle",
    component_sku: "100112",
    component_name: "Nioxin Scalp Revitaliser 2 - 300ml (Conditioner)",
    component_qty: 1,
  },
  {
    bundle_sku: "22440",
    bundle_name: "Nioxin System 3 Shampoo & Conditioner Bundle",
    component_sku: "100114",
    component_name: "Nioxin Cleanser 3 - 300ml (Shampoo)",
    component_qty: 1,
  },
  {
    bundle_sku: "22440",
    bundle_name: "Nioxin System 3 Shampoo & Conditioner Bundle",
    component_sku: "100115",
    component_name: "Nioxin Scalp Revitaliser 3 - 300ml (Conditioner)",
    component_qty: 1,
  },
  {
    bundle_sku: "22441",
    bundle_name: "Nioxin System 4 Shampoo & Conditioner Bundle",
    component_sku: "100117",
    component_name: "Nioxin Cleanser 4 - 300ml (Shampoo)",
    component_qty: 1,
  },
  {
    bundle_sku: "22441",
    bundle_name: "Nioxin System 4 Shampoo & Conditioner Bundle",
    component_sku: "100118",
    component_name: "Nioxin Scalp Revitaliser 4 - 300ml (Conditioner)",
    component_qty: 1,
  },
  {
    bundle_sku: "22442",
    bundle_name: "Nioxin Scalp Recovery Shampoo & Conditioner Bundle",
    component_sku: "7807",
    component_name: "Nioxin Scalp Recovery Purifying Cleanser Shampoo 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22442",
    bundle_name: "Nioxin Scalp Recovery Shampoo & Conditioner Bundle",
    component_sku: "7808",
    component_name: "Nioxin Scalp Recovery Moisturising Conditioner 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22443",
    bundle_name:
      "Nioxin System 1 Shampoo, Conditioner & Anti-Breakage Strengthening Mask Bundle",
    component_sku: "100106",
    component_name: "Nioxin - Deep Repair Hair Masque - 150ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22443",
    bundle_name:
      "Nioxin System 1 Shampoo, Conditioner & Anti-Breakage Strengthening Mask Bundle",
    component_sku: "100108",
    component_name: "Nioxin Cleanser 1 - 300ml (Shampoo)",
    component_qty: 1,
  },
  {
    bundle_sku: "22443",
    bundle_name:
      "Nioxin System 1 Shampoo, Conditioner & Anti-Breakage Strengthening Mask Bundle",
    component_sku: "100109",
    component_name: "Nioxin Scalp Revitaliser 1 - 300ml (Conditioner)",
    component_qty: 1,
  },
  {
    bundle_sku: "22444",
    bundle_name:
      "Nioxin System 2 Shampoo, Conditioner & Anti-Breakage Strengthening Mask Bundle",
    component_sku: "100106",
    component_name: "Nioxin - Deep Repair Hair Masque - 150ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22444",
    bundle_name:
      "Nioxin System 2 Shampoo, Conditioner & Anti-Breakage Strengthening Mask Bundle",
    component_sku: "100111",
    component_name: "Nioxin Cleanser 2 - 300ml (Shampoo)",
    component_qty: 1,
  },
  {
    bundle_sku: "22444",
    bundle_name:
      "Nioxin System 2 Shampoo, Conditioner & Anti-Breakage Strengthening Mask Bundle",
    component_sku: "100112",
    component_name: "Nioxin Scalp Revitaliser 2 - 300ml (Conditioner)",
    component_qty: 1,
  },
  {
    bundle_sku: "22445",
    bundle_name:
      "Nioxin System 3 Shampoo, Conditioner & Anti-Breakage Strengthening Mask Bundle",
    component_sku: "100106",
    component_name: "Nioxin - Deep Repair Hair Masque - 150ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22445",
    bundle_name:
      "Nioxin System 3 Shampoo, Conditioner & Anti-Breakage Strengthening Mask Bundle",
    component_sku: "100114",
    component_name: "Nioxin Cleanser 3 - 300ml (Shampoo)",
    component_qty: 1,
  },
  {
    bundle_sku: "22445",
    bundle_name:
      "Nioxin System 3 Shampoo, Conditioner & Anti-Breakage Strengthening Mask Bundle",
    component_sku: "100115",
    component_name: "Nioxin Scalp Revitaliser 3 - 300ml (Conditioner)",
    component_qty: 1,
  },
  {
    bundle_sku: "22446",
    bundle_name:
      "Nioxin System 4 Shampoo, Conditioner & Anti-Breakage Strengthening Mask Bundle",
    component_sku: "100106",
    component_name: "Nioxin - Deep Repair Hair Masque - 150ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22446",
    bundle_name:
      "Nioxin System 4 Shampoo, Conditioner & Anti-Breakage Strengthening Mask Bundle",
    component_sku: "100117",
    component_name: "Nioxin Cleanser 4 - 300ml (Shampoo)",
    component_qty: 1,
  },
  {
    bundle_sku: "22446",
    bundle_name:
      "Nioxin System 4 Shampoo, Conditioner & Anti-Breakage Strengthening Mask Bundle",
    component_sku: "100118",
    component_name: "Nioxin Scalp Revitaliser 4 - 300ml (Conditioner)",
    component_qty: 1,
  },
  {
    bundle_sku: "22487",
    bundle_name:
      "Alfaparf Semi Di Lino Moisture Nutritive Shampoo, Conditioner & FREE BeautyFeatures Vanity Case - Pink",
    component_sku: "22350",
    component_name: "BeautyFeatures Pink Vanity Bag",
    component_qty: 1,
  },
  {
    bundle_sku: "22487",
    bundle_name:
      "Alfaparf Semi Di Lino Moisture Nutritive Shampoo, Conditioner & FREE BeautyFeatures Vanity Case - Pink",
    component_sku: "6469",
    component_name: "Alfaparf Semi Di Lino Moisture Nutritive Shampoo 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22487",
    bundle_name:
      "Alfaparf Semi Di Lino Moisture Nutritive Shampoo, Conditioner & FREE BeautyFeatures Vanity Case - Pink",
    component_sku: "6471",
    component_name:
      "Alfaparf Semi Di Lino Moisture Nutritive Leave-In Conditioner 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22488",
    bundle_name:
      "Alfaparf Semi Di Lino Moisture Shampoo, Conditioner & FREE BeautyFeatures Vanity Case - Black",
    component_sku: "22351",
    component_name: "BeautyFeatures Black Vanity Bag",
    component_qty: 1,
  },
  {
    bundle_sku: "22488",
    bundle_name:
      "Alfaparf Semi Di Lino Moisture Shampoo, Conditioner & FREE BeautyFeatures Vanity Case - Black",
    component_sku: "6469",
    component_name: "Alfaparf Semi Di Lino Moisture Nutritive Shampoo 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22488",
    bundle_name:
      "Alfaparf Semi Di Lino Moisture Shampoo, Conditioner & FREE BeautyFeatures Vanity Case - Black",
    component_sku: "6471",
    component_name:
      "Alfaparf Semi Di Lino Moisture Nutritive Leave-In Conditioner 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22489",
    bundle_name: "K-Beauty Bestsellers & FREE BeautyFeatures Vanity Case",
    component_sku: "14403",
    component_name: "COSRX Advanced Snail 96 Mucin Power Essence",
    component_qty: 1,
  },
  {
    bundle_sku: "22489",
    bundle_name: "K-Beauty Bestsellers & FREE BeautyFeatures Vanity Case",
    component_sku: "20517",
    component_name:
      "BeautyFeatures Resuable Bamboo Fibre Cleansing Mitts - 2 Pack",
    component_qty: 1,
  },
  {
    bundle_sku: "22489",
    bundle_name: "K-Beauty Bestsellers & FREE BeautyFeatures Vanity Case",
    component_sku: "21591",
    component_name: "Beauty of Joseon Revive Eye Serum Ginseng + Retinal 30ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22489",
    bundle_name: "K-Beauty Bestsellers & FREE BeautyFeatures Vanity Case",
    component_sku: "21652",
    component_name:
      "Beauty of Joseon Relief Sun Rice + Probiotics SP50+ PA ++++ 50ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22489",
    bundle_name: "K-Beauty Bestsellers & FREE BeautyFeatures Vanity Case",
    component_sku: "21669",
    component_name: "Medicube Zero Pore Pad 155g - 70 Pack",
    component_qty: 1,
  },
  {
    bundle_sku: "22489",
    bundle_name: "K-Beauty Bestsellers & FREE BeautyFeatures Vanity Case",
    component_sku: "21670",
    component_name: "Medicube Collagen Night Wrapping Mask 75ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22489",
    bundle_name: "K-Beauty Bestsellers & FREE BeautyFeatures Vanity Case",
    component_sku: "21681",
    component_name: "LANEIGE Lip Sleeping Mask - Berry 20g",
    component_qty: 1,
  },
  {
    bundle_sku: "22489",
    bundle_name: "K-Beauty Bestsellers & FREE BeautyFeatures Vanity Case",
    component_sku: "22350",
    component_name: "BeautyFeatures Pink Vanity Bag",
    component_qty: 1,
  },
  {
    bundle_sku: "22491",
    bundle_name:
      "The Ultimate Self Care Bundle With FREE BeautyFeatures Vanity Bag",
    component_sku: "20517",
    component_name:
      "BeautyFeatures Resuable Bamboo Fibre Cleansing Mitts - 2 Pack",
    component_qty: 1,
  },
  {
    bundle_sku: "22491",
    bundle_name:
      "The Ultimate Self Care Bundle With FREE BeautyFeatures Vanity Bag",
    component_sku: "20518",
    component_name: "BeautyFeatures Silk Heatless Curler",
    component_qty: 1,
  },
  {
    bundle_sku: "22491",
    bundle_name:
      "The Ultimate Self Care Bundle With FREE BeautyFeatures Vanity Bag",
    component_sku: "20519",
    component_name: "BeautyFeatures Microfibre Hair Towel",
    component_qty: 1,
  },
  {
    bundle_sku: "22491",
    bundle_name:
      "The Ultimate Self Care Bundle With FREE BeautyFeatures Vanity Bag",
    component_sku: "20520",
    component_name: "BeautyFeatures Detangling Hairbrush",
    component_qty: 1,
  },
  {
    bundle_sku: "22491",
    bundle_name:
      "The Ultimate Self Care Bundle With FREE BeautyFeatures Vanity Bag",
    component_sku: "22350",
    component_name: "BeautyFeatures Pink Vanity Bag",
    component_qty: 1,
  },
  {
    bundle_sku: "22492",
    bundle_name: "The Reset Ritual Bundle With FREE BeautyFeatures Vanity Case",
    component_sku: "14032",
    component_name: "Premium Makeup Blending Sponge By BeautyFeatures 1PK",
    component_qty: 1,
  },
  {
    bundle_sku: "22492",
    bundle_name: "The Reset Ritual Bundle With FREE BeautyFeatures Vanity Case",
    component_sku: "20516",
    component_name:
      "BeautyFeatures Reusable Premium Cleansing Pads with Cuffs - 3 Pack",
    component_qty: 1,
  },
  {
    bundle_sku: "22492",
    bundle_name: "The Reset Ritual Bundle With FREE BeautyFeatures Vanity Case",
    component_sku: "20517",
    component_name:
      "BeautyFeatures Resuable Bamboo Fibre Cleansing Mitts - 2 Pack",
    component_qty: 1,
  },
  {
    bundle_sku: "22492",
    bundle_name: "The Reset Ritual Bundle With FREE BeautyFeatures Vanity Case",
    component_sku: "20518",
    component_name: "BeautyFeatures Silk Heatless Curler",
    component_qty: 1,
  },
  {
    bundle_sku: "22492",
    bundle_name: "The Reset Ritual Bundle With FREE BeautyFeatures Vanity Case",
    component_sku: "20519",
    component_name: "BeautyFeatures Microfibre Hair Towel",
    component_qty: 1,
  },
  {
    bundle_sku: "22492",
    bundle_name: "The Reset Ritual Bundle With FREE BeautyFeatures Vanity Case",
    component_sku: "20520",
    component_name: "BeautyFeatures Detangling Hairbrush",
    component_qty: 1,
  },
  {
    bundle_sku: "22492",
    bundle_name: "The Reset Ritual Bundle With FREE BeautyFeatures Vanity Case",
    component_sku: "20521",
    component_name: "BeautyFeatures Vent Hairbrush with Nylon & Boar Bristles",
    component_qty: 1,
  },
  {
    bundle_sku: "22492",
    bundle_name: "The Reset Ritual Bundle With FREE BeautyFeatures Vanity Case",
    component_sku: "22351",
    component_name: "BeautyFeatures Black Vanity Bag",
    component_qty: 1,
  },
  {
    bundle_sku: "22493",
    bundle_name:
      "L'Oreal Professionnel Metal Detox Bundle With FREE BeautyFeatures Vanity Case & Mini Shampoo",
    component_sku: "11351",
    component_name:
      "Loreal Professionnel Metal Detox Anti-Metal Cleansing Cream Shampoo 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22493",
    bundle_name:
      "L'Oreal Professionnel Metal Detox Bundle With FREE BeautyFeatures Vanity Case & Mini Shampoo",
    component_sku: "11352",
    component_name:
      "Loreal Professionnel Metal Detox Anti-Deposit Protector Mask 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22493",
    bundle_name:
      "L'Oreal Professionnel Metal Detox Bundle With FREE BeautyFeatures Vanity Case & Mini Shampoo",
    component_sku: "22350",
    component_name: "BeautyFeatures Pink Vanity Bag",
    component_qty: 1,
  },
  {
    bundle_sku: "22494",
    bundle_name:
      "Redken Acidic Bonding Concentrate Bundle With FREE BeautyFeatures Vanity Case & Minis",
    component_sku: "12153",
    component_name: "Redken Acidic Bonding Concentrate Shampoo 50ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22494",
    bundle_name:
      "Redken Acidic Bonding Concentrate Bundle With FREE BeautyFeatures Vanity Case & Minis",
    component_sku: "22351",
    component_name: "BeautyFeatures Black Vanity Bag",
    component_qty: 1,
  },
  {
    bundle_sku: "22494",
    bundle_name:
      "Redken Acidic Bonding Concentrate Bundle With FREE BeautyFeatures Vanity Case & Minis",
    component_sku: "9762",
    component_name: "Redken Acidic Bonding Concentrate Shampoo 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22494",
    bundle_name:
      "Redken Acidic Bonding Concentrate Bundle With FREE BeautyFeatures Vanity Case & Minis",
    component_sku: "9763",
    component_name: "Redken Acidic Bonding Concentrate Conditioner 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22495",
    bundle_name:
      "Matrix Food For Soft Bundle With FREE BeautyFeatures Vanity Case & Minis",
    component_sku: "21373",
    component_name: "Matrix Food For Soft Hydrating Shampoo 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22495",
    bundle_name:
      "Matrix Food For Soft Bundle With FREE BeautyFeatures Vanity Case & Minis",
    component_sku: "21381",
    component_name: "Matrix Food For Soft Detangling Conditioner 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22495",
    bundle_name:
      "Matrix Food For Soft Bundle With FREE BeautyFeatures Vanity Case & Minis",
    component_sku: "21821",
    component_name: "Matrix Food For Soft Shampoo 75ml GWP",
    component_qty: 1,
  },
  {
    bundle_sku: "22495",
    bundle_name:
      "Matrix Food For Soft Bundle With FREE BeautyFeatures Vanity Case & Minis",
    component_sku: "21822",
    component_name: "Matrix Food For Soft Conditioner 50ml GWP",
    component_qty: 1,
  },
  {
    bundle_sku: "22495",
    bundle_name:
      "Matrix Food For Soft Bundle With FREE BeautyFeatures Vanity Case & Minis",
    component_sku: "22350",
    component_name: "BeautyFeatures Pink Vanity Bag",
    component_qty: 1,
  },
  {
    bundle_sku: "22496",
    bundle_name:
      "Sabrina Carpenter - The Fragrance Collection With FREE BeautyFeatures Vanity Case",
    component_sku: "20788",
    component_name: "Sabrina Carpenter Sweet Tooth Eau De Parfum 30ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22496",
    bundle_name:
      "Sabrina Carpenter - The Fragrance Collection With FREE BeautyFeatures Vanity Case",
    component_sku: "20790",
    component_name: "Sabrina Carpenter Caramel Dreams Eau De Parfum 30ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22496",
    bundle_name:
      "Sabrina Carpenter - The Fragrance Collection With FREE BeautyFeatures Vanity Case",
    component_sku: "20794",
    component_name: "Sabrina Carpenter Cherry Baby Eau De Parfum 30ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22496",
    bundle_name:
      "Sabrina Carpenter - The Fragrance Collection With FREE BeautyFeatures Vanity Case",
    component_sku: "22317",
    component_name: "Sabrina Carpenter Me Espresso 30ml Eau De Parfum",
    component_qty: 1,
  },
  {
    bundle_sku: "22496",
    bundle_name:
      "Sabrina Carpenter - The Fragrance Collection With FREE BeautyFeatures Vanity Case",
    component_sku: "22350",
    component_name: "BeautyFeatures Pink Vanity Bag",
    component_qty: 1,
  },
  {
    bundle_sku: "22497",
    bundle_name:
      "Sabrina Carpenter - Body Mist Bundle With FREE BeautyFeatures Vanity Case",
    component_sku: "20789",
    component_name: "Sabrina Carpenter Sweet Tooth Body Mist 236ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22497",
    bundle_name:
      "Sabrina Carpenter - Body Mist Bundle With FREE BeautyFeatures Vanity Case",
    component_sku: "20792",
    component_name: "Sabrina Carpenter Caramel Dreams Body Mist 236ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22497",
    bundle_name:
      "Sabrina Carpenter - Body Mist Bundle With FREE BeautyFeatures Vanity Case",
    component_sku: "20795",
    component_name: "Sabrina Carpenter Cherry Baby Body Mist 236ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22497",
    bundle_name:
      "Sabrina Carpenter - Body Mist Bundle With FREE BeautyFeatures Vanity Case",
    component_sku: "22319",
    component_name: "Sabrina Carpenter Me Espresso 236ml Body Mist",
    component_qty: 1,
  },
  {
    bundle_sku: "22497",
    bundle_name:
      "Sabrina Carpenter - Body Mist Bundle With FREE BeautyFeatures Vanity Case",
    component_sku: "22350",
    component_name: "BeautyFeatures Pink Vanity Bag",
    component_qty: 1,
  },
  {
    bundle_sku: "22498",
    bundle_name:
      "The Forever Friend Collection with FREE BeautyFeatures Vanity Case",
    component_sku: "12266",
    component_name: "Kerastase Genesis Bain Deluxe 30ml​ GWP",
    component_qty: 1,
  },
  {
    bundle_sku: "22498",
    bundle_name:
      "The Forever Friend Collection with FREE BeautyFeatures Vanity Case",
    component_sku: "20517",
    component_name:
      "BeautyFeatures Resuable Bamboo Fibre Cleansing Mitts - 2 Pack",
    component_qty: 1,
  },
  {
    bundle_sku: "22498",
    bundle_name:
      "The Forever Friend Collection with FREE BeautyFeatures Vanity Case",
    component_sku: "21652",
    component_name:
      "Beauty of Joseon Relief Sun Rice + Probiotics SP50+ PA ++++ 50ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22498",
    bundle_name:
      "The Forever Friend Collection with FREE BeautyFeatures Vanity Case",
    component_sku: "21821",
    component_name: "Matrix Food For Soft Shampoo 75ml GWP",
    component_qty: 1,
  },
  {
    bundle_sku: "22498",
    bundle_name:
      "The Forever Friend Collection with FREE BeautyFeatures Vanity Case",
    component_sku: "21822",
    component_name: "Matrix Food For Soft Conditioner 50ml GWP",
    component_qty: 1,
  },
  {
    bundle_sku: "22498",
    bundle_name:
      "The Forever Friend Collection with FREE BeautyFeatures Vanity Case",
    component_sku: "22351",
    component_name: "BeautyFeatures Black Vanity Bag",
    component_qty: 1,
  },
  {
    bundle_sku: "22499",
    bundle_name:
      "The Love You, Mum Collection With FREE BeautyFeatures Vanity Case",
    component_sku: "12266",
    component_name: "Kerastase Genesis Bain Deluxe 30ml​ GWP",
    component_qty: 1,
  },
  {
    bundle_sku: "22499",
    bundle_name:
      "The Love You, Mum Collection With FREE BeautyFeatures Vanity Case",
    component_sku: "13405",
    component_name: "Elemis Pro-Collagen Cleansing Balm 100g",
    component_qty: 1,
  },
  {
    bundle_sku: "22499",
    bundle_name:
      "The Love You, Mum Collection With FREE BeautyFeatures Vanity Case",
    component_sku: "20517",
    component_name:
      "BeautyFeatures Resuable Bamboo Fibre Cleansing Mitts - 2 Pack",
    component_qty: 1,
  },
  {
    bundle_sku: "22499",
    bundle_name:
      "The Love You, Mum Collection With FREE BeautyFeatures Vanity Case",
    component_sku: "20519",
    component_name: "BeautyFeatures Microfibre Hair Towel",
    component_qty: 1,
  },
  {
    bundle_sku: "22499",
    bundle_name:
      "The Love You, Mum Collection With FREE BeautyFeatures Vanity Case",
    component_sku: "22350",
    component_name: "BeautyFeatures Pink Vanity Bag",
    component_qty: 1,
  },
  {
    bundle_sku: "22523",
    bundle_name:
      "Sabrina Carpenter Sweet Tooth & Caramel Dreams Eau De Parfum 30ml Duo",
    component_sku: "20788",
    component_name: "Sabrina Carpenter Sweet Tooth Eau De Parfum 30ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22523",
    bundle_name:
      "Sabrina Carpenter Sweet Tooth & Caramel Dreams Eau De Parfum 30ml Duo",
    component_sku: "20790",
    component_name: "Sabrina Carpenter Caramel Dreams Eau De Parfum 30ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22524",
    bundle_name:
      "Sabrina Carpenter Sweet Tooth 30ml & Caramel Dreams Body Mist 236ml Duo",
    component_sku: "20790",
    component_name: "Sabrina Carpenter Caramel Dreams Eau De Parfum 30ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22524",
    bundle_name:
      "Sabrina Carpenter Sweet Tooth 30ml & Caramel Dreams Body Mist 236ml Duo",
    component_sku: "20792",
    component_name: "Sabrina Carpenter Caramel Dreams Body Mist 236ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22525",
    bundle_name:
      "Sabrina Carpenter Sweet Tooth 30ml Eau De Parfum PLUS Travel Set Bundle",
    component_sku: "20788",
    component_name: "Sabrina Carpenter Sweet Tooth Eau De Parfum 30ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22525",
    bundle_name:
      "Sabrina Carpenter Sweet Tooth 30ml Eau De Parfum PLUS Travel Set Bundle",
    component_sku: "22230",
    component_name: "Sabrina Carpenter Eau De Parfum Travel Set",
    component_qty: 1,
  },
  {
    bundle_sku: "22526",
    bundle_name:
      "Sabrina Carpenter Sweet Tooth 75ml Eau De Parfum & Body Mist 236ml Duo",
    component_sku: "20787",
    component_name: "Sabrina Carpenter Sweet Tooth Eau De Parfum 75ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22526",
    bundle_name:
      "Sabrina Carpenter Sweet Tooth 75ml Eau De Parfum & Body Mist 236ml Duo",
    component_sku: "20789",
    component_name: "Sabrina Carpenter Sweet Tooth Body Mist 236ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22527",
    bundle_name:
      "Sabrina Carpenter Sweet Tooth Eau De Parfum 30ml & Body Mist Duo With FREE Vanity Bag - Pink",
    component_sku: "20788",
    component_name: "Sabrina Carpenter Sweet Tooth Eau De Parfum 30ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22527",
    bundle_name:
      "Sabrina Carpenter Sweet Tooth Eau De Parfum 30ml & Body Mist Duo With FREE Vanity Bag - Pink",
    component_sku: "20789",
    component_name: "Sabrina Carpenter Sweet Tooth Body Mist 236ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22527",
    bundle_name:
      "Sabrina Carpenter Sweet Tooth Eau De Parfum 30ml & Body Mist Duo With FREE Vanity Bag - Pink",
    component_sku: "22350",
    component_name: "BeautyFeatures Pink Vanity Bag",
    component_qty: 1,
  },
  {
    bundle_sku: "22528",
    bundle_name:
      "Sabrina Carpenter Sweet Tooth Eau De Parfum 30ml & Body Mist Duo With FREE Vanity Bag - Black",
    component_sku: "20788",
    component_name: "Sabrina Carpenter Sweet Tooth Eau De Parfum 30ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22528",
    bundle_name:
      "Sabrina Carpenter Sweet Tooth Eau De Parfum 30ml & Body Mist Duo With FREE Vanity Bag - Black",
    component_sku: "20789",
    component_name: "Sabrina Carpenter Sweet Tooth Body Mist 236ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22528",
    bundle_name:
      "Sabrina Carpenter Sweet Tooth Eau De Parfum 30ml & Body Mist Duo With FREE Vanity Bag - Black",
    component_sku: "22351",
    component_name: "BeautyFeatures Black Vanity Bag",
    component_qty: 1,
  },
  {
    bundle_sku: "22529",
    bundle_name:
      "Sabrina Carpenter Caramel Dreams Eau De Parfum 30ml & Body Mist Duo With FREE Vanity Bag - Pink",
    component_sku: "20790",
    component_name: "Sabrina Carpenter Caramel Dreams Eau De Parfum 30ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22529",
    bundle_name:
      "Sabrina Carpenter Caramel Dreams Eau De Parfum 30ml & Body Mist Duo With FREE Vanity Bag - Pink",
    component_sku: "20792",
    component_name: "Sabrina Carpenter Caramel Dreams Body Mist 236ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22529",
    bundle_name:
      "Sabrina Carpenter Caramel Dreams Eau De Parfum 30ml & Body Mist Duo With FREE Vanity Bag - Pink",
    component_sku: "22350",
    component_name: "BeautyFeatures Pink Vanity Bag",
    component_qty: 1,
  },
  {
    bundle_sku: "22530",
    bundle_name:
      "Sabrina Carpenter Caramel Dreams Eau De Parfum 30ml & Body Mist Duo With FREE Vanity Bag - Black",
    component_sku: "20790",
    component_name: "Sabrina Carpenter Caramel Dreams Eau De Parfum 30ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22530",
    bundle_name:
      "Sabrina Carpenter Caramel Dreams Eau De Parfum 30ml & Body Mist Duo With FREE Vanity Bag - Black",
    component_sku: "20792",
    component_name: "Sabrina Carpenter Caramel Dreams Body Mist 236ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22530",
    bundle_name:
      "Sabrina Carpenter Caramel Dreams Eau De Parfum 30ml & Body Mist Duo With FREE Vanity Bag - Black",
    component_sku: "22351",
    component_name: "BeautyFeatures Black Vanity Bag",
    component_qty: 1,
  },
  {
    bundle_sku: "22531",
    bundle_name:
      "Sabrina Carpenter Cherry Baby Eau De Parfum 30ml & Body Mist Duo With FREE Vanity Bag - Pink",
    component_sku: "20794",
    component_name: "Sabrina Carpenter Cherry Baby Eau De Parfum 30ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22531",
    bundle_name:
      "Sabrina Carpenter Cherry Baby Eau De Parfum 30ml & Body Mist Duo With FREE Vanity Bag - Pink",
    component_sku: "20795",
    component_name: "Sabrina Carpenter Cherry Baby Body Mist 236ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22531",
    bundle_name:
      "Sabrina Carpenter Cherry Baby Eau De Parfum 30ml & Body Mist Duo With FREE Vanity Bag - Pink",
    component_sku: "22350",
    component_name: "BeautyFeatures Pink Vanity Bag",
    component_qty: 1,
  },
  {
    bundle_sku: "22532",
    bundle_name:
      "Sabrina Carpenter Cherry Baby Eau De Parfum 30ml & Body Mist Duo With FREE Vanity Bag - Black",
    component_sku: "20794",
    component_name: "Sabrina Carpenter Cherry Baby Eau De Parfum 30ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22532",
    bundle_name:
      "Sabrina Carpenter Cherry Baby Eau De Parfum 30ml & Body Mist Duo With FREE Vanity Bag - Black",
    component_sku: "20795",
    component_name: "Sabrina Carpenter Cherry Baby Body Mist 236ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22532",
    bundle_name:
      "Sabrina Carpenter Cherry Baby Eau De Parfum 30ml & Body Mist Duo With FREE Vanity Bag - Black",
    component_sku: "22351",
    component_name: "BeautyFeatures Black Vanity Bag",
    component_qty: 1,
  },
  {
    bundle_sku: "22538",
    bundle_name:
      "Olaplex Shampoo & Conditioner With FREE BeautyFeatures Vanity Bag - Pink",
    component_sku: "22350",
    component_name: "BeautyFeatures Pink Vanity Bag",
    component_qty: 1,
  },
  {
    bundle_sku: "22538",
    bundle_name:
      "Olaplex Shampoo & Conditioner With FREE BeautyFeatures Vanity Bag - Pink",
    component_sku: "7179",
    component_name: "Olaplex No.4 Bond Maintenance Shampoo 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22538",
    bundle_name:
      "Olaplex Shampoo & Conditioner With FREE BeautyFeatures Vanity Bag - Pink",
    component_sku: "7180",
    component_name: "Olaplex No.5 Bond Maintenance Conditioner 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22539",
    bundle_name:
      "Pureology Hydrate Shampoo & Conditioner With FREE BeautyFeatures Vanity Bag - Pink",
    component_sku: "22350",
    component_name: "BeautyFeatures Pink Vanity Bag",
    component_qty: 1,
  },
  {
    bundle_sku: "22539",
    bundle_name:
      "Pureology Hydrate Shampoo & Conditioner With FREE BeautyFeatures Vanity Bag - Pink",
    component_sku: "5048",
    component_name: "Pureology - Pure Hydrate Shampoo 266ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22539",
    bundle_name:
      "Pureology Hydrate Shampoo & Conditioner With FREE BeautyFeatures Vanity Bag - Pink",
    component_sku: "5053",
    component_name: "Pureology - Pure Hydrate Conditioner 266ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22540",
    bundle_name:
      "Pureology Hydrate Sheer Shampoo & Conditioner With FREE BeautyFeatures Vanity Bag - Black",
    component_sku: "10256",
    component_name: "Pureology Hydrate Sheer Shampoo 266ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22540",
    bundle_name:
      "Pureology Hydrate Sheer Shampoo & Conditioner With FREE BeautyFeatures Vanity Bag - Black",
    component_sku: "10257",
    component_name: "Pureology Hydrate Sheer Conditioner 266ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22540",
    bundle_name:
      "Pureology Hydrate Sheer Shampoo & Conditioner With FREE BeautyFeatures Vanity Bag - Black",
    component_sku: "22351",
    component_name: "BeautyFeatures Black Vanity Bag",
    component_qty: 1,
  },
  {
    bundle_sku: "22541",
    bundle_name:
      "Pureology Strength Cure Shampoo & Conditioner With FREE BeautyFeatures Vanity Bag - Pink",
    component_sku: "22350",
    component_name: "BeautyFeatures Pink Vanity Bag",
    component_qty: 1,
  },
  {
    bundle_sku: "22541",
    bundle_name:
      "Pureology Strength Cure Shampoo & Conditioner With FREE BeautyFeatures Vanity Bag - Pink",
    component_sku: "5052",
    component_name: "Pureology - Strength Cure Shampoo 266ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22541",
    bundle_name:
      "Pureology Strength Cure Shampoo & Conditioner With FREE BeautyFeatures Vanity Bag - Pink",
    component_sku: "5057",
    component_name: "Pureology - Strength Cure Conditioner 266ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22542",
    bundle_name:
      "Pureology Nanoworks Gold Shampoo & Conditioner Duo With FREE BeautyFeatures Vanity Bag - Black",
    component_sku: "11358",
    component_name: "Pureology Nanoworks Gold Shampoo 266ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22542",
    bundle_name:
      "Pureology Nanoworks Gold Shampoo & Conditioner Duo With FREE BeautyFeatures Vanity Bag - Black",
    component_sku: "11359",
    component_name: "Pureology Nanoworks Gold Conditioner 266ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22542",
    bundle_name:
      "Pureology Nanoworks Gold Shampoo & Conditioner Duo With FREE BeautyFeatures Vanity Bag - Black",
    component_sku: "22351",
    component_name: "BeautyFeatures Black Vanity Bag",
    component_qty: 1,
  },
  {
    bundle_sku: "22543",
    bundle_name:
      "Olaplex 4P & 5P Blonde Shampoo & Conditioner With FREE BeautyFeatures Vanity Bag - Pink",
    component_sku: "10490",
    component_name: "Olaplex No.4P Blonde Enhancer Toning Shampoo 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22543",
    bundle_name:
      "Olaplex 4P & 5P Blonde Shampoo & Conditioner With FREE BeautyFeatures Vanity Bag - Pink",
    component_sku: "13296",
    component_name: "Olaplex No.5P Blonde Enhancing Toning Conditioner",
    component_qty: 1,
  },
  {
    bundle_sku: "22543",
    bundle_name:
      "Olaplex 4P & 5P Blonde Shampoo & Conditioner With FREE BeautyFeatures Vanity Bag - Pink",
    component_sku: "22350",
    component_name: "BeautyFeatures Pink Vanity Bag",
    component_qty: 1,
  },
  {
    bundle_sku: "22544",
    bundle_name:
      "Joico Moisture Recovery Shampoo & Conditioner With FREE BeautyFeatures Vanity Bag - Pink",
    component_sku: "22350",
    component_name: "BeautyFeatures Pink Vanity Bag",
    component_qty: 1,
  },
  {
    bundle_sku: "22544",
    bundle_name:
      "Joico Moisture Recovery Shampoo & Conditioner With FREE BeautyFeatures Vanity Bag - Pink",
    component_sku: "6205",
    component_name: "Joico Moisture Recovery Shampoo 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22544",
    bundle_name:
      "Joico Moisture Recovery Shampoo & Conditioner With FREE BeautyFeatures Vanity Bag - Pink",
    component_sku: "6206",
    component_name: "Joico Moisture Recovery Conditioner 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22545",
    bundle_name:
      "Joico Joifull Shampoo & Conditioner With FREE BeautyFeatures Vanity Bag - Black",
    component_sku: "22351",
    component_name: "BeautyFeatures Black Vanity Bag",
    component_qty: 1,
  },
  {
    bundle_sku: "22545",
    bundle_name:
      "Joico Joifull Shampoo & Conditioner With FREE BeautyFeatures Vanity Bag - Black",
    component_sku: "7992",
    component_name: "Joico Joifull Volume Condtioner 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22545",
    bundle_name:
      "Joico Joifull Shampoo & Conditioner With FREE BeautyFeatures Vanity Bag - Black",
    component_sku: "7993",
    component_name: "Joico Joifull Volume Shampoo 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22546",
    bundle_name:
      "Joico Blonde Life Shampoo & Conditioner With FREE BeautyFeatures Vanity Bag - Pink",
    component_sku: "22350",
    component_name: "BeautyFeatures Pink Vanity Bag",
    component_qty: 1,
  },
  {
    bundle_sku: "22546",
    bundle_name:
      "Joico Blonde Life Shampoo & Conditioner With FREE BeautyFeatures Vanity Bag - Pink",
    component_sku: "6192",
    component_name: "Joico Blonde Life Brightening Conditioner 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22546",
    bundle_name:
      "Joico Blonde Life Shampoo & Conditioner With FREE BeautyFeatures Vanity Bag - Pink",
    component_sku: "6193",
    component_name: "Joico Blonde Life Brightening Shampoo 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22547",
    bundle_name:
      "Joico Blonde Life Violet Shampoo & Conditioner With FREE BeautyFeatures Vanity Bag - Black",
    component_sku: "22351",
    component_name: "BeautyFeatures Black Vanity Bag",
    component_qty: 1,
  },
  {
    bundle_sku: "22547",
    bundle_name:
      "Joico Blonde Life Violet Shampoo & Conditioner With FREE BeautyFeatures Vanity Bag - Black",
    component_sku: "8027",
    component_name: "Joico Blonde Life Violet Shampoo 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22547",
    bundle_name:
      "Joico Blonde Life Violet Shampoo & Conditioner With FREE BeautyFeatures Vanity Bag - Black",
    component_sku: "8028",
    component_name: "Joico Blonde Life Violet Conditioner 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22548",
    bundle_name:
      "Joico Hydrasplash Shampoo & Conditioner With FREE BeautyFeatures Vanity Bag - Pink",
    component_sku: "22350",
    component_name: "BeautyFeatures Pink Vanity Bag",
    component_qty: 1,
  },
  {
    bundle_sku: "22548",
    bundle_name:
      "Joico Hydrasplash Shampoo & Conditioner With FREE BeautyFeatures Vanity Bag - Pink",
    component_sku: "8223",
    component_name: "Joico HydraSplash Hydrating Shampoo 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22548",
    bundle_name:
      "Joico Hydrasplash Shampoo & Conditioner With FREE BeautyFeatures Vanity Bag - Pink",
    component_sku: "8224",
    component_name: "Joico HydraSplash Hydrating Conditioner 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22549",
    bundle_name:
      "Alfaparf Semi Di Lino Diamond Shampoo & Conditioner With FREE BeautyFeatures Vanity Bag - Pink",
    component_sku: "22350",
    component_name: "BeautyFeatures Pink Vanity Bag",
    component_qty: 1,
  },
  {
    bundle_sku: "22549",
    bundle_name:
      "Alfaparf Semi Di Lino Diamond Shampoo & Conditioner With FREE BeautyFeatures Vanity Bag - Pink",
    component_sku: "6474",
    component_name: "Alfaparf Semi Di Lino Diamond Illuminating Shampoo 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22549",
    bundle_name:
      "Alfaparf Semi Di Lino Diamond Shampoo & Conditioner With FREE BeautyFeatures Vanity Bag - Pink",
    component_sku: "6475",
    component_name:
      "Alfaparf Semi Di Lino Diamond Illuminating Conditioner 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22550",
    bundle_name:
      "Alfaparf Semi Di Lino Density Shampoo & Conditioner With FREE BeautyFeatures Vanity Bag - Pink",
    component_sku: "14050",
    component_name:
      "Alfaparf Semi Di Lino Density Thickening Low Shampoo 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22550",
    bundle_name:
      "Alfaparf Semi Di Lino Density Shampoo & Conditioner With FREE BeautyFeatures Vanity Bag - Pink",
    component_sku: "14051",
    component_name:
      "Alfaparf Semi Di Lino Density Thickening Conditioner 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22550",
    bundle_name:
      "Alfaparf Semi Di Lino Density Shampoo & Conditioner With FREE BeautyFeatures Vanity Bag - Pink",
    component_sku: "22350",
    component_name: "BeautyFeatures Pink Vanity Bag",
    component_qty: 1,
  },
  {
    bundle_sku: "22551",
    bundle_name:
      "Alfaparf Semi Di Lino Smooth Shampoo & Conditioner With FREE BeautyFeatures Vanity Bag - Black",
    component_sku: "22351",
    component_name: "BeautyFeatures Black Vanity Bag",
    component_qty: 1,
  },
  {
    bundle_sku: "22551",
    bundle_name:
      "Alfaparf Semi Di Lino Smooth Shampoo & Conditioner With FREE BeautyFeatures Vanity Bag - Black",
    component_sku: "9894",
    component_name: "Alfaparf Semi Di Lino Smooth Conditioner 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22551",
    bundle_name:
      "Alfaparf Semi Di Lino Smooth Shampoo & Conditioner With FREE BeautyFeatures Vanity Bag - Black",
    component_sku: "9899",
    component_name: "Alfaparf Semi Di Lino Smooth Shampoo 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22552",
    bundle_name:
      "Alfaparf Semi Di Lino Reconstruction Shampoo & Mask With FREE BeautyFeatures Vanity Bag - Black",
    component_sku: "22351",
    component_name: "BeautyFeatures Black Vanity Bag",
    component_qty: 1,
  },
  {
    bundle_sku: "22552",
    bundle_name:
      "Alfaparf Semi Di Lino Reconstruction Shampoo & Mask With FREE BeautyFeatures Vanity Bag - Black",
    component_sku: "6465",
    component_name:
      "Alfaparf Semi Di Lino Reconstruction Reparative Low Shampoo 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22552",
    bundle_name:
      "Alfaparf Semi Di Lino Reconstruction Shampoo & Mask With FREE BeautyFeatures Vanity Bag - Black",
    component_sku: "6466",
    component_name:
      "Alfaparf Semi Di Lino Reconstruction Reparative Mask 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22712",
    bundle_name: "BeautyFeatures Mother's Day Collection - Pink",
    component_sku: "12266",
    component_name: "Kerastase Genesis Bain Deluxe 30ml​ GWP",
    component_qty: 1,
  },
  {
    bundle_sku: "22712",
    bundle_name: "BeautyFeatures Mother's Day Collection - Pink",
    component_sku: "12268",
    component_name: "Kerastase Genesis Masque Deluxe 30ml​ GWP",
    component_qty: 1,
  },
  {
    bundle_sku: "22712",
    bundle_name: "BeautyFeatures Mother's Day Collection - Pink",
    component_sku: "20520",
    component_name: "BeautyFeatures Detangling Hairbrush",
    component_qty: 1,
  },
  {
    bundle_sku: "22712",
    bundle_name: "BeautyFeatures Mother's Day Collection - Pink",
    component_sku: "20789",
    component_name: "Sabrina Carpenter Sweet Tooth Body Mist 236ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22712",
    bundle_name: "BeautyFeatures Mother's Day Collection - Pink",
    component_sku: "20920",
    component_name: "Kerastase Gloss Absolu Oil 15ml GWP",
    component_qty: 1,
  },
  {
    bundle_sku: "22712",
    bundle_name: "BeautyFeatures Mother's Day Collection - Pink",
    component_sku: "21681",
    component_name: "LANEIGE Lip Sleeping Mask - Berry 20g",
    component_qty: 1,
  },
  {
    bundle_sku: "22712",
    bundle_name: "BeautyFeatures Mother's Day Collection - Pink",
    component_sku: "21719",
    component_name:
      "Hollywood Browzer Dermaplaning Tool - Single - Pink Sapphire",
    component_qty: 1,
  },
  {
    bundle_sku: "22712",
    bundle_name: "BeautyFeatures Mother's Day Collection - Pink",
    component_sku: "21853",
    component_name:
      "Biodance Bio-Collagen Real Deep Mask 34g - Collagen Face Mask",
    component_qty: 1,
  },
  {
    bundle_sku: "22712",
    bundle_name: "BeautyFeatures Mother's Day Collection - Pink",
    component_sku: "22350",
    component_name: "BeautyFeatures Pink Vanity Bag",
    component_qty: 1,
  },
  {
    bundle_sku: "22713",
    bundle_name: "BeautyFeatures Mother's Day Collection - Black",
    component_sku: "11558",
    component_name: "Hollywood Browzer - Single - Turquoise/Blue Opal",
    component_qty: 1,
  },
  {
    bundle_sku: "22713",
    bundle_name: "BeautyFeatures Mother's Day Collection - Black",
    component_sku: "12267",
    component_name: "Kerastase Elixir Ultime L'Huile Original Deluxe 15ml​ GWP",
    component_qty: 1,
  },
  {
    bundle_sku: "22713",
    bundle_name: "BeautyFeatures Mother's Day Collection - Black",
    component_sku: "20520",
    component_name: "BeautyFeatures Detangling Hairbrush",
    component_qty: 1,
  },
  {
    bundle_sku: "22713",
    bundle_name: "BeautyFeatures Mother's Day Collection - Black",
    component_sku: "20795",
    component_name: "Sabrina Carpenter Cherry Baby Body Mist 236ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22713",
    bundle_name: "BeautyFeatures Mother's Day Collection - Black",
    component_sku: "20917",
    component_name: "Kerastase Nutritive Bain Satin Riche 30ml GWP",
    component_qty: 1,
  },
  {
    bundle_sku: "22713",
    bundle_name: "BeautyFeatures Mother's Day Collection - Black",
    component_sku: "20919",
    component_name: "Kerastase Nutritive Lait Vital 30ml GWP",
    component_qty: 1,
  },
  {
    bundle_sku: "22713",
    bundle_name: "BeautyFeatures Mother's Day Collection - Black",
    component_sku: "21681",
    component_name: "LANEIGE Lip Sleeping Mask - Berry 20g",
    component_qty: 1,
  },
  {
    bundle_sku: "22713",
    bundle_name: "BeautyFeatures Mother's Day Collection - Black",
    component_sku: "22351",
    component_name: "BeautyFeatures Black Vanity Bag",
    component_qty: 1,
  },
  {
    bundle_sku: "22714",
    bundle_name: "BeautyFeatures Damage Repair Discovery Kit",
    component_sku: "12271",
    component_name: "Kerastase Resistance Ciment Thermique Deluxe 30ml​ GWP",
    component_qty: 1,
  },
  {
    bundle_sku: "22714",
    bundle_name: "BeautyFeatures Damage Repair Discovery Kit",
    component_sku: "12272",
    component_name:
      "Kerastase Resistance Masque Force Architecte Deluxe 30ml​ GWP",
    component_qty: 1,
  },
  {
    bundle_sku: "22714",
    bundle_name: "BeautyFeatures Damage Repair Discovery Kit",
    component_sku: "12273",
    component_name:
      "Kerastase Resistance Bain Force Architecte Deluxe 30ml​ GWP",
    component_qty: 1,
  },
  {
    bundle_sku: "22714",
    bundle_name: "BeautyFeatures Damage Repair Discovery Kit",
    component_sku: "20520",
    component_name: "BeautyFeatures Detangling Hairbrush",
    component_qty: 1,
  },
  {
    bundle_sku: "22714",
    bundle_name: "BeautyFeatures Damage Repair Discovery Kit",
    component_sku: "22350",
    component_name: "BeautyFeatures Pink Vanity Bag",
    component_qty: 1,
  },
  {
    bundle_sku: "22715",
    bundle_name: "BeautyFeatures Hard-Water Hair Survival Kit",
    component_sku: "20520",
    component_name: "BeautyFeatures Detangling Hairbrush",
    component_qty: 1,
  },
  {
    bundle_sku: "22715",
    bundle_name: "BeautyFeatures Hard-Water Hair Survival Kit",
    component_sku: "22351",
    component_name: "BeautyFeatures Black Vanity Bag",
    component_qty: 1,
  },
  {
    bundle_sku: "22716",
    bundle_name: "BeautyFeatures Blonde Discovery Edit",
    component_sku: "12270",
    component_name: "Kerastase Blond Absolu Night Serum Deluxe 30ml​ GWP",
    component_qty: 1,
  },
  {
    bundle_sku: "22716",
    bundle_name: "BeautyFeatures Blonde Discovery Edit",
    component_sku: "12274",
    component_name: "Kerastase Blond Cicaflash Deluxe 30ml​ GWP",
    component_qty: 1,
  },
  {
    bundle_sku: "22716",
    bundle_name: "BeautyFeatures Blonde Discovery Edit",
    component_sku: "12280",
    component_name: "Kerastase Huile Cicaextreme 50ml GWP",
    component_qty: 1,
  },
  {
    bundle_sku: "22716",
    bundle_name: "BeautyFeatures Blonde Discovery Edit",
    component_sku: "12281",
    component_name: "Kerastase Bain Lumiere 80ml​ GWP",
    component_qty: 1,
  },
  {
    bundle_sku: "22716",
    bundle_name: "BeautyFeatures Blonde Discovery Edit",
    component_sku: "20520",
    component_name: "BeautyFeatures Detangling Hairbrush",
    component_qty: 1,
  },
  {
    bundle_sku: "22716",
    bundle_name: "BeautyFeatures Blonde Discovery Edit",
    component_sku: "22350",
    component_name: "BeautyFeatures Pink Vanity Bag",
    component_qty: 1,
  },
  {
    bundle_sku: "22717",
    bundle_name:
      "Redken Acidic Bonding Concentrate Shampoo, Conditioner & Bandage Balm Bundle",
    component_sku: "22520",
    component_name: "Redken Acidic Bonding Concentrate Hair Bandage Balm 75ml ",
    component_qty: 1,
  },
  {
    bundle_sku: "22717",
    bundle_name:
      "Redken Acidic Bonding Concentrate Shampoo, Conditioner & Bandage Balm Bundle",
    component_sku: "9762",
    component_name: "Redken Acidic Bonding Concentrate Shampoo 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22717",
    bundle_name:
      "Redken Acidic Bonding Concentrate Shampoo, Conditioner & Bandage Balm Bundle",
    component_sku: "9763",
    component_name: "Redken Acidic Bonding Concentrate Conditioner 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22718",
    bundle_name:
      "Redken One United Multi-Benefit Treatment Spray 150ml & Redken Acidic Bonding Concentrate Hair Bandage Balm 75ml Duo",
    component_sku: "22520",
    component_name: "Redken Acidic Bonding Concentrate Hair Bandage Balm 75ml ",
    component_qty: 1,
  },
  {
    bundle_sku: "22718",
    bundle_name:
      "Redken One United Multi-Benefit Treatment Spray 150ml & Redken Acidic Bonding Concentrate Hair Bandage Balm 75ml Duo",
    component_sku: "5011",
    component_name: "Redken - One United 150ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22719",
    bundle_name:
      "Redken Acidic Bonding Concentrate Leave In Treatment 50ml & Redken Acidic Bonding Concentrate Hair Bandage Balm 75ml Duo",
    component_sku: "21867",
    component_name: "Redken Acidic Bonding Concentrate Leave In Treatment 50ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22719",
    bundle_name:
      "Redken Acidic Bonding Concentrate Leave In Treatment 50ml & Redken Acidic Bonding Concentrate Hair Bandage Balm 75ml Duo",
    component_sku: "22520",
    component_name: "Redken Acidic Bonding Concentrate Hair Bandage Balm 75ml ",
    component_qty: 1,
  },
  {
    bundle_sku: "22720",
    bundle_name:
      "Redken Acidic Grow Full System Shampoo 300ml, Conditioner 300ml, Serum 100ml & Spray 190ml Bundle",
    component_sku: "22707",
    component_name:
      "Redken Acidic Grow Full System Densifying Shampoo for Thin Hair, Strengthens & Thickens, 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22720",
    bundle_name:
      "Redken Acidic Grow Full System Shampoo 300ml, Conditioner 300ml, Serum 100ml & Spray 190ml Bundle",
    component_sku: "22708",
    component_name:
      "Redken Acidic Grow Full System Densifying Conditioner for Thin Hair, Strengthens & Thickens, 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22720",
    bundle_name:
      "Redken Acidic Grow Full System Shampoo 300ml, Conditioner 300ml, Serum 100ml & Spray 190ml Bundle",
    component_sku: "22709",
    component_name:
      "Redken Acidic Grow Full System Instant Densifying Spray for Thin Hair, Strengthens & Thickens, 190ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22720",
    bundle_name:
      "Redken Acidic Grow Full System Shampoo 300ml, Conditioner 300ml, Serum 100ml & Spray 190ml Bundle",
    component_sku: "22710",
    component_name:
      "Redken Acidic Grow Full System Hair Serum for Thin Hair, Strengthens & Thickens, 100ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22721",
    bundle_name:
      "Redken Acidic Grow Full System Shampoo 300ml, Conditioner 300ml & Serum 100ml Bundle",
    component_sku: "22707",
    component_name:
      "Redken Acidic Grow Full System Densifying Shampoo for Thin Hair, Strengthens & Thickens, 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22721",
    bundle_name:
      "Redken Acidic Grow Full System Shampoo 300ml, Conditioner 300ml & Serum 100ml Bundle",
    component_sku: "22708",
    component_name:
      "Redken Acidic Grow Full System Densifying Conditioner for Thin Hair, Strengthens & Thickens, 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22721",
    bundle_name:
      "Redken Acidic Grow Full System Shampoo 300ml, Conditioner 300ml & Serum 100ml Bundle",
    component_sku: "22710",
    component_name:
      "Redken Acidic Grow Full System Hair Serum for Thin Hair, Strengthens & Thickens, 100ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22722",
    bundle_name:
      "Redken Acidic Grow Full System Densifying Shampoo 300ml & Redken Acidic Grow Full System Densifying Conditioner 300ml Duo",
    component_sku: "22707",
    component_name:
      "Redken Acidic Grow Full System Densifying Shampoo for Thin Hair, Strengthens & Thickens, 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22722",
    bundle_name:
      "Redken Acidic Grow Full System Densifying Shampoo 300ml & Redken Acidic Grow Full System Densifying Conditioner 300ml Duo",
    component_sku: "22708",
    component_name:
      "Redken Acidic Grow Full System Densifying Conditioner for Thin Hair, Strengthens & Thickens, 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22723",
    bundle_name:
      "Redken Acidic Grow Full System Hair Serum 100ml & Redken Acidic Grow Full System Instant Densifying Spray 190ml Duo",
    component_sku: "22709",
    component_name:
      "Redken Acidic Grow Full System Instant Densifying Spray for Thin Hair, Strengthens & Thickens, 190ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22723",
    bundle_name:
      "Redken Acidic Grow Full System Hair Serum 100ml & Redken Acidic Grow Full System Instant Densifying Spray 190ml Duo",
    component_sku: "22710",
    component_name:
      "Redken Acidic Grow Full System Hair Serum for Thin Hair, Strengthens & Thickens, 100ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22724",
    bundle_name:
      "SRC Postpartum Recovery Shorts + Femme Eze Heat & Ice Pack - XXS",
    component_sku: "22276",
    component_name: "SRC Postpartum Recovery Shorts - XXS",
    component_qty: 1,
  },
  {
    bundle_sku: "22724",
    bundle_name:
      "SRC Postpartum Recovery Shorts + Femme Eze Heat & Ice Pack - XXS",
    component_sku: "22537",
    component_name: "SRC Relief Femme-Eze Heat and Ice Pack",
    component_qty: 1,
  },
  {
    bundle_sku: "22725",
    bundle_name:
      "SRC Postpartum Recovery Shorts + Femme Eze Heat & Ice Pack - XS",
    component_sku: "22277",
    component_name: "SRC Postpartum Recovery Shorts - XS",
    component_qty: 1,
  },
  {
    bundle_sku: "22725",
    bundle_name:
      "SRC Postpartum Recovery Shorts + Femme Eze Heat & Ice Pack - XS",
    component_sku: "22537",
    component_name: "SRC Relief Femme-Eze Heat and Ice Pack",
    component_qty: 1,
  },
  {
    bundle_sku: "22726",
    bundle_name:
      "SRC Postpartum Recovery Shorts + Femme Eze Heat & Ice Pack - S",
    component_sku: "22278",
    component_name: "SRC Postpartum Recovery Shorts - S",
    component_qty: 1,
  },
  {
    bundle_sku: "22726",
    bundle_name:
      "SRC Postpartum Recovery Shorts + Femme Eze Heat & Ice Pack - S",
    component_sku: "22537",
    component_name: "SRC Relief Femme-Eze Heat and Ice Pack",
    component_qty: 1,
  },
  {
    bundle_sku: "22727",
    bundle_name:
      "SRC Postpartum Recovery Shorts + Femme Eze Heat & Ice Pack - M",
    component_sku: "22279",
    component_name: "SRC Postpartum Recovery Shorts - M",
    component_qty: 1,
  },
  {
    bundle_sku: "22727",
    bundle_name:
      "SRC Postpartum Recovery Shorts + Femme Eze Heat & Ice Pack - M",
    component_sku: "22537",
    component_name: "SRC Relief Femme-Eze Heat and Ice Pack",
    component_qty: 1,
  },
  {
    bundle_sku: "22728",
    bundle_name:
      "SRC Postpartum Recovery Shorts + Femme Eze Heat & Ice Pack - L",
    component_sku: "22280",
    component_name: "SRC Postpartum Recovery Shorts - L",
    component_qty: 1,
  },
  {
    bundle_sku: "22728",
    bundle_name:
      "SRC Postpartum Recovery Shorts + Femme Eze Heat & Ice Pack - L",
    component_sku: "22537",
    component_name: "SRC Relief Femme-Eze Heat and Ice Pack",
    component_qty: 1,
  },
  {
    bundle_sku: "22729",
    bundle_name:
      "SRC Postpartum Recovery Shorts + Femme Eze Heat & Ice Pack - XL",
    component_sku: "22289",
    component_name: "SRC Postpartum Recovery Leggings - XL",
    component_qty: 1,
  },
  {
    bundle_sku: "22729",
    bundle_name:
      "SRC Postpartum Recovery Shorts + Femme Eze Heat & Ice Pack - XL",
    component_sku: "22537",
    component_name: "SRC Relief Femme-Eze Heat and Ice Pack",
    component_qty: 1,
  },
  {
    bundle_sku: "22730",
    bundle_name:
      "SRC Postpartum Recovery Shorts + Femme Eze Heat & Ice Pack - XXL",
    component_sku: "22282",
    component_name: "SRC Postpartum Recovery Shorts - XXL",
    component_qty: 1,
  },
  {
    bundle_sku: "22730",
    bundle_name:
      "SRC Postpartum Recovery Shorts + Femme Eze Heat & Ice Pack - XXL",
    component_sku: "22537",
    component_name: "SRC Relief Femme-Eze Heat and Ice Pack",
    component_qty: 1,
  },
  {
    bundle_sku: "22731",
    bundle_name:
      "SRC Postpartum Recovery Shorts + Femme Eze Heat & Ice Pack - XXXL",
    component_sku: "22283",
    component_name: "SRC Postpartum Recovery Shorts - XXXL",
    component_qty: 1,
  },
  {
    bundle_sku: "22731",
    bundle_name:
      "SRC Postpartum Recovery Shorts + Femme Eze Heat & Ice Pack - XXXL",
    component_sku: "22537",
    component_name: "SRC Relief Femme-Eze Heat and Ice Pack",
    component_qty: 1,
  },
  {
    bundle_sku: "22732",
    bundle_name:
      "SRC Postpartum Recovery Mini Shorts + Femme Eze Heat & Ice Pack - Black XXS",
    component_sku: "22291",
    component_name: "SRC Postpartum Recovery Mini Shorts - XXS",
    component_qty: 1,
  },
  {
    bundle_sku: "22732",
    bundle_name:
      "SRC Postpartum Recovery Mini Shorts + Femme Eze Heat & Ice Pack - Black XXS",
    component_sku: "22537",
    component_name: "SRC Relief Femme-Eze Heat and Ice Pack",
    component_qty: 1,
  },
  {
    bundle_sku: "22733",
    bundle_name:
      "SRC Postpartum Recovery Mini Shorts + Femme Eze Heat & Ice Pack - Black XS",
    component_sku: "22292",
    component_name: "SRC Postpartum Recovery Mini Shorts - XS",
    component_qty: 1,
  },
  {
    bundle_sku: "22733",
    bundle_name:
      "SRC Postpartum Recovery Mini Shorts + Femme Eze Heat & Ice Pack - Black XS",
    component_sku: "22537",
    component_name: "SRC Relief Femme-Eze Heat and Ice Pack",
    component_qty: 1,
  },
  {
    bundle_sku: "22734",
    bundle_name:
      "SRC Postpartum Recovery Mini Shorts + Femme Eze Heat & Ice Pack - Black S",
    component_sku: "22293",
    component_name: "SRC Postpartum Recovery Mini Shorts - S",
    component_qty: 1,
  },
  {
    bundle_sku: "22734",
    bundle_name:
      "SRC Postpartum Recovery Mini Shorts + Femme Eze Heat & Ice Pack - Black S",
    component_sku: "22537",
    component_name: "SRC Relief Femme-Eze Heat and Ice Pack",
    component_qty: 1,
  },
  {
    bundle_sku: "22735",
    bundle_name:
      "SRC Postpartum Recovery Mini Shorts + Femme Eze Heat & Ice Pack - Black M",
    component_sku: "22294",
    component_name: "SRC Postpartum Recovery Mini Shorts - M",
    component_qty: 1,
  },
  {
    bundle_sku: "22735",
    bundle_name:
      "SRC Postpartum Recovery Mini Shorts + Femme Eze Heat & Ice Pack - Black M",
    component_sku: "22537",
    component_name: "SRC Relief Femme-Eze Heat and Ice Pack",
    component_qty: 1,
  },
  {
    bundle_sku: "22736",
    bundle_name:
      "SRC Postpartum Recovery Mini Shorts + Femme Eze Heat & Ice Pack - Black L",
    component_sku: "22295",
    component_name: "SRC Postpartum Recovery Mini Shorts - L",
    component_qty: 1,
  },
  {
    bundle_sku: "22736",
    bundle_name:
      "SRC Postpartum Recovery Mini Shorts + Femme Eze Heat & Ice Pack - Black L",
    component_sku: "22537",
    component_name: "SRC Relief Femme-Eze Heat and Ice Pack",
    component_qty: 1,
  },
  {
    bundle_sku: "22737",
    bundle_name:
      "SRC Postpartum Recovery Mini Shorts + Femme Eze Heat & Ice Pack - Black XL",
    component_sku: "22296",
    component_name: "SRC Postpartum Recovery Mini Shorts - XL",
    component_qty: 1,
  },
  {
    bundle_sku: "22737",
    bundle_name:
      "SRC Postpartum Recovery Mini Shorts + Femme Eze Heat & Ice Pack - Black XL",
    component_sku: "22537",
    component_name: "SRC Relief Femme-Eze Heat and Ice Pack",
    component_qty: 1,
  },
  {
    bundle_sku: "22738",
    bundle_name:
      "SRC Postpartum Recovery Mini Shorts + Femme Eze Heat & Ice Pack - Black XXL",
    component_sku: "22297",
    component_name: "SRC Postpartum Recovery Mini Shorts - XXL",
    component_qty: 1,
  },
  {
    bundle_sku: "22738",
    bundle_name:
      "SRC Postpartum Recovery Mini Shorts + Femme Eze Heat & Ice Pack - Black XXL",
    component_sku: "22537",
    component_name: "SRC Relief Femme-Eze Heat and Ice Pack",
    component_qty: 1,
  },
  {
    bundle_sku: "22739",
    bundle_name:
      "SRC Postpartum Recovery Mini Shorts + Femme Eze Heat & Ice Pack - Champagne XXS",
    component_sku: "22461",
    component_name: "SRC Postpartum Recovery Mini Shorts - XXS - Champagne",
    component_qty: 1,
  },
  {
    bundle_sku: "22739",
    bundle_name:
      "SRC Postpartum Recovery Mini Shorts + Femme Eze Heat & Ice Pack - Champagne XXS",
    component_sku: "22537",
    component_name: "SRC Relief Femme-Eze Heat and Ice Pack",
    component_qty: 1,
  },
  {
    bundle_sku: "22740",
    bundle_name:
      "SRC Postpartum Recovery Mini Shorts + Femme Eze Heat & Ice Pack - Champagne XS",
    component_sku: "22462",
    component_name: "SRC Postpartum Recovery Mini Shorts - XS Champagne",
    component_qty: 1,
  },
  {
    bundle_sku: "22740",
    bundle_name:
      "SRC Postpartum Recovery Mini Shorts + Femme Eze Heat & Ice Pack - Champagne XS",
    component_sku: "22537",
    component_name: "SRC Relief Femme-Eze Heat and Ice Pack",
    component_qty: 1,
  },
  {
    bundle_sku: "22741",
    bundle_name:
      "SRC Postpartum Recovery Mini Shorts + Femme Eze Heat & Ice Pack - Champagne S",
    component_sku: "22463",
    component_name: "SRC Postpartum Recovery Mini Shorts - S Champagne",
    component_qty: 1,
  },
  {
    bundle_sku: "22741",
    bundle_name:
      "SRC Postpartum Recovery Mini Shorts + Femme Eze Heat & Ice Pack - Champagne S",
    component_sku: "22537",
    component_name: "SRC Relief Femme-Eze Heat and Ice Pack",
    component_qty: 1,
  },
  {
    bundle_sku: "22742",
    bundle_name:
      "SRC Postpartum Recovery Mini Shorts + Femme Eze Heat & Ice Pack - Champagne M",
    component_sku: "22464",
    component_name: "SRC Postpartum Recovery Mini Shorts - M Champagne",
    component_qty: 1,
  },
  {
    bundle_sku: "22742",
    bundle_name:
      "SRC Postpartum Recovery Mini Shorts + Femme Eze Heat & Ice Pack - Champagne M",
    component_sku: "22537",
    component_name: "SRC Relief Femme-Eze Heat and Ice Pack",
    component_qty: 1,
  },
  {
    bundle_sku: "22743",
    bundle_name:
      "SRC Postpartum Recovery Mini Shorts + Femme Eze Heat & Ice Pack - Champagne L",
    component_sku: "22465",
    component_name: "SRC Postpartum Recovery Mini Shorts - L Champagne",
    component_qty: 1,
  },
  {
    bundle_sku: "22743",
    bundle_name:
      "SRC Postpartum Recovery Mini Shorts + Femme Eze Heat & Ice Pack - Champagne L",
    component_sku: "22537",
    component_name: "SRC Relief Femme-Eze Heat and Ice Pack",
    component_qty: 1,
  },
  {
    bundle_sku: "22744",
    bundle_name:
      "SRC Postpartum Recovery Mini Shorts + Femme Eze Heat & Ice Pack - Champagne XL",
    component_sku: "22466",
    component_name: "SRC Postpartum Recovery Mini Shorts - XL Champagne",
    component_qty: 1,
  },
  {
    bundle_sku: "22744",
    bundle_name:
      "SRC Postpartum Recovery Mini Shorts + Femme Eze Heat & Ice Pack - Champagne XL",
    component_sku: "22537",
    component_name: "SRC Relief Femme-Eze Heat and Ice Pack",
    component_qty: 1,
  },
  {
    bundle_sku: "22745",
    bundle_name:
      "SRC Postpartum Recovery Mini Shorts + Femme Eze Heat & Ice Pack - Champagne XXL",
    component_sku: "22467",
    component_name: "SRC Postpartum Recovery Mini Shorts - XXL Champagne",
    component_qty: 1,
  },
  {
    bundle_sku: "22745",
    bundle_name:
      "SRC Postpartum Recovery Mini Shorts + Femme Eze Heat & Ice Pack - Champagne XXL",
    component_sku: "22537",
    component_name: "SRC Relief Femme-Eze Heat and Ice Pack",
    component_qty: 1,
  },
  {
    bundle_sku: "22746",
    bundle_name:
      "SRC Postpartum Recovery Leggings + Femme Eze Heat & Ice Pack - XXS",
    component_sku: "22284",
    component_name: "SRC Postpartum Recovery Leggings - XXS",
    component_qty: 1,
  },
  {
    bundle_sku: "22746",
    bundle_name:
      "SRC Postpartum Recovery Leggings + Femme Eze Heat & Ice Pack - XXS",
    component_sku: "22537",
    component_name: "SRC Relief Femme-Eze Heat and Ice Pack",
    component_qty: 1,
  },
  {
    bundle_sku: "22747",
    bundle_name:
      "SRC Postpartum Recovery Leggings + Femme Eze Heat & Ice Pack - XS",
    component_sku: "22285",
    component_name: "SRC Postpartum Recovery Leggings - XS",
    component_qty: 1,
  },
  {
    bundle_sku: "22747",
    bundle_name:
      "SRC Postpartum Recovery Leggings + Femme Eze Heat & Ice Pack - XS",
    component_sku: "22537",
    component_name: "SRC Relief Femme-Eze Heat and Ice Pack",
    component_qty: 1,
  },
  {
    bundle_sku: "22748",
    bundle_name:
      "SRC Postpartum Recovery Leggings + Femme Eze Heat & Ice Pack - S",
    component_sku: "22286",
    component_name: "SRC Postpartum Recovery Leggings - S",
    component_qty: 1,
  },
  {
    bundle_sku: "22748",
    bundle_name:
      "SRC Postpartum Recovery Leggings + Femme Eze Heat & Ice Pack - S",
    component_sku: "22537",
    component_name: "SRC Relief Femme-Eze Heat and Ice Pack",
    component_qty: 1,
  },
  {
    bundle_sku: "22749",
    bundle_name:
      "SRC Postpartum Recovery Leggings + Femme Eze Heat & Ice Pack - M",
    component_sku: "22287",
    component_name: "SRC Postpartum Recovery Leggings - M",
    component_qty: 1,
  },
  {
    bundle_sku: "22749",
    bundle_name:
      "SRC Postpartum Recovery Leggings + Femme Eze Heat & Ice Pack - M",
    component_sku: "22537",
    component_name: "SRC Relief Femme-Eze Heat and Ice Pack",
    component_qty: 1,
  },
  {
    bundle_sku: "22750",
    bundle_name:
      "SRC Postpartum Recovery Leggings + Femme Eze Heat & Ice Pack - L",
    component_sku: "22288",
    component_name: "SRC Postpartum Recovery Leggings - L",
    component_qty: 1,
  },
  {
    bundle_sku: "22750",
    bundle_name:
      "SRC Postpartum Recovery Leggings + Femme Eze Heat & Ice Pack - L",
    component_sku: "22537",
    component_name: "SRC Relief Femme-Eze Heat and Ice Pack",
    component_qty: 1,
  },
  {
    bundle_sku: "22751",
    bundle_name:
      "SRC Postpartum Recovery Leggings + Femme Eze Heat & Ice Pack - XL",
    component_sku: "22289",
    component_name: "SRC Postpartum Recovery Leggings - XL",
    component_qty: 1,
  },
  {
    bundle_sku: "22751",
    bundle_name:
      "SRC Postpartum Recovery Leggings + Femme Eze Heat & Ice Pack - XL",
    component_sku: "22537",
    component_name: "SRC Relief Femme-Eze Heat and Ice Pack",
    component_qty: 1,
  },
  {
    bundle_sku: "22752",
    bundle_name:
      "SRC Postpartum Recovery Leggings + Femme Eze Heat & Ice Pack - XXL",
    component_sku: "22290",
    component_name: "SRC Postpartum Recovery Leggings - XXL",
    component_qty: 1,
  },
  {
    bundle_sku: "22752",
    bundle_name:
      "SRC Postpartum Recovery Leggings + Femme Eze Heat & Ice Pack - XXL",
    component_sku: "22537",
    component_name: "SRC Relief Femme-Eze Heat and Ice Pack",
    component_qty: 1,
  },
  {
    bundle_sku: "22753",
    bundle_name:
      "SRC Pregnancy Shorts Mini Over the Bump + Femme Eze Heat & Ice Pack - Black XXS",
    component_sku: "22004",
    component_name: "SRC Pregnancy Shorts - Mini Over the Bump - XXS",
    component_qty: 1,
  },
  {
    bundle_sku: "22753",
    bundle_name:
      "SRC Pregnancy Shorts Mini Over the Bump + Femme Eze Heat & Ice Pack - Black XXS",
    component_sku: "22537",
    component_name: "SRC Relief Femme-Eze Heat and Ice Pack",
    component_qty: 1,
  },
  {
    bundle_sku: "22754",
    bundle_name:
      "SRC Pregnancy Shorts Mini Over the Bump + Femme Eze Heat & Ice Pack - Black XS",
    component_sku: "22005",
    component_name: "SRC Pregnancy Shorts - Mini Over the Bump - XS",
    component_qty: 1,
  },
  {
    bundle_sku: "22754",
    bundle_name:
      "SRC Pregnancy Shorts Mini Over the Bump + Femme Eze Heat & Ice Pack - Black XS",
    component_sku: "22537",
    component_name: "SRC Relief Femme-Eze Heat and Ice Pack",
    component_qty: 1,
  },
  {
    bundle_sku: "22755",
    bundle_name:
      "SRC Pregnancy Shorts Mini Over the Bump + Femme Eze Heat & Ice Pack - Black S",
    component_sku: "22006",
    component_name: "SRC Pregnancy Shorts - Mini Over the Bump - S",
    component_qty: 1,
  },
  {
    bundle_sku: "22755",
    bundle_name:
      "SRC Pregnancy Shorts Mini Over the Bump + Femme Eze Heat & Ice Pack - Black S",
    component_sku: "22537",
    component_name: "SRC Relief Femme-Eze Heat and Ice Pack",
    component_qty: 1,
  },
  {
    bundle_sku: "22756",
    bundle_name:
      "SRC Pregnancy Shorts Mini Over the Bump + Femme Eze Heat & Ice Pack - Black M",
    component_sku: "22007",
    component_name: "SRC Pregnancy Shorts - Mini Over the Bump - M",
    component_qty: 1,
  },
  {
    bundle_sku: "22756",
    bundle_name:
      "SRC Pregnancy Shorts Mini Over the Bump + Femme Eze Heat & Ice Pack - Black M",
    component_sku: "22537",
    component_name: "SRC Relief Femme-Eze Heat and Ice Pack",
    component_qty: 1,
  },
  {
    bundle_sku: "22757",
    bundle_name:
      "SRC Pregnancy Shorts Mini Over the Bump + Femme Eze Heat & Ice Pack - Black L",
    component_sku: "22008",
    component_name: "SRC Pregnancy Shorts - Mini Over the Bump - L",
    component_qty: 1,
  },
  {
    bundle_sku: "22757",
    bundle_name:
      "SRC Pregnancy Shorts Mini Over the Bump + Femme Eze Heat & Ice Pack - Black L",
    component_sku: "22537",
    component_name: "SRC Relief Femme-Eze Heat and Ice Pack",
    component_qty: 1,
  },
  {
    bundle_sku: "22758",
    bundle_name:
      "SRC Pregnancy Shorts Mini Over the Bump + Femme Eze Heat & Ice Pack - Black XL",
    component_sku: "22009",
    component_name: "SRC Pregnancy Shorts - Mini Over the Bump - XL",
    component_qty: 1,
  },
  {
    bundle_sku: "22758",
    bundle_name:
      "SRC Pregnancy Shorts Mini Over the Bump + Femme Eze Heat & Ice Pack - Black XL",
    component_sku: "22537",
    component_name: "SRC Relief Femme-Eze Heat and Ice Pack",
    component_qty: 1,
  },
  {
    bundle_sku: "22759",
    bundle_name:
      "SRC Pregnancy Shorts Mini Over the Bump + Femme Eze Heat & Ice Pack - Black XXL",
    component_sku: "22010",
    component_name: "SRC Pregnancy Shorts - Mini Over the Bump - XXL",
    component_qty: 1,
  },
  {
    bundle_sku: "22759",
    bundle_name:
      "SRC Pregnancy Shorts Mini Over the Bump + Femme Eze Heat & Ice Pack - Black XXL",
    component_sku: "22537",
    component_name: "SRC Relief Femme-Eze Heat and Ice Pack",
    component_qty: 1,
  },
  {
    bundle_sku: "22760",
    bundle_name:
      "SRC Pregnancy Shorts Mini Over the Bump + Femme Eze Heat & Ice Pack - Champagne XXS",
    component_sku: "22454",
    component_name: "SRC Pregnancy Shorts - Mini Over the Bump - XXS Champagne",
    component_qty: 1,
  },
  {
    bundle_sku: "22760",
    bundle_name:
      "SRC Pregnancy Shorts Mini Over the Bump + Femme Eze Heat & Ice Pack - Champagne XXS",
    component_sku: "22537",
    component_name: "SRC Relief Femme-Eze Heat and Ice Pack",
    component_qty: 1,
  },
  {
    bundle_sku: "22761",
    bundle_name:
      "SRC Pregnancy Shorts Mini Over the Bump + Femme Eze Heat & Ice Pack - Champagne XS",
    component_sku: "22455",
    component_name: "SRC Pregnancy Shorts - Mini Over the Bump - XS Champagne",
    component_qty: 1,
  },
  {
    bundle_sku: "22761",
    bundle_name:
      "SRC Pregnancy Shorts Mini Over the Bump + Femme Eze Heat & Ice Pack - Champagne XS",
    component_sku: "22537",
    component_name: "SRC Relief Femme-Eze Heat and Ice Pack",
    component_qty: 1,
  },
  {
    bundle_sku: "22762",
    bundle_name:
      "SRC Pregnancy Shorts Mini Over the Bump + Femme Eze Heat & Ice Pack - Champagne S",
    component_sku: "22456",
    component_name: "SRC Pregnancy Shorts - Mini Over the Bump - S Champagne",
    component_qty: 1,
  },
  {
    bundle_sku: "22762",
    bundle_name:
      "SRC Pregnancy Shorts Mini Over the Bump + Femme Eze Heat & Ice Pack - Champagne S",
    component_sku: "22537",
    component_name: "SRC Relief Femme-Eze Heat and Ice Pack",
    component_qty: 1,
  },
  {
    bundle_sku: "22763",
    bundle_name:
      "SRC Pregnancy Shorts Mini Over the Bump + Femme Eze Heat & Ice Pack - Champagne M",
    component_sku: "22457",
    component_name: "SRC Pregnancy Shorts - Mini Over the Bump - M Champagne",
    component_qty: 1,
  },
  {
    bundle_sku: "22763",
    bundle_name:
      "SRC Pregnancy Shorts Mini Over the Bump + Femme Eze Heat & Ice Pack - Champagne M",
    component_sku: "22537",
    component_name: "SRC Relief Femme-Eze Heat and Ice Pack",
    component_qty: 1,
  },
  {
    bundle_sku: "22764",
    bundle_name:
      "SRC Pregnancy Shorts Mini Over the Bump + Femme Eze Heat & Ice Pack - Champagne L",
    component_sku: "22458",
    component_name: "SRC Pregnancy Shorts - Mini Over the Bump - L Champagne",
    component_qty: 1,
  },
  {
    bundle_sku: "22764",
    bundle_name:
      "SRC Pregnancy Shorts Mini Over the Bump + Femme Eze Heat & Ice Pack - Champagne L",
    component_sku: "22537",
    component_name: "SRC Relief Femme-Eze Heat and Ice Pack",
    component_qty: 1,
  },
  {
    bundle_sku: "22765",
    bundle_name:
      "SRC Pregnancy Shorts Mini Over the Bump + Femme Eze Heat & Ice Pack - Champagne XL",
    component_sku: "22459",
    component_name: "SRC Pregnancy Shorts - Mini Over the Bump - XL Champagne",
    component_qty: 1,
  },
  {
    bundle_sku: "22765",
    bundle_name:
      "SRC Pregnancy Shorts Mini Over the Bump + Femme Eze Heat & Ice Pack - Champagne XL",
    component_sku: "22537",
    component_name: "SRC Relief Femme-Eze Heat and Ice Pack",
    component_qty: 1,
  },
  {
    bundle_sku: "22766",
    bundle_name:
      "SRC Pregnancy Shorts Mini Over the Bump + Femme Eze Heat & Ice Pack - Champagne XXL",
    component_sku: "22460",
    component_name: "SRC Pregnancy Shorts - Mini Over the Bump - XXL Champagne",
    component_qty: 1,
  },
  {
    bundle_sku: "22766",
    bundle_name:
      "SRC Pregnancy Shorts Mini Over the Bump + Femme Eze Heat & Ice Pack - Champagne XXL",
    component_sku: "22537",
    component_name: "SRC Relief Femme-Eze Heat and Ice Pack",
    component_qty: 1,
  },
  {
    bundle_sku: "22767",
    bundle_name:
      "SRC Pregnancy Shorts Over the Bump + Femme Eze Heat & Ice Pack - Black XXS",
    component_sku: "22255",
    component_name: "SRC Pregnancy Shorts Over the Bump - XXS",
    component_qty: 1,
  },
  {
    bundle_sku: "22767",
    bundle_name:
      "SRC Pregnancy Shorts Over the Bump + Femme Eze Heat & Ice Pack - Black XXS",
    component_sku: "22537",
    component_name: "SRC Relief Femme-Eze Heat and Ice Pack",
    component_qty: 1,
  },
  {
    bundle_sku: "22768",
    bundle_name:
      "SRC Pregnancy Shorts Over the Bump + Femme Eze Heat & Ice Pack - Black XS",
    component_sku: "22256",
    component_name: "SRC Pregnancy Shorts Over the Bump - XS",
    component_qty: 1,
  },
  {
    bundle_sku: "22768",
    bundle_name:
      "SRC Pregnancy Shorts Over the Bump + Femme Eze Heat & Ice Pack - Black XS",
    component_sku: "22537",
    component_name: "SRC Relief Femme-Eze Heat and Ice Pack",
    component_qty: 1,
  },
  {
    bundle_sku: "22769",
    bundle_name:
      "SRC Pregnancy Shorts Over the Bump + Femme Eze Heat & Ice Pack - Black S",
    component_sku: "22257",
    component_name: "SRC Pregnancy Shorts Over the Bump - S",
    component_qty: 1,
  },
  {
    bundle_sku: "22769",
    bundle_name:
      "SRC Pregnancy Shorts Over the Bump + Femme Eze Heat & Ice Pack - Black S",
    component_sku: "22537",
    component_name: "SRC Relief Femme-Eze Heat and Ice Pack",
    component_qty: 1,
  },
  {
    bundle_sku: "22770",
    bundle_name:
      "SRC Pregnancy Shorts Over the Bump + Femme Eze Heat & Ice Pack - Black M",
    component_sku: "22258",
    component_name: "SRC Pregnancy Shorts Over the Bump - M",
    component_qty: 1,
  },
  {
    bundle_sku: "22770",
    bundle_name:
      "SRC Pregnancy Shorts Over the Bump + Femme Eze Heat & Ice Pack - Black M",
    component_sku: "22537",
    component_name: "SRC Relief Femme-Eze Heat and Ice Pack",
    component_qty: 1,
  },
  {
    bundle_sku: "22771",
    bundle_name:
      "SRC Pregnancy Shorts Over the Bump + Femme Eze Heat & Ice Pack - Black L",
    component_sku: "22259",
    component_name: "SRC Pregnancy Shorts Over the Bump - L",
    component_qty: 1,
  },
  {
    bundle_sku: "22771",
    bundle_name:
      "SRC Pregnancy Shorts Over the Bump + Femme Eze Heat & Ice Pack - Black L",
    component_sku: "22537",
    component_name: "SRC Relief Femme-Eze Heat and Ice Pack",
    component_qty: 1,
  },
  {
    bundle_sku: "22772",
    bundle_name:
      "SRC Pregnancy Shorts Over the Bump + Femme Eze Heat & Ice Pack - Black XL",
    component_sku: "22260",
    component_name: "SRC Pregnancy Shorts Over the Bump - XL",
    component_qty: 1,
  },
  {
    bundle_sku: "22772",
    bundle_name:
      "SRC Pregnancy Shorts Over the Bump + Femme Eze Heat & Ice Pack - Black XL",
    component_sku: "22537",
    component_name: "SRC Relief Femme-Eze Heat and Ice Pack",
    component_qty: 1,
  },
  {
    bundle_sku: "22773",
    bundle_name:
      "SRC Pregnancy Shorts Over the Bump + Femme Eze Heat & Ice Pack - Black XXL",
    component_sku: "22261",
    component_name: "SRC Pregnancy Shorts Over the Bump - XXL",
    component_qty: 1,
  },
  {
    bundle_sku: "22773",
    bundle_name:
      "SRC Pregnancy Shorts Over the Bump + Femme Eze Heat & Ice Pack - Black XXL",
    component_sku: "22537",
    component_name: "SRC Relief Femme-Eze Heat and Ice Pack",
    component_qty: 1,
  },
  {
    bundle_sku: "22774",
    bundle_name:
      "SRC Pregnancy Leggings Over the Bump + Femme Eze Heat & Ice Pack - XXS",
    component_sku: "22320",
    component_name: "SRC Pregnancy Leggings Over the Bump- XXS",
    component_qty: 1,
  },
  {
    bundle_sku: "22774",
    bundle_name:
      "SRC Pregnancy Leggings Over the Bump + Femme Eze Heat & Ice Pack - XXS",
    component_sku: "22537",
    component_name: "SRC Relief Femme-Eze Heat and Ice Pack",
    component_qty: 1,
  },
  {
    bundle_sku: "22775",
    bundle_name:
      "SRC Pregnancy Leggings Over the Bump + Femme Eze Heat & Ice Pack - XS",
    component_sku: "22321",
    component_name: "SRC Pregnancy Leggings Over the Bump- XS",
    component_qty: 1,
  },
  {
    bundle_sku: "22775",
    bundle_name:
      "SRC Pregnancy Leggings Over the Bump + Femme Eze Heat & Ice Pack - XS",
    component_sku: "22537",
    component_name: "SRC Relief Femme-Eze Heat and Ice Pack",
    component_qty: 1,
  },
  {
    bundle_sku: "22776",
    bundle_name:
      "SRC Pregnancy Leggings Over the Bump + Femme Eze Heat & Ice Pack - S",
    component_sku: "22322",
    component_name: "SRC Pregnancy Leggings Over the Bump - S",
    component_qty: 1,
  },
  {
    bundle_sku: "22776",
    bundle_name:
      "SRC Pregnancy Leggings Over the Bump + Femme Eze Heat & Ice Pack - S",
    component_sku: "22537",
    component_name: "SRC Relief Femme-Eze Heat and Ice Pack",
    component_qty: 1,
  },
  {
    bundle_sku: "22777",
    bundle_name:
      "SRC Pregnancy Leggings Over the Bump + Femme Eze Heat & Ice Pack - M",
    component_sku: "22323",
    component_name: "SRC Pregnancy Leggings Over the Bump- M",
    component_qty: 1,
  },
  {
    bundle_sku: "22777",
    bundle_name:
      "SRC Pregnancy Leggings Over the Bump + Femme Eze Heat & Ice Pack - M",
    component_sku: "22537",
    component_name: "SRC Relief Femme-Eze Heat and Ice Pack",
    component_qty: 1,
  },
  {
    bundle_sku: "22778",
    bundle_name:
      "SRC Pregnancy Leggings Over the Bump + Femme Eze Heat & Ice Pack - L",
    component_sku: "22324",
    component_name: "SRC Pregnancy Leggings Over the Bump -L",
    component_qty: 1,
  },
  {
    bundle_sku: "22778",
    bundle_name:
      "SRC Pregnancy Leggings Over the Bump + Femme Eze Heat & Ice Pack - L",
    component_sku: "22537",
    component_name: "SRC Relief Femme-Eze Heat and Ice Pack",
    component_qty: 1,
  },
  {
    bundle_sku: "22779",
    bundle_name:
      "SRC Pregnancy Leggings Over the Bump + Femme Eze Heat & Ice Pack - XL",
    component_sku: "22325",
    component_name: "SRC Pregnancy Leggings Over the Bump - XL",
    component_qty: 1,
  },
  {
    bundle_sku: "22779",
    bundle_name:
      "SRC Pregnancy Leggings Over the Bump + Femme Eze Heat & Ice Pack - XL",
    component_sku: "22537",
    component_name: "SRC Relief Femme-Eze Heat and Ice Pack",
    component_qty: 1,
  },
  {
    bundle_sku: "22780",
    bundle_name:
      "SRC Pregnancy Leggings Over the Bump + Femme Eze Heat & Ice Pack - XXL",
    component_sku: "22326",
    component_name: "SRC Pregnancy Leggings Over the Bump - XXL",
    component_qty: 1,
  },
  {
    bundle_sku: "22780",
    bundle_name:
      "SRC Pregnancy Leggings Over the Bump + Femme Eze Heat & Ice Pack - XXL",
    component_sku: "22537",
    component_name: "SRC Relief Femme-Eze Heat and Ice Pack",
    component_qty: 1,
  },
  {
    bundle_sku: "22781",
    bundle_name:
      "Sabrina Carpenter Sweet Tooth Body Spray 236ml & Eau De Parfum 10ml Duo",
    component_sku: "20789",
    component_name: "Sabrina Carpenter Sweet Tooth Body Mist 236ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22781",
    bundle_name:
      "Sabrina Carpenter Sweet Tooth Body Spray 236ml & Eau De Parfum 10ml Duo",
    component_sku: "22596",
    component_name:
      "Sabrina Carpenter Sweet Tooth Bite Size Eau De Parfum 10ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22782",
    bundle_name:
      "Sabrina Carpenter Cherry Baby Body Spray 236ml & Eau De Parfum 10ml Duo",
    component_sku: "20795",
    component_name: "Sabrina Carpenter Cherry Baby Body Mist 236ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22782",
    bundle_name:
      "Sabrina Carpenter Cherry Baby Body Spray 236ml & Eau De Parfum 10ml Duo",
    component_sku: "22597",
    component_name:
      "Sabrina Carpenter Cherry Baby Bite Size Eau De Parfum 10ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22783",
    bundle_name:
      "Sabrina Carpenter Caramel Dreams Body Spray 236ml & Eau De Parfum 10ml Duo",
    component_sku: "20792",
    component_name: "Sabrina Carpenter Caramel Dreams Body Mist 236ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22783",
    bundle_name:
      "Sabrina Carpenter Caramel Dreams Body Spray 236ml & Eau De Parfum 10ml Duo",
    component_sku: "22598",
    component_name:
      "Sabrina Carpenter Caramel Dreams Bite Size Eau De Parfum 10ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22784",
    bundle_name:
      "Sabrina Carpenter Me Espresso Body Spray 236ml & Eau De Parfum 10ml Duo",
    component_sku: "22319",
    component_name: "Sabrina Carpenter Me Espresso 236ml Body Mist",
    component_qty: 1,
  },
  {
    bundle_sku: "22784",
    bundle_name:
      "Sabrina Carpenter Me Espresso Body Spray 236ml & Eau De Parfum 10ml Duo",
    component_sku: "22599",
    component_name:
      "Sabrina Carpenter Me Espresso Bite Size Eau De Parfum 10ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22785",
    bundle_name:
      "Sabrina Carpenter Sweet Tooth & Cherry Baby 10ml Eau De Parfum Duo",
    component_sku: "22596",
    component_name:
      "Sabrina Carpenter Sweet Tooth Bite Size Eau De Parfum 10ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22785",
    bundle_name:
      "Sabrina Carpenter Sweet Tooth & Cherry Baby 10ml Eau De Parfum Duo",
    component_sku: "22597",
    component_name:
      "Sabrina Carpenter Cherry Baby Bite Size Eau De Parfum 10ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22786",
    bundle_name:
      "Sabrina Carpenter Sweet Tooth & Caramel Dreams 10ml Eau De Parfum Duo",
    component_sku: "22596",
    component_name:
      "Sabrina Carpenter Sweet Tooth Bite Size Eau De Parfum 10ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22786",
    bundle_name:
      "Sabrina Carpenter Sweet Tooth & Caramel Dreams 10ml Eau De Parfum Duo",
    component_sku: "22598",
    component_name:
      "Sabrina Carpenter Caramel Dreams Bite Size Eau De Parfum 10ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22787",
    bundle_name:
      "Sabrina Carpenter Sweet Tooth & Me Espresso 10ml Eau De Parfum Duo",
    component_sku: "22596",
    component_name:
      "Sabrina Carpenter Sweet Tooth Bite Size Eau De Parfum 10ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22787",
    bundle_name:
      "Sabrina Carpenter Sweet Tooth & Me Espresso 10ml Eau De Parfum Duo",
    component_sku: "22599",
    component_name:
      "Sabrina Carpenter Me Espresso Bite Size Eau De Parfum 10ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22788",
    bundle_name:
      "Sabrina Carpenter Cherry Baby & Me Espresso 10ml Eau De Parfum Duo",
    component_sku: "22597",
    component_name:
      "Sabrina Carpenter Cherry Baby Bite Size Eau De Parfum 10ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22788",
    bundle_name:
      "Sabrina Carpenter Cherry Baby & Me Espresso 10ml Eau De Parfum Duo",
    component_sku: "22599",
    component_name:
      "Sabrina Carpenter Me Espresso Bite Size Eau De Parfum 10ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22789",
    bundle_name:
      "Sabrina Carpenter Caramel Dreams & Me Espresso 10ml Eau De Parfum Duo",
    component_sku: "22598",
    component_name:
      "Sabrina Carpenter Caramel Dreams Bite Size Eau De Parfum 10ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22789",
    bundle_name:
      "Sabrina Carpenter Caramel Dreams & Me Espresso 10ml Eau De Parfum Duo",
    component_sku: "22599",
    component_name:
      "Sabrina Carpenter Me Espresso Bite Size Eau De Parfum 10ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22790",
    bundle_name:
      "Sabrina Carpenter Cherry Baby & Caramel Dreams 10ml Eau De Parfum Duo",
    component_sku: "22597",
    component_name:
      "Sabrina Carpenter Cherry Baby Bite Size Eau De Parfum 10ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22790",
    bundle_name:
      "Sabrina Carpenter Cherry Baby & Caramel Dreams 10ml Eau De Parfum Duo",
    component_sku: "22598",
    component_name:
      "Sabrina Carpenter Caramel Dreams Bite Size Eau De Parfum 10ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22867",
    bundle_name:
      "Dermalogica Biolumin - C 59ml Serum & 15ml Eye Serum Duo With FREE Brightening Essentials Duo",
    component_sku: "20505",
    component_name: "Dermalogica Biolumin-C Brightening Essentials GWP",
    component_qty: 1,
  },
  {
    bundle_sku: "22867",
    bundle_name:
      "Dermalogica Biolumin - C 59ml Serum & 15ml Eye Serum Duo With FREE Brightening Essentials Duo",
    component_sku: "7796",
    component_name: "Dermalogica Biolumin-c Serum 59ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22867",
    bundle_name:
      "Dermalogica Biolumin - C 59ml Serum & 15ml Eye Serum Duo With FREE Brightening Essentials Duo",
    component_sku: "7998",
    component_name: "Dermalogica Biolumin-C Eye Serum 15ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22868",
    bundle_name:
      "Dermalogica Skin Smoothing Cream 100ml & Daily Microfoliant 74g Duo With FREE Daily Hydration Duo",
    component_sku: "110631",
    component_name: "Dermalogica Skin Smoothing Cream 100ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22868",
    bundle_name:
      "Dermalogica Skin Smoothing Cream 100ml & Daily Microfoliant 74g Duo With FREE Daily Hydration Duo",
    component_sku: "110700",
    component_name: "Dermalogica Daily Microfoliant 74g",
    component_qty: 1,
  },
  {
    bundle_sku: "22868",
    bundle_name:
      "Dermalogica Skin Smoothing Cream 100ml & Daily Microfoliant 74g Duo With FREE Daily Hydration Duo",
    component_sku: "22508",
    component_name: "Dermalogica Daily Hydration Duo GWP",
    component_qty: 1,
  },
  {
    bundle_sku: "22869",
    bundle_name:
      "Dermalogica Intensive Moisture Balance 100ml & Daily Microfoliant 74g Duo With FREE Daily Hydration Duo",
    component_sku: "110625",
    component_name: "Dermalogica Intensive Moisture Balance 100ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22869",
    bundle_name:
      "Dermalogica Intensive Moisture Balance 100ml & Daily Microfoliant 74g Duo With FREE Daily Hydration Duo",
    component_sku: "110700",
    component_name: "Dermalogica Daily Microfoliant 74g",
    component_qty: 1,
  },
  {
    bundle_sku: "22869",
    bundle_name:
      "Dermalogica Intensive Moisture Balance 100ml & Daily Microfoliant 74g Duo With FREE Daily Hydration Duo",
    component_sku: "22508",
    component_name: "Dermalogica Daily Hydration Duo GWP",
    component_qty: 1,
  },
  {
    bundle_sku: "22870",
    bundle_name:
      "Dermalogica Active Moist 100ml & Daily Microfoliant 74g Duo With FREE Daily Hydration Duo",
    component_sku: "110700",
    component_name: "Dermalogica Daily Microfoliant 74g",
    component_qty: 1,
  },
  {
    bundle_sku: "22870",
    bundle_name:
      "Dermalogica Active Moist 100ml & Daily Microfoliant 74g Duo With FREE Daily Hydration Duo",
    component_sku: "111598",
    component_name: "Dermalogica Active Moist 100ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22870",
    bundle_name:
      "Dermalogica Active Moist 100ml & Daily Microfoliant 74g Duo With FREE Daily Hydration Duo",
    component_sku: "22508",
    component_name: "Dermalogica Daily Hydration Duo GWP",
    component_qty: 1,
  },
  {
    bundle_sku: "22871",
    bundle_name:
      "Dermalogica Skin Smoothing Cream 100ml & Daily Microfoliant 74g Duo With FREE Travel Bag",
    component_sku: "110631",
    component_name: "Dermalogica Skin Smoothing Cream 100ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22871",
    bundle_name:
      "Dermalogica Skin Smoothing Cream 100ml & Daily Microfoliant 74g Duo With FREE Travel Bag",
    component_sku: "110700",
    component_name: "Dermalogica Daily Microfoliant 74g",
    component_qty: 1,
  },
  {
    bundle_sku: "22871",
    bundle_name:
      "Dermalogica Skin Smoothing Cream 100ml & Daily Microfoliant 74g Duo With FREE Travel Bag",
    component_sku: "22509",
    component_name: "Dermalogica Travel Bag GWP",
    component_qty: 1,
  },
  {
    bundle_sku: "22872",
    bundle_name:
      "Dermalogica Intensive Moisture Balance 100ml Daily Microfoliant 74g Duo With FREE Travel Bag",
    component_sku: "110625",
    component_name: "Dermalogica Intensive Moisture Balance 100ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22872",
    bundle_name:
      "Dermalogica Intensive Moisture Balance 100ml Daily Microfoliant 74g Duo With FREE Travel Bag",
    component_sku: "110700",
    component_name: "Dermalogica Daily Microfoliant 74g",
    component_qty: 1,
  },
  {
    bundle_sku: "22872",
    bundle_name:
      "Dermalogica Intensive Moisture Balance 100ml Daily Microfoliant 74g Duo With FREE Travel Bag",
    component_sku: "22509",
    component_name: "Dermalogica Travel Bag GWP",
    component_qty: 1,
  },
  {
    bundle_sku: "22873",
    bundle_name:
      "Dermalogica Active Moist 100ml & Daily Microfoliant 74g Duo With FREE Travel Bag",
    component_sku: "110700",
    component_name: "Dermalogica Daily Microfoliant 74g",
    component_qty: 1,
  },
  {
    bundle_sku: "22873",
    bundle_name:
      "Dermalogica Active Moist 100ml & Daily Microfoliant 74g Duo With FREE Travel Bag",
    component_sku: "111598",
    component_name: "Dermalogica Active Moist 100ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22873",
    bundle_name:
      "Dermalogica Active Moist 100ml & Daily Microfoliant 74g Duo With FREE Travel Bag",
    component_sku: "22509",
    component_name: "Dermalogica Travel Bag GWP",
    component_qty: 1,
  },
  {
    bundle_sku: "22874",
    bundle_name:
      "Dermalogica Daily Microfoliant 74g & Biolumin-C Serum 59ml Duo With FREE Skin Sculpting Tool",
    component_sku: "110700",
    component_name: "Dermalogica Daily Microfoliant 74g",
    component_qty: 1,
  },
  {
    bundle_sku: "22874",
    bundle_name:
      "Dermalogica Daily Microfoliant 74g & Biolumin-C Serum 59ml Duo With FREE Skin Sculpting Tool",
    component_sku: "21684",
    component_name: "Dermalogica Skin Sculpting Tool GWP",
    component_qty: 1,
  },
  {
    bundle_sku: "22874",
    bundle_name:
      "Dermalogica Daily Microfoliant 74g & Biolumin-C Serum 59ml Duo With FREE Skin Sculpting Tool",
    component_sku: "7796",
    component_name: "Dermalogica Biolumin-c Serum 59ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22875",
    bundle_name:
      "Dermalogica Daily Microfoliant 74g & Circular Hydration Serum 30ml With FREE Skin Sculpting Tool",
    component_sku: "110700",
    component_name: "Dermalogica Daily Microfoliant 74g",
    component_qty: 1,
  },
  {
    bundle_sku: "22875",
    bundle_name:
      "Dermalogica Daily Microfoliant 74g & Circular Hydration Serum 30ml With FREE Skin Sculpting Tool",
    component_sku: "11141",
    component_name: "Dermalogica Circular Hydration Serum 30ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22875",
    bundle_name:
      "Dermalogica Daily Microfoliant 74g & Circular Hydration Serum 30ml With FREE Skin Sculpting Tool",
    component_sku: "21684",
    component_name: "Dermalogica Skin Sculpting Tool GWP",
    component_qty: 1,
  },
  {
    bundle_sku: "22876",
    bundle_name:
      "Dermalogica Daily Microfoliant 74g & Multivitamin Power Firm Eye Cream 15ml With FREE Dermalogica Stressed Skin Rescue Kit",
    component_sku: "106053",
    component_name: "Dermalogica Multivitamin Power Firm Eye Cream 15ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22876",
    bundle_name:
      "Dermalogica Daily Microfoliant 74g & Multivitamin Power Firm Eye Cream 15ml With FREE Dermalogica Stressed Skin Rescue Kit",
    component_sku: "110700",
    component_name: "Dermalogica Daily Microfoliant 74g",
    component_qty: 1,
  },
  {
    bundle_sku: "22876",
    bundle_name:
      "Dermalogica Daily Microfoliant 74g & Multivitamin Power Firm Eye Cream 15ml With FREE Dermalogica Stressed Skin Rescue Kit",
    component_sku: "22435",
    component_name: "Dermalogica Stressed Skin Rescue GWP",
    component_qty: 1,
  },
  {
    bundle_sku: "22877",
    bundle_name:
      "Alfaparf Semi Di Lino Moisture Nutritive Shampoo and Mask Duo",
    component_sku: "6469",
    component_name: "Alfaparf Semi Di Lino Moisture Nutritive Shampoo 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22877",
    bundle_name:
      "Alfaparf Semi Di Lino Moisture Nutritive Shampoo and Mask Duo",
    component_sku: "6470",
    component_name: "Alfaparf Semi Di Lino Moisture Nutritive Mask 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22878",
    bundle_name:
      "Alfaparf Lisse Design Keratin Therapy Maintenance Shampoo & Conditioner Duo",
    component_sku: "5702",
    component_name:
      "Alfaparf Lisse Design Keratin Therapy Maintenance Shampoo 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22878",
    bundle_name:
      "Alfaparf Lisse Design Keratin Therapy Maintenance Shampoo & Conditioner Duo",
    component_sku: "5703",
    component_name:
      "Alfaparf Lisse Design Keratin Therapy Maintenance Conditioner 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22879",
    bundle_name: "Alfaparf Semi Di Lino Smooth Shampoo & Conditioner Duo",
    component_sku: "9894",
    component_name: "Alfaparf Semi Di Lino Smooth Conditioner 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22879",
    bundle_name: "Alfaparf Semi Di Lino Smooth Shampoo & Conditioner Duo",
    component_sku: "9899",
    component_name: "Alfaparf Semi Di Lino Smooth Shampoo 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22880",
    bundle_name:
      "Alfaparf Semi Di Lino Scalp RENEW Energize Shampoo & Tonic Duo",
    component_sku: "7682",
    component_name: "Alfaparf Semi Di Lino Scalp RENEW Energize Shampoo 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22880",
    bundle_name:
      "Alfaparf Semi Di Lino Scalp RENEW Energize Shampoo & Tonic Duo",
    component_sku: "7685",
    component_name: "Alfaparf Semi Di Lino Scalp RENEW Energise Tonic 125ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22882",
    bundle_name: "Joico Blonde Life Brightening Shampoo & Conditioner Duo",
    component_sku: "6192",
    component_name: "Joico Blonde Life Brightening Conditioner 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22882",
    bundle_name: "Joico Blonde Life Brightening Shampoo & Conditioner Duo",
    component_sku: "6193",
    component_name: "Joico Blonde Life Brightening Shampoo 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22883",
    bundle_name:
      "Alfaparf Semi Di Lino Travel Size Moisture Nutritive Shampoo & Mask Duo",
    component_sku: "20210",
    component_name: "Alfaparf Semi Di Lino Moisture Shampoo 75ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22883",
    bundle_name:
      "Alfaparf Semi Di Lino Travel Size Moisture Nutritive Shampoo & Mask Duo",
    component_sku: "20211",
    component_name: "Alfaparf Semi Di Lino Moisture Mask 50ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22884",
    bundle_name:
      "Alfaparf Semi Di Lino Moisture Nutritive Shampoo & Diamond Illuminating Conditioner Duo",
    component_sku: "6469",
    component_name: "Alfaparf Semi Di Lino Moisture Nutritive Shampoo 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22884",
    bundle_name:
      "Alfaparf Semi Di Lino Moisture Nutritive Shampoo & Diamond Illuminating Conditioner Duo",
    component_sku: "6475",
    component_name:
      "Alfaparf Semi Di Lino Diamond Illuminating Conditioner 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22885",
    bundle_name:
      "Beauty of Joseon Revive Eye Serum Ginseng + Retinal & Beauty of Joseon Relief Sun Rice + Probiotics SP50+ PA ++++ 50ml Duo",
    component_sku: "21591",
    component_name: "Beauty of Joseon Revive Eye Serum Ginseng + Retinal 30ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22885",
    bundle_name:
      "Beauty of Joseon Revive Eye Serum Ginseng + Retinal & Beauty of Joseon Relief Sun Rice + Probiotics SP50+ PA ++++ 50ml Duo",
    component_sku: "21652",
    component_name:
      "Beauty of Joseon Relief Sun Rice + Probiotics SP50+ PA ++++ 50ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22886",
    bundle_name:
      "Alfaparf Semi Di Lino Moisture Nutritive Shampoo & Diamond Illuminating Shampoo Duo",
    component_sku: "6469",
    component_name: "Alfaparf Semi Di Lino Moisture Nutritive Shampoo 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22886",
    bundle_name:
      "Alfaparf Semi Di Lino Moisture Nutritive Shampoo & Diamond Illuminating Shampoo Duo",
    component_sku: "6474",
    component_name: "Alfaparf Semi Di Lino Diamond Illuminating Shampoo 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22887",
    bundle_name:
      "The Ordinary Matrixyl 10% + HA 30ml & The Ordinary Argireline Solution 10% 30ml Duo",
    component_sku: "5752",
    component_name: "The Ordinary Matrixyl 10% + HA 30ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22887",
    bundle_name:
      "The Ordinary Matrixyl 10% + HA 30ml & The Ordinary Argireline Solution 10% 30ml Duo",
    component_sku: "5987",
    component_name: "The Ordinary Argireline Solution 10% 30ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22888",
    bundle_name: "Joico Moisture Recovery Shampoo & Conditioner Duo",
    component_sku: "6205",
    component_name: "Joico Moisture Recovery Shampoo 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22888",
    bundle_name: "Joico Moisture Recovery Shampoo & Conditioner Duo",
    component_sku: "6206",
    component_name: "Joico Moisture Recovery Conditioner 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22889",
    bundle_name:
      "Alfaparf Semi Di Lino Scalp REBALANCE Purify Shampoo & Alfaparf Semi Di Lino Diamond Illuminating Conditioner Duo",
    component_sku: "6475",
    component_name:
      "Alfaparf Semi Di Lino Diamond Illuminating Conditioner 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22889",
    bundle_name:
      "Alfaparf Semi Di Lino Scalp REBALANCE Purify Shampoo & Alfaparf Semi Di Lino Diamond Illuminating Conditioner Duo",
    component_sku: "7683",
    component_name:
      "Alfaparf Semi Di Lino Scalp REBALANCE Purify Shampoo 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22890",
    bundle_name: "Alfaparf Semi Di Lino Curls Shampoo & Conditioner Duo",
    component_sku: "8713",
    component_name: "Alfaparf Semi Di Lino Curls Low Shampoo 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22890",
    bundle_name: "Alfaparf Semi Di Lino Curls Shampoo & Conditioner Duo",
    component_sku: "8714",
    component_name: "Alfaparf Semi Di Lino Curls Enhancing Conditioner 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22892",
    bundle_name:
      "Alfaparf Semi Di Lino Diamond Illuminating Shampoo & Mask Duo",
    component_sku: "6474",
    component_name: "Alfaparf Semi Di Lino Diamond Illuminating Shampoo 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22892",
    bundle_name:
      "Alfaparf Semi Di Lino Diamond Illuminating Shampoo & Mask Duo",
    component_sku: "6476",
    component_name: "Alfaparf Semi Di Lino Diamond Illuminating Mask 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22893",
    bundle_name:
      "Isoclean Paradise Scented Brush Cleaner Gift Set 525ml & Isoclean Cosmic Scented Brush Cleaner Gift Set 525ml",
    component_sku: "20614",
    component_name: "Isoclean Paradise Scented Brush Cleaner Gift Set 525ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22893",
    bundle_name:
      "Isoclean Paradise Scented Brush Cleaner Gift Set 525ml & Isoclean Cosmic Scented Brush Cleaner Gift Set 525ml",
    component_sku: "20615",
    component_name: "Isoclean Cosmic Scented Brush Cleaner Gift Set 525ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22894",
    bundle_name:
      "Alfaparf Semi Di Lino Moisture Nutritive Shampoo & 500ml Mask Duo",
    component_sku: "6469",
    component_name: "Alfaparf Semi Di Lino Moisture Nutritive Shampoo 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22894",
    bundle_name:
      "Alfaparf Semi Di Lino Moisture Nutritive Shampoo & 500ml Mask Duo",
    component_sku: "8205",
    component_name: "Alfaparf Semi Di Lino Nutritive Mask 500ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22895",
    bundle_name:
      "Alfaparf Lisse Design Keratin Therapy Maintenance Shampoo & Rehydrating Mask Duo",
    component_sku: "12353",
    component_name: "Alfaparf Lisse Design Rehydrating Mask 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22895",
    bundle_name:
      "Alfaparf Lisse Design Keratin Therapy Maintenance Shampoo & Rehydrating Mask Duo",
    component_sku: "5702",
    component_name:
      "Alfaparf Lisse Design Keratin Therapy Maintenance Shampoo 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22896",
    bundle_name: "Joico K-Pak Color Therapy Shampoo & Conditioner Duo",
    component_sku: "6200",
    component_name: "Joico K-Pak Color Therapy Conditioner 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22896",
    bundle_name: "Joico K-Pak Color Therapy Shampoo & Conditioner Duo",
    component_sku: "6246",
    component_name: "Joico K-Pak Color Therapy Shampoo 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22897",
    bundle_name:
      "ISOCLEAN Microfibre Makeup Towel -White & Isoclean Professional Brush Cleaner Gift Set 525ml",
    component_sku: "20124",
    component_name: "ISOCLEAN  Microfibre Makeup Towel -White",
    component_qty: 1,
  },
  {
    bundle_sku: "22897",
    bundle_name:
      "ISOCLEAN Microfibre Makeup Towel -White & Isoclean Professional Brush Cleaner Gift Set 525ml",
    component_sku: "20616",
    component_name: "Isoclean Professional Brush Cleaner Gift Set 525ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22898",
    bundle_name: "Actyva P Factor Hair Loss Shampoo & Scalp Treatment Duo",
    component_sku: "6282",
    component_name: "Actyva P Factor Scalp Hair Loss Treatment 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22898",
    bundle_name: "Actyva P Factor Hair Loss Shampoo & Scalp Treatment Duo",
    component_sku: "6283",
    component_name: "Actyva P Factor Hair Loss Shampoo 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22899",
    bundle_name:
      "Alfaparf Semi Di Lino Reconstruction Reparative Low Shampoo & Anti-Breakage Fluid Duo",
    component_sku: "6465",
    component_name:
      "Alfaparf Semi Di Lino Reconstruction Reparative Low Shampoo 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22899",
    bundle_name:
      "Alfaparf Semi Di Lino Reconstruction Reparative Low Shampoo & Anti-Breakage Fluid Duo",
    component_sku: "6467",
    component_name: "Alfaparf Semi Di Lino Anti Breakage Daily Fluid 125ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22900",
    bundle_name:
      "Beauty of Joseon Glow Serum Propolis + Niacinamide, Revive Eye Serum, Glow Replenishing Rice Milk & Dynasty Cream Bundle",
    component_sku: "21580",
    component_name: "Beauty of Joseon Glow Serum Propolis + Niacinamide 30ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22900",
    bundle_name:
      "Beauty of Joseon Glow Serum Propolis + Niacinamide, Revive Eye Serum, Glow Replenishing Rice Milk & Dynasty Cream Bundle",
    component_sku: "21591",
    component_name: "Beauty of Joseon Revive Eye Serum Ginseng + Retinal 30ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22900",
    bundle_name:
      "Beauty of Joseon Glow Serum Propolis + Niacinamide, Revive Eye Serum, Glow Replenishing Rice Milk & Dynasty Cream Bundle",
    component_sku: "21593",
    component_name: "Beauty of Joseon Glow Replenishing Rice Milk 150ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22900",
    bundle_name:
      "Beauty of Joseon Glow Serum Propolis + Niacinamide, Revive Eye Serum, Glow Replenishing Rice Milk & Dynasty Cream Bundle",
    component_sku: "21854",
    component_name: "Beauty of Joseon Dynasty Cream 50ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22901",
    bundle_name:
      "Beauty of Joseon Glow Serum, Glow Replenishing Rice Milk, Dynasty Cream 50ml & Ground Rice & Honey Glow Mask",
    component_sku: "21580",
    component_name: "Beauty of Joseon Glow Serum Propolis + Niacinamide 30ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22901",
    bundle_name:
      "Beauty of Joseon Glow Serum, Glow Replenishing Rice Milk, Dynasty Cream 50ml & Ground Rice & Honey Glow Mask",
    component_sku: "21593",
    component_name: "Beauty of Joseon Glow Replenishing Rice Milk 150ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22901",
    bundle_name:
      "Beauty of Joseon Glow Serum, Glow Replenishing Rice Milk, Dynasty Cream 50ml & Ground Rice & Honey Glow Mask",
    component_sku: "21854",
    component_name: "Beauty of Joseon Dynasty Cream 50ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22901",
    bundle_name:
      "Beauty of Joseon Glow Serum, Glow Replenishing Rice Milk, Dynasty Cream 50ml & Ground Rice & Honey Glow Mask",
    component_sku: "22034",
    component_name: "Beauty Of Joseon Ground Rice & Honey Glow Mask 150ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22902",
    bundle_name:
      "Beauty of Joseon Green Plum Cleanser, Relief Sun Rice + Probiotics SP50+ PA ++++ 50ml & LANEIGE Lip Sleeping Mask",
    component_sku: "21592",
    component_name: "Beauty of Joseon Green Plum Refreshing Cleanser 100ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22902",
    bundle_name:
      "Beauty of Joseon Green Plum Cleanser, Relief Sun Rice + Probiotics SP50+ PA ++++ 50ml & LANEIGE Lip Sleeping Mask",
    component_sku: "21652",
    component_name:
      "Beauty of Joseon Relief Sun Rice + Probiotics SP50+ PA ++++ 50ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22902",
    bundle_name:
      "Beauty of Joseon Green Plum Cleanser, Relief Sun Rice + Probiotics SP50+ PA ++++ 50ml & LANEIGE Lip Sleeping Mask",
    component_sku: "21681",
    component_name: "LANEIGE Lip Sleeping Mask - Berry 20g",
    component_qty: 1,
  },
  {
    bundle_sku: "22905",
    bundle_name:
      "Beauty of Joseon Glow Serum, Revive Eye Serum, Green Plum Cleanser & Dynasty Cream 50ml Bundle",
    component_sku: "21580",
    component_name: "Beauty of Joseon Glow Serum Propolis + Niacinamide 30ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22905",
    bundle_name:
      "Beauty of Joseon Glow Serum, Revive Eye Serum, Green Plum Cleanser & Dynasty Cream 50ml Bundle",
    component_sku: "21591",
    component_name: "Beauty of Joseon Revive Eye Serum Ginseng + Retinal 30ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22905",
    bundle_name:
      "Beauty of Joseon Glow Serum, Revive Eye Serum, Green Plum Cleanser & Dynasty Cream 50ml Bundle",
    component_sku: "21592",
    component_name: "Beauty of Joseon Green Plum Refreshing Cleanser 100ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22905",
    bundle_name:
      "Beauty of Joseon Glow Serum, Revive Eye Serum, Green Plum Cleanser & Dynasty Cream 50ml Bundle",
    component_sku: "21854",
    component_name: "Beauty of Joseon Dynasty Cream 50ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22906",
    bundle_name:
      "Alfaparf Lisse Design Keratin Therapy Shampoo, Conditioner & Mask Trio",
    component_sku: "12353",
    component_name: "Alfaparf Lisse Design Rehydrating Mask 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22906",
    bundle_name:
      "Alfaparf Lisse Design Keratin Therapy Shampoo, Conditioner & Mask Trio",
    component_sku: "5702",
    component_name:
      "Alfaparf Lisse Design Keratin Therapy Maintenance Shampoo 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22906",
    bundle_name:
      "Alfaparf Lisse Design Keratin Therapy Shampoo, Conditioner & Mask Trio",
    component_sku: "5703",
    component_name:
      "Alfaparf Lisse Design Keratin Therapy Maintenance Conditioner 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22908",
    bundle_name:
      "Alfaparf Semi Di Lino Diamond Illuminating Shampoo, Conditioner & Mask Trio",
    component_sku: "6474",
    component_name: "Alfaparf Semi Di Lino Diamond Illuminating Shampoo 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22908",
    bundle_name:
      "Alfaparf Semi Di Lino Diamond Illuminating Shampoo, Conditioner & Mask Trio",
    component_sku: "6475",
    component_name:
      "Alfaparf Semi Di Lino Diamond Illuminating Conditioner 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22908",
    bundle_name:
      "Alfaparf Semi Di Lino Diamond Illuminating Shampoo, Conditioner & Mask Trio",
    component_sku: "6476",
    component_name: "Alfaparf Semi Di Lino Diamond Illuminating Mask 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22909",
    bundle_name:
      "Alfaparf Semi Di Lino Diamond Illuminating Shampoo, Conditioner & Extraordinary All In One Fluid Trio",
    component_sku: "6474",
    component_name: "Alfaparf Semi Di Lino Diamond Illuminating Shampoo 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22909",
    bundle_name:
      "Alfaparf Semi Di Lino Diamond Illuminating Shampoo, Conditioner & Extraordinary All In One Fluid Trio",
    component_sku: "6475",
    component_name:
      "Alfaparf Semi Di Lino Diamond Illuminating Conditioner 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22909",
    bundle_name:
      "Alfaparf Semi Di Lino Diamond Illuminating Shampoo, Conditioner & Extraordinary All In One Fluid Trio",
    component_sku: "6479",
    component_name:
      "Alfaparf Semi Di Lino Diamond Extraordinary All-In1- Fluid 125ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22910",
    bundle_name:
      "Alfaparf Lisse Design Keratin Therapy Shampoo, Conditioner & Serum Trio",
    component_sku: "12352",
    component_name: "Alfaparf Lisse Design Keratin Refill 100ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22910",
    bundle_name:
      "Alfaparf Lisse Design Keratin Therapy Shampoo, Conditioner & Serum Trio",
    component_sku: "5702",
    component_name:
      "Alfaparf Lisse Design Keratin Therapy Maintenance Shampoo 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22910",
    bundle_name:
      "Alfaparf Lisse Design Keratin Therapy Shampoo, Conditioner & Serum Trio",
    component_sku: "5703",
    component_name:
      "Alfaparf Lisse Design Keratin Therapy Maintenance Conditioner 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22911",
    bundle_name:
      "Alfaparf Semi Di Lino Reconstruction Reparative Shampoo, Mask & Anti-Breakage Fluid Trio",
    component_sku: "6465",
    component_name:
      "Alfaparf Semi Di Lino Reconstruction Reparative Low Shampoo 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22911",
    bundle_name:
      "Alfaparf Semi Di Lino Reconstruction Reparative Shampoo, Mask & Anti-Breakage Fluid Trio",
    component_sku: "6466",
    component_name:
      "Alfaparf Semi Di Lino Reconstruction Reparative Mask 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22911",
    bundle_name:
      "Alfaparf Semi Di Lino Reconstruction Reparative Shampoo, Mask & Anti-Breakage Fluid Trio",
    component_sku: "6467",
    component_name: "Alfaparf Semi Di Lino Anti Breakage Daily Fluid 125ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22912",
    bundle_name:
      "Alfaparf Semi Di Lino Scalp Renew Energize Shampoo, Density Conditioner & Renew Energize Lotions Trio",
    component_sku: "14051",
    component_name:
      "Alfaparf Semi Di Lino Density Thickening Conditioner 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22912",
    bundle_name:
      "Alfaparf Semi Di Lino Scalp Renew Energize Shampoo, Density Conditioner & Renew Energize Lotions Trio",
    component_sku: "7682",
    component_name: "Alfaparf Semi Di Lino Scalp RENEW Energize Shampoo 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22912",
    bundle_name:
      "Alfaparf Semi Di Lino Scalp Renew Energize Shampoo, Density Conditioner & Renew Energize Lotions Trio",
    component_sku: "7689",
    component_name: "Alfaparf Semi Di Lino Scalp RENEW Energize Lotion 12X10ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22913",
    bundle_name:
      "Beauty of Joseon Glow Serum, Glow Replenishing Rice Milk & Dynasty Cream Trio",
    component_sku: "21580",
    component_name: "Beauty of Joseon Glow Serum Propolis + Niacinamide 30ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22913",
    bundle_name:
      "Beauty of Joseon Glow Serum, Glow Replenishing Rice Milk & Dynasty Cream Trio",
    component_sku: "21593",
    component_name: "Beauty of Joseon Glow Replenishing Rice Milk 150ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22913",
    bundle_name:
      "Beauty of Joseon Glow Serum, Glow Replenishing Rice Milk & Dynasty Cream Trio",
    component_sku: "21854",
    component_name: "Beauty of Joseon Dynasty Cream 50ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22914",
    bundle_name:
      "Alfaparf Semi Di Lino Moisture Nutritive Shampoo, Diamond Illuminating Shampoo & Diamond Illuminating Conditioner Trio",
    component_sku: "6469",
    component_name: "Alfaparf Semi Di Lino Moisture Nutritive Shampoo 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22914",
    bundle_name:
      "Alfaparf Semi Di Lino Moisture Nutritive Shampoo, Diamond Illuminating Shampoo & Diamond Illuminating Conditioner Trio",
    component_sku: "6474",
    component_name: "Alfaparf Semi Di Lino Diamond Illuminating Shampoo 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22914",
    bundle_name:
      "Alfaparf Semi Di Lino Moisture Nutritive Shampoo, Diamond Illuminating Shampoo & Diamond Illuminating Conditioner Trio",
    component_sku: "6475",
    component_name:
      "Alfaparf Semi Di Lino Diamond Illuminating Conditioner 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22915",
    bundle_name:
      "Alfaparf Semi Di Lino Moisture Nutritive 250ml Shampoo, 75ml Shampoo & 50ml Mask Trio",
    component_sku: "20210",
    component_name: "Alfaparf Semi Di Lino Moisture Shampoo 75ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22915",
    bundle_name:
      "Alfaparf Semi Di Lino Moisture Nutritive 250ml Shampoo, 75ml Shampoo & 50ml Mask Trio",
    component_sku: "20211",
    component_name: "Alfaparf Semi Di Lino Moisture Mask 50ml",
    component_qty: 1,
  },
  {
    bundle_sku: "22915",
    bundle_name:
      "Alfaparf Semi Di Lino Moisture Nutritive 250ml Shampoo, 75ml Shampoo & 50ml Mask Trio",
    component_sku: "6469",
    component_name: "Alfaparf Semi Di Lino Moisture Nutritive Shampoo 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "4007A",
    bundle_name: "BUNDLE - Dreamgenii Pregnancy Pillow + SPARE Cover",
    component_sku: "4007",
    component_name: "Dreamgenii Pregnancy Pillow",
    component_qty: 1,
  },
  {
    bundle_sku: "4007A",
    bundle_name: "BUNDLE - Dreamgenii Pregnancy Pillow + SPARE Cover",
    component_sku: "4681",
    component_name: "Dreamgenii Pregnancy Pillow Cover - white",
    component_qty: 1,
  },
  {
    bundle_sku: "40548",
    bundle_name: "Carriwell  Seamless Drop Cup Nursing Bra White Small",
    component_sku: "9699",
    component_name:
      "Carriwell Organic Maternity & Nursing Bra Nat. White Small",
    component_qty: 1,
  },
  {
    bundle_sku: "4154a",
    bundle_name: "Pregnancy Planning Kit (10 Free Ovulation Tests) Bundle",
    component_sku: "40977",
    component_name: "Ovulation Tests - 10 Tests",
    component_qty: 2,
  },
  {
    bundle_sku: "4154a",
    bundle_name: "Pregnancy Planning Kit (10 Free Ovulation Tests) Bundle",
    component_sku: "4154",
    component_name: "First Response Pregnancy Test - 2 Tests",
    component_qty: 1,
  },
  {
    bundle_sku: "4154a",
    bundle_name: "Pregnancy Planning Kit (10 Free Ovulation Tests) Bundle",
    component_sku: "4204",
    component_name: "Preseed - Sperm Friendly Lubricant",
    component_qty: 1,
  },
  {
    bundle_sku: "4204a",
    bundle_name: "Pre-Seed Lubricant Duo Limited Time Bundle",
    component_sku: "4204",
    component_name: "Preseed - Sperm Friendly Lubricant",
    component_qty: 2,
  },
  {
    bundle_sku: "5192A",
    bundle_name:
      "3 x Multi-Mam Compresses - Treatment For Breastfeeding Mums Bundle",
    component_sku: "5192",
    component_name: "Multi-Mam Compresses - Treatment For Breastfeeding Mums",
    component_qty: 3,
  },
  {
    bundle_sku: "5193A",
    bundle_name:
      "Buy 2 Get 1 Free Multi-Mam Balm - Nipple Care For Breastfeeding Mums bundle",
    component_sku: "5193",
    component_name: "Multi-Mam Balm - Nipple Care For Breastfeeding Mums",
    component_qty: 3,
  },
  {
    bundle_sku: "5259",
    bundle_name: "Scandinavian Pet Configure Extra Tall Gate bundle",
    component_sku: "5317",
    component_name:
      "BabyDan Extra Tall (105 cm) Configure Gate L 223cm - Black",
    component_qty: 1,
  },
  {
    bundle_sku: "5321",
    bundle_name:
      "BabyDan Extra Tall (105 cm) Configure Gate XL 295cm - Black Bundle",
    component_sku: "5260",
    component_name: "Scandinavian Pet EXTRA TALL Gate Extension 72cm - Black",
    component_qty: 1,
  },
  {
    bundle_sku: "5321",
    bundle_name:
      "BabyDan Extra Tall (105 cm) Configure Gate XL 295cm - Black Bundle",
    component_sku: "5317",
    component_name:
      "BabyDan Extra Tall (105 cm) Configure Gate L 223cm - Black",
    component_qty: 1,
  },
  {
    bundle_sku: "5322",
    bundle_name:
      "BabyDan Extra Tall (105 cm) Configure Gate XXL 367cm - Black Bundle",
    component_sku: "5260",
    component_name: "Scandinavian Pet EXTRA TALL Gate Extension 72cm - Black",
    component_qty: 2,
  },
  {
    bundle_sku: "5322",
    bundle_name:
      "BabyDan Extra Tall (105 cm) Configure Gate XXL 367cm - Black Bundle",
    component_sku: "5317",
    component_name:
      "BabyDan Extra Tall (105 cm) Configure Gate L 223cm - Black",
    component_qty: 1,
  },
  {
    bundle_sku: "5355B",
    bundle_name: "Haakaa PUMP & STOPPER",
    component_sku: "5304",
    component_name: "Haakaa Silicone Breast Pump Flower Stopper - Purple",
    component_qty: 1,
  },
  {
    bundle_sku: "5355B",
    bundle_name: "Haakaa PUMP & STOPPER",
    component_sku: "5355",
    component_name: "Haakaa Silicone Breast Pump with Suction Base 150ml",
    component_qty: 1,
  },
  {
    bundle_sku: "5355C",
    bundle_name: "Haakaa PUMP & CAP",
    component_sku: "5355",
    component_name: "Haakaa Silicone Breast Pump with Suction Base 150ml",
    component_qty: 1,
  },
  {
    bundle_sku: "5355C",
    bundle_name: "Haakaa PUMP & CAP",
    component_sku: "7116",
    component_name: "Haakaa New Silicone Breast Pump Cap - Grey",
    component_qty: 1,
  },
  {
    bundle_sku: "5381",
    bundle_name: "Haakaa Silicone Breast Pump 150ml with Flower Stopper Bundle",
    component_sku: "5304",
    component_name: "Haakaa Silicone Breast Pump Flower Stopper - Purple",
    component_qty: 1,
  },
  {
    bundle_sku: "5381",
    bundle_name: "Haakaa Silicone Breast Pump 150ml with Flower Stopper Bundle",
    component_sku: "5355",
    component_name: "Haakaa Silicone Breast Pump with Suction Base 150ml",
    component_qty: 1,
  },
  {
    bundle_sku: "5384",
    bundle_name: "Haakaa Silicone Breast Pump 150ml with Lid Bundle",
    component_sku: "5303",
    component_name: "Haakaa Silicone Breast Pump Lid (Fits 100ml or 150ml)",
    component_qty: 1,
  },
  {
    bundle_sku: "5384",
    bundle_name: "Haakaa Silicone Breast Pump 150ml with Lid Bundle",
    component_sku: "5355",
    component_name: "Haakaa Silicone Breast Pump with Suction Base 150ml",
    component_qty: 1,
  },
  {
    bundle_sku: "5397",
    bundle_name: "Kerastase Aura Botanica Shampoo & Conditioner Bundle",
    component_sku: "5396",
    component_name: "Kerastase Aura Botanica Bain Micellaire  Shampoo 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "5397",
    bundle_name: "Kerastase Aura Botanica Shampoo & Conditioner Bundle",
    component_sku: "5398",
    component_name: "Kerastase Aura Botanica Soin Fondant Conditioner 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "5692AA",
    bundle_name:
      "Silverette Nursing Cups - The Orginal Cup, Pure 925 Silver - XL (AMAZON)",
    component_sku: "5692A",
    component_name:
      "Silverette Nursing Cups - The Orginal Cup, Pure 925 Silver - XL",
    component_qty: 1,
  },
  {
    bundle_sku: "5742",
    bundle_name: "The InHealth Hospital Bag Bundle",
    component_sku: "10317",
    component_name: "Clevamama Cellular Baby Blanket 70 x 90 cm White",
    component_qty: 1,
  },
  {
    bundle_sku: "5742",
    bundle_name: "The InHealth Hospital Bag Bundle",
    component_sku: "10901",
    component_name: "Clevamama Muslin Cloth Set Super Soft White/Yellow (3Pk)",
    component_qty: 1,
  },
  {
    bundle_sku: "5742",
    bundle_name: "The InHealth Hospital Bag Bundle",
    component_sku: "40182",
    component_name: "Carriwell Hospital Panties - 4 Pack - Washable",
    component_qty: 1,
  },
  {
    bundle_sku: "5742",
    bundle_name: "The InHealth Hospital Bag Bundle",
    component_sku: "41463",
    component_name: "Lansinoh Lanolin Nipple Cream 40g",
    component_qty: 1,
  },
  {
    bundle_sku: "5742",
    bundle_name: "The InHealth Hospital Bag Bundle",
    component_sku: "41467",
    component_name: "Lansinoh Disposable Nursing Pads - 24",
    component_qty: 1,
  },
  {
    bundle_sku: "5742",
    bundle_name: "The InHealth Hospital Bag Bundle",
    component_sku: "5185",
    component_name: "BV Maternity Pads 10 x 30cm - 10 Pack",
    component_qty: 1,
  },
  {
    bundle_sku: "5742",
    bundle_name: "The InHealth Hospital Bag Bundle",
    component_sku: "6215",
    component_name: "Haakaa Silicone Breast Pump 100ml with Suction Base",
    component_qty: 1,
  },
  {
    bundle_sku: "5742",
    bundle_name: "The InHealth Hospital Bag Bundle",
    component_sku: "7116",
    component_name: "Haakaa New Silicone Breast Pump Cap - Grey",
    component_qty: 1,
  },
  {
    bundle_sku: "6153",
    bundle_name: "Fertility Starter Pack for Her Bundle",
    component_sku: "4204",
    component_name: "Preseed - Sperm Friendly Lubricant",
    component_qty: 1,
  },
  {
    bundle_sku: "6153",
    bundle_name: "Fertility Starter Pack for Her Bundle",
    component_sku: "4636",
    component_name: "Pregnacare Conception 30 Tablets",
    component_qty: 1,
  },
  {
    bundle_sku: "6154",
    bundle_name: "Fertility Starter Pack for Him Bundle",
    component_sku: "4217",
    component_name: "Proxeed - Plus 30 x 5g sachets",
    component_qty: 1,
  },
  {
    bundle_sku: "6154",
    bundle_name: "Fertility Starter Pack for Him Bundle",
    component_sku: "5176",
    component_name:
      "SwimCount - Sperm Quality Test - At Home Male Fertility Test",
    component_qty: 1,
  },
  {
    bundle_sku: "6155",
    bundle_name: "Advanced Pregnancy Planning Kit (Gold Package) Bundle",
    component_sku: "4154",
    component_name: "First Response Pregnancy Test - 2 Tests",
    component_qty: 1,
  },
  {
    bundle_sku: "6155",
    bundle_name: "Advanced Pregnancy Planning Kit (Gold Package) Bundle",
    component_sku: "4175",
    component_name: "Digital Basal Thermometer For Fertility Charting",
    component_qty: 1,
  },
  {
    bundle_sku: "6155",
    bundle_name: "Advanced Pregnancy Planning Kit (Gold Package) Bundle",
    component_sku: "4204",
    component_name: "Preseed - Sperm Friendly Lubricant",
    component_qty: 1,
  },
  {
    bundle_sku: "6155",
    bundle_name: "Advanced Pregnancy Planning Kit (Gold Package) Bundle",
    component_sku: "43904",
    component_name: "Clearblue Advanced Digital Ovulation 10 Tests (1 Month)",
    component_qty: 1,
  },
  {
    bundle_sku: "6216",
    bundle_name:
      "Haakaa Silicone Breast Pump 100ml with Suction Base & Lid Bundle",
    component_sku: "5303",
    component_name: "Haakaa Silicone Breast Pump Lid (Fits 100ml or 150ml)",
    component_qty: 1,
  },
  {
    bundle_sku: "6216",
    bundle_name:
      "Haakaa Silicone Breast Pump 100ml with Suction Base & Lid Bundle",
    component_sku: "6215",
    component_name: "Haakaa Silicone Breast Pump 100ml with Suction Base",
    component_qty: 1,
  },
  {
    bundle_sku: "6337A",
    bundle_name: "Birth Ball Bundle with 65cm ball Bundle",
    component_sku: "6338",
    component_name: "Birthing Ball 65cm",
    component_qty: 1,
  },
  {
    bundle_sku: "6337A",
    bundle_name: "Birth Ball Bundle with 65cm ball Bundle",
    component_sku: "6339",
    component_name: "Gymnic Pump for Birthing Ball",
    component_qty: 1,
  },
  {
    bundle_sku: "6337A",
    bundle_name: "Birth Ball Bundle with 65cm ball Bundle",
    component_sku: "6340",
    component_name: "Pregnancy Gymnastics Manual",
    component_qty: 1,
  },
  {
    bundle_sku: "6337B",
    bundle_name: "Birth Ball Bundle with 55cm ball",
    component_sku: "6337",
    component_name: "Birthing Ball 55cm",
    component_qty: 1,
  },
  {
    bundle_sku: "6337B",
    bundle_name: "Birth Ball Bundle with 55cm ball",
    component_sku: "6339",
    component_name: "Gymnic Pump for Birthing Ball",
    component_qty: 1,
  },
  {
    bundle_sku: "6337B",
    bundle_name: "Birth Ball Bundle with 55cm ball",
    component_sku: "6340",
    component_name: "Pregnancy Gymnastics Manual",
    component_qty: 1,
  },
  {
    bundle_sku: "6491",
    bundle_name: "Scandanavian Pet Design Extra Tall Pet Gate White Bundle",
    component_sku: "6490",
    component_name: "Babydan Quick Release Extra Tall Safety Gate White",
    component_qty: 1,
  },
  {
    bundle_sku: "6499",
    bundle_name: "Scandanavian Pet Design Extra Tall Pet Gate Black Bundle",
    component_sku: "6498",
    component_name: "Babydan Quick Release Extra Tall Safety Gate Black",
    component_qty: 1,
  },
  {
    bundle_sku: "6745a",
    bundle_name: "The Ordinary Anti-Ageing Trio (3 x 30ml) Bundle",
    component_sku: "5667",
    component_name: "The Ordinary Buffet 30ml",
    component_qty: 1,
  },
  {
    bundle_sku: "6745a",
    bundle_name: "The Ordinary Anti-Ageing Trio (3 x 30ml) Bundle",
    component_sku: "5673",
    component_name: "The Ordinary Hyaluronic Acid 2% + B5 - 30ml",
    component_qty: 1,
  },
  {
    bundle_sku: "6745a",
    bundle_name: "The Ordinary Anti-Ageing Trio (3 x 30ml) Bundle",
    component_sku: "5752",
    component_name: "The Ordinary Matrixyl 10% + HA 30ml",
    component_qty: 1,
  },
  {
    bundle_sku: "6833",
    bundle_name: "The Ordinary Heroes Bundle",
    component_sku: "5667",
    component_name: "The Ordinary Buffet 30ml",
    component_qty: 1,
  },
  {
    bundle_sku: "6833",
    bundle_name: "The Ordinary Heroes Bundle",
    component_sku: "5670",
    component_name: "The Ordinary Granactive Retinoid 2% Emulsion 30ml",
    component_qty: 1,
  },
  {
    bundle_sku: "6833",
    bundle_name: "The Ordinary Heroes Bundle",
    component_sku: "5673",
    component_name: "The Ordinary Hyaluronic Acid 2% + B5 - 30ml",
    component_qty: 1,
  },
  {
    bundle_sku: "6834",
    bundle_name: "The Ordinary Hydrating Skin Set Bundle",
    component_sku: "5668",
    component_name: "The Ordinary 100% Organic Moroccan Argan Oil - 30ml",
    component_qty: 1,
  },
  {
    bundle_sku: "6834",
    bundle_name: "The Ordinary Hydrating Skin Set Bundle",
    component_sku: "5673",
    component_name: "The Ordinary Hyaluronic Acid 2% + B5 - 30ml",
    component_qty: 1,
  },
  {
    bundle_sku: "6834",
    bundle_name: "The Ordinary Hydrating Skin Set Bundle",
    component_sku: "5759",
    component_name: "The Ordinary 100% Plant-Derived Squalane 30ml",
    component_qty: 1,
  },
  {
    bundle_sku: "6834",
    bundle_name: "The Ordinary Hydrating Skin Set Bundle",
    component_sku: "5985",
    component_name: "The Ordinary AHA 30%+BHA 2% Peeling Solution 30ml",
    component_qty: 1,
  },
  {
    bundle_sku: "6834",
    bundle_name: "The Ordinary Hydrating Skin Set Bundle",
    component_sku: "6754",
    component_name: "The Ordinary Natural Moisturizing Factors + HA - 100ml",
    component_qty: 1,
  },
  {
    bundle_sku: "6835",
    bundle_name: "The Ordinary Acne Treatment Bundle",
    component_sku: "5669",
    component_name: "The Ordinary 100% Organic Rose Hip Seed Oil - 30ml",
    component_qty: 1,
  },
  {
    bundle_sku: "6835",
    bundle_name: "The Ordinary Acne Treatment Bundle",
    component_sku: "5670",
    component_name: "The Ordinary Granactive Retinoid 2% Emulsion 30ml",
    component_qty: 1,
  },
  {
    bundle_sku: "6835",
    bundle_name: "The Ordinary Acne Treatment Bundle",
    component_sku: "5753",
    component_name: "The Ordinary Niacinamide 10% + Zinc 1% 30ml",
    component_qty: 1,
  },
  {
    bundle_sku: "6835",
    bundle_name: "The Ordinary Acne Treatment Bundle",
    component_sku: "6264",
    component_name: "The Ordinary Salicylic Acid 2% Solution - 30ml",
    component_qty: 1,
  },
  {
    bundle_sku: "7600",
    bundle_name: "Zita West - Couples Preconception Support Pack Bundle",
    component_sku: "4290",
    component_name: "Zita West Vital Dha : Men & Women",
    component_qty: 2,
  },
  {
    bundle_sku: "7600",
    bundle_name: "Zita West - Couples Preconception Support Pack Bundle",
    component_sku: "43838",
    component_name: "Zita West - Vitamen",
    component_qty: 1,
  },
  {
    bundle_sku: "7600",
    bundle_name: "Zita West - Couples Preconception Support Pack Bundle",
    component_sku: "4881",
    component_name: "Zita West - Vitafem",
    component_qty: 1,
  },
  {
    bundle_sku: "7671",
    bundle_name: "Babydan New Perfect Close Safety Gate 77.3cm - 83.5cm",
    component_sku: "6032",
    component_name:
      "BabyDan Perfect Close Gate White (77.3cm - 83.5cm; Max 110cm)",
    component_qty: 1,
  },
  {
    bundle_sku: "7783",
    bundle_name: "The Ordinary Routine Starter Pack Bundle",
    component_sku: "5756",
    component_name: "The Ordinary Natural Moisturising Factors + HA 30ml",
    component_qty: 1,
  },
  {
    bundle_sku: "7783",
    bundle_name: "The Ordinary Routine Starter Pack Bundle",
    component_sku: "5988",
    component_name: "The Ordinary Ascorbyl Glucoside Solution 12% 30ml",
    component_qty: 1,
  },
  {
    bundle_sku: "7783",
    bundle_name: "The Ordinary Routine Starter Pack Bundle",
    component_sku: "6188",
    component_name: "The Ordinary Granactive Retinoid 2% in Squalane - 30ml",
    component_qty: 1,
  },
  {
    bundle_sku: "7783",
    bundle_name: "The Ordinary Routine Starter Pack Bundle",
    component_sku: "6728",
    component_name: "The Ordinary Marine Hyaluronics 30ml",
    component_qty: 1,
  },
  {
    bundle_sku: "7783",
    bundle_name: "The Ordinary Routine Starter Pack Bundle",
    component_sku: "7538",
    component_name: "The Ordinary Squalane Cleanser 50ml",
    component_qty: 1,
  },
  {
    bundle_sku: "7784",
    bundle_name: "The Ordinary No-Brainer Bundle",
    component_sku: "5667",
    component_name: "The Ordinary Buffet 30ml",
    component_qty: 1,
  },
  {
    bundle_sku: "7784",
    bundle_name: "The Ordinary No-Brainer Bundle",
    component_sku: "5670",
    component_name: "The Ordinary Granactive Retinoid 2% Emulsion 30ml",
    component_qty: 1,
  },
  {
    bundle_sku: "7784",
    bundle_name: "The Ordinary No-Brainer Bundle",
    component_sku: "5756",
    component_name: "The Ordinary Natural Moisturising Factors + HA 30ml",
    component_qty: 1,
  },
  {
    bundle_sku: "7785",
    bundle_name: "The Ordinary 3 Step Retinol Bundle",
    component_sku: "5757",
    component_name: "The Ordinary Retinol 1% in Squalane 30ml",
    component_qty: 1,
  },
  {
    bundle_sku: "7785",
    bundle_name: "The Ordinary 3 Step Retinol Bundle",
    component_sku: "6260",
    component_name: "The Ordinary Retinol 0.2% in Squalane - 30ml",
    component_qty: 1,
  },
  {
    bundle_sku: "7785",
    bundle_name: "The Ordinary 3 Step Retinol Bundle",
    component_sku: "6261",
    component_name: "The Ordinary Retinol 0.5% in Squalane - 30ml",
    component_qty: 1,
  },
  {
    bundle_sku: "7820",
    bundle_name: "Color Wow Dream Smooth Bundle",
    component_sku: "4976",
    component_name:
      "Color Wow Colour Security Conditioner (Normal/Thick) 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "7820",
    bundle_name: "Color Wow Dream Smooth Bundle",
    component_sku: "7494",
    component_name: "Color Wow Dream Coat 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "7820",
    bundle_name: "Color Wow Dream Smooth Bundle",
    component_sku: "7654",
    component_name: "Color Wow Security Shampoo 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "7822",
    bundle_name: "Color Wow Dream Clean Regime Bundle - Damaged Hair",
    component_sku: "4976",
    component_name:
      "Color Wow Colour Security Conditioner (Normal/Thick) 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "7822",
    bundle_name: "Color Wow Dream Clean Regime Bundle - Damaged Hair",
    component_sku: "7492",
    component_name: "Color Wow Kale Tonic 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "7822",
    bundle_name: "Color Wow Dream Clean Regime Bundle - Damaged Hair",
    component_sku: "7654",
    component_name: "Color Wow Security Shampoo 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "7822",
    bundle_name: "Color Wow Dream Clean Regime Bundle - Damaged Hair",
    component_sku: "7657",
    component_name: "Color Wow Dream Filter 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "7823",
    bundle_name: "Color Wow Dream Clean Regime bundle - For Dry Hair",
    component_sku: "4976",
    component_name:
      "Color Wow Colour Security Conditioner (Normal/Thick) 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "7823",
    bundle_name: "Color Wow Dream Clean Regime bundle - For Dry Hair",
    component_sku: "5032",
    component_name: "Color Wow Coconut Cocktail Bionic Tonic 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "7823",
    bundle_name: "Color Wow Dream Clean Regime bundle - For Dry Hair",
    component_sku: "7654",
    component_name: "Color Wow Security Shampoo 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "7823",
    bundle_name: "Color Wow Dream Clean Regime bundle - For Dry Hair",
    component_sku: "7657",
    component_name: "Color Wow Dream Filter 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "8070",
    bundle_name: "Moroccanoil Hydrating 250ml Bundle with FREE GIFT",
    component_sku: "5881",
    component_name: "Moroccanoil Intense Hydrating Mask Travel Size 75ml",
    component_qty: 1,
  },
  {
    bundle_sku: "8070",
    bundle_name: "Moroccanoil Hydrating 250ml Bundle with FREE GIFT",
    component_sku: "MOR_MO0094",
    component_name: "Moroccanoil - Hydrating Shampoo 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "8070",
    bundle_name: "Moroccanoil Hydrating 250ml Bundle with FREE GIFT",
    component_sku: "MOR_MO0096",
    component_name: "Moroccanoil - Hydrating Conditioner 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "8455",
    bundle_name: "Redken Colour Extend Blondage Bundle",
    component_sku: "7608",
    component_name: "Redken Colour Extend Blondage Shampoo 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "8455",
    bundle_name: "Redken Colour Extend Blondage Bundle",
    component_sku: "7609",
    component_name: "Redken Color Extend Blondage Conditioner 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "8455",
    bundle_name: "Redken Colour Extend Blondage Bundle",
    component_sku: "8490A",
    component_name: "Redken Blondage Mega mask 30ml Sachet",
    component_qty: 1,
  },
  {
    bundle_sku: "8756",
    bundle_name: "Alfaparf Semi Di Lino Curls Gift Set",
    component_sku: "8713",
    component_name: "Alfaparf Semi Di Lino Curls Low Shampoo 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "8756",
    bundle_name: "Alfaparf Semi Di Lino Curls Gift Set",
    component_sku: "8714",
    component_name: "Alfaparf Semi Di Lino Curls Enhancing Conditioner 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "8756",
    bundle_name: "Alfaparf Semi Di Lino Curls Gift Set",
    component_sku: "8717",
    component_name: "Alfaparf Semi Di Lino Curls Defining Cream 125ml",
    component_qty: 1,
  },
  {
    bundle_sku: "8757",
    bundle_name: "Alfaparf Semi Di Lino Volume Gift Set",
    component_sku: "7999",
    component_name: "Alfaparf Semi Di Lino Volumizing Shampoo 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "8757",
    bundle_name: "Alfaparf Semi Di Lino Volume Gift Set",
    component_sku: "8000",
    component_name: "Alfaparf Semi Di Lino Volumizing Spray 125ml",
    component_qty: 1,
  },
  {
    bundle_sku: "8757",
    bundle_name: "Alfaparf Semi Di Lino Volume Gift Set",
    component_sku: "8001",
    component_name: "Alfaparf Semi Di Lino Volumizing Mousse Conditioner 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "8758",
    bundle_name: "Alfaparf Semi Di Lino Reconstruction Gift Set",
    component_sku: "6465",
    component_name:
      "Alfaparf Semi Di Lino Reconstruction Reparative Low Shampoo 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "8758",
    bundle_name: "Alfaparf Semi Di Lino Reconstruction Gift Set",
    component_sku: "6467",
    component_name: "Alfaparf Semi Di Lino Anti Breakage Daily Fluid 125ml",
    component_qty: 1,
  },
  {
    bundle_sku: "8758",
    bundle_name: "Alfaparf Semi Di Lino Reconstruction Gift Set",
    component_sku: "6481A",
    component_name: "Alfaparf Semi Di Lino Diamond Cryst Liquid 15ml",
    component_qty: 1,
  },
  {
    bundle_sku: "8759",
    bundle_name: "Alfaparf Semi Di Lino Moisture Gift Set",
    component_sku: "6469",
    component_name: "Alfaparf Semi Di Lino Moisture Nutritive Shampoo 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "8759",
    bundle_name: "Alfaparf Semi Di Lino Moisture Gift Set",
    component_sku: "6471",
    component_name:
      "Alfaparf Semi Di Lino Moisture Nutritive Leave-In Conditioner 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "8759",
    bundle_name: "Alfaparf Semi Di Lino Moisture Gift Set",
    component_sku: "6481A",
    component_name: "Alfaparf Semi Di Lino Diamond Cryst Liquid 15ml",
    component_qty: 1,
  },
  {
    bundle_sku: "8760",
    bundle_name: "Alfaparf Semi Di Lino Diamond Gift Set",
    component_sku: "6474",
    component_name: "Alfaparf Semi Di Lino Diamond Illuminating Shampoo 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "8760",
    bundle_name: "Alfaparf Semi Di Lino Diamond Gift Set",
    component_sku: "6475",
    component_name:
      "Alfaparf Semi Di Lino Diamond Illuminating Conditioner 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "8760",
    bundle_name: "Alfaparf Semi Di Lino Diamond Gift Set",
    component_sku: "6481A",
    component_name: "Alfaparf Semi Di Lino Diamond Cryst Liquid 15ml",
    component_qty: 1,
  },
  {
    bundle_sku: "8787",
    bundle_name:
      "Color WOW Dream Clean Shampoo & Conditioner (Normal to Thick) Duo Pack",
    component_sku: "4976",
    component_name:
      "Color Wow Colour Security Conditioner (Normal/Thick) 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "8787",
    bundle_name:
      "Color WOW Dream Clean Shampoo & Conditioner (Normal to Thick) Duo Pack",
    component_sku: "7654",
    component_name: "Color Wow Security Shampoo 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "8841",
    bundle_name: "Joico - K-Pak Shampoo & Conditioner Bundle",
    component_sku: "6199",
    component_name: "Joico K-Pak Shampoo For Damaged Hair 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "8841",
    bundle_name: "Joico - K-Pak Shampoo & Conditioner Bundle",
    component_sku: "6201",
    component_name: "Joico K-Pak Conditioner For Damaged Hair 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "8874",
    bundle_name: "Olaplex Shampoo & Conditioner Bundle",
    component_sku: "7179",
    component_name: "Olaplex No.4 Bond Maintenance Shampoo 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "8874",
    bundle_name: "Olaplex Shampoo & Conditioner Bundle",
    component_sku: "7180",
    component_name: "Olaplex No.5 Bond Maintenance Conditioner 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "8875",
    bundle_name: "Olaplex Hero Bundle",
    component_sku: "5183",
    component_name: "OLAPLEX No. 3 Hair Perfector 100ml",
    component_qty: 1,
  },
  {
    bundle_sku: "8875",
    bundle_name: "Olaplex Hero Bundle",
    component_sku: "7179",
    component_name: "Olaplex No.4 Bond Maintenance Shampoo 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "8875",
    bundle_name: "Olaplex Hero Bundle",
    component_sku: "7180",
    component_name: "Olaplex No.5 Bond Maintenance Conditioner 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "8876",
    bundle_name: "Olaplex Ultimate Bundle",
    component_sku: "5183",
    component_name: "OLAPLEX No. 3 Hair Perfector 100ml",
    component_qty: 1,
  },
  {
    bundle_sku: "8876",
    bundle_name: "Olaplex Ultimate Bundle",
    component_sku: "7179",
    component_name: "Olaplex No.4 Bond Maintenance Shampoo 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "8876",
    bundle_name: "Olaplex Ultimate Bundle",
    component_sku: "7180",
    component_name: "Olaplex No.5 Bond Maintenance Conditioner 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "8876",
    bundle_name: "Olaplex Ultimate Bundle",
    component_sku: "7604",
    component_name: "Olaplex No.6 Bond Smoother",
    component_qty: 1,
  },
  {
    bundle_sku: "8876",
    bundle_name: "Olaplex Ultimate Bundle",
    component_sku: "7924",
    component_name: "Olaplex No.7 Bonding Oil 30ml",
    component_qty: 1,
  },
  {
    bundle_sku: "8878",
    bundle_name:
      "BabyDan Premier Pressure Indicator Gate, White (73.5cm - 92.6cm)",
    component_sku: "40744",
    component_name:
      "Babydan Premier True Pressure Fit Safety Gate - White (73.5 - 79.6cm; Max 119.3)",
    component_qty: 1,
  },
  {
    bundle_sku: "8878",
    bundle_name:
      "BabyDan Premier Pressure Indicator Gate, White (73.5cm - 92.6cm)",
    component_sku: "40986",
    component_name: "BabyDan Standard Extend-A-Gate Kit - White (2 x 7 cm)",
    component_qty: 1,
  },
  {
    bundle_sku: "8879",
    bundle_name:
      "BabyDan Premier Pressure Indicator Gate, White (73.5cm - 105.6cm)",
    component_sku: "40744",
    component_name:
      "Babydan Premier True Pressure Fit Safety Gate - White (73.5 - 79.6cm; Max 119.3)",
    component_qty: 1,
  },
  {
    bundle_sku: "8879",
    bundle_name:
      "BabyDan Premier Pressure Indicator Gate, White (73.5cm - 105.6cm)",
    component_sku: "40986",
    component_name: "BabyDan Standard Extend-A-Gate Kit - White (2 x 7 cm)",
    component_qty: 2,
  },
  {
    bundle_sku: "8880",
    bundle_name:
      "BabyDan Premier Pressure Indicator Gate, White (73.5cm - 118.6cm)",
    component_sku: "40744",
    component_name:
      "Babydan Premier True Pressure Fit Safety Gate - White (73.5 - 79.6cm; Max 119.3)",
    component_qty: 1,
  },
  {
    bundle_sku: "8880",
    bundle_name:
      "BabyDan Premier Pressure Indicator Gate, White (73.5cm - 118.6cm)",
    component_sku: "40986",
    component_name: "BabyDan Standard Extend-A-Gate Kit - White (2 x 7 cm)",
    component_qty: 3,
  },
  {
    bundle_sku: "8881",
    bundle_name:
      "BabyDan Premier Pressure Indicator Gate, White (73.5cm - 151.7cm)",
    component_sku: "40744",
    component_name:
      "Babydan Premier True Pressure Fit Safety Gate - White (73.5 - 79.6cm; Max 119.3)",
    component_qty: 1,
  },
  {
    bundle_sku: "8881",
    bundle_name:
      "BabyDan Premier Pressure Indicator Gate, White (73.5cm - 151.7cm)",
    component_sku: "40986",
    component_name: "BabyDan Standard Extend-A-Gate Kit - White (2 x 7 cm)",
    component_qty: 1,
  },
  {
    bundle_sku: "8881",
    bundle_name:
      "BabyDan Premier Pressure Indicator Gate, White (73.5cm - 151.7cm)",
    component_sku: "8877",
    component_name: "BabyDan Premier Extender Panel 64.5cm",
    component_qty: 1,
  },
  {
    bundle_sku: "8882",
    bundle_name:
      "BabyDan Premier Pressure Indicator Gate, White (73.5cm - 93.6cm)",
    component_sku: "40744",
    component_name:
      "Babydan Premier True Pressure Fit Safety Gate - White (73.5 - 79.6cm; Max 119.3)",
    component_qty: 1,
  },
  {
    bundle_sku: "8882",
    bundle_name:
      "BabyDan Premier Pressure Indicator Gate, White (73.5cm - 93.6cm)",
    component_sku: "40986",
    component_name: "BabyDan Standard Extend-A-Gate Kit - White (2 x 7 cm)",
    component_qty: 1,
  },
  {
    bundle_sku: "8883",
    bundle_name:
      "BabyDan Premier Pressure Indicator Gate, Black (73.5cm - 92.6cm)",
    component_sku: "40987",
    component_name: "BabyDan Standard Extend-A-Gate Kit - Black (2 X 7 cm)",
    component_qty: 1,
  },
  {
    bundle_sku: "8883",
    bundle_name:
      "BabyDan Premier Pressure Indicator Gate, Black (73.5cm - 92.6cm)",
    component_sku: "41118",
    component_name:
      "Babydan Premier True Pressure Fit Safety Gate - Black (73.5 - 79.6cm; Max 119.3)",
    component_qty: 1,
  },
  {
    bundle_sku: "8884",
    bundle_name:
      "BabyDan Premier Pressure Indicator Gate, Black (73.5cm - 105.6cm)",
    component_sku: "40987",
    component_name: "BabyDan Standard Extend-A-Gate Kit - Black (2 X 7 cm)",
    component_qty: 2,
  },
  {
    bundle_sku: "8884",
    bundle_name:
      "BabyDan Premier Pressure Indicator Gate, Black (73.5cm - 105.6cm)",
    component_sku: "41118",
    component_name:
      "Babydan Premier True Pressure Fit Safety Gate - Black (73.5 - 79.6cm; Max 119.3)",
    component_qty: 1,
  },
  {
    bundle_sku: "8885",
    bundle_name:
      "BabyDan Premier Pressure Indicator Gate, Black (112cm - 119.3cm)",
    component_sku: "40987",
    component_name: "BabyDan Standard Extend-A-Gate Kit - Black (2 X 7 cm)",
    component_qty: 3,
  },
  {
    bundle_sku: "8885",
    bundle_name:
      "BabyDan Premier Pressure Indicator Gate, Black (112cm - 119.3cm)",
    component_sku: "41118",
    component_name:
      "Babydan Premier True Pressure Fit Safety Gate - Black (73.5 - 79.6cm; Max 119.3)",
    component_qty: 1,
  },
  {
    bundle_sku: "8906",
    bundle_name: "Decleor Eucalyptus Baume & Botanical Oil Bundle",
    component_sku: "7232",
    component_name:
      "Decleor Cica-Botanic Oil Bourrache (Anti-Stretch Marks) 100ml",
    component_qty: 1,
  },
  {
    bundle_sku: "8906",
    bundle_name: "Decleor Eucalyptus Baume & Botanical Oil Bundle",
    component_sku: "7233",
    component_name: "Decleor Cica-Botanic Eucalyptus Balm 50ml",
    component_qty: 1,
  },
  {
    bundle_sku: "8907",
    bundle_name: "Dreamgenii Pregnancy Pillow & Stretch Mark Cream Bundle",
    component_sku: "6442",
    component_name: "Dreamgenii Pregnancy Pillow Nature Green",
    component_qty: 1,
  },
  {
    bundle_sku: "8907",
    bundle_name: "Dreamgenii Pregnancy Pillow & Stretch Mark Cream Bundle",
    component_sku: "7983",
    component_name: "Pregnacare Stretch Mark Cream 100ml",
    component_qty: 1,
  },
  {
    bundle_sku: "8923",
    bundle_name: "Decleor Sun-Kissed Cream & Hydrating Body Milk Bundle",
    component_sku: "7549",
    component_name: "Decleor Sun-Kissed Cream Green Mandarin 50ml",
    component_qty: 1,
  },
  {
    bundle_sku: "8923",
    bundle_name: "Decleor Sun-Kissed Cream & Hydrating Body Milk Bundle",
    component_sku: "8922",
    component_name: "Decleor Aroma Confort Hydrating Body Milk 50ml",
    component_qty: 1,
  },
  {
    bundle_sku: "8965",
    bundle_name:
      "Kérastase Resistance Strengthening Duo for Fine to Medium Hair",
    component_sku: "KER_E046500",
    component_name: "Kerastase Resistance Ciment Anti Usure 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "8965",
    bundle_name:
      "Kérastase Resistance Strengthening Duo for Fine to Medium Hair",
    component_sku: "KER_E057430",
    component_name: "Kerastase Bain De Force Architecte 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "8966",
    bundle_name: "Kerastase Colour Protection Shampoo and Conditioner Bundle",
    component_sku: "KER_E053510",
    component_name: "Kerastase  Bain Chroma Captive 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "8966",
    bundle_name: "Kerastase Colour Protection Shampoo and Conditioner Bundle",
    component_sku: "KER_E053670",
    component_name: "Kerastase Fondant Chromatique 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "8967",
    bundle_name:
      "Kérastase Nutritive Nourish and Hydrate Duo for Medium/Thick Very Dry Hair",
    component_sku: "KER_4401984",
    component_name: "Kerastase Nutritive Lait Vital 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "8967",
    bundle_name:
      "Kérastase Nutritive Nourish and Hydrate Duo for Medium/Thick Very Dry Hair",
    component_sku: "KER_4402082",
    component_name: "Kerastase  Nutritive Bain Satin Riche 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "8968",
    bundle_name: "Kerastase Discipline Shampoo and Conditioner Bundle",
    component_sku: "KER_E1023000",
    component_name: "Kerastase Discipline Bain Fluidealiste 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "8968",
    bundle_name: "Kerastase Discipline Shampoo and Conditioner Bundle",
    component_sku: "KER_E1121000",
    component_name: "Kerastase Discipline Fondant Fluidealiste 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "8969",
    bundle_name: "Redken Colour Extend Blondage Shampoo and Conditioner Bundle",
    component_sku: "7608",
    component_name: "Redken Colour Extend Blondage Shampoo 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "8969",
    bundle_name: "Redken Colour Extend Blondage Shampoo and Conditioner Bundle",
    component_sku: "7609",
    component_name: "Redken Color Extend Blondage Conditioner 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "8970",
    bundle_name: "Redken All Soft Shampoo and Conditioner Bundle",
    component_sku: "REDK_P042480",
    component_name: "Redken - All Soft Shampoo 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "8970",
    bundle_name: "Redken All Soft Shampoo and Conditioner Bundle",
    component_sku: "REDK_P042560",
    component_name: "Redken - All Soft Conditioner 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "8971",
    bundle_name: "Redken Extreme Shampoo and Conditioner Bundle",
    component_sku: "REDK_P027790",
    component_name: "Redken - Extreme Conditioner 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "8971",
    bundle_name: "Redken Extreme Shampoo and Conditioner Bundle",
    component_sku: "REDK_P027970",
    component_name: "Redken - Extreme Shampoo 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "8972",
    bundle_name: "Redken All Soft Shampoo and Conditioner 500ml Bundle",
    component_sku: "5038",
    component_name: "Redken - All Soft Shampoo 500ml",
    component_qty: 1,
  },
  {
    bundle_sku: "8972",
    bundle_name: "Redken All Soft Shampoo and Conditioner 500ml Bundle",
    component_sku: "5039",
    component_name: "Redken - All Soft Conditioner 500ml",
    component_qty: 1,
  },
  {
    bundle_sku: "8985",
    bundle_name: "Decleor Rosemary Bundle",
    component_sku: "8978",
    component_name: "Decleor Rosemary White Clay Daily Care 50ml",
    component_qty: 1,
  },
  {
    bundle_sku: "8985",
    bundle_name: "Decleor Rosemary Bundle",
    component_sku: "8979",
    component_name: "Decleor Rosemary Black Clay Cleansing Gel 100ml",
    component_qty: 1,
  },
  {
    bundle_sku: "8985",
    bundle_name: "Decleor Rosemary Bundle",
    component_sku: "8980",
    component_name: "Decleor Rosemary Active Essence 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "9077",
    bundle_name: "Alfaparf Crystalli Liquidi 30ml Buy 2 Get 1 Free",
    component_sku: "6481",
    component_name: "Alfaparf Semi Di Lino Diamond Cryst Liquid 30Ml",
    component_qty: 3,
  },
  {
    bundle_sku: "9078",
    bundle_name: "Alfaparf Anti Breakage Fluid Buy 2 Get 1 Free",
    component_sku: "6467",
    component_name: "Alfaparf Semi Di Lino Anti Breakage Daily Fluid 125ml",
    component_qty: 3,
  },
  {
    bundle_sku: "9084",
    bundle_name: "Alfaparf Curls Defining Cream Buy 2 Get 1 Free",
    component_sku: "8717",
    component_name: "Alfaparf Semi Di Lino Curls Defining Cream 125ml",
    component_qty: 3,
  },
  {
    bundle_sku: "9085",
    bundle_name: "Alfaparf Volumizing Spray Buy 2 Get 1 Free",
    component_sku: "8000",
    component_name: "Alfaparf Semi Di Lino Volumizing Spray 125ml",
    component_qty: 3,
  },
  {
    bundle_sku: "9087",
    bundle_name: "Alfaparf Semi Di Lino Scalp RENEW Bundle",
    component_sku: "7682",
    component_name: "Alfaparf Semi Di Lino Scalp RENEW Energize Shampoo 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "9087",
    bundle_name: "Alfaparf Semi Di Lino Scalp RENEW Bundle",
    component_sku: "7685",
    component_name: "Alfaparf Semi Di Lino Scalp RENEW Energise Tonic 125ml",
    component_qty: 1,
  },
  {
    bundle_sku: "9087",
    bundle_name: "Alfaparf Semi Di Lino Scalp RENEW Bundle",
    component_sku: "7686",
    component_name:
      "Alfaparf Semi Di Lino Scalp Rebalance Gentle Exfoliating Scrub 150ml",
    component_qty: 1,
  },
  {
    bundle_sku: "9090",
    bundle_name: "Moroccanoil Treatment Oil 100ml + 20ml Free",
    component_sku: "9059",
    component_name: "Moroccanoil Treatment Oil 10ml",
    component_qty: 2,
  },
  {
    bundle_sku: "9090",
    bundle_name: "Moroccanoil Treatment Oil 100ml + 20ml Free",
    component_sku: "MOR_MO0002",
    component_name: "Moroccanoil Treatment - 100ml",
    component_qty: 1,
  },
  {
    bundle_sku: "9091",
    bundle_name: "Moroccanoil Light Treatment Oil 125ml + 20ml Free",
    component_sku: "9058",
    component_name: "Moroccanoil Light Treatment Oil 10ml",
    component_qty: 2,
  },
  {
    bundle_sku: "9091",
    bundle_name: "Moroccanoil Light Treatment Oil 125ml + 20ml Free",
    component_sku: "mor_mo0042",
    component_name: "Moroccanoil light Treatment Oil 125ml",
    component_qty: 1,
  },
  {
    bundle_sku: "9092",
    bundle_name: "Moroccanoil Mending Infusion 75ml + 20ml Free",
    component_sku: "6346",
    component_name: "Moroccanoil Mending Infusion 75ml (Split Ends)",
    component_qty: 1,
  },
  {
    bundle_sku: "9092",
    bundle_name: "Moroccanoil Mending Infusion 75ml + 20ml Free",
    component_sku: "9057",
    component_name: "Moroccanoil Mending Infusion 20ml",
    component_qty: 1,
  },
  {
    bundle_sku: "9229",
    bundle_name: "Alfaparf Semi Di Lino Scalp RENEW Energizing Bundle",
    component_sku: "7682",
    component_name: "Alfaparf Semi Di Lino Scalp RENEW Energize Shampoo 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "9229",
    bundle_name: "Alfaparf Semi Di Lino Scalp RENEW Energizing Bundle",
    component_sku: "7689",
    component_name: "Alfaparf Semi Di Lino Scalp RENEW Energize Lotion 12X10ml",
    component_qty: 1,
  },
  {
    bundle_sku: "9230",
    bundle_name: "Color Wow Heroes Collection with DETOX bag",
    component_sku: "7494",
    component_name: "Color Wow Dream Coat 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "9230",
    bundle_name: "Color Wow Heroes Collection with DETOX bag",
    component_sku: "7657",
    component_name: "Color Wow Dream Filter 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "9230",
    bundle_name: "Color Wow Heroes Collection with DETOX bag",
    component_sku: "7833",
    component_name: "Color Wow Security Shampoo 75ml",
    component_qty: 1,
  },
  {
    bundle_sku: "9230",
    bundle_name: "Color Wow Heroes Collection with DETOX bag",
    component_sku: "7834",
    component_name: "Color Wow Security Conditioner Fine To Normal 75ml",
    component_qty: 1,
  },
  {
    bundle_sku: "9231",
    bundle_name: "Joico Blonde Life Collection with FREE Mask",
    component_sku: "6192",
    component_name: "Joico Blonde Life Brightening Conditioner 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "9231",
    bundle_name: "Joico Blonde Life Collection with FREE Mask",
    component_sku: "6193",
    component_name: "Joico Blonde Life Brightening Shampoo 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "9231",
    bundle_name: "Joico Blonde Life Collection with FREE Mask",
    component_sku: "8283",
    component_name: "Joico Blonde Life Brightening Masque 150ml",
    component_qty: 1,
  },
  {
    bundle_sku: "9450",
    bundle_name: "Decleor Light Day Cream Neroli Bigrade Bundle",
    component_sku: "100049",
    component_name: "Decleor Neroli Bigarade Light Day Cream 50ml",
    component_qty: 1,
  },
  {
    bundle_sku: "9450",
    bundle_name: "Decleor Light Day Cream Neroli Bigrade Bundle",
    component_sku: "9429",
    component_name: "Decleor Strengthening & Hydrating Kit GWP",
    component_qty: 1,
  },
  {
    bundle_sku: "9451",
    bundle_name: "Decleor Baume De Nuit (Night Balm) Neroli Bigarade Bundle",
    component_sku: "100705",
    component_name: "Decleor Baume De Nuit (Night Balm) Neroli Bigarade 15ml",
    component_qty: 1,
  },
  {
    bundle_sku: "9451",
    bundle_name: "Decleor Baume De Nuit (Night Balm) Neroli Bigarade Bundle",
    component_sku: "9429",
    component_name: "Decleor Strengthening & Hydrating Kit GWP",
    component_qty: 1,
  },
  {
    bundle_sku: "9452",
    bundle_name: "Decleor Antidote Serum Bundle",
    component_sku: "7842",
    component_name: "Decleor Antidote Serum 30ml",
    component_qty: 1,
  },
  {
    bundle_sku: "9452",
    bundle_name: "Decleor Antidote Serum Bundle",
    component_sku: "9429",
    component_name: "Decleor Strengthening & Hydrating Kit GWP",
    component_qty: 1,
  },
  {
    bundle_sku: "9631B",
    bundle_name:
      "Loreal Steampod V3 With FREE Steampod Smoothing Treatment 50ml & Kérastase Elixir Ultime 50ml",
    component_sku: "13373",
    component_name:
      "L'Oréal Professionnel SteamPod Professional Smoothing Treatment 50ml",
    component_qty: 1,
  },
  {
    bundle_sku: "9631B",
    bundle_name:
      "Loreal Steampod V3 With FREE Steampod Smoothing Treatment 50ml & Kérastase Elixir Ultime 50ml",
    component_sku: "9631",
    component_name: "L'Oreal Steampod V3 White",
    component_qty: 1,
  },
  {
    bundle_sku: "9632",
    bundle_name: "L'Oreal Steampod V3 White with FREE Kerastase Thermique",
    component_sku: "9631",
    component_name: "L'Oreal Steampod V3 White",
    component_qty: 1,
  },
  {
    bundle_sku: "9632",
    bundle_name: "L'Oreal Steampod V3 White with FREE Kerastase Thermique",
    component_sku: "9653",
    component_name: "Kerastase Resistance Thermique Extentioniste 150ml",
    component_qty: 1,
  },
  {
    bundle_sku: "9656",
    bundle_name: "Joico Defy Damage Sleepover Overnight Bundle",
    component_sku: "7507",
    component_name: "Joico Defy Damage Protective Shield 50ml",
    component_qty: 1,
  },
  {
    bundle_sku: "9656",
    bundle_name: "Joico Defy Damage Sleepover Overnight Bundle",
    component_sku: "9566",
    component_name: "Joico Defy Damage Sleepover Overnight 100ml",
    component_qty: 1,
  },
  {
    bundle_sku: "9661",
    bundle_name: "Actyva Color Brilliante Bundle",
    component_sku: "6278",
    component_name: "Actyva Colore Brillante Shampoo 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "9661",
    bundle_name: "Actyva Color Brilliante Bundle",
    component_sku: "6279",
    component_name: "Actyva Colore Brillante Mask 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "9661",
    bundle_name: "Actyva Color Brilliante Bundle",
    component_sku: "9423",
    component_name: "Actyva Colore Brillante Spray 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "9717",
    bundle_name: "Pureology Pure Hydrate Bundle",
    component_sku: "5048",
    component_name: "Pureology - Pure Hydrate Shampoo 266ml",
    component_qty: 1,
  },
  {
    bundle_sku: "9717",
    bundle_name: "Pureology Pure Hydrate Bundle",
    component_sku: "5053",
    component_name: "Pureology - Pure Hydrate Conditioner 266ml",
    component_qty: 1,
  },
  {
    bundle_sku: "9718",
    bundle_name: "Pureology Super Smooth Bundle",
    component_sku: "5050",
    component_name: "Pureology - Smooth Perfection Shampoo 266ml",
    component_qty: 1,
  },
  {
    bundle_sku: "9718",
    bundle_name: "Pureology Super Smooth Bundle",
    component_sku: "5055",
    component_name: "Pureology - Smooth Perfection Conditioner 266ml",
    component_qty: 1,
  },
  {
    bundle_sku: "9719",
    bundle_name: "Redken Color Extend Blondage Bundle",
    component_sku: "7608",
    component_name: "Redken Colour Extend Blondage Shampoo 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "9719",
    bundle_name: "Redken Color Extend Blondage Bundle",
    component_sku: "7609",
    component_name: "Redken Color Extend Blondage Conditioner 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "9720",
    bundle_name: "Redken Color Extend Blondage Ultimate Bundle",
    component_sku: "7608",
    component_name: "Redken Colour Extend Blondage Shampoo 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "9720",
    bundle_name: "Redken Color Extend Blondage Ultimate Bundle",
    component_sku: "7609",
    component_name: "Redken Color Extend Blondage Conditioner 300ml",
    component_qty: 1,
  },
  {
    bundle_sku: "9720",
    bundle_name: "Redken Color Extend Blondage Ultimate Bundle",
    component_sku: "8490",
    component_name: "Redken Blondage Anti-Brass mask 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "9801",
    bundle_name: "Alfaparf Sensitive Skin Relief Bundle",
    component_sku: "7687",
    component_name: "Alfaparf Semi Di Lino Scalp RELIEF Calming Shampoo 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "9801",
    bundle_name: "Alfaparf Sensitive Skin Relief Bundle",
    component_sku: "7688",
    component_name: "Alfaparf Semi Di Lino Scalp RELIEF Calming Tonic 125ml",
    component_qty: 1,
  },
  {
    bundle_sku: "9802",
    bundle_name: "Alfaparf Rebalance Oily Scalp Bundle",
    component_sku: "7684",
    component_name:
      "Alfaparf Semi Di Lino Scalp REBALANCE Balancing Shampoo 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "9802",
    bundle_name: "Alfaparf Rebalance Oily Scalp Bundle",
    component_sku: "7685",
    component_name: "Alfaparf Semi Di Lino Scalp RENEW Energise Tonic 125ml",
    component_qty: 1,
  },
  {
    bundle_sku: "9803",
    bundle_name: "Alfaparf Curls Shampoo and Co Wash Bundle",
    component_sku: "8713",
    component_name: "Alfaparf Semi Di Lino Curls Low Shampoo 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "9803",
    bundle_name: "Alfaparf Curls Shampoo and Co Wash Bundle",
    component_sku: "8715",
    component_name: "Alfaparf Semi Di Lino Curls Hydrating Co-Wash 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "9804",
    bundle_name: "Alfaparf Curls Hydration Bundle",
    component_sku: "8714",
    component_name: "Alfaparf Semi Di Lino Curls Enhancing Conditioner 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "9804",
    bundle_name: "Alfaparf Curls Hydration Bundle",
    component_sku: "8716",
    component_name: "Alfaparf Semi Di Lino Curls Enhancing Mask 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "9805",
    bundle_name: "Alfaparf Curls Leave-In Bundle",
    component_sku: "8717",
    component_name: "Alfaparf Semi Di Lino Curls Defining Cream 125ml",
    component_qty: 1,
  },
  {
    bundle_sku: "9805",
    bundle_name: "Alfaparf Curls Leave-In Bundle",
    component_sku: "8718",
    component_name: "Alfaparf Semi Di Lino Curls Reactivating Spray 125ml",
    component_qty: 1,
  },
  {
    bundle_sku: "9806",
    bundle_name: "Alfaparf Reconstruction Leave-In Bundle",
    component_sku: "6467",
    component_name: "Alfaparf Semi Di Lino Anti Breakage Daily Fluid 125ml",
    component_qty: 1,
  },
  {
    bundle_sku: "9806",
    bundle_name: "Alfaparf Reconstruction Leave-In Bundle",
    component_sku: "6468",
    component_name:
      "Alfaparf Semi Di Lino Reconstruction Reparative Lotion 6 * 13ml",
    component_qty: 1,
  },
  {
    bundle_sku: "9906",
    bundle_name: "Alfaparf Semi Di Lino Smooth - Ultimate Bundle",
    component_sku: "9894",
    component_name: "Alfaparf Semi Di Lino Smooth Conditioner 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "9906",
    bundle_name: "Alfaparf Semi Di Lino Smooth - Ultimate Bundle",
    component_sku: "9895",
    component_name: "Alfaparf Semi Di Lino Smooth Cream 125ml",
    component_qty: 1,
  },
  {
    bundle_sku: "9906",
    bundle_name: "Alfaparf Semi Di Lino Smooth - Ultimate Bundle",
    component_sku: "9897",
    component_name: "Alfaparf Semi Di Lino Smooth Mask 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "9906",
    bundle_name: "Alfaparf Semi Di Lino Smooth - Ultimate Bundle",
    component_sku: "9898",
    component_name: "Alfaparf Semi Di Lino Smooth Oil 100ml",
    component_qty: 1,
  },
  {
    bundle_sku: "9906",
    bundle_name: "Alfaparf Semi Di Lino Smooth - Ultimate Bundle",
    component_sku: "9899",
    component_name: "Alfaparf Semi Di Lino Smooth Shampoo 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "9907",
    bundle_name: "Alfaparf Semi Di Lino Smooth - Essential Bundle",
    component_sku: "9894",
    component_name: "Alfaparf Semi Di Lino Smooth Conditioner 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "9907",
    bundle_name: "Alfaparf Semi Di Lino Smooth - Essential Bundle",
    component_sku: "9897",
    component_name: "Alfaparf Semi Di Lino Smooth Mask 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "9907",
    bundle_name: "Alfaparf Semi Di Lino Smooth - Essential Bundle",
    component_sku: "9899",
    component_name: "Alfaparf Semi Di Lino Smooth Shampoo 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "9908",
    bundle_name: "Alfaparf Semi Di Lino Smooth - Treatment Bundle",
    component_sku: "9897",
    component_name: "Alfaparf Semi Di Lino Smooth Mask 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "9908",
    bundle_name: "Alfaparf Semi Di Lino Smooth - Treatment Bundle",
    component_sku: "9898",
    component_name: "Alfaparf Semi Di Lino Smooth Oil 100ml",
    component_qty: 1,
  },
  {
    bundle_sku: "9954",
    bundle_name: "Alfaparf Semi Di Lino Diamond - Ultimate Bundle",
    component_sku: "6474",
    component_name: "Alfaparf Semi Di Lino Diamond Illuminating Shampoo 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "9954",
    bundle_name: "Alfaparf Semi Di Lino Diamond - Ultimate Bundle",
    component_sku: "6475",
    component_name:
      "Alfaparf Semi Di Lino Diamond Illuminating Conditioner 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "9954",
    bundle_name: "Alfaparf Semi Di Lino Diamond - Ultimate Bundle",
    component_sku: "6476",
    component_name: "Alfaparf Semi Di Lino Diamond Illuminating Mask 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "9954",
    bundle_name: "Alfaparf Semi Di Lino Diamond - Ultimate Bundle",
    component_sku: "6479",
    component_name:
      "Alfaparf Semi Di Lino Diamond Extraordinary All-In1- Fluid 125ml",
    component_qty: 1,
  },
  {
    bundle_sku: "9954",
    bundle_name: "Alfaparf Semi Di Lino Diamond - Ultimate Bundle",
    component_sku: "6481A",
    component_name: "Alfaparf Semi Di Lino Diamond Cryst Liquid 15ml",
    component_qty: 1,
  },
  {
    bundle_sku: "9954",
    bundle_name: "Alfaparf Semi Di Lino Diamond - Ultimate Bundle",
    component_sku: "6483",
    component_name:
      "Alfaparf Semi Di Lino Cristalli Shine Spray - Illuminating Finish 125ml",
    component_qty: 1,
  },
  {
    bundle_sku: "9955",
    bundle_name: "Alfaparf Semi Di Lino Moisture - Ultimate Bundle",
    component_sku: "6469",
    component_name: "Alfaparf Semi Di Lino Moisture Nutritive Shampoo 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "9955",
    bundle_name: "Alfaparf Semi Di Lino Moisture - Ultimate Bundle",
    component_sku: "6470",
    component_name: "Alfaparf Semi Di Lino Moisture Nutritive Mask 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "9955",
    bundle_name: "Alfaparf Semi Di Lino Moisture - Ultimate Bundle",
    component_sku: "6471",
    component_name:
      "Alfaparf Semi Di Lino Moisture Nutritive Leave-In Conditioner 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "9955",
    bundle_name: "Alfaparf Semi Di Lino Moisture - Ultimate Bundle",
    component_sku: "6472",
    component_name: "Alfaparf Semi Di Lino Moisture Nutritive Lotion 6 * 13ml",
    component_qty: 1,
  },
  {
    bundle_sku: "9955",
    bundle_name: "Alfaparf Semi Di Lino Moisture - Ultimate Bundle",
    component_sku: "6473",
    component_name:
      "Alfaparf Semi Di Lino Moisture Nutritive Detangling Fluid 125ml",
    component_qty: 1,
  },
  {
    bundle_sku: "9955",
    bundle_name: "Alfaparf Semi Di Lino Moisture - Ultimate Bundle",
    component_sku: "6481A",
    component_name: "Alfaparf Semi Di Lino Diamond Cryst Liquid 15ml",
    component_qty: 1,
  },
  {
    bundle_sku: "9956",
    bundle_name: "Alfaparf Semi Di Lino Reconstruction - Ultimate Bundle",
    component_sku: "6465",
    component_name:
      "Alfaparf Semi Di Lino Reconstruction Reparative Low Shampoo 250ml",
    component_qty: 1,
  },
  {
    bundle_sku: "9956",
    bundle_name: "Alfaparf Semi Di Lino Reconstruction - Ultimate Bundle",
    component_sku: "6466",
    component_name:
      "Alfaparf Semi Di Lino Reconstruction Reparative Mask 200ml",
    component_qty: 1,
  },
  {
    bundle_sku: "9956",
    bundle_name: "Alfaparf Semi Di Lino Reconstruction - Ultimate Bundle",
    component_sku: "6467",
    component_name: "Alfaparf Semi Di Lino Anti Breakage Daily Fluid 125ml",
    component_qty: 1,
  },
  {
    bundle_sku: "9956",
    bundle_name: "Alfaparf Semi Di Lino Reconstruction - Ultimate Bundle",
    component_sku: "6468",
    component_name:
      "Alfaparf Semi Di Lino Reconstruction Reparative Lotion 6 * 13ml",
    component_qty: 1,
  },
  {
    bundle_sku: "9956",
    bundle_name: "Alfaparf Semi Di Lino Reconstruction - Ultimate Bundle",
    component_sku: "6481A",
    component_name: "Alfaparf Semi Di Lino Diamond Cryst Liquid 15ml",
    component_qty: 1,
  },
  {
    bundle_sku: "9959",
    bundle_name:
      "The Ordinary Niacinamide 10% + Zinc 1% 30ml - Buy 4 Get 1 FREE",
    component_sku: "5753",
    component_name: "The Ordinary Niacinamide 10% + Zinc 1% 30ml",
    component_qty: 5,
  },
  {
    bundle_sku: "9960",
    bundle_name:
      "The Ordinary Hyaluronic Acid 2% + B5 - 30ml - Buy 4 Get 1 FREE",
    component_sku: "5673",
    component_name: "The Ordinary Hyaluronic Acid 2% + B5 - 30ml",
    component_qty: 5,
  },
  {
    bundle_sku: "9999a",
    bundle_name: "Breastfeeding Essentials Bundle",
    component_sku: "5192",
    component_name: "Multi-Mam Compresses - Treatment For Breastfeeding Mums",
    component_qty: 1,
  },
  {
    bundle_sku: "9999a",
    bundle_name: "Breastfeeding Essentials Bundle",
    component_sku: "5355",
    component_name: "Haakaa Silicone Breast Pump with Suction Base 150ml",
    component_qty: 1,
  },
  {
    bundle_sku: "9999a",
    bundle_name: "Breastfeeding Essentials Bundle",
    component_sku: "6507",
    component_name: "Lansinoh Disposable Nursing Pads 60Pk",
    component_qty: 1,
  },
  {
    bundle_sku: "9999a",
    bundle_name: "Breastfeeding Essentials Bundle",
    component_sku: "7116",
    component_name: "Haakaa New Silicone Breast Pump Cap - Grey",
    component_qty: 1,
  },
  {
    bundle_sku: "BE_1",
    bundle_name: "BeautiEdit -TIME TO GLOW BUNDLE",
    component_sku: "10733",
    component_name: "BeautiEdit Soft Velvet Tanning Mitt",
    component_qty: 1,
  },
  {
    bundle_sku: "BE_1",
    bundle_name: "BeautiEdit -TIME TO GLOW BUNDLE",
    component_sku: "11553",
    component_name:
      "BeautiEdit PRISTINE - Express Self Tanning Mousse / Foam 150ml - Limited Edition",
    component_qty: 1,
  },
  {
    bundle_sku: "BE_1",
    bundle_name: "BeautiEdit -TIME TO GLOW BUNDLE",
    component_sku: "11553B",
    component_name:
      "BeautiEdit - Decadence by Lorraine Keane **Limited Edition**",
    component_qty: 1,
  },
];

/**
 * grab skus from the product manager for now. maybe just better to scan site for products with empty descriptions?
 */
const outstandingProductManagerSKUs: string[] = [
  "22238",
  "22233",
  "22886",
  "22901",
  "22900",
  "22905",
  "22913",
  "22915",
];

const outstandingBundleSKUs = [
  ...new Set(
    outstandingProductManagerSKUs
      .map((sku) => bundleMapping.find((bundle) => bundle.bundle_sku === sku))
      .filter((bundle) => typeof bundle !== "undefined")
      .map((bundle) => bundle.bundle_sku),
  ),
];

const dryRun = false;
const generateContent = false;
const generateImage = true;
const setLive = false;
async function setupBundles() {
  try {
    for (let i = 0; i < outstandingBundleSKUs.length; i++) {
      console.log(i, outstandingBundleSKUs.length);
      const bundleSKU = outstandingBundleSKUs[i];
      const bundleComponents = bundleMapping.filter(
        (mapped) => mapped.bundle_sku === bundleSKU,
      );
      const bundleProduct = await getProductBySku(bundleSKU);
      if (!bundleProduct) continue;

      console.log(
        `preparing setup for ${bundleProduct.id} ${bundleProduct.name} ${bundleProduct.sku}`,
      );
      console.log(
        `https://store-63354.mybigcommerce.com/manage/products/${bundleProduct.id}/edit`,
      );

      const componentContext: {
        qty: number;
        name: string;
        description: string;
      }[] = [];

      const componentThumbnails: string[] = [];
      let missingComponent = false;
      for (const component of bundleComponents) {
        const componentProduct = await getProductBySku(component.component_sku);
        if (!componentProduct) {
          console.log(
            `no component existss with the sku ${component.component_sku}`,
          );
          missingComponent = true;
          break;
        }
        console.log(
          `bundle contains ${componentProduct.id} ${componentProduct.name} ${componentProduct.sku}`,
        );

        const images = await getAllProductImages(componentProduct.id);
        if (!images || !images.length) {
          throw `product ${component.component_sku} has no images`;
        }

        const image = images.find((img) => img.is_thumbnail) || images[0];
        componentThumbnails.push(image.url_standard);

        const { name, description } = componentProduct;
        // `description` is HTML; extract textContent and collapse consecutive whitespace
        const descriptionText = description
          ? (() => {
              const $ = cheerio.load(description);
              return ($.text() || "").replace(/\s+/g, " ").trim();
            })()
          : "";

        componentContext.push({
          qty: component.component_qty,
          name,
          description: descriptionText,
        });
      }
      if (missingComponent) {
        console.log(
          `skipping setup for bundle ${bundleProduct.sku} ${bundleProduct.name}`,
        );
        continue;
      }
      if (generateContent) {
        const componentProductDescriptions = JSON.stringify(componentContext);
        const prompt = beautyfeaturesPrompt(componentProductDescriptions);

        let response = await new OpenAI({
          apiKey: process.env.OPENAI_API_KEY,
        }).chat.completions.create({
          model: "gpt-5.2",
          messages: [
            {
              role: "user",
              content: `You are writing content for a bundle (to be treated as a single product) containing the products in the context. modify the structure accordingly. include a section that explains what is included in the bundle. it makes no sense to provide multiple introductions.${prompt}`,
            },
          ],
        });

        if (!dryRun) {
          await updateProduct(bundleProduct.id, {
            description: await marked(
              response.choices[0].message.content || "",
            ),
          });
        } else {
          console.log(response.choices[0].message.content || "");
        }
      }
      if (generateImage) {
        const input = {
          prompt: `create a bundle product image (product-only or studio shot in the e-commerce industry referred to as a white background image) for a bundle containing these ${bundleComponents.length} products. do not add text or graphics. pleasantly arrange them against a white background.`,
          image_input: componentThumbnails,
        };

        const output = await replicate.run("google/nano-banana-pro", { input });

        // // To access the file URL:
        // console.log(output.url());
        // //=> "https://replicate.delivery/.../output.jpg"

        // To write the file to disk:
        // Replicate may return a ReadableStream in some runtimes; persist it as a Buffer
        const arrayBuffer = await new Response(output as any).arrayBuffer();

        //=> output.jpg written to disk
        if (!dryRun) {
          await createProductImageFromBuffer(
            bundleProduct.id,
            Buffer.from(arrayBuffer),
            bundleProduct.name,
            true,
            0,
          );
        } else {
          await writeFile(
            path.resolve(__dirname, "output.jpg"),
            Buffer.from(arrayBuffer),
          );
        }
      }
      if (setLive && !dryRun) {
        await updateProduct(bundleProduct.id, { is_visible: true });
      }
    }
  } catch (err) {
    console.log(err);
  }
}
setupBundles();

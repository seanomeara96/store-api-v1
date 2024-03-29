require("../../config/config").config("bf");

import { applyCustomField } from "../../functions/custom-fields/applyCustomField";
import { getProductIdByName } from "../../functions/products/getProductIdByName";

const data: any[] = [
  {
    Key: "Skin Concerns",
    Value: "Acne / Blemish",
    "Bioderma Sensibio Gel Moussant / Foaming Gel (Pump) - 200ml": "",
    "Bioderma Sensibio Defensive Active Soothing Cream 40ml": "",
    "Bioderma Sensibio AR Anti Redness Cream 40ml": "",
    "Bioderma Sensibio AR BB Anti Redness Cream 40ml": "",
    "Bioderma Hydrabio Radiance Booster SPF 30 40ml": "",
    "Bioderma Photoderm Max Cream SPF 50+ 40ml": "",
    "Bioderma Photoderm Max Aquafluide SPF 50+ 40ml": "",
    "Bioderma Photoderm Spot Age SPF 50+ 40ml": "",
    "Bioderma Photoderm AR SPF 50+ 30ml": "",
    "Bioderma #FreeFromRedness: Sensibio AR + Sensibio Foaming Gel 500ml": "",
    "Bioderma #FreeFromRedness: Sensibio AR BB + Sensibio AR H2O 250ml": "",
    "Bioderma Pigmentbio Daily Care Spf 50+ 40ml": "",
  },
  {
    Key: "Skin Concerns",
    Value: "Anti Pollution",
    "Bioderma Sensibio Gel Moussant / Foaming Gel (Pump) - 200ml": "X",
    "Bioderma Sensibio Defensive Active Soothing Cream 40ml": "X",
    "Bioderma Sensibio AR Anti Redness Cream 40ml": "",
    "Bioderma Sensibio AR BB Anti Redness Cream 40ml": "",
    "Bioderma Hydrabio Radiance Booster SPF 30 40ml": "",
    "Bioderma Photoderm Max Cream SPF 50+ 40ml": "",
    "Bioderma Photoderm Max Aquafluide SPF 50+ 40ml": "",
    "Bioderma Photoderm Spot Age SPF 50+ 40ml": "",
    "Bioderma Photoderm AR SPF 50+ 30ml": "",
    "Bioderma #FreeFromRedness: Sensibio AR + Sensibio Foaming Gel 500ml": "",
    "Bioderma #FreeFromRedness: Sensibio AR BB + Sensibio AR H2O 250ml": "",
    "Bioderma Pigmentbio Daily Care Spf 50+ 40ml": "",
  },
  {
    Key: "Skin Concerns",
    Value: "Dark Circles",
    "Bioderma Sensibio Gel Moussant / Foaming Gel (Pump) - 200ml": "",
    "Bioderma Sensibio Defensive Active Soothing Cream 40ml": "",
    "Bioderma Sensibio AR Anti Redness Cream 40ml": "",
    "Bioderma Sensibio AR BB Anti Redness Cream 40ml": "",
    "Bioderma Hydrabio Radiance Booster SPF 30 40ml": "",
    "Bioderma Photoderm Max Cream SPF 50+ 40ml": "",
    "Bioderma Photoderm Max Aquafluide SPF 50+ 40ml": "",
    "Bioderma Photoderm Spot Age SPF 50+ 40ml": "",
    "Bioderma Photoderm AR SPF 50+ 30ml": "",
    "Bioderma #FreeFromRedness: Sensibio AR + Sensibio Foaming Gel 500ml": "",
    "Bioderma #FreeFromRedness: Sensibio AR BB + Sensibio AR H2O 250ml": "",
    "Bioderma Pigmentbio Daily Care Spf 50+ 40ml": "",
  },
  {
    Key: "Skin Concerns",
    Value: "Dry Skin",
    "Bioderma Sensibio Gel Moussant / Foaming Gel (Pump) - 200ml": "",
    "Bioderma Sensibio Defensive Active Soothing Cream 40ml": "",
    "Bioderma Sensibio AR Anti Redness Cream 40ml": "",
    "Bioderma Sensibio AR BB Anti Redness Cream 40ml": "",
    "Bioderma Hydrabio Radiance Booster SPF 30 40ml": "X",
    "Bioderma Photoderm Max Cream SPF 50+ 40ml": "X",
    "Bioderma Photoderm Max Aquafluide SPF 50+ 40ml": "",
    "Bioderma Photoderm Spot Age SPF 50+ 40ml": "",
    "Bioderma Photoderm AR SPF 50+ 30ml": "",
    "Bioderma #FreeFromRedness: Sensibio AR + Sensibio Foaming Gel 500ml": "",
    "Bioderma #FreeFromRedness: Sensibio AR BB + Sensibio AR H2O 250ml": "",
    "Bioderma Pigmentbio Daily Care Spf 50+ 40ml": "",
  },
  {
    Key: "Skin Concerns",
    Value: "Dull Skin",
    "Bioderma Sensibio Gel Moussant / Foaming Gel (Pump) - 200ml": "",
    "Bioderma Sensibio Defensive Active Soothing Cream 40ml": "",
    "Bioderma Sensibio AR Anti Redness Cream 40ml": "",
    "Bioderma Sensibio AR BB Anti Redness Cream 40ml": "",
    "Bioderma Hydrabio Radiance Booster SPF 30 40ml": "",
    "Bioderma Photoderm Max Cream SPF 50+ 40ml": "",
    "Bioderma Photoderm Max Aquafluide SPF 50+ 40ml": "",
    "Bioderma Photoderm Spot Age SPF 50+ 40ml": "X",
    "Bioderma Photoderm AR SPF 50+ 30ml": "",
    "Bioderma #FreeFromRedness: Sensibio AR + Sensibio Foaming Gel 500ml": "",
    "Bioderma #FreeFromRedness: Sensibio AR BB + Sensibio AR H2O 250ml": "",
    "Bioderma Pigmentbio Daily Care Spf 50+ 40ml": "X",
  },
  {
    Key: "Skin Concerns",
    Value: "Fine Lines",
    "Bioderma Sensibio Gel Moussant / Foaming Gel (Pump) - 200ml": "",
    "Bioderma Sensibio Defensive Active Soothing Cream 40ml": "",
    "Bioderma Sensibio AR Anti Redness Cream 40ml": "",
    "Bioderma Sensibio AR BB Anti Redness Cream 40ml": "",
    "Bioderma Hydrabio Radiance Booster SPF 30 40ml": "",
    "Bioderma Photoderm Max Cream SPF 50+ 40ml": "",
    "Bioderma Photoderm Max Aquafluide SPF 50+ 40ml": "",
    "Bioderma Photoderm Spot Age SPF 50+ 40ml": "X",
    "Bioderma Photoderm AR SPF 50+ 30ml": "",
    "Bioderma #FreeFromRedness: Sensibio AR + Sensibio Foaming Gel 500ml": "",
    "Bioderma #FreeFromRedness: Sensibio AR BB + Sensibio AR H2O 250ml": "",
    "Bioderma Pigmentbio Daily Care Spf 50+ 40ml": "",
  },
  {
    Key: "Skin Concerns",
    Value: "Hyperpigmentation",
    "Bioderma Sensibio Gel Moussant / Foaming Gel (Pump) - 200ml": "",
    "Bioderma Sensibio Defensive Active Soothing Cream 40ml": "",
    "Bioderma Sensibio AR Anti Redness Cream 40ml": "",
    "Bioderma Sensibio AR BB Anti Redness Cream 40ml": "",
    "Bioderma Hydrabio Radiance Booster SPF 30 40ml": "",
    "Bioderma Photoderm Max Cream SPF 50+ 40ml": "",
    "Bioderma Photoderm Max Aquafluide SPF 50+ 40ml": "",
    "Bioderma Photoderm Spot Age SPF 50+ 40ml": "",
    "Bioderma Photoderm AR SPF 50+ 30ml": "",
    "Bioderma #FreeFromRedness: Sensibio AR + Sensibio Foaming Gel 500ml": "",
    "Bioderma #FreeFromRedness: Sensibio AR BB + Sensibio AR H2O 250ml": "",
    "Bioderma Pigmentbio Daily Care Spf 50+ 40ml": "X",
  },
  {
    Key: "Skin Concerns",
    Value: "Oiliness",
    "Bioderma Sensibio Gel Moussant / Foaming Gel (Pump) - 200ml": "",
    "Bioderma Sensibio Defensive Active Soothing Cream 40ml": "",
    "Bioderma Sensibio AR Anti Redness Cream 40ml": "",
    "Bioderma Sensibio AR BB Anti Redness Cream 40ml": "",
    "Bioderma Hydrabio Radiance Booster SPF 30 40ml": "",
    "Bioderma Photoderm Max Cream SPF 50+ 40ml": "",
    "Bioderma Photoderm Max Aquafluide SPF 50+ 40ml": "",
    "Bioderma Photoderm Spot Age SPF 50+ 40ml": "",
    "Bioderma Photoderm AR SPF 50+ 30ml": "",
    "Bioderma #FreeFromRedness: Sensibio AR + Sensibio Foaming Gel 500ml": "",
    "Bioderma #FreeFromRedness: Sensibio AR BB + Sensibio AR H2O 250ml": "",
    "Bioderma Pigmentbio Daily Care Spf 50+ 40ml": "",
  },
  {
    Key: "Skin Concerns",
    Value: "Pregnancy Safe",
    "Bioderma Sensibio Gel Moussant / Foaming Gel (Pump) - 200ml": "X",
    "Bioderma Sensibio Defensive Active Soothing Cream 40ml": "X",
    "Bioderma Sensibio AR Anti Redness Cream 40ml": "X",
    "Bioderma Sensibio AR BB Anti Redness Cream 40ml": "X",
    "Bioderma Hydrabio Radiance Booster SPF 30 40ml": "X",
    "Bioderma Photoderm Max Cream SPF 50+ 40ml": "X",
    "Bioderma Photoderm Max Aquafluide SPF 50+ 40ml": "X",
    "Bioderma Photoderm Spot Age SPF 50+ 40ml": "X",
    "Bioderma Photoderm AR SPF 50+ 30ml": "X",
    "Bioderma #FreeFromRedness: Sensibio AR + Sensibio Foaming Gel 500ml": "X",
    "Bioderma #FreeFromRedness: Sensibio AR BB + Sensibio AR H2O 250ml": "X",
    "Bioderma Pigmentbio Daily Care Spf 50+ 40ml": "",
  },
  {
    Key: "Skin Concerns",
    Value: "Psoriasis",
    "Bioderma Sensibio Gel Moussant / Foaming Gel (Pump) - 200ml": "",
    "Bioderma Sensibio Defensive Active Soothing Cream 40ml": "",
    "Bioderma Sensibio AR Anti Redness Cream 40ml": "",
    "Bioderma Sensibio AR BB Anti Redness Cream 40ml": "",
    "Bioderma Hydrabio Radiance Booster SPF 30 40ml": "",
    "Bioderma Photoderm Max Cream SPF 50+ 40ml": "",
    "Bioderma Photoderm Max Aquafluide SPF 50+ 40ml": "",
    "Bioderma Photoderm Spot Age SPF 50+ 40ml": "",
    "Bioderma Photoderm AR SPF 50+ 30ml": "",
    "Bioderma #FreeFromRedness: Sensibio AR + Sensibio Foaming Gel 500ml": "",
    "Bioderma #FreeFromRedness: Sensibio AR BB + Sensibio AR H2O 250ml": "",
    "Bioderma Pigmentbio Daily Care Spf 50+ 40ml": "",
  },
  {
    Key: "Skin Concerns",
    Value: "Redness/ Rosacea",
    "Bioderma Sensibio Gel Moussant / Foaming Gel (Pump) - 200ml": "X",
    "Bioderma Sensibio Defensive Active Soothing Cream 40ml": "X",
    "Bioderma Sensibio AR Anti Redness Cream 40ml": "X",
    "Bioderma Sensibio AR BB Anti Redness Cream 40ml": "X",
    "Bioderma Hydrabio Radiance Booster SPF 30 40ml": "",
    "Bioderma Photoderm Max Cream SPF 50+ 40ml": "",
    "Bioderma Photoderm Max Aquafluide SPF 50+ 40ml": "",
    "Bioderma Photoderm Spot Age SPF 50+ 40ml": "",
    "Bioderma Photoderm AR SPF 50+ 30ml": "X",
    "Bioderma #FreeFromRedness: Sensibio AR + Sensibio Foaming Gel 500ml": "X",
    "Bioderma #FreeFromRedness: Sensibio AR BB + Sensibio AR H2O 250ml": "X",
    "Bioderma Pigmentbio Daily Care Spf 50+ 40ml": "",
  },
  {
    Key: "Skin Concerns",
    Value: "Sensitive Skin",
    "Bioderma Sensibio Gel Moussant / Foaming Gel (Pump) - 200ml": "X",
    "Bioderma Sensibio Defensive Active Soothing Cream 40ml": "X",
    "Bioderma Sensibio AR Anti Redness Cream 40ml": "X",
    "Bioderma Sensibio AR BB Anti Redness Cream 40ml": "X",
    "Bioderma Hydrabio Radiance Booster SPF 30 40ml": "",
    "Bioderma Photoderm Max Cream SPF 50+ 40ml": "X",
    "Bioderma Photoderm Max Aquafluide SPF 50+ 40ml": "X",
    "Bioderma Photoderm Spot Age SPF 50+ 40ml": "",
    "Bioderma Photoderm AR SPF 50+ 30ml": "X",
    "Bioderma #FreeFromRedness: Sensibio AR + Sensibio Foaming Gel 500ml": "X",
    "Bioderma #FreeFromRedness: Sensibio AR BB + Sensibio AR H2O 250ml": "X",
    "Bioderma Pigmentbio Daily Care Spf 50+ 40ml": "",
  },
  {
    Key: "Skin Concerns",
    Value: "White / Blackheads",
    "Bioderma Sensibio Gel Moussant / Foaming Gel (Pump) - 200ml": "",
    "Bioderma Sensibio Defensive Active Soothing Cream 40ml": "",
    "Bioderma Sensibio AR Anti Redness Cream 40ml": "",
    "Bioderma Sensibio AR BB Anti Redness Cream 40ml": "",
    "Bioderma Hydrabio Radiance Booster SPF 30 40ml": "",
    "Bioderma Photoderm Max Cream SPF 50+ 40ml": "",
    "Bioderma Photoderm Max Aquafluide SPF 50+ 40ml": "",
    "Bioderma Photoderm Spot Age SPF 50+ 40ml": "",
    "Bioderma Photoderm AR SPF 50+ 30ml": "",
    "Bioderma #FreeFromRedness: Sensibio AR + Sensibio Foaming Gel 500ml": "",
    "Bioderma #FreeFromRedness: Sensibio AR BB + Sensibio AR H2O 250ml": "",
    "Bioderma Pigmentbio Daily Care Spf 50+ 40ml": "",
  },
  {
    Key: "Key Ingredients",
    Value: "Antioxidants",
    "Bioderma Sensibio Gel Moussant / Foaming Gel (Pump) - 200ml": "",
    "Bioderma Sensibio Defensive Active Soothing Cream 40ml": "",
    "Bioderma Sensibio AR Anti Redness Cream 40ml": "",
    "Bioderma Sensibio AR BB Anti Redness Cream 40ml": "",
    "Bioderma Hydrabio Radiance Booster SPF 30 40ml": "",
    "Bioderma Photoderm Max Cream SPF 50+ 40ml": "",
    "Bioderma Photoderm Max Aquafluide SPF 50+ 40ml": "",
    "Bioderma Photoderm Spot Age SPF 50+ 40ml": "",
    "Bioderma Photoderm AR SPF 50+ 30ml": "",
    "Bioderma #FreeFromRedness: Sensibio AR + Sensibio Foaming Gel 500ml": "",
    "Bioderma #FreeFromRedness: Sensibio AR BB + Sensibio AR H2O 250ml": "",
    "Bioderma Pigmentbio Daily Care Spf 50+ 40ml": "",
  },
  {
    Key: "Key Ingredients",
    Value: "Glycolic Acid",
    "Bioderma Sensibio Gel Moussant / Foaming Gel (Pump) - 200ml": "",
    "Bioderma Sensibio Defensive Active Soothing Cream 40ml": "",
    "Bioderma Sensibio AR Anti Redness Cream 40ml": "",
    "Bioderma Sensibio AR BB Anti Redness Cream 40ml": "",
    "Bioderma Hydrabio Radiance Booster SPF 30 40ml": "",
    "Bioderma Photoderm Max Cream SPF 50+ 40ml": "",
    "Bioderma Photoderm Max Aquafluide SPF 50+ 40ml": "",
    "Bioderma Photoderm Spot Age SPF 50+ 40ml": "",
    "Bioderma Photoderm AR SPF 50+ 30ml": "",
    "Bioderma #FreeFromRedness: Sensibio AR + Sensibio Foaming Gel 500ml": "",
    "Bioderma #FreeFromRedness: Sensibio AR BB + Sensibio AR H2O 250ml": "",
    "Bioderma Pigmentbio Daily Care Spf 50+ 40ml": "",
  },
  {
    Key: "Key Ingredients",
    Value: "Hyaluronic Acid",
    "Bioderma Sensibio Gel Moussant / Foaming Gel (Pump) - 200ml": "",
    "Bioderma Sensibio Defensive Active Soothing Cream 40ml": "",
    "Bioderma Sensibio AR Anti Redness Cream 40ml": "",
    "Bioderma Sensibio AR BB Anti Redness Cream 40ml": "",
    "Bioderma Hydrabio Radiance Booster SPF 30 40ml": "",
    "Bioderma Photoderm Max Cream SPF 50+ 40ml": "",
    "Bioderma Photoderm Max Aquafluide SPF 50+ 40ml": "",
    "Bioderma Photoderm Spot Age SPF 50+ 40ml": "",
    "Bioderma Photoderm AR SPF 50+ 30ml": "",
    "Bioderma #FreeFromRedness: Sensibio AR + Sensibio Foaming Gel 500ml": "",
    "Bioderma #FreeFromRedness: Sensibio AR BB + Sensibio AR H2O 250ml": "",
    "Bioderma Pigmentbio Daily Care Spf 50+ 40ml": "",
  },
  {
    Key: "Key Ingredients",
    Value: "Retinol",
    "Bioderma Sensibio Gel Moussant / Foaming Gel (Pump) - 200ml": "",
    "Bioderma Sensibio Defensive Active Soothing Cream 40ml": "",
    "Bioderma Sensibio AR Anti Redness Cream 40ml": "",
    "Bioderma Sensibio AR BB Anti Redness Cream 40ml": "",
    "Bioderma Hydrabio Radiance Booster SPF 30 40ml": "",
    "Bioderma Photoderm Max Cream SPF 50+ 40ml": "",
    "Bioderma Photoderm Max Aquafluide SPF 50+ 40ml": "",
    "Bioderma Photoderm Spot Age SPF 50+ 40ml": "",
    "Bioderma Photoderm AR SPF 50+ 30ml": "",
    "Bioderma #FreeFromRedness: Sensibio AR + Sensibio Foaming Gel 500ml": "",
    "Bioderma #FreeFromRedness: Sensibio AR BB + Sensibio AR H2O 250ml": "",
    "Bioderma Pigmentbio Daily Care Spf 50+ 40ml": "",
  },
  {
    Key: "Key Ingredients",
    Value: "Salicylic Acid",
    "Bioderma Sensibio Gel Moussant / Foaming Gel (Pump) - 200ml": "",
    "Bioderma Sensibio Defensive Active Soothing Cream 40ml": "",
    "Bioderma Sensibio AR Anti Redness Cream 40ml": "",
    "Bioderma Sensibio AR BB Anti Redness Cream 40ml": "",
    "Bioderma Hydrabio Radiance Booster SPF 30 40ml": "",
    "Bioderma Photoderm Max Cream SPF 50+ 40ml": "",
    "Bioderma Photoderm Max Aquafluide SPF 50+ 40ml": "",
    "Bioderma Photoderm Spot Age SPF 50+ 40ml": "",
    "Bioderma Photoderm AR SPF 50+ 30ml": "",
    "Bioderma #FreeFromRedness: Sensibio AR + Sensibio Foaming Gel 500ml": "",
    "Bioderma #FreeFromRedness: Sensibio AR BB + Sensibio AR H2O 250ml": "",
    "Bioderma Pigmentbio Daily Care Spf 50+ 40ml": "",
  },
  {
    Key: "Key Ingredients",
    Value: "Vegan",
    "Bioderma Sensibio Gel Moussant / Foaming Gel (Pump) - 200ml": "",
    "Bioderma Sensibio Defensive Active Soothing Cream 40ml": "",
    "Bioderma Sensibio AR Anti Redness Cream 40ml": "",
    "Bioderma Sensibio AR BB Anti Redness Cream 40ml": "",
    "Bioderma Hydrabio Radiance Booster SPF 30 40ml": "",
    "Bioderma Photoderm Max Cream SPF 50+ 40ml": "",
    "Bioderma Photoderm Max Aquafluide SPF 50+ 40ml": "",
    "Bioderma Photoderm Spot Age SPF 50+ 40ml": "",
    "Bioderma Photoderm AR SPF 50+ 30ml": "",
    "Bioderma #FreeFromRedness: Sensibio AR + Sensibio Foaming Gel 500ml": "",
    "Bioderma #FreeFromRedness: Sensibio AR BB + Sensibio AR H2O 250ml": "",
    "Bioderma Pigmentbio Daily Care Spf 50+ 40ml": "",
  },
  {
    Key: "Key Ingredients",
    Value: "Vitamin C",
    "Bioderma Sensibio Gel Moussant / Foaming Gel (Pump) - 200ml": "",
    "Bioderma Sensibio Defensive Active Soothing Cream 40ml": "",
    "Bioderma Sensibio AR Anti Redness Cream 40ml": "",
    "Bioderma Sensibio AR BB Anti Redness Cream 40ml": "",
    "Bioderma Hydrabio Radiance Booster SPF 30 40ml": "",
    "Bioderma Photoderm Max Cream SPF 50+ 40ml": "",
    "Bioderma Photoderm Max Aquafluide SPF 50+ 40ml": "",
    "Bioderma Photoderm Spot Age SPF 50+ 40ml": "",
    "Bioderma Photoderm AR SPF 50+ 30ml": "",
    "Bioderma #FreeFromRedness: Sensibio AR + Sensibio Foaming Gel 500ml": "",
    "Bioderma #FreeFromRedness: Sensibio AR BB + Sensibio AR H2O 250ml": "",
    "Bioderma Pigmentbio Daily Care Spf 50+ 40ml": "X",
  },
  {
    Key: "Skin Type",
    Value: "Dry Skin",
    "Bioderma Sensibio Gel Moussant / Foaming Gel (Pump) - 200ml": "",
    "Bioderma Sensibio Defensive Active Soothing Cream 40ml": "",
    "Bioderma Sensibio AR Anti Redness Cream 40ml": "",
    "Bioderma Sensibio AR BB Anti Redness Cream 40ml": "",
    "Bioderma Hydrabio Radiance Booster SPF 30 40ml": "X",
    "Bioderma Photoderm Max Cream SPF 50+ 40ml": "X",
    "Bioderma Photoderm Max Aquafluide SPF 50+ 40ml": "",
    "Bioderma Photoderm Spot Age SPF 50+ 40ml": "X",
    "Bioderma Photoderm AR SPF 50+ 30ml": "",
    "Bioderma #FreeFromRedness: Sensibio AR + Sensibio Foaming Gel 500ml": "",
    "Bioderma #FreeFromRedness: Sensibio AR BB + Sensibio AR H2O 250ml": "",
    "Bioderma Pigmentbio Daily Care Spf 50+ 40ml": "",
  },
  {
    Key: "Skin Type",
    Value: "Dull Skin",
    "Bioderma Sensibio Gel Moussant / Foaming Gel (Pump) - 200ml": "",
    "Bioderma Sensibio Defensive Active Soothing Cream 40ml": "",
    "Bioderma Sensibio AR Anti Redness Cream 40ml": "",
    "Bioderma Sensibio AR BB Anti Redness Cream 40ml": "",
    "Bioderma Hydrabio Radiance Booster SPF 30 40ml": "X",
    "Bioderma Photoderm Max Cream SPF 50+ 40ml": "X",
    "Bioderma Photoderm Max Aquafluide SPF 50+ 40ml": "",
    "Bioderma Photoderm Spot Age SPF 50+ 40ml": "X",
    "Bioderma Photoderm AR SPF 50+ 30ml": "",
    "Bioderma #FreeFromRedness: Sensibio AR + Sensibio Foaming Gel 500ml": "",
    "Bioderma #FreeFromRedness: Sensibio AR BB + Sensibio AR H2O 250ml": "",
    "Bioderma Pigmentbio Daily Care Spf 50+ 40ml": "X",
  },
  {
    Key: "Skin Type",
    Value: "Normal & Combination",
    "Bioderma Sensibio Gel Moussant / Foaming Gel (Pump) - 200ml": "",
    "Bioderma Sensibio Defensive Active Soothing Cream 40ml": "",
    "Bioderma Sensibio AR Anti Redness Cream 40ml": "",
    "Bioderma Sensibio AR BB Anti Redness Cream 40ml": "",
    "Bioderma Hydrabio Radiance Booster SPF 30 40ml": "",
    "Bioderma Photoderm Max Cream SPF 50+ 40ml": "",
    "Bioderma Photoderm Max Aquafluide SPF 50+ 40ml": "X",
    "Bioderma Photoderm Spot Age SPF 50+ 40ml": "",
    "Bioderma Photoderm AR SPF 50+ 30ml": "",
    "Bioderma #FreeFromRedness: Sensibio AR + Sensibio Foaming Gel 500ml": "",
    "Bioderma #FreeFromRedness: Sensibio AR BB + Sensibio AR H2O 250ml": "",
    "Bioderma Pigmentbio Daily Care Spf 50+ 40ml": "",
  },
  {
    Key: "Skin Type",
    Value: "Sensitive Skin",
    "Bioderma Sensibio Gel Moussant / Foaming Gel (Pump) - 200ml": "X",
    "Bioderma Sensibio Defensive Active Soothing Cream 40ml": "X",
    "Bioderma Sensibio AR Anti Redness Cream 40ml": "X",
    "Bioderma Sensibio AR BB Anti Redness Cream 40ml": "X",
    "Bioderma Hydrabio Radiance Booster SPF 30 40ml": "",
    "Bioderma Photoderm Max Cream SPF 50+ 40ml": "X",
    "Bioderma Photoderm Max Aquafluide SPF 50+ 40ml": "X",
    "Bioderma Photoderm Spot Age SPF 50+ 40ml": "",
    "Bioderma Photoderm AR SPF 50+ 30ml": "X",
    "Bioderma #FreeFromRedness: Sensibio AR + Sensibio Foaming Gel 500ml": "X",
    "Bioderma #FreeFromRedness: Sensibio AR BB + Sensibio AR H2O 250ml": "X",
    "Bioderma Pigmentbio Daily Care Spf 50+ 40ml": "",
  },
];

(async function () {
  for (const field of data) {
    const products = Object.keys(field).filter(
      (name) => name !== "Key" && name !== "Value"
    );
    for (const product of products) {
      if (field[product].toLowerCase() === "x") {
        const id = await getProductIdByName(product.trim()).catch(console.log);
        if (!id || typeof id !== "number")
          return console.log("failed to fetch ID");
        const res = await applyCustomField(id, field.Key, field.Value).catch((err) =>
          console.log(err)
        );
        console.log(
          `${field.Key}=${field.Value} was ${
            res ? "" : "not "
          }added to ${product}`
        );
      }
    }
  }
})();

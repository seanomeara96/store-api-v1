/* 
This file is a work in progress.
Turning this project into a proper bigcommerce client
*/

import axios, { AxiosInstance } from "axios";
import { Banners } from "../functions/banners/getAllBanners";
import { Products } from "./products";
import { Categories } from "./categories";
import { Brands } from "./brands";
import { Blogs } from "./blogs";

export class Client {
  private clientV2: AxiosInstance;
  private clientV3: AxiosInstance;
  banners: Banners;
  products: Products;
  categories: Categories;
  brands: Brands;
  blogs: Blogs;

  constructor(storeHash: string, storeToken: string) {
    const headers = { "x-auth-token": storeToken };

    this.clientV3 = axios.create({
      baseURL: `https://api.bigcommerce.com/stores/${storeHash}/v${3}`,
      headers,
    });

    this.clientV2 = axios.create({
      baseURL: `https://api.bigcommerce.com/stores/${storeHash}/v${2}`,
      headers,
    });
    
    this.products = new Products(this.clientV3);
    this.categories = new Categories(this.clientV3);
    this.banners = new Banners(this.clientV2);
    this.blogs = new Blogs(this.clientV3);
    this.brands = new Brands(this.clientV3);
    // this.content = new Content(this.clientV3);
    // this.coupons = new Coupons(this.clientV3);
    // this.customFields = new CustomFields(this.clientV3);
    // this.orders = new Orders(this.clientV3);
    // this.pages = new Pages(this.clientV3);
    // this.redirects = new Redirects(this.clientV3);
    // this.reviews = new Reviews(this.clientV3);
    // this.shipping = new getShippingMethod(this.clientV3);
    // this.sites  = new Sites(this.clientV3)
  }
}

function store(storeInitials: string): Client {
  if (typeof storeInitials !== "string") {
    throw new Error(
      `Must supply store initials of type string. Recieved type ${typeof storeInitials} instead...`
    );
  }

  storeInitials = storeInitials.toUpperCase();
  const storeToken = process.env[`${storeInitials}_XAUTHTOKEN`];
  const storeHash = process.env[`${storeInitials}_STORE_HASH`];

  if (!storeHash || !storeToken) {
    throw new Error(
      `You Dont Have keys for store wih initials of ${storeInitials}`
    );
  }

  return new Client(storeHash, storeToken);
}

const beautyfeatures = store("bf");

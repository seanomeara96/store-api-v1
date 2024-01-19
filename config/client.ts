/* 
This file is a work in progress.
Turning this project into a proper bigcommerce client
*/

import axios, { AxiosInstance } from "axios";
import { Banners } from "../functions/banners/getAllBanners";
import { CreateProductVariantOptionParams } from "../functions/product-variant-options/ProductVariantOption";
import { NewImageParams } from "../functions/products/createProduct";
import { ProductImages } from "../functions/images/ProductImages";
import { ProductVariants } from "../functions/product-variants/ProductVariant";
import { ProductVideos } from "../functions/videos/ProductVideos";
import {
  Category,
  CategoryCreationParams,
} from "../functions/categories/createCategory";
import { BrandCreationParams } from "../functions/brands/createBrand";
import { Brand } from "../functions/brands/Brand";

export class Client {
  private client: AxiosInstance;
  private clientV2: AxiosInstance;
  private clientV3: AxiosInstance;
  banners: Banners;
  products: Products;
  categories: Categories;
  brands: Brands;

  constructor(storeHash: string, storeToken: string) {
    this.clientV3 = axios.create({
      baseURL: `https://api.bigcommerce.com/stores/${storeHash}/v${3}`,
      headers: { "x-auth-token": storeToken },
    });

    this.clientV2 = axios.create({
      baseURL: `https://api.bigcommerce.com/stores/${storeHash}/v${2}`,
      headers: { "x-auth-token": storeToken },
    });

    this.client = this.clientV3;

    this.products = new Products(this.client);
    this.categories = new Categories(this.client);
    this.banners = new Banners(this.clientV2);
    // this.blogs = new Blogs(this.client);
    this.brands = new Brands(this.client);
    // this.content = new Content(this.client);
    // this.coupons = new Coupons(this.client);
    // this.customFields = new CustomFields(this.client);
    // this.orders = new Orders(this.client);
    // this.pages = new Pages(this.client);
    // this.redirects = new Redirects(this.client);
    // this.reviews = new Reviews(this.client);
    // this.shipping = new getShippingMethod(this.client);
    // this.sites  = new Sites(this.client)
  }
}

/**
 * Products
 */
class Products {
  private client: AxiosInstance;
  variants: ProductVariants;
  images: ProductImages;
  videos: ProductVideos;

  constructor(client: AxiosInstance) {
    this.client = client;
    this.images = new ProductImages(this.client);
    this.videos = new ProductVideos(this.client);
    this.variants = new ProductVariants(this.client);
  }

  async getAll(product_id: number) {
    try {
      const path = `/catalog/products/${product_id}/options`;
      const res = await this.client.get(path);
      return res.data.data;
    } catch (err) {
      throw err;
    }
  }

  async create(product_id: number, params: CreateProductVariantOptionParams) {
    try {
      const path = `/catalog/products/${product_id}/options`;
      const res = await this.client.post(path, params);
      return res.data.data;
    } catch (err) {
      throw err;
    }
  }
}

/**
 * categories
 */
class Categories {
  private client: AxiosInstance;

  constructor(client: AxiosInstance) {
    this.client = client;
  }

  async getById(category_id: number): Promise<Category> {
    try {
      const res = await this.client.get(`/catalog/categories/${category_id}`);
      return res.data.data;
    } catch (err) {
      throw err;
    }
  }

  async getMany(params: any): Promise<Category[]> {
    try {
      const res = await this.client.get("/catalog/categories", { params });
      return res.data.data;
    } catch (err) {
      throw err;
    }
  }

  async getAll(params: any) {
    params.page = 1;

    if (!params.limit) {
      params.limit = 250;
    }

    const all = [];
    while (true) {
      const batch = await this.getMany({
        ...params,
        page: params.page,
        limit: params.limit,
      });
      if (!batch.length) {
        return all;
      }
      all.push(...batch);
      params.page++;
    }
  }

  // need typed update params
  async update(catId: number, fieldToUpdate: any) {
    try {
      const path = `/catalog/categories/${catId}`;
      const res = await this.client.put(path, fieldToUpdate);
      return res.data.data;
    } catch (err) {
      throw err;
    }
  }

  async create(params: CategoryCreationParams): Promise<Category> {
    try {
      const res = await this.client.post(`/catalog/categories`, params);
      return res.data.data;
    } catch (err) {
      throw err;
    }
  }

  async delete(category_id: number) {
    try {
      const path = `/catalog/categories/${category_id}`;
      await this.client.delete(path);
    } catch (err) {
      throw err;
    }
  }
}

class Brands {
  private client: AxiosInstance;

  constructor(client: AxiosInstance) {
    this.client = client;
  }

  async create(params: BrandCreationParams): Promise<Brand> {
    try {
      const res = await this.client.post(`/catalog/brands`, params);
      return res.data.data;
    } catch (err) {
      throw err;
    }
  }

  async update(brand_id: number, params: any): Promise<Brand> {
    try {
      const res = await this.client.put(`/catalog/brands/${brand_id}`, params);
      return res.data.data;
    } catch (err) {
      throw err;
    }
  }

  async get(brand_id: number) {
    try {
      const res = await this.client.get(`/catalog/brands/${brand_id}`);
      return res.data.data;
    } catch (err) {
      throw err;
    }
  }
  async getMany(params: any): Promise<Brand[]> {
    try {
      const res = await this.client.get("/catalog/brands/", { params });
      return res.data.data;
    } catch (err) {
      throw err;
    }
  }

  async getAll(params: any) {
    try {
      const all = [];
      let page = 1;

      if (!params.limit || params.limit == 0) {
        params.limit = 250;
      }

      while (true) {
        const batch = await this.getMany({
          params: {
            limit: 250,
            page: page,
            ...params,
          },
        });

        if (batch.length) {
          all.push(...batch);
          page++;
          continue;
        } else {
          return all;
        }
      }
    } catch (err) {
      throw err;
    }
  }

  async delete(brand_id: number) {
    try {
      await this.client.delete(`/catalog/brands/${brand_id}`);
    } catch (err) {
      throw err;
    }
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

let s = store("bf");

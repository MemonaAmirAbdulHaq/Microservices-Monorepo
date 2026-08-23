import { CACHE_MANAGER } from "@nestjs/cache-manager";
import {
  Inject, Injectable
} from '@nestjs/common';
import type { Cache } from 'cache-manager';
import { products } from "./fake-db";

@Injectable()
export class AppService {
  constructor(
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}
  async getProduct(id: number){
    const cacheKey = `product:${id}`;
    const cachedProduct = await this.cacheManager.get(cacheKey);
    if(cachedProduct){
      console.log('Cache Hit')
      return cachedProduct;
    }
    console.log('Cache Miss')
    const product = products.find((item) => item.id === id)
    await this.cacheManager.set(
      cacheKey,
      product
    );
    return product;
  }

  async updateProduct(
    id: number,
    price: number
  ) {
    const product = products.find((item) => item.id === id)
    if(!product){
      return {
        message: 'Product Not Found!'
      }
    }
    product.price = price;
    await this.cacheManager.set(
      `product:${id}`,
      product
    );
    console.log('Cache Updated')
    return {
      message: 'Product Updated Successfully!',
      product
    }
  }
}
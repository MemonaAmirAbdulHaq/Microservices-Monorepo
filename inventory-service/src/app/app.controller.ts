import { Controller } from '@nestjs/common';

import { GrpcMethod } from '@nestjs/microservices';

@Controller()
export class AppController {
 @GrpcMethod('InventoryService', 'CheckStock')
 checkStock(data: { productId: string }) {
   // Implementation for checking stock

   const items:Record<string,number>={
    '123':50,'456':0};

    const qty=items[data.productId] || 0;
    return {
      availableQuantity:qty,
      inStock:qty>0,

    }  
  }
}

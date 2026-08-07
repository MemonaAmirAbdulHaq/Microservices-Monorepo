//===========For Auth User Service Validation========================
// import { Controller, Get ,Inject,Param} from '@nestjs/common';
// import { ClientProxy } from '@nestjs/microservices';
// import { firstValueFrom } from 'rxjs';
// @Controller('orders')
// export class AppController {
//   constructor(@Inject('AUTH_SERVICE') private readonly authClient: ClientProxy,
//   ) {}

//   @Get(':id')
//   async createOrder(@Param('id') userId: string) {
//   const pattern={cmd:'validate_user'};
//   const payload={userId:Number(userId)};
//   const authResponse=await firstValueFrom(this.authClient.send(pattern,payload));
//   if(authResponse.status==='success'){
//     return {
//       message:'Order created successfully ',
//       user:authResponse.user
//     }
//   }
//   return {message:'Order creation failed',reason:authResponse.message}
// }
 
// }


import {Controller,Get,Inject,OnModuleInit, Query} from '@nestjs/common';
import { lastValueFrom, Observable } from 'rxjs';
import { ClientGrpc } from '@nestjs/microservices';

interface InventoryService{
  checkStock(data:{productId:string}) : Observable<any>;
}
@Controller('order')
export class AppController implements OnModuleInit {
  private inventoryService!:InventoryService;
  constructor(@Inject('INVENTORY_PACKAGE') private client:ClientGrpc ) {};

  //jab application load hugi tab kiya karna hai
  onModuleInit() {
    this.inventoryService = this.client.getService<InventoryService>('InventoryService');
  }
 //yahan hum http get request ko handle karein ge
  @Get('check-item')
  async checkItem(@Query('pid') pid: string) {
    const stockStatus = await lastValueFrom(this.inventoryService.checkStock({ productId: pid }));
   if(stockStatus.inStock){
    return {status:'Available',quantity:stockStatus.availableQuantity}
   }
   return {status:'Out pf Stock'}
  }

}



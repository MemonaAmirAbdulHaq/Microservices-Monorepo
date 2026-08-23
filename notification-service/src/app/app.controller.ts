import { Controller, Inject, OnModuleInit } from "@nestjs/common";

import { ClientKafka, EventPattern, Payload } from "@nestjs/microservices";

@Controller()
export class AppController implements OnModuleInit{
  constructor(
    @Inject('KAFKA_SERVICE')
    private readonly kafkaClient : ClientKafka,
  ) {};
  async onModuleInit(){
    await this.kafkaClient.connect();
  }
  @EventPattern('user_created')
  async handleUserCreated(@Payload() data: any){
    try {
      console.log('Main Event Recieved!')
      console.log(data);
      throw new Error('Payment Service Failed!');
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.log('Sending Event to DLQ');
      this.kafkaClient.emit('user_created_dlq', {
        failedData: data,
        error: errorMessage,
        failedAt: new Date()
      })
    }
  }
  @EventPattern('user_created_dlq')
  handleDLQ(@Payload() data: any){
    console.log('dlq event received!')
    console.log(data)
  }
}








//============Code for Implement Kafka ================
// import { Controller } from "@nestjs/common";

// import {  EventPattern, Payload } from "@nestjs/microservices";

// @Controller()
// export class AppController {
//   @EventPattern('user_created')
//    handleUserCreated(@Payload() data: any){
   
//       console.log('Main Event Recieved!')
//       console.log(data)  
    
//   }
  
// }
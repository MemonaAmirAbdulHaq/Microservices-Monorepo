import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import Consul from 'consul';
async function bootstrap() {
 const app = await NestFactory.create(AppModule);
 const port =3005;
 const consul = new Consul({
   host: 'localhost',
   port: 8500,
  
 });

 const serviceId='payment-unique-id-1';
 const registrationDetails={
  name:'payment-service',
  address:'172.30.224.1',
  port:port,
  id:serviceId,
  check:{
    name:'payment-service-health',
    http:`http://172.30.224.1:${port}/api/health`,
    interval:'10s',
    timeout:'5s'
    
  }
 }
 
 await consul.agent.service.register(registrationDetails);
 process.on('SIGINT',async()=>{
  await consul.agent.service.deregister(serviceId);
  process.exit();
 })
 await app.listen(port);
 console.log(`Payment Service is Running ${port} registered in consul`)
}

bootstrap();

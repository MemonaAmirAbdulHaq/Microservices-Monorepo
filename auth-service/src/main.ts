
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import {MicroserviceOptions, Transport} from '@nestjs/microservices';
async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,{
      transport: Transport.TCP,
       options:{
        host:'127.0.0.1',
        port:5005,
       }
    }
  )
  await app.listen();
  console.log('Auth Microservices is listening via TCP...')
 

}

bootstrap();

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';


@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'INVENTORY_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'inventory',
          protoPath:join(process.cwd(),'libs/proto/inventory.proto'),
        }
      }
    ])
  ],
  controllers: [AppController],
  
})
export class AppModule {}





//=========SERVICE MODULES FOR AUTHENTICATION SERVICE=========
// import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
// import { ClientsModule, Transport } from '@nestjs/microservices';


// @Module({
//   imports: [
//     ClientsModule.register([
//       {
//         name: 'AUTH_SERVICE',
//         transport: Transport.TCP,
//         options: {
//           host: '127.0.0.1',
//           port:5005,
//         }
//       }
//     ])
//   ],
//   controllers: [AppController],
//   providers: [AppService],
// })
// export class AppModule {}



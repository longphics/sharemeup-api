import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PrismaModule } from './prisma/prisma.module';
import { ItemsModule } from './items/items.module';
import { CategoriesModule } from './categories/categories.module';
import { StoresModule } from './stores/stores.module';
import { UserModule } from './user/user.module';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    ItemsModule,
    CategoriesModule,
    StoresModule,
    UserModule,
    OrdersModule,
  ],
})
export class AppModule {}

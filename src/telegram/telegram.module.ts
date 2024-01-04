import { Module } from '@nestjs/common';
import { TelegrafModule } from 'nestjs-telegraf';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TelegramService } from './telegram.service';
import { TelegramController } from './telegram.controller';
import { ENTITY } from './pg';

@Module({
  imports: [
    TelegrafModule.forRoot({
      token: '6095806646:AAEf6BmgwfM-i20gnkCK5SjgN0MY9ohMGcE',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '0302',
      database: 'kursovaya',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    TypeOrmModule.forFeature(ENTITY),
  ],
  providers: [TelegramService, TelegramController],
})
export class TelegramModule {}

import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ENTITY } from 'src/telegram/pg';

@Module({
  imports: [TypeOrmModule.forFeature(ENTITY),],
  controllers: [AdminController],
  providers: [AdminService]
})
export class AdminModule {}
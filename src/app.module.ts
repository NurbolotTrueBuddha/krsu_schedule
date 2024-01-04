import { Module } from '@nestjs/common';
import { TelegramModule } from './telegram/telegram.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [TelegramModule, AdminModule]
})
export class AppModule {}

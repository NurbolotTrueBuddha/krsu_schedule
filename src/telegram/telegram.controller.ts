import { Context, Telegraf } from 'telegraf';
import { Hears, InjectBot, Start, Update } from 'nestjs-telegraf';
import { TelegramService } from './telegram.service';

@Update()
export class TelegramController {
  constructor(
    @InjectBot() private readonly bot: Telegraf<Context>,
    private readonly service: TelegramService,
  ) {}

  @Start()
  async startCommand(ctx: Context) {
    await ctx.reply(`Привет великий ${ctx.message.from.username}`);
  }

  @Hears(/^login/i)
  async login(ctx: Context) {
    return await this.service.login(ctx.message);
  }

  @Hears('today')
  async todaySchedule(ctx: Context) {
    const data = await this.service.getTodayLessons(ctx.message);
    await ctx.reply(data);
  }
}

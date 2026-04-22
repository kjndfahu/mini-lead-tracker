import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './infrastructure/prisma/prisma.module';
import { LeadsModule } from './modules/leads/leads.module';
import { CommentsModule } from './modules/comments/comments.module';
import envConfig from './config/env.config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [envConfig] }),
    PrismaModule,
    LeadsModule,
    CommentsModule,
  ],
})
export class AppModule {}

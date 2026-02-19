import { Controller, Get, Query, Post, Body } from '@nestjs/common';
import { PrismaRawService } from './prisma-raw.service';

@Controller('debug/raw')
export class PrismaRawController {
  constructor(private readonly raw: PrismaRawService) {}

  @Get('user-by-email')
  async userByEmail(@Query('email') email: string) {
    return this.raw.findUserByEmail(email);
  }

  @Get('user-count')
  async userCount() {
    return { count: await this.raw.countUsers() };
  }

  @Post('update-name')
  async updateName(@Body() body: { id: string; name: string }) {
    const affected = await this.raw.updateUserName(body.id, body.name);
    return { affected };
  }
}

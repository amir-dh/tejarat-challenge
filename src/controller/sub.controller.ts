import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Req, UseGuards } from '@nestjs/common';
import { SubService } from 'src/services/sub.service';
import subRequest from 'src/model/sub.request.model';
import { AuthGuard } from 'src/configs/auth.guard';
import { Request } from 'express';

@Controller('subscription')
export class SubController {
  constructor(private readonly subService: SubService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() subRequest: subRequest, @Req() req: Request): any {
    return this.subService.create(subRequest, req);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  delete(@Param('id', new ParseIntPipe()) id: number, @Req() req: Request): any {
    return this.subService.delete(id, req);
  }

  @UseGuards(AuthGuard)
  @Get()
  getAll(@Req() req: Request): any {
    return this.subService.getAll(req);
  }

}

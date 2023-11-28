import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { PlanService } from 'src/services/plan.service';
import planRequest from 'src/model/plan.request.model';
import { AuthGuard } from 'src/auth.guard';

@Controller('plan')
export class PlanController {
  constructor(private readonly planService: PlanService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() planRequest: planRequest): any {
    return this.planService.create(planRequest);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  update(@Param('id', new ParseIntPipe()) id: number, @Body() planRequest: planRequest): any {
    return this.planService.update(id, planRequest);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  delete(@Param('id', new ParseIntPipe()) id: number): any {
    return this.planService.delete(id);
  }

  @UseGuards(AuthGuard)
  @Get()
  getAll(): any {
    return this.planService.getAll();
  }

}

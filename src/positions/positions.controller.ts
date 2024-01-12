import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatePositionDto } from './dto/create-position.dto';
import { UpdatePositionDto } from './dto/update-position.dto';
import { PositionsService } from './positions.service';
import { PaginationDto } from 'src/shared/dto/paginatedDto/paginatedDto';
import { Roles } from 'src/role/role.decorator';

@ApiTags('Positions module')
@ApiBearerAuth()
@Controller('positions')
export class PositionsController {
  constructor(private positionsService: PositionsService) {}

  @ApiOperation({ summary: 'Creating Position' })
  @Roles('ADMIN')
  @UsePipes(ValidationPipe)
  @Post()
  createPosition(@Body() dto: CreatePositionDto) {
    return this.positionsService.createPosition(dto);
  }

  @ApiOperation({ summary: 'Get all positions' })
  @Get()
  getAllPositions(@Query() pagination: PaginationDto) {
    return this.positionsService.getAllPositions(pagination);
  }

  @ApiOperation({ summary: 'Get Position by id' })
  @Get(':id')
  getPositionById(@Param('id') id: number) {
    return this.positionsService.getPositionById(id);
  }

  @ApiOperation({ summary: 'Delete Position' })
  @ApiResponse({ status: 200, type: Number })
  @Roles('ADMIN')
  @Delete(':id')
  deletePosition(@Param('id') id: number) {
    return this.positionsService.deletePosition(id);
  }

  @ApiOperation({ summary: 'Update position' })
  @ApiResponse({ status: 200, type: Number })
  @Roles('ADMIN')
  @UsePipes(ValidationPipe)
  @Patch(':id')
  updatePosition(@Param('id') id: number, @Body() dto: UpdatePositionDto) {
    return this.positionsService.updatePosition(id, dto);
  }
}

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
import { ApartmentsService } from './apartments.service';
import { CreateApartmentDto } from './dto/create-apartment.dto';
import { UpdateApartmentDto } from './dto/update-apartment.dto';
import { PaginationDto } from 'src/shared/dto/paginatedDto/paginatedDto';

@ApiTags('Apartments module')
@ApiBearerAuth()
@Controller('apartments')
export class ApartmentsController {
  constructor(private apartmentsService: ApartmentsService) {}

  @ApiOperation({ summary: 'Creating apartment' })
  @UsePipes(ValidationPipe)
  @Post()
  createApartment(@Body() dto: CreateApartmentDto) {
    return this.apartmentsService.createApartment(dto);
  }

  @ApiOperation({ summary: 'Get all apartments' })
  @Get()
  getAllApartments(@Query() pagination?: PaginationDto) {
    return this.apartmentsService.getAllApartments(pagination);
  }

  @ApiOperation({summary: 'Get employees amount by apartments'})
  @Get('employees')
  getApartmentsFullness() {
    return this.apartmentsService.getApartmentsFullness();
  }

  @ApiOperation({ summary: 'Get apartment by id' })
  @Get(':value')
  getApartmentById(@Param('value') value: number) {
    return this.apartmentsService.getApartmentById(+value);
  }

  @ApiOperation({ summary: 'Delete apartment' })
  @ApiResponse({ status: 200, type: Number })
  @Delete(':value')
  deleteApartment(@Param('value') value: number) {
    return this.apartmentsService.deleteApartment(value);
  }

  @ApiOperation({ summary: 'Update apartment' })
  @ApiResponse({ status: 200, type: Number })
  @UsePipes(ValidationPipe)
  @Patch(':id')
  updateApartment(@Param('id') id: number, @Body() dto: UpdateApartmentDto) {
    return this.apartmentsService.updateApartment(+id, dto);
  }
  
  
}

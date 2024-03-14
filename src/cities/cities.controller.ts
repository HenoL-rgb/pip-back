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
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CitiesService } from './cities.service';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaginationDto } from 'src/shared/dto/paginatedDto/paginatedDto';
import { Roles } from 'src/role/role.decorator';

@ApiTags('Cities module')
@ApiBearerAuth()
@Controller('cities')
export class CitiesController {
  constructor(private citiesService: CitiesService) {}

  @ApiOperation({ summary: 'Creating city' })
  @Roles('ADMIN')
  @UsePipes(ValidationPipe)
  @Post()
  createCity(@Body() dto: CreateCityDto) {
    return this.citiesService.createCity(dto);
  }

  @ApiOperation({ summary: 'Get all cities' })
  @Get()
  getAllCities(@Query() pagination: PaginationDto) {
    return this.citiesService.getAllCities(pagination);
  }

  @ApiOperation({ summary: 'Get city by id' })
  @Get(':value')
  getCityById(@Param('value') value: number) {
    return this.citiesService.getCityById(value);
  }

  @ApiOperation({ summary: 'Delete city' })
  @ApiResponse({ status: 200, type: Number })
  @Roles('ADMIN')
  @Delete(':id')
  deleteCity(@Param('id') id: number) {
    return this.citiesService.deleteCity(+id);
  }

  @ApiOperation({ summary: 'Update city' })
  @ApiResponse({ status: 200, type: Number })
  @Roles('ADMIN')
  @UsePipes(ValidationPipe)
  @Patch(':id')
  updateCity(@Param('id') id: number, @Body() dto: UpdateCityDto) {
    return this.citiesService.updateCity(+id, dto);
  }
}

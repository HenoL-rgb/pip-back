import { Body, Controller, Delete, Get, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CitiesService } from './cities.service';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@ApiTags('Cities module')
@Controller('cities')
export class CitiesController {

    constructor(private citiesService: CitiesService) {}

    @ApiOperation({summary: 'Creating city'})
    @UsePipes(ValidationPipe)
    @Post()
    createCity(@Body() dto: CreateCityDto) {
        return this.citiesService.createCity(dto)
    }

    @ApiOperation({summary: 'Get all cities'})
    @Get()
    getAllCities() {
        return this.citiesService.getAllCities()
    }

    @ApiOperation({summary: 'Get city by id'})
    @Get(':value')
    getCityById(@Param('value') value: number) {
        return this.citiesService.getCityById(value)
    }

    @ApiOperation({summary: 'Delete city'})
    @ApiResponse({status: 200, type: Number})
    @Delete(':id')
    deleteCity(@Param('id') id: number) {
        return this.citiesService.deleteCity(id)
    }

    @ApiOperation({summary: 'Update city'})
    @ApiResponse({status: 200, type: Number})
    @UsePipes(ValidationPipe)
    @Patch(':id')
    updateCity(@Param('id') id: number, @Body() dto: UpdateCityDto) {
        return this.citiesService.updateCity(id, dto)
    }
}

import { Body, Controller, Delete, Get, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Apartment } from './apartments.model';
import { ApartmentsService } from './apartments.service';
import { CreateApartmentDto } from './dto/create-apartment.dto';
import { UpdateApartmentDto } from './dto/update-apartment.dto';

@ApiTags('Apartments module')
@Controller('apartments')
export class ApartmentsController {
    constructor(private apartmentsService: ApartmentsService) {}

    @ApiOperation({summary: 'Creating apartment'})
    @ApiResponse({status: 200, type: Apartment})
    @UsePipes(ValidationPipe)
    @Post()
    createApartment(@Body() dto: CreateApartmentDto) {
        return this.apartmentsService.createApartment(dto)
    }

    @ApiOperation({summary: 'Get all apartments'})
    @ApiResponse({status: 200, type: [Apartment]})
    @Get()
    getAllApartments() {
        return this.apartmentsService.getAllApartments()
    }

    @ApiOperation({summary: 'Get apartment by id'})
    @ApiResponse({status: 200, type: Apartment})
    @Get('/:value')
    getApartmentById(@Param('value') value: number) {
        return this.apartmentsService.getApartmentById(value)
    }

    @ApiOperation({summary: 'Delete apartment'})
    @ApiResponse({status: 200, type: Number})
    @Delete(':value')
    deleteApartment(@Param('value') value: number) {
        return this.apartmentsService.deleteApartment(value)
    }

    @ApiOperation({summary: 'Update apartment'})
    @ApiResponse({status: 200, type: Number})
    @UsePipes(ValidationPipe)
    @Patch(':id')
    updateCity(@Param('id') id: number, @Body() dto: UpdateApartmentDto) {
        return this.apartmentsService.updateApartment(+id, dto)
    }
}

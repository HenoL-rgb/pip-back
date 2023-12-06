import { Body, Controller, Delete, Get, Param, Patch, Post, UsePipes } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { CreateSaleDto } from './dto/create-sale-dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { Sale } from './sales.model';
import { SalesService } from './sales.service';

@ApiTags('Sales module')
@Controller('sales')
export class SalesController {
    constructor(private salesService: SalesService) {}

    @ApiOperation({summary: 'Creating Sale'})
    @ApiResponse({status: 200, type: Sale})
    @UsePipes(ValidationPipe)
    @Post()
    createSale(@Body() dto: CreateSaleDto) {
        return this.salesService.createSale(dto)
    }

    @ApiOperation({summary: 'Get all Sales'})
    @ApiResponse({status: 200, type: [Sale]})
    @Get()
    getAllSales() {
        return this.salesService.getAllSales()
    }

    @ApiOperation({summary: 'Get Sale by id'})
    @ApiResponse({status: 200, type: Sale})
    @Get(':id')
    getSaleById(@Param('id') id: number) {
        return this.salesService.getSaleById(id)
    }

    @ApiOperation({summary: 'Delete Sale'})
    @ApiResponse({status: 200, type: Number})
    @Delete(':id')
    deleteSale(@Param('id') id: number) {
        return this.salesService.deleteSale(id)
    }

    @ApiOperation({summary: 'Update Sale'})
    @ApiResponse({status: 200, type: Number})
    @UsePipes(ValidationPipe)
    @Patch(':id')
    updateSale(@Param('id') id: number, @Body() dto: UpdateSaleDto) {
        return this.salesService.updateSale(id, dto)
    }
}

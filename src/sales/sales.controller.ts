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
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { CreateSaleDto } from './dto/create-sale-dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { SalesService } from './sales.service';
import { PaginationDto } from 'src/shared/dto/paginatedDto/paginatedDto';

@ApiTags('Sales module')
@ApiBearerAuth()
@Controller('sales')
export class SalesController {
  constructor(private salesService: SalesService) {}

  @ApiOperation({ summary: 'Creating Sale' })
  @UsePipes(ValidationPipe)
  @Post()
  createSale(@Body() dto: CreateSaleDto) {
    return this.salesService.createSale(dto);
  }

  @ApiOperation({ summary: 'Get all Sales' })
  @Get()
  getAllSales(@Query() pagination: PaginationDto) {
    return this.salesService.getAllSales(pagination);
  }

  @ApiOperation({ summary: 'Get Sale by id' })
  @Get(':id')
  getSaleById(@Param('id') id: number) {
    return this.salesService.getSaleById(id);
  }

  @ApiOperation({ summary: 'Get sales by date' })
  @Post('date')
  getSalesBydate(@Body() body: { startDate: Date; endDate: Date }) {
    return this.salesService.getSalesByDate(body);
  }

  @ApiOperation({ summary: 'Delete Sale' })
  @ApiResponse({ status: 200, type: Number })
  @Delete(':id')
  deleteSale(@Param('id') id: number) {
    return this.salesService.deleteSale(id);
  }

  @ApiOperation({ summary: 'Update Sale' })
  @ApiResponse({ status: 200, type: Number })
  @UsePipes(ValidationPipe)
  @Patch(':id')
  updateSale(@Param('id') id: number, @Body() dto: UpdateSaleDto) {
    return this.salesService.updateSale(id, dto);
  }
}

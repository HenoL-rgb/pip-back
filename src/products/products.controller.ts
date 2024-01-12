import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsService } from './products.service';
import { PaginationDto } from 'src/shared/dto/paginatedDto/paginatedDto';
import { Roles } from 'src/role/role.decorator';

@ApiTags('Products module')
@ApiBearerAuth()
@Controller('products')
export class ProductsController {
    constructor(private productsService: ProductsService) {}

    @ApiOperation({summary: 'Creating Position'})
    @UsePipes(ValidationPipe)
    @Roles('ADMIN')
    @Post()
    createProduct(@Body() dto: CreateProductDto) {
        return this.productsService.createProduct(dto)
    }

    @ApiOperation({summary: 'Get all positions'})
    @Get()
    getAllProducts(@Query() pagination: PaginationDto) {
        return this.productsService.getAllProducts(pagination)
    }

    @ApiOperation({summary: 'Get Position by id'})
    @Get(':id')
    getProductById(@Param('id') id: number) {
        return this.productsService.getProductById(id)
    }

    @ApiOperation({summary: 'Delete Position'})
    @ApiResponse({status: 200, type: Number})
    @Delete(':id')
    deleteProduct(@Param('id') id: number) {
        return this.productsService.deleteProduct(id)
    }

    @ApiOperation({summary: 'Update position'})
    @ApiResponse({status: 200, type: Number})
    @UsePipes(ValidationPipe)
    @Patch(':id')
    updateProduct(@Param('id') id: number, @Body() dto: UpdateProductDto) {
        return this.productsService.updateProduct(id, dto)
    }
}

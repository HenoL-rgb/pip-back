import { Body, Controller, Delete, Get, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsService } from './products.service';

@ApiTags('Products module')
@Controller('products')
export class ProductsController {
    constructor(private productsService: ProductsService) {}

    @ApiOperation({summary: 'Creating Position'})
    @UsePipes(ValidationPipe)
    @Post()
    createProduct(@Body() dto: CreateProductDto) {
        return this.productsService.createProduct(dto)
    }

    @ApiOperation({summary: 'Get all positions'})
    @Get()
    getAllProducts() {
        return this.productsService.getAllProducts()
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

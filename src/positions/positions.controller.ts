import { Body, Controller, Delete, Get, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatePositionDto } from './dto/create-position.dto';
import { UpdatePositionDto } from './dto/update-position.dto';
import { Position } from './position.model';
import { PositionsService } from './positions.service';

@ApiTags('Positions module')
@Controller('positions')
export class PositionsController {
    constructor(private positionsService: PositionsService) {}

    @ApiOperation({summary: 'Creating Position'})
    @ApiResponse({status: 200, type: Position})
    @UsePipes(ValidationPipe)
    @Post()
    createPosition(@Body() dto: CreatePositionDto) {
        return this.positionsService.createPosition(dto)
    }

    @ApiOperation({summary: 'Get all positions'})
    @ApiResponse({status: 200, type: [Position]})
    @Get()
    getAllPositions() {
        return this.positionsService.getAllPositions()
    }

    @ApiOperation({summary: 'Get Position by id'})
    @ApiResponse({status: 200, type: Position})
    @Get(':id')
    getPositionById(@Param('id') id: number) {
        return this.positionsService.getPositionById(id)
    }

    @ApiOperation({summary: 'Delete Position'})
    @ApiResponse({status: 200, type: Number})
    @Delete(':id')
    deletePosition(@Param('id') id: number) {
        return this.positionsService.deletePosition(id)
    }

    @ApiOperation({summary: 'Update position'})
    @ApiResponse({status: 200, type: Number})
    @UsePipes(ValidationPipe)
    @Patch(':id')
    updatePosition(@Param('id') id: number, @Body() dto: UpdatePositionDto) {
        return this.positionsService.updatePosition(id, dto)
    }
}

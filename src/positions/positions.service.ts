import { Injectable } from '@nestjs/common';
import { CreatePositionDto } from './dto/create-position.dto';
import { UpdatePositionDto } from './dto/update-position.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaginationDto } from 'src/shared/dto/paginatedDto/paginatedDto';

@Injectable()
export class PositionsService {
  constructor(private prisma: PrismaService) {}

  async createPosition(dto: CreatePositionDto) {
    try {
      const position = await this.prisma.position.create({ data: dto });
      return position;
    } catch (error) {
      console.log(error);
    }
  }

  async getAllPositions({ limit, offset }: PaginationDto) {
    try {
      const options: { skip: number; take?: number } = {
        skip: +offset || 0,
      };
      if (limit) {
        options.take = +limit;
      }
      const positions = await this.prisma.position.findMany(options);
      return positions;
    } catch (error) {
      console.log(error);
    }
  }

  async getPositionById(positionId: number) {
    try {
      const position = await this.prisma.position.findUnique({
        where: { id: positionId },
      });
      return position;
    } catch (error) {
      console.log(error);
    }
  }

  async deletePosition(positionId: number) {
    try {
      const position = await this.prisma.position.delete({
        where: {
          id: positionId,
        },
      });

      return position;
    } catch (error) {
      console.log(error);
    }
  }

  async updatePosition(id: number, dto: UpdatePositionDto) {
    try {
      const position = await this.prisma.position.update({
        where: {
          id,
        },
        data: dto,
      });

      return position;
    } catch (error) {
      console.log(error);
    }
  }
}

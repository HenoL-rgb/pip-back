import { Injectable } from '@nestjs/common';
import { CreatePositionDto } from './dto/create-position.dto';
import { UpdatePositionDto } from './dto/update-position.dto';
import { PrismaService } from 'src/prisma/prisma.service';

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

  async getAllPositions() {
    try {
      const positions = await this.prisma.position.findMany();
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

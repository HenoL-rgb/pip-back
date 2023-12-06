import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreatePositionDto } from './dto/create-position.dto';
import { UpdatePositionDto } from './dto/update-position.dto';
import { Position } from './position.model';

@Injectable()
export class PositionsService {
  constructor(
    @InjectModel(Position) private positionRepository: typeof Position,
  ) {}

  async createPosition(dto: CreatePositionDto) {
    try {
      const position = await this.positionRepository.create(dto);
      return position;
    } catch (error) {
      console.log(error);
    }
  }

  async getAllPositions() {
    try {
      const positions = await this.positionRepository.findAll();
      return positions;
    } catch (error) {
      console.log(error);
    }
  }

  async getPositionById(positionId: number) {
    try {
      const position = await this.positionRepository.findByPk(positionId);
      return position;
    } catch (error) {
      console.log(error);
    }
  }

  async deletePosition(positionId: number) {
    try {
      const position = await this.positionRepository.destroy({
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
      const position = await this.positionRepository.update(dto, {
        where: {
          id,
        },
      });

      return position;
    } catch (error) {
      console.log(error);
    }
  }
}

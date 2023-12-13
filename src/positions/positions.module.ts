import { Module } from '@nestjs/common';
import { PositionsController } from './positions.controller';
import { PositionsService } from './positions.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [PositionsController],
  providers: [PositionsService],
  imports: [PrismaModule],
})
export class PositionsModule {}

import { Module } from '@nestjs/common';
import { ApartmentsController } from './apartments.controller';
import { ApartmentsService } from './apartments.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [ApartmentsController],
  providers: [ApartmentsService],
  imports: [PrismaModule],
})
export class ApartmentsModule {}

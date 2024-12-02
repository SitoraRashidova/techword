import { Module } from '@nestjs/common';

import { Term } from './models/term.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { TermController } from './term.controller';
import { TermsService } from './term.service';

@Module({
  imports: [SequelizeModule.forFeature([Term])],
  controllers: [TermController],
  providers: [TermsService],
})
export class TermsModule {}

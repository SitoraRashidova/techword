import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTermDto } from './dto/create-term.dto';
import { UpdateTermDto } from './dto/update-term.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Term } from './models/term.model';
import { Category } from '../category/models/category.model';

@Injectable()
export class TermsService {
  constructor(@InjectModel(Term) private termModel: typeof Term) {}

  async create(createTermDto: CreateTermDto) {
    const Term = await this.termModel.create(createTermDto);
    return {
      message: 'Term created successfully',
      Term,
    };
  }

  async findAll() {
    const terms = await this.termModel.findAll({
      include: Category,
    });
    return {
      message: 'All Terms found successfully',
      terms,
    };
  }

  async findOne(id: number) {
    const Term = await this.termModel.findByPk(id);
    if (!Term) {
      throw new NotFoundException(`Term with ID ${id} not found`);
    }
    return {
      message: `Term with ID ${id} retrieved successfully`,
      Term,
    };
  }

  async update(id: number, updateTermDto: UpdateTermDto) {
    const [numberOfAffectedRows, [updatedTerm]] = await this.termModel.update(
      updateTermDto,
      {
        where: { id },
        returning: true,
      },
    );

    if (numberOfAffectedRows === 0) {
      throw new NotFoundException(`Term with ID ${id} not found`);
    }

    return {
      message: `Term with ID ${id} updated successfully`,
      term: updatedTerm,
    };
  }

  async remove(id: number) {
    const term = await this.termModel.findByPk(id);
    if (!term) {
      throw new NotFoundException(`Term with ID ${id} not found`);
    }

    await term.destroy();

    return {
      message: `Term with ID ${id} removed successfully`,
    };
  }
}

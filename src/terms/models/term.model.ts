import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Category } from '../../category/models/category.model';

interface ITermCreationAttr {
  name: string;
  definition: string;
  categoryId: number;
}

@Table({ tableName: 'terms', timestamps: true })
export class Term extends Model<Term, ITermCreationAttr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
  })
  name: string;

  @Column({
    type: DataType.STRING,
  })
  definition: string;

  @ForeignKey(() => Category)
  @Column({
    type: DataType.INTEGER,
  })
  categoryId: number;

  @BelongsTo(() => Category)
  categories: Category;
}

import { Column, DataType,  Model,  Table } from 'sequelize-typescript';

interface ICategoryCreationAtrr {
  name: string;
}

@Table({ tableName: 'categories', timestamps: false })
export class Category extends Model<Category,ICategoryCreationAtrr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  name: string;

}

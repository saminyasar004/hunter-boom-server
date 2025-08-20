import {
  AutoIncrement,
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";

export interface UserProps {
  userId: number;
  name: string;
  contactNumber: string;
  userGroup: string;
  userLevel: string;
  permission: string;
  username: string;
  email: string;
  password: string;
  status: string;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserCreationProps {
  name: string;
  contactNumber: string;
  userGroup: string;
  userLevel: string;
  permission: string;
  username: string;
  email: string;
  password: string;
  status: string;
  isDeleted: boolean;
}

@Table({
  tableName: "Users",
  timestamps: true,
})
export default class User extends Model<UserProps, UserCreationProps> {
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER })
  declare userId: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare username: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare password: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare contactNumber: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare userGroup: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare userLevel: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare permission: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare status: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  declare isDeleted: boolean;
}

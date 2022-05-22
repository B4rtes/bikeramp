import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
class Trip {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({
    type: "varchar"
  })
  public start_address: string;

  @Column({
    type: "varchar"
  })
  public destination_address: string;

  @Column({
    type: "float"
  })
  public distance: number;

  @Column({
    type: "decimal"
  })
  price: number;

  @Column({
    type: "date"
  })
  date: Date;
}

export default Trip;
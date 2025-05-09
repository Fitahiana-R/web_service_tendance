import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class MeteoJour {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "date" })
  date!: string;

  @Column("float")
  temp_min!: number;

  @Column("float")
  temp_max!: number;

  @Column()
  description!: string;

  @Column("int")
  humidity!: number;

  @Column("float")
  wind_speed!: number;

  @Column("float")
  pop!: number;
}

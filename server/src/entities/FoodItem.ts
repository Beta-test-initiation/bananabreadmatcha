import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn
} from "typeorm";
import { Donor } from "./Donor";

export enum FoodType {
  PERISHABLE = "perishable",
  NON_PERISHABLE = "non_perishable"
}

@Entity("food_items")
export class FoodItem {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column({
    type: "enum",
    enum: FoodType,
    default: FoodType.NON_PERISHABLE
  })
  type: FoodType;

  @Column("decimal", { precision: 10, scale: 2 })
  quantity: number;

  @Column()
  unit: string;

  @Column({ type: "text", nullable: true })
  description: string;

  @Column({ type: "timestamp" })
  expiryDate: Date;

  @Column({ default: true })
  isAvailable: boolean;

  @ManyToOne(() => Donor, (donor) => donor.foodItems)
  @JoinColumn({ name: "donor_id" })
  donor: Donor;

  @Column()
  donor_id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
} 
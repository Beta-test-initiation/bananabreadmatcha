import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne
} from "typeorm";
import { FoodItem } from "./FoodItem";

@Entity("donors")
export class Donor {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  organizationName: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  address: string;

  @Column("decimal", { precision: 10, scale: 8 })
  latitude: number;

  @Column("decimal", { precision: 11, scale: 8 })
  longitude: number;

  @Column({ type: "text", array: true, default: [] })
  preferredPickupTimes: string[];

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => FoodItem, (foodItem) => foodItem.donor)
  foodItems: FoodItem[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
} 
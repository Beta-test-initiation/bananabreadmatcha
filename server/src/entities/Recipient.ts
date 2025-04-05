import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne
} from "typeorm";
import { Delivery } from "./Delivery";

@Entity("recipients")
export class Recipient {
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
  dietaryRestrictions: string[];

  @Column({ type: "text", array: true, default: [] })
  preferredDeliveryTimes: string[];

  @Column()
  storageCapacity: string;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => Delivery, (delivery) => delivery.recipient)
  deliveries: Delivery[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
} 
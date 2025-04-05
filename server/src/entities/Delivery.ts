import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn
} from "typeorm";
import { Recipient } from "./Recipient";
import { FoodItem } from "./FoodItem";

export enum DeliveryStatus {
  PENDING = "pending",
  IN_PROGRESS = "in_progress",
  COMPLETED = "completed",
  CANCELLED = "cancelled"
}

@Entity("deliveries")
export class Delivery {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Recipient, (recipient) => recipient.deliveries)
  @JoinColumn({ name: "recipient_id" })
  recipient: Recipient;

  @Column()
  recipient_id: string;

  @ManyToOne(() => FoodItem)
  @JoinColumn({ name: "food_item_id" })
  foodItem: FoodItem;

  @Column()
  food_item_id: string;

  @Column({
    type: "enum",
    enum: DeliveryStatus,
    default: DeliveryStatus.PENDING
  })
  status: DeliveryStatus;

  @Column({ type: "timestamp" })
  scheduledDeliveryTime: Date;

  @Column({ type: "timestamp", nullable: true })
  actualDeliveryTime: Date;

  @Column({ type: "text", nullable: true })
  notes: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
} 
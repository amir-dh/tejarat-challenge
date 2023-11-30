import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';

export enum DurationType {
    YEAR = 'year',
    MONTH = 'month',
    WEEK = 'week',
    DAY = 'day'
}

@Entity({ name: 'plan' })
export class Plan {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'varchar', length: 300, nullable: false })
    name: string;

    @Column({ type: 'integer', nullable: false })
    price: number;

    @Column({ type: 'integer', nullable: false })
    duration: number;

    @Column({ type: 'enum', enum: DurationType, nullable: false })
    durationType: DurationType;

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    createdTime: Date;

    @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    updatedTime: Date;
}
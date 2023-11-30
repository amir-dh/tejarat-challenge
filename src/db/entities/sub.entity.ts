import {
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    Column,
} from 'typeorm';

export enum Status {
    INCOMPLETE = 'incomplete',
    COMPLETE = 'complete',
    EXPIRED = 'expired'
}

@Entity({ name: 'subscription' })
export class Subsctiption {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'integer', nullable: false })
    userId: number;

    @Column({ type: 'integer', nullable: false })
    planId: number;

    @Column({ type: 'enum', enum: Status, default: Status.INCOMPLETE})
    status: Status;

    @Column({ type: 'timestamptz' })
    from: Date;

    @Column({ type: 'timestamptz' })
    to: Date;

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    createdTime: Date;

    @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    updatedTime: Date;
}
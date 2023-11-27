import {
    Entity,
    Column,
    Index,
    AfterLoad,
    BeforeUpdate,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn
} from 'typeorm';
import bcrypt from 'bcrypt';

@Entity({ name: 'user' })
export class User {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Index({ unique: true })
    @Column({ type: 'varchar', length: 300, nullable: false, unique: true })
    username: string;

    @Column({ type: 'varchar', length: 300, nullable: false })
    password: string;

    @Column({ type: 'boolean', default: true })
    isActive: boolean;

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    createdTime: Date;

    @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    updatedTime: Date;

    private tempPassword: string;

    @AfterLoad()
    private loadTempPassword(): void {
        this.tempPassword = this.password;
    }

    @BeforeUpdate()
    private encryptPass(): void {
        if (this.tempPassword !== this.password) {
            bcrypt.hash(this.tempPassword, 10, function (err: unknown, hash: string) {
                this.password = hash;
            });
        }
    }
}
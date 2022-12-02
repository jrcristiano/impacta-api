import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne } from "typeorm"
import { Uid } from "../types/uid"
import School from "./School"

@Entity('users')
export default class User {
    @PrimaryGeneratedColumn()
    id: Uid

    @Column({nullable: false})
    name: string

    @Column({nullable: false})
    lastname: string

    @Column({nullable: false, unique: true})
    email: string

    @Column({nullable: false})
    password: string;

    @Column({ nullable: false })
    role: string;

    @ManyToOne(type => School, { onDelete: 'CASCADE' })
    @JoinColumn({name: 'school_id'})
    school: School;

    @Column({type: 'timestamp', name: 'created_at', nullable: false, default: () => "CURRENT_TIMESTAMP(6)"})
    created_at: Date;

    @Column({type: 'timestamp', name: 'updated_at', nullable: false, default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)"})
    updated_at: Date;
}

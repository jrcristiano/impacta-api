import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, OneToOne, ManyToOne, OneToMany } from "typeorm"
import School from "./School"

@Entity('users')
export default class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable: false})
    name: string

    @Column({nullable: false})
    lastname: string

    @Column({nullable: false, unique: true})
    email: string

    @Column({nullable: false})
    password: string;

    @ManyToOne(type => School, { onDelete: 'CASCADE' })
    @JoinColumn({name: 'school_id'})
    school_id: School;

    @Column({type: 'timestamp', name: 'created_at', nullable: false, default: () => "CURRENT_TIMESTAMP(6)"})
    created_at: Date;

    @Column({type: 'timestamp', name: 'updated_at', nullable: false, default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)"})
    updated_at: Date;
}

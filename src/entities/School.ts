import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm"
import Segment from "./Segment";

@Entity('schools')
export default class School {
  @PrimaryGeneratedColumn()
  id: number|string;

  @Column({nullable: false})
  name: string;

  @Column({nullable: false})
  city: string;

  @Column({nullable: false})
  phone: string;

  @Column({nullable: false, unique: true})
  cnpj: string;

  @Column({nullable: false})
  status: string;

  @Column({nullable: true})
  description?: string;

  @Column({type: 'timestamp', name: 'created_at', nullable: false, default: () => "CURRENT_TIMESTAMP(6)"})
  created_at: Date;

  @Column({type: 'timestamp', name: 'updated_at', nullable: false, default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)"})
  updated_at: Date;

  @ManyToMany((type) => Segment, { eager: true })
  @JoinTable({
    name: 'school_segment',
    joinColumn: {
      name: 'school_id',
      referencedColumnName: 'id'
    },
    inverseJoinColumn: {
      name: 'segment_id',
      referencedColumnName: 'id'
    }
  })
  segments: Segment[];
}

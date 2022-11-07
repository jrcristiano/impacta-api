import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity('segments')
export default class Segment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable: false})
  name: string;

  @Column({type: 'timestamp', name: 'created_at', nullable: false, default: () => "CURRENT_TIMESTAMP(6)"})
  created_at: Date;

  @Column({type: 'timestamp', name: 'updated_at', nullable: false, default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)"})
  updated_at: Date;
}

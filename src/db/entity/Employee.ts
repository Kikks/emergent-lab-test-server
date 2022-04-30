import { Column, Entity, Index, PrimaryGeneratedColumn, Unique } from 'typeorm'

@Entity()
@Unique('email_constraint', ['email'])
export class Employee {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  firstName: string

  @Column()
  lastName: string

  @Index({ fulltext: true })
  @Column()
  fullName: string

  @Index({ fulltext: true })
  @Column()
  email: string

  @Index({ fulltext: true })
  @Column()
  phoneNumber: string

  @Column()
  role: 'admin' | 'staff'
}

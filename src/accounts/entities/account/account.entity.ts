import { ChefEntity } from "src/chefs/entities/chef/chef.entity";
import { CommentEntity } from "src/comments/entities/comment/comment.entity";
import { cryptoPassword } from "src/utisl";
import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class AccountEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  email: string;
  @Column()
  phone_number?: string;
  @Column({ length: 64, select: false })
  password: string;
  @BeforeUpdate()
  @BeforeInsert()
  hashPassword() {
    this.password = cryptoPassword(this.password);
  }
  @Column()
  profilePhoto: string;
  @OneToMany(() => CommentEntity, (comment) => comment.account)
  comments: CommentEntity[];
  @OneToOne(() => ChefEntity, (chef) => chef.account)
  chef?: ChefEntity;
}
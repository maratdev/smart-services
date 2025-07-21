import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Unique, UpdateDateColumn} from 'typeorm';

@Entity()
@Unique(['article'])
export class Product {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column()
	article!: string;

	@Column({ type: 'varchar', nullable: false, default: 'default name' })
	name!: string;

	@Column('float')
	price!: number;

	@Column('int')
	quantity!: number;

	@CreateDateColumn()
	created_at!: Date;

	@UpdateDateColumn({ name: 'updated_at' })
	updated_at!: Date;
}

import { Base } from 'src/common/abstracts/base.entity';
import { Entity } from 'typeorm';

@Entity('order')
export class OrderEntity extends Base {}

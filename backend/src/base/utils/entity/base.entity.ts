import { Column, PrimaryColumn } from 'typeorm';
import { ColType } from '~config/constants/postgres-column.enum';

export class BaseEntity {

    @PrimaryColumn( ColType.uuid )
    id: string;

    @Column( ColType.timestamp_with_time_zone, { nullable: false } )
    created_at: Date;

    @Column( ColType.timestamp_with_time_zone, { nullable: true } )
    updated_at: Date | null;
}

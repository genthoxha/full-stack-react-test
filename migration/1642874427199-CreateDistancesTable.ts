import {MigrationInterface, QueryRunner} from "typeorm";
import { Table } from 'typeorm/index';

export class CreateDistancesTable1642874427199 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'distance',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'value',
                    type: 'int',
                    isNullable: false,
                    default: 0,
                },
            ]
        }), true)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('distance');
    }

}

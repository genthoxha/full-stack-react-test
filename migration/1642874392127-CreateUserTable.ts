import {MigrationInterface, QueryRunner} from "typeorm";
import { Table } from 'typeorm/index';

export class CreateUserTable1642874392127 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'users',
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'username',
                    type: 'varchar',
                },
                {
                    name: 'homeLatitude',
                    type: 'text'
                },
                {
                    name: 'homeLongitude',
                    type: 'text'
                },
                {
                    name: 'currentLatitude',
                    type: 'text'
                },
                {
                    name: 'currentLongitude',
                    type: 'text'
                },
            ]
        }), true)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users');
    }

}

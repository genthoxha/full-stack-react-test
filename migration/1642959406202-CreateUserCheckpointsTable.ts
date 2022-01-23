import {MigrationInterface, QueryRunner} from "typeorm";
import { Table, TableForeignKey } from 'typeorm/index';

export class CreateUserCheckpointsTable1642959406202 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'user_checkpoints',
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment'
                },
                {
                    name: "userId",
                    type: "int"
                },
                {
                    name: "checkpointId",
                    type: "int"
                }
            ]
        }))

        await queryRunner.createForeignKey("user_checkpoints", new TableForeignKey({
            columnNames: ["userId"],
            referencedColumnNames: ["id"],
            referencedTableName: "users",
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("user_checkpoints");

        const foreignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf("userId") !== -1);
        await queryRunner.dropForeignKey("user_checkpoints", foreignKey);
        await queryRunner.dropColumn("user_checkpoints", "userId");

        await queryRunner.dropTable('user_checkpoints')
    }

}

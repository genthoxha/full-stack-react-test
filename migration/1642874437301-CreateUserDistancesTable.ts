import {MigrationInterface, QueryRunner} from "typeorm";
import { Table, TableForeignKey } from 'typeorm/index';

export class CreateUserDistancesTable1642874437301 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'user_distances',
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
                    name: "distanceId",
                    type: "int"
                }
            ]
        }))

        await queryRunner.createForeignKey("user_distances", new TableForeignKey({
            columnNames: ["userId"],
            referencedColumnNames: ["id"],
            referencedTableName: "users",
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("user_distances");

        const foreignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf("userId") !== -1);
        await queryRunner.dropForeignKey("user_distances", foreignKey);
        await queryRunner.dropColumn("user_distances", "userId");

        await queryRunner.dropTable('user_distances')
    }

}

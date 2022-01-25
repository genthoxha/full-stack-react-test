import {MigrationInterface, QueryRunner} from "typeorm";

export class InsertUserData1642874503373 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query("INSERT INTO Checkpoint (latitude, longitude) VALUES ('42.621881', '21.083090');");
        queryRunner.query("INSERT INTO Checkpoint (latitude, longitude) VALUES ('42.661307', '21.168308');");
        queryRunner.query("INSERT INTO Checkpoint (latitude, longitude) VALUES ('42.660179', '21.156378');");
        queryRunner.query("INSERT INTO Users (username, homeLatitude, homeLongitude, currentLatitude, currentLongitude) VALUES ('Gent', '42.651571', '21.177936', '42.650407', '21.174744');");
        queryRunner.query("INSERT INTO Users (username, homeLatitude, homeLongitude, currentLatitude, currentLongitude) VALUES ('Tony', '42.675314', '21.137248', '42.672861', '21.144887');");
        queryRunner.query("INSERT INTO Users (username, homeLatitude, homeLongitude, currentLatitude, currentLongitude) VALUES ('Mike', '42.665979', '21.177830', '42.664685', '21.179536');");
        queryRunner.query("INSERT INTO Users (username, homeLatitude, homeLongitude, currentLatitude, currentLongitude) VALUES ('Jay', '42.658578', '21.182250', '42.656558', '21.183022');");
        queryRunner.query("INSERT INTO Users (username, homeLatitude, homeLongitude, currentLatitude, currentLongitude) VALUES ('Micheal', '42.654704', '21.177786', '42.653268', '21.179031');");
        queryRunner.query("INSERT INTO Users (username, homeLatitude, homeLongitude, currentLatitude, currentLongitude) VALUES ('Smith', '42.655659', '21.178752', '42.655888', '21.181541');");
        queryRunner.query("INSERT INTO Users (username, homeLatitude, homeLongitude, currentLatitude, currentLongitude) VALUES ('Bob', '42.652534', '21.174589', '42.649662', '21.176295');");
        queryRunner.query("INSERT INTO Users (username, homeLatitude, homeLongitude, currentLatitude, currentLongitude) VALUES ('Johnson', '42.648226', '21.171810', '42.648226', '21.171810');");
        queryRunner.query("INSERT INTO Users (username, homeLatitude, homeLongitude, currentLatitude, currentLongitude) VALUES ('Steve', '42.646285', '21.167358', '42.644521', '21.167364');");
        queryRunner.query("INSERT INTO Users (username, homeLatitude, homeLongitude, currentLatitude, currentLongitude) VALUES ('Bill', '42.656530', '21.168232', '42.656317', '21.169713');");


    }
    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query('DELETE FROM Checkpoint;');
        queryRunner.query('DELETE FROM User;');
    }
}

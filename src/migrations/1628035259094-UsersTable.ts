import {MigrationInterface, QueryRunner} from "typeorm";

export class UsersTable1628035259094 implements MigrationInterface {
    name = 'UsersTable1628035259094'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`squatt\`.\`user_profile\` (\`uid\` int NOT NULL AUTO_INCREMENT, \`address1\` varchar(300) NOT NULL, \`address2\` varchar(300) NOT NULL, \`sex\` tinyint NOT NULL DEFAULT '0', \`birthDate\` varchar(100) NOT NULL, \`updateDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`userUid\` int NULL, UNIQUE INDEX \`REL_bb96ab796038c5a3f00b5aba31\` (\`userUid\`), PRIMARY KEY (\`uid\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`squatt\`.\`user\` (\`uid\` int NOT NULL AUTO_INCREMENT, \`email\` varchar(100) NOT NULL, \`name\` varchar(100) NOT NULL, \`password\` varchar(100) NOT NULL, \`updateDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`regDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`state\` tinyint NOT NULL DEFAULT '1', INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), PRIMARY KEY (\`uid\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`squatt\`.\`push_token\` (\`uid\` int NOT NULL AUTO_INCREMENT, \`token\` varchar(300) NOT NULL, \`regDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`userUid\` int NULL, PRIMARY KEY (\`uid\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`squatt\`.\`user_profile\` ADD CONSTRAINT \`FK_bb96ab796038c5a3f00b5aba315\` FOREIGN KEY (\`userUid\`) REFERENCES \`squatt\`.\`user\`(\`uid\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`squatt\`.\`push_token\` ADD CONSTRAINT \`FK_d312a7944e8ed194e580ec72124\` FOREIGN KEY (\`userUid\`) REFERENCES \`squatt\`.\`user\`(\`uid\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`squatt\`.\`push_token\` DROP FOREIGN KEY \`FK_d312a7944e8ed194e580ec72124\``);
        await queryRunner.query(`ALTER TABLE \`squatt\`.\`user_profile\` DROP FOREIGN KEY \`FK_bb96ab796038c5a3f00b5aba315\``);
        await queryRunner.query(`DROP TABLE \`squatt\`.\`push_token\``);
        await queryRunner.query(`DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`squatt\`.\`user\``);
        await queryRunner.query(`DROP TABLE \`squatt\`.\`user\``);
        await queryRunner.query(`DROP INDEX \`REL_bb96ab796038c5a3f00b5aba31\` ON \`squatt\`.\`user_profile\``);
        await queryRunner.query(`DROP TABLE \`squatt\`.\`user_profile\``);
    }

}

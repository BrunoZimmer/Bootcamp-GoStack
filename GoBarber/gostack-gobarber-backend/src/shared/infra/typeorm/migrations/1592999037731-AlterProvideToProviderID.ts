import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class AlterProvideToProviderID1592999037731 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    //dropcolumn deleta uma coluna
    await queryRunner.dropColumn('appointments', 'provider');
    //adiciona uma nova coluna com esses dados
    await queryRunner.addColumn(
      'appointments',
      new TableColumn({
        name:'provider_id',
        type: 'uuid',
        isNullable: true
      })
    );

    await queryRunner.createForeignKey(
      'appointments',
      new TableForeignKey ({
        name: 'AppointmentProvider',
        columnNames: ['provider_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('appointments', 'AppointmentProvider');

    await queryRunner.dropColumn('appointments', 'provider_id');

    await queryRunner.addColumn('appointments', new TableColumn({
      name: 'provider',
      type: 'varchar'
    }))
  }
}

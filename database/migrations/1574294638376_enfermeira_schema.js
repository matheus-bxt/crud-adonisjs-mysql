'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class EnfermeiraSchema extends Schema {
  up () {
    this.create('enfermeiras', (table) => {
      table.increments()
      table.string('name', 80).notNullable()
      table.integer('hospital_id').unsigned().notNullable().references('id').inTable('hospitals')
      table.timestamps()
    })
  }

  down () {
    this.drop('enfermeiras')
  }
}

module.exports = EnfermeiraSchema

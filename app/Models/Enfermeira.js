'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Enfermeira extends Model {
    hospital() {
        return this.belongsTo('App/Models/Hospital');
    }
}

module.exports = Enfermeira

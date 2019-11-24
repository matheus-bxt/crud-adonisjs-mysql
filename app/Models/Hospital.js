'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Hospital extends Model {
    enfermeiras() {
        return this.hasMany('App/Models/Enfermeira');
    }
}

module.exports = Hospital

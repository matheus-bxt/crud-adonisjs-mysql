'use strict'

const Hospital = use('App/Models/Hospital');
const Enfermeira = use('App/Models/Enfermeira');

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with hospitals
 */
class HospitalController {
  /**
   * Show a list of all hospitals.
   * GET hospitals
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    // Busca todos os hospitais cadastrados
    const hospitals = await Hospital.all();

    // Retorna a view hospitais e passa todos os hospitais cadastrados em forma de json
    return view.render('pages.hospitais', { hospitals: hospitals.toJSON() });
  }

  /**
   * Create/save a new hospital.
   * POST hospitals
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    // Extrai os dados do request
    const data = request.only(['name', 'cnpj']);

    // Verifica se já existe um hospital com o cnpj informado
    var hospital = await Hospital.findBy('cnpj', data.cnpj);
    if (hospital != null) {
      // Retorna mensagem no response para informar que já existe um hospital com o cnpj informado
      response.status(404).send({error: { message: 'Já existe um hospital com o CNPJ informado!' }});
      return response;
    }

    // Cria novo hospital com os dados do request e retorna o mesmo
    const newHospital = await Hospital.create(data);
    return newHospital;
  }

  /**
   * Display a single hospital.
   * GET hospitals/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    // Busca o hospital cadastrado com o parametro id
    const hospital = await Hospital.find(params.id);

    // Verifica se o hospital existe
    if(hospital == null) {
      // Retorna mensagem no response para informar que o hospital informado não existe
      response.status(404).send({error:{ message: 'Hospital informado não existe!' }});
      return response;
    }

    // Retorna o hospital cadastrado
    return hospital;
  }

  /**
   * Update hospital details.
   * PUT or PATCH hospitals/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    // Busca o hospital cadastrado com o parametro id
    const hospital = await Hospital.find(params.id);
    // Extrai os dados do request
    const data = request.only(['name', 'cnpj']);

    // Busca outros hospitais cadastrados com o mesmo cnpj mas com id diferente do informado
    const otherHospitals = await Hospital
    .query()
    .where('cnpj', '=', data.cnpj)
    .where('id', '<>', params.id)
    .fetch()

    // Verifica se existem outros hospitais cadastrados com o mesmo cnpj mas com id diferente do informado
    if(otherHospitals.toJSON().length > 0) {
      // Retorna mensagem no response para informar que já existe um hospital com o cnpj informado
      response.status(404).send({error:{ message: 'Já existe um hospital com o CNPJ informado!' }});
      return response;
    }
    
    // Atualiza e salva o hospital
    hospital.merge(data);
    await hospital.save();
    
    // Retorna o hospital
    return hospital;
  }

  /**
   * Delete a hospital with id.
   * DELETE hospitals/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    // Busca o hospital cadastrado com o parametro id
    const hospital = await Hospital.find(params.id);

    if(hospital == null) {
      // Retorna mensagem no response para informar que o hospital informado não existe
      response.status(404).send({error:{ message: 'Hospital informado não existe!' }});
      return response;
    }

    const enfermeiras = await Enfermeira.findBy('hospital_id', hospital.id);
    if(enfermeiras != null) {
      response.status(404).send({error:{ message: 'Não é possível excluir o hospital, pois existem enfermeiras cadastradas neste hospital' }});
      return response;
    }
    
    // Exclui o hospital
    await hospital.delete();

    // Retorna mensagem
    return "Excluído com sucesso!";
  }

  async all ({ request, response, view }) {
    // Busca todos os hospitais cadastrados
    const hospitals = await Hospital.all();

    // Retorna todos os hospitais cadastrados em forma de json
    return hospitals.toJSON();
  }

  async getEnfermeiras({ params, response }) {
    // Busca o hospital cadastrado com o parametro id
    const hospital = await Hospital.find(params.id);

    // Verifica se o hospital existe
    if(hospital == null) {
      // Retorna mensagem no response para informar que o hospital informado não existe
      response.status(404).send({error:{ message: 'Hospital informado não existe!' }});
      return response;
    }

    // Retorna as enfermeiras do hospital informado no parametro id
    return hospital.enfermeiras().fetch();
  }
}

module.exports = HospitalController

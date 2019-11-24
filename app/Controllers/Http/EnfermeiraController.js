'use strict'

const Enfermeira = use('App/Models/Enfermeira');

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with enfermeiras
 */
class EnfermeiraController {
  /**
   * Show a list of all enfermeiras.
   * GET enfermeiras
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    // Busca todas as enfermeiras cadastradas com seus respectivos hospitais
    const enfermeiras = await Enfermeira
    .query()
    .with('hospital')
    .fetch();

    // Retorna a view enfermeiras e passa todas as enfermeiras cadastradas em forma de json
    return view.render('pages.enfermeiras', { enfermeiras: enfermeiras.toJSON() });
  }

  /**
   * Render a form to be used for creating a new enfermeira.
   * GET enfermeiras/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new enfermeira.
   * POST enfermeiras
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    // Extrai os dados do request
    const data = request.only(['name', 'hospital_id']);
    // Cria nova enfermeira com os dados do request
    const enfermeira = await Enfermeira.create(data);

    // Retorna nova enfermeira
    return enfermeira;
  }

  /**
   * Display a single enfermeira.
   * GET enfermeiras/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    // Busca a enfermeira cadastrada com o parametro id
    const enfermeira = await Enfermeira.find(params.id);

    // Verifica se a enfermeira existe
    if(enfermeira == null) {
      // Retorna mensagem no response para informar que a enfermeira informada não existe
      response.status(404).send({error:{ message: 'Enfermeira informada não existe!' }});
      return response;
    }

    return enfermeira;
  }

  /**
   * Render a form to update an existing enfermeira.
   * GET enfermeiras/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update enfermeira details.
   * PUT or PATCH enfermeiras/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    // Busca a enfermeira cadastrado com o parametro id
    const enfermeira = await Enfermeira.find(params.id);
    // Extrai os dados do request
    const data = request.only(['name', 'hospital_id']);

    // Verifica se a enfermeira existe
    if(enfermeira == null) {
      // Retorna mensagem no response para informar que a enfermeira informada não existe
      response.status(404).send({error:{ message: 'Enfermeira informada não existe!' }});
      return response;
    }
    
    // Atualiza e salva a enfermeira
    enfermeira.merge(data);
    await enfermeira.save();
    
    // Retorna a enfermeira
    return enfermeira;
  }

  /**
   * Delete a enfermeira with id.
   * DELETE enfermeiras/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    // Busca a enfermeira cadastrado com o parametro id
    const enfermeira = await Enfermeira.find(params.id);

    // Verifica se a enfermeira existe
    if(enfermeira == null) {
      // Retorna mensagem no response para informar que a enfermeira informada não existe
      response.status(404).send({error:{ message: 'Enfermeira informada não existe!' }});
      return response;
    }

    // Exclui a enfermeira
    await enfermeira.delete();

    // Retorna mensagem
    return "Excluído com sucesso!";
  }
}

module.exports = EnfermeiraController

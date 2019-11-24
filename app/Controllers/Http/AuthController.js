'use strict'

const User = use('App/Models/user');

class AuthController {

    async register({ request, response }) {
        // Extrai os dados do request
        const data = request.only(['username', 'email', 'password']);

        // Verifica se já existe um usuário com o e-mail informado
        var user = await User.findBy('email', data.email);
        if (user != null) {
            // Retorna mensagem no response para informar que já existe um cadastro com o e-mail informado
            response.status(404).send({error: { message: 'Já existe um cadastro com o e-mail informado' }});
            return response;
        }

        // Cria novo usuário com os dados do request e retorna o mesmo
        const newUser = await User.create(data);
        return newUser;
    }

    async authenticate({ request, auth, response }) {
        // Extrai os dados do request
        const { email, password } = request.all();

        try {
            // Tenta autenticar/gerar token com os dados do request
            const token = await auth.attempt(email, password);
            return token;

        } catch {
            // Não foi possível autenticar/gerar token com os dados do request
            // Retorna mensagem no response para informar que o e-mail ou senha são inválidos
            response.status(404).send({error: { message: 'E-mail ou senha inválidos' }});
            return response;
        }
    }

    async checkToken({ request, auth, view }) {
        //Esta rota serve apenas para validar o token
    }
}

module.exports = AuthController

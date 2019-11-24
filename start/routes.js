'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.on('/').render('home.index');
Route.on('/login').render('login');
Route.on('/cadastrar').render('cadastro');

Route.post('/register', 'AuthController.register');
Route.post('/authenticate', 'AuthController.authenticate');

Route.get("/hospitais", "HospitalController.index");
Route.get("/enfermeiras", "EnfermeiraController.index");

Route.group(() => {
    Route.get("/hospital/:id", "HospitalController.show");
    Route.get("/hospitais/todos", "HospitalController.all");
    Route.get("/hospital/:id/enfermeiras", "HospitalController.getEnfermeiras");
    Route.post("/hospital", "HospitalController.store");
    Route.put("/hospital/:id", "HospitalController.update");
    Route.delete("/hospital/:id", "HospitalController.destroy");

    Route.get("/enfermeira/:id", "EnfermeiraController.show");
    Route.post("/enfermeira", "EnfermeiraController.store");
    Route.put("/enfermeira/:id", "EnfermeiraController.update");
    Route.delete("/enfermeira/:id", "EnfermeiraController.destroy");

    Route.get("/checkToken", "AuthController.checkToken");
}).middleware('auth');

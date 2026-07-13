/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'


Route.get('/', async () => {
  return { hello: 'world' }
})

Route.get("/students", 'StudentsController.index').middleware(['Authorization','role:admin'])
Route.get("/studentsFind", 'StudentsController.show')
Route.post("/students", 'StudentsController.store')
Route.put("/students/update", 'StudentsController.update')
Route.delete("/students/delete", 'StudentsController.destroy').middleware(['Authorization','role:admin'])


Route.get('/departments', 'DepartmentsController.index')
Route.post('/departments', 'DepartmentsController.store')
Route.get('/findDepartment', 'DepartmentsController.show')
Route.put('/departments/update','DepartmentsController.update')
Route.delete("departments" , 'DepartmentsController.destroy')

Route.get('/users', 'AuthController.index') //
Route.get('/users/search', 'AuthController.show') //
Route.post('/register', 'AuthController.register') //
Route.post('/login', 'AuthController.login')//
Route.put('/users', 'AuthController.update')//
Route.delete('/users', 'AuthController.destroy')//
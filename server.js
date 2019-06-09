const Koa = require('koa');
const router = require('koa-simple-router');
const bodyParser = require('koa-bodyparser');
const koaRes = require('koa-res')
const logger = require('koa-logger');
const mongoose = require('mongoose');
const convert = require('koa-convert')
const error = require('koa-json-error')
const handleError = require('koa-handle-error')
const movie = require('./controller/movieController')

//Mongoose Config
mongoose.Promise = require('bluebird')
mongoose
.connect('mongodb://localhost/test', {useNewUrlParser: true})
.then((response) => {
    console.log('mongo connection success')
})
.catch((err) => {
    console.log("Error connecting to Mongo")
    console.log(err);
});

const app = new Koa();

// error handling
app.use(async (ctx, next) => {
    try {
      await next()
    } catch (err) {
      ctx.status = err.status || 500
      ctx.body = err.message
      ctx.app.emit('error', err, ctx)
    }
  })
  // logging
  app.use(logger())
  // body parsing
  app.use(bodyParser())
  // format response as JSON
  app.use(convert(koaRes()));
// configure router
app.use(router(_ => {
	_.get('/saysomething', async (ctx) => {
		ctx.body = 'hello world'
	}),
	_.get('/throwerror', async (ctx) => {
		throw new Error('Aghh! An error!')
	}),
	_.get('/movies', movie.getMovies)
	// _.post('/task', task.createTask),
	// _.put('/task', task.updateTask),
	// _.delete('/task', task.deleteTask),
	// _.post('/task/multi', task.createConcurrentTasks),
	// _.delete('/task/multi', task.deleteConcurrentTasks)
}))



app.listen(3000);
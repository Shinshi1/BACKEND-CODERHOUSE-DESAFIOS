// --- imports packages ---
// express
const express = require('express')
// cookie-parser
const cookieParser = require('cookie-parser')
// express-handlebars
const handlebars = require('express-handlebars')
// express-session
const session = require('express-session')
// socket.io & socketEvents & new-messages
const { Server } = require('socket.io')
const { sockets, messages } = require('./sockets')
// cors
const cors = require('cors')
// mongoose
const mongoose = require('mongoose')
// dotenv
require('dotenv').config()
// swagger
const swaggerJsdoc = require('swagger-jsdoc')
const swaggerUiExpress = require('swagger-ui-express')
// passport
const passport = require('passport');
const initializePassport = require('./config//passport.config.js')
// customError
const errorHandler = require('./middlewares/errors/index.js')
// mock
const { generateProducts } = require('./mock/products.mock.js')
// logger
const { addLogger } = require('./utils/logger.js')

const app = express();
// enviroment variables
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_NAME = process.env.DB_NAME;
const PORT = process.env.PORT || 8080;
const STRING_CONNECTION = `mongodb+srv://${DB_USER}:${DB_PASS}@codercluster.p8sktwl.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;
const MONGOSECRET = process.env.MONGOSECRET
const swaggerOptions = {
  definition: {
    openapi: '3.0.1',
    info: {
      title: "API de Carritos y Productos",
      description: "Documentación de la API para gestionar carritos y productos en mi ecommerce"
    }
  },
  apis: [`${__dirname}/docs/**/*.yaml`]
}


// imports routes
const { cartsRouter } = require('./routes/carts.routes.js')
const { productsRouter } = require('./routes/products.routes.js')
const { chatRouter } = require('./routes/chat.routes.js')
const loginRouter = require('./routes/login.routes.js')
const signupRouter = require('./routes/signup.routes.js')
const profileRouter = require('./routes/profile.routes.js')
const sessionsRouter = require('./routes/sessions.routes.js')
const forgotRouter = require('./routes/forgot.routes.js')
const loggerRouter = require('./routes/logger.routes.js')

const { messageRoute } = require('./routes/message.routes.js')
const MongoStore = require('connect-mongo')


// port
const httpServer = app.listen(PORT, () => console.log(`listening on http://localhost:${PORT}`))

httpServer.on('error', (error) => console.log(`Error en el servidor ${error}`))

// socket
const socketServer = new Server(httpServer)

// --- middleware ---
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(addLogger)

// view engine
app.engine('handlebars', handlebars.engine())
app.set('view engine', 'handlebars')
app.set('views', __dirname + '/views')
// static archives
app.use(express.static('public'))
app.use('/product', express.static('public'))
// app.use('/api', express.static('public'))

// connect-mongo
app.use(session({
  secret: MONGOSECRET,
  resave: true,
  saveUninitialized: true,
  store: MongoStore.create({
    mongoUrl: STRING_CONNECTION,
    mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
    ttl: 420,
  })
}))
initializePassport();
app.use(passport.initialize());
app.use(passport.session());


// routes
app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)
app.use('/chat', chatRouter)
app.use('/messages', messageRoute)
app.use('/login', loginRouter)
app.use('/signup', signupRouter)
app.use('/profile', profileRouter)
app.use('/sessions', sessionsRouter)
app.use('/forgot', forgotRouter)
app.use('/logger-test', loggerRouter)

const specs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs));

app.use(errorHandler)

// socketMessage = propaga los msj tanto localmente como desde mongoDB
app.post('/chat', (req, res) => {
  const { message } = req.body;
  socketServer.emit('message', message);

  res.send('ok');
});

app.get('/', async (req, res) => {
  try {
    res.status(200).render('products', { stylesheet: 'products' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
});

app.get('/product/:id', async (req, res) => {
  try {
    res.status(200).render('oneproduct', { stylesheet: 'oneproduct' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
});

app.get('/mockingproducts', async (req, res) => {
  const products = generateProducts(100)
  res.send(products)
});

// Socket Events
sockets(socketServer)

// receiving messages
app.get('/messages', (req, res) => {
  res.json(messages);
});

// Mongoose
const enviroment = async () => {
  mongoose.set('strictQuery', true)
  try {
    await mongoose.connect(STRING_CONNECTION);
    console.log('Conectado a MongoDB')
  } catch (error) {
    console.error(`Error: error al conectar a mongoDB... ${error}`)
    throw new Error(error)
  }
}

const isValidStartData = () => {
  return Boolean(DB_PASS && DB_USER)
};

isValidStartData && enviroment()

module.exports = {
  messages,
}
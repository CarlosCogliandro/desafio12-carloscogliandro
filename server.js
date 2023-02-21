
import express from "express";
import session from "express-session";
import __dirname from './src/utils/utils.js'
// import ejs from 'ejs';
import MongoStore from "connect-mongo";
import passport from "passport";
import initializeStrategies from "./src/config/passport.config.js";
import cartRouter from './src/routes/cart.router.js';
import productsRouter from './src/routes/products.router.js';
import sessionsRouter from './src/routes/sessions.router.js';
import viewsRouter from './src/routes/views.router.js';

const app = express();
const PORT = process.env.PORT || 8080;

// Socket
// import HttpServer from 'http'
// import SocketP from "./src/utils/sockets/index.js";

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`src/public`));
app.use(session({
    store: MongoStore.create({
        mongoUrl: "mongodb+srv://carloscogliandro:backendcarlos@cluster0.ng7biv3.mongodb.net/ecommerce?retryWrites=true&w=majority",
        ttl: 3600,
    }),
    secret: 'PalabraSecretaQueNadieVea',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000000,
    }
}));

// Passport
initializeStrategies();
app.use(passport.initialize());
app.use(passport.session())

// Engine
// app.engine('ejs', ejs.engine());
app.set("views", `src/views`);
app.set("view engine", "ejs");

//Routers
app.use('./cart', cartRouter);
app.use('/productos', productsRouter)
app.use('/sessions', sessionsRouter);
app.use('/', viewsRouter);

// const httpServer = HttpServer(app);

// const socket = new SocketP(httpServer);
// socket.init();

const connectedServer = app.listen(PORT, () => console.log(`Server ON By Carlos Cogliandro------> http://localhost:${PORT}`));
connectedServer.on('Error al conectar ----->', (error) => { console.log(error) });
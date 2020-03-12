require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const morgan = require("morgan");

//Configurando Express
const app = express();
const port = process.env.port || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(morgan('dev'));

//Conectando MongoDB
const uri = process.env.COMPASS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB conectado...')
});

//Configurando Rotas
const productRouter = require("./routes/product");
const userRouter = require("./routes/user");
const tableRouter = require("./routes/table");
const imageRouter = require("./routes/image");

app.use('/product', productRouter);
app.use('/product-img', imageRouter);
app.use('/user', userRouter);
app.use('/table', tableRouter);

//Subindo servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});




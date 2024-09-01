console.log("Vai Rodando!");
const express = require("express");
const address = "localhost";
const pug = require("pug");

app.use(express.static('public'));

app.set('view engine', 'pug');
app.set('views', 'views');

app.use(express.urlencoded({ extended: true }));

// Produtos na tela principal
app.get("/", (req, res) => {
  const produtos = [
    { nome: 'Notebook', descricao: 'Notebook Dell', preco: 2500 },
    { nome: 'Mouse', descricao: 'Mouse Gamer RGB full power', preco: 595 }
  ];
  res.render('index', { produtos });
});

// Tela de produtos
app.get("/produtos", (req, res) => {
  const produtos = [
    { nome: 'Notebook', descricao: 'Notebook Dell', preco: 2500 },
    { nome: 'Mouse', descricao: 'Mouse Gamer RGB full power', preco: 595 }
  ];
  res.render('produtos', { produtos });
});

// Tela de Login
app.get('/login', (req, res) => {
  res.render('login');
});

app.post('/login', (req, res) => {
  const { email, senha } = req.body;
  res.render('login', { error: 'Credenciais invalidas' });
});

// Tela de Cadastro
app.get('/cadastro', (req, res) => {
  res.render('cadastro');
});

app.post('/cadastro', (req, res) => {
  const { nome, email, senha } = req.body;
  res.render('cadastro', { error: 'Erro ao cadastrar usuário' });
});

// Iniciar o servidor
app.listen(3002, "0.0.0.0", () => {
  const host = server.address().address;
  const port = server.address().port;
  console.log(`Servidor executando no endereço http://${host}:${port}`);
});

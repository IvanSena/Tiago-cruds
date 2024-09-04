console.log("Vai Rodando!");
const express = require("express");
const pug = require("pug");
const crypto = require("crypto")
const app = express()

app.use(express.static('./public'));

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.urlencoded({ extended: true }));

// Produtos na tela principal
app.get("/", (req, res) => {
  const produtos = [
    {
      id: 1,
      nome: "Notebook",
      descricao:
        "Notebook Dell Inspiron 15, com processador Intel i7, 16GB de RAM, 512GB SSD, tela Full HD de 15.6 polegadas.",
      preco: 2999.99,
    },
    {
      id: 2,
      nome: "Mouse",
      descricao:
        "Mouse sem fio Logitech MX Master 3, ergonômico, com sensor de alta precisão e bateria recarregável.",
      preco: 99.99,
    },
    {
      id: 3,
      nome: "Teclado",
      descricao:
        "Teclado mecânico sem fio Keychron K2, com switches Red, retroiluminação RGB, compatível com Windows e macOS.",
      preco: 199.99,
    },
    {
      id: 4,
      nome: "Monitor",
      descricao:
        "Monitor LG UltraWide 34'', resolução 2560x1080, tecnologia IPS, ideal para multitarefa e edição de vídeo.",
      preco: 1499.99,
    },
    {
      id: 5,
      nome: "Headset",
      descricao:
        "Headset Gamer HyperX Cloud II, som surround 7.1, microfone removível, estrutura em alumínio.",
      preco: 499.99,
    },
    {
      id: 6,
      nome: "Impressora",
      descricao:
        "Impressora Multifuncional HP DeskJet 3776, com Wi-Fi, impressão, cópia e digitalização, compatível com smartphones e tablets.",
      preco: 399.99,
    },
  ];
  res.render('index', { produtos });
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
const server = app.listen(3000, "0.0.0.0", () => {
  const host = server.address().address;
  const port = server.address().port;
  console.log(`Servidor executando no endereço http://${host}:${port}`);
});

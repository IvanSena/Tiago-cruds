console.log("Vai Rodando!");
const express = require("express");
const pug = require("pug");
const crypto = require("crypto")
const app = express()

app.use(express.static('./public'));

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//lista de usuários HARDCODE
const users = [
  {
    uid: 1,
    name: "Samir Brasil",
    email: "samir@gmail.com",
    password: "senha123",
  },
  {
    uid: 2,
    name: "Ivan Sena",
    email: "sena@gmail.com",
    password: "senha123",
  },
  {
    uid: 3,
    name: "y",
    email: "s@g",
    password: "1",
  },
];
let session = {};

function autenticador(email, password) {
  let count;
  let token;

  for (count = 0; count < users.length; count++) {
    if (
      users[count].email === email &&
      users[count].password === password
    ) {
      token = gerarToken(users[count]);
      return { user: users[count], authToken: token };
    };
  }
  return null;
}
function gerarToken(user) {
  const tokenBase = `${user.uid}-$${user.email}-${Date.now()}`;
  return crypto.createHash("sha256").update(tokenBase).digest("hex");
}
function authMiddleware(req, res, next) {
  const { authToken } = req.query;

  if (session.authToken === authToken) {
    req.user = session.user;
    console.log(session.user);
    next();
  } else {
    console.log(session.user);
    res.status(401).redirect("/")
  }
}

//Rota de login (É a primeira tela praticamente)
app.get("/", (_, res) => {
  res.render("login");
});

//rota de autenticação
app.post("/authenticated", (req, res) => {
  const { email, password } = req.body;
  const authResult = autenticador(email, password);
  session = autenticador(email, password);

  if (authResult) {
    res.status(200).json({
      message: "Login realizado com sucesso!",
      authToken: authResult.authToken,
    });
    //res.redirect(`/home?token=${authResult.token}`);
  } else {
    res.status(401).json({ message: "Usuário ou senha inválidos" });
  }
});



app.get("/home", authMiddleware, (req, res) => {
  res.render("home", { produtos, user: session.user, authToken: session.authToken });
});

let produtos = [
  {
    id: 1,
    nome: "Notebook",
    descricao: "Notebook Dell Inspiron 15, com processador Intel i7, 16GB de RAM, 512GB SSD, tela Full HD de 15.6 polegadas.",
    preco: 2999.99,
    imagem: "https://www.dell.com/pt-br/shop/notebooks-dell/notebook-inspiron-15/spd/inspiron-15-3520-laptop/i3520wadl1012w"
  },
  {
    id: 2,
    nome: "Mouse",
    descricao: "Mouse sem fio Logitech MX Master 3, ergonômico, com sensor de alta precisão e bateria recarregável.",
    preco: 99.99,
    imagem: "https://http2.mlstatic.com/D_NQ_NP_768669-MLU75720929309_042024-O.webp"
  },
  {
    id: 3,
    nome: "Teclado",
    descricao: "Teclado mecânico sem fio Keychron K2, com switches Red, retroiluminação RGB, compatível com Windows e macOS.",
    preco: 199.99,
    imagem: "https://www.kabum.com.br/_next/image?url=https%3A%2F%2Fimages.kabum.com.br%2Fprodutos%2Ffotos%2F105009%2Fteclado-mecanico-gamer-hyperx-alloy-origins-core-rgb-hx-kb7rdx-br_1574693479_g.jpg&w=640&q=100"
  },
  {
    id: 4,
    nome: "Monitor",
    descricao: "Monitor LG UltraWide 34'', resolução 2560x1080, tecnologia IPS, ideal para multitarefa e edição de vídeo.",
    preco: 1499.99,
    imagem: "https://http2.mlstatic.com/D_NQ_NP_929217-MLA50289011373_062022-O.webp"
  },
];

app.post("/delete-product", (req, res) => {
  const { id } = req.body;

  produtos = produtos.filter(produto => produto.id !== parseInt(id));

  res.status(200).json({ success: true, message: "Produto excluído com sucesso!" });
});



app.post("/editar-produto", (req, res) => {
  const { id, nome, descricao, preco, imagem } = req.body;

  const index = produtos.findIndex(produto => produto.id === parseInt(id));
  
  if (index !== -1) {
    produtos[index] = { id: parseInt(id), nome, descricao, preco: parseFloat(preco), imagem };
    res.status(200).json({ success: true, message: "Produto atualizado com sucesso!" });
  } else {
    res.status(404).json({ success: false, message: "Produto não encontrado." });
  }
});

let currentId = produtos.length + 1;

app.post('/cadastrar-produto', (req, res) => {
  const { nome, descricao, preco, imagem } = req.body;

  if (!nome || !descricao || !preco) {
    return res.status(400).json({ success: false, message: 'Todos os campos são obrigatórios.' });
  }

  const novoProduto = {
    id: currentId++,
    nome,
    descricao,
    preco: parseFloat(preco),
    imagem: imagem || ''
  };

  produtos.push(novoProduto);

  res.status(200).json({ success: true, message: 'Produto cadastrado com sucesso!', produto: novoProduto });
});

app.get("/produtos", authMiddleware, (req, res) => {
  res.render("produtos", { authToken: session.authToken, produtos });
});

app.get("/cadastro", authMiddleware, (req, res) => {
  res.render("cadastro", { authToken: session.authToken });
});
// Iniciar o servidor
const server = app.listen(3000, "0.0.0.0", () => {
  const host = server.address().address;
  const port = server.address().port;
  console.log(`Servidor executando no endereço http://${host}:${port}`);
});
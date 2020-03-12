const router = require("express").Router();
let User = require("../models/user.model");

//Requisições ao DB
router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch((err) => res.status(400).json('Erro:' + err));
});

router.route('/add').post((req, res) => {
  const nome = req.body.nome;
  const sobrenome = req.body.sobrenome;
  const cpf = Number(req.body.cpf);
  const email = req.body.email;
  const senha = req.body.senha;

  const newUser = new User({
    nome,
    sobrenome,
    cpf,
    email,
    senha
  });

  newUser.save()
    .then(() => res.json('Usuário adicionado com sucesso!'))
    .catch((err) => res.status(400).json('Erro:' + err));
});

router.route('/:id').get((req, res) => {
  User.findById(req.params.id)
    .then(user => res.json(user))
    .catch((err) => res.status(400).json('Erro:' + err));
});

router.route('/delete/:id').delete((req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(() => res.json('Usuário removido!'))
    .catch((err) => res.status(400).json('Erro:' + err));
});

router.route('/update/:id').post((req, res) => {
  User.findById(req.params.id)
    .then(user => {
      user.nome = req.body.nome;
      user.sobrenome = req.body.sobrenome;
      user.cpf = Number(req.body.cpf);
      user.email = req.body.email;
      user.senha = req.body.senha;

      user.save()
        .then(() => res.json('Usuário alterado com sucesso!'))
        .catch((err) => res.status(400).json('Erro:' + err));
    })
    .catch((err) => res.status(400).json('Erro:' + err));
});

module.exports = router
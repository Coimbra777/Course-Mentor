const bcrypt = require("bcrypt-nodejs");

module.exports = (app) => {
  const { existsOrError, notExistsOrError, equalsOrError } = app.api.validation;

  const encryptPassword = (password) => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  };

  // métodos que lida com a criação e atualização de usuários.
  const save = async (req, res) => {
    const user = { ...req.body };
    if (req.params.id) user.id = req.params.id;

    // if (!req.originalUrl.startsWith("/users")) user.admin = false;
    // if (!req.user || !req.user.admin) user.admin = false;

    try {
      existsOrError(user.name, "Nome não informado");
      existsOrError(user.email, "E-mail não informado");
      existsOrError(user.password, "Senha não informada");
      existsOrError(user.confirmPassword, "Confirmação de senha inválida");
      equalsOrError(user.password, user.confirmPassword, "Senhas não conferem");

      const userFromDB = await app
        .db("users")
        .where({ email: user.email })
        .first();
      if (!user.id) {
        notExistsOrError(userFromDB, "Usuário já cadastrado");
      }
    } catch (msg) {
      return res.status(400).send(msg);
    }
    user.password = encryptPassword(user.password);

    delete user.confirmPassword;

    if (user.id) {
      app
        .db("users")
        .update(user)
        .where({ id: user.id })
        .whereNull("deleteAt")
        .then((_) => res.status(204).send())
        .catch((err) => res.status(500).send(err));
    } else {
      app
        .db("users")
        .insert(user)
        .then((_) => res.status(204).send())
        .catch((err) => res.status(500).send(err));
    }
  };
  // Retorna todos os usuários do banco de dados.
  const get = (req, res) => {
    app
      .db("users")
      .select("id", "name", "email", "admin")
      .whereNull("deleteAt")
      .then((user) => res.json(user))
      .catch((err) => res.status(500).send(err));
  };

  // Retorna um usuário específico com base no ID.
  const getById = (req, res) => {
    app
      .db("users")
      .select("id", "name", "email", "admin")
      .where({ id: req.params.id })
      .whereNull("deleteAt")
      .first()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).send(err));
  };

  const remove = async (req, res) => {
    try {
      const articles = await app.db("articles").where({
        userId: req.params.id,
      });

      if (articles.length > 0) {
        return res
          .status(400)
          .send("Usuário possui artigos associados e não pode ser excluído.");
      }

      const rowsDeleted = await app
        .db("users")
        .where({ id: req.params.id })
        .del();

      if (rowsDeleted > 0) {
        return res.status(204).send();
      } else {
        return res.status(404).send("Usuário não encontrado.");
      }
    } catch (error) {
      console.error("Erro ao excluir usuário:", error);
      res.status(500).send("Erro interno ao excluir usuário.");
    }
  };

  return { save, get, getById, remove };
};

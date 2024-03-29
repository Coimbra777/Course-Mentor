const { authSecret } = require("../.env");
const jwt = require("jwt-simple");
const bcrypt = require("bcrypt-nodejs");

module.exports = (app) => {
  const signin = async (req, res) => {
    try {
      if (!req.body.email || !req.body.password) {
        return res.status(400).send("Informe usuário e senha!");
      }

      const user = await app
        .db("users")
        .where({ email: req.body.email })
        .first();

      if (!user) return res.status(400).send("Usuário não encontrado!");

      const isMatch = bcrypt.compareSync(req.body.password, user.password);

      if (!isMatch) return res.status(401).send("Email/Senha inválidos");

      const now = Math.floor(Date.now() / 1000);

      const payload = {
        id: user.id,
        name: user.name,
        email: user.email,
        admin: user.admin,
        iat: now,
        exp: now + 60 * 60 * 24 * 3,
      };

      res.json({
        ...payload,
        token: jwt.encode(payload, authSecret),
      });
    } catch (error) {
      console.error("Erro durante a autenticação:", error);
      res.status(500).send("Erro durante a autenticação");
    }
  };

  const validateToken = async (req, res) => {
    try {
      const userData = req.body || null;
      if (!userData || !userData.token) {
        return res.status(401).send("Token não fornecido");
      }

      const token = jwt.decode(userData.token, authSecret);
      if (new Date(token.exp * 1000) > new Date()) {
        return res.send(true);
      }
      res.send(false);
    } catch (error) {
      console.error("Erro durante a validação do token:", error);
      res.status(500).send("Erro durante a validação do token");
    }
  };

  return { signin, validateToken };
};

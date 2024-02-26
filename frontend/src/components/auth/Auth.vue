<template>
  <div class="auth-content">
    <div class="auth-modal">
      <h2>{{ showSignup ? "Cadastro" : "Login" }}</h2>
      <form @submit.prevent="submitForm">
        <div v-if="showSignup" class="form-group">
          <label for="username">Nome de usuário:</label>
          <input type="text" id="username" v-model="user.name" />
        </div>
        <div class="form-group">
          <label for="email">E-mail:</label>
          <input type="email" id="email" v-model="user.email" />
        </div>
        <div class="form-group">
          <label for="password">Senha:</label>
          <input type="password" id="password" v-model="user.password" />
        </div>
        <div v-if="showSignup" class="form-group">
          <label for="confirm-password">Confirmar Senha:</label>
          <input
            type="password"
            id="confirm-password"
            v-model="user.confirmPassword"
          />
        </div>
        <div>
          <button v-if="showSignup" @click="signup">Registrar</button>
          <button v-else @click="signin">Entrar</button>
        </div>
        <p>
          {{ showSignup ? "Já possui uma conta?" : "Não possui uma conta?" }}
          <a href="#" @click="toggleSignup">{{
            showSignup ? "Entrar" : "Cadastrar"
          }}</a>
        </p>
      </form>
    </div>
  </div>
</template>

<script>
import { baseApiUrl, userKey } from "../../global";
import axios from "axios";
import { useToast } from "vue-toastification";

export default {
  name: "AuthPage",
  data() {
    return {
      showSignup: false,
      user: {},
      toast: null,
    };
  },
  methods: {
    toggleSignup() {
      this.showSignup = !this.showSignup;
    },
    signin() {
      axios
        .post(`${baseApiUrl}/signin`, this.user)
        .then((res) => {
          this.$store.commit("setUser", res.data);
          localStorage.setItem(userKey, JSON.stringify(res.data));
          this.$router.push({ path: "/" });
          this.showToast("Login bem-sucedido", "success");
        })
        .catch((error) => {
          if (error.response.data) {
            this.showToast(error.response.data, "error");
          } else {
            this.showToast("Erro ao fazer login", "error");
          }
        });
    },

    signup() {
      axios
        .post(`${baseApiUrl}/signup`, this.user)
        .then(() => {
          this.showToast("Usuário cadastrado com sucesso", "success");
          this.user = {};
          this.showSignup = false;
        })
        .catch((error) => {
          if (error.response && error.response.data) {
            this.showToast(error.response.data, "error");
          } else {
            this.showToast("Erro ao cadastrar o usuário", "error");
          }
        });
    },

    showToast(message, type) {
      this.toast(message, { type: type });
    },
  },
  mounted() {
    this.toast = useToast();
  },
};
</script>

<style>
.auth-content {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.auth-modal {
  width: 500px;
  background-color: white;
  padding: 50px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  flex-direction: column;
}
.form-group {
  margin-bottom: 15px;
}
input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
button:hover {
  background-color: #0056b3;
}
</style>

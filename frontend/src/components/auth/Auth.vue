<template>
  <div class="auth-content">
    <div class="auth-modal">
      <h2>{{ showSignup ? "Cadastro" : "Login" }}</h2>
      <form @submit.prevent="submitForm">
        <div v-if="showSignup" class="form-group">
          <label for="username">Nome de usuário:</label>
          <input type="text" id="username" v-model="user.username" required />
        </div>
        <div class="form-group">
          <label for="email">E-mail:</label>
          <input type="email" id="email" v-model="user.email" required />
        </div>
        <div class="form-group">
          <label for="password">Senha:</label>
          <input
            type="password"
            id="password"
            v-model="user.password"
            required
          />
        </div>
        <div v-if="showSignup" class="form-group">
          <label for="confirm-password">Confirmar Senha:</label>
          <input
            type="password"
            id="confirm-password"
            v-model="user.confirmPassword"
            required
          />
        </div>
        <button type="submit">{{ showSignup ? "Cadastrar" : "Entrar" }}</button>
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
// import { baseApiUrl, userKey } from "../../global";
export default {
  name: "AuthPage",
  data: function () {
    return {
      showSignup: false,
      user: {},
    };
  },
  methods: {
    toggleSignup() {
      this.showSignup = !this.showSignup;
    },
    submitForm() {
      if (this.showSignup) {
        // Lógica para cadastro
        console.log("Cadastro:", this.user);
      } else {
        // Lógica para login
        console.log("Login:", this.user);
      }
    },
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

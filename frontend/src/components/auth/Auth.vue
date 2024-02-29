<template>
  <div class="auth-content">
    <div class="auth-modal">
      <div>
        <Logo />
      </div>
      <h2>{{ showSignup ? "Cadastro" : "Login" }}</h2>
      <form @submit.prevent="submitForm">
        <div v-if="showSignup" class="form-group">
          <i class="fa fa-user"></i>
          <input
            class="form-input"
            type="text"
            id="username"
            v-model="user.name"
            placeholder="Nome de usuário"
          />
        </div>
        <div class="form-group">
          <i class="fa fa-envelope"></i>
          <input
            class="form-input"
            type="email"
            id="email"
            v-model="user.email"
            placeholder="E-mail"
          />
        </div>
        <div class="form-group">
          <i class="fa fa-lock"></i>
          <input
            class="form-input"
            type="password"
            id="password"
            v-model="user.password"
            placeholder="Senha"
          />
        </div>
        <div v-if="showSignup" class="form-group">
          <i class="fa fa-lock"></i>
          <input
            class="form-input"
            type="password"
            id="confirm-password"
            v-model="user.confirmPassword"
            placeholder="Confirmar Senha"
          />
        </div>
        <div>
          <button class="button-form" v-if="showSignup" @click="signup">
            Registrar
          </button>
          <button class="button-form" v-else @click="signin">Entrar</button>
        </div>
        <hr />
        <div class="form-content">
          <p>
            {{ showSignup ? "Já possui uma conta?" : "Não possui uma conta?" }}
            <a class="link-router" href="#" @click="toggleSignup">{{
              showSignup ? "Entrar" : "Cadastrar"
            }}</a>
          </p>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { baseApiUrl, userKey } from "../../global";
import axios from "axios";
import { useToast } from "vue-toastification";
import Logo from "./Logo.vue";

export default {
  name: "AuthPage",
  components: { Logo },
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
          // this.showToast("Login bem-sucedido", "success");
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
  width: 400px;
  display: flex;
  align-items: center;
  flex-direction: column;
  color: #f6f4e6;
  border-radius: 5px;
}
.logo {
  width: 100px;
  height: 100px;
  margin-bottom: 20px;
}
.form-group {
  position: relative;
  padding: 10px 0;
}
.form-group i {
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: #ccc;
}
.form-input {
  width: 100%;
  padding: 8px 30px 8px 35px;
  border: none;
  outline: none;
  border-radius: 4px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);
}
.button-form {
  width: 100%;
  padding: 10px;
  background-color: #ffd711;
  color: #41444b;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin: 10px 0;
}
.button-form:hover {
  background-color: #fddc3a;
}
.link-router {
  text-decoration: none;
}
.link-router:hover {
  color: #fddc3a;
}
.auth-content hr {
  color: #41444b;
}
.auth-content h2 {
  color: #41444b;
}
.form-content {
  color: #41444b;
}
</style>

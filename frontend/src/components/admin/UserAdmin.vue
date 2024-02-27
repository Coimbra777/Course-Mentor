<template>
  <div class="user-admin">
    <form class="form">
      <div class="row">
        <div class="col-md-6">
          <label for="user-name">Nome:</label>
          <input
            id="user-name"
            type="text"
            class="form-control"
            v-model="user.name"
            required
            placeholder="Informe o Nome do Usuário..."
            :disabled="mode === 'remove'"
          />
        </div>
        <div class="col-md-6">
          <label for="user-email">Email:</label>
          <input
            id="user-email"
            type="email"
            class="form-control"
            v-model="user.email"
            required
            placeholder="Informe o Email do Usuário..."
            :disabled="mode === 'remove'"
          />
        </div>
      </div>
      <div class="form-check mt-3 mb-3" v-show="mode === 'save'">
        <input
          type="checkbox"
          id="user-admin"
          class="form-check-input"
          v-model="user.admin"
        />
        <label for="user-admin" class="form-check-label">Administrador?</label>
      </div>
      <div class="row" v-show="mode === 'save'">
        <div class="col-md-6">
          <label for="user-password">Senha:</label>
          <input
            id="user-password"
            type="password"
            class="form-control"
            v-model="user.password"
            required
            placeholder="Informe a Senha do Usuário..."
            :disabled="mode === 'remove'"
          />
        </div>
        <div class="col-md-6">
          <label for="user-confirm-password">Confirmação de Senha:</label>
          <input
            id="user-confirm-password"
            type="password"
            class="form-control"
            v-model="user.confirmPassword"
            required
            placeholder="Confirme a Senha do Usuário..."
            :disabled="mode === 'remove'"
          />
        </div>
      </div>
      <div class="mt-3 mb-3">
        <button
          type="button"
          class="btn btn-primary"
          v-if="mode === 'save'"
          @click="save"
        >
          Salvar
        </button>
        <button
          type="button"
          class="btn btn-danger"
          v-if="mode === 'remove'"
          @click="remove()"
        >
          Excluir
        </button>
        <button class="btn btn-secondary m-2" @click="reset">Cancelar</button>
      </div>
    </form>

    <table class="user-table">
      <thead>
        <tr>
          <th
            v-for="(field, index) in fields"
            :key="index"
            @click="sortBy(field.key)"
          >
            <div class="th-content">
              {{ field.label }}
              <span class="icon-table" v-if="sortField === field.key">
                {{ sortOrder === "asc" ? "▲" : "▼" }}
              </span>
              <span class="icon-table" v-else-if="field.key !== 'actions'">
                ▼
                {{ field.icon }}
              </span>
            </div>
          </th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="user in sortedUsers"
          :key="user.id"
          :class="{ 'admin-row': user.admin }"
        >
          <td v-for="(field, index) in fields" :key="index">
            <template v-if="field.key === 'admin'">
              {{ user.admin ? "Sim" : "Não" }}
            </template>
            <template v-else>
              {{ user[field.key] }}
            </template>
          </td>
          <td class="button-cell">
            <button
              type="button"
              class="btn btn-warning btn-sm button-edit"
              variant="warning"
              @click="loadUser(user)"
            >
              <i class="fa fa-pencil"></i>
            </button>
            <button
              type="button"
              class="btn btn-danger btn-sm button-delete"
              variant="danger"
              @click="loadUser(user, 'remove')"
            >
              <i class="fa fa-trash"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";
import { baseApiUrl } from "../../global";
import { useToast } from "vue-toastification";

export default {
  name: "UserAdmin",
  data() {
    return {
      mode: "save",
      user: {},
      users: [],
      fields: [
        { key: "id", label: "Código" },
        { key: "name", label: "Nome" },
        { key: "email", label: "E-mail" },
        { key: "admin", label: "Administrador" },
      ],
      sortField: null,
      sortOrder: "asc",
      toast: null,
    };
  },
  computed: {
    sortedUsers() {
      if (!this.sortField) return this.users;
      return this.users.slice().sort((a, b) => {
        const modifier = this.sortOrder === "asc" ? 1 : -1;
        if (a[this.sortField] < b[this.sortField]) return -1 * modifier;
        if (a[this.sortField] > b[this.sortField]) return 1 * modifier;
        return 0;
      });
    },
  },
  methods: {
    loadUsers() {
      const url = `${baseApiUrl}/users`;
      axios.get(url).then((res) => {
        this.users = res.data;
      });
    },
    loadUser(user, mode = "save") {
      this.mode = mode;
      this.user = { ...user };
      console.log(this.user);
    },
    sortBy(field) {
      if (this.sortField === field) {
        this.sortOrder = this.sortOrder === "asc" ? "desc" : "asc";
      } else {
        this.sortField = field;
        this.sortOrder = "asc";
      }
    },
    reset() {
      this.mode = "save";
      this.user = {};
      this.loadUsers();
    },
    save() {
      const method = this.user.id ? "put" : "post";
      const id = this.user.id ? `/${this.user.id}` : "";
      axios[method](`${baseApiUrl}/users${id}`, this.user)
        .then(() => {
          if (method === "post") {
            this.toast.success("Usuário cadastrado com sucesso!", {
              timeout: 2000,
            });
          } else if (method === "put") {
            this.toast.success("usuário alterado com sucesso!", {
              timeout: 2000,
            });
          } else {
            return;
          }
          this.reset();
        })
        .catch((error) => {
          if (error.response.data) {
            this.toast.error(error.response.data, "error");
          } else {
            this.toast.error("Erro ao fazer login", "error");
          }
        });
    },
    remove() {
      const id = this.user.id;
      axios
        .delete(`${baseApiUrl}/users/${id}`)
        .then(() => {
          this.toast.success("Usuário removido com sucesso!");
          this.reset();
        })
        .catch(() => {
          this.toast.error("Erro ao remover o usuário!");
        });
    },
  },
  mounted() {
    this.loadUsers();
    this.toast = useToast();
  },
};
</script>

<style>
.user-table {
  max-width: 100%;
  width: 100%;
}

.user-table th,
.user-table td {
  padding: 20px;
  border-bottom: 1px solid #ddd;
  text-align: left;
  cursor: pointer;
}

.user-table th {
  background-color: #f2f2f2;
  font-weight: bold;
}

.th-content {
  display: flex;
  justify-content: space-between;
}

.form-group {
  padding: 20px 0;
}

.button-cell button {
  font-size: 25px;
  background-color: transparent;
  border: none;
  margin: 0;
}
.button-cell button i {
  margin: 0;
  padding: 2px;
}

.button-cell .button-edit {
  color: orange;
}

.button-cell .button-delete {
  color: red;
}

.button-cell button:hover {
  cursor: pointer;
  background-color: transparent;
  transform: scale(1.2);
}

.user-admin {
  margin: 20px;
}

.form-control {
  height: 45px;
}

.btn-primary,
.btn-danger,
.btn-secondary {
  padding: 10px 20px;
  font-size: 16px;
  margin-right: 10px;
}

.user-table th,
.user-table td {
  padding: 15px;
}

.user-table th {
  background-color: #f2f2f2;
}

.form {
  margin: 40px 0;
}
.form label {
  margin-bottom: 10px;
}
.form input {
  background-color: #f2f2f2;
}
</style>

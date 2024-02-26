<template>
  <div class="user-admin">
    <div class="form-group">
      <form>
        <input type="hidden" id="user-id" v-model="user.id" />
        <div class="row">
          <div class="col-md-6">
            <div class="form-group">
              <label for="user-name">Nome:</label>
              <input
                id="user-name"
                type="text"
                class="form-control"
                v-model="user.name"
                required
                placeholder="Informe o Nome do Usuário..."
                :readonly="mode === 'remove'"
              />
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group">
              <label for="user-email">Email:</label>
              <input
                id="user-email"
                type="email"
                class="form-control"
                v-model="user.email"
                required
                placeholder="Informe o Email do Usuário..."
              />
            </div>
          </div>
        </div>
        <div class="form-check mt-3 mb-3">
          <input
            type="checkbox"
            id="user-admin"
            class="form-check-input"
            v-model="user.admin"
          />
          <label for="user-admin" class="form-check-label"
            >Administrador?</label
          >
        </div>
        <div class="row">
          <div class="col-md-6">
            <div class="form-group">
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
          </div>
          <div class="col-md-6">
            <div class="form-group">
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
        </div>
        <div class="mt-3 mb-3">
          <button class="btn btn-primary" v-if="mode === 'save'" @click="save">
            Salvar
          </button>
          <button
            class="btn btn-danger"
            v-if="mode === 'remove'"
            @click="remove(user.id)"
          >
            Excluir
          </button>
          <button class="btn btn-secondary m-2" @click="reset">Cancelar</button>
        </div>
      </form>
    </div>

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
          <td>
            <button
              class="btn btn-warning btn-sm"
              variant="warning"
              @click="loadUser(user)"
            >
              <i class="fa fa-pencil"></i>
            </button>
            <button
              class="btn btn-danger btn-sm m-2"
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
      const id = this.user.id ? `${this.user.id}` : "";
      axios[method](`${baseApiUrl}/users${id}`, this.user)
        .then((res) => {
          this.toast.success("Usuário cadastrado com sucesso!", {
            timeout: 2000,
          });
          console.log(res);
          this.reset();
        })
        .catch((error) => {
          console.error("Erro ao cadastrar o usuário:", error);
          this.toast.error("Erro ao cadastrar o usuário!");
        });
    },
    remove(userId) {
      axios
        .delete(`${baseApiUrl}/users/${userId}`)
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

.admin-row {
  background-color: #dff0d8;
}

.th-content {
  display: flex;
  justify-content: space-between;
}

.form-group {
  padding: 20px 0;
}
</style>

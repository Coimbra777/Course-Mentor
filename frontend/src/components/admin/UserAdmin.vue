<template>
  <div class="user-admin">
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
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";
import { baseApiUrl } from "../../global";

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
        {
          key: "admin",
          label: "Administrador",
        },
        { key: "actions", label: "Ações" },
      ],
      sortField: null,
      sortOrder: "asc",
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
        console.log(this.users);
      });
    },
    sortBy(field) {
      if (this.sortField === field) {
        this.sortOrder = this.sortOrder === "asc" ? "desc" : "asc";
      } else {
        this.sortField = field;
        this.sortOrder = "asc";
      }
    },
  },
  mounted() {
    this.loadUsers();
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
</style>

<template>
  <div class="category-admin">
    <form @submit.prevent="submitForm" class="form">
      <div class="row">
        <label for="category-name">Categoria:</label>
        <input
          id="category-name"
          type="text"
          class="form-control"
          v-model="category.name"
          required
          placeholder="Informe a Categoria..."
          :disabled="mode === 'remove'"
        />
      </div>
      <div class="row" v-show="mode === 'save'">
        <label for="category-parentId">Categoria Pai:</label>
        <select
          class="form-control"
          name="category"
          id="category-parentId"
          v-model="category.parentId"
        >
          <option v-for="cat in categories" :key="cat.id" :value="cat.id">
            {{ cat.path }}
          </option>
        </select>
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
        <button type="button" class="btn btn-secondary m-2" @click="reset">
          Cancelar
        </button>
      </div>
    </form>

    <table class="category-table">
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
        <tr v-for="category in sortedCategories" :key="category.id">
          <td>{{ category.id }}</td>
          <td>{{ category.name }}</td>
          <td>{{ category.path }}</td>
          <td class="button-cell">
            <button
              type="button"
              class="btn btn-warning btn-sm button-edit"
              variant="warning"
              @click="loadCategory(category)"
            >
              <i class="fa fa-pencil"></i>
            </button>
            <button
              class="btn btn-danger btn-sm button-delete"
              variant="danger"
              @click="loadCategory(category, 'remove')"
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
  name: "CategorieAdmin",
  data() {
    return {
      mode: "save",
      category: {},
      categories: [],
      fields: [
        { key: "id", label: "Código" },
        { key: "name", label: "Nome" },
        { key: "path", label: "Caminho" },
      ],
      sortField: null,
      sortOrder: "asc",
      toast: null,
    };
  },
  computed: {
    sortedCategories() {
      if (!this.sortField) return this.categories;
      return this.categories.slice().sort((a, b) => {
        const modifier = this.sortOrder === "asc" ? 1 : -1;
        if (a[this.sortField] < b[this.sortField]) return -1 * modifier;
        if (a[this.sortField] > b[this.sortField]) return 1 * modifier;
        return 0;
      });
    },
  },
  methods: {
    loadCategories() {
      const url = `${baseApiUrl}/categories`;
      axios.get(url).then((res) => {
        // this.categories = res.data;
        this.categories = res.data.map((category) => {
          return { ...category, value: category.id, text: category.path };
        });
      });
    },
    loadCategory(category, mode = "save") {
      this.mode = mode;
      this.category = {
        id: category.id,
        name: category.name,
        parentId: category.parentId,
      };
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
      this.category = {};
    },
    save() {
      const method = this.category.id ? "put" : "post";
      const id = this.category.id ? `/${this.category.id}` : "";
      axios[method](`${baseApiUrl}/categories${id}`, this.category)
        .then(() => {
          if (method === "post") {
            this.toast.success("Categoria cadastrada com sucesso!", {
              timeout: 2000,
            });
          } else if (method === "put") {
            this.toast.success("Categoria alterada com sucesso!", {
              timeout: 2000,
            });
          } else {
            return;
          }
          this.loadCategories();
          this.reset();
        })
        .catch((error) => {
          if (error.response.data) {
            this.toast.error(error.response.data, "error");
          } else {
            this.toast.error("Erro ao cadastrar a categoria", "error");
          }
        });
    },
    remove() {
      const id = this.category.id;
      axios
        .delete(`${baseApiUrl}/categories/${id}`)
        .then(() => {
          this.toast.success("Categoria removida com sucesso!");
          this.loadCategories();

          this.reset();
        })
        .catch((error) => {
          if (error.response && error.response.data) {
            this.toast.error(error.response.data);
          } else {
            this.toast.error("Erro ao remover a categoria!");
          }
        });
    },
  },
  mounted() {
    this.loadCategories();
    this.toast = useToast();
  },
};
</script>

<style scoped>
.category-table {
  width: 100%;
}

.category-table th,
.category-table td {
  padding: 8px;
  border-bottom: 1px solid #ddd;
  text-align: left;
}

.category-table th {
  background-color: #f2f2f2;
  font-weight: bold;
}

.row {
  margin-bottom: 20px;
}

.button-cell button {
  background-color: transparent;
  border: none;
  cursor: pointer;
}

.button-cell button i {
  margin: 0;
}

.button-cell .button-edit {
  color: orange;
}

.button-cell .button-delete {
  color: red;
}

.button-cell button:hover {
  transform: scale(1.2);
}

.btn-primary,
.btn-danger,
.btn-secondary {
  padding: 8px 16px;
  margin-right: 10px;
}
</style>

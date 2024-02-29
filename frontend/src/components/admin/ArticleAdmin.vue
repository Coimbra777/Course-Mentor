<template>
  <div class="article-admin">
    <form @submit.prevent="mode === 'save' ? save() : remove()" class="form">
      <!-- Inputs para nome, descrição e imagem -->
      <input type="hidden" v-model="article.id" />
      <div class="form-group row">
        <label for="article-name">Nome do Artigo:</label>
        <input
          id="article-name"
          type="text"
          class="form-control"
          v-model="article.name"
          :readonly="mode === 'remove'"
          placeholder="Informe o Nome do Artigo..."
        />
      </div>
      <div class="form-group row">
        <label for="article-description">Descrição:</label>
        <input
          id="article-description"
          type="text"
          class="form-control"
          v-model="article.description"
          :readonly="mode === 'remove'"
          placeholder="Informe a Descrição do Artigo..."
        />
      </div>
      <div v-if="mode === 'save'" class="form-group row">
        <label for="article-imageUrl">Imagem (URL):</label>
        <input
          id="article-imageUrl"
          type="text"
          class="form-control"
          v-model="article.imageUrl"
          :readonly="mode === 'remove'"
          placeholder="Informe a URL da Imagem..."
        />
      </div>

      <!-- Select para categoria -->
      <div v-show="mode === 'save'" class="row">
        <label for="article-categoryId">Categoria:</label>
        <select
          class="form-control-select"
          name="article-categoryId"
          id="article-categoryId"
          v-model="article.categoryId"
        >
          <option
            v-for="category in categories"
            :key="category.value"
            :value="category.value"
          >
            {{ category.text }}
          </option>
        </select>
      </div>

      <!-- Select para autor -->
      <div v-show="mode === 'save'" class="row">
        <label for="article-userId">Autor:</label>
        <select
          class="form-control-select"
          name="article-userId"
          id="article-userId"
          v-model="article.userId"
        >
          <option v-for="user in users" :key="user.value" :value="user.value">
            {{ user.text }}
          </option>
        </select>
      </div>

      <!-- Editor de conteúdo -->
      <div v-if="mode === 'save'" class="form-group row">
        <label for="article-content">Conteúdo:</label>
        <textarea
          id="article-content"
          class="form-control"
          v-model="article.content"
          rows="6"
          placeholder="Informe o Conteúdo do Artigo..."
        ></textarea>
      </div>

      <!-- Botões de ação -->
      <div class="mt-3 mb-3">
        <button type="submit" class="btn btn-primary" v-if="mode === 'save'">
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
        <button type="button" class="btn btn-secondary ml-2" @click="reset()">
          Cancelar
        </button>
      </div>
    </form>
    <hr />
    <!-- Tabela de artigos -->
    <table class="article-table">
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
            </div>
          </th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="article in articles" :key="article.id">
          <td>{{ article.id }}</td>
          <td>{{ article.name }}</td>
          <td>{{ article.description }}</td>
          <td class="button-cell">
            <button
              type="button"
              class="btn btn-warning btn-sm button-edit"
              variant="warning"
              @click="loadArticle(article)"
            >
              <i class="fa fa-pencil"></i>
            </button>
            <button
              class="btn btn-danger btn-sm button-delete"
              variant="danger"
              @click="loadArticle(article, 'remove')"
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
import { baseApiUrl } from "@/global";
import axios from "axios";
import { useToast } from "vue-toastification";

export default {
  name: "ArticleAdmin",

  data() {
    return {
      mode: "save",
      article: {},
      articles: [],
      categories: [],
      users: [],
      page: 1,
      limit: 0,
      count: 0,
      fields: [
        { key: "id", label: "Código" },
        { key: "name", label: "Nome" },
        { key: "description", label: "Descrição" },
      ],
      sortField: null,
      sortOrder: "asc",
      toast: null,
    };
  },
  computed: {
    sortedArticles() {
      if (!this.sortField) return this.articles;
      return this.articles.slice().sort((a, b) => {
        const modifier = this.sortOrder === "asc" ? 1 : -1;
        if (a[this.sortField] < b[this.sortField]) return -1 * modifier;
        if (a[this.sortField] > b[this.sortField]) return 1 * modifier;
        return 0;
      });
    },
  },
  methods: {
    sortBy(field) {
      if (this.sortField === field) {
        this.sortOrder = this.sortOrder === "asc" ? "desc" : "asc";
      } else {
        this.sortField = field;
        this.sortOrder = "asc";
      }
    },

    loadArticles() {
      const url = `${baseApiUrl}/articles?`;
      axios.get(url).then((res) => {
        this.articles = res.data.data;
        this.count = res.data.count;
        this.limit = res.data.limit;
      });
    },
    reset() {
      this.mode = "save";
      this.article = {};
      this.loadArticles();
    },
    save() {
      const method = this.article.id ? "put" : "post";
      const id = this.article.id ? `/${this.article.id}` : "";
      axios[method](`${baseApiUrl}/articles${id}`, this.article)
        .then(() => {
          if (method === "post") {
            this.toast.success("Artigo cadastrado com sucesso!", {
              timeout: 2000,
            });
          } else if (method === "put") {
            this.toast.success("Artigo alterado com sucesso!", {
              timeout: 2000,
            });
          } else {
            return;
          }
          this.loadArticles();
          this.reset();
        })
        .catch((error) => {
          if (error.response && error.response.data) {
            this.toast.error(error.response.data, "error");
          } else {
            this.toast.error("Erro ao cadastrar o artigo", "error");
          }
        });
    },
    remove() {
      const id = this.article.id;
      axios
        .delete(`${baseApiUrl}/articles/${id}`)
        .then(() => {
          this.toast.success("Artigo removido com sucesso!");
          this.loadArticles();
          this.reset();
        })
        .catch((error) => {
          if (error.response && error.response.data) {
            this.toast.error(error.response.data);
          } else {
            this.toast.error("Erro ao remover o artigo!");
          }
        });
    },
    loadArticle(article, mode = "save") {
      this.mode = mode;
      axios.get(`${baseApiUrl}/articles/${article.id}`).then((res) => {
        this.article = res.data;
      });
    },
    loadCategories() {
      const url = `${baseApiUrl}/categories`;
      axios.get(url).then((res) => {
        this.categories = res.data.map((category) => {
          return { value: category.id, text: category.path };
        });
      });
    },
    loadUsers() {
      const url = `${baseApiUrl}/users`;
      axios.get(url).then((res) => {
        this.users = res.data.map((user) => {
          return { value: user.id, text: `${user.name} - ${user.email}` };
        });
      });
    },
  },
  watch: {
    page() {
      console.log(this.page);
    },
  },

  mounted() {
    this.loadUsers();
    this.loadCategories();
    this.loadArticles();
    this.toast = useToast();
  },
};
</script>

<style></style>

<template>
  <div class="home">
    <PageTitle icon="fa fa-home" main="Dashboard" sub="Base de Conhecimento" />
    <div class="stats">
      <Stat
        class="stat-card"
        title="Categorias"
        :value="stat.categories"
        icon="fa fa-folder"
        color="#d54d50"
      />
      <Stat
        class="stat-card"
        title="Artigos"
        :value="stat.articles"
        icon="fa fa-file"
        color="#3bc480"
      />
      <Stat
        class="stat-card"
        title="Usuários"
        :value="stat.users"
        icon="fa fa-user"
        color="#3282cd"
      />
    </div>
  </div>
</template>

<script>
import PageTitle from "../template/PageTitle.vue";
import Stat from "./StatPage.vue";
import axios from "axios";
import { baseApiUrl } from "../../global";
export default {
  name: "MainPage",
  components: {
    PageTitle,
    Stat,
  },
  data: function () {
    return {
      stat: {},
    };
  },
  methods: {
    getStats() {
      axios.get(`${baseApiUrl}/stats`).then((res) => (this.stat = res.data));
    },
  },
  mounted() {
    this.getStats();
  },
};
</script>

<style>
.home {
  padding: 20px;
}

.stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.stat-card {
  background-color: #ffffff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.stat-card:hover {
  transform: translateY(-5px);
  transition: transform 0.3s ease-in-out;
}

.stat-card-title {
  font-size: 1.2rem;
  font-weight: bold;
  color: #333333;
}

.stat-card-value {
  font-size: 2.5rem;
  font-weight: bold;
  color: #555555;
}

.stat-card-icon {
  font-size: 2rem;
  color: #888888;
}

.fa {
  margin-right: 10px;
}
</style>

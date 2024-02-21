<template>
  <div class="admin-pages-tabs">
    <page-title
      icon="fa fa-cogs"
      main="Administração do Sistema"
      sub="Cadastros"
    />
    <ul class="nav nav-tabs" id="myTab" role="tablist">
      <li
        v-for="(tab, index) in tabs"
        :key="index"
        class="nav-item"
        role="presentation"
      >
        <button
          :class="['nav-link', { active: activeTab === tab.id }]"
          :id="tab.id + '-tab'"
          data-bs-toggle="tab"
          :data-bs-target="'#' + tab.id + '-pane'"
          type="button"
          role="tab"
          :aria-controls="tab.id + '-pane'"
          :aria-selected="activeTab === tab.id"
          @click="activateTab(tab.id)"
        >
          {{ tab.label }}
        </button>
      </li>
    </ul>
    <div class="tab-content" id="myTabContent">
      <div
        v-for="(tab, index) in tabs"
        :key="index"
        :class="['tab-pane', { 'fade show active': activeTab === tab.id }]"
        :id="tab.id + '-pane'"
        role="tabpanel"
        :aria-labelledby="tab.id + '-tab'"
      >
        <component :is="tab.component" />
      </div>
    </div>
  </div>
</template>

<script>
import PageTitle from "../template/PageTitle.vue";
import ArticleAdmin from "../admin/ArticleAdmin.vue";
import UserAdmin from "../admin/UserAdmin.vue";
import CategorieAdmin from "../admin/CategorieAdmin.vue";

export default {
  name: "AdminPages",
  components: {
    PageTitle,
    ArticleAdmin,
    UserAdmin,
    CategorieAdmin,
  },

  data() {
    return {
      activeTab: "",
      tabs: [
        { id: "artigos", label: "Artigos", component: "ArticleAdmin" },
        {
          id: "categorias",
          label: "Categorias",
          component: "CategorieAdmin",
        },
        { id: "usuarios", label: "Usuários", component: "UserAdmin" },
      ],
    };
  },
  methods: {
    activateTab(tabId) {
      this.activeTab = tabId;
    },
  },
};
</script>

<style></style>

<template>
  <aside class="menu" v-show="isMenuVisible">
    <div class="menu-filter">
      <i class="fa fa-search fa-lg"></i>
      <input
        type="text"
        placeholder="Digite para filtrar..."
        v-model="treeFilter"
        class="filter-field"
      />
    </div>
    <VueTreeselect
      v-model="selectedNode"
      :options="treeData"
      :multiple="false"
      :clearable="false"
      :searchable="true"
      @select="onNodeSelect"
    />
  </aside>
</template>

<script>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import VueTreeselect from "vue3-treeselect";
import "vue3-treeselect/dist/vue3-treeselect.css";
import { baseApiUrl } from "@/global";
import axios from "axios";

export default {
  name: "AppMenu",
  components: { VueTreeselect },
  setup() {
    const store = useStore();
    const isMenuVisible = computed(() => store.state.isMenuVisible);

    const treeFilter = ref("");
    const treeData = ref([]);
    const selectedNode = ref(null);

    const getTreeData = async () => {
      const url = `${baseApiUrl}/categories/tree`;
      try {
        const response = await axios.get(url);
        treeData.value = response.data;
      } catch (error) {
        console.error("Erro ao buscar dados da árvore:", error);
      }
    };

    const onNodeSelect = (value) => {
      store.commit("toggleMenu", false);
      store.router.push({
        name: "articlesByCategory",
        params: { id: value.id },
      });
    };

    return {
      isMenuVisible,
      treeFilter,
      treeData,
      selectedNode,
      getTreeData,
      onNodeSelect,
    };
  },
  mounted() {
    this.getTreeData();
  },
};
</script>

<style scoped>
.menu {
  grid-area: menu;
  background: linear-gradient(to right, #232526, #414345);
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
}

.menu a,
.menu a:hover {
  color: #fff;
  text-decoration: none;
}

.menu .vue-treeselect__control {
  background-color: transparent;
  border: none;
  border-bottom: 1px solid #aaa;
}

.menu .menu-filter {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px;
  padding-bottom: 8px;
}

.menu .menu-filter i {
  color: #aaa;
  margin-right: 10px;
}

.menu input {
  color: #ccc;
  font-size: 1.3rem;
  border: 0;
  outline: 0;
  width: 100%;
  background: transparent;
}

.tree-filter-empty {
  color: #ccc;
  font-size: 1.3rem;
  margin-left: 20px;
}
</style>

<template>
  <div class="admin-pages-tabs">
    <page-title
      icon="fa fa-cogs"
      main="Administração do Sistema"
      sub="Cadastros"
    />
    <div class="card">
      <div class="card-header">
        <ul class="nav nav-tabs card-header-tabs">
          <li class="nav-item">
            <a class="nav-link active" data-bs-toggle="tab" href="#artigos"
              >Artigos</a
            >
          </li>
          <li class="nav-item">
            <a class="nav-link" data-bs-toggle="tab" href="#usuarios"
              >Usuários</a
            >
          </li>
          <li class="nav-item">
            <a class="nav-link" data-bs-toggle="tab" href="#configuracoes"
              >Configurações</a
            >
          </li>
        </ul>
      </div>
      <div class="card-body">
        <div class="tab-content">
          <div class="tab-pane fade show active" id="artigos">
            Conteúdo dos Artigos
          </div>
          <div class="tab-pane fade" id="usuarios">Conteúdo dos Usuários</div>
          <div class="tab-pane fade" id="configuracoes">
            Conteúdo das Configurações
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PageTitle from "../template/PageTitle.vue";
import "bootstrap/dist/css/bootstrap.css";

export default {
  name: "AdminPages",
  components: {
    PageTitle,
  },
};
</script>

<style></style>

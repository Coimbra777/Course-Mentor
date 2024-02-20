<template>
  <div class="user-dropdown">
    <div class="user-button">
      <span class="d-none d-sm-block">{{ user.name }}</span>
      <div class="user-dropdown-img">
        <img :email="user.email" :src="gravatar" alt="image" />
      </div>
      <i class="fa fa-angle-down"></i>
    </div>
    <div class="user-dropdown-content">
      <router-link to="/admin">
        <i class="fa fa-cogs">Administração</i>
      </router-link>
      <router-link to="/logout">
        <i class="fa fa-sign-out">Sair</i>
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import md5 from "md5";

export default {
  name: "AppUserDropdown",
  computed: mapState(["user"]),
  gravatar() {
    const hash = md5(this.user.email.trim().toLowerCase());
    return `https://www.gravatar.com/avatar/${hash}`;
  },
};
</script>

<style>
.user-dropdown {
  height: 60px;
  padding: 0 20px;
  color: #f6f4e6;
  position: relative;
}
.user-button {
  display: flex;
  align-items: center;
  height: 100%;
}
.user-button span {
  margin-right: 10px;
}
.user-dropdown:hover {
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.2);
}

.user-dropdown-img {
  margin: 0 10px;
}
.user-dropdown-img > img {
  max-height: 37px;
  border-radius: 50%;
}

.user-dropdown-content {
  position: absolute;
  right: 0;
  background-color: #f9f9f9;
  min-width: 170px;
  box-shadow: 0 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  padding: 10px;

  display: flex;
  flex-direction: column;
  flex-wrap: wrap;

  visibility: hidden;
  opacity: 0;
  transition: visibility 0s, opacity 0.5s linear;
}

.user-dropdown:hover .user-dropdown-content {
  visibility: visible;
  opacity: 1;
}

.user-dropdown-content a {
  color: #000;
  padding: 10px;
  text-decoration: none;
}
.user-dropdown-content a:hover {
  background-color: #ededed;
}
</style>

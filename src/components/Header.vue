<template>
  <header id="wk-header">
    <div class="wk-container flex">
      <div id="wk-header--image">
        <img src="logotipo-extenso.png" alt="" />
      </div>

      <div id="wk-header--menu">
        <ul class="items-menu flex">
          <li><router-link to="/">Home</router-link></li>
        </ul>
      </div>

      <div id="wk-header--search">
        <form class="search-bar">
          <input type="text" />
          <span class="fas fa-search"></span>
        </form>
      </div>

      <div id="wk-header--options">
        <router-link to="/minha-conta">
          <span class="fas fa-user"></span>
          <span v-if="isLogado">Olá, {{ getNomePerfil }}</span>
          <span v-else>{{ getNomePerfil }}</span>
        </router-link>

        <span
          class="fas fa-shopping-cart"
          @click="carrinhoToggled = !carrinhoToggled"
        ></span>
      </div>
    </div>

    <Carrinho
      :toggled="carrinhoToggled"
      v-on:cart-close="carrinhoToggled = false"
    />
  </header>
</template>

<script>
import Carrinho from '@/components/Carrinho'

export default {
  name: "HeaderComponent",
  components: {
    Carrinho
  },
  data() {
    return {
      carrinhoToggled: false,
    };
  },
  computed: {
    getNomePerfil(){
      let perfil = this.$store.getters['perfil/getPerfil']
      if(perfil == null)
        return "deslogado"
      else
        return perfil.nome;
    },
    isLogado(){
      let perfil = this.$store.getters['perfil/getPerfil']
      // console.log("perfil", perfil )
      return perfil.nome == null ? false : true
    },
  },
  methods: {
  },
};
</script>

<style lang="css">
.search-bar {
  position: relative;
}

.search-bar .fas {
  position: absolute;
  top: 6px;
  right: 8px;
  cursor: pointer;
}

.search-bar input {
  padding: 5px 30px 5px 5px;
}

#wk-header {
  height: 100px;
  background: #ffaa2a;
}
.items-menu {
  width: 100%;
}
.wk-container {
  max-width: 1240px;
  margin: 0 auto;
  width: 100%;
  padding: 0px !important;
}

.wk-container.flex {
  align-items: center;
  justify-content: space-evenly;
}

.items-menu li {
  display: block;
  margin-right: 15px;
  color: #fff;
  text-transform: uppercase;
  font-family: "roboto";
}

.items-menu li:last-child {
  margin: unset;
}

#wk-header--options .fas {
  font-size: 24px;
  margin: 0px 6px;
}

#wk-header--options .fas:hover {
  cursor: pointer;
}
</style>

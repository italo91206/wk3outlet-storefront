<template>
  <header id="wk-header">
    <div class="wk-container flex">
      <div id="wk-header--image">
        <img src="logotipo-extenso.png" alt="" />
      </div>

      <div id="wk-header--menu">
        <ul class="items-menu flex">
          <li><router-link to="/">Home</router-link></li>
          <li><a @click="toggleCarrinho">abrir carrinho</a></li>
        </ul>
      </div>

      <div id="wk-header--search">
        <form class="search-bar">
          <input type="text" />
          <span class="fas fa-search"></span>
        </form>
      </div>

      <div id="wk-header--options">
        <span class="fas fa-user"></span>
        <span class="fas fa-shopping-cart"></span>
      </div>
    </div>

    <!-- <Carrinho :toggled="carrinhoToggled"/> -->
  </header>
</template>

<script>
// import Carrinho from '@/components/Loja/Carrinho'

export default {
  name: "HeaderComponent",
  // components: {
  //   Carrinho
  // },
  data() {
    return {
      carrinhoToggled: false,
    };
  },
  methods: {
    toggleCarrinho() {
      this.carrinhoToggled = !this.carrinhoToggled;
    },
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
</style>

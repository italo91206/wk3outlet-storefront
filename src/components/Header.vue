<template>
  <header id="wk-header">
    <section id="pre-header">
      <div class="wk-container flex">
        <div class="pre-header--item">
          <span class="fas fa-credit-card"></span>
          <p>Pague em até 12x sem juros</p>
        </div>

        <div class="pre-header--item">
          <span class="fas fa-store"></span>
          <p>Compre aqui e retire na loja</p>
        </div>

        <div class="pre-header--item">
          <span class="fas fa-truck"></span>
          <p>Entrega para todo o Brasil</p>
        </div>
      </div>
    </section>

    <div class="wk-container wk-container--principal flex">
      <div id="wk-header--image">
        <router-link to="/">
          <img src="logo-extenso-invertido.png" alt="" />
        </router-link>
      </div>

      <div id="wk-header--search">
        <form class="search-bar">
          <input type="text" placeholder="Do que você precisa ?" />
          <span class="fas fa-search"></span>
        </form>
      </div>

      <div id="wk-header--options">
        <router-link to="/minha-conta">
          <span class="fa-user" :class="{'far': isLogado == false, 'fas': isLogado}"></span>
          <span v-if="isLogado">Olá, {{ getNomePerfil }}</span>
          <span v-else>Olá visitante</span>
        </router-link>

        <span
          class="fas fa-shopping-cart"
          @click="carrinhoToggled = !carrinhoToggled"
        ></span>
      </div>
    </div>

    <div class="wk-container-menu flex">
        <ul class="items-menu menu-container flex">
          <li><router-link to="/">Camisetas</router-link></li>
          <li><router-link to="/">Calças</router-link></li>
          <li><router-link to="/">Tênis</router-link></li>
          <li><router-link to="/">Acessórios</router-link></li>
          <li><router-link to="/">Destaques</router-link></li>
          <li><router-link to="/">Promoções</router-link></li>
        </ul>
    </div>

    <Carrinho
      :toggled="carrinhoToggled"
      v-on:cart-close="carrinhoToggled = false"
    />
  </header>
</template>

<script>
import Carrinho from "@/components/Carrinho";

export default {
  name: "HeaderComponent",
  components: {
    Carrinho,
  },
  data() {
    return {
      carrinhoToggled: false,
    };
  },
  computed: {
    getNomePerfil() {
      let perfil = this.$store.getters["perfil/getPerfil"];
      if (perfil == null) return "deslogado";
      else return perfil.nome;
    },
    isLogado() {
      let perfil = this.$store.getters["perfil/getPerfil"];
      // console.log("perfil", perfil )
      return perfil.nome == null ? false : true;
    },
  },
  methods: {},
};
</script>

<style lang="css">
.search-bar {
  position: relative;
}

.search-bar .fas {
  position: absolute;
  top: 12px;
  right: 8px;
  cursor: pointer;
}

.search-bar input {
  padding: 10px 30px 10px 15px;
  width: 310px;
}

#wk-header {
  /* height: 100px; */
  border-bottom: solid 2px #2c3e50;
}
.items-menu {
  width: 100%;
}
.wk-container {
  max-width: 1240px;
  margin: 0 auto;
  width: 100%;
  padding: 0px;
}

.wk-container.flex {
  align-items: center;
  justify-content: space-evenly;
}

.items-menu li {
  display: block;
  color: #ffaa2a;
  text-transform: uppercase;
  font-family: "roboto";
  font-weight: bold;
}

.items-menu li:last-child {
  margin: unset;
}

#wk-header--options .fas,
#wk-header--options .far {
  font-size: 24px;
  margin: 0px 6px;
}

#wk-header--options .fas:hover,
#wk-header--options .far:hover {
  cursor: pointer;
}

.wk-container-menu {
  border-top: solid 1px #80808024;
  justify-content: space-around;
}

.wk-container--principal {
  padding: 15px 0;
}

.wk-container-menu {
  border-top: solid 1px #8080805c;
  justify-content: space-around;
}

.wk-container--principal {
  padding: 15px 0;
}

#pre-header {
  background: #2c3e50;
  color: #fff;
}

.pre-header--item {
  display: flex;
  align-items: center;
}

.pre-header--item .fas {
  margin-right: 10px;
}

.menu-container{
  max-width: 960px;
  justify-content: space-between;
}
</style>

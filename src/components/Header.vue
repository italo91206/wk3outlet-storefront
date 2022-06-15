<template>
  <header id="wk-header">
    <section id="pre-header">
      <div id="pre-header--swiper" class="wk-container swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide pre-header--item">
            <span class="fas fa-credit-card"></span>
            <p>Pague em até 12x sem juros</p>
          </div>

          <div class="swiper-slide pre-header--item">
            <span class="fas fa-store"></span>
            <p>Compre aqui e retire na loja</p>
          </div>

          <div class="swiper-slide pre-header--item">
            <span class="fas fa-truck"></span>
            <p>Entrega para todo o Brasil</p>
          </div>
        </div>
      </div>
    </section>

    <div class="wk-container wk-container--principal flex">
      <div id="wk-header--image">
        <router-link to="/" class="mobile">
          <div class="fas fa-bars"></div>
        </router-link>

        <router-link id="mobile-title" to="/" class="block">
          <img src="/logo-extenso-invertido.png" alt="" class="desktop" />

          <h2 class="mobile">WK3 Outlet</h2>
        </router-link>

        <div class="wk-header--image--group mobile">
          <router-link to="/minha-conta">
            <div
              class="fa-user"
              :class="{ far: isLogado == false, fas: isLogado }"
            ></div>
          </router-link>

          <span
            class="fas fa-shopping-cart"
            @click="toggleCart"
          ></span>
        </div>
      </div>

      <div id="wk-header--search">
        <form class="search-bar">
          <input type="text" placeholder="Do que você precisa ?" />
          <span class="fas fa-search"></span>
        </form>
      </div>

      <div id="wk-header--options" class="desktop">
        <router-link to="/minha-conta">
          <span
            class="fa-user"
            :class="{ far: isLogado == false, fas: isLogado }"
          ></span>
          <span v-if="isLogado">Olá, {{ getNomePerfil }}</span>
          <span v-else>Olá visitante</span>
        </router-link>

        <span
          class="fas fa-shopping-cart"
          @click="toggleCart"
        ></span>
      </div>
    </div>

    <div class="wk-container-menu flex desktop">
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
      v-on:cart-close="toggleCart"
    />
  </header>
</template>

<script>
import Carrinho from "@/components/Carrinho";
import Swiper, { Autoplay } from "swiper";

export default {
  name: "HeaderComponent",
  components: {
    Carrinho,
  },
  data() {
    return {};
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
    carrinhoToggled(){
      return this.$store.getters["carrinho/getCartShow"]
    }
  },
  methods: {
    toggleCart(){
      this.$store.commit('carrinho/toggleCart')
    }
  },
  mounted() {
    let width = window.innerWidth;

    if (width <= 768) {
      new Swiper("#pre-header--swiper", {
        modules: [Autoplay],
        slidesPerView: 1,
        spaceBetween: 10,
        centeredSlides: true,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
      });
    }
  },
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

.menu-container {
  max-width: 960px;
  justify-content: space-between;
}

.pre-header--item.swiper-slide {
  width: unset;
  display: flex;
  align-content: center;
  justify-content: center;
}

#pre-header--swiper .swiper-wrapper {
  overflow: unset;
}

#mobile-title {
  text-transform: uppercase;
  font-weight: bolder;
  color: #3e3e3e;
}

#wk-header--search input {
  border: unset;
  border-bottom: solid 1px #bdbdbd;
  margin-bottom: 10px;
  padding: unset;
  width: -webkit-fill-available;
  padding-bottom: 10px;
  padding-top: 10px;
  padding-left: 10px;
  padding-right: 30px;
}

@media (min-width: 1024px) {
  #pre-header--swiper .swiper-wrapper {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
}

@media (max-width: 992px) {
  #wk-header--image {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 0 15px;
  }
}

@media (max-width: 425px) {
  #wk-header--search {
    width: 100%;
    padding: 0 15px;
  }

  .search-bar .fas {
    color: #bdbdbd;
  }

  .wk-container--principal {
    padding: unset;
  }

  .wk-header--image--group > span {
    margin-left: 20px;
  }

  #pre-header--swiper .swiper-slide {
    font-size: 12px;
  }
}
</style>

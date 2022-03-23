<template>
  <header id="wk-header">
    <div class="wk-container flex">
      <div id="wk-header--image">
        <img src="logotipo-extenso.png" alt="">
      </div>

      <div id="wk-header--menu">
        <ul class="items-menu">
          <li><router-link to="/">Home</router-link></li>
          <li><a @click="toggleCarrinho">abrir carrinho</a></li>
        </ul>
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
  data(){
    return {
      carrinhoToggled: false,
    }
  },
  methods: {
    toggleCarrinho(){
      this.carrinhoToggled = !this.carrinhoToggled;
    }
  }
};
</script>

<style lang="css">
#wk-header {
  height: 100px;
  background: #FFAA2A;
}
.items-menu{
  width: 100%;
}
.wk-container{
  max-width: 1240px;
  margin: 0 auto;
  width: 100%;
  padding: 0px !important;
}
.flex{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}
</style>

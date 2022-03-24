<template>
  <article class="product-card">
    <img :src="getImage" alt="" class="w100"/>

    <p class="product-card--name">
      {{ produto.nome_produto }}
    </p>

    <p class="product-card--price">
      {{ produto.preco | preco}}
    </p>
  </article>
</template>

<script>
export default {
  name: 'ProductCard',
  props: ['produto'],
  data(){
    return {
      fallback_url: 'https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png',
      base_url: 'http://wk3outlet.italoferreira.dev.br/static/'
    }
  },
  computed:{
    getImage(){
      let { produto, fallback_url, base_url } = this;

      if(produto.imagens.length == 0)
        return fallback_url;
      else
        return base_url + produto.imagens[0].url
    }
  },
  filters: {
    preco: function (value) {
      return `R$ ${value.toFixed(2)}`;
    },
  },
}
</script>

<style>
.product-card{
  width: 240px;
  height: 300px;
  border: solid 2px #ffaa2a;
}

.product-card p{
  margin: unset;
}
</style>

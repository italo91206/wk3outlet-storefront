<template>
  <article class="product-card">
    <div class="product-card--image">
      <img :src="getImage" alt="" class="w100"/>
    </div>

    <div class="product-card--name">
      <p class="product-card--name-text">
        {{ produto.nome_produto }}
      </p>
    </div>

    <div class="product-card--price">
      <p class="product-card--price-text">
        {{ produto.preco | preco}}
      </p>
    </div>
  </article>
</template>

<script>
export default {
  name: 'ProductCard',
  props: ['produto'],
  data(){
    return {
      fallback_url: 'https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png',
      base_url: 'http://wk3outlet.com.br/static/'
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

/* .product-card--image {
  content: ' ';
  display: block;
  background-image: url(https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png);
} */
</style>

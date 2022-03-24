<template>
  <main id="product-page">
    <section v-if="loading" class="container">
      <h2>Carregando ....</h2>
    </section>

    <section class="container" v-if="loading == false">
      <div id="product-breadcrumbs" class="row">
        <ul id="product-breadrumbs--ul">
          <li class="breadcrumb-li"><router-link to="/">Home</router-link></li>
          <li class="breadcrumb-li">
            <router-link to="/">{{ produto.categoria }}</router-link>
          </li>
          <li class="breadcrumb-li">{{ produto.nome_produto }}</li>
        </ul>
      </div>

      <div class="row flex">
        <div id="product-images-column" class="col-6">
          <div class="product-image-gallery">
            <div class="row product-image-gallery--image w100">
              <img :src="getImage" alt="" class="w100" />
            </div>

            <div class="row flex product-image-gallery--other-images">
              <div
                class="col-4"
                v-for="(imagem, i) in produto.imagens"
                :key="i"
              >
                <img :src="base_url + imagem.url" alt="" class="w100" />
              </div>
            </div>
          </div>
        </div>

        <div id="product-details-column" class="col-6">
          <div div="product-page--simple-details" class="row">
            <p id="product-name">{{ produto.nome_produto }}</p>
            <p id="product-price">{{ produto.preco | preco }}</p>
            <p id="product-modelo">Modelo: {{ produto.modelo }}</p>
            <p id="product-marca">Marca: {{ produto.marca }}</p>
            <p id="product-categoria">Categoria: {{ produto.categoria }}</p>
          </div>

          <div id="product-page--variation-details" class="row">
            <ProdutoVariation
              v-if="produto.variacoes.length > 0"
              :variacoes="produto.variacoes"
              v-model="activeSku"
            />
          </div>

          <div id="product-page--actions" class="row">
            <button v-if="sku_has_stock" id="add-to-cart-button">
              Adicionar ao carrinho
            </button>

            <ProductNewsLetter
              v-if="sku_has_stock == false"
              :sku="activeSku"
            />
          </div>

          <div class="row">
            <p>SKU ativo: {{ activeSku }}</p>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import service from "@/services/catalogo-service.js";
import ProdutoVariation from "@/components/ProdutoVariation.vue";
import ProductNewsLetter from "@/components/ProductNewsLetter.vue"

export default {
  name: "ProductPage",
  components: {
    ProdutoVariation,
    ProductNewsLetter,
  },
  data() {
    return {
      fallback_url:
        "https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png",
      base_url: "http://wk3outlet.italoferreira.dev.br/static/",
      produto: null,
      variacaoSelecionada: null,
      loading: true,
      activeSku: null,
      quantity: 1,
      sku_has_stock: true,
    };
  },
  methods: {
    async recuperarProduto(url) {
      const response = await service.getProduto(url);
      if (response.data.success) {
        this.produto = response.data.data;
        if(this.produto.variacoes.length == 0){
          this.activeSku = this.produto.sku
          this.hasStock(this.activeSku)
        }
        this.loading = false;
      } else {
        this.$toast.error(response.data.message);
        this.$router.push("/");
      }
    },
    addToCart() {
      let possui_variacoes = this.verificaVariacao();

      if (possui_variacoes) {
        if (this.variacaoSelecionada == null)
          this.$toast.error("Selecione uma variação");
        else {
          this.produto.variacao = this.variacaoSelecionada;
          this.$store.dispatch("carrinho/adicionarProduto", this.produto);
        }
      } else {
        this.variacaoSelecionada = this.produto;
        this.$store.dispatch("carrinho/adicionarProduto", this.produto);
      }
    },
    verificaVariacao() {
      if (this.produto.variacoes.length == 0) return false;
      else return true;
    },
    selecionarVariacao(id) {
      // console.log(this.produto.variacoes)
      // console.log(id);
      // this.variacaoSelecionada = id;
      let variacao = this.produto.variacoes.filter((item) => {
        return item.variacao_id === id;
      });
      this.variacaoSelecionada = variacao[0];
    },
    hasStock(activeSku){
      console.log("activeSKu", activeSku)
      if(activeSku == this.produto.produto_id){
        this.sku_has_stock = this.produto.estoque == 0 ? false : true
      }
      else{
        let variacao = this.produto.variacoes.filter((variacao) => {
          return variacao.variacao_id == activeSku
        })
        this.sku_has_stock = variacao[0].quantidade == 0 ? false : true
      }
    }
  },
  computed: {
    getImage() {
      let { produto, fallback_url, base_url } = this;

      if (produto.imagens.length == 0) return fallback_url;
      else return base_url + produto.imagens[0].url;
    },
  },
  filters: {
    preco: function (value) {
      return `R$ ${value.toFixed(2)}`;
    },
  },
  mounted() {
    const url = this.$route.params.url;
    this.recuperarProduto(url);
  },
  watch:{
    activeSku(){
      this.hasStock(this.activeSku)
    }
  }
};
</script>

<style lang="css">
#product-breadrumbs--ul {
  margin-block: unset;
  margin-inline: unset;
  padding-inline: unset;
  display: flex;
}

.breadcrumb-li {
  display: block;
  padding: 1px 10px;
}

#product-breadrumbs--ul .breadcrumb-li:not(:last-child):after {
  content: ">";
  padding: 0px 10px;
}

#product-page p{
  text-align: left;
}
</style>

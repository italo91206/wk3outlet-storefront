<template>
  <main id="product-page">
    <section v-if="loading" class="container">
      <h2>Carregando ....</h2>
    </section>

    <section class="container" v-if="loading == false">
      <div id="product-breadcrumbs" class="row">
        <ul id="product-breadcrumbs--ul">
          <li class="breadcrumb-li">
            <router-link to="/">Home</router-link>
            <div class="fas fa-chevron-right"></div>
          </li>
          <li class="breadcrumb-li">
            <router-link v-if="produto.categoria" to="/">{{
              produto.categoria
            }}</router-link>
            <router-link v-else to="/">Produtos</router-link>
            <div class="fas fa-chevron-right"></div>
          </li>
          <li class="breadcrumb-li">{{ produto.nome_produto }}</li>
        </ul>
      </div>

      <div class="row flex">
        <div id="product-images-column" class="col-6">
          <div class="row flex">
            <div id="product-image-thumbs" class="swiper">
              <div class="swiper-wrapper">
                <div
                  class="swiper-slide"
                  v-for="(imagem, i) in produto.imagens"
                  :key="i"
                >
                  <img :src="base_url + imagem.url" alt="" class="w100" />
                </div>
              </div>
            </div>

            <div id="product-image-gallery" class="swiper">
              <div class="swiper-wrapper">
                <div
                  class="swiper-slide"
                  v-for="(imagem, i) in produto.imagens"
                  :key="i"
                >
                  <img :src="base_url + imagem.url" alt="" class="w100" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div id="product-details-column" class="col-6 text-left">
          <div div="product-page--simple-details" class="row">
            <p id="product-name">{{ produto.nome_produto }}</p>
            <p id="product-sku">SKU: {{ produto.sku }}</p>
            <p id="product-price">{{ produto.preco | preco }}</p>
            <p id="product-modelo">Modelo: {{ produto.modelo }}</p>
            <p id="product-marca">Marca: {{ produto.marca }}</p>
            <!-- <p id="product-categoria">Categoria: {{ produto.categoria }}</p> -->
          </div>

          <div id="product-page--variation-details" class="row">
            <ProdutoVariation
              v-if="produto.variacoes.length > 0"
              :variacoes="produto.variacoes"
              v-model="activeSku"
            />
          </div>

          <div id="product-page--actions" class="row">
            <button
              v-if="sku_has_stock"
              @click="addToCart"
              id="add-to-cart-button"
            >
              Adicionar ao carrinho
            </button>

            <ProductNewsLetter
              v-if="sku_has_stock == false"
              :sku="activeSku"
              :produto_id="produto.produto_id"
            />
          </div>

          <!-- <div class="row">
            <p>SKU ativo: {{ activeSku }}</p>
          </div> -->
        </div>
      </div>
    </section>

    <section id="product-description" class="row text-left" v-if="loading == false">
      <div class="container">
        <h3>Descrição</h3>
        <p>
          {{ produto.descricao || '' }}
        </p>
      </div>
    </section>

    <section id="related-products" class="container" v-if="loading == false">
      <h3>Produtos da mesma categoria</h3>
      <ProductSearch />
    </section>
  </main>
</template>

<script>
import service from "@/services/catalogo-service.js";
import ProdutoVariation from "@/components/ProdutoVariation.vue";
import ProductNewsLetter from "@/components/ProductNewsLetter.vue";
import ProductSearch from "@/components/ProductSearch.vue";

export default {
  name: "ProductPage",
  components: {
    ProdutoVariation,
    ProductNewsLetter,
    ProductSearch,
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
        if (this.produto.variacoes.length == 0) {
          this.activeSku = this.produto.sku;
          this.hasStock(this.activeSku);
        }
        this.loading = false;
      } else {
        this.$toast.error(response.data.message);
        this.$router.push("/");
      }
    },
    addToCart() {
      let possui_variacoes = this.verificaVariacao();
      let { activeSku, produto } = this;
      const product_to_add = { ...produto };

      if (possui_variacoes) {
        if (activeSku == null) this.$toast.error("Selecione uma variação");
        else {
          delete product_to_add.variacoes;
          product_to_add.variacao = this.selecionarVariacao(activeSku);
          this.$store.dispatch("carrinho/adicionarProduto", { product_to_add });
        }
      } else {
        this.variacaoSelecionada = this.produto;
        this.$store.dispatch("carrinho/adicionarProduto", { product_to_add });
      }
    },
    verificaVariacao() {
      if (this.produto.variacoes.length == 0) return false;
      else return true;
    },
    selecionarVariacao(id) {
      let variacao = this.produto.variacoes.filter((item) => {
        return item.variacao_id === id;
      });
      return variacao[0];
    },
    hasStock(activeSku) {
      console.log("activeSKu", activeSku);
      if (activeSku == this.produto.sku) {
        this.sku_has_stock = this.produto.estoque == 0 ? false : true;
      } else {
        let variacao = this.produto.variacoes.filter((variacao) => {
          return variacao.variacao_id == activeSku;
        });
        this.sku_has_stock = variacao[0].quantidade == 0 ? false : true;
      }
    },
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
    let script = document.createElement("script");
    script.setAttribute(
      "src",
      "https://cdnjs.cloudflare.com/ajax/libs/Swiper/6.1.0/swiper-bundle.min.js"
    );
    script.setAttribute("crossorigin", "anonymous");
    script.setAttribute("referrerpolicy", "no-referrer");
    script.setAttribute(
      "integrity",
      "sha512-uz9KhDW9ZdiJU79RDPNuHE4Z9aUOYTVargiMzYbe8Z3j5vBHxBMmlvGw1Xa09CmV6tCUOhGazG4pTWsuDJd1xw=="
    );
    script.onload = () => {
      // eslint-disable-next-line
      let galleryThumbs = new Swiper("#product-image-thumbs", {
        direction: "vertical",
        slidesPerView: "auto",
        spaceBetween: 10,
        freeMode: true,
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
      });

      // eslint-disable-next-line
      let gallery = new Swiper("#product-image-gallery", {
        slidesPerView: "auto",
        thumbs: {
          swiper: galleryThumbs,
          slideThumbActiveClass: "thumb-active",
        },
      });
    };
    document.body.appendChild(script);
  },
  watch: {
    activeSku() {
      this.hasStock(this.activeSku);
    },
  },
};
</script>

<style lang="css">
#product-page {
  margin-bottom: 50px;
}

#product-breadcrumbs--ul {
  margin-block: unset;
  margin-inline: unset;
  padding-inline: unset;
  display: flex;
}

.breadcrumb-li {
  display: flex;
  align-items: center;
}
/*
#product-page p {
  text-align: left;
} */

#product-breadcrumbs {
  padding: 12px 0;
}

.breadcrumb-li .fas {
  margin: 0 8px;
  font-size: 10px;
  align-items: center;
}

#product-name {
  font-size: 34px;
  margin: unset;
}

#product-price {
  margin: 20px 0;
  font-weight: bold;
  font-size: 22px;
}

#product-modelo {
  margin: 2px 0;
  color: grey;
}

#product-marca {
  margin: 2px 0;
  color: grey;
}

p#product-sku {
  margin: 9px 0px;
  color: grey;
}

#product-categoria {
  margin: 2px 0;
  color: grey;
}

#add-to-cart-button {
  background: #ffaa2a;
  outline: none;
  border: unset;
  width: 100%;
  padding: 15px 0;
  font-size: 13px;
  font-weight: bold;
  color: #242424;
  text-transform: uppercase;
  letter-spacing: 1.1px;
  cursor: pointer;
  margin-top: 35px;
}

#product-image-thumbs .swiper-slide.thumb-active {
  opacity: 1;
}

#product-image-thumbs .swiper-slide {
  opacity: 0.4;
}

#product-image-gallery {
  width: 500px;
}

#product-image-thumbs .swiper-slide {
  height: 50px;
  width: 50px;
}

#product-image-gallery .swiper-slide {
  width: 500px;
}

#product-description {
  background: #d9d9d9;
  padding: 50px 0;
  margin: 50px 0;
}
</style>

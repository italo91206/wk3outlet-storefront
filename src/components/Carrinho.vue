<template>
  <aside id="wk-carrinho" :class="{ ativo: toggled }">
    <button id="cart-close-button" @click="closeCart">
      <span class="fas fa-times"></span>
    </button>

    <h2>Este é o carrinho</h2>

    <ul id="wk-carrinho--lista-produtos">
      <li
        v-for="produto in produtos"
        :key="produto.produto_id"
        class="wk-carrinho--produto-item"
      >
        <div class="wk-carrinho--produto-imagem">
          <img :src="getImage(produto)" />
        </div>

        <div class="wk-carrinho--produto-text">
          <span class="wk-carrinho--produto-nome">
            {{ produto.nome_produto }}
          </span>

          <div
            v-if="produto.variacao"
            class="wk-carrinho--produto-variation-span"
          >
            <span
              class="wk-carrinho--produto-variation-span--cor"
              :style="`background-color: ${produto.variacao.hexa}`"
            >
            </span>
            <span class="wk-carrinho--produto-variation-span--tamanho">
              {{ produto.variacao.tamanho }}
            </span>
          </div>

          <span class="w100 wk-carrinho--produto-preco">
            {{ produto.preco | preco }}
          </span>

          <span class="w100 wk-carrinho--produto-quantidade">
            <button @click="changeProductQuantity('+', produto.produto_id)">
              <span class="fas fa-plus"></span>
            </button>

            <span>{{ produto.quantidade }}</span>

            <button @click="changeProductQuantity('-', produto.produto_id)">
              <span class="fas fa-minus"></span>
            </button>
          </span>
        </div>

        <button
          @click="removerProduto(produto)"
          class="wk-carrinho--produto-remover"
        >
          <span class="fas fa-trash-alt"></span>
        </button>
      </li>
    </ul>

    <section id="wk-carrinho--bottom">
      <div class="wk-carrinho--wrapper">
        <div class="wk-carrinho--row">
          <p>Total</p>
          <b>{{ getTotalCarrinho | preco }}</b>
        </div>

        <router-link to="/checkout" :disabled="produtos.length == 0 ? true : false">
          <button id="wk-carrinho--checkout-button">Finalizar compra</button>
        </router-link>
      </div>
    </section>
  </aside>
</template>

<script>
export default {
  name: "CarrinhoComponent",
  props: ["toggled"],
  data() {
    return {
      fallback_url:
        "https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png",
      base_url: "http://wk3outlet.com.br/static/",
      produtos: [],
    };
  },
  methods: {
    removerProduto(produto) {
      this.$store.dispatch("carrinho/removerProduto", produto);
    },
    closeCart() {
      console.log("CarrinhoComponent emited: close");
      this.$emit("cart-close");
    },
    getImage(produto) {
      let { fallback_url, base_url } = this;

      if (produto.imagens.length == 0) return fallback_url;
      else return base_url + produto.imagens[0].url;
    },
    changeProductQuantity(option, produto_id) {
      this.produtos = [];
      if (option === "+")
        this.$store.commit("carrinho/incrementar", produto_id);
      else this.$store.commit("carrinho/decrementar", produto_id);
      this.produtos = this.$store.getters["carrinho/getCarrinho"];
    },
  },
  mounted() {
    this.produtos = this.$store.getters["carrinho/getCarrinho"];
  },
  computed: {
    getTotalCarrinho() {
      return this.$store.getters["carrinho/getValorTotal"];
    },
  },
  filters: {
    preco: function (value) {
      return `R$ ${value.toFixed(2)}`;
    },
  },
};
</script>

<style lang="css">
#wk-carrinho {
  position: fixed;
  right: 0px;
  width: 425px;
  height: 100%;
  border-left: solid 1px black;
  background: #fff;
  top: 0;
  transform: translateX(100%);
  transition: transform 0.2s ease;
  z-index: 2;
}

#wk-carrinho.ativo {
  transform: translateX(0%);
  transition: transform 0.2s ease;
}

.wk-carrinho--produto-item img {
  max-width: 50px;
  max-height: 80px;
  width: 100%;
  height: 100%;
}

.wk-carrinho--produto-variation-span {
  display: flex;
}

.wk-carrinho--produto-variation-span--cor {
  height: 4px;
  width: 4px;
  display: block;
  margin: unset;
}

.wk-carrinho--produto-variation-span span {
  height: 15px;
  width: 15px;
  margin: 5px;
  border: solid 1px grey;
  display: flex;
  align-items: center;
  justify-content: center;
  background: unset;
}

.wk-carrinho--produto-item {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  padding: 5px 0px;
  border-bottom: solid 1px grey;
  margin: 0 15px;
  position: relative;
  justify-content: space-between;
}

#wk-carrinho--lista-produtos {
  list-style: none;
  margin: unset;
  padding: unset;
}

.wk-carrinho--produto-text {
  display: flex;
  flex-wrap: wrap;
  /* justify-content: space-around; */
  flex: 0 0 80%;
  text-align: left;
}

.wk-carrinho--produto-nome {
  width: 100%;
}

.wk-carrinho--produto-remover {
  position: absolute;
  right: 15px;
  top: 5px;
  font-size: 15px;
  border: unset;
  background: unset;
}

#cart-close-button {
  position: absolute;
  left: 15px;
  top: 15px;
  background: unset;
  border: unset;
  font-size: 20px;
  color: #2c3e50;
}

.wk-carrinho--produto-preco {
  font-weight: bold;
  font-size: 13px;
  margin: 5px 0;
}

.wk-carrinho--produto-quantidade button {
  border: unset;
  background: unset;
  margin: 4px 3px;
  color: #1a1a1a;
  font-size: 10px;
  cursor: pointer;
}

.wk-carrinho--produto-quantidade {
  border: solid 1px grey;
  width: unset;
}

#wk-carrinho--bottom {
  position: absolute;
  bottom: 0px;
  /* border-top: solid 1px grey; */
  width: 100%;
  background: #d9d9d9;
}

.wk-carrinho--wrapper {
  padding: 15px;
}

.wk-carrinho--row {
  display: flex;
  justify-content: space-between;
}

.wk-carrinho--row p {
  margin: unset;
}

#wk-carrinho--checkout-button {
  width: 100%;
  padding: 12px 24px;
  background: #2c3e50;
  border: unset;
  color: #fff;
  margin-top: 35px;
  font-weight: bold;
  font-size: 20px;
}
</style>

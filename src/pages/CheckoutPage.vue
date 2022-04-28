<template>
  <main id="checkout">
    <div v-if="etapa == 1">
      <section class="container">
        <h2>Checkout</h2>
        <table id="checkout--product-table">
          <tr>
            <th>Lista de produtos</th>
            <th>Preço unitário</th>
            <th>Quantidade</th>
            <th>Total</th>
            <th></th>
          </tr>
          <tr v-for="produto in produtos" :key="produto.produto_id">
            <td class="checkout--product-info">
              <img :src="getImage(produto)" alt="" class="w100" />
              <p class="checkout--product-name">
                {{ produto.nome_produto }}
              </p>
              <span v-if="produto.variacao">{{ getTamanho(produto) }}</span>
              <span v-if="produto.variacao">{{ getCor(produto) }}</span>
            </td>

            <td class="checkout--product-price-info">
              {{ produto.preco | preco }}
            </td>

            <td class="checkout--product-quantity">
              <button @click="produto.quantidade++">
                <div class="fas fa-plus"></div>
              </button>
              <span>{{ produto.quantidade }}</span>
              <button @click="produto.quantidade--">
                <div class="fas fa-minus"></div>
              </button>
            </td>

            <td class="checkout--produto-total-unitario">
              {{ (produto.quantidade * produto.preco) | preco }}
            </td>

            <td>
              <button @click="removerProduto(produto)">
                <span class="fas fa-trash-alt"></span>
              </button>
            </td>
          </tr>
        </table>
      </section>

      <section class="container">
        <div class="row flex">
          <div class="col-8 text-left">
            <p>Opção de frete</p>

            <div class="form-group form-group--radio">
              <input type="radio" value="nao" v-model="possui_frete" />
              <label for="">Vou retirar na loja</label>
            </div>

            <div class="form-group form-group--radio disabled">
              <input type="radio" value="sim" v-model="possui_frete" />
              <label for="">Precisarei de envio</label>
            </div>
          </div>

          <div class="col-4 text-left">
            <section>
              <div class="form-group">
                <label for="">Inserir cupom</label>
                <input
                  type="text"
                  placeholder="Código do cupom..."
                  v-model="codigo_cupom"
                />
                <button @click="buscarCupom">Aplicar</button>
              </div>
            </section>

            <section>
              <div class="row flex align-center space-between">
                <p>Subtotal</p>
                <b>{{ getSubTotal | preco }}</b>
              </div>

              <div class="row flex align-center space-between">
                <p>Descontos</p>
                <b>- {{ desconto_geral | preco }}</b>
              </div>

              <div class="row flex align-center space-between">
                <p>Total</p>
                <b>{{ getTotal | preco }}</b>
              </div>
            </section>
          </div>
        </div>
      </section>

      <div class="container">
        <button @click="realizarPagamento">
          Finalizar compra
        </button>

        <router-link to="/">
          <button>Voltar</button>
        </router-link>
      </div>
    </div>

    <div v-if="etapa == 2">
      Seremos notificados assim que o pagamento for confirmado.
      Entraremos em contato quando isso acontecer, ou caso prefira,
      você sempre pode falar conosco.
    </div>
  </main>
</template>

<script>
import checkout_service from "@/services/checkout-service.js";
import catalogo_service from "@/services/catalogo-service.js";

export default {
  name: "CheckoutPage",
  data() {
    return {
      fallback_url:
        "https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png",
      base_url: "http://wk3outlet.italoferreira.dev.br/static/",
      produtos: [],
      loading: false,
      etapa: 1,
      link: "",
      possui_frete: "nao",
      codigo_cupom: "",
      cupom: {},
      desconto_geral: 0,
    };
  },
  computed: {
    getSubTotal() {
      let { produtos } = this;
      let total = 0;

      produtos.forEach((p) => {
        total += p.preco * p.quantidade;
      });

      return total;
    },
    getDescontos() {
      return 0;
    },
    getTotal() {
      return this.getSubTotal - this.desconto_geral;
    },
  },
  methods: {
    aplicarCupom() {
      let { cupom } = this;
      let { getSubTotal } = this;

      if (cupom.is_percent)
        this.desconto_geral = Math.abs(getSubTotal * (cupom.valor / 100 - 1));
      else
        this.desconto_geral = cupom.valor;
    },
    async buscarCupom() {
      await catalogo_service
        .getCupom(this.codigo_cupom)
        .then((response) => {
          if (response.data.success) {
            this.$toast.success("Cupom aplicado com sucesso");
            this.cupom = response.data.data;
            this.aplicarCupom();
          }
          else{
            this.$toast.error(response.data.message)
            this.cupom = {};
            this.desconto_geral = 0;
          }
        })
        .catch((error) => {
          console.log(error);
          this.$toast.error("Algo deu errado");
        })
    },
    async realizarPagamento() {
      this.loading = true;
      let codigo_cupom = this.cupom.codigo || null

      await checkout_service.realizarPagamento(this.produtos, codigo_cupom)
        .then((response) => {
          if (response.data.success) {
            this.link = response.data.data;
            this.etapa = 2;
            window.open(this.link, '_blank').focus();
          } else {
            this.$toast.error(response.data.message);
          }
        })
        .catch((error) => {
          console.log(error)
          this.$toast.error("Algo deu errado.")
        })
        .finally(() => { this.loading = false; })
    },
    removerProduto(produto) {
      this.$store.dispatch("carrinho/removerProduto", produto);
    },
    getImage(produto) {
      let { fallback_url, base_url } = this;

      if (produto.imagens.length == 0) return fallback_url;
      else return base_url + produto.imagens[0].url;
    },
    getTamanho(produto) {
      if (produto.variacao) return produto.variacao.tamanho;
      else return "";
    },
    getCor(produto) {
      if (produto.variacao) return produto.variacao.cor;
      else return "";
    },
  },
  mounted() {
    this.produtos = this.$store.getters["carrinho/getCarrinho"];
    if (this.produtos.length == 0) this.$router.push("/");
  },
  filters: {
    preco: function (value) {
      return `R$ ${value.toFixed(2)}`;
    },
  },
};
</script>

<style lang="css">
#checkout .container {
  max-width: 980px;
}

.checkout--product-info {
  display: flex;
  align-items: center;
}

.checkout--product-info img {
  width: 45px;
}

#checkout--product-table th {
  padding: 15px;
  background: #f5f5f5;
  border: unset;
  padding: 17px 10px;
  font-size: 14px;
  font-weight: 400;
}

#checkout--product-table {
  border-spacing: unset;
  width: 100%;
}

.checkout--product-info span {
  padding: 2px 5px;
  border: solid 1px grey;
  border-radius: 4px;
  margin: 0px 3px;
}
</style>

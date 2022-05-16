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
          <tr
            v-for="produto in produtos"
            :key="produto.produto_id"
            class="checkout--product-row"
          >
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

      <section id="checkout-bottom" class="container">
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
                <button
                  id="checkout-cupom-button"
                  class="w100"
                  @click="buscarCupom"
                  :disabled="codigo_cupom == ''"
                >
                  Aplicar
                </button>
              </div>
            </section>

            <section id="checkout-values-description">
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

      <div id="checkout-actions" class="container text-right flex">
        <router-link to="/">
          <button class="voltar">Voltar</button>
        </router-link>

        <router-link to="">
          <button @click="realizarPagamento">Finalizar compra</button>
        </router-link>
      </div>
    </div>

    <div id="checkout-success" v-if="etapa == 2">
      <div class="fas fa-check-circle"></div>
      <h2>Ordem de pagamento efetuado</h2>
      <p class="checkout-order-number">Anote o seu pedido: #{{ id_venda }}</p>
      <p>
        Seremos notificados assim que recebermos a confirmação do pagamento.<br/>
        Te avisaremos por e-mail sobre o status da sua compra.
      </p>

      <router-link to="/" class="back">
        <button>Voltar à loja</button>
      </router-link>

      <a target="_blank" :href="link">
        <button>Realizar pagamento</button>
      </a>
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
      id_venda: null,
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

      if (cupom.codigo == null) return;
      if (cupom.is_enabled == false || new Date(cupom.validade) < new Date())
        return this.$toast.error("Este cupom não é mais válido");
      if (cupom.is_percent)
        this.desconto_geral = Math.abs(getSubTotal * (cupom.valor / 100 - 1));
      else this.desconto_geral = cupom.valor;
    },
    async buscarCupom() {
      await catalogo_service
        .getCupom(this.codigo_cupom)
        .then((response) => {
          if (response.data.success) {
            this.cupom = response.data.data;
            this.aplicarCupom();
          } else {
            this.$toast.error(response.data.message);
            this.cupom = {};
            this.desconto_geral = 0;
          }
        })
        .catch((error) => {
          console.log(error);
          this.$toast.error("Algo deu errado");
        });
    },
    async realizarPagamento() {
      this.loading = true;
      let codigo_cupom = this.cupom.codigo || null;

      await checkout_service
        .realizarPagamento(this.produtos, codigo_cupom)
        .then((response) => {
          if (response.data.success) {
            console.log(response.data.data)
            this.link = response.data.data.url;
            this.id_venda = response.data.data.id_venda
            this.etapa = 2;
            window.open(this.link, "_blank").focus();
          } else {
            this.$toast.error(response.data.message);
          }
        })
        .catch((error) => {
          console.log(error);
          this.$toast.error("Algo deu errado.");
        })
        .finally(() => {
          this.loading = false;
        });
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
  margin-right: 20px;
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

.checkout--product-quantity button {
  background: unset;
  border: solid 1px;
  border-radius: 1px;
  height: 25px;
  width: 25px;
  align-items: center;
  justify-content: space-around;
  padding: unset;
  border-color: #a5a5a5;
  cursor: pointer;
}

.checkout--product-quantity span {
  padding: 2px 8px;
  background: whitesmoke;
  margin: 0 5px;
  border: solid 1px whitesmoke;
}

#checkout-bottom > div {
    padding: 20px;
}

#checkout-bottom {
  background: whitesmoke;
  margin-top: 30px;
}

#checkout-values-description p {
  margin: 3px 0px;
}

#checkout-values-description {
  margin-top: 20px;
}

#checkout .form-group input[type="text"] {
    width: calc(100% - 20px);
    margin-bottom: 10px;
}

#checkout-success {
    padding: 10vw;
}

#checkout-cupom-button {
    padding: 5px;
    text-transform: uppercase;
    font-weight: bold;
    background: #2c3e50;
    color: #fff;
}

#checkout-actions.container {
    justify-content: space-between;
}

#checkout-actions button {
    padding: 5px;
    text-transform: uppercase;
    font-weight: bold;
    background: #2c3e50;
    color: #fff;
    margin-top: 10px;
}

#checkout-actions button.voltar {

    background: unset;
    color: #2c3e50;
    border: solid 1px;
}

#checkout-success .fas {
    font-size: 100px;
}

.checkout-order-number {
    font-size: 14px;
    color: grey;
}

#checkout-success button {
    padding: 15px 12px;
    background: #2c3e50;
    color: #fff;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 1.2px;
    margin-top: 30px;
}

#checkout-success .back {
    margin-right: 10px;
}

#checkout-success .back button {
    background: unset;
    color: #2c3e50;
}


</style>

<template>
  <main v-if="etapa == 1" id="checkout" >
    <section class="container">
      <h2>Checkout</h2>
      <ul>
        <li v-for="produto in produtos" :key="produto.produto_id">
          <template v-if="produto.variacao">
            {{ produto.nome_produto }} | Qtd: 01 |
            {{ produto.variacao.tamanho ? `Tamanho: ${produto.variacao.tamanho}` : null}}
            {{ produto.variacao.cor ? `Cor: ${produto.variacao.cor}` : null}}
          </template>

          <template v-else>
            {{ produto.nome_produto }} | Qtd: 01 |
          </template>

        </li>
      </ul>
    </section>

    <div class="container">
      <v-btn @click="realizarPagamento">
        Avançar
      </v-btn>

      <v-btn :to="'/'">
        Voltar
      </v-btn>
    </div>
  </main>

  <main v-else>
    <section class="container">
      <div v-if="loading">
        <p>carregando ....</p>
      </div>

      <div v-else>
        <p>Ordem efetuada! Aguardamos o seu pagamento</p>
        <v-btn :href="link" target="_blank">
          Ir para o pagamento
        </v-btn>
      </div>
    </section>
  </main>
</template>

<script>
import service from '@/services/checkout-service.js';

export default {
  name: 'CheckoutPage',
  data(){
    return {
      produtos: [],
      loading: false,
      etapa: 1,
      link: '',
    }
  },
  methods: {
    async realizarPagamento(){
      this.loading = true;
      let response = await service.realizarPagamento(this.produtos);
      if(response.data.success){
        this.loading = false;
        this.etapa = 2;
        this.link = response.data.data;
      }
      else{
        this.$toast.error(response.data.message);
      }
    }
  },
  mounted(){
    this.produtos = this.$store.state.carrinho.carrinho;
  }
}
</script>

<style lang="css">

</style>

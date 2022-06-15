<template>
  <section id="variation-options">
    <div class="row variation-options--colors">
      <p>Cores</p>

      <div class="flex">
        <button
          @click="selecionaCor(cor.cor), selecionaVariacao(cor.variacao_id)"
          class="variacao-button"
          v-for="cor in cores"
          :key="`${cor.cor}-${cor.variacao_id}`"
          :class="{
            'selected': cor_selecionada == cor.cor,
          }"
        >
          <span
            class="variacao-cor"
            :style="`background-color: ${cor.hexa}`"
          ></span>
        </button>
      </div>
    </div>

    <div class="row variation-options--sizes">
      <p>Tamanhos</p>

      <div class="flex">
        <button
          @click="selecionaTamanho(tamanho.tamanho), selecionaVariacao(tamanho.variacao_id)"
          class="variacao-button"
          v-for="tamanho in tamanhos"
          :key="`${tamanho.tamanho}-${tamanho.variacao_id}`"
          :class="{
            'selected': tamanho_selecionado == tamanho.tamanho,
            'no-stock': getQuantidade(tamanho.variacao_id) == 0
          }"
        >
          <span class="variacao-tamanho">
            {{ tamanho.tamanho }}
          </span>
        </button>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "ProdutoVariation",
  props: ["variacoes"],
  data() {
    return {
      cores: [],
      tamanhos: [],
      cor_selecionada: null,
      tamanho_selecionado: null,
    };
  },
  methods: {
    processaVariacoes() {
      let variacoes = this.variacoes;
      let cores_aux = [];
      let tamanhos_aux = [];

      // primeira iteração para as cores
      variacoes.forEach((variacao) => {
        if (variacao.cor) cores_aux.push(variacao);
      });

      // segunda iteração para os tamanhos
      variacoes.forEach((variacao) => {
        if (variacao.tamanho) tamanhos_aux.push(variacao);
      });

      this.cores = Array.from(new Set(cores_aux.map((c) => c.cor))).map(
        (cor) => {
          return cores_aux.find((c) => c.cor === cor);
        }
      );

      if(this.cores.length > 0)
        this.cor_selecionada = this.cores[0].cor

      this.tamanhos = Array.from(
        new Set(tamanhos_aux.map((t) => t.tamanho))
      ).map((tamanho) => {
        return tamanhos_aux.find((t) => t.tamanho === tamanho);
      });
    },
    selecionaCor(cor) {
      console.log("cor selecionada:", cor)
      this.cor_selecionada = cor;
      const resultado = this.variacoes.filter((variacao) => {
        return variacao.cor == cor;
      });
      this.tamanhos = resultado;
    },
    selecionaTamanho(tamanho) {
      console.log("tamanho selecionado:", tamanho)
      this.tamanho_selecionado = tamanho;
      const resultado = this.variacoes.filter((variacao) => {
        return variacao.tamanho == tamanho;
      });
      return resultado;
      // console.log(resultado);
    },
    selecionaVariacao(id) {
      console.log("variacao selecionada:", id)
      this.$emit('input', id);
    },
    getQuantidade(variacao_id){
      let variacao = this.variacoes.filter((variacao) => {
        return variacao.variacao_id == variacao_id
      })
      console.log("variacao", variacao)
      return variacao[0].quantidade
    }
  },
  mounted() {
    this.processaVariacoes();
  },
};
</script>

<style lang="css">
.variacao-button {
  height: 25px;
  width: 25px;
  padding: 2px;
  border: solid 1px grey;
  background: unset;
  position: relative;
}

.variacao-tamanho,
.variacao-cor {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

#variation-options .variacao-button:not(:last-child) {
  margin-right: 5px;
}

#variation-options h2{
  margin: unset;
}

#variation-options p{
  text-align: left;
}

.variacao-button.selected {
  border: solid 2px #ffaa2a;
}

.variacao-button.no-stock:after {
    width: 32px;
    height: 2px;
    position: absolute;
    background: #5e6064;
    z-index: 1;
    content: '';
    top: 11px;
    left: -5px;
    transform: rotate(45deg);
}

@media(max-width: 425px){
  #variation-options > .row {
    padding: unset;
  }
}
</style>

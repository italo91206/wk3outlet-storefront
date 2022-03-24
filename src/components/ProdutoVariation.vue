<template>
  <section id="variation-options">
    <div class="row variation-options--colors">
      <p>Cores</p>

      <div class="flex">
        <button
          @click="selecionaCor(cor.cor), selecionaVariacao(cor.variacao_id)"
          v-for="cor in cores"
          :key="`${cor.cor}-${cor.variacao_id}`"
          class="variacao-button"
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
          @click="selecionaVariacao(tamanho.variacao_id)"
          v-for="tamanho in tamanhos"
          :key="`${tamanho.tamanho}-${tamanho.variacao_id}`"
          class="variacao-button"
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
  props: ["data"],
  data() {
    return {
      cores: [],
      tamanhos: [],
    };
  },
  methods: {
    processaVariacoes() {
      let data = this.data;
      let cores_aux = [];
      let tamanhos_aux = [];

      // primeira iteração para as cores
      data.forEach((variacao) => {
        if (variacao.cor) cores_aux.push(variacao);
      });

      // segunda iteração para os tamanhos
      data.forEach((variacao) => {
        if (variacao.tamanho) tamanhos_aux.push(variacao);
      });

      // const uniqueAddresses = Array.from(new Set(addresses.map(a => a.id)))
      //   .map(id => {
      //     return addresses.find(a => a.id === id)
      //   })

      this.cores = Array.from(new Set(cores_aux.map((c) => c.cor))).map(
        (cor) => {
          return cores_aux.find((c) => c.cor === cor);
        }
      );

      this.tamanhos = Array.from(
        new Set(tamanhos_aux.map((t) => t.tamanho))
      ).map((tamanho) => {
        return tamanhos_aux.find((t) => t.tamanho === tamanho);
      });
    },
    selecionaCor(cor) {
      const resultado = this.data.filter((variacao) => {
        return variacao.cor == cor;
      });
      this.tamanhos = resultado;
    },
    selecionaTamanho(tamanho) {
      const resultado = this.data.filter((variacao) => {
        return variacao.tamanho == tamanho;
      });
      return resultado;
      // console.log(resultado);
    },
    selecionaVariacao(id) {
      this.$emit("selecionarVariacao", id);
    },
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
</style>

<template>
  <section class="container">
    <h2>Cores :</h2>
    <div class="flex">
      <button
        @click="selecionaCor(cor.cor), selecionaVariacao(cor.variacao_id)"
        v-for="cor in cores"
        :key="`${cor.cor}-${cor.variacao_id}`" class="variacao variacao-cor" :style="`background-color: ${cor.hexa}`">
        {{cor.cor}}
      </button>
    </div>

    <h2>Tamanhos :</h2>
    <div class="flex">
      <button
        @click="selecionaVariacao(tamanho.variacao_id)"
        v-for="tamanho in tamanhos" :key="`${tamanho.tamanho}-${tamanho.variacao_id}`" class="variacao variacao-tamanho">
        {{tamanho.tamanho}}
      </button>
    </div>
  </section>
</template>

<script>
export default {
  name: 'ProdutoVariation',
  props: ['data'],
  data(){
    return {
      cores: [],
      tamanhos: [],
    }
  },
  methods: {
    processaVariacoes(){
      let data = this.data;
      let cores_aux = [];
      let tamanhos_aux = [];

      // primeira iteração para as cores
      data.forEach((variacao) => {
        if(variacao.cor)
          cores_aux.push(variacao);
      })

      // segunda iteração para os tamanhos
      data.forEach((variacao) => {
        if(variacao.tamanho)
          tamanhos_aux.push(variacao);
      })

      // const uniqueAddresses = Array.from(new Set(addresses.map(a => a.id)))
      //   .map(id => {
      //     return addresses.find(a => a.id === id)
      //   })


      this.cores = Array.from(new Set(cores_aux.map(c => c.cor)))
        .map(cor => {
          return cores_aux.find( c => c.cor === cor )
        });

      this.tamanhos = Array.from(new Set(tamanhos_aux.map(t => t.tamanho)))
        .map(tamanho => {
          return tamanhos_aux.find( t => t.tamanho === tamanho )
        });
    },
    selecionaCor(cor){
      const resultado = this.data.filter((variacao) => {
        return variacao.cor == cor;
      });
      this.tamanhos = resultado;
    },
    selecionaTamanho(tamanho){
      const resultado = this.data.filter(variacao => { return variacao.tamanho == tamanho });
      return resultado;
      // console.log(resultado);
    },
    selecionaVariacao(id){
      this.$emit('selecionarVariacao', id);
    }
  },
  mounted() {
    this.processaVariacoes();
  }
}
</script>

<style lang="css">
button.variacao {
  border: solid 1px grey;
}
</style>

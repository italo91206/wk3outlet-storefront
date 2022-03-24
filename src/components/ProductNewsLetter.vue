<template>
  <section id="product-newsletter">
    <p>Ops, parece que este produto não possui estoque ainda. Podemos te avisar assim que chegar!</p>

    <form id="product-newsletter--form" @submit.prevent="cadastrarNewsletter">
      <div class="row flex">
        <div id="product-newsletter--input">
          <input type="text" v-model="email" placeholder="Digite seu e-mail">
          <span class="fas fa-envelope"></span>
        </div>

        <button type="submit">Cadastrar</button>
      </div>
    </form>
  </section>
</template>

<script>
export default {
  name: 'ProductNewsletter',
  props: [ 'sku' ],
  data(){
    return {
      email: '',
      nome: '',
    }
  },
  methods:{
    cadastrarNewsletter(){
      console.log("Você apertou para se inscrever: ", this.sku)
    }
  }
}
</script>

<style>
#product-newsletter--input {
    position: relative;
}

#product-newsletter--input .fas {
    position: absolute;
    top: 6px;
    right: 8px;
}

#product-newsletter--input input {
    padding: 5px 30px 5px 5px;
}

#product-newsletter button {
    border: unset;
    border-radius: unset;
    background: #ffaa2a;
    text-transform: uppercase;
    font-family: 'Roboto';
    cursor: pointer;
    margin-left: 5px;
}
</style>

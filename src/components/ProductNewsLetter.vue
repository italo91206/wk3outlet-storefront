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
import service from '@/services/newsletter-service.js'

export default {
  name: 'ProductNewsletter',
  props: [ 'sku', 'produto_id' ],
  data(){
    return {
      email: '',
    }
  },
  methods:{
    async cadastrarNewsletter(){
      let { sku, produto_id, email } = this;

      await service.cadastrarNewsletter(sku, produto_id, email)
        .then((response) => {
          if(response.data.success){
            this.$toast.success("Você se inscreveu na newsletter")
            this.email = ''
          }
          else{
            this.$toast.error(response.data.message)
            console.log(response.data)
          }
        })
        .catch((error) => {
          this.$toast.error("Algo deu errado")
          console.log(error)
        })
    }
  },
  mounted(){
    let perfil = { ...this.$store.getters['perfil/getPerfil'] }
    if(perfil.email != null)
      this.email = perfil.email
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

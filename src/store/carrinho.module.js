export const carrinho = {
  namespaced: true,
  state: {
    carrinho: [],
    show: false,
  },
  actions: {
    adicionarProduto({commit}, payload){
      return commit('adicionarProduto', payload);
    },
    removerProduto({commit}, produto){
      return commit('removerProduto', produto);
    },
    incrementar({commit}, produto_id){
      return commit('incrementar', produto_id);
    },
    decrementar({commit}, produto_id){
      return commit('incrementar', produto_id);
    },
    toggleCart({commit}){
      return commit('toggleCart');
    },
    setCartShow({commit}, payload){
      return commit('setCartShow', payload)
    }
  },
  getters: {
    getCarrinho(state){
      return state.carrinho;
    },
    getValorTotal(state){
      let total = 0;
      state.carrinho.forEach((produto) => {
        total += produto.preco * produto.quantidade
      })
      return total;
    },
    getCartShow(state){
      return state.show
    }
  },
  mutations: {
    setCartShow(state, payload){
      state.show = payload
    },
    toggleCart(state){
      state.show = !state.show
    },
    // getCarrinho(state){
    //   return state.carrinho;
    // },
    adicionarProduto(state, payload){
      let { product_to_add } = payload;
      let found = state.carrinho.filter((p) => {
        return p.produto_id == product_to_add.produto_id
      })

      if(found[0])
        found[0].quantidade++
      else{
        product_to_add.quantidade = 1;
        state.carrinho.push(product_to_add);
      }
    },
    removerProduto(state, produto){
      let i = 0;
      let achado;
      state.carrinho.forEach((item) => {
        if(item == produto)
          achado = i;
        i++;
      })
      state.carrinho.splice(achado, 1);
    },
    decrementar(state, produto_id){
      state.carrinho.filter((p) => {
        if(p.produto_id == produto_id && p.quantidade > 1)
          p.quantidade--;
      })
    },
    incrementar(state, produto_id){
      console.log("produto_id", produto_id)
      state.carrinho.filter((p) => {
        if(p.produto_id == produto_id)
          p.quantidade++;
      })
    }
  }
}

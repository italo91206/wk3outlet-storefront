export const carrinho = {
  namespaced: true,
  state: {
    carrinho: []
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
    }
  },
  mutations: {
    getCarrinho(state){
      return state.carrinho;
    },
    adicionarProduto(state, payload){
      let { product_to_add } = payload;
      console.log("product_to_add", product_to_add)
      product_to_add.quantidade = 1;
      state.carrinho.push(product_to_add);
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

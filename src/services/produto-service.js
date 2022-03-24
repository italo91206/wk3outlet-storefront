import api from './api/instanceApi';

const ProdutoService = {
  listarProdutos: async () => {
    const response = await api.get('/produto/produtos');
    return response;
  },

  recuperarProduto: async (data) => {
    const response = await api.get('/produto/produto', {
      params: { url: data }
    });
    return response;
  },

  recuperarVariacoes: async (id) => {
    try {
      const response = await api.get('/produto/filhos', {
        params: { id: id }
      });
      return response;
    }
    catch (err) {
      console.log(err);
    }
  },
}

export default ProdutoService;

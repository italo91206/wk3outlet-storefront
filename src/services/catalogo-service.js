import api from './api/instanceApi';

const CatalogoService = {
  listarProdutos: async () => {
    const response = await api.get('/catalogo/produtos');
    return response;
  },
  getProduto: async (url) => {
    try {
      const response = await api.get(`/catalogo/produto/${url}`);
      return response;
    }
    catch (err) {
      console.log(err);
    }
  }
}

export default CatalogoService

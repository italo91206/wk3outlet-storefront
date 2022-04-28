import api from './api/instanceApi';

const CheckoutService = {
  realizarPagamento: async(produtos, codigo_cupom) => {
    try {
      const response = await api.post('/checkout/pagar', {
        produtos: produtos,
        codigo_cupom: codigo_cupom
      });
      return response;
    }
    catch(error){
      console.log(error);
    }
  }
}

export default CheckoutService;

import api from './api/instanceApi';

const CheckoutService = {
  realizarPagamento: async(data) => {
    try {
      const response = await api.post('/checkout/pagar', data);
      return response;
    }
    catch(error){
      console.log(error);
    }
  }
}

export default CheckoutService;

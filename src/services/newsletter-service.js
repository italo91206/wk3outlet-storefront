import api from './api/instanceApi';

const newsletterService = {
  cadastrarNewsletter: async(sku, produto_id, email) => {
    try {
      const response = await api.post('/newsletter/cadastrar', {
        sku: sku,
        produto_id: produto_id,
        email: email
      })
      return response;
    }
    catch(error){
      console.log(error)
    }
  },

  listarNewsletterPorUsuario: async(perfil_id) => {
    try {
      const response = await api.get(`/newsletter/usuario/${perfil_id}`)
      return response;
    }
    catch(error){
      console.log(error)
    }
  },

  removerCadastro: async(newsletter_id) => {
    try {
      const response = await api.delete(`/newsletter/cadastro/${newsletter_id}`)
      return response;
    }
    catch(error){
      console.log(error)
    }
  }
}

export default newsletterService;

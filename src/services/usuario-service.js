import api from './api/instanceApi';

const UsuarioService = {
  // listarUsuarios: async () => {
  //   const response = await api.get('/usuario/usuarios')
  //   return response;
  // },

  listarUsuario: async (id) => {
    try {
      const response = await api.get('/usuario/usuario', {
        params: { id: id }
      });
      return response;
    }
    catch (error) {
      console.log(error);
    }
  },

  novoUsuario: async (usuario) => {
    try {
      let isAdmin = false;
      let isEmployee = false;

      const response = await api.post('/usuario/novo', {
        usuario : {
          ...usuario,
          isAdmin,
          isEmployee
        }
      });
      return response;
    }
    catch(error){
      console.log(error)
    }
  },

  // deletarUsuario: async (id) => {
  //   try {
  //     const response = await api.delete('/usuario/deletar', {
  //       params: { id: id }
  //     });
  //     return response;
  //   }
  //   catch (error) {
  //     console.log(error);
  //   }
  // },

  atualizarUsuario: async (usuario) => {
    try {
      const response = await api.put('/usuario/editar', { usuario: usuario });
      return response;
    }
    catch (error) {
      console.log(error);
    }
  }
}

export default UsuarioService;

<template>
  <main id="entrar-page">
    <section v-if="isLogin" class="entrar-page--login container">
      <div class="row">
        <h2>Entrar</h2>
      </div>

      <div class="row flex">
        <form @submit.prevent="login" class="col-4 m-0-auto">
          <div class="form-group">
            <label for="">E-mail</label>
            <input
              type="text"
              placeholder="Insira seu e-mail"
              v-model="email"
            />
          </div>

          <div class="form-group password-form-group">
            <label for="">Senha</label>

            <input
              :type="showPassword ? 'text' : 'password'"
              placeholder="Senha"
              v-model="password"
            />

            <span
              @click="showPassword = !showPassword"
              :class="{
                'fas fa-eye': showPassword == false,
                'fas fa-eye-slash': showPassword,
              }"
            >
            </span>
          </div>

          <div class="form-group w100">
            <button class="wk-button w100">Entrar</button>
          </div>

          <div class="form-group">
            <p><a>Esqueci minha senha</a></p>
            <p><a @click="isLogin = false">Não tenho conta</a></p>
          </div>
        </form>
      </div>
    </section>

    <section v-else class="entrar-page--signup container">
      <div class="row">
        <h2>Cadastrar-se</h2>
      </div>

      <div class="row flex">
        <form @submit.prevent="cadastro" class="col-4 m-0-auto">
          <div class="form-group">
            <label for="">Nome</label>
            <input
              type="text"
              placeholder="Primeiro nome"
              v-model="perfilToPost.nome"
            />
          </div>

          <div class="form-group">
            <label for="">Sobrenome</label>
            <input
              type="text"
              placeholder="Último nome"
              v-model="perfilToPost.sobrenome"
            />
          </div>

          <div class="form-group">
            <label for="">E-mail</label>
            <input
              type="text"
              placeholder="Seu e-mail"
              v-model="perfilToPost.email"
            />
          </div>

          <div class="form-group form-group--radio">
            <input
              type="radio"
              id="tipo_pessoa_pf"
              value="pf"
              v-model="tipo_pessoa"
            />
            <label for="">Pessoa física</label>
          </div>

          <div class="form-group form-group--radio">
            <input
              type="radio"
              id="tipo_pessoa_pj"
              value="pj"
              v-model="tipo_pessoa"
            />
            <label for="">Pessoa jurídica</label>
          </div>

          <div v-if="tipo_pessoa == 'pf'">
            <div class="form-group">
              <label for="">RG</label>
              <input
                type="text"
                placeholder="Seu rg"
                v-model="perfilToPost.rg"
              />
            </div>

            <div class="form-group">
              <label for="">CPF</label>
              <input
                type="text"
                placeholder="Seu CFP"
                v-model="perfilToPost.cpf"
              />
            </div>
          </div>

          <div v-else>
            <div class="form-group">
              <label for="">CNPJ</label>
              <input
                type="text"
                placeholder="Seu CNPJ"
                v-model="perfilToPost.cnpj"
              />
            </div>

            <div class="form-group">
              <label for="">Nome Fantasia</label>
              <input
                type="text"
                name=""
                placeholder="Nome fantasia da empresa"
                v-model="perfilToPost.nFantasia"
              />
            </div>

            <div class="form-group">
              <label for="">Razão Social</label>
              <input
                type="text"
                placeholder="Razão social da empresa"
                v-model="perfilToPost.razaoSocial"
              />
            </div>
          </div>

          <div class="form-group password-form-group">
            <label for="">Senha</label>

            <div class="relative">
              <input
                :type="showPassword ? 'text' : 'password'"
                placeholder="Senha"
                v-model="perfilToPost.password"
              />
              <span
                @click="showPassword = !showPassword"
                :class="{
                  'fas fa-eye': showPassword == false,
                  'fas fa-eye-slash': showPassword,
                }"
              >
              </span>
            </div>
          </div>

          <div class="form-group">
            <button @click="cadastrar">Cadastrar</button>
          </div>

          <div class="form-group">
            <p><a @click="isLogin = true">Já tenho uma conta</a></p>
          </div>
        </form>
      </div>
    </section>
  </main>
</template>

<script>
import login_service from "@/services/login-service.js";
import usuario_service from "@/services/usuario-service.js";

export default {
  name: "EntrarPage",
  data() {
    return {
      showPassword: false,
      isLogin: true,
      tipo_pessoa: "pf",
      email: "",
      password: "",
      perfilToPost: {},
    };
  },
  methods: {
    async login() {
      const { email, password } = this;

      await login_service
        .fazerLogin({ email, password })
        .then((response) => {
          if (response.data.success) {
            let usuario = response.data.data.usuario;
            let token = response.data.data.token;
            localStorage.setItem("user", token);

            this.$toast.success(`Bem vindo de volta ${usuario.nome}!`);
            this.$store.commit("perfil/setPerfil", usuario);
            this.$router.push("/");
          } else {
            console.log(response.data.message);
            this.$toast.error(response.data.message);
          }
        })
        .catch((error) => {
          this.$toast.error(`Ops, algo de errado`);
          console.log(error);
        });
    },
    async cadastrar() {
      await usuario_service
        .novoUsuario(this.perfilToPost)
        .then((response) => {
          if (response.data.success) {
            this.$toast.success("Cadastro efetuado com sucesso");
            this.email = this.perfilToPost.email;
            this.password = this.perfilToPost.password;
            this.login();
          } else {
            this.$toast.error(response.data.message);
            console.log(response.data);
          }
        })
        .catch((error) => {
          this.$toast.error("Algo deu errado.");
          console.log(error);
        });
    },
  },
  watch: {
    tipo_pessoa() {
      if (this.tipo_pessoa == "pf") this.perfilToPost.isCompany = false;
      else this.perfilToPost.isCompany = true;
    },
  },
};
</script>

<style>
.password-form-group > .relative {
  display: inline-block;
  width: 100%;
}

.password-form-group .fas {
  position: absolute;
  right: 9px;
  bottom: 6px;
}

#entrar-page .form-group {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-bottom: 20px;
  position: relative;
}

#entrar-page .form-group--radio {
  justify-content: unset;
}

.form-group input {
  width: 100%;
  margin-top: 2px;
  padding: 5px 10px;
}

#entrar-page .entrar-page--login {
  padding: 5vw;
}

.form-group--radio input {
  width: unset;
  margin-right: 15px;
  margin-left: unset;
}
</style>

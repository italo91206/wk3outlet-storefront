<template>
  <main id="minha-conta-page">
    <section v-if="perfil" class="container">
      <div class="row">
        <h2>Bem-vindo à sua conta, {{ old_name }}!</h2>
      </div>

      <div class="row flex">
        <div class="flex col-10 m-0-auto">
          <div class="col-3">
            <button
              v-bind:class="{ etapaAtivo: etapa == 1 }"
              class="w100"
              @click="etapa = 1"
            >
              Inf. Básicas
            </button>
            <button
              v-bind:class="{ etapaAtivo: etapa == 2 }"
              class="w100"
              @click="etapa = 2"
            >
              Inf. Avançadas
            </button>
            <button
              v-bind:class="{ etapaAtivo: etapa == 3 }"
              class="w100"
              @click="etapa = 3"
            >
              Compras
            </button>
            <button
              v-bind:class="{ etapaAtivo: etapa == 4 }"
              class="w100"
              @click="(etapa = 4), carregarNewsletter()"
            >
              Newsletter
            </button>
            <button class="w100" @click="logoff">Sair</button>
          </div>

          <div class="col-5 m-0-auto">
            <div v-if="etapa == 1" class="w100">
              <div class="form-group">
                <label for="">Nome</label>
                <input type="text" v-model="perfil.nome" :disabled="disabled" />
              </div>

              <div class="form-group">
                <label for="">Sobrenome</label>
                <input
                  type="text"
                  v-model="perfil.sobrenome"
                  :disabled="disabled"
                />
              </div>

              <div class="form-group">
                <label for="">Email</label>
                <input
                  type="text"
                  v-model="perfil.email"
                  :disabled="disabled"
                />
              </div>

              <div class="form-group">
                <label for="">Tipo de perfil</label>
                <div class="row flex">
                  <div class="form-group flex">
                    <input
                      type="radio"
                      v-model="perfil.isCompany"
                      value="false"
                      :disabled="disabled"
                    />
                    <label for="">Pessoa Física</label>
                  </div>

                  <div class="form-group flex">
                    <input
                      type="radio"
                      v-model="perfil.isCompany"
                      value="true"
                      :disabled="disabled"
                    />
                    <label for="">Pessoa Jurídica</label>
                  </div>
                </div>
              </div>
            </div>

            <div v-else-if="etapa == 2" class="w100">
              <div v-if="perfil.isCompany == false">
                <div class="form-group">
                  <label for="">CPF</label>
                  <input
                    type="text"
                    v-model="perfil.cpf"
                    :disabled="disabled"
                  />
                </div>

                <div class="form-group">
                  <label for="">RG</label>
                  <input type="text" v-model="perfil.rg" :disabled="disabled" />
                </div>
              </div>

              <div v-else>
                <div class="form-group">
                  <label for="">CNPJ</label>
                  <input
                    type="text"
                    v-model="perfil.cnpj"
                    :disabled="disabled"
                  />
                </div>

                <div class="form-group">
                  <label for="">Nome Fantasia</label>
                  <input
                    type="text"
                    v-model="perfil.nFantasia"
                    :disabled="disabled"
                  />
                </div>

                <div class="form-group">
                  <label for="">Razão Social</label>
                  <input
                    type="text"
                    v-model="perfil.razaoSocial"
                    :disabled="disabled"
                  />
                </div>
              </div>

              <div class="form-group">
                <label for="">Nova senha</label>
                <input
                  type="text"
                  v-model="first_password"
                  :disabled="disabled"
                />
              </div>

              <div class="form-group">
                <label for="">Confirmar nova senha</label>
                <input
                  type="text"
                  v-model="second_password"
                  :disabled="disabled"
                />
              </div>

              <div class="form-group">
                <label for="">Senha atual</label>
                <input
                  type="text"
                  v-model="actual_password"
                  :disabled="disabled"
                />
              </div>
            </div>

            <div v-else-if="etapa == 3" class="w100">
              <p>Ainda não pronto.</p>
            </div>

            <div v-else class="w100">
              <table>
                <tr v-for="(cadastro, i) in cadastros_newsletters" :key="i">
                  <td>{{ cadastro.nome_produto }}</td>
                  <td>
                    <router-link :to="`/p/cadastro.sku`">visitar</router-link>
                  </td>
                  <td>
                    <a @click="unfollowNewsletter(cadastro.newsletter_id)">
                      deixar de seguir
                    </a>
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <button v-if="disabled == true" @click="disabled = false">
          Habilitar edição
        </button>
        <button v-else @click="update">Atualizar cadastro</button>
      </div>
    </section>
  </main>
</template>

<script>
import login_service from "@/services/login-service.js";
import usuario_service from "@/services/usuario-service.js";
import newsletter_service from "@/services/newsletter-service.js";

import jwt_decode from "jwt-decode";

export default {
  name: "MinhaContaPage",
  data() {
    return {
      perfil: null,
      disabled: true,
      first_password: "",
      second_password: "",
      actual_password: "",
      etapa: 1,
      old_name: "",
      cadastros_newsletters: [],
    };
  },
  computed: {
    isValidAccount() {
      const user = localStorage.getItem("user");

      if (user == null) return false;
      else {
        let user_decoded = jwt_decode(user).usuario;
        let exp_date = new Date(user_decoded.exp * 1000);

        if (user && exp_date < new Date()) {
          localStorage.removeItem("user");
          return false;
        } else return true;
      }
    },
  },
  methods: {
    getNomePerfil() {
      return this.perfil.nome;
    },
    logoff() {
      localStorage.removeItem("user");
      this.$store.commit("perfil/unsetPerfil");
      this.$router.push("/");
    },
    async unfollowNewsletter(id) {
      await newsletter_service.removerCadastro(id).then((response) => {
        if (response.data.success)
          this.cadastros_newsletters = this.cadastros_newsletters.filter(
            (c) => {
              return c.newsletter_id != id;
            }
          );
      });
    },
    async forceLogin() {
      const { email, password } = this.perfil;
      await login_service
        .fazerLogin({ email, password })
        .then((response) => {
          if (response.data.success) {
            let usuario = response.data.data.usuario;
            let token = response.data.data.token;
            localStorage.setItem("user", token);

            this.$store.commit("perfil/setPerfil", usuario);
            this.$router.push("/minha-conta");
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
    async update() {
      await usuario_service
        .atualizarUsuario(this.perfil)
        .then((response) => {
          if (response.data.success) {
            this.$toast.success("Perfil atualizado com sucesso");
            this.forceLogin();
            this.disabled = true;
          } else {
            this.$toast.error(response.data.message);
            console.log(response.data);
          }
        })
        .catch((error) => {
          this.$toast.error("Algo deu errado");
          console.log(error);
        });
    },
    async carregarNewsletter() {
      await newsletter_service
        .listarNewsletterPorUsuario(this.perfil.id)
        .then((response) => {
          if (response.data.success) {
            this.cadastros_newsletters = response.data.data;
          } else {
            this.$toast.error(response.data.message);
            console.log(response);
          }
        })
        .catch((error) => {
          this.$toast.error("Algo deu errado");
          console.log(error);
        });
    },
  },
  mounted() {
    console.log("isValidAccount", this.isValidAccount);

    if (!this.isValidAccount) {
      this.$router.push("/entrar");
    } else {
      this.perfil = { ...this.$store.getters["perfil/getPerfil"] };
      this.old_name = this.perfil.nome;
    }
  },
};
</script>

<style>
#minha-conta-page .form-group {
  display: flex;
  justify-content: space-between;
}

#minha-conta-page table td {
  border: solid 1px #d7d7d7;
  padding: 6px;
}
</style>

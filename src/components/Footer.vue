<template>
  <footer id="wk-footer">
    <section class="footer-section">
      <div class="container flex">
        <article class="footer-section--item">
          <h4>Institucional</h4>
          <ul class="footer-list">
            <li><router-link to="/">Quem somos</router-link></li>
            <li><router-link to="/">Entrega Expressa</router-link></li>
          </ul>
        </article>

        <article class="footer-section--item">
          <h4>Ajuda</h4>
          <ul class="footer-list">
            <li><router-link to="/">Política de privacidade</router-link></li>
            <li><router-link to="/">Trocas e devoluções</router-link></li>
            <li><router-link to="/">Dúvidas frequentes</router-link></li>
          </ul>
        </article>

        <article class="footer-section--item">
          <h4>Contato</h4>
          <ul class="footer-list">
            <li><router-link to="/">(44) 99727-0403</router-link></li>
            <li><router-link to="/">kalleu2799@gmail.com</router-link></li>
          </ul>
        </article>

        <article class="footer-section--item">
          <h4>Redes sociais</h4>
          <ul class="footer-list footer-list--social">
            <li>
              <router-link to="/"
                ><span class="fab fa-facebook-f"></span
              ></router-link>
            </li>
            <li>
              <router-link to="/"
                ><span class="fab fa-instagram"></span
              ></router-link>
            </li>
          </ul>
        </article>

        <article class="footer-section--item">
          <h4>Ajuda</h4>
          <ul class="footer-list">
            <li><router-link to="/">Política de privacidade</router-link></li>
            <li><router-link to="/">Trocas e devoluções</router-link></li>
            <li><router-link to="/">Dúvidas frequentes</router-link></li>
          </ul>
        </article>
      </div>
    </section>

    <section class="footer-section">
      <div class="container flex">
        <article class="footer-section--item col-4">
          <h4>Formas de pagamento</h4>
          <img
            src="https://i0.wp.com/urucuna.com/wp-content/uploads/2021/02/bandeiras-cartoes-credito.png?ssl=1"
            alt=""
          />
        </article>

        <article class="footer-section--item col-4">
          <h4>Segurança</h4>

          <div class="footer-section--wrapper flex space-between">
            <img
              src="https://increazy-folder.s3.amazonaws.com/5ee8c9130472895d074b1102/empresa-associada.png?v=1643115219"
              alt=""
              class="col-2"
            />
            <img
              src="https://increazy-folder.s3.amazonaws.com/5ee8c9130472895d074b1102/e-bit.png?v=1643115219"
              alt=""
              class="col-2"
            />
            <img
              src="https://increazy-folder.s3.amazonaws.com/5ee8c9130472895d074b1102/compra-segura.png?v=1643115219"
              alt=""
              class="col-2"
            />
          </div>
        </article>

        <article class="footer-section--item col-4">
          <h4>WK3 Outlet</h4>
          <p>
            Com 14 anos de muita história para contar, hoje temos 12 lojas
            espalhadas por todo o estado do Paraná. A nossa trajetória, desde o
            início, só acontece com um único objetivo: levar o que há de melhor
            para os nossos clientes e com o menor preço sempre.
          </p>
        </article>
      </div>
    </section>

    <section class="footer-copyright">
      <h5>
        © WK3 Outlet 2022. Todos os direitos reservados. Conheça nossa Política
        de Privacidade <br />
        R. Ricardo Kauffman 365, Centro - CNPJ: CNPJ 40.088.323/0001-01 -
        Avenida Brasil, 456, Centro, CEP 87340-000, Mamboré – PR
      </h5>
    </section>
  </footer>
</template>

<script>
export default {
  name: "FooterComponent",
};
</script>

<style lang="css">
.footer-section--item h4 {
  text-align: left;
}

.footer-section {
  background: #2c3e50;
  color: #fff;
  justify-content: space-around;
  padding: 30px 0;
  border-bottom: solid 1px #ffffff69;
}

.footer-section .container.flex {
  justify-content: space-between;
}

.footer-list {
  margin-block: unset;
  padding-inline: unset;
  margin-inline: unset;
  text-align: left;
  list-style-type: none;
}

.footer-list li {
  margin-bottom: 15px;
  color: #d5d5d5;
}

.footer-list li:hover {
  text-decoration: underline;
}

.footer-list--social li {
  display: inline-block;
  margin-right: 35px;
  font-size: 22px;
}

.footer-section--item p {
  text-align: left;
}

.footer-section--item img {
  width: 100%;
  object-fit: contain;
}

.footer-copyright {
  background: #16222e;
  padding: 30px 10px;
}

.footer-copyright h5 {
  margin: unset;
  max-width: 570px;
  color: white;
  text-align: center;
  margin: 0 auto;
}
</style>

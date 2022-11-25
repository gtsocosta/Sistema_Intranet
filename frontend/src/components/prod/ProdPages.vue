<template>
  <div class="prod-pages">
    <PageTitle
      icon="fa fa-cogs"
      main="Administração do Processo"
      sub="Cadastros & Cia"
    />
    <div class="prod-pages-tabs">
      <b-card no-body>
        <b-tabs card>
          <b-tab title="Produção" active>
            <LoteAdmin />
          </b-tab>
          <b-tab title="Estoque">
            <EstoqueAdmin />
          </b-tab>
          <b-tab title="Planejamento e Controle">
            <PrevAdmin />
          </b-tab>
        </b-tabs>
      </b-card>
    </div>
  </div>
</template>
<script>
import PageTitle from "../template/PageTitle";
import LoteAdmin from "./LoteAdmin";
import EstoqueAdmin from "./EstoqueAdmin";
import PrevAdmin from "./PrevAdmin";
export default {
  name: "ProdPages",
  components: {
    PageTitle,
    LoteAdmin,
    EstoqueAdmin,
    PrevAdmin,
  },
};
</script>

<style>
</style>
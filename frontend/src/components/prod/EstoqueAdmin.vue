<template>
  <div class="estoque-inicia">
    <b-form>
      <input id="estoque-lote" type="hidden" v-model="estoque.lote" />
      <b-row>
        <b-col md="2" sm="12">
          <b-form-group label="Código:" label-for="estoque-lote">
            <b-form-input
              id="estoque-lote"
              type="text"
              v-model="estoque.lote"
              required
              :readonly="mode === 'remove'"
              placeholder="Informe o código do estoque.."
            />
          </b-form-group>
        </b-col>
        <b-col md="2" sm="12">
          <b-form-group label="Data:" label-for="estoque-data">
            <b-form-input
              id="estoque-data"
              type="text"
              v-model="estoque.data"
              required
              :readonly="mode === 'remove'"
              placeholder="Informe a data de previsão..."
            />
          </b-form-group>
        </b-col>
        <b-col md="5" sm="12">
          <b-form-group
            v-if="mode === 'save'"
            label="Gestor:"
            label-for="estoque-userId"
          >
            <b-form-select
              id="estoque-userId"
              :options="users"
              v-model="estoque.userId"
            />
          </b-form-group>
        </b-col>
        <b-col md="6" sm="12">
          <b-form-checkbox
            id="estoque-inicia"
            v-show="mode === 'save'"
            v-model="estoque.inicia"
            class="mt-3 mb-3"
          >
            Produção?
          </b-form-checkbox>
        </b-col>
      </b-row>
      <b-row>
        <b-col xs="12">
          <b-button
            variant="outline-primary"
            v-if="mode === 'save'"
            @click="save"
            >Salvar</b-button
          >
          <b-button
            variant="outline-danger"
            v-if="mode === 'remove'"
            @click="remove"
            >Excluir</b-button
          >
          <b-button class="ml-2" variant="outline-success" @click="search"
            >Buscar</b-button
          >
          <b-button class="ml-2" variant="outline-danger" @click="reset"
            >Cancelar</b-button
          >
        </b-col>
      </b-row>
    </b-form>
    <hr />
    <b-table hover striped :items="estoques" :fields="fields">
      <template slot="cell(actions)" slot-scope="data">
        <b-button
          variant="outline-warning"
          @click="loadEstoque(data.item)"
          class="mr-2"
        >
          <i class="fa fa-pencil"></i>
        </b-button>
        <b-button
          variant="outline-danger"
          @click="loadEstoque(data.item, 'remove')"
        >
          <i class="fa fa-trash"></i>
        </b-button>
      </template>
    </b-table>
    <b-pagination
      size="md"
      v-model="page"
      :total-rows="count"
      :per-page="limit"
    />
  </div>
</template>

<script>
import { baseApiUrl, showError } from "@/global";
import axios from "axios";

export default {
  name: "Estoqueinicia",

  data: function () {
    return {
      mode: "save",
      estoque: {},
      estoques: [],
      users: [],
      page: 1,
      limit: 0,
      count: 0,
      fields: [
        // { key: "id", label: "Id", sortable: true },
        { key: "lote", label: "Cód. do lote", sortable: true },
        { key: "COD", label: "Código", sortable: true },
        { key: "DES", label: "Descrição", sortable: true },
        { key: "UM", label: "UM", sortable: true },
        { key: "QTD", label: "Quantidade", sortable: true },
        { key: "CUSTO_UNITARIO", label: "V. Unitario", sortable: true },
        { key: "CUSTO_TOTAL", label: "V. Total", sortable: true },
        { key: "CATEGORIA", label: "Categoria", sortable: true },
        { key: "markup", label: "markup", sortable: true },
        { key: "data", label: "data", sortable: true },
        {
          key: "inicia",
          label: "Produção",
          sortable: true,
          formatter: (value) => (value ? "Sim" : "Não"),
        },
        { key: "actions", label: "Ações" },
      ],
    };
  },
  methods: {
    loadestoques() {
      const url = `${baseApiUrl}/estoques?page=${this.page}`;
      axios.get(url).then((res) => {
        this.estoques = res.data.data;
        this.count = res.data.count;
        this.limit = res.data.limit;
      });
    },
    reset() {
      this.mode = "save";
      this.estoque = {};
      this.loadestoques();
    },
    save() {
      const method = this.estoque.lote ? "put" : "post";
      const lote = this.estoque.lote ? `/${this.estoque.lote}` : "";
      axios[method](`${baseApiUrl}/estoques${lote}`, this.estoque)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
        })
        .catch(showError);
    },
    remove() {
      const lote = this.estoque.lote;
      axios
        .delete(`${baseApiUrl}/estoques/${lote}`)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
        })
        .catch(showError);
    },
    loadEstoque(estoque, mode = "save") {
      this.mode = mode;
      this.estoque = { ...estoque };
    },
    loadUsers() {
      const url = `${baseApiUrl}/users`;
      axios.get(url).then((res) => {
        this.users = res.data.map((user) => {
          return { value: user.id, text: `${user.name}` };
        });
      });
    },
  },
  watch: {
    page() {
      this.loadestoques();
    },
  },
  mounted() {
    this.loadestoques();
    this.loadUsers();
  },
};
</script>

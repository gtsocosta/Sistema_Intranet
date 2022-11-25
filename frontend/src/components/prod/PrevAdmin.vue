<template>
  <div class="prev-inicia">
    <b-form>
      <input id="prev-lote" type="hidden" v-model="prev.name" />
      <b-row>
        <b-col md="2" sm="12">
          <b-form-group label="Código:" label-for="prev-lote">
            <b-form-input
              id="prev-lote"
              type="text"
              v-model="prev.name"
              required
              :readonly="mode === 'remove'"
              placeholder="Lote / Cód.Ambiente..."
            />
          </b-form-group>
        </b-col>
        <b-col md="2" sm="12">
          <b-form-group label="Data:" label-for="prev-dia">
            <b-form-input
              id="prev-dia"
              type="text"
              v-model="prev.diaselect"
              required
              :readonly="mode === 'remove'"
              placeholder="Informe a data de previsão..."
            />
          </b-form-group>
        </b-col>
        <!-- <b-col md="2" sm="12">
          <b-form-group label="Filtro:" label-for="prev-name">
            <b-form-input
              id="inline-form-input-name"
              class="mb-2 mr-sm-2 mb-sm-0"
              required
              :readonly="mode === 'remove'"
              placeholder="Informe o período..."
              v-model="search"
            ></b-form-input>
          </b-form-group>
        </b-col> -->

        <b-col md="2" sm="12">
          <b-form-group label="Filtrar Status:" label-for="prev-name">
            <b-form-select
              class="mb-2 mr-sm-2 mb-sm-0"
              v-model="selected"
              :options="options"
            ></b-form-select>
          </b-form-group>
        </b-col>
        <b-form-group label="Limpar Filtro:" label-for="prev-name">
          <b-col class="mt-0 mb-0">
            <b-button
              title="Limpar filtro"
              variant="outline-success"
              v-b-tooltip.hover
              @click="clearFilter"
              ><i class="fa fa-trash"></i>
            </b-button>
          </b-col>
        </b-form-group>
        <b-col md="6" sm="12">
          <b-form-group label="Status Produção:" label-for="prev-name">
            <b-form-checkbox
              id="prev-inicia"
              v-show="mode === 'save'"
              v-model="prev.inicia"
              class="mt-3 mb-3"
            >
              Produção?
            </b-form-checkbox>
          </b-form-group>
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
          <b-button class="ml-2" variant="outline-danger" @click="reset"
            >Cancelar</b-button
          >
        </b-col>
      </b-row>
    </b-form>
    <hr />

    <b-table id="dtprevs" hover striped :items="filteredItems" :fields="fields">
      <template slot="cell(actions)" slot-scope="data">
        <b-button
          variant="outline-warning"
          @click="loadprev(data.item)"
          class="mr-2"
        >
          <i class="fa fa-pencil"></i>
        </b-button>
        <b-button
          variant="outline-danger"
          @click="loadprev(data.item, 'remove')"
        >
          <i class="fa fa-trash"></i>
        </b-button>
      </template>
    </b-table>
  </div>
</template>

<script>
import { baseApiUrl, showError } from "@/global";

import axios from "axios";
import moment from "moment";

import "jquery/dist/jquery.min.js";

import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import "datatables.net-buttons/js/dataTables.buttons.js";
import "datatables.net-buttons/js/buttons.colVis.js";
import "datatables.net-buttons/js/buttons.flash.js";
import "datatables.net-buttons/js/buttons.html5.js";
import "datatables.net-buttons/js/buttons.print.js";
import $ from "jquery";
export default {
  name: "previnicia",

  data: function () {
    return {
      mode: "save",

      fields: [
        // { key: "id", label: "Id", sortable: true },
        { key: "name", label: "Cód. do lote", sortable: true },
        { key: "cod", label: "Código", sortable: true },
        { key: "des", label: "Descrição", sortable: true },
        { key: "um", label: "UM", sortable: true },
        { key: "qtd", label: "Quantidade", sortable: true },
        { key: "custo_unitario", label: "V. Unitario", sortable: true },
        { key: "custo_total", label: "V. Total", sortable: true },
        { key: "categoria", label: "Categoria", sortable: true },
        { key: "markup", label: "markup", sortable: true },
        {
          key: "diaselect",
          label: "Data",
          sortable: true,
          formatter: (value) => {
            return moment(value).format("DD/MM/YYYY");
          },
        },
        {
          key: "inicia",
          label: "Produção",
          sortable: true,

          formatter: (value) => (value ? "Sim" : "Nao"),
        },
        { key: "actions", label: "Ações" },
      ],
      prevs: [],
      search: "",
      selected: null,
      options: [
        { value: null, text: "Selecione um status" },
        { value: true, text: "Sim" },
        { value: false, text: "Nao" },
      ],
      prev: {},
    };
  },
  computed: {
    filteredItems() {
      let prevs = [];
      prevs = this.prevs.filter((prev) => {
        return (
          // prev.name.toLowerCase().indexOf(this.search.toLowerCase()) > -1 ||
          prev.diaselect.toLowerCase().indexOf(this.search.toLowerCase()) > -1
        );
      });
      prevs = prevs.filter((prev) => {
        if (this.selected == null) return prev;
        return prev.inicia === this.selected;
      });
      return prevs;
    },
  },
  methods: {
    exportcsvfiles() {
      const url = `${baseApiUrl}/prevs`;
      axios.get(url).then((res) => {
        this.prevs = res.data.data;
        setTimeout(function () {
          $("#dtprevs").DataTable({
            order: [["10", "asc"]],
            bPaginate: false,
            pagingType: "full_numbers",
            // pageLength: 10,
            processing: true,
            dom: "Bfrtip",
            buttons: ["csv", "print"],
          });
        });
      });
    },
    loadprevs() {
      const url = `${baseApiUrl}/prevs`;
      axios.get(url).then((res) => {
        this.prevs = res.data.data;
      });
    },
    save() {
      const method = this.prev.name ? "put" : "post";
      const name = this.prev.name ? `/${this.prev.name}` : "";
      axios[method](`${baseApiUrl}/prevs${name}`, this.prev)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
        })
        .catch(showError);
    },
    reset() {
      this.mode = "save";
      this.prev = {};
      this.loadprevs();
    },
    remove() {
      const name = this.estoque.name;
      axios
        .delete(`${baseApiUrl}/prevs/${name}`)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
        })
        .catch(showError);
    },

    loadprev(prev, mode = "save") {
      this.mode = mode;
      this.prev = { ...prev };
    },

    clearFilter() {
      this.search = "";
      this.selected = null;
    },
  },
  mounted() {
    this.exportcsvfiles();
    this.loadprevs();
  },
};
</script>
<style>
.important {
  font-weight: bold;
  font-size: xx-large;
}

.blue {
  color: blue;
}
</style>
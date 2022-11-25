<template>
  <div class="lote-Admin">
    <b-form>
      <input id="lote-id" type="hidden" v-model="lote.id" />
      <b-row>
        <b-col md="5" sm="12">
          <b-form-group label="Lote:" label-for="lote-name">
            <b-form-input
              id="lote-name"
              type="text"
              v-model="lote.name"
              required
              :readonly="mode === 'remove'"
              placeholder="Informe o código do lote..."
            />
          </b-form-group>
        </b-col>
        <b-col md="5" sm="12">
          <b-form-group label="metros:" label-for="lote-metros">
            <b-form-input
              id="lote-metros"
              type="text"
              v-model="lote.metros"
              required
              :readonly="mode === 'remove'"
              placeholder="Informe a metragem do lote..."
            />
          </b-form-group>
        </b-col>
      </b-row>
      <b-row v-show="mode === 'save'">
        <b-col md="5" sm="12">
          <b-form-group label="homag:" label-for="lote-homag">
            <b-form-input
              id="lote-homag"
              type="text"
              v-model="lote.homag"
              required
              placeholder="Informe a quantidade de paineis..."
            />
          </b-form-group>
        </b-col>

        <b-col md="5" sm="12">
          <b-form-group label="nesting:" label-for="lote-nesting">
            <b-form-input
              id="lote-nesting"
              type="text"
              v-model="lote.nesting"
              required
              placeholder="Informe a quantidade de paineis..."
            />
          </b-form-group>
        </b-col>
        <b-col md="2" sm="12">
          <b-form-group label="Data:" label-for="lote-dia">
            <b-form-input
              id="lote-dia"
              type="date"
              v-model="lote.date"
              required
              :readonly="mode === 'remove'"
              placeholder="Data de previsão..."
            />
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col md="2" sm="12">
          <b-form-group label="Filtrar Status:" label-for="lote-name">
            <b-form-select
              class="mb-2 mr-sm-2 mb-sm-0"
              v-model="selected"
              :options="options"
            ></b-form-select>
          </b-form-group>
        </b-col>
        <b-col md="3" sm="12">
          <b-form-group label="Limpar Filtro:" label-for="lote-name">
            <b-button
              title="Limpar filtro"
              variant="outline-success"
              v-b-tooltip.hover
              @click="clearFilter"
            >
            </b-button>
          </b-form-group>
        </b-col>
        <b-col md="5" sm="12">
          <b-form-group
            v-if="mode === 'save'"
            label="Gestor:"
            label-for="lote-userId"
          >
            <b-form-select
              id="lote-userId"
              :options="users"
              v-model="lote.userId"
            />
          </b-form-group>
        </b-col>
        <b-col md="1" sm="12">
          <b-form-checkbox
            id="lote-inicia"
            v-show="mode === 'save'"
            v-model="lote.inicia"
            class="mt-3 mb-3"
          >
            Produção?
          </b-form-checkbox>
        </b-col>
      </b-row>
      <b-form-group
        v-if="mode === 'save'"
        label="Conteúdo"
        label-for="lote-content"
      >
        <VueEditor
          v-model="lote.content"
          placeholder="Informe o Conteúdo do Artigo..."
        />
      </b-form-group>
      <b-row>
        <b-col md="3">
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

          <input
            type="file"           
            @change="uploadFile"
            ref="file"
            class="form-control"
          />
        </b-col>
      </b-row>
    </b-form>
    <!-- <b-table hover striped :items="lotes" :fields="fields"> -->
    <b-table id="dtlotes" hover striped :items="filteredItems" :fields="fields">
      <template slot="cell(actions)" slot-scope="data">
        <b-button
          variant="outline-warning"
          @click="loadLote(data.item)"
          class="mr-2"
        >
          <i class="fa fa-pencil"></i>
        </b-button>

        <b-button
          variant="outline-danger"
          @click="loadLote(data.item, 'remove')"
        >
          <i class="fa fa-trash"></i>
        </b-button>
      </template>
    </b-table>

    <!-- // ESTRUTURA UTILIZADA PARA A PAGINAÇÃO, ATENÇÃO CONFLITA COM GRÁFICO! -->
    <!-- <b-pagination
      size="md"
      v-model="page"
      :total-rows="count"
      :per-page="limit"
    /> -->
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
import { baseApiUrl, showError } from "@/global";
import axios from "axios";
import moment from "moment";
export default {
  name: "LoteAdmin",
  components: { VueEditor },
  data: function () {
    return {
      mode: "save",
      images: null,
      // lote: {},
      // lotes: [],
      // ESTRUTURA UTILIZADA PARA A PAGINAÇÃO, ATENÇÃO CONFLITA COM GRÁFICO!
      // page: 1,
      // limit: 0,
      // count: 0,
      users: [],
      fields: [
        // { key: "id", label: "Código", sortable: true },
        { key: "name", label: "Lote", sortable: true },
        { key: "metros", label: "Metros²", sortable: true },
        { key: "homag", label: "Homag", sortable: true },
        { key: "nesting", label: "Nesting", sortable: true },
        {
          key: "date",
          label: "Data",
          sortable: true,
          formatter: (value) => {
            return moment(value).format("DD/MM/YYYY");
          },
        },
        { key: "userID", label: "Gestor", sortable: true },
        { key: "description", label: "Descrição", sortable: true },

        {
          key: "inicia",
          label: "Produção",
          sortable: true,
          formatter: (value) => (value ? "Sim" : "Não"),
        },
        { key: "actions", label: "Ações" },
      ],
      lotes: [],
      search: "",
      selected: null,
      options: [
        { value: null, text: "Selecione um status" },
        { value: true, text: "Sim" },
        { value: false, text: "Nao" },
      ],
      lote: {},
    };
  },
  computed: {
    filteredItems() {
      let lotes = [];
      lotes = this.lotes.filter((lote) => {
        return (
          // lote.name.toLowerCase().indexOf(this.search.toLowerCase()) > -1 ||
          lote.date.toLowerCase().indexOf(this.search.toLowerCase()) > -1
        );
      });
      lotes = lotes.filter((lote) => {
        if (this.selected == null) return lote;
        return lote.inicia === this.selected;
      });
      return lotes;
    },
  },
  methods: {
    loadLotes() {
      const url = `${baseApiUrl}/lotes`;
      // ESTRUTURA UTILIZADA PARA A PAGINAÇÃO, ATENÇÃO CONFLITA COM GRÁFICO!
      // const url = `${baseApiUrl}/lotes?page=${this.page}`;
      axios.get(url).then((res) => {
        this.lotes = res.data;
        // ESTRUTURA UTILIZADA PARA A PAGINAÇÃO, ATENÇÃO CONFLITA COM GRÁFICO!
        // this.lotes = res.data.data;
        // this.count = res.data.count;
        // this.limit = res.data.limit;
      });
    },
    uploadFile() {
      this.Images = this.$refs.file.files[0];
    },
    submitFile() {
      const formData = new FormData();
      formData.append("file", this.Images);
      const headers = { "Content-Type": "multipart/form-data" };
      axios
        .post("https://httpbin.org/post", formData, { headers })
        .then((res) => {
          res.data.files; // binary representation of the file
          res.status; // HTTP status
        });
    },
    reset() {
      this.mode = "save";
      this.lote = {};
      this.loadLotes();
    },
    save() {
      const method = this.lote.id ? "put" : "post";
      const id = this.lote.id ? `/${this.lote.id}` : "";
      axios[method](`${baseApiUrl}/lotes${id}`, this.lote)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
        })
        .catch(showError);
    },
    remove() {
      const id = this.lote.id;
      axios
        .delete(`${baseApiUrl}/lotes/${id}`)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
        })
        .catch(showError);
    },
    loadLote(lote, mode = "save") {
      this.mode = mode;
      axios
        .get(`${baseApiUrl}/lotes/${lote.id}`)
        .then((res) => (this.lote = res.data));
    },
    loadUsers() {
      const url = `${baseApiUrl}/users`;
      axios.get(url).then((res) => {
        this.users = res.data.map((user) => {
          return { value: user.id, text: `${user.name}` };
        });
      });
    },
    clearFilter() {
      this.search = "";
      this.selected = null;
    },
  },
  // ESTRUTURA UTILIZADA PARA A PAGINAÇÃO, ATENÇÃO CONFLITA COM GRÁFICO!
  // watch: {
  //   page() {
  //     this.loadLotes();
  //   },
  // },
  mounted() {
    this.loadUsers();
    this.loadLotes();
    this.loadLote();
  },
};
</script>
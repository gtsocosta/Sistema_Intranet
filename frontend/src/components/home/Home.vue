<template>
  <div class="home">
    <PageTitle icon="fa fa-home" main="Dashboard" sub="Apontamento Gráfico" />
    <div class="stats">
      <Stat
        title="Produção"
        :value="stat.lotes"
        icon="fa fa-cogs"
        color="#5b5b5b"
      />
      <Stat
        title="Estoque"
        :value="stat.prevs"
        icon="fa fa-bar-chart"
        color="#f9cf35"
      />
      <Stat
        title="Logística"
        :value="stat.categories"
        icon="fa fa-truck"
        color="#d54d50"
      />
      <Stat
        title="Chamados"
        :value="stat.articles"
        icon="fa fa-wrench"
        color="#3bc480"
      />
      <Stat
        title="Usuários"
        :value="stat.users"
        icon="fa fa-user"
        color="#3282cd"
      />
    </div>
    <div>
      <LineChart class="charts" />
    </div>
  </div>
</template>

<script>
import PageTitle from "../template/PageTitle";

import Stat from "./Stat";
import axios from "axios";
import { baseApiUrl } from "@/global";
import LineChart from "../chart/LineChart.vue";

export default {
  name: "Home",
  components: { PageTitle, Stat, LineChart },
  data: function () {
    return {
      stat: {},
    };
  },
  methods: {
    getStats() {
      axios.get(`${baseApiUrl}/stats`).then((res) => (this.stat = res.data));
    },
  },
  mounted() {
    this.getStats();
  },
};
</script>

<style>
.stats {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.charts {
  display: center;
  justify-content: center;
  flex-wrap: wrap;
}
</style>

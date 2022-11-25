<template>
  <div class="container">
    <div class="row mt-5">
      <div class="col">
        <h1 class="text-center">Acompanhamento de Produção</h1>
      </div>
    </div>
    <div class="row mt-5" v-if="arrProdução.length > 0">
      <div class="col">
        <!-- <h2 class="text-center">Produção</h2> -->
        <line-chart
          :chartData="arrProdução"
          :options="chartOptions"
          :chartColors="ProduçãoColors"
        />
      </div>
    </div>
  </div>
</template>
  
<script>
import axios from "axios";
import moment from "moment";
import { baseApiUrl } from "@/global";
import LineChart from "./PropsChart.vue";

export default {
  components: {
    LineChart,
  },
  data() {
    return {
      arrProdução: [],
      ProduçãoColors: {
        borderColorMetros: "#077187",
        pointBorderColorMetros: "#0E1428",
        pointBackgroundColorMetros: "#AFD6AC",
        backgroundColorMetros: "#871d07",

        borderColorNesting: "#077187",
        pointBorderColorNesting: "#0E1428",
        pointBackgroundColorNesting: "#AFD6AC",
        backgroundColorNesting: "#07871d",

        borderColorHomag: "#077187",
        pointBorderColorHomag: "#0E1428",
        pointBackgroundColorHomag: "#AFD6AC",
        backgroundColorHomag: "#1d0787",
      },

      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },
  async created() {
    const url = `${baseApiUrl}/lotes`;
    const { data } = await axios.get(url);

    data.forEach((d) => {
      const date = moment(d.date).format("DD/MM");
      const { metros, nesting, homag } = d;

      this.arrProdução.push(
        { date, metros: metros },
        { date, nesting: nesting },
        { date, homag: homag }
      );
    });
  },
};
</script>  

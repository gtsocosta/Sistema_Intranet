<link href="https://fonts.googleapis.com/css?family=Work+Sans:400,500,700&display=swap" rel="stylesheet"  />

<script>
import { Bar } from "vue-chartjs";
import json from "./sales.json";
import moment from "moment";

import { baseApiUrl} from "@/global";
import axios from "axios";

let dates = json.sales.map(item => {
  return moment(item.date).format("MMM");
});

let dataset1 = json.sales.map(item => {
  return item.logistica;
});

let dataset2 = json.sales.map(item => {
  return item.filetacao;
});

let dataset3 = json.sales.map(item => {
  return item.corte;
});

export default {
  name: "Chart",
  extends: Bar,
  data: () => ({   

    chartdata: {
            labels: dates,
      datasets: [
        {
          label: "Corte",
          backgroundColor: "#206620",
          data: dataset3
        },
        {
          label: "Filetação",
          backgroundColor: "#091794",
          data: dataset1
        },
        {
          label: "Logistica",
          backgroundColor:"#cc1f00",
          data: dataset2
        }
      ]
    },    
    options: {
      title: {
        display: true,
        text: "Apontamento de Produção",
        fontSize: 18
      },
    tooltips: {
      mode: "x",
      xPadding: 14,
      yPadding: 14,
      cornerRadius: 0,
      footerFontSize: 18,
      footerMarginTop: 16,
      titleMarginBottom: 16,
      titleFontSize: 14,
        bodySpacing: 8,
        bodyFontSize: 14,
        backgroundColor: "#333",
        callbacks: {
          afterTitle: function() {
            window.total = 0;
          },
          label: function(tooltipItem, data) {
            var corporation = data.datasets[tooltipItem.datasetIndex].label;
            var valor =
            data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
            window.total += valor;
            return (
              "  $" +
              valor
              .toFixed(0)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
              " – " +
              corporation
              );
          },

          footer: function() {
            return (
              "$" +
              window.total
                .toFixed(0)
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                );
          }
        }
      },
      legend: {
        display: true,
        position: "bottom",
        labels: { padding: 24, fontSize: 14 }
      },
      layout: {
        padding: {
          left: 20,
          right: 2,
          top: 20,
          bottom: 20
        }
      },
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        xAxes: [
          {
            stacked: true,
            barPercentage: 1,
            scaleLabel: {
              display: false,
              labelString: "Sales"
            },
            gridLines: {
              display: false
            }
          }
        ],
        yAxes: [
          {
            stacked: true,
            scaleLabel: {
              display: false,
              labelString: "Sales"
            },
            gridLines: {
              display: true,
              color: "#f2f2f2"
            },
            ticks: {
              suggestedMin: 0,
              maxTicksLimit: 5,
              suggestedMax: 300,              
              callback: function(value) {
                return "$" + value;
              }
            }
          }
        ]
      }
    }
  }), 
  //  async created() {
    // const url = `${baseApiUrl}/lotes`;
    // const { data } = await axios.get(url);

    // data.forEach((d) => {

    //   const date = moment(d.date).format("MM/DD");
    //   const { metros, nesting, homag } = d;

    //   this.arrMetros.push({ date, total: metros });
    //   this.arrNesting.push({ date, total: nesting });
    //   this.arrHomag.push({ date, total: homag });
    // });
  // },

  methods: {

    loadlotes() {
      const url = `${baseApiUrl}/lotes`;
      axios.get(url).then((res) => {
        this.lotes = res.data.map((lote) => {
          const nesting = lote.id

    //   this.arrNesting.push({ date, total: nesting });
    //   this.arrHomag.push({ date, total: homag });
          console.log(nesting);
          return { value: lote.id, nesting: `${lote.nesting}` , homag: `${lote.homag}` , metros: `${lote.metros}` };
        });
      });
    },

  },

  mounted() {
    this.renderChart(this.chartdata, this.options,this.loadlotes);
    this.loadlotes();
  }

};
</script>

<style>
</style>
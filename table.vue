<template>
  <div class>
    <table>
      <thead>
        <tr>
          <td>Month</td>
          <td class="align_right">Corte</td>
          <td class="align_right">Logística</td>
          <td class="align_right">Filetação</td>
          <td class="align_right">Total</td>
        </tr>
      </thead>
      <tbody>
        <!-- <tr v-for="sale in sales"> -->
          <td>{{ moment(sale.date).format("MMMM YYYY") }}</td>
          <td class="align_right">
            {{
              "$" +
              sale.corte
                .toFixed(0)
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }}
          </td>

          <td class="align_right">
            {{
              "$" +
              sale.logistica
                .toFixed(0)
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }}
          </td>

          <td class="align_right">
            {{
              "$" +
              sale.filetacao
                .toFixed(0)
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }}
          </td>

          <td class="align_right">
            {{
              "$" +
              (sale.corte + sale.filetacao + sale.logistica)
                .toFixed(0)
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }}
          </td>
        <!-- </tr> -->
      </tbody>
    </table>
  </div>
</template>
  
  <script>
import json from "./sales.json";
// import moment from "moment";

export default {
  name: "Table",
  computed: {
    sales() {
      return json.sales;
    },
  },
};
</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
table {
  width: 100%;
  border-collapse: collapse;
  font-size: 15px;
  text-align: left;
  min-width: 580px;
}
td {
  height: 42px;
  border-bottom: 1px solid #eff0f1;
}

td.align_right {
  text-align: right;
}

td.warning {
  color: #ed6860;
  font-weight: 500;
}

tbody tr:last-child td {
  border: none;
}

tbody tr {
  transition: all 0.3s ease;
}
tbody tr:hover {
  background: #fcfcfe;
  color: #333;
}

thead td {
  background: #fff;
  font-size: 12px;
  text-transform: uppercase;
  color: #333;
  font-weight: 600;
  border-bottom: 2px solid #cbcbd1;
  vertical-align: bottom;
  padding-bottom: 8px;
}
</style>
  
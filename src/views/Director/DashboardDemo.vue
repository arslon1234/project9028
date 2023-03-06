<template>
    <section class="dashboard">
      <section class="dashboard_head">
          <div class="dashboard_head-item">
              <h3>Current month profit</h3>
              <p>{{ dashboard.profit }}</p>
          </div>
          <div class="dashboard_head-item">
              <h3>Current month income</h3>
              <p>{{ dashboard.total_income }}</p>
          </div>
          <div class="dashboard_head-item">
              <h3>Current month expence</h3>
              <p>{{ dashboard.total_expense }}</p>
          </div>
      </section>
      <section class="dashboard_charts">
          <BarChart />
      </section>
     
      <section class="dashboard_tops">
          <div class="dashboard_clients">
              <h2>Top clients</h2>
              <app-table :headers="headers" :body="top_clients">
             <template #body_title="{ item }">
             <span class="product__lists-table-text">{{ item.title }}</span>
             </template>
          </app-table>
              <div class="pagination">
             <VPagination
             v-model="params.page"
             :pages="params.last_page"
             :range-size="1"
             active-color="#EAF5FF"
             @update:modelValue="getTopClients"
            />
        </div>
          </div>
          <div class="dashboard_clients">
              <h2>Top products</h2>
              <app-table :headers="headers2" :body="top_products">
                  <template #body_title="{ item }">
             <span class="product__lists-table-text">{{ item.title }}</span>
             </template>
              </app-table>
              <div class="pagination">
             <VPagination
             v-model="params2.page"
             :pages="params2.last_page"
             :range-size="1"
             active-color="#EAF5FF"
             @update:modelValue="getTopProducts"
            />
        </div>
          </div>
      </section>
    </section>
  </template>
  
  <script setup>
  import {ref} from 'vue'
  import http from '@/plugins/axios';
  import VPagination from "@hennge/vue3-pagination";
  import appTable from '@/components/ui/app-table.vue';
  import BarChart from '@/components/layouts/BarChartDemo.vue';
  const dashboard = ref({})
  const top_clients = ref([])
  const top_products = ref([])
  const income_expense = ref([])
  const params = ref({
    page: 1,
    per_page: 10,
    last_page: null,
  });
  const params2 = ref({
    page: 1,
    per_page: 10,
    last_page: null,
  });
  const headers = ref([
    {title: "№", value:"index"},
    {title: "Client name", value:"title"},
    {title: "Phone number", value:"phone_number"},
    {title: "Total sale", value:"total_sales"},
  ])
  const headers2 = ref([
    {title: "№", value:"index"},
    {title: "Product name", value:"title"},
    {title: "Code", value:"code"},
    {title: "Total sale", value:"total_sales"},
  ])
  const getDashboard =()=>{
      http.get('/api/dashboard/monthly-profit/').then(res=>{
          dashboard.value = res.data
      })
  }
  const getTopClients =()=>{
      http.get('./api/dashboard/top-clients/').then(res=>{
          top_clients.value = res.data.results
          top_clients.value.forEach((item, index) => {
              item.index = params.value.page * params.value.per_page -
              (params.value.per_page - 1) +
              index;
              });
              params.value.last_page = Math.ceil(res.data.count / params.value.per_page);
          
      })
  }
  const getTopProducts =()=>{
      http.get('./api/dashboard/top-products/').then(res=>{
          top_products.value = res.data.results
          top_products.value.forEach((item, index) => {
              item.index = params2.value.page * params2.value.per_page -
              (params2.value.per_page - 1) +
              index;
              });
              params2.value.last_page = Math.ceil(res.data.count / params2.value.per_page);
          
      })
  }
  const getAnnualy =()=>{
      http.get('./api/dashboard/annual-profit/').then(res=>{
          income_expense.value = res.data
         
      })
  }
  getAnnualy()
  getTopClients()
  getTopProducts()
  getDashboard()
  </script>
  
  <style scoped lang="scss">
  $blue-color: #435ebe;
  $blue-color2: #57caeb;
  $input_bg: #edf2f7;
  $white-color: #fff;
  $red-color: #ff7976;
  .dashboard{
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      .dashboard_head{
          display: flex;
          gap: 20px;
          align-items: center;
          margin-top: 15px;
          .dashboard_head-item{
              width: 250px;
              height: 100px;
              border-radius: 10px;
              background-color: $blue-color2;
              display: flex;
              align-items: center;
              justify-content: center;
              flex-direction: column;
              color: $white-color;
              p{
                  font-size: 18px;
                  margin-top: 5px;
              }
          }
      }
      .dashboard_charts{
          margin-top: 10px;
          width: 90%;
          overflow-x: scroll;
      }
      .dashboard_tops{
          display: grid;
          grid-template-columns: auto auto;
          .dashboard_clients{
              overflow-x: scroll;
              .product__lists-table-text{
               overflow: hidden;
               text-overflow: ellipsis;
               display: -webkit-box;
               -webkit-line-clamp: 2; 
               -webkit-box-orient: vertical;
               color: #000;
              }
              .pagination{
                  width: 100%;
                  display: flex;
                  justify-content: flex-end;
              }
          }
      }
      @media (max-width:950px) {
          .dashboard_tops{
          display: grid;
          grid-template-columns: auto;
          }
      }
      h2{
          margin: 10px 0px;
      }
  }
  
  </style>
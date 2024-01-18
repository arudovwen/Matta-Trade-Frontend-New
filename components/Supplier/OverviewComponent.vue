<template>
  <div class="gap-y-2 flex flex-col">
    <!-- Top bar   -->
    <div class="p-6 lg:p-8 bg-white rounded-lg bg-img">
      <div class="mb-12"><Breadcrumbs :links="links" /></div>
      <div class="">
        <h1
          class="text-3xl md:text-[48px] md:leading-[56px] text-matta-black col-span-1 font-medium capitalize mb-8"
        >
          Overview
        </h1>

        <ClientOnly>
          <div class="flex justify-start lg:justify-end relative">
            <span class="flex items-center">
              <span
                class="rounded-lg bg-[#F1F3F5] flex gap-x-1 items-center px-3 mr-2 py-1"
              >
                <i class="uil uil-calender"></i>
                <datepicker
                  v-model="startDate"
                  placeholder="Start date"
                  inputFormat="yyyy-MM-dd"
                  class="bg-transparent text-center pt-2 pb-1 max-w-[110px] cursor-pointer outline-gray-200"
                />
                <i class="uil uil-minus"></i>
                <datepicker
                  v-model="endDate"
                  :lowerLimit="startDate || new Date()"
                  :upperLimit="compEndDate"
                  class="bg-transparent text-center pt-2 pb-1 max-w-[110px] cursor-pointer outline-gray-200"
                  placeholder="End date"
                  inputFormat="yyyy-MM-dd"
                />
                <i class="uil uil-angle-down"></i>
              </span>

              <span
                @click="
                  () => {
                    endDate = new Date();
                    startDate = new Date(
                      moment(moment()).subtract(5, 'months')
                    );
                  }
                "
                ><i class="uil uil-refresh"></i
              ></span>
            </span>
          </div>
        </ClientOnly>
      </div>
    </div>

    <div class="bg-[#F1F3F5] p-3 lg:p-8 rounded-lg" v-if="stats">
      <div class="flex flex-col md:grid md:grid-cols-2 gap-2 mb-2">
        <!-- <div class="p-6 rounded-lg bg-white col-span-1">
          <div class="flex justify-between items-center mb-4">
            <span class="text-sm font-normal">Pending orders</span>
            <span class="text-sm text-[#59B221] bg-[#59b22114] p-1 rounded-md"
              >{{ stats.pendingorderPercentage }}%</span
            >
          </div>
          <div class="flex justify-between items-center py-4 gap-x-6">
            <span class="font-medium text-4xl">{{ stats.pendingOrder }}</span>
            <div id="chart">
              <apexchart
                type="line"
                height="100"
                :options="pendingOptions"
                :series="pendingSeries"
              ></apexchart>
            </div>
          </div>
        </div> -->
        <div class="p-6 rounded-lg bg-white col-span-1">
          <div class="flex justify-between items-center mb-4">
            <span class="text-sm font-normal">Confirmed orders</span>
            <span class="text-sm text-[#59B221] bg-[#59b22114] p-1 rounded-md"
              >{{ stats.confirmOrdersPecentage }}%</span
            >
          </div>
          <div class="flex justify-between items-center gap-x-4 py-4">
            <div class="font-medium text-2xl md:text-4xl">
              {{ stats.confirmedOrders }}
            </div>
            <div class="">
              <ClientOnly>
                <apexchart
                  type="line"
                  height="100"
                  width="150"
                  :options="confirmOptions"
                  :series="confirmSeries"
                ></apexchart>
              </ClientOnly>
            </div>
          </div>
        </div>

        <div class="p-6 rounded-lg bg-white col-span-1">
          <div class="flex justify-between items-center mb-4">
            <span class="text-sm font-normal">Product views</span>
            <span class="text-sm text-[#59B221] bg-[#59b22114] p-1 rounded-md"
              >{{ stats.productViewPercentage }}%</span
            >
          </div>
          <div class="flex justify-between items-center py-4 gap-x-4">
            <div class="font-medium text-2xl md:text-4xl">
              {{ stats.productViews }}
            </div>
            <div class="">
              <ClientOnly>
                <apexchart
                  type="line"
                  height="100"
                  width="150"
                  :options="viewOptions"
                  :series="viewSeries"
                ></apexchart>
              </ClientOnly>
            </div>
          </div>
        </div>
        <div class="p-6 rounded-lg bg-white col-span-1">
          <div class="flex justify-between items-center mb-4 gap-x-4">
            <span class="text-sm font-normal">Requested quotes</span>
            <span class="text-sm text-[#59B221] bg-[#59b22114] p-1 rounded-md"
              >0%</span
            >
          </div>
          <div class="flex justify-between items-center py-4">
            <div class="font-medium text-2xl md:text-4xl">
              {{ stats.quotes }}
            </div>
            <ClientOnly class="">
              <apexchart
                type="line"
                height="100"
                width="150"
                :options="quoteOptions"
                :series="quoteSeries"
              ></apexchart>
            </ClientOnly>
          </div>
        </div>
        <div class="p-6 rounded-lg bg-white flex flex-col justify-between">
          <div class="flex justify-between items-center">
            <span class="text-sm font-normal">Current balance</span>
            <div class="text-sm text-[#59B221] bg-[#59b22114] p-1 rounded-md">
              {{ stats.currentBalancePecentage }}%
            </div>
          </div>
          <ClientOnly class="">
            <apexchart
              type="area"
              height="100"
              :options="balanceOptions"
              :series="balanceSeries"
            ></apexchart>
          </ClientOnly>
          <div class="flex justify-between items-center py-4">
            <span class="font-medium text-2xl md:text-4xl">{{
              currencyFormat(stats.currentBalance)
            }}</span>
          </div>
        </div>
      </div>
      <div class="p-6 rounded-lg bg-white mb-8">
        <div class="flex justify-between items-center mb-4">
          <span class="text-sm font-normal">Orders</span>
          <span class="text-sm flex gap-x-6 rounded">
            <span class="flex items-center"
              ><span class="h-2 w-2 mr-2 bg-[#165EF0]"></span> This year</span
            >
            <span class="flex items-center rounded"
              ><span class="h-2 w-2 mr-2 bg-[#B6B7B9]"></span> Last year</span
            >
          </span>
        </div>
        <div class="">
          <div class="flex justify-between">
            <div>
              <span class="block text-lg text-[#475467] font-medium"
                >Total Account Balance</span
              >
              <span class="block text-[30px] font-semibold text-[#101828]">{{
                currencyFormat(0)
              }}</span>
            </div>
            <div class="flex text-sm gap-x-3">
              <button>12 months</button>
              <button>30 days</button>
              <button>7 days</button>
              <button>24 hrs</button>
            </div>
          </div>
          <ClientOnly>
            <apexchart
              type="area"
              height="300"
              :options="chartOptions"
              :series="series"
            ></apexchart
          ></ClientOnly>
        </div>
      </div>

      <div class="px-6 py-8 rounded-lg bg-white">
        <h4 class="font-medium text-base text-matta-black mb-6">
          Trending Products
        </h4>
        <div>
          <div class="overflow-x-auto max-w-[80vw] lg:max-w-full">
            <table class="w-full" v-if="trending.length">
              <thead>
                <tr>
                  <th
                    v-for="item in theads"
                    :key="item"
                    class="uppercase text-[#B6B7B9] text-[13px] text-left font-normal border-b py-4 px-3 border-[#E7EBEE]"
                  >
                    {{ item }}
                  </th>
                  <!-- <th
                  class="uppercase text-[#B6B7B9] text-[13px] text-left font-normal border-b py-4 px-3 border-[#E7EBEE]"
                ></th> -->
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in trending" :key="item.id">
                  <td
                    class="uppercase text-matta-black text-[13px] border-b py-4 px-3 border-[#E7EBEE] whitespace-nowrap"
                  >
                    <div class="flex items-center">
                      <span
                        v-if="item.image"
                        class="mr-3 h-10 w-10 rounded-lg flex items-center justify-center border border-[#E7EBEE] p-2"
                      >
                        <NuxtImg class="" :src="item.image" alt="alt" />
                      </span>
                      <i
                        v-else
                        class="fas fa-image text-[40px] mr-3 text-gray-400"
                      ></i>
                      <span>
                        <span class="text-sm font-medium">
                          {{ item.product }}
                        </span>
                        <br />
                        <span class="text-xs font-normal">
                          {{ item.manufacturer }}
                        </span>
                      </span>
                    </div>
                  </td>
                  <td
                    class="uppercase text-matta-black text-sm font-normal border-b py-4 px-3 border-[#E7EBEE] whitespace-nowrap"
                  >
                    {{ moment(item.created).format("lll") }}
                  </td>
                  <td
                    class="uppercase text-matta-black text-sm font-normal border-b py-4 px-3 border-[#E7EBEE]"
                  >
                    {{ item.views }}
                  </td>

                  <td
                    class="uppercase text-matta-black text-sm font-normal border-b py-4 px-3 border-[#E7EBEE]"
                  >
                    {{ item.orders }}
                  </td>

                  <!-- <td
                  class="uppercase text-matta-black text-sm font-normal border-b py-4 px-3 border-[#E7EBEE]"
                >
                  <i class="uil uil-ellipsis-h"></i>
                </td> -->
                </tr>
              </tbody>
            </table>
          </div>

          <EmptyData
            v-if="!trending.length"
            url="/markets"
            buttonText="go to catalog"
            text="No data available"
          />
        </div>
      </div>
    </div>
    <div class="text-center p-6 lg:p-8 my-24" v-else>
      <AppLoader />
    </div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import Datepicker from "vue3-datepicker";
import VueApexCharts from "vue3-apexcharts";
import {
  getesfrontstats,
  getstorefronttrending,
} from "~/services/settingservices";
import moment from "moment";
import EmptyData from "~/components/EmptyData";
import { getorderchart, getchart } from "~/services/chartservice";

const links = [
  {
    title: "home",
    url: "/",
  },
  {
    title: "storefront",
    url: "/storefront/overview",
  },
];
const startDate = ref(new Date(moment(moment()).subtract(5, "months")));
const endDate = ref(new Date());
const query = reactive({
  StartDate: moment(moment()).subtract(5, "months").format("yyyy-MM-DD"),
  EndDate: moment().format("yyyy-MM-DD"),
  top: 10,
});

const stats = ref(null);
const trending = ref([]);
const thisyear = ref([]);
const thisyearseries = ref([]);
const lastyearseries = ref([]);
const showChart = ref(false);

const viewmonth = ref([]);
const viewseries = ref([]);
const quotemonth = ref([]);
const quoteseries = ref([]);
const balancemonth = ref([]);
const balanceseries = ref([]);
const confirmmonth = ref([]);
const confirmseries = ref([]);
// const pendingmonth = ref(["Sep", "Oct", "Nov"]);
// const pendingseries = ref([0, 0, 0]);
onMounted(() => {
  getesfrontstats(query).then((res) => {
    stats.value = res.data.data;
  });
  getstorefronttrending(query).then((res) => {
    trending.value = res.data.data.slice(0, 9);
  });
  getAllCharts();
});

function getAllCharts() {
  getorderchart({
    StartDate: moment(startDate.value).format("yyyy-MM-DD"),
    EndDate: moment(endDate.value).format("yyyy-MM-DD"),
  }).then((res) => {
    if (res.status === 200) {
      thisyear.value = res.data.data.data[0]?.chartrecords.map(
        (item) => item.month
      );
      thisyearseries.value = res.data.data.data[1]?.chartrecords.map(
        (item) => item.total
      );

      lastyearseries.value = res.data.data.data[0].chartrecords.map(
        (item) => item.total
      );

      showChart.value = true;
    }
  });
  getchart({
    StartDate: moment(startDate.value).format("yyyy-MM-DD"),
    EndDate: moment(endDate.value).format("yyyy-MM-DD"),
  }).then((res) => {
    if (res.status === 200) {
      viewmonth.value = res.data.data.viewTrends.data[0].chartrecords.map(
        (item) => item.month
      );

      viewseries.value = res.data.data.viewTrends.data[0].chartrecords.map(
        (item) => item.total
      );
      quotemonth.value = res.data.data.quoteTrend.data[0].chartrecords.map(
        (item) => item.month
      );
      quoteseries.value = res.data.data.quoteTrend.data[0].chartrecords.map(
        (item) => item.total
      );
      balancemonth.value =
        res.data.data.orderTotalTrend.data[0].chartrecords.map(
          (item) => item.month
        );
      balanceseries.value =
        res.data.data.orderTotalTrend.data[0].chartrecords.map(
          (item) => item.total
        );
      confirmmonth.value = res.data.data.orderTrend.data[0].chartrecords.map(
        (item) => item.month
      );
      confirmseries.value = res.data.data.orderTrend.data[0].chartrecords.map(
        (item) => item.total
      );
    }
  });
}
const apexchart = VueApexCharts;
const route = useRoute();

const series = computed(() => {
  return [
    {
      name: "This year",
      data: thisyearseries.value,
    },
    {
      name: "Last year",
      data: lastyearseries.value,
    },
  ];
});

const chartOptions = computed(() => {
  return {
    colors: ["#165EF0", "#B6B7B9"],
    yaxis: {
      show: false,
    },
    legend: {
      show: false,
    },
    chart: {
      toolbar: {
        show: false,
      },
    },
    grid: {
      show: false,
    },

    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 1,
    },
    xaxis: {
      categories: thisyear.value,
    },
    tooltip: {
      y: {
        format: "MM dd",
        formatter: (value) => currencyFormat(value),
      },
    },
  };
});
const viewOptions = computed(() => {
  return {
    colors: ["#165EF0"],
    yaxis: {
      show: false,
    },
    legend: {
      show: false,
    },
    toolbar: {
      show: false,
    },
    grid: {
      show: false,
    },

    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 1,
    },
    chart: {
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      categories: viewmonth.value,
      labels: {
        show: false,
      },
      axisBorder: { show: false },
    },
  };
});
const viewSeries = computed(() => {
  return [
    {
      name: "Total",
      data: viewseries.value,
    },
  ];
});
const quoteOptions = computed(() => {
  return {
    colors: ["#165EF0"],
    yaxis: {
      show: false,
    },
    legend: {
      show: false,
    },
    toolbar: {
      show: false,
    },
    grid: {
      show: false,
    },

    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 1,
    },
    chart: {
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      categories: quotemonth.value,
      labels: {
        show: false,
      },
      axisBorder: { show: false },
    },
  };
});
const quoteSeries = computed(() => {
  return [
    {
      name: "Total",
      data: quoteseries.value,
    },
  ];
});
const balanceOptions = computed(() => {
  return {
    colors: ["#165EF0"],
    yaxis: {
      show: false,
    },
    legend: {
      show: false,
    },
    toolbar: {
      show: false,
    },
    grid: {
      show: false,
    },

    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 1,
    },
    chart: {
      toolbar: {
        show: false,
      },
    },
    tooltip: {
      y: {
        format: "MM dd",
        formatter: (value) => currencyFormat(value),
      },
    },
    xaxis: {
      categories: balancemonth.value,
      labels: {
        show: false,
      },
      axisBorder: { show: false },
    },
  };
});

const balanceSeries = computed(() => {
  return [
    {
      name: "Total",
      data: balanceseries.value,
    },
  ];
});
const confirmOptions = computed(() => {
  return {
    colors: ["#165EF0"],
    yaxis: {
      show: false,
    },
    legend: {
      show: false,
    },
    toolbar: {
      show: false,
    },
    grid: {
      show: false,
    },

    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 1,
    },
    chart: {
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      categories: confirmmonth.value,
      labels: {
        show: false,
      },
      axisBorder: { show: false },
    },
  };
});
const confirmSeries = computed(() => {
  return [
    {
      name: "Total",
      data: confirmseries.value,
    },
  ];
});
// const pendingOptions = computed(() => {
//   return {
//     colors: ["#165EF0"],
//     yaxis: {
//       show: false,
//     },
//     legend: {
//       show: false,
//     },
//     toolbar: {
//       show: false,
//     },
//     grid: {
//       show: false,
//     },

//     dataLabels: {
//       enabled: false,
//     },
//     stroke: {
//       curve: "smooth",
//       width: 1,
//     },
//     chart: {
//       toolbar: {
//         show: false,
//       },
//     },
//     xaxis: {
//       categories: pendingmonth.value,
//       labels: {
//         show: false,
//       },
//       axisBorder: { show: false },
//     },
//   };
// });
// const pendingSeries = computed(() => {
//   return [
//     {
//       name: "Total",
//       data: pendingseries.value,
//     },
//   ];
// });

defineProps(["title"]);
const theads = ["product", "created", "views", "orders"];

watch(
  () => [startDate.value],
  () => {
    endDate.value = null;
  }
);
watch(
  () => [startDate.value, endDate.value],
  () => {
    if (startDate.value && endDate.value) {
      query.StartDate = moment(startDate.value).format("yyyy-MM-DD");
      query.EndDate = moment(endDate.value).format("yyyy-MM-DD");
      getesfrontstats(query).then((res) => {
        stats.value = res.data.data;
      });
      getstorefronttrending(query).then((res) => {
        trending.value = res.data.data.slice(0, 9);
      });
      getAllCharts();
    }
  }
);

const compEndDate = computed(() => {
  return new Date(moment(moment(startDate.value)).add(5, "months"));
});
// const compStartDate = computed(() => {
//   return moment(moment(startDate.value)).subtract(5, "months");
// });
</script>

<style lang="scss" scoped>
.bg-img {
  background-image: url("~/assets/img/bee.svg");
  background-repeat: no-repeat;
  background-position-x: center;
  background-position-y: bottom;
}
</style>

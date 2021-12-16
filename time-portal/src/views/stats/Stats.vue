<template>
  <div id="dashboard-analytics">
    <div class="vx-row">
      <div class="vx-col w-full lg:w-1/2 mb-base">
        <vx-card slot="no-body" class="text-center bg-primary-gradient greet-user">
          <img
            src="../../assets/images/elements/decore-left.png"
            class="decore-left"
            alt="Decore Left"
            width="200"
          />
          <img
            src="../../assets/images/elements/decore-right.png"
            class="decore-right"
            alt="Decore Right"
            width="175"
          />
          <feather-icon
            icon="AwardIcon"
            class="p-6 mb-8 bg-primary inline-flex rounded-full text-white shadow"
            svgClasses="h-8 w-8"
          ></feather-icon>
          <h1 class="mb-6 text-white">Congratulations John,</h1>
          <p class="xl:w-3/4 lg:w-4/5 md:w-2/3 w-4/5 mx-auto text-white">
            You have done
            <strong>57.6%</strong> more sales today. Check your new badge in
            your profile.
          </p>
        </vx-card>
      </div>
      <!-- CARD 2: SUBSCRIBERS GAINED -->
      <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4 mb-base">
        <statistics-card-line
          icon="UsersIcon"
          statistic="92.6k"
          statisticTitle="Subscribers Gained"
          :chartData="analyticsData.subscribersGained"
          type="area"
        ></statistics-card-line>
      </div>

      <!-- CARD 3: ORDER RECIEVED -->
      <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4 mb-base">
        <statistics-card-line
          icon="ShoppingBagIcon"
          statistic="97.5K"
          statisticTitle="Orders Received"
          :chartData="analyticsData.ordersRecevied"
          color="warning"
          type="area"
        ></statistics-card-line>
      </div>
    </div>

    <div class="vx-row">
      <!-- CARD 6: Product Orders -->
      <div class="vx-col w-full lg:w-1/3 mb-base">
        <vx-card title="Product Orders">
          <!-- CARD ACTION -->
          <template slot="actions">
            <change-time-duration-dropdown />
          </template>

          <div slot="no-body">
            <vue-apex-charts
              type="radialBar"
              height="300"
              :options="analyticsData.productOrdersRadialBar.chartOptions"
              :series="analyticsData.productOrdersRadialBar.series"
            />
          </div>

          <ul>
            <li
              v-for="orderData in analyticsData.productOrdersRadialBar
                .analyticsData"
              :key="orderData.orderType"
              class="flex mb-3 justify-between"
            >
              <span class="flex items-center">
                <span
                  class="inline-block h-4 w-4 rounded-full mr-2 bg-white border-3 border-solid"
                  :class="`border-${orderData.color}`"
                ></span>
                <span class="font-semibold">{{ orderData.orderType }}</span>
              </span>
              <span>{{ orderData.counts }}</span>
            </li>
            <!-- <li><span class="inline-block h-2 w-2 rounded-full mr-2 bg-primary"></span>Finished - 23,043</li> -->
          </ul>
        </vx-card>
      </div>
      <div class="vx-col w-full md:w-2/3">
        <vx-card title="Client Retention">
          <div class="flex">
            <span class="flex items-center">
              <div class="h-3 w-3 rounded-full mr-1 bg-warning"></div>
              <span>New Clients</span>
            </span>
            <span class="flex items-center ml-4">
              <div class="h-3 w-3 rounded-full mr-1 bg-danger"></div>
              <span>Retained Clients</span>
            </span>
          </div>
          <vue-apex-charts
            type="bar"
            height="368"
            :options="analyticsData.clientRetentionBar.chartOptions"
            :series="analyticsData.clientRetentionBar.series"
          />
        </vx-card>
      </div>
    </div>
    <div>
      <vx-card title="Done">
        <div slot="no-body" class="p-6 pb-0">
          <div class="flex">
            <div class="mr-6">
              <p class="mb-1 font-semibold">This Month</p>
              <p class="text-3xl text-success">86,589</p>
            </div>
            <div>
              <p class="mb-1 font-semibold">Last Month</p>
              <p class="text-3xl">73,683</p>
            </div>
          </div>
          <vue-apex-charts
            type="line"
            height="266"
            :options="analyticsData.revenueComparisonLine.chartOptions"
            :series="analyticsData.revenueComparisonLine.series"
          />
        </div>
      </vx-card>
    </div>
  </div>
</template>

<script>
import VueApexCharts from "vue-apexcharts";
import StatisticsCardLine from "@/components/statistics-cards/StatisticsCardLine.vue";
import analyticsData from "./analyticsData.js";
import ChangeTimeDurationDropdown from "@/components/ChangeTimeDurationDropdown.vue";

export default {
  components: {
    StatisticsCardLine,
    VueApexCharts,
    ChangeTimeDurationDropdown
  },
  data() {
    return {
      analyticsData: analyticsData
    };
  }
};
</script>

<style lang="scss">
#dashboard-analytics {
  .greet-user {
    position: relative;
    .decore-left {
      position: absolute;
      left: 0;
      top: 0;
    }
    .decore-right {
      position: absolute;
      right: 0;
      top: 0;
    }
  }

  @media (max-width: 576px) {
    .decore-left,
    .decore-right {
      width: 140px;
    }
  }
}
</style>

<template>
  <section class="flex flex-col gap-y-8" v-if="order">
    <div class="grid grid-cols-2 gap-y-10 gap-x-4 mb-8">
      <div>
        <p class="text-[12px] text-[#B6B7B9] mb-2 uppercase">STATUS</p>
        <span
          v-if="order.statusText == 'invoiced'"
          class="px-2 py-1 text-xs rounded-lg bg-[#E0F7B0]"
        >
          Completed</span
        >
        <!-- <span
          v-if="order.statusText == 'OrderProcessed'"
          class="px-2 py-1 text-xs rounded-lg bg-[#E0F7B0]"
        >
          Processed</span
        >
        <span
          v-if="order.statusText == 'draft'"
          class="px-2 py-1 text-xs rounded-lg bg-gray-100"
        >
          Draft</span
        > -->
        <span
          v-if="order.statusText !== 'invoiced'"
          class="px-2 py-1 text-xs rounded-lg bg-[#FDD0AF]"
        >
          In progress</span
        >
      </div>
      <div>
        <p class="text-[12px] text-[#B6B7B9] mb-2 uppercase">created</p>
        <span class="text-sm">{{ moment(order.orderDate).format("ll") }}</span>
      </div>
      <div>
        <p class="text-[12px] text-[#B6B7B9] mb-2 uppercase">
          scheduled pickup date
        </p>
        <span class="text-sm">{{
          moment(order.schedulePickupDate || "").format("ll")
        }}</span>
      </div>
      <div>
        <p class="text-[12px] text-[#B6B7B9] mb-2 uppercase">
          scheduled delivery date
        </p>
        <span class="text-sm">{{
          moment(order.scheduleDeliveryDate).format("ll")
        }}</span>
      </div>
    </div>

    <div class="bg-[#F1F3F5] rounded-lg p-6 text-matta-black">
      <div class="flex justify-between mb-6">
        <h3 class="text-lg font-medium">Order Summary</h3>
        <!-- <span><i class="uil uil-minus text-lg"></i></span> -->
      </div>

      <div v-for="(item, id) in order.orderDetails" :key="id">
        <div class="flex justify-between items-end gap-x-2 mb-1">
          <div class="text-matta-black pt-1 flex items-end text-sm">
            <span>
              <span class="text-sm font-medium text-matta-black">{{
                item.product
              }}</span>
              <br />
              <span class="text-xs flex gap-x-3"
                ><span>{{ item.selectedPackage }}</span>
                <span>x{{ item.quantity }}</span></span
              >
            </span>
          </div>
          <span class="text-right">{{ currencyFormat(item.itemTotal) }}</span>
        </div>
        <div
          class="flex justify-between items-end gap-x-2 border-b pb-6 border-[#ddd] mb-4"
        >
          <div class="text-matta-black pt-1 flex items-end text-sm">
            <span class="flex gap-x-2">
              <span class="text-xs">With Tax</span>

              <!-- <span class="text-xs"
                ><span>{{ item.taxPercentage }}%</span>
              </span> -->
            </span>
          </div>
          <span class="text-right">{{
            currencyFormat(item.itemTotal_with_tax)
          }}</span>
        </div>
      </div>
      <div class="flex justify-between gap-x-2">
        <div class="text-matta-black text-sm">Item total</div>
        <div class="text-right py-1">
          {{ currencyFormat(order.orderTotal) }}
        </div>
      </div>
      <div class="flex justify-between gap-x-2">
        <div class="text-sm">Tax <span class="text-xs">(7.5%)</span></div>
        <div class="text-right py-1">
          {{ currencyFormat(order.orderTotalwithTax - order.orderTotal) }}
        </div>
      </div>
      <div class="flex justify-between gap-x-2 border-b border-[#ddd] mb-6">
        <div class="text-matta-black pt-1 pb-6 flex items-center text-sm">
          Shipping & handling <i class="uil uil-info-circle text-sm ml-1"></i>
        </div>
        <div class="text-right pt-1 pb-6">TBD</div>
      </div>

      <div class="flex justify-between gap-x-2 mb-6">
        <div class="text-matta-black text-sm">Total</div>
        <div class="text-xl text-right font-medium">
          {{ currencyFormat(order.orderTotalwithTax) }}
        </div>
      </div>
    </div>
    <div class="bg-[#F1F3F5] rounded-lg p-6 text-matta-black max-w-[355px]">
      <div class="flex justify-between mb-6">
        <h3 class="text-lg font-medium">Timeline</h3>
        <span><i class="uil uil-minusext-lg"></i></span>
      </div>

      <ul class="grid grid-cols-1 gap-4">
        <li v-for="(item, id) in timeline" :key="id" class="group">
          <div class="py-4 items-center hidden group-last:flex">
            <span class="bg-matta-black h-[2px] rounded-l flex-1"></span>
            <span class="h-4 w-4 rounded-full bg-matta-black"></span>
          </div>
          <div
            class="flex justify-start items-center gap-x-2 opacity-50 group-last:opacity-100"
          >
            <span
              class="group-last:bg-primary-500 group-last:text-white w-[46px] h-[46px] rounded-full flex items-center justify-center text-matta-black bg-transparent hover:text-white hover:bg-matta-black border border-[#ddd] shadow-sm"
            >
              <i class="uil uil-check"></i>
            </span>
            <!-- <span
          :class="
            stage > 2
              ? ''
              : stage == 2
              ? ' bg-primary-500 text-white'
              : stage < 2
              ? 'bg-white text-matta-black'
              : ''
          "
          class="w-[46px] h-[46px] rounded-full flex items-center justify-center text-matta-black bg-transparent hover:text-white hover:bg-matta-black border border-[#ddd] shadow-sm"
        >
          <i class="uil uil-map-marker"></i>
        </span> -->
            <!-- <span
          :class="
            stage > 3
              ? ''
              : stage == 3
              ? ' bg-primary-500 text-white'
              : stage < 3
              ? 'bg-white text-matta-black'
              : ''
          "
          class="w-[46px] h-[46px] rounded-full flex items-center justify-center text-matta-black bg-transparent hover:text-white hover:bg-matta-black border border-[#ddd] shadow-sm"
        >
          <i class="uil uil-dollar-alt"></i>
        </span> -->
            <!-- <span
          :class="
            stage > 4
              ? ''
              : stage == 4
              ? ' bg-primary-500 text-white'
              : stage < 4
              ? 'bg-white text-matta-black'
              : ''
          "
          class="w-[46px] h-[46px] rounded-full flex items-center justify-center text-matta-black bg-transparent hover:text-white hover:bg-matta-black border border-[#ddd] shadow-sm"
        >
          <i class="uil uil-refresh"></i>
        </span> -->
            <span>
              <span class="text-xs text-[#ABABAB]"
                >{{ moment(item.activityDate).format("ll") }},
                {{ item.activityTime }}</span
              >
              <br />
              <span class="text-xs"
                ><span>{{ item.description }}</span></span
              >
            </span>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>
<script setup>
import moment from "moment";


defineProps(["order", "timeline"]);
</script>
<style scoped>
input[type="range" i]:disabled {
  background-color: #2c2c2c !important;
  color: rgb(197, 197, 197);
}
</style>

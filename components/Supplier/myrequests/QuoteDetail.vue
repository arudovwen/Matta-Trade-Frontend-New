<template>
  <div>
    <div class="mb-8">
      <h3 class="font-medium text-xl text-gray-700 capitalize">
        Request for quote
      </h3>
      <p class="font-normal text-base capitalize">
        {{ quote.buyerBusinessName }}
      </p>
    </div>

    <div class="mb-8">
      <p class="font-medium text-lg">
        <span class="text-gray-500">Product name :</span>
        {{ quote.productName }}
      </p>
      <!-- <p class="font-medium text-base mb-4 flex items-center gap-x-2">
        <span class="text-gray-500">Supplier :</span> {{ quote.sellerName }}
      </p> -->
      <div class="grid grid-cols-2">
        <div>
          <p class="font-nomrmal text-sm text-gray-500">Market</p>
          <p class="font-medium text-sm">{{ quote.market }}</p>
        </div>
        <div>
          <p class="font-nomrmal text-sm text-gray-500">Application</p>
          <p class="font-medium text-sm">{{ quote.applications }}</p>
        </div>
      </div>

      <hr class="my-4" />

      <div class="mb-8">
        <h4 class="font-medium text-lg mb-4 text-gray-700">
          Status of request
        </h4>
        <div class="flex items-start gap-x-3">
          <i
            v-if="quote.status == 0"
            class="fa fa-clock-o text-lg text-yellow-500 w-5"
          ></i>
          <i
            v-if="quote.status == 1"
            class="fa fa-clock-o text-lg text-blue-500 w-5"
          ></i>
          <i
            v-if="quote.status == 2"
            class="fa fa-clock-o text-lg text-green-500 w-5"
          ></i>

          <div>
            <div class="flex text-xl items-center font-medium gap-x-2">
              <p class="">Status</p>
              :
              <span v-if="quote.status == 0" class="text-yellow-500"
                >Pending response</span
              >
              <span v-if="quote.status == 1" class="text-blue-500">Viewed</span>
              <span v-if="quote.status == 2" class="text-green-500"
                >Responsed</span
              >
            </div>
            <p
              v-if="quote.status == 0"
              class="text-base font-medium text-gray-500"
            >
              Your request for quote is under review by Matta
            </p>
            <p
              v-if="quote.status == 1"
              class="text-base font-medium text-gray-500"
            >
              Your request for quote has been viewed by Matta
            </p>
            <p
              v-if="quote.status == 2"
              class="text-base font-medium text-gray-500"
            >
              Your request for quote has been sent by Matta
            </p>
          </div>
        </div>
      </div>
      <hr class="my-4" />
      <div class="mb-6">
        <h4 class="font-medium text-lg mb-4 text-gray-700">Requested terms</h4>
        <div class="flex items-start mb-3 gap-x-3">
          <i
            class="fa fa-hand-o-up text-lg text-gray-500 w-5"
            aria-hidden="true"
          ></i>
          <div>
            <p class="text-base font-medium">
              Estimated {{ quote.expectedVolume }} {{ quote.unit }}(s) total
              annual volume
            </p>
            <p class="text-sm font-normal text-gray-500">
              Use: {{ quote.productUse }}
            </p>
          </div>
        </div>
        <div class="flex items-start gap-x-3">
          <i class="fas fa-truck text-lg text-gray-500 w-5"></i>
          <div class="text-base">
            <p class="text-sm font-medium mb-1">Your pick up</p>
            <p class="text-sm font-normal flex gap-x-2 items-center">
              <span>Address : </span><span>{{ quote.deliverAddress }}</span>
            </p>
          </div>
        </div>
      </div>

      <hr class="my-4" />
      <div>
        <h4 class="text-base font-medium mb-4 text-gray-700">
          Order preference
        </h4>
        <div class="flex items-start gap-x-3 mb-3">
          <i class="fas fa-clipboard-list text-lg text-gray-500 w-5"></i>
          <div>
            <p class="text-sm flex font-medium items-center gap-x-2">
              <span class="text-gray-500 text-lg">Special instruction:</span>
              <span> {{ quote.additionalInformation }}</span>
            </p>
          </div>
        </div>
        <div class="flex items-start gap-x-3 mb-3">
          <i
            class="fa fa-user text-lg text-gray-500 w-5"
            aria-hidden="true"
          ></i>
          <div>
            <p class="text-sm font-medium mb-2 text-gray-700">Requested by</p>
            <p class="text-sm mb-1">
              {{ quote.requestedBy }}
            </p>
            <p class="text-sm font-normal">{{ quote.contactPhone }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { inject } from "vue";

const quote = inject("quote");
</script>

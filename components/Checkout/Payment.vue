<template>
  <div class="bg-white rounded-[10px]">
    <h2 class="px-[30px] py-5 font-bold text-2xl border-b border-[#f3f3f3]">
      Payment Method
    </h2>
    <div class="p-[30px]">
      <div class="flex flex-wrap gap-y-6 md:gap-y-0 gap-x-6">
        <button
          v-for="n in data"
          :key="n.title"
          @click="active = n.key"
          :disabled="n.key !== 'card'"
          :class="`${
            active === n.key
              ? 'bg-[rgba(22,94,240,0.12)] border-[#165EF066]'
              : 'border-[#E7E7E780]'
          } ${
            n.key === 'card' ? '' : 'opacity-50 cursor-not-allowed'
          } shadow-[0px_0px _4px_0px_rgba(0,0,0,0.11)] min-w-[180px] w-full md:max-w-[180px] rounded-[10px] py-6 px-[16px] flex flex-col justify-center items-center border-2`"
        >
          <AppIcon class="text-4xl mb-2" :icon="n.icon" />
          <p class="text-xs">{{ n.title }}</p>
        </button>
      </div>
    </div>
  </div>
</template>
<script setup>
const active = ref("card");
const data = [
  {
    title: "Card / Bank Transfer",
    icon: "uil:credit-card",
    key: "card",
    url: "",
  },
  {
    title: "Matta Wallet",
    icon: "ion:wallet-outline",
    url: "",
    key: "matta",
  },
  {
    title: "Pay with Trade Finance",
    icon: "teenyicons:credit-card-outline",
    url: "",
    key: "finance",
  },
];
</script>

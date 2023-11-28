<template>
  <div class="bg-white rounded-[10px]">
    <div
      class="px-5 pt-5 flex gap-x-[30px] items-center border-b border-[#f3f3f3]"
    >
      <button
        v-for="n in tabs"
        @click="() => (active = n.key)"
        :key="n.key"
        :class="`${
          active === n.key
            ? 'text-[#165EF0] border-[#165EF0]'
            : 'border-transparent'
        } text-xs pb-[19px] border-b-2 block`"
      >
        {{ n.title }}
      </button>
    </div>
    <div class="p-5 max-w-[700px]">
        <ProductInfoCompliance v-if="active === 'compliance'" />
        <ProductInfoDocuments v-if="active === 'documents'"  />
        <ProductInfoProperties v-if="active === 'properties'"  />
        <ProductInfoTechnical v-if="active === 'technical'"  />
    </div>
  </div>
</template>
<script setup>
const tabs = [
  {
    title: "Technical details & test data",
    key: "technical",
  },
  {
    title: "Properties",
    key: "properties",
  },
  {
    title: "Regulatory & Compliance",
    key: "compliance",
  },
  {
    title: "Documents",
    key: "documents",
  },
//   {
//     title: "Table",
//     key: "table",
//   },
];

const active = ref("technical");
</script>

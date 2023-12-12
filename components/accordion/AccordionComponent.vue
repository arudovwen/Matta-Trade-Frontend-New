<template>
  <div class="accordion">
    <div
      v-for="(item, index) in items"
      :key="index"
      class="border rounded-lg overflow-hidden mb-2"
    >
      <div
        @click="toggleAccordion(index)"
        class="w-full flex justify-between items-start text-left py-3 r bg-gray-50 gap-x-6"
      >
        <p class="leading-normal px-2 font-medium">{{ item.title }}</p>

        <i
          :class="`uil text-xl ${
            isOpen(index) ? 'uil-angle-up' : 'uil-angle-down'
          }`"
        ></i>
      </div>
      <div
        v-if="isOpen(index)"
        class="px-2 py-3 text-left bg-white font-normal"
      >
        <slot :item="item"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    items: Array,
  },
  data() {
    return {
      openItem: null,
    };
  },
  methods: {
    toggleAccordion(index) {
      if (this.isOpen(index)) {
        this.openItem = null;
      } else {
        this.openItem = index;
      }
    },
    isOpen(index) {
      return this.openItem === index;
    },
  },
};
</script>

<style scoped>
/* Add Tailwind CSS classes here as needed */
</style>

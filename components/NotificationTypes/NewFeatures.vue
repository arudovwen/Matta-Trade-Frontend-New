<template>
  <div
    class="grid grid-cols-1 max-h-[70vh] overflow-y-auto"
    v-if="!Notifications.length"
  >
    <div class="" v-for="(notification, i) in Notifications" :key="i">
      <h5 class="text-xs text-[#666] py-2 bg-[#F4F5F6] px-3 uppercase">
        {{ notification.date }}
      </h5>
      <div
        class="bg-white py-3 border-t border-[#F4F5F6]"
        v-for="(n, v) in notification.content"
        :key="v"
      >
        <Feature
          v-if="n.type === 'feature'"
          :url="n.url"
          :text="n.text"
          :time="n.time"
        />
      </div>
    </div>
  </div>
  <div class="text-center py-8 px-2 h-[60vh] flex justify-center" v-else>
    <span class="mt-24">
      <div class="h-16 w-16 rounded-lg bg-green-200 mb-3 mx-auto"></div>
      <p class="text-xs text-[#333]">Nothing to see here.</p>
    </span>
  </div>
</template>
<script setup>
import Feature from "./FeatureType.vue";

const Notifications = [
  {
    date: "Today",
    content: [
      {
        type: "feature",
        time: "30m ago",
        text: "You have an overdue payment for EF-300",
        url: "",
      },
      {
        type: "feature",
        time: "3hrs ago",
        text: "The deal slip for request EF-307 is pending review.",
        url: "",
      },
    ],
  },
];
</script>

import { defineStore } from "pinia";

export const useApplicationStore = defineStore("applications", () => {
  const applications = ref([]);

  const applicationsdata = computed(() => applications.value);

  function setApplications(data) {
    applications.value = data;
  }

  return { applications, applicationsdata, setApplications };
});

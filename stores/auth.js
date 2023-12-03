import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", () => {
  const loggedUser = ref(JSON.parse(localStorage.getItem("userInfo")));

  const isLoggedIn = computed(() => (loggedUser.value ? true : false));
  const refresh_token = computed(() => loggedUser.value.jwToken);
  const access_token = computed(() => loggedUser.value.jwToken);
  const roles = computed(() => loggedUser.value.roles);
  const userId = computed(() => loggedUser.value.userId);
  const userType = computed(() => loggedUser.value.businessUserType);
  const userInfo = computed(() => loggedUser.value);

  return {
    isLoggedIn,
    refresh_token,
    access_token,
    roles,
    userId,
    userType,
    userInfo,
  };
});

import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", () => {
  const loggedUser = ref(JSON.parse(localStorage.getItem("userInfo")));

  const isLoggedIn = computed(() => !!loggedUser.value);
  const refresh_token = computed(() => loggedUser.value?.jwToken);
  const access_token = computed(() => loggedUser.value?.jwToken);
  const roles = computed(() => loggedUser.value?.roles);
  const userId = computed(() => loggedUser.value?.userId);
  const userType = computed(() => loggedUser.value?.businessUserType);
  const userInfo = computed(() => loggedUser.value);

  function setAccessToken(value) {
    let userInfo = { ...loggedUser.value, access_token: value };
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
  }
  function setRefreshToken(value) {
    let userInfo = { ...loggedUser.value, refresh_token: value };
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
  }
  function updateUser(value) {
    let userInfo = { ...loggedUser.value, fullName: value };

    localStorage.setItem("userInfo", JSON.stringify(userInfo));
  }
  return {
    updateUser,
    isLoggedIn,
    refresh_token,
    access_token,
    roles,
    userId,
    userType,
    userInfo,
    setRefreshToken,
    setAccessToken,
  };
});

import { defineStore } from "pinia";

export const useAuthStore = defineStore(
  "auth",
  () => {
    const cookie = useCookie("auth");
    const loggedUser = ref("");

    const isLoggedIn = computed(() => !!cookie.value?.loggedUser);
    const refresh_token = computed(() => cookie.value?.loggedUser?.jwToken);
    const access_token = computed(() => cookie.value?.loggedUser?.jwToken);
    const roles = computed(() => cookie.value?.loggedUser?.roles);
    const userId = computed(() => cookie.value?.loggedUser?.id);
    const userType = computed(() => cookie.value?.loggedUser?.businessUserType);
    const userInfo = computed(() => cookie.value?.loggedUser);

    function setLoggedUser(data) {
      loggedUser.value = data;
    }

    function setAccessToken(value) {
      let userInfo = { ...cookie.value?.loggedUser, access_token: value };
      setLoggedUser(userInfo);
    }
    function setRefreshToken(value) {
      let userInfo = { ...cookie.value?.loggedUser, refresh_token: value };
      setLoggedUser(userInfo);
    }
    function updateUser(value) {
      let userInfo = { ...cookie.value?.loggedUser, fullName: value };
      setLoggedUser(userInfo);
    }
    function updateAccountType(value) {
      let userInfo = { ...cookie.value?.loggedUser, accountType: value };

      setLoggedUser(userInfo);
    }
    function updateUserInfo(data) {
      let userInfo = { ...cookie.value?.loggedUser, ...data };
      setLoggedUser(userInfo);
    }

    const logOut = () => {
      cookie.value = "";
      window.location.href = "/";
    };
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
      updateAccountType,
      updateUserInfo,
      setLoggedUser,
      logOut,
      loggedUser,
    };
  },
  {
    persist: {
      storage: persistedState.cookiesWithOptions({
        sameSite: "strict",
      }),
    },
  }
);

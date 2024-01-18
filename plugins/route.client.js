function getClientAppVersion() {
  return localStorage.getItem("APP_VERSION") ?? 0;
}

function setClientAppVersion(version) {
  return localStorage.setItem("APP_VERSION", version);
}

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.$router.afterEach((to, from) => {
    fetch("/version.json").then((serverPromise) =>
      serverPromise.json().then((response) => {
        const latestVersion = response.version;
        const clientStoredVersion = getClientAppVersion();

        if (clientStoredVersion != latestVersion) {
          window.location.reload(true);
          setClientAppVersion(latestVersion);
        } else return;
      })
    );
  });
});

import { defineStore } from "pinia";
import { getalladdress } from "~/services/cartservice";
export const useShippingStore = defineStore("shipping", () => {
  const addresses = ref([]);

  const addressesData = computed(() => addresses.value);
  const defaultAddress = computed(() =>
    addresses.value.find((i) => i.isDefault)
  );

  function setAddresses(data) {
    addresses.value = data;
  }
  function getAllAddress() {
    getalladdress().then((res) => {
      addresses.value = res.data.data;
    });
  }
  function deleteAddress(id) {
    getalladdress(id).then((res) => {
      getAllAddress();
    });
  }
  return {
    addressesData,
    addresses,
    setAddresses,
    defaultAddress,
    getAllAddress,
  };
});

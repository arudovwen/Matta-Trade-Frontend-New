<template>
  <div class="gap-y-2 flex flex-col">
    <!-- Top bar   -->
    <div class="p-6 lg:p-8 bg-white rounded-lg bg-img">
      <div class="mb-12"><Breadcrumbs /></div>
      <div class="">
        <div class="flex gap-x-3 items-center mb-3">
          <h1
            class="text-3xl lg:text-[48px] text-matta-black col-span-1 font-medium capitalize"
          >
            Users management
          </h1>
          <span class="mt-3">/</span>
          <span class="text-primary text-3xl lg:text-[48px]">{{
            queryParams.totalCount
          }}</span>
        </div>

        <p class="text-sm lg:text-base">
          Invite new or edit existing users within your business along with
          assigning each a specific role.
        </p>
      </div>
    </div>

    <div class="p-6 lg:p-8 rounded-lg bg-white">
      <div class="flex justify-between items-center mb-8">
        <div class="flex gap-x-4">
          <div class="relative flex items-center">
            <input
              v-model="queryParams.Search"
              @change="getAllInvites()"
              @keyup="debounceSearch"
              :class="
                queryParams.Search.length && 'pl-3 pr-10 rounded-lg w-[280px]'
              "
              class="border focus:pl-3 focus:pr-10 rounded-full focus:rounded-lg h-12 peer focus:w-[280px] focus:outline-matta-black/20 w-12 border-[#E7EBEE] transition ease-in-out duration-300"
              type="search"
            />
            <span
              class="absolute right-4 peer-focus:right-3 pointer-events-none"
              ><i class="uil uil-search"></i
            ></span>
          </div>
          <div class="flex relative items-center">
            <select
              v-model="queryParams.Role"
              @change="getAllInvites()"
              class="appearance-none border border-[#E7EBEE] rounded-full px-8 py-3"
            >
              <option value="">Role</option>
              <option v-for="role in roles" :key="role" :value="role">
                {{
                  role == "CompanyAdmin"
                    ? "Company admin"
                    : role == "CompanyUser"
                    ? "Company user"
                    : "Buyer"
                }}
              </option>
            </select>
            <i
              class="uil uil-angle-down absolute right-2 pointer-events-none"
            ></i>
          </div>
          <div class="flex relative items-center">
            <select
              v-model="queryParams.Status"
              @change="getAllInvites()"
              class="appearance-none border border-[#E7EBEE] rounded-full px-8 py-3"
            >
              <option value="">Status</option>
              <option value="0">Unverified</option>
              <option value="2">Verified</option>
            </select>
            <i
              class="uil uil-angle-down absolute right-2 pointer-events-none"
            ></i>
          </div>
        </div>
        <span class="flex gap-x-3">
          <button
            @click="openmodal('method')"
            class="flex gap-x-2 items-center uppercase text-primary hover:text-white hover:bg-primary-500 py-2 px-2 md:py-3 md:px-6 border rounded-full border-primary md:leading-5 text-[10px] sm:text-[13px] shadow-sm"
          >
            <i class="uil uil-plus hidden md:inline"></i>
            <span class="hidden md:inline text-gray-200">|</span>
            invite user
          </button>
          <span
            class="flex items-center justify-center border border-[#E7EBEE] rounded-full h-12 w-12"
            ><i class="uil uil-exchange-alt rotate-[90deg]"></i
          ></span>
        </span>
      </div>
      <div v-if="!isPageLoading">
        <div v-if="!isEmpty" class="max-w-[80vw]">
          <table class="w-full">
            <thead>
              <tr>
                <th
                  v-for="item in theads"
                  :key="item"
                  class="uppercase text-[#B6B7B9] text-[13px] text-left font-normal border-b py-6 px-3 border-[#E7EBEE]"
                >
                  {{ item }}
                </th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="item in tdata" :key="item">
                <td
                  class="capitalize text-matta-black text-[13px] border-b py-6 px-3 border-[#E7EBEE] whitespace-nowrap"
                >
                  <span class="flex items-center">
                    <input
                      type="checkbox"
                      :value="item.id"
                      v-model="multi"
                      class="mr-2"
                    />
                    {{ item.fullName }}
                  </span>
                </td>
                <td
                  class="text-matta-black text-sm font-normal border-b py-6 px-3 border-[#E7EBEE]"
                >
                  {{ item.email }}
                </td>
                <td
                  class="capitalize text-matta-black text-sm font-normal border-b py-6 px-3 border-[#E7EBEE]"
                >
                  <select
                    :value="item.role"
                    class="outline-0 capitalize"
                    @change="updateRole($event, item)"
                    :disabled="!item.status"
                  >
                    <option v-for="role in roles" :key="role" :value="role">
                      {{
                        role == "CompanyAdmin"
                          ? "Company admin"
                          : role == "CompanyUser"
                          ? "Company user"
                          : "Buyer"
                      }}
                    </option>
                  </select>
                </td>

                <td
                  class="capitalize text-matta-black text-sm font-normal border-b py-6 px-3 border-[#E7EBEE]"
                >
                  <span
                    v-if="item.invitationStatusText == 'Expired'"
                    class="px-2 py-2 text-xs rounded-lg border text-[#EE5C5C] border-[#EE5C5C]"
                  >
                    {{ item.invitationStatusText }}</span
                  >
                  <span
                    v-if="item.invitationStatusText == 'Invited'"
                    class="px-2 py-2 text-xs rounded-lg border text-primary border-primary"
                  >
                    {{ item.invitationStatusText }}</span
                  >
                  <span
                    v-if="item.invitationStatusText == 'Verified'"
                    class="px-2 py-2 text-xs rounded-lg text-white bg-[#59B221]"
                  >
                    Verified</span
                  >
                  <!-- <span
                    v-if="item.invitationStatusText.toLowerCase() === 'invited'"
                    class="px-2 py-2 text-xs rounded-lg border text-primary border-primary"
                  >
                    {{ item.invitationStatusText }}</span
                  > -->
                </td>

                <td
                  class="uppercase text-matta-black text-sm font-normal border-b py-6 px-3 border-[#E7EBEE]"
                >
                  <Menu class="relative" as="div">
                    <MenuButton class="outline-none">
                      <i class="uil uil-ellipsis-h"></i>
                    </MenuButton>
                    <MenuItems
                      class="absolute z-[999] bg-white shadow-[5px_12px_35px_rgba(44,44,44,0.12)] py-2 right-0 min-w-[140px] rounded-xl overflow-hidden"
                    >
                      <div
                        class="py-2 px-4 hover:bg-gray-50 text-matta-black text-sm whitespace-nowrap capitalize cursor-pointer"
                        @click="openmodal('remove', item)"
                      >
                        <i class="uil uil-trash-alt mr-1"></i> Remove
                      </div>
                      <div
                        v-if="item.invitationStatusText !== 'Verified'"
                        class="py-2 px-4 hover:bg-gray-50 text-matta-black text-sm whitespace-nowrap capitalize cursor-pointer"
                        @click="resendinvite(item.id)"
                      >
                        <i class="uil uil-envelope-redo mr-1"></i> Resend invite
                      </div>
                    </MenuItems>
                  </Menu>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div
          v-else
          class="h-[310px] rounded-lg w-full flex items-center justify-center bg-[#F1F3F5]"
        >
          <div class="text-center max-w-sm mx-auto">
            <img
              src="~/assets/img/nofound.svg"
              class="w-[52px] h-auto mx-auto mb-4"
            />
            <p class="text-matta-black font-medium text-xl">
              No invited user yet
            </p>

            <button
              @click="openmodal('method')"
              type="button"
              class="bg-primary-500 text-white rounded-full px-6 py-3 uppercase"
            >
              Invite user
            </button>
          </div>
        </div>
      </div>
      <div class="text-center p-6 lg:p-8 my-24" v-else>
        <AppLoader />
      </div>
    </div>

    <div
      v-if="multi.length"
      class="px-6 py-5 rounded-lg bg-white flex justify-between items-center text-[13px]"
    >
      <span class="flex items-center gap-x-3">
        <span>{{ multi.length }} items selected</span>
        <span class="text-gray-300">|</span>
        <span class="flex gap-x-3 items-center">
          <button
            class="uppercase px-2"
            @click="multi = tdata.map((i) => i.id)"
          >
            select all
          </button>
          <button class="uppercase px-2" @click="multi = []">
            deselect
          </button></span
        ></span
      >
      <span class="flex gap-x-4 items-center"
        ><button
          class="py-4 px-5 uppercase bg-primary-500 text-white rounded-lg hover:bg-primary/80"
        >
          select role
        </button>
        <button
          class="bg-[#E7EBEE] text-matta-black rounded-lg px-5 py-4 uppercase"
        >
          select status
        </button></span
      >
    </div>

    <Pagination
      :total="queryParams.totalCount"
      :current="queryParams.PageNumber"
      :per-page="queryParams.PageSize"
      :pageRange="5"
      @page-changed="queryParams.PageNumber = $event"
    />
  </div>
  <IndexModal :isOpen="isOpen" @togglePopup="isOpen = false">
    <template #content>
      <div class="bg-white rounded-lg p-6 lg:p-8 relative w-[550px]">
        <span
          @click="isOpen = false"
          class="hover:bg-gray-50 rounded-full h-6 w-6 flex items-center justify-center absolute top-4 right-4"
          ><AppIcon icon="heroicons-solid:x" class="w-4 h-4"
        /></span>
        <SupplierManagementInviteUser v-if="showing === 'method'" />
        <SupplierManagementRemoveUser v-if="showing === 'remove'" />
      </div>
    </template>
  </IndexModal>
</template>

<script setup>
import { useRoute } from "vue-router";
import { Menu, MenuButton, MenuItems } from "@headlessui/vue";
import {
  getInvites,
  inviteUsers,
  deleteInvite,
  deleteUser,
  changeUserRole,
  getRoles,
  resendInvite,
} from "~/services/userservices";
import debounce from "lodash/debounce";
import { toast } from 'vue3-toastify';



const multi = ref([]);
const showing = ref("");
const isOpen = ref(false);
const roles = ref(null);
const isPageLoading = ref(true);
const user = ref(null);

function removeUser() {
  if (user.value.invitationStatusText == "Verified") {
    deleteUser({ email: user.value.email }).then(() => {
      updateData();
      togglePopup();
    });
  } else {
    deleteInvite({ invitationId: user.value.id }).then(() => {
      updateData();
      togglePopup();
    });
  }
}
function resendinvite(id) {
  resendInvite({ invitationId: id })
    .then((res) => {
      if (res.status === 200) {
        toast.info("Invite sent!");
      }
    })
    .catch((error) => {
      toast.info(error?.response?.data?.Message);
    });
}
function openmodal(val, userdata = null) {
  showing.value = val;
  isOpen.value = true;
  user.value = userdata;
}
function togglePopup() {
  isOpen.value = !isOpen.value;
}
function next() {
  queryParams.PageNumber++;
  getAllInvites();
}
function prev() {
  if (queryParams.PageNumber == 1) return;
  queryParams.PageNumber--;
  getAllInvites();
}
provide("togglePopup", togglePopup);
provide("removeUser", removeUser);
provide("openmodal", openmodal);
const route = useRoute();
defineProps(["title"]);
const isEmpty = ref(false);
const queryParams = reactive({
  Status: "",
  Role: "",
  PageSize: 10,
  PageNumber: 1,
  pagecount: 0,
  totalCount: 0,
  Search: "",
});
function getAllInvites() {
  getInvites(queryParams)
    .then((res) => {
      tdata.value = res.data.data;
      queryParams.totalCount = res.data.totalCount;
      queryParams.pagecount = res.data.data.length;
      isPageLoading.value = false;
      !res.data.data.length ? (isEmpty.value = true) : (isEmpty.value = false);
    })
    .catch(() => {
      isPageLoading.value = false;
    });
}
function updateData() {
  getAllInvites();
}
onMounted(() => {
  getAllInvites();
  getRoles().then((res) => {
    roles.value = res.data;
  });
});
watch(
  () => [queryParams.PageNumber],
  () => {
    getAllInvites();
  }
);
const debounceSearch = debounce(() => {
  getAllInvites();
}, 1500);

function updateRole(e, user) {
  let data = {
    roleName: e.target.value,
    users: [user.email],
  };
  changeUserRole(data).then((res) => {
    if (res.status === 200) {
      getAllInvites();
    }
  });
}
const theads = ["user", "email", "role", "status", ""];
const tdata = ref([]);
provide("deleteInvite", deleteInvite);
provide("deleteUser", deleteUser);
provide("inviteUsers", inviteUsers);
provide("roles", roles);
provide("updateData", updateData);
</script>

<style lang="scss" scoped>
.bg-img {
  background-image: url("~/assets/img/bee.svg");
  background-repeat: no-repeat;
  background-position-x: center;
  background-position-y: bottom;
}
</style>

<template>
  <Listbox class="flex items-center" v-model="selectedOption">
    <div class="relative h-full">
      <ListboxButton
        :class="classStyles"
        class="relative cursor-pointer h-full text-left flex items-center rounded-l-lg px-4 gap-x-2 py-3 border  placeholder:text-[#B6B7B9] focus:outline-matta-black/20 text-sm"
      >
        <span class="text-sm" v-if="selectedOption">
          <div class="text-[#3A3745] flex items-center gap-x-1">
            <span v-if="selectedOption">{{ selectedOption.dial_code }}</span>
          </div></span
        >
        <span class="block text-sm text-[#8F8C9A] whitespace-nowrap" v-else>{{
          placeholder
        }}</span>
        <i class="uil uil-angle-down text-[#101828]"></i>
      </ListboxButton>

      <transition
        leave-active-class="transition duration-100 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <ListboxOptions
          class="absolute mt-1 w-full min-w-[320px] border border-gray-200 z-40 rounded-lg bg-white py-6 text-xs shadow-lg ring-1 ring-black ring-opacity-5 outline-0 sm:text-[13px]"
        >
          <div class="relative flex items-center mb-3 mt-3 px-4">
            <input
              v-model="query"
              placeholder="Search"
              class="text-xs rounded-lg px-3 py-1 h-10 w-full border  placeholder:text-[#B6B7B9] focus:outline-matta-black/20"
            />
          </div>
          <div class="max-h-60 overflow-y-auto py-2">
            <ListboxOption
              v-slot="{ active, selected }"
              v-for="z in filteredCodes"
              :key="z"
              :value="z"
              as="template"
            >
              <li
                :class="[
                  active || selected ? 'bg-gray-50' : '',
                  'relative cursor-pointer select-none py-[11px] px-[20px] text-loft-black hover:bg-gray-100  flex items-center justify-between',
                ]"
              >
                <p class="text-sm text-[#101828] capitalize">
                  {{ z.dial_code }} - &nbsp; {{ z.name }}
                </p>
                <i class="uil uil-check text-[#101828]" v-show="selected"></i>
              </li>
            </ListboxOption>
          </div>
        </ListboxOptions>
      </transition>
    </div>
  </Listbox>
</template>
<script setup>
import {
  Listbox,
  // ListboxLabel,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/vue";
import CountryList from "country-list-with-dial-code-and-flag";

const props = defineProps([
  "label",
  "id",
  "modelValue",
  "placeholder",
  "classStyles",
]);
const emits = defineEmits(["update:modelValue"]);
const selectedOption = ref(null);

onMounted(() => {
  if (!props.modelValue) return {};
  selectedOption.value = CountryList?.find(
    (i) => i.dial_code == props.modelValue
  );
});
const query = ref("");
const filteredCodes = computed(() => {
  if (!query.value.length) return CountryList;
  return CountryList?.filter((item) =>
    item.name.toLowerCase().includes(query.value.toLowerCase())
  );
});

watch(selectedOption, () => {
  if (selectedOption.value?.dial_code == null) return;

  emits("update:modelValue", selectedOption.value.dial_code);
});
watch(
  () => props.modelValue,
  () => {
    if (!props.modelValue) return {};
    selectedOption.value = CountryList?.find(
      (i) => i.dial_code == props.modelValue
    );
  }
);
watch(
  () => [...CountryList],
  () => {
    if (!props.modelValue) return {};
    selectedOption.value = CountryList.find(
      (i) => i.dial_code == props.modelValue
    );
  }
);
</script>

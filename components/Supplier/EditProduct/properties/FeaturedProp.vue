<template>
  <div class="p-8 bg-white rounded-lg" v-if="form && form.propertyItems">
    <div class="flex justify-between">
      <h3 class="text-matta-black font-medium flex gap-x-1 items-center">
        <span>
          <span v-if="!optional" class="text-red-500 mr-[.5px]">*</span>
          {{ title }}</span
        >

        <span
          v-if="type === 'property' || type === 'technical'"
          data-toggle="tooltip"
          data-placement="top"
          :title="desc"
          class="cursor-pointer"
        >
          <InformationCircleIcon class="w-4 h-4 text-gray-600" />
        </span>
      </h3>
      <span @click="toggleTabs(type)">
        <i v-if="toggleData.includes(type)" class="uil uil-minus text-lg"></i>
        <i v-if="!toggleData.includes(type)" class="uil uil-plus text-lg"></i>
      </span>
    </div>
    <div class="md:w-[85%] mt-3" v-show="toggleData.includes(type)">
      <div
        class="mb-1"
        v-if="
          form.propertyItems &&
          form.propertyItems[type] &&
          form.propertyItems[type].propertyItems &&
          form.propertyItems[type].propertyItems.length
        "
      >
        <div
          class="flex gap-x-4 items-start mb-1"
          v-for="(prop, id) in form.propertyItems[type].propertyItems"
          :key="id"
        >
          <span><i class="uil uil-draggabledots text-xl"></i></span>
          <div class="flex-1">
            <Listbox v-model="prop.property">
              <div class="relative mt-1">
                <ListboxButton
                  class="relative w-full text-left rounded-lg appearance-none px-5 py-3 h-12 border bg-[#F1F3F5] placeholder:text-[#B6B7B9] focus:outline-matta-black/20"
                >
                  <span
                    class="block truncate capitalize"
                    v-if="prop.property"
                    >{{ prop.property.name }}</span
                  >
                  <span class="text-sm text-[#B6B7B9]" v-else
                    >Select property</span
                  >
                  <span
                    class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
                  >
                    <ChevronUpDownIcon
                      class="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </span>
                </ListboxButton>

                <transition
                  leave-active-class="transition duration-100 ease-in"
                  leave-from-class="opacity-100"
                  leave-to-class="opacity-0"
                >
                  <ListboxOptions
                    class="absolute mt-1 w-[200px] z-40 overflow-auto rounded-md bg-white py-4 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                  >
                    <div class="max-h-80 overflow-y-auto">
                      <ListboxOption
                        v-slot="{ selected }"
                        v-for="(p, i) in form.properties"
                        :key="i"
                        :value="p"
                        as="template"
                      >
                        <li
                          :class="[
                            'relative cursor-pointer capitalize text-matta-black  hover:text-primary select-none py-2 pl-6 pr-4 text-left',
                          ]"
                        >
                          <div
                            class="flex items-center gap-x-2 justify-between"
                          >
                            <span
                              :class="[
                                selected ? 'font-medium' : 'font-normal',
                              ]"
                              >{{ p.name }}</span
                            >
                            <span
                              class="pl-6 cursor-pointer"
                              @click="removeProperty(n)"
                              >x</span
                            >
                          </div>
                        </li>
                      </ListboxOption>
                    </div>
                    <p
                      v-if="!form.properties.length"
                      class="text-[#B6B7B9] py-2 pl-6 pr-4 text-sm"
                    >
                      Nothing found
                    </p>
                    <hr class="my-2" />
                    <div class="py-2 pl-6 pr-4">
                      <button
                        type="button"
                        class="text-primary"
                        @click="handleAddingProperty(id)"
                      >
                        <i class="uil uil-plus text-sm"></i> Add new item
                      </button>
                    </div>
                  </ListboxOptions>
                </transition>
              </div>
            </Listbox>
            <div
              class="text-red-500 mt-1 w-full"
              v-for="error of v$.propertyItems[type].propertyItems.$each
                .$response.$errors[id].property"
              :key="error.$uid"
            >
              <div class="error-msg text-error text-xs font-semibold">
                {{ error.$message }}
              </div>
            </div>
          </div>
          <div class="flex-1">
            <Combobox v-model="prop.propertyValue" multiple>
              <div class="relative mt-1">
                <div
                  class="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm"
                >
                  <ComboboxButton class="w-full">
                    <div
                      class="relative px-5 py-3 min-h-[48px] rounded-lg flex flex-wrap gap-x-2 w-full border bg-[#F1F3F5] placeholder:text-[#B6B7B9] focus:outline-matta-black/20"
                    >
                      <ul
                        v-if="prop.propertyValue.length > 0"
                        class="flex w-full items-center gap-x-2 gap-y-1 flex-wrap"
                      >
                        <li
                          v-for="(i, n) in prop.propertyValue"
                          :key="i"
                          class="bg-white rounded-lg px-2 py-1 flex items-center text-xs gap-x-3 capitalize"
                        >
                          <span class="leading-[initial]"> {{ i }}</span>
                          <i
                            class="uil uil-times"
                            @click="removePropValue(id, n)"
                          ></i>
                        </li>
                      </ul>
                      <span class="text-sm text-[#B6B7B9]" v-else
                        >Property value</span
                      >
                      <span class="right-0 pr-2 absolute"
                        ><ChevronUpDownIcon
                          class="h-5 w-5 text-gray-400"
                          aria-hidden="true"
                      /></span>
                    </div>
                  </ComboboxButton>
                </div>
                <TransitionRoot
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <ComboboxOptions
                    class="absolute mt-1 md:min-w-[350px] px-8 overflow-auto z-40 rounded-md bg-white py-4 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                  >
                    <div class="relative flex items-center mb-4">
                      <input
                        v-model="valueQuery"
                        class="px-5 py-1 h-10 rounded-lg w-full border bg-[#F1F3F5] placeholder:text-[#B6B7B9] focus:outline-matta-black/20"
                      />
                      <i class="uil uil-search absolute right-3"></i>
                    </div>
                    <div
                      v-if="
                        filteredProperties.length === 0 && valueQuery !== ''
                      "
                      class="relative cursor-default select-none py-2 px-4 text-gray-700"
                    >
                      Nothing found.
                    </div>
                    <div class="max-h-80 overflow-y-auto">
                      <ComboboxOption
                        v-for="(i, n) in filteredProperties"
                        as="template"
                        :key="n"
                        :value="i"
                      >
                        <li class="relative cursor-default select-none py-2">
                          <div class="flex items-center gap-x-2">
                            <div class="flex-1 flex items-center gap-x-2">
                              <input
                                :id="`market${n}`"
                                type="checkbox"
                                class="accent-matta-black"
                                v-model="prop.propertyValue"
                                :value="i"
                              />
                              <span
                                class="text-matta-black leading-[initial] capitalize"
                              >
                                {{ i }}
                              </span>
                            </div>
                            <span
                              class="pl-6 cursor-pointer"
                              @click="removeValue(n)"
                              >x</span
                            >
                          </div>
                        </li>
                      </ComboboxOption>
                    </div>
                    <hr class="my-2" />
                    <div class="py-2 pl-6 pr-4">
                      <button
                        type="button"
                        class="text-primary"
                        @click="handleAddingValues(id)"
                      >
                        <i class="uil uil-plus text-sm"></i> Add new value
                      </button>
                    </div>
                  </ComboboxOptions>
                </TransitionRoot>
              </div>
            </Combobox>
            <div
              class="text-red-500 mt-1 w-full"
              v-for="error of v$.propertyItems[type].propertyItems.$each
                .$response.$errors[id].propertyValue"
              :key="error.$uid"
            >
              <div class="error-msg text-error text-xs font-semibold">
                {{ error.$message }}
              </div>
            </div>
          </div>
          <div class="flex items-center">
            <span
              @click="removesection(type, id)"
              class="bg-gray-50 rounded-full h-8 w-8 flex items-center justify-center"
              ><i class="uil uil-times"></i
            ></span>
          </div>
        </div>
      </div>
      <div class="flex items-center gap-x-4 mt-3">
        <button
          @click="addsection(type)"
          type="button"
          class="text-primary text-xs"
        >
          <i class="uil uil-plus"></i> Add new property
        </button>
        <button
          v-if="
            form.propertyItems[type]?.subSection &&
            !form.propertyItems[type]?.subSection.length
          "
          type="button"
          class="text-primary text-xs"
          @click="addsubsection()"
        >
          <i class="uil uil-plus"></i> Add text subsection
        </button>
      </div>
      <div
        class=""
        v-if="
          form.propertyItems[type]?.subSection &&
          form.propertyItems[type]?.subSection.length
        "
      >
        <hr class="my-4" />
        <div
          class="md:w-[85%] mb-1 flex items-start gap-x-4"
          v-for="(prop, id) in form.propertyItems[type]?.subSection"
          :key="id"
        >
          <div class="flex-1">
            <div class="mb-6">
              <label class="mb-2 font-normal text-xs block">
                Subsection name</label
              >
              <input
                class="rounded-lg px-5 py-3 h-12 w-full border bg-[#F1F3F5] placeholder:text-[#B6B7B9] focus:outline-matta-black/20"
                autocomplete="off"
                autofocus="on"
                placeholder="Enter subsection name..."
                v-model="prop.subSectionName"
              />
            </div>
            <div
              class="mb-6"
              v-if="form.propertyItems[type]?.subSection.length == id + 1"
            >
              <label class="mb-2 font-normal text-xs block"> Description</label>
              <TextEditor
                v-if="prop"
                v-model="prop.description"
                placeholder="Enter description"
                :id="`id${id}`"
              />
            </div>
          </div>
          <div class="flex items-center">
            <span
              @click="removesubsection(id)"
              class="bg-gray-50 rounded-full h-8 w-8 flex items-center justify-center"
              ><i class="uil uil-times"></i
            ></span>
          </div>
        </div>
        <button
          type="button"
          @click="addsubsection()"
          class="text-primary text-xs"
        >
          <i class="uil uil-plus"></i> Add text subsection
        </button>
      </div>
    </div>
  </div>

  <div>
    <Modal :isOpen="isAddingPackage" @toggleModal="isAddingPackage = false">
      <template #content>
        <div
          class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 w-[400px]"
          v-if="isAdding == 'property'"
        >
          <div class="flex justify-between mb-5 items-center">
            <h4 class="font-medium text-matta-black text-xl">Add new value</h4>
            <i
              class="uil uil-times cursor-pointer text-lg hover:ring-1 w-6 h-6 ring-gray-200 flex items-center justify-center hover:ring-offset-2 rounded-full"
              @click="isAddingPackage = false"
            ></i>
          </div>
          <input
            v-model="newpackage"
            class="rounded-lg px-3 py-3 h-12 w-full border bg-[#F1F3F5] placeholder:text-[#B6B7B9] focus:outline-matta-black/20"
            autocomplete="off"
            autofocus="on"
            placeholder="Enter package name..."
          />

          <div class="flex justify-end gap-x-2 items-center mt-8">
            <button
              type="button"
              @click="isAddingPackage = false"
              class="appearance-none text-xs leading-none px-8 py-3 rounded-lg text-matta-black hover:bg-gray-100 uppercase"
            >
              Cancel
            </button>

            <button
              type="button"
              @click="addProperty"
              class="appearance-none text-xs leading-none px-8 py-3 rounded-lg text-white bg-primary-500 hover:opacity-70 uppercase"
            >
              Save
            </button>
          </div>
        </div>
        <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 w-[400px]" v-else>
          <div class="flex justify-between mb-5 items-center">
            <h4 class="font-medium text-matta-black text-xl">Add new value</h4>
            <i
              class="uil uil-times cursor-pointer text-lg hover:ring-1 w-6 h-6 ring-gray-200 flex items-center justify-center hover:ring-offset-2 rounded-full"
              @click="isAddingPackage = false"
            ></i>
          </div>
          <input
            v-model="newpackage"
            class="rounded-lg px-3 py-3 h-12 w-full border bg-[#F1F3F5] placeholder:text-[#B6B7B9] focus:outline-matta-black/20"
            autocomplete="off"
            autofocus="on"
            placeholder="Enter package name..."
          />

          <div class="flex justify-end gap-x-2 items-center mt-8">
            <button
              type="button"
              @click="isAddingPackage = false"
              class="appearance-none text-xs leading-none px-8 py-3 rounded-lg text-matta-black hover:bg-gray-100 uppercase"
            >
              Cancel
            </button>

            <button
              type="button"
              @click="addPropertyValues"
              class="appearance-none text-xs leading-none px-8 py-3 rounded-lg text-white bg-primary-500 hover:opacity-70 uppercase"
            >
              Save
            </button>
          </div>
        </div>
      </template>
    </Modal>
  </div>
</template>

<script setup>
import TextEditor from "~/components/TextEditor";

import {
  TransitionRoot,
  Combobox,
  // ComboboxInput,
  ComboboxButton,
  ComboboxOptions,
  ComboboxOption,
} from "@headlessui/vue";
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/vue";
// import { Cropper } from "vue-advanced-cropper";
// import "vue-advanced-cropper/dist/style.css";
import Modal from "~/components/IndexModal";
import { ref, computed, onMounted, inject, defineProps } from "vue";
//import { uploadfile } from "~/services/onboardingservices";
import {
  ChevronUpDownIcon,
  InformationCircleIcon,
} from "@heroicons/vue/24/solid";

const v$ = inject("v$");
const props = defineProps(["title", "type", "optional"]);
const form = inject("form");
const isAdding = ref("");

onMounted(() => {});
const desc = computed(() => {
  if (props.type === "property") {
    return "List the physical and chemical properties of the chemicals here with the corresponding values. You can use different sections for different properties.";
  } else {
    return "Indicate the official details of technical information about the chemicals with their corresponding values here, e.g. percentage composition, grade, stability and reactivity etc.";
  }
});
const isAddingPackage = ref(false);
const toggleData = ref([
  // "features",
  "applications",
  "property",
  // "compliance",
  "technical",
]);
function toggleTabs(val) {
  if (toggleData.value.includes(val)) {
    toggleData.value = toggleData.value.filter((i) => i != val);
  } else {
    toggleData.value.push(val);
  }
}
function removePropValue(id, i) {
  form.propertyItems[props.type].propertyItems[id].propertyValue.splice(i, 1);
}
const newpackage = ref("");
const valueQuery = ref("");
const filteredProperties = computed(() =>
  valueQuery.value === ""
    ? form.propertyValueList
    : form.propertyValueList.filter((i) =>
        i
          .toLowerCase()
          .replace(/\s+/g, "")
          .includes(valueQuery.value.toLowerCase().replace(/\s+/g, ""))
      )
);
function removeValue(index) {
  form.propertyValueList.splice(index, 1);
}
function removeProperty(index) {
  form.properties.splice(index, 1);
}
const index = ref(null);
const addingProperty = inject("addProperty");
const addingPropertyvalue = inject("addPropertyValue");
function addProperty() {
  let data = {
    type: formType.value,
    name: newpackage.value,
  };
  switch (props.type) {
    case "features":
      form.propertyItems.features.propertyItems[index.value].property = data;
      break;
    case "applications":
      form.propertyItems.applications.propertyItems[index.value].property =
        data;
      break;
    case "property":
      form.propertyItems.property.propertyItems[index.value].property = data;
      break;
    case "compliance":
      form.propertyItems.compliance.propertyItems[index.value].property = data;
      break;
    case "technical":
      form.propertyItems.technical.propertyItems[index.value].property = data;
      break;
  }
  addingProperty(data);
  newpackage.value = "";
  isAddingPackage.value = false;
}
function addPropertyValues() {
  let data = {
    type: formType.value,
    name: newpackage.value,
  };
  switch (props.type) {
    case "features":
      form.propertyItems.features.propertyItems[index.value].propertyValue.push(
        newpackage.value
      );
      break;
    case "applications":
      form.propertyItems.applications.propertyItems[
        index.value
      ].propertyValue.push(newpackage.value);
      break;
    case "property":
      form.propertyItems.property.propertyItems[index.value].propertyValue.push(
        newpackage.value
      );
      break;
    case "compliance":
      form.propertyItems.compliance.propertyItems[
        index.value
      ].propertyValue.push(newpackage.value);
      break;
    case "technical":
      form.propertyItems.technical.propertyItems[
        index.value
      ].propertyValue.push(newpackage.value);
      break;
  }
  addingPropertyvalue(data);
  newpackage.value = "";
  isAddingPackage.value = false;
}
function handleAddingValues(val) {
  isAdding.value = "values";
  isAddingPackage.value = true;
  index.value = val;
}

function handleAddingProperty(val) {
  isAdding.value = "property";
  isAddingPackage.value = true;
  index.value = val;
}
function addsection() {
  switch (props.type) {
    case "features":
      form.propertyItems.features.propertyItems.push({
        property: "",
        propertyValue: [],
      });
      break;
    case "applications":
      form.propertyItems.applications.propertyItems.push({
        property: "",
        propertyValue: [],
      });
      break;
    case "property":
      form.propertyItems.property.propertyItems.push({
        property: "",
        propertyValue: [],
      });
      break;
    case "compliance":
      form.propertyItems.compliance.propertyItems.push({
        property: {},
        propertyValue: [],
      });
      break;
    case "technical":
      form.propertyItems.technical.propertyItems.push({
        property: "",
        propertyValue: [],
      });
      break;
  }
}
function addsubsection() {
  if (!form.propertyItems[props.type].subSection) {
    form.propertyItems[props.type].subSection = [];
  }
  switch (props.type) {
    case "features":
      form.propertyItems.features.subSection.push({
        subSectionName: "",
        description: "",
      });
      break;
    case "applications":
      form.propertyItems.applications.subSection.push({
        subSectionName: "",
        description: "",
      });
      break;
    case "property":
      form.propertyItems.property.subSection.push({
        subSectionName: "",
        description: "",
      });
      break;
    case "compliance":
      form.propertyItems.compliance.subSection.push({
        subSectionName: "",
        description: "",
      });
      break;
    case "technical":
      form.propertyItems.technical.subSection.push({
        subSectionName: "",
        description: "",
      });
      break;
  }
}
function removesection(val, index) {
  switch (props.type) {
    case "features":
      form.propertyItems.features.propertyItems.splice(index, 1);
      break;
    case "applications":
      form.propertyItems.applications.propertyItems.splice(index, 1);
      break;
    case "property":
      form.propertyItems.property.propertyItems.splice(index, 1);
      break;
    case "compliance":
      form.propertyItems.compliance.propertyItems.splice(index, 1);
      break;
    case "technical":
      form.propertyItems.technical.propertyItems.splice(index, 1);
      break;
  }
}

function removesubsection(index) {
  switch (props.type) {
    case "features":
      form.propertyItems.features.subSection.splice(index, 1);
      break;
    case "applications":
      form.propertyItems.applications.subSection.splice(index, 1);
      break;
    case "property":
      form.propertyItems.property.subSection.splice(index, 1);
      break;
    case "compliance":
      form.propertyItems.compliance.subSection.splice(index, 1);
      break;
    case "technical":
      form.propertyItems.technical.subSection.splice(index, 1);
      break;
  }
}

const formType = computed(() => {
  let value;
  switch (props.type) {
    case "features":
      value = 0;
      break;
    case "applications":
      value = 1;
      break;
    case "property":
      value = 3;
      break;
    case "compliance":
      value = 4;
      break;
    case "technical":
      value = 5;
  }
  return value;
});
</script>

<style lang="scss" scoped>
.bg-img {
  background-image: url("~/assets/img/bee.svg");
  background-repeat: no-repeat;
  background-position-x: center;
  background-position-y: bottom;
}
</style>

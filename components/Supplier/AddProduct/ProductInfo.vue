<template>
  <form class="grid gap-y-4" @submit.prevent="handleSubmit">
    <div class="p-8 bg-white rounded-lg">
      <h3 class="text-matta-black mb-6">Product info</h3>
      <div class="md:max-w-[85%]">
        <div class="">
          <div>
            <div>
              <div class="grid grid-cols-2 gap-x-4">
                <div class="mb-6">
                  <label class="mb-2 font-normal text-xs block">
                    <span class="text-red-500 mr-[.5px]">*</span> Product
                    generic name
                  </label>
                  <input
                    v-model="v$.name.$model"
                    class="rounded-lg px-5 py-3 h-12 w-full border bg-[#F1F3F5] placeholder:text-[#B6B7B9] focus:outline-matta-black/20"
                    autocomplete="off"
                    autofocus="on"
                    placeholder=""
                  />
                  <div
                    class="text-red-500 mt-1"
                    v-for="error of v$.name.$errors"
                    :key="error.$uid"
                  >
                    <div class="error-msg text-error text-xs font-semibold">
                      {{ error.$message }}
                    </div>
                  </div>
                </div>
                <div class="mb-6">
                  <label class="mb-2 font-normal text-xs block">
                    Product brand name
                  </label>

                  <div class="flex relative items-center">
                    <input
                      v-model="v$.productBrandName.$model"
                      class="rounded-lg px-5 py-3 h-12 w-full border bg-[#F1F3F5] placeholder:text-[#B6B7B9] focus:outline-matta-black/20"
                      placeholder=""
                    />
                  </div>
                  <div
                    class="text-red-500 mt-1"
                    v-for="error of v$.productBrandName.$errors"
                    :key="error.$uid"
                  >
                    <div class="error-msg text-error text-xs font-semibold">
                      {{ error.$message }}
                    </div>
                  </div>
                </div>
              </div>

              <div class="">
                <div class="mb-6">
                  <label class="mb-2 font-normal text-xs block">
                    <span class="text-red-500 mr-[.5px]">*</span> Producer
                  </label>

                  <Combobox v-model="form.manufacturer">
                    <div class="relative mt-1">
                      <div
                        class="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm"
                      >
                        <ComboboxInput
                          class="px-5 py-3 h-12 rounded-lg w-full border bg-[#F1F3F5] placeholder:text-[#B6B7B9] focus:outline-matta-black/20"
                          :displayValue="(i) => i"
                          @change="query = $event.target.value"
                          placeholder="Type a producer name"
                        />
                        <ComboboxButton
                          class="absolute inset-y-0 right-0 flex items-center pr-2"
                        >
                          <ChevronUpDownIcon
                            class="h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                        </ComboboxButton>
                      </div>
                      <TransitionRoot
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                        @after-leave="query = ''"
                      >
                        <ComboboxOptions
                          class="absolute mt-1 max-h-80 md:min-w-[350px] px-3 overflow-auto rounded-md z-40 bg-white py-4 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                        >
                          <div
                            v-if="
                              filteredProducers.length === 0 && query !== ''
                            "
                            class="relative cursor-default select-none py-2 px-4 text-gray-700"
                          >
                            <p class="mb-2">Nothing found.</p>
                            <hr class="my-4" />
                            <div class="flex justify-end">
                              <button
                                @click="handleAddingPackage"
                                type="button"
                                class="appearance-none text-xs leading-none px-6 py-3 rounded-lg text-white bg-primary-500 hover:opacity-70 uppercase"
                              >
                                Add new
                              </button>
                            </div>
                          </div>
                          <ComboboxOption
                            v-for="i in filteredProducers"
                            as="template"
                            :key="i.id"
                            :value="i.title"
                            v-slot="{ selected, active }"
                          >
                            <li
                              class="relative cursor-default select-none py-2"
                            >
                              <div class="flex items-center gap-x-4">
                                <span
                                  class="h-12 w-12 rounded-lg bg-white shadow p-4 flex items-center justify-center mr-4 border border-[#E7EBEE]"
                                >
                                  <img v-if="i.logo" :src="i.logo" alt="logo" />
                                  <p class="uppercase text-base" v-else>
                                    {{ i.title.slice(0, 2) }}
                                  </p>
                                </span>

                                <div>
                                  <p
                                    class="block truncate mb-1"
                                    :class="{
                                      'font-medium': selected,
                                      'font-normal': !selected,
                                    }"
                                  >
                                    {{ i.title }}
                                  </p>
                                  <p
                                    class="block truncate text-matta-black/80 text-sm"
                                  >
                                    {{ i.location }}
                                  </p>
                                </div>
                              </div>
                              <span
                                v-if="selected"
                                class="absolute inset-y-0 left-0 flex items-center pl-3"
                                :class="{
                                  'text-white': active,
                                  'text-teal-600': !active,
                                }"
                              >
                                <CheckIcon class="h-5 w-5" aria-hidden="true" />
                              </span>
                            </li>
                          </ComboboxOption>
                        </ComboboxOptions>
                      </TransitionRoot>
                    </div>
                  </Combobox>
                  <div
                    class="text-red-500 mt-1"
                    v-for="error of v$.manufacturer.$errors"
                    :key="error.$uid"
                  >
                    <div class="error-msg text-error text-xs font-semibold">
                      {{ error.$message }}
                    </div>
                  </div>
                </div>
              </div>
              <div class="">
                <div class="mb-6">
                  <label class="mb-2 font-normal text-xs block">
                    <span class="text-red-500 mr-[.5px]">*</span> Markets
                  </label>
                  <MultiInput
                    v-if="allmarkets.length"
                    :markets="allmarkets"
                    :selectedmarkets="form.markets"
                    :applications="form.marketApplications"
                    :subapplications="form.marketSubapplications"
                    @getValue="getMarketValue"
                  />
                  <div
                    class="text-red-500 mt-1"
                    v-for="error of v$.markets.$errors"
                    :key="error.$uid"
                  >
                    <div class="error-msg text-error text-xs font-semibold">
                      {{ error.$message }}
                    </div>
                  </div>
                  <div
                    class="text-red-500 mt-1"
                    v-for="error of v$.marketApplications.$errors"
                    :key="error.$uid"
                  >
                    <div class="error-msg text-error text-xs font-semibold">
                      {{ error.$message }}
                    </div>
                  </div>
                </div>
              </div>
              <div class="">
                <div class="mb-6">
                  <label class="mb-2 font-normal text-xs block">
                    <span class="text-red-500 mr-[.5px]">*</span> Applications
                  </label>
                  <MultiInput
                    v-if="technologies.length"
                    :markets="technologies"
                    @getValue="getTechValue"
                    :selectedmarkets="form.technologies"
                    :applications="form.techApplications"
                    :subapplications="form.techSubApplications"
                  />
                  <div
                    class="text-red-500 mt-1"
                    v-for="error of v$.technologies.$errors"
                    :key="error.$uid"
                  >
                    <div class="error-msg text-error text-xs font-semibold">
                      {{ error.$message }}
                    </div>
                  </div>
                  <div
                    class="text-red-500 mt-1"
                    v-for="error of v$.techApplications.$errors"
                    :key="error.$uid"
                  >
                    <div class="error-msg text-error text-xs font-semibold">
                      {{ error.$message }}
                    </div>
                  </div>
                </div>
              </div>
              <div class="mb-6">
                <label
                  class="mb-2 font-normal text-xs flex gap-x-1 items-center"
                >
                  <span class="text-red-500 mr-[.5px]">*</span>
                  <span>Description </span>
                  <span
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Brief general information about the chemicals, its chemical composition, other names, important uses or any specificity"
                    class="cursor-pointer"
                  >
                    <InformationCircleIcon class="w-4 h-4 text-gray-600" />
                  </span>
                </label>
                <textarea
                  v-model="v$.description.$model"
                  rows="3"
                  placeholder="Product description"
                  class="rounded-lg px-5 py-3 w-full border bg-[#F1F3F5] placeholder:text-[#B6B7B9] focus:outline-matta-black/20"
                ></textarea>
                <div
                  class="text-red-500 mt-1"
                  v-for="error of v$.description.$errors"
                  :key="error.$uid"
                >
                  <div class="error-msg text-error text-xs font-semibold">
                    {{ error.$message }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-col md:flex-row gap-x-4 text-left">
      <div class="p-8 bg-white rounded-lg md:w-[56%]">
        <h3 class="text-matta-black mb-6">
          <span class="text-red-500 mr-[.5px]">*</span> Packages & Availability
        </h3>
        <div class="mb-6">
          <Listbox v-model="form.unit">
            <div class="relative mt-1">
              <ListboxButton
                class="relative w-[200px] text-left rounded-lg appearance-none px-5 py-3 h-12 border bg-[#F1F3F5] placeholder:text-[#B6B7B9] focus:outline-matta-black/20"
              >
                <span class="block truncate">{{
                  measurements.find((i) => i.value == form.unit)?.name
                }}</span>
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
                  class="absolute mt-1 mx-h-60 w-[200px] z-40 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                >
                  <ListboxOption
                    v-slot="{ selected }"
                    v-for="i in measurements"
                    :key="i.name"
                    :value="i.value"
                    as="template"
                  >
                    <li
                      :class="[
                        'relative cursor-pointer  text-matta-black  hover:text-primary select-none py-2 pl-10 pr-4 text-left',
                      ]"
                    >
                      <span
                        :class="[selected ? 'font-medium' : 'font-normal']"
                        >{{ i.name }}</span
                      >
                    </li>
                  </ListboxOption>
                </ListboxOptions>
              </transition>
            </div>
          </Listbox>

          <div
            class="text-red-500 mt-1"
            v-for="error of v$.unit.$errors"
            :key="error.$uid"
          >
            <div class="error-msg text-error text-xs font-semibold">
              {{ error.$message }}
            </div>
          </div>
        </div>

        <div class="overflow-y-auto max-h-[40vh] mb-3">
          <div
            class="grid relative"
            v-for="(pack, i) in form.packagesAvailable"
            :key="i"
          >
            <i
              class="uil uil-times cursor-pointer absolute right-4 top-4 text-lg hover:ring-1 w-6 h-6 ring-gray-200 flex items-center justify-center hover:ring-offset-2 rounded-full"
              @click="removepackage(i)"
            ></i>
            <div class="p-8 rounded-lg border border-[#DDDDDD] mb-4">
              <div class="mb-6">
                <label class="mb-2 font-normal text-xs block">
                  <span class="text-red-500 mr-[.5px]">*</span> Package name
                </label>
                <Listbox v-model="pack.package.title">
                  <div class="relative mt-1">
                    <ListboxButton
                      class="relative w-full text-left rounded-lg appearance-none px-5 py-3 h-12 border bg-[#F1F3F5] placeholder:text-[#B6B7B9] focus:outline-matta-black/20"
                    >
                      <span class="block truncate text-sm">{{
                        pack.package.title
                      }}</span>
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
                        class="absolute mt-1 w-[200px] z-40 rounded-md bg-white py-4 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                      >
                        <div class="mx-h-60 overflow-y-auto">
                          <ListboxOption
                            v-slot="{ selected }"
                            v-for="(p, i) in packageForms"
                            :key="i"
                            :value="p"
                            as="template"
                          >
                            <li
                              :class="[
                                'relative cursor-pointer  text-matta-black  hover:text-primary select-none py-2 pl-6 pr-4 text-left',
                              ]"
                            >
                              <span
                                :class="[
                                  selected ? 'font-medium' : 'font-normal',
                                ]"
                                >{{ p }}</span
                              >
                            </li>
                          </ListboxOption>
                        </div>
                      </ListboxOptions>
                    </transition>
                  </div>
                </Listbox>
                <div
                  class="text-red-500 mt-1"
                  v-for="error of v$.packagesAvailable.$each.$response.$errors[
                    i
                  ].package"
                  :key="error.$uid"
                >
                  <div class="error-msg text-error text-xs font-semibold">
                    {{ error.$message }}
                  </div>
                </div>
              </div>
              <div class="grid grid-cols-2 gap-x-4">
                <div class="mb-6">
                  <label class="mb-2 font-normal text-xs block">
                    <span class="text-red-500 mr-[.5px]">*</span> Size
                  </label>
                  <div class="relative flex items-center">
                    <input
                      v-model="pack.size"
                      class="rounded-lg px-5 text-sm py-3 h-12 w-full border bg-[#F1F3F5] placeholder:text-[#B6B7B9] focus:outline-matta-black/20"
                      placeholder=""
                      type="text"
                    />
                    <span class="absolute right-2 text-xs">{{
                      form.unit
                    }}</span>
                  </div>
                  <div
                    class="text-red-500 mt-1"
                    v-for="error of v$.packagesAvailable.$each.$response
                      .$errors[i].size"
                    :key="error.$uid"
                  >
                    <div class="error-msg text-error text-xs font-semibold">
                      {{ error.$message }}
                    </div>
                  </div>
                </div>
                <div class="mb-6">
                  <label
                    class="mb-2 font-normal text-xs flex gap-x-1 items-center"
                  >
                    <span class="text-red-500 mr-[.5px]">*</span>
                    <span>Price </span>
                    <span
                      data-toggle="tooltip"
                      data-placement="top"
                      title="Please indicate price with respect to the selected unit of measurement"
                      class="cursor-pointer"
                    >
                      <InformationCircleIcon class="w-4 h-4 text-gray-600" />
                    </span>
                  </label>

                  <div class="relative">
                    <div class="relative flex items-center">
                      <CurrencyInput
                        v-model="pack.amount"
                        class="rounded-lg px-5 text-sm py-3 h-12 w-full border bg-[#F1F3F5] placeholder:text-[#B6B7B9] focus:outline-matta-black/20"
                        placeholder=""
                        :options="{
                          currency: 'ngn',
                          currencyDisplay: 'narrowSymbol',
                        }"
                      />
                      <span class="absolute right-2 text-xs"
                        >/{{ form.unit }}</span
                      >
                    </div>
                  </div>
                  <div
                    class="text-red-500 mt-1"
                    v-for="error of v$.packagesAvailable.$each.$response
                      .$errors[i].amount"
                    :key="error.$uid"
                  >
                    <div class="error-msg text-error text-xs font-semibold">
                      {{ error.$message }}
                    </div>
                  </div>
                </div>
                <div class="mb-6">
                  <label class="mb-2 font-normal text-xs block"
                    >Colour
                    <!-- <span class="font-light text-xs text-[#ABABAB]"
                      >(Optional)</span
                    > -->
                  </label>

                  <div class="flex relative items-center">
                    <div class="relative flex items-center">
                      <input
                        v-model="pack.color"
                        class="rounded-lg px-5 py-3 text-sm h-12 w-full border bg-[#F1F3F5] placeholder:text-[#B6B7B9] focus:outline-matta-black/20"
                        placeholder=""
                        type="text"
                      />
                    </div>
                  </div>
                </div>
                <div class="mb-6">
                  <label class="mb-2 font-normal text-xs block"
                    >Purity
                    <!-- <span class="font-light text-xs text-[#ABABAB]"
                      >(Optional)</span
                    > -->
                  </label>
                  <div class="relative">
                    <div class="relative flex items-center">
                      <input
                        v-model="pack.purity"
                        class="rounded-lg px-5 py-3 text-sm h-12 w-full border bg-[#F1F3F5] placeholder:text-[#B6B7B9] focus:outline-matta-black/20"
                        min="0"
                        max="100"
                      />
                      <span class="absolute right-2 text-xs">%</span>
                    </div>
                    <div
                      class="text-red-500 mt-1"
                      v-for="error of v$.packagesAvailable.$each.$response
                        .$errors[i].purity"
                      :key="error.$uid"
                    >
                      <div class="error-msg text-error text-xs font-semibold">
                        {{ error.$message }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <label
                  for="isAvailable"
                  class="flex item-center leading-[normal]"
                >
                  <input
                    id="isAvailable"
                    type="checkbox"
                    class="mr-2 accent-matta-black"
                    v-model="pack.isAvailable"
                  />
                  <span>Is available</span>
                </label>
              </div>
            </div>
          </div>
        </div>
        <button
          type="button"
          class="text-primary text-sm text-left leading-[normal]"
          @click="addnewpackage"
        >
          <i class="uil uil-plus"></i> Add new package
        </button>
      </div>
      <div class="p-8 rounded-lg bg-white flex flex-col gap-y-3 h-[500px] flex-1">
        <h3 class="text-matta-black mb-2">
          Gallery
          <!-- <span class="font-light text-xs text-[#ABABAB]">(Optional)</span> -->
        </h3>
        <Uploader
          @onGetFiles="onGetFiles"
          @removeFile="removeFile"
          :isMultiple="true"
          :gallery="form.gallery"
        />
        <div
          class="text-red-500 mt-1"
          v-for="error of v$.gallery.$errors"
          :key="error.$uid"
        >
          <div class="error-msg text-error text-xs font-semibold">
            {{ error.$message }}
          </div>
        </div>
      </div>
    </div>
    <div class="bg-white rounded-lg px-10 py-6 flex gap-x-10 items-center">
      <label class="flex item-center leading-[normal]">
        <input
          type="checkbox"
          v-model="form.sampleAvailable"
          class="mr-2 accent-matta-black"
        /><span> Sample is available</span>
      </label>
      <label class="flex item-center leading-[normal]">
        <input
          type="checkbox"
          v-model="form.hideProduct"
          class="mr-2 accent-matta-black"
        />
        <span>Hide product</span>
      </label>
      <label class="flex item-center leading-[normal]">
        <input
          type="checkbox"
          v-model="form.hidePrice"
          class="mr-2 accent-matta-black"
        />
        <span>Hide price</span>
      </label>
    </div>
    <div
      class="bg-white rounded-lg px-10 py-6 flex justify-between gap-x-10 items-center sticky bottom-0"
    >
      <button
        type="button"
        @click="togglePreview"
        class="appearance-none leading-none px-10 py-4 rounded-full text-primary border-primary border hover:bg-gray-300 text-[13px] uppercase"
      >
        PREVIEW
      </button>
      <div class="flex justify-center gap-x-4 items-center">
        <!-- <router-link to="/account/storefront/products"
          ><button
            type="button"
            class="appearance-none leading-none px-10 py-4 rounded-full text-matta-black bg-[#F1F3F5] hover:bg-gray-100 text-[13px] uppercase"
          >
            Back
          </button></router-link
        > -->
        <button
          :disabled="isLoading"
          :class="{
            'bg-primary/60 cursor-not-allowed': isLoading,
          }"
          type="submit"
          class="appearance-none leading-none px-10 py-4 rounded-full text-white bg-primary-500 hover:opacity-70 text-[13px] uppercase"
        >
          Next
        </button>
      </div>
    </div>
  </form>

  <div>
    <Modal :isOpen="isAddingPackage" @toggleModal="isAddingPackage = false">
      <template #content>
        <form
          class="bg-white px-4 pt-5 pb-8 sm:p-6 sm:pb-4 w-[500px] rounded-lg"
          @submit.prevent="handleProducer"
        >
          <div class="flex justify-between mb-8 items-center">
            <h4 class="font-medium text-matta-black text-xl">Add Producer</h4>
            <i
              class="uil uil-times cursor-pointer text-lg hover:ring-1 w-6 h-6 ring-gray-200 flex items-center justify-center hover:ring-offset-2 rounded-full"
              @click="isAddingPackage = false"
            ></i>
          </div>
          <div class="mb-5">
            <label class="mb-2 font-normal text-xs block"
              >Name <span class="text-red-500 pl-[.5px]">*</span></label
            >
            <input
              v-model="producerForm.title"
              class="rounded-lg px-3 py-3 h-12 w-full border bg-[#F1F3F5] placeholder:text-[#B6B7B9] focus:outline-matta-black/20"
              placeholder="Enter producer name"
              required
            />
          </div>
          <div class="flex gap-x-6 mb-5">
            <div class="w-full">
              <label class="mb-2 font-normal text-xs block">Country</label>
              <CountriesSelect v-model="producerForm.country" />
            </div>
            <div class="w-full">
              <label class="mb-2 font-normal text-xs block">State</label>
              <StatesSelect v-model="producerForm.state" :states="states" />
            </div>
          </div>
          <div>
            <label class="mb-2 font-normal text-xs block">Producer Logo</label>
            <label for="upload" class="cursor-pointer">
              <input
                @change="handleEvent($event)"
                type="file"
                accept="image/*"
                id="upload"
                class="hidden"
              />
              <div>
                <span
                  v-if="!producerForm.logo"
                  class="h-16 w-16 rounded-full flex items-center text-xs bg-[#F1F3F5] mr-4 justify-center"
                  >Logo</span
                >
                <img
                  v-else
                  :src="producerForm.logo"
                  class="h-16 w-16 rounded-full flex items-center bg-[#F1F3F5] mr-4 justify-center"
                />
              </div>
              <i
                class="fa fa-spinner fa-spin ml-6"
                v-if="isLoadingLogo"
                aria-hidden="true"
              ></i>
            </label>
          </div>

          <hr class="my-6" />
          <div class="flex justify-end gap-x-2 items-center mt-8">
            <button
              type="button"
              @click="isAddingPackage = false"
              class="appearance-none text-xs leading-none px-8 py-3 rounded-lg text-matta-black hover:bg-gray-100 uppercase"
            >
              Cancel
            </button>

            <button
              :disabled="isLoading"
              type="submit"
              class="appearance-none text-xs leading-none px-8 py-3 rounded-lg text-white bg-primary-500   hover:opacity-70 uppercase disabled:opacity-50"
            >
              Save
            </button>
          </div>
        </form></template
      >
    </Modal>
  </div>
</template>

<script setup>
import CurrencyInput from "~/components/CurrencyInput";
import {
  TransitionRoot,
  Combobox,
  ComboboxInput,
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
import Modal from "~/components/IndexModal";
import {
  ref,
  reactive,
  computed,
  provide,
  onMounted,
  inject,
  watch,
} from "vue";
import useVuelidate from "@vuelidate/core";
import {
  required,
  maxLength,
  minValue,
  maxValue,
  helpers,
  decimal,
  integer,
  or,
} from "@vuelidate/validators";
import { useToast } from "vue-toastification";
import {
  updateProduct,
  addProduct,
  getMarkets,
  addproducer,
} from "~/services/productservices";
import Uploader from "~/components/UploadComponent";
import {
  CheckIcon,
  ChevronUpDownIcon,
  InformationCircleIcon,
} from "@heroicons/vue/24/solid";
import { useRoute, useRouter } from "vue-router";
import MultiInput from "./MultiInput";
import CountriesSelect from "~/components/forms/CountriesSelect";
import StatesSelect from "~/components/forms/StatesSelect";
import { uploadfile } from "~/services/onboardingservices";

const route = useRoute();
const router = useRouter();
const toast = useToast();
const queryParams = reactive({
  Search: "",
  PageSize: 10,
  PageNumber: 1,
  productId: route.query.id,
});
const isLoadingLogo = ref(false);
const states = computed(() => {
  if (!producerForm.country) return [];
  return (
    countries.find(
      (item) => producerForm.country.toLowerCase() === item.name.toLowerCase()
    ).states || []
  );
});

const producerForm = reactive({
  title: "",
  location: "",
  country: "",
  state: "",
  logo: "",
});
const getProducers = inject("getProducers");
const technologies = inject("technologies");
const markets = ref([]);
const form = inject("form");
const togglePreview = inject("togglePreview");
const allmarkets = inject("allmarkets");
const producers = inject("producers");

onMounted(() => {
  getMarkets(queryParams).then((res) => {
    markets.value = res.data.data;
    form.productId = route.query.id;
  });
});

const isAddingPackage = ref(false);
const isLoading = ref(false);

const packageForms = [
  "Plastic drum",
  "Metal drum",
  "Keg",
  "Carton",
  "Bag",
  "Cylinder",
  "Tank",
];

const selectedMeasurement = ref(measurements[0]);
// const newpackage = ref("");
let query = ref("");

let filteredProducers = computed(() =>
  query.value === ""
    ? producers.value
    : producers.value.filter((i) =>
        i.title
          .toLowerCase()
          .replace(/\s+/g, "")
          .includes(query.value.toLowerCase().replace(/\s+/g, ""))
      )
);

const rules = {
  name: {
    required,
    maxLength: maxLength(100),
  },
  manufacturer: {
    required: helpers.withMessage("Select a producer", required),
  },
  markets: {
    required: helpers.withMessage("Select a market", required),
  },
  marketApplications: {
    required: helpers.withMessage("Select a market application", required),
  },
  techApplications: {
    required: helpers.withMessage("Select a Sub-application", required),
  },
  technologies: {
    required: helpers.withMessage("Select an application", required),
  },
  description: {
    maxLength: maxLength(400),
  },
  unit: { required },
  packagesAvailable: {
    required,
    $each: helpers.forEach({
      purity: {
        maxValue: maxValue(100),
        minValue: minValue(0),
        integerOrDecimal: or(integer, decimal),
      },
      amount: {
        required,
      },
      size: {
        required,
        integerOrDecimal: or(integer, decimal),
      },
      package: {
        required,
      },
    }),
  },
  productBrandName: { maxLength: maxLength(100) },
  gallery: {
    required: helpers.withMessage("At least 1 image is required", required),
  },
};
// const index = ref(null);
const invalidCredentials = ref(false);
const v$ = useVuelidate(rules, form);

function create_UUID() {
  var dt = new Date().getTime();
  var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
    /[xy]/g,
    function (c) {
      var r = (dt + Math.random() * 16) % 16 | 0;
      dt = Math.floor(dt / 16);
      return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
    }
  );
  return uuid;
}
function getTechValue(data) {
  form.technologies = data.selectedmarkets;
  form.techApplications = data.applications;
  form.techSubApplications = data.subapplications;
}
function getMarketValue(data) {
  form.markets = data.selectedmarkets;
  form.marketApplications = data.applications;
  form.marketSubapplications = data.subapplications;
}
watch(
  () => form.unit,
  () => {
    if (!form && !form.packagesAvailable) return;
    form.packagesAvailable = form.packagesAvailable.map((i) => {
      i.unit = form.unit;
      return i;
    });
  }
);
async function handleSubmit() {
  const validity = await v$.value.$validate();
  if (!validity) return;
  isLoading.value = true;

  if (route.query.id) {
    updateProduct(form)
      .then((res) => {
        if (res.status === 200) {
          toast.info("Information saved", {
            position: "bottom",
            duration: 4000,
          });
          router.push(
            `/storefront/products/add-product?id=${route.query.id}&stage=2`
          );
        }
      })

      .catch((err) => {
        invalidCredentials.value = true;
        isLoading.value = false;

        toast.error(err.response.data.Message, {
          position: "bottom",
        });
      });
  } else {
    addProduct(form)
      .then((res) => {
        if (res.status === 200) {
          toast.info("Information saved", {
            position: "bottom",
            duration: 4000,
          });
          router.push(
            `/storefront/products/add-product?id=${res.data.data.item_id}&stage=2`
          );
        }
      })

      .catch((err) => {
        invalidCredentials.value = true;
        isLoading.value = false;

        toast.error(err.response.data.Message, {
          position: "bottom",
        });
      });
  }
}

function handleProducer() {
  isLoading.value = true;
  producerForm.location = `${producerForm.state}, ${producerForm.country}`;
  addproducer(producerForm)
    .then((res) => {
      if (res.status == 200) {
        getProducers();
        form.manufacturer = producerForm.title;
        producerForm.title = "";
        producerForm.location = "";
        producerForm.country = "";
        producerForm.state = "";
        isAddingPackage.value = false;
        isLoading.value = false;
      }
    })
    .catch((err) => {
      isLoading.value = false;

      toast.error(err.response.data.Message);
    });
}
function handleEvent(e) {
  isLoadingLogo.value = true;
  var files = e.target.files || e.dataTransfer.files;
  if (!files.length) return;
  if (producerForm.logo) {
    URL.revokeObjectURL(producerForm.logo);
  }

  const file = e.target.files[0];
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onloadend = () => {
    // Use a regex to remove data url part
    const base64String = reader.result;

    uploadfile({
      base64: base64String.replace("data:", "").replace(/^.+,/, ""),
    })
      .then((res) => {
        producerForm.logo = res.data.message;
        isLoadingLogo.value = false;
      })
      .catch(() => {
        isLoadingLogo.value = false;
      });
  };
  // producerForm.logo = URL.createObjectURL(files[0]);
}
function onGetFiles(file) {
  form.gallery = [...form.gallery, file];
}
function removeFile(id) {
  form.gallery.splice(id, 1);
}

function addnewpackage() {
  form.packagesAvailable.push({
    package: {
      id: create_UUID(),
      title: "",
    },
    unit: selectedMeasurement.value.value,
    size: null,
    amount: null,
    isAvailable: true,
    color: "",
    purity: "",
  });
}
function removepackage(val) {
  form.packagesAvailable.splice(val, 1);
}
function handleAddingPackage() {
  isAddingPackage.value = true;
}
provide("images", form.gallery);
</script>

<style lang="scss" scoped>
.bg-img {
  background-image: url("~/assets/img/bee.svg");
  background-repeat: no-repeat;
  background-position-x: center;
  background-position-y: bottom;
}
</style>

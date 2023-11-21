<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <TransitionRoot as="template" :show="open">
    <Dialog as="div" class="relative z-[999]" @close="open = false">
      <TransitionChild
        as="template"
        enter="ease-in-out duration-500"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in-out duration-500"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-[#333] transition-opacity" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-hidden">
        <div class="absolute inset-0 overflow-hidden">
          <div
            class="pointer-events-none fixed inset-y-0 left-0 flex max-w-full pr-20 md:pr-10"
          >
            <TransitionChild
              as="template"
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enter-from="-translate-x-full"
              enter-to="-translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leave-from="-translate-x-0"
              leave-to="-translate-x-full"
            >
              <DialogPanel
                class="pointer-events-auto relative w-screen max-w-md"
              >
                <TransitionChild
                  as="template"
                  enter="ease-in-out duration-500"
                  enter-from="opacity-0"
                  enter-to="opacity-100"
                  leave="ease-in-out duration-500"
                  leave-from="opacity-100"
                  leave-to="opacity-0"
                >
                  <div class="absolute top-0 right-0 -mr-11 flex pt-4">
                    <button
                      type="button"
                      class="rounded-md text-gray-300 hover:text-white outline-none"
                      @click="open = false"
                    >
                      <span class="sr-only">Close</span>
                      <AppIcon icon="ph:x" class="text-xl" aria-hidden="true" />
                    </button>
                  </div>
                </TransitionChild>
                <div
                  class="flex h-full flex-col overflow-y-scroll bg-white shadow-xl"
                >
                  <div class="relative flex-1 px-4 sm:px-6">
                    <!-- Replace with your content -->
                    <div class="absolute inset-0">
                      <div
                        class="flex gap-x-2 px-5 pt-4 pb-[14px] border-b border-[#F4F4F4]"
                      >
                        <span
                          class="h-10 w-10 rounded-full flex items-center justify-center text-white bg-[#f90] font-semibold"
                          >JD</span
                        >
                        <div>
                          <span
                            class="text-[#333] text-sm font-semibold block capitalize"
                            >John doe</span
                          >
                          <span class="block text-xs text-[#666] mb-3"
                            >johndoe@gmail.com</span
                          >
                          <span
                            class="flex gap-x-1 text-xs text-[#165EF0] font-medium"
                            ><AppIcon
                              icon="octicon:sign-out-16"
                              class="text-sm"
                            />Sign out</span
                          >
                        </div>
                      </div>
                      <div class="px-5 pt-5">
                        <ul class="grid gap-y-5">
                          <li
                            v-for="n in mobileMenu.filter(
                              (i) => i.key !== 'sign-out'
                            )"
                            :key="n.name"
                            class="flex gap-x-3 items-center text-sm font-medium"
                          >
                            <AppIcon :icon="n.icon" /> {{ n.name }}
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
  <ModalsCenterModal
    :isOpen="isSigniningOut"
    @toggleModal="isSigniningOut = false"
    v-if="isSigniningOut"
  >
    <template #content>
      <div
        class="bg-white p-6 lg:p-10 sm:p-6 sm:pb-4 w-[400px] rounded-lg"
        v-if="isSigniningOut"
      >
        <div class="flex justify-between mb-5 items-center">
          <h4 class="font-medium text-matta-black text-xl">Sign Out</h4>
          <i
            class="uil uil-times cursor-pointer text-lg"
            @click="isSigniningOut = false"
          ></i>
        </div>

        <p class="text-sm text-matta-black mb-2">
          Are you sure you want to sign out?
        </p>

        <div class="flex justify-between gap-x-2 items-center mt-8">
          <button
            type="button"
            @click="isSigniningOut = false"
            class="appearance-none border w-1/2 leading-none px-8 py-3 rounded-lg text-matta-black hover:bg-gray-100 text-[13px] uppercase"
          >
            Cancel
          </button>

          <button
            type="button"
            @click="logOut"
            class="appearance-none border w-1/2 border-primary leading-none px-8 py-3 rounded-lg text-white bg-primary hover:opacity-70 text-[13px] uppercase"
          >
            Yes
          </button>
        </div>
      </div>
    </template>
  </ModalsCenterModal>
</template>
<script setup>
import { ref } from "vue";
import {
  Dialog,
  DialogPanel,
  // DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import { mobileMenu } from "~/utils/data";

const isSigniningOut = ref(false);

const open = inject("open");
</script>

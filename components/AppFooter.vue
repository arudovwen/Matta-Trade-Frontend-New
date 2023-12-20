<template>
  <footer class="bg-white darks:bg-gray-800 pt-16 pb-8">
    <div class="rounded-lg container">
      <div
        class="grid text-center lg:text-left grid-cols-1 lg:grid-cols-4 gap-y-8 lg:gap-x-10 lg:pt-8 mb-14"
      >
        <div class="">
          <div class="mb-[15px]" data-aos="fade-up" data-aos-once="true">
            <router-link to="/">
              <img
                src="~/assets/images/logo.png"
                class="w-[132px]"
                alt="Matta"
                width="132"
                height="auto"
              />
            </router-link>
          </div>
          <p
            class="text-sm darks:text-white text-left mb-10"
            data-aos="fade-up"
            data-aos-once="true"
          >
            Matta is your one-stop online marketplace for raw materials ,
            chemicals and supplies.
          </p>
          <div class="flex gap-x-6">
            <a
              target="_blank"
              v-for="s in socials"
              :key="s.title"
              :href="s.link"
              data-aos="fade-up"
              data-aos-once="true"
            >
              <span class="">
                <AppIcon
                  :icon="s.icon"
                  class="cursor-pointer text-[#333]/80 darks:text-white/80 text-[28px]"
              /></span>
            </a>
          </div>
        </div>
        <div
          class="grid md:grid-cols-3 gap-y-8 md:gap-x-10 col-span-3 text-left"
          data-aos="fade-up"
          data-aos-once="true"
        >
          <div v-for="n in navs" :key="n.subject">
            <span class="text-base capitalize text-[#333] darks:text-white font-bold mb-3 block">
              {{ n.subject }}
            </span>
            <ul>
              <li
                v-for="l in n.links"
                :key="l.title"
                class="text-[14px] font-normal capitlize text-[#333]/80 darks:text-white mb-2"
              >
                <a
                  v-if="l.title.toLowerCase() !== 'contact'"
                  :href="l.url"
                  class="hover:underline"
                >
                  {{ l.title }}
                </a>
                <span v-else @click="open = true" class="hover:underline">
                  {{ l.title }}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div
        class="flex flex-col-reverse lg:flex-row gap-4 lg:gap-0 justify-between lg:items-center"
      >
        <div
          class="order-1 md:grid-cols-2 grid gap-y-3 lg:gap-y-6 md:gap-y-0 text-left md:gap-x-4 darks:text-white/80"
        >
          <p class="order-2 lg:order-1 text-sm">
            © {{ new Date().getFullYear() }} Matta. All Rights Reserved.
          </p>
          <div class="order-1 lg:order-2 flex gap-x-2 md:gap-x-4 items-center">
            <router-link to="/policy" class="text-sm md:text-sm"
              >Privacy policy</router-link
            >
            <span class="bg-[#333] darks:text-white/80 w-[2px] h-[2px] rounded-full"></span>
            <router-link to="/terms" class="text-sm md:text-sm"
              >Terms of use</router-link
            >
          </div>
        </div>
      </div>
    </div>
  </footer>
  <ContactForm/>
</template>

<script setup>
import { ref, provide } from "vue";

const open = ref(false);
const navs = [
  {
    subject: "company",
    links: [
      {
        title: "About Us",
        url: "https://corporate.matta.trade/",
      },
      {
        title: "Careers",
        url: "https://corporate.matta.trade/",
      },
      {
        title: "Corporate",
        url: "https://corporate.matta.trade/",
      },
      {
        title: "Contact",
        url: "https://corporate.matta.trade/",
      },
    ],
  },
  {
    subject: "services",
    links: [
      {
        title: "Trade Financing",
        url: "#",
      },
      {
        title: "Cross-Boarder Payments",
        url: "#",
      },
      {
        title: "Suppply Finance",
        url: "#",
      },
  
      {
        title: "Import Finance",
        url: "#",
      },
      {
        title: "Export Finance",
        url: "#",
      },
    ],
  },

  {
    subject: "quick links",
    links: [
  
      {
        title: "Request product",
        url: "/request-product",
      },
      {
        title: "Become a Verified Supplier",
        url: "/vendor-register",
      },
      {
        title: "Partnerships",
        url: "#",
      },
      {
        title: "Become an agent",
        url: "#",
      },
    ],
  },
];

const socials = [
  {
    title: "Facebook",
    icon: "ant-design:facebook-filled",
    link: "https://www.facebook.com/mattatrade",
  },
  {
    title: "Linkedin",
    icon: "akar-icons:linkedin-fill",
    link: "https://www.linkedin.com/company/matta-trade/",
  },

  {
    title: "X",
    icon: "line-md:twitter-x-alt",
    link: "https://twitter.com/matta_trade%60",
  },
  {
    title: "Instagram",
    icon: "fe:instagram",
    link: "https://www.instagram.com/matta.trade/",
  },
];
function togglePopup() {
  open.value = !open.value;
}
provide("open", open);
provide("togglePopup", togglePopup);
</script>

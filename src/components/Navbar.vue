<script setup lang="ts">
import { ref } from "vue";
import type { User } from "@/types/user";
import { useRoute } from "vue-router";
const state = useGlobalState();
const route = useRoute();
const router = useRouter();
let hideMenuAccMenu = ref(true);
const toggleAccMenu = () => {
  hideMenuAccMenu.value = !hideMenuAccMenu.value;
};

const user: User = state.getUser();

const logOut = () => state.logOutUser();

const navigationLinks = router
  .getRoutes()
  .filter((e: { name: string | string[]; } ) => e.name.includes("dashboard"))
  .map((e: { humanName: string; name: string; }) => {
    e.humanName = e.name.replaceAll("-", " ");
    e.humanName = e.humanName.replace('dashboard', '')
    if(e.humanName == '') e.humanName = 'dashboard'
    return e;
  });

</script>
<template>
  <nav
    class="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900 font-mono"
  >
    <div class="container flex flex-wrap justify-between items-center mx-auto">
      <a href="/" class="flex items-center">
        <img
          src="https://avatars.dicebear.com/api/bottts/asdfgh.svg"
          class="mr-3 h-6 sm:h-9"
          alt=" Logo"
        />
        <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white"
          >Domain Manager</span
        >
      </a>
      <div class="flex items-center md:order-2">
        <button
          @click="toggleAccMenu()"
          type="button"
          class="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
          id="user-menu-button"
          aria-expanded="false"
          data-dropdown-toggle="user-dropdown"
          data-dropdown-placement="bottom"
        >
          <span class="sr-only">Open user menu</span>
          <img
            class="w-8 h-8 rounded-full"
            src="https://avatars.dicebear.com/api/pixel-art/asdfg.svg"
            alt="user photo"
          />
        </button>
        <!-- Dropdown menu -->
        <div
          :class="{ hidden: hideMenuAccMenu }"
          class="z-50 my-4 text-base list-none relative"
          id="user-dropdown"
        >
          <div
            class="absolute top-5 right-0 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
          >
            <div class="py-3 px-4">
              <span class="block text-sm text-gray-900 dark:text-white"
                >{{ user.first_name }} {{ user.last_name }}</span
              >
              <span
                class="block text-sm font-medium text-gray-500 truncate dark:text-gray-400"
                >{{ user.email }}</span
              >
            </div>
            <ul class="py-1" aria-labelledby="user-menu-button">
              <li>
                <a
                  href="#"
                  class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >Dashboard</a
                >
              </li>
              <li>
                <a
                  href="#"
                  class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >Settings</a
                >
              </li>

              <li>
                <a
                  href="#"
                  class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  @click="logOut()"
                  >Sign out</a
                >
              </li>
            </ul>
          </div>
        </div>
        <button
          data-collapse-toggle="mobile-menu-2"
          type="button"
          class="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="mobile-menu-2"
          aria-expanded="false"
        >
          <span class="sr-only">Open main menu</span>
          <svg
            class="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </button>
      </div>
      <div
        class="hidden justify-between items-center w-full md:flex md:w-auto md:order-1"
        id="mobile-menu-2"
      >
        <ul
          class="flex flex-col p-4 mt-4 bg-gray-50 rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700"
        >
          <li v-for="link in navigationLinks">
            <a
              :href="link.path"
              :class="{ 'text-blue-700': route.name == link.name }"
              class="block py-2 pr-4 pl-3 rounded md:bg-transparent text-black  md:p-0 capitalize"
              aria-current="page"
              >{{ link.humanName }}
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

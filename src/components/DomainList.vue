<script setup lang="ts">
import type { Domain } from "@/types/domain";
import { ComputedRef } from "vue";

const domains = reactive<{
  data: Domain[];
}>({ data: [] });

const result = reactive<{
  data: Domain[]

}>({ data: []});

const contentLoaded = ref(false);
const loading = ref(false);

const { text, isSupported, copy, copied } = useClipboard();
const currentElement = ref<string | null>("");

const humanizeObject: ComputedRef<Domain> = computed(() => {
  return result.value.map((e) => {
    e.status = new Date(e.expiry) > new Date() ? "Active" : "Expired";
    e.expires = new Date(e.expiry).toLocaleDateString("en-US");
    //hack for copy state :/
    e.domainUId = useId();
    e.domainPId = useId();
    e.hostUId = useId();
    e.hostPId = useId();

    return e;
  });
});

const setCopiedElId = (el: string | null) => (currentElement.value = el);

onMounted(async () => {
  const { error, data } = await getDomains(0, 12);

  if (!data.value || error.value) {
    console.log(error);
  }

  result.value = data?.value?.data;

  contentLoaded.value = true;

  domains.data = humanizeObject;

});

const getDomains = async (skip: Number, take: Number) => {
  return await useApi(`/api/getDomains?skip=${skip}&take=${take}`)
    .get()
    .json<Domain[]>();
};

const deleteDomain = async (id: Number) => {
  if(!id) return;
  loading.value = true;
  const { error, data } = await useApi(`/api/deleteDomain?id=${id}`).delete().json();

  if (!data.value || error.value) {
    console.log(error);
    loading.value = false;
    return;
  }

  const index = domains.data.findIndex((e) => id === e.id);
  domains.data.splice(index, 1);

  loading.value = false;
};
</script>
<template>
  <!-- component -->
  <section class="container mx-auto p-6 font-mono">
    <LoadingSkeleton :loaded="contentLoaded">
      <div class="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
        <div class="w-full overflow-x-auto lg:overflow-hidden md:overflow-hidden">
          <table class="w-full">
            <thead>
              <tr
                class="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600"
              >
                <th class="px-4 py-3 text-sm">Name</th>
                <th class="px-4 py-3 text-sm">Domain Credentials</th>
                <th class="px-4 py-3 text-sm">Host Credentials</th>
                <th class="px-4 py-3 text-sm">Expiry Date</th>
                <th class="px-4 py-3 text-sm">Status</th>
                <th class="px-4 py-3 text-sm">Actions</th>
              </tr>
            </thead>
            <tbody class="bg-white">
              <tr
                class="text-gray-700 border-y-stone-200"
                v-for="domain in domains.data"
                :key="domain.id"
              >
                <td class="px-4 py-3 border">
                  <div class="flex items-center text-sm">
                    <div>
                      <p class="font-semibold text-black">{{ domain.name }}</p>
                    </div>
                  </div>
                </td>
                <td class="px-4 py-3 border justify-center">
                  <div class="flex items-center text-sm">
                    <div class="w-full">
                      <p
                        class="text-black text-xs px-2 py-1 bg-slate-100 rounded-sm"
                        v-show="domain.registrar"
                      >
                        {{ domain.registrar }}
                      </p>
                      <div class="flex gap-2 mt-5 items-center relative">
                        <p class="text-black">{{ domain.domainUsername }}</p>
                        <button
                          @click="
                            copy(domain.domainUsername);
                            setCopiedElId(domain.domainUId);
                          "
                          class="absolute right-0 max-w-xs px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline disabled:cursor-not-allowed disabled:bg-blue-400 text-xs"
                        >
                          <span v-if="currentElement == domain.domainUId">copied!</span>
                          <span v-else>Copy</span>
                        </button>
                      </div>

                      <div class="flex gap-2 my-5 items-center relative">
                        <p class="text-black">********</p>
                        <button
                          @click="
                            copy(domain.domainPassword);
                            setCopiedElId(domain.domainPId);
                          "
                          class="absolute right-0 max-w-xs px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline disabled:cursor-not-allowed disabled:bg-blue-400 text-xs"
                        >
                          <span v-if="currentElement == domain.domainPId">copied!</span>
                          <span v-else>Copy</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </td>
                <td class="px-4 py-3 border justify-center">
                  <span
                    v-show="!domain.hostUsername"
                    class="px-2 py-1 font-semibold rounded-sm bg-red-100 text-red-700 text-xs"
                  >
                    No Login Credentials
                  </span>
                  <div class="flex items-center text-sm" v-show="domain.hostUsername">
                    <div class="w-full">
                      <p
                        class="text-black text-xs px-2 py-1 bg-slate-100 rounded-sm"
                        v-show="domain.host"
                      >
                        {{ domain.host }}
                      </p>
                      <div class="flex gap-2 mt-5 items-center relative">
                        <p class="text-black">{{ domain.hostUsername }}</p>
                        <button
                          @click="
                            copy(domain.hostUsername);
                            setCopiedElId(domain.hostUId);
                          "
                          class="absolute right-0 max-w-xs px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline disabled:cursor-not-allowed disabled:bg-blue-400 text-xs"
                        >
                          <span v-if="currentElement == domain.hostUId">copied!</span>
                          <span v-else>Copy</span>
                        </button>
                      </div>

                      <div class="flex gap-2 my-5 items-center relative">
                        <p class="text-black">********</p>
                        <button
                          @click="
                            copy(domain.hostPassword);
                            setCopiedElId(domain.hostPId);
                          "
                          class="absolute right-0 max-w-xs px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline disabled:cursor-not-allowed disabled:bg-blue-400 text-xs"
                        >
                          <span v-if="currentElement == domain.hostPId">copied!</span>
                          <span v-else>Copy</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </td>

                <td class="px-4 py-3 text-sm border">{{ domain.expires }}</td>
                <td class="px-4 py-3 text-xs border">
                  <span
                    :class="{
                      'bg-red-100 text-red-700': domain.status == 'Expired',
                      'text-green-700 bg-green-100': domain.status == 'Active',
                    }"
                    class="px-2 py-1 font-semibold leading-tight rounded-sm"
                  >
                    {{ domain.status }}
                  </span>
                </td>
                <td class="px-4 py-3 text-sm border">
                  <div class="relative flex items-center flex-col">
                    <button
                      class="max-w-xs px-4 py-2 m-1 w-20 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline disabled:cursor-not-allowed disabled:bg-blue-400 text-xs"
                    >
                      Edit
                    </button>

                    <button
                      @click="deleteDomain(domain.id)"
                      :disabled="loading"
                      class="max-w-xs px-4 py-2 m-1 w-20 font-bold text-white bg-red-500 rounded-full hover:bg-red-700 focus:outline-none focus:shadow-outline disabled:cursor-not-allowed disabled:bg-blue-400 text-xs"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="flex items-center p-4">
          <!-- Previous Button -->
          <a
            href="#"
            class="inline-flex items-center py-2 px-4 mr-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <svg
              aria-hidden="true"
              class="mr-2 w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
            Previous
          </a>
          <a
            href="#"
            class="inline-flex items-center py-2 px-4 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            Next
            <svg
              aria-hidden="true"
              class="ml-2 w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </a>
        </div>
      </div>
    </LoadingSkeleton>
  </section>
</template>

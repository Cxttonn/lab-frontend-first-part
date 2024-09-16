<script setup lang="ts">
import type { Organizer } from '@/types'
import { ref } from 'vue'
import OrganizerService from '@/services/OganizerService'
import { useRouter } from 'vue-router'
import { useMessageStore } from '@/stores/message'

const organizer = ref<Organizer>({
  id: 0,
  organizationName: '',
  address: ''
})

const router = useRouter()
const store = useMessageStore()

function saveOrganizer() {
  OrganizerService.saveOrganizer(organizer.value)
    .then((response) => {
      store.updateMessage('You have successfully added a new organizer: ' + response.data.organizationName)
      setTimeout(() => {
        store.resetMessage()
      }, 3000)
    })
    .catch(() => {
      router.push({ name: 'network-error-view' })
    })
}
</script>

<template>
  <div class="max-w-lg mx-auto p-6 bg-white shadow-md rounded-md">
    <h1 class="text-3xl font-semibold mb-6 text-center">Create an Organizer</h1>
    
    <form @submit.prevent="saveOrganizer" class="space-y-4">
      <!-- Organization Name -->
      <div>
        <label class="block text-lg font-medium text-gray-700">Organization Name</label>
        <input v-model="organizer.organizationName" type="text" placeholder="Organization Name" 
               class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
                      focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
      </div>

      <!-- Address -->
      <div>
        <label class="block text-lg font-medium text-gray-700">Address</label>
        <input v-model="organizer.address" type="text" placeholder="Address" 
               class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
                      focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
      </div>

      <!-- Submit Button -->
      <div>
        <button class="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 
                       transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500">
          Submit
        </button>
      </div>
    </form>
  </div>
</template>

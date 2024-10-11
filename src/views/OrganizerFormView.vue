<script setup lang="ts">
import type { Organizer } from '@/types'
import { ref } from 'vue'
import OrganizerService from '@/services/OganizerService'
import { useRouter } from 'vue-router'
import { useMessageStore } from '@/stores/message'
import ImageUpload from '@/components/ImageUpload.vue'

const organizer = ref<Organizer>({
id: 0,
name: '',
images: [],
roles: []
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
      <div>
        <label class="block text-lg font-medium text-gray-700">Organization Name</label>
        <input v-model="organizer.name" type="text" placeholder="Organization Name" 
               class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
                      focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
      </div>
      <div>
        <h3 class="text-xl font-semibold mb-2">The image of the Organizer</h3>
        <ImageUpload v-model="organizer.images"/>
      </div>
      <div>
        <button class="w-full bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 
                       transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-500">
          Submit
        </button>
      </div>
    </form>
  </div>
</template>

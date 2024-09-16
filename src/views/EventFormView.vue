 <script setup lang="ts">
import type { Event } from '@/types'
import { ref } from 'vue'
import EventService from '@/services/EventService'
import { useRouter } from 'vue-router'
import { useMessageStore } from '@/stores/message'

const event = ref<Event>({
  id: 0,
  category: '',
  title: '',
  description: '',
  location: '',
  date: '',
  time: '',
  petsAllowed: false,
  organizer: ''
})

const router = useRouter()
const store = useMessageStore()

function saveEvent() {
  EventService.saveEvent(event.value)
    .then((response) => {
      router.push({ name: 'event-detail-view', params: { id: response.data.id } })
      store.updateMessage('You have successfully added a new event: ' + response.data.title)
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
    <h1 class="text-3xl font-semibold mb-6 text-center">Create an event</h1>
    
    <form @submit.prevent="saveEvent" class="space-y-4">
      <!-- Category Input -->
      <div>
        <label class="block text-lg font-medium text-gray-700">Category</label>
        <input v-model="event.category" type="text" placeholder="Category" 
               class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
                      focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
      </div>

      <!-- Title and Description -->
      <div>
        <h3 class="text-xl font-semibold mb-2">Name & describe your event</h3>
        <label class="block text-lg font-medium text-gray-700">Title</label>
        <input v-model="event.title" type="text" placeholder="Title" 
               class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
                      focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
      </div>
      
      <div>
        <label class="block text-lg font-medium text-gray-700">Description</label>
        <input v-model="event.description" type="text" placeholder="Description" 
               class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
                      focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
      </div>

      <!-- Location -->
      <div>
        <h3 class="text-xl font-semibold mb-2">Where is your event?</h3>
        <label class="block text-lg font-medium text-gray-700">Location</label>
        <input v-model="event.location" type="text" placeholder="Location" 
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

    <!-- JSON Preview -->
    <pre class="mt-4 bg-gray-100 p-4 rounded-md text-sm">{{ event }}</pre>
  </div>
</template>

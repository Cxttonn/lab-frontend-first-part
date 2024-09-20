 <script setup lang="ts">
import type { Event, Organizer } from '@/types'
import OrganizerService from '@/services/OganizerService'
import { onMounted, ref } from 'vue'
import EventService from '@/services/EventService'
import BaseInput from '@/components/BaseInput.vue'
import { useRouter } from 'vue-router'
import { useMessageStore } from '@/stores/message'
import BaseSelect from '@/components/BaseSelect.vue'


const event = ref<Event>({
  id: 0,
  category: '',
  title: '',
  description: '',
  location: '',
  date: '',
  time: '',
  petsAllowed: false,
  // organizer: ''
  organizer: {
    id: 0,
    name: ''
  }
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

const organizers = ref<Organizer[]>([])
onMounted(() => {
  OrganizerService.getOrganizers()
  .then((response) => {
    organizers.value = response.data
  })
  .catch(() => {
    router.push({name: 'network-error-view'})
  })
})
</script>

<template>
  <div class="max-w-lg mx-auto p-6 bg-white shadow-md rounded-md">
    <h1 class="text-3xl font-semibold mb-6 text-center">Create an event</h1>
    
    <form @submit.prevent="saveEvent" class="space-y-4">
      <div>
        <BaseInput v-model="event.category" type="text" label="Category"/>
      </div>

      <div>
        <h3 class="text-xl font-semibold mb-2">Name & describe your event</h3>
        <BaseInput v-model="event.title" type="text" label="Title"/>
      </div>
      
      <div>
        <BaseInput v-model="event.description" type="text" label="Description"/>
      </div>

      <div>
        <h3 class="text-xl font-semibold mb-2">Where is your event?</h3>
        <BaseInput v-model="event.location" type="text" label="Location"/>
      </div>
    <div>
        <h3 class="text-lg font-semibold mb-2">Who is Your Organizer?</h3>
        <label class="block text-sm font-medium text-gray-700">Select an Organizer</label>
        <BaseSelect v-model="event.organizer.id" :options="organizers" label="Organizer" class="select-field"/>
      </div>

      <div>
        <button class="w-full bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 
                       transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-500">Submit</button>
      </div>
    </form>

    <!-- <pre class="mt-4 bg-gray-100 p-4 rounded-md text-sm">{{ event }}</pre> -->
  </div>
</template>

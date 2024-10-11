<script setup lang="ts">
import { type Event } from '@/types'
defineProps<{
  event: Event
}>()

</script>

<template>
  <RouterLink class="event-link" :to="{ name: 'event-detail-view', params: { id: event?.id } }">
    <div
      class="cursor-pointer border border-gray-600 p-[20px] w-[250px] mb-[18px] hover:scale-101 hover:shadow-sp"
      :aria-label="`Event: ${event?.title || 'No title'} organized by ${event?.organizer?.name || 'Unknown'}`"
    >
      <h2>{{ event?.title || 'No title available' }}</h2>
      <span> by</span>
      <h5>{{ event?.organizer?.name || 'Unknown organizer' }}</h5>
      <span> {{ event?.category || 'Uncategorized' }} @ {{ event?.location || 'Unknown location' }}</span>
    </div>
  </RouterLink>
</template>

<style scoped>
.event-link {
  text-decoration: none;
  color: #2c3e50;
}
</style>

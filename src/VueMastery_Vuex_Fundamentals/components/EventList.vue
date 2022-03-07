<script setup lang="ts">
  import EventCard from "./EventCard.vue";
  import { useEventsStore } from "../store/eventsStore";

  const eventsStore = useEventsStore();
  eventsStore.fetchEvents();

  const events = computed(() => eventsStore.getEvents);
</script>

<template>
  <h1>Events for Good</h1>
  <div class="events">
    <EventCard v-for="event in events" :key="event.id" :event="event" />
  </div>
</template>

<style scoped>
  .events {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>

<script setup lang="ts">
  import { useEventsStore } from "../store/eventsStore";

  const eventsStore = useEventsStore();

  const props = defineProps({
    id: {
      type: String,
      required: true,
    },
  });

  eventsStore.fetchEvent(parseInt(props.id));

  const event = computed(() => eventsStore.getEvent);
</script>

<template>
  <div v-if="event">
    <h1>{{ event.title }}</h1>
    <p>{{ event.time }} on {{ event.date }} @ {{ event.location }}</p>
    <p>{{ event.description }}</p>
  </div>
</template>

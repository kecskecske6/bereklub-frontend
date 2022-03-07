<script setup lang="ts">
  import { useEventsStore } from "../store/eventsStore";
  const eventsStore = useEventsStore();

  const event = computed(() => eventsStore.getEvent);

  if (!event.value) {
    eventsStore.setEvent({
      id: 123456,
      category: "",
      title: "",
      description: "",
      location: "",
      date: "",
      time: "",
      organizer: eventsStore.user,
    });
  }

  const categories: Array<string> = [
    "sustainability",
    "nature",
    "animal welfare",
    "housing",
    "education",
    "food",
    "community",
  ];

  function onSubmit() {
    if (event.value) {
      eventsStore.createEvent(event.value);
    }
  }
</script>

<template>
  <h1>Create an event</h1>
  <div class="form-container">
    <form v-if="event" @submit.prevent="onSubmit">
      <h3>Add id and select category</h3>
      <label>Event id</label>
      <input v-model="event.id" placeholder="Event id" type="text" />
      <label>Category:</label>
      <select v-model="event.category">
        <option
          v-for="option in categories"
          :key="option"
          :selected="option === event.category"
          :value="option"
        >
          {{ option }}
        </option>
      </select>

      <h3>Name & describe your event</h3>

      <label>Title</label>
      <input v-model="event.title" placeholder="Title" type="text" />

      <label>Description</label>
      <input v-model="event.description" placeholder="Description" type="text" />

      <h3>Where is your event?</h3>

      <label>Location</label>
      <input v-model="event.location" placeholder="Location" type="text" />

      <h3>When is your event?</h3>
      <label>Date</label>
      <input v-model="event.date" placeholder="Date" type="text" />

      <label>Time</label>
      <input v-model="event.time" placeholder="Time" type="text" />

      <button type="submit">Submit</button>
      <button type="reset">Reset</button>
    </form>
  </div>
</template>

<style scoped>
  h3 {
    font-size: 25px;
  }

  input {
    width: 100%;
    height: 40px;
    margin-bottom: 20px;
    border: 2px dotted gray;
  }

  label {
    font-size: 20px;
    margin-bottom: 5px;
  }

  select {
    height: 40px;
    font-size: 20px;
    background-color: white;
    cursor: pointer;
    border: 2px dotted gray;
  }

  textarea {
    width: 95%;
    height: 70px;
    padding: 10px;
    font-size: 20px;
    margin-bottom: 20px;
    border: inherit;
  }

  .form-container {
    display: flex;
    flex-direction: column;
    width: 525px;
    padding: 20px;
    margin: auto;
    border: 2px solid #d8d8d8;
    background-color: white;
    -webkit-box-shadow: 0px 2px 15px -12px rgba(0, 0, 0, 0.57);
    -moz-box-shadow: 0px 2px 15px -12px rgba(0, 0, 0, 0.57);
    box-shadow: 2px 15px -12px rgba(0, 0, 0, 0.57);
  }

  button {
    display: inline;
    margin: 30px;
    background-color: #39495c;
    border-radius: 5px;
    font-size: 18px;
    width: 160px;
    height: 60px;
    color: white;
    padding: 20px;
    box-shadow: inset 0 -0.6em 1em -0.35em rgba(0, 0, 0, 0.17),
      inset 0 0.6em 2em -0.3em rgba(255, 255, 255, 0.15),
      inset 0 0 0em 0.05em rgba(255, 255, 255, 0.12);
    text-align: center;
    cursor: pointer;
  }
</style>

<script setup lang="ts"></script>

<template>
  <div id="app">
    <h4>Vue Mastery - Real World Vue 3 course example - composition API (script setup)</h4>
    <div id="nav">
      <router-link :to="{ name: 'EventList' }">Events</router-link>
      <router-link :to="{ name: 'AboutComp' }">About</router-link>
    </div>
    <router-view />
  </div>
</template>

<style scoped>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
  #nav {
    padding: 30px;
  }
  router-link {
    margin: 10px;
  }
  #nav a {
    font-weight: bold;
    color: #2c3e50;
    margin: 5px;
  }
  #nav a.router-link-exact-active {
    color: #42b983;
  }
  h4 {
    font-size: 20px;
  }
</style>

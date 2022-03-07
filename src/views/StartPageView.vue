<script setup lang="ts"></script>
<template>
  <div class="startPage d-flex flex-column text-center justify-center" style="height: 90vh">
    <div class="shade"></div>
    <h1>CooKing</h1>
    <h2>{{ $t("sayingThatMakesPeopleCatchOurRestaurant") }}</h2>
  </div>
</template>
<style scoped>
  .startPage {
    z-index: -1;
    background-image: url("../assets/bg.jpg");
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    position: relative;
  }
  .startPage {
    color: white;
  }
  .shade {
    z-index: -1;
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: black;
    opacity: 0.55;
  }
</style>

<script setup lang="ts"></script>
<template>
  <div class="startPage d-flex flex-column text-center justify-center" style="height: 90vh">
    <div class="shade"></div>
    <img class="logo" src="../assets/logo.png" />
    <h1>
      Coo
      <span>King</span>
    </h1>
    <h3>{{ $t("slogan") }}</h3>
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
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .shade {
    z-index: -1;
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: black;
    opacity: 0.55;
  }
  .logo {
    width: 75px;
    height: 75px;
  }
  h1 span {
    color: #ffd700;
  }
  h3 {
    color: rgb(200, 200, 200);
  }
</style>

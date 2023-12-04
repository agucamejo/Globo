<script setup>
import AboutMe from "./components/AboutMe.vue";
import Navbar from "./components/Navbar.vue";
import ProfileData from "./components/ProfileData.vue";
import Publication from "./components/Publication.vue";
</script>

<template>
  <header class="o-header"><Navbar /></header>
  <section class="o-section"><ProfileData /></section>
  <main class="o-main" ><Publication /></main>
  <aside class="o-aside"><AboutMe /></aside>
</template>



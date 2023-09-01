<script setup lang="ts">


// Page Parts
import Header from './components/page-parts/Header.vue'
import Body from './components/page-parts/Body.vue'
import Footer from './components/page-parts/Footer.vue'
import { ref, computed, type Component } from 'vue'
import NotFound from './components/NotFound.vue'


</script>

<template>
  <div class="page">
    <Header></Header>
    <Body>
      <main>
        <router-view/>
      </main>
    </Body>
  </div>
</template>

<style scoped>
  .page{
    position: absolute;
    top:0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: cyan;
  }
</style>
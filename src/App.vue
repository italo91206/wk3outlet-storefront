<template>
  <main id="app">
    <AppLayout>
      <section>
        <router-view></router-view>
      </section>
    </AppLayout>
  </main>
</template>

<script>
import AppLayout from '@/layouts/AppLayout.vue'

export default {
  name: 'App',
  components: { AppLayout }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>

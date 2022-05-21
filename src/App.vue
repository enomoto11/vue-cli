<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <MemoIndex msg="There are your Notes!"/>
</template>

<script>
import MemoIndex from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    MemoIndex,
}
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

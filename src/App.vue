<template>
<div>
  <router-view></router-view>
</div>
</template>


<script setup lang="ts">
 import { useTestStore } from './store/text';
 const store:any =useTestStore()
  let {testA,testB,testC}  =toRefs(store)

  setTimeout(() => {
    testA='5555'
    console.log('testA: ')
  }, 5000);
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

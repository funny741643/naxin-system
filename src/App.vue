<template>
   <div id='nav'>
    <router-link class="link" to='/home'>Home</router-link> |
    <router-link class="link" to='/user'>User </router-link>
  </div>
  <router-view></router-view>
</template>


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

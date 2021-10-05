<template>
    <div class="login">
        <login-panel></login-panel>
    </div>
</template>

<script>
import loginPanel from './cmps/login-panel.vue'
import loginpanel from './cmps/login-panel.vue'
export default {
  components: { loginPanel },
    component:{
        loginpanel
    }
}
</script>>

<style scoped>
.login{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
}
</style>


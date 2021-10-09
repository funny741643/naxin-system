<template>
  <div class="loginaccout">
    <el-form label-width="60px" :rules="rules" :model="account" ref="formRef">
        <el-form-item label="姓名" prop="admin_name">
            <el-input v-model="account.admin_name"></el-input>
        </el-form-item>
        <el-form-item label="账号" prop="admin_num">
            <el-input v-model="account.admin_num"></el-input>
        </el-form-item>
        <el-form-item label="密码" type="admin_password" prop="admin_password">
            <el-input v-model="account.admin_password" show-password></el-input>
        </el-form-item>
    </el-form>
  </div>
</template>
 
<script>
import { reactive } from '@vue/reactivity'
import {ref} from 'vue'
import localCache from '../../../utils/cache'
import {useStore} from 'vuex'

export default {
    setup(){
        const store = useStore()
        const account = reactive({
            admin_name:'',
            admin_num: localCache.getCache('admin_num')?localCache.getCache('admin_num'):'',
            admin_password: localCache.getCache('admin_password')?localCache.getCache('admin_password'):''
        })
        const formRef = ref()
        const rules = {
            admin_name:[{
                required:true,
                message:'用户名不为空',
                trigger:'blur'
            }],
            admin_num: [{
                required:true,
                message:'账号不为空',
                trigger:'blur'
            },{
                pattern: /^[a-z0-9]{8}$/,
                message:'账号为八位学号',
                trigger:'blur'
            }],
            admin_password: [{
                required:true,
                message:'密码不为空',
                trigger:'blur'
            },{
                pattern: /^[a-z0-9]{3,}$/,
                message:'密码为3位以上',
                trigger:'blur'
            }] 
        }

        const loginAction = (isKeepPassword)=>{
            console.log('account开始登录')
            formRef.value.validate((valid)=>{
                localCache.setCache('admin_name',account.admin_name)
                if(valid){
                    console.log('store.state',store)
                    // 记住密码
                    if(isKeepPassword){
                        localCache.setCache('admin_num',account.admin_num)
                        localCache.setCache('admin_password',account.admin_password)
                    }else{
                        localCache.delate('admin_name')
                        localCache.delate('admin_num')
                        localCache.delate('admin_password')
                    }
                    // 登录验证
                    store.dispatch('accoutLoginAction',{...account})
                    
                    
                }
            })
        }

        return{
            account,
            rules,
            formRef,
            loginAction

        }
    }
}
</script>

<style lang="less" scoped>
.el-form-item{
    display: flex;
}
</style>

<template>
  <div class="background">
    <el-container>
      <accordion></accordion>
      <el-container class="el-container is-vertical">
        <bar></bar>
        <el-main style="height:100vh; background-color: #f5f5f5;">
          <router-view v-if="isRouterAlive"></router-view>
           <!-- <router-link to="/mainly">a</router-link>  -->
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
  import bar from '@/components/navigation-bar.vue' //导航栏
  import accordion from '@/components/accordion.vue' //左拉菜单
  export default {
    name: 'dad-module',
    components: {
      bar,
      accordion,
    },
    provide(){
       return{
         reload:this.reload
       }
    },
    data(){
      return{
        isRouterAlive:true,
      }
    },
    methods:{
      reload(){
        this.isRouterAlive=false;
        this.$nextTick(function(){
          this.isRouterAlive=true
        })
      }
    }

  }
</script>
<style lang="scss">
  .background {
    width: 100%;
    background: url(../assets/logo3.jpg) no-repeat center;
    background-size: cover;
  }
</style>
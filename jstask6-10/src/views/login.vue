<template>
    

  <div class="main">
       <div class="box">
            <form>
                <img src="../assets/logo2.png" class="logo" alt="">
                <input class="number" v-model="text" placeholder="用户名" maxlength="11" type="text" name="firstname"><br>
                <input class="number" v-model="textb" placeholder="密码" type="password" name="pwd">
                <div id="tixing">{{hahah}}</div>
                <div class="sign-in" @click='login()'>登入</div>
            </form>
        </div>
  </div>
</template>

<script>
export default {
    data(){
    return{
        text:'',
        hahah:'',
        textb:''
    }
    },
    methods:{
     login(){
      if(this.text===''||this.textb===''){
            this.hahah='请输入账号'
      }else{
           var _this=this
           this.$ajax.post('/api/a/login',this.qs.stringify({'name':this.text,'pwd':this.textb}),{ //必须要加QS 不然账号密码，是会被拦截的
            headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
           })
           .then(function (response) {
             console.log(response.data);
             console.log(_this)
             _this.$router.push('/mainly') 
            })       
      }
        } 
           }

           }

</script>
<style lang="scss" scoped>
.main{
     display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    background: url(../assets/logo1.jpg);
    background-size: 100% 100%;
    background-repeat: no-repeat;
}

.box {
    position: relative;
    display:flex;
    justify-content: center;
    align-items: center;
    width: 350px;
    height: 240px;
    background-color: rgba(255,255,255,0.5);
}
.number{
    border: 1px solid cornflowerblue;
    width: 16rem;
    height: 30px;
    border-radius: 4px;
    margin-bottom: 10px;
}
.sign-in{
    text-align: center;
    border-radius: 3px;
    margin-top: 7px;
    padding: 5px 0;
    color: #fff;
    background-color: cornflowerblue;
}
.logo{
    width: 36px;
    position: absolute;
    top: -30px;
    left: 155px;
}
</style>

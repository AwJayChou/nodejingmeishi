<template>
  <!--页面主体-->
  <div class="login_box">
    <div class="container">
      <div class="login">
        <h2>用户登录</h2>
        <dl class="clearfloat">
          <dt><span class="tips" id="uname_prompt_text"></span>用户名：</dt>
          <dd>
            <input type="text"
                   v-model="uname" @change="unameCheck"
                   id="uname" placeholder="用户名/手机号"/>
            <em class="icon_user"></em>
            <i class="icon_error" id="uname_prompt_icon"></i>
          </dd>
        </dl>
        <dl>
          <dt><span class="tips" id="pwd_prompt_text">请输入密码</span>密码：</dt>
          <dd>
            <input type="password" id="pwd"
                   v-model="upwd"  @change="pwdCheck"
                   placeholder="密码"/>
            <em class="icon_pwd"></em>
            <i class="icon_error" id="pwd_prompt_icon"></i>
          </dd>
        </dl>
        <p><label>
          <input type="checkbox"/>
          <span>自动登录</span>
        </label></p>
        <button type="button" id="login" @click="login">立 即 登 录</button>
      </div>
    </div>
  </div>
</template>

<script>
  import $ from "jquery"
  function unameCheck(){
    var uname= $.trim($("#uname").val());
    if(!uname){//用户名为空的时候
      $("#uname_prompt_text").show().text("用户名不能为空");
      $("#uname_prompt_icon").show();
      return false;
    }else{
      $("#uname_prompt_text").hide();
      $("#uname_prompt_icon").hide();
      return true;
    }
  }
  function pwdCheck(){
    var pwd= $.trim($("#pwd").val());
    if(!pwd){//密码为空的时候
      $("#pwd_prompt_text").show().text("用户名不能为空");
      $("#pwd_prompt_icon").show();
      return false;
    }else{
      $("#pwd_prompt_text").hide();
      $("#pwd_prompt_icon").hide();
      return true;
    }
  }
  // window.onload =function(){
  //   unameCheck();
  //   pwdCheck();
  // }
export default {
   data(){
     return {
       uname:'',
       upwd:'',
       res:{},
       islogin:false
     }
   },

  methods:{
    pwdCheck(){
      var pwd= $.trim($("#pwd").val());
      if(!pwd){//密码为空的时候
        $("#pwd_prompt_text").show().text("用户名不能为空");
        $("#pwd_prompt_icon").show();
        return false;
      }else{
        $("#pwd_prompt_text").hide();
        $("#pwd_prompt_icon").hide();
        return true;
      }
    },
    unameCheck(){
      var uname= $.trim($("#uname").val());
      if(!uname){//用户名为空的时候
        $("#uname_prompt_text").show().text("用户名不能为空");
        $("#uname_prompt_icon").show();
        return false;
      }else{
        $("#uname_prompt_text").hide();
        $("#uname_prompt_icon").hide();
        return true;
      }
    },
     login(){
       let uname = this.uname;
       let upwd = this.upwd;
       //console.log(uname)
       //console.log(upwd)
       if(uname&&upwd){
         let url = 'http://127.0.0.1:1997/user/login?unameOrPhone='+uname+'&upwd='+upwd;
         this.$http.get(url).then(res=>{
           console.log(res)
           if(res.body.code==1){
             window.alert('登录成功，如未能出现登录状态，请刷新页面')
             this.res=res.body;
             //session保存用户信息
             this.$router.push('/');
             //this.reload()
             sessionStorage.setItem('uname',this.res.uname)
             sessionStorage.setItem('uid',this.res.uid)
           }else{
             window.alert('用户名或密码错误')
           }

         })
       }

     }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

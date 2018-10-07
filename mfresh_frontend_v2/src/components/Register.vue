<template>
  <!--页面主体-->
  <div class="register">
    <h2>新用户注册</h2>
    <ul>
      <li>
        <span>用户：</span>
        <input type="text" id="uname"
               v-model="user.uname"  @change=""
               placeholder="请输入用户名"/>
        <em></em>
        <i></i>
      </li>
      <li>
        <span>密码：</span>
        <input type="password" id="upwd"
               v-model="user.upwd"
              @change="pwdCheck"
               placeholder="请输入密码"/>
        <em></em>
        <i></i>
      </li>
      <li>
        <span>重复密码：</span>
        <input type="password" id="upwd2" placeholder="请重复输入密码"
           v-model="user.upwd1"
               value="123"
        />
        <em></em>
        <i></i>
      </li>
      <li>
        <span>手机号：</span>
        <input type="text" id="phone"
               v-model="user.phone"
               @change="phoneCheck"
               placeholder="请输入手机号"/>
        <em></em>
        <i></i>
      </li>
      <li>
        <span>验证码：</span>
        <input type="text" class="inp_yzm"
               v-model="user.code"
               value="w3e5"
               placeholder="请输入验证码"/>
        <img src="../assets/images/yzm.png" alt=""/>
        <strong class="icon_refresh"></strong>
      </li>
      <li class="li_checkbox"><label>
        <input type="checkbox" checked/>
        <span>我已阅读并同意用户注册协议</span>
      </label>
      </li>
      <li class="li_btn">
        <button type="button" @click="register">提交注册</button>
      </li>
    </ul>
  </div>
</template>

<script>
  import $ from 'jquery'
  //验证邮箱
  function emailCheck(){
    var uname= $.trim($("#uname").val());
    var regEmail= /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    if(!uname){//邮箱为空时
      $("#uname").siblings("em").show().attr("class","icon_error");
      $("#uname").siblings("i").show().text("请输入您的注册邮箱");
      return false;
    }else if(!regEmail.test(uname)){
      $("#uname").siblings("em").show().attr("class","icon_error");
      $("#uname").siblings("i").show().text("请输入正确的邮箱格式");
      return false;
    }else if(emailExist(uname)){
      $("#uname").siblings("em").show().attr("class","icon_error");
      $("#uname").siblings("i").show().text("此邮箱已被其他用户注册");
      return false;
    }else{
      $("#uname").siblings("em").show().attr("class","icon_ok");
      $("#uname").siblings("i").hide();
      return true;
    }
  }
  //验证密码
  function pwdCheck(){
    var pwdSize= $.trim($("#upwd").val()).length;
    if(!pwdSize){//邮箱为空时
      $("#upwd").siblings("em").show().attr("class","icon_error");
      $("#upwd").siblings("i").show().text("请输入您的密码");
      return false;
    }else if(pwdSize<6||pwdSize>12){
      $("#upwd").siblings("em").show().attr("class","icon_error");
      $("#upwd").siblings("i").show().text("密码长度应为6~12个字符之间");
      return false;
    }else{
      $("#upwd").siblings("em").show().attr("class","icon_ok");
      $("#upwd").siblings("i").hide();
      return true;
    }
  }
  //验证手机号
  function phoneCheck(){
    var phone= $.trim($("#phone").val());
    var regPhone= /^(13[0-9]|15[0-9]|18[0-9]])\d{8}$/;
    if(!phone){
      $("#phone").siblings("em").show().attr("class","icon_error");
      $("#phone").siblings("i").show().text("请填写您的手机号");
      return false;
    }else if(!regPhone.test(phone)){
      $("#phone").siblings("em").show().attr("class","icon_error");
      $("#phone").siblings("i").show().text("请输入正确的手机号码");
      return false;
    }else if(phoneExist(phone)){
      $("#phone").siblings("em").show().attr("class","icon_error");
      $("#phone").siblings("i").show().text("此手机号已被其他用户绑定");
      return false;
    }else{
      $("#phone").siblings("em").show().attr("class","icon_ok");
      $("#phone").siblings("i").hide();
      return true;
    }
  }
  // window.onload=function(){
  //   emailCheck();
  //   pwdCheck();
  //   phoneCheck()
  // }
export default {
   data(){
     return {
       user:{
         upwd:'',
         upwd1:'',
         phone:'',
         code:"",
         uname:''
       },
       checkphone:false,
       checkuname:false
     }
   },

  mounted(){

  },
  methods:{
    pwdCheck(){
      var pwdSize= $.trim($("#upwd").val()).length;
      if(!pwdSize){//邮箱为空时
        $("#upwd").siblings("em").show().attr("class","icon_error");
        $("#upwd").siblings("i").show().text("请输入您的密码");
        return false;
      }else if(pwdSize<6||pwdSize>12){
        $("#upwd").siblings("em").show().attr("class","icon_error");
        $("#upwd").siblings("i").show().text("密码长度应为6~12个字符之间");
        return false;
      }else{
        $("#upwd").siblings("em").show().attr("class","icon_ok");
        $("#upwd").siblings("i").hide();
        return true;
      }
    },
    phoneCheck(){
      var phone= $.trim($("#phone").val());
      var regPhone= /^(13[0-9]|15[0-9]|18[0-9]])\d{8}$/;
      if(!phone){
        $("#phone").siblings("em").show().attr("class","icon_error");
        $("#phone").siblings("i").show().text("请填写您的手机号");
        return false;
      }else if(!regPhone.test(phone)){
        $("#phone").siblings("em").show().attr("class","icon_error");
        $("#phone").siblings("i").show().text("请输入正确的手机号码");
        return false;
      }else if(phoneExist(phone)){
        $("#phone").siblings("em").show().attr("class","icon_error");
        $("#phone").siblings("i").show().text("此手机号已被其他用户绑定");
        return false;
      }else{
        $("#phone").siblings("em").show().attr("class","icon_ok");
        $("#phone").siblings("i").hide();
        return true;
      }
    },
     register(){
       // console.log(this.user)
       // //验证电话重复
       // if(this.user.phone){
       //   let url = 'http://127.0.0.1:1997/user/checkphone?phone='+this.user.phone;
       //   this.$http.get(url)
       //     .then(res=>{
       //       console.log(res  )
       //       if(res.body.code==2){
       //         this.checkphone=true
       //       }
       //     })
       // }
       //
       //
       // //验证邮箱
       // if(this.user.uname){
       //   let url = 'http://127.0.0.1:1997/user/checkuname?uname='+this.user.uname;
       //   this.$http.get(url)
       //     .then(res=>{
       //       console.log(res)
       //       if(res.body.code==2){
       //         this.checkuname=true
       //       }
       //     })
       // }
       // 完成注册
       // console.log(this.checkuname,this.checkphone)
          if(this.uname&&this.upwd&&this.phone){
             let url= 'http://127.0.0.1:1997/user/register?uname='+this.user.uname+'&upwd='+this.user.upwd+'&phone='+this.user.phone;
             let params={
               uname:this.user.uname,
               upwd:this.user.upwd,
               phone:this.user.phone
             };
             console.log(this.user.uname,this.user.upwd);
             this.$http.get(url).
                then(res=>{
                  console.log(res)
               if(res.body.code==1){
                 window.alert('注册成功！')
                 this.$router.push('/login')
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

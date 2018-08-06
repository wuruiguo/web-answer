<template>
    <div class="login">
        <div class="welcome"><img src="../assets/welcome.png"></div>
        <div class="login-form">
            <div class="login-inp"><label>手&nbsp;机&nbsp;号</label><input type="text" v-model="LoginData.Phone" maxlength="11" ref="chatpannel"></div>
            <div class="login-inp"><label>密&nbsp;&nbsp;&nbsp;&nbsp;码</label><input type="password" v-model="LoginData.UserPwd" ref="chatpannel"></div>
            <div class="login-inp"><label>口&nbsp;&nbsp;&nbsp;&nbsp;令</label><input type="password" v-model="LoginData.publicPwd" ref="chatpannel"></div>
            <div class="login-inp loginbtn" @click="postUserLogin()"><a href="javascript:void(0)">立即登录</a></div>
        </div>
        <div class="login-txt"><router-link to="/register">前往注册</router-link><router-link to="/setpwd">|&nbsp;管理员设定</router-link></div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                LoginData:{
                    UserPwd:'',
                    Phone:'',
                    publicPwd:''
                }
            }
        },
        created() {
        },
        methods: {
            async postUserLogin(){
                let myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
                if(this.LoginData.UserPwd =='' || this.LoginData.Phone =='' || this.LoginData.publicPwd ==''){
                    this.$Message.error('登录信息不能为空！');
                }else if(!myreg.test(this.LoginData.Phone)){
                    this.$Message.error('不是有效的手机号！');
                }else{
                    let {Data,ErrorCode,ErrorMessage} = await this.$http.Userlogin(this.LoginData);
                    if(ErrorCode == 1){
                        sessionStorage.setItem('userPower',Data.UserPower);
                        sessionStorage.setItem('userName',Data.UserName);
                        sessionStorage.setItem('userId',Data.ID);
                        this.$router.push('/');
                    }else{
                        this.$Message.error(ErrorMessage);
                    }
                }
            }
            /*focus(){
                let _this = this;
                setTimeout(function(){  
                    document.getElementsByTagName('body')[0].style.height = window.innerHeight+'px';  
                },200);
            }*/
        },
        computed: {},
        mounted() {
        }
    }
</script>
<style scoped>
    @import "../css/skin.css";
</style>
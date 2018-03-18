<template>
    <div class="login">
        <div class="welcome" style="margin:20% 0;">欢迎注册心理测评系统</div>
        <div class="login-form">
        	<div class="login-inp"><label>姓&nbsp;&nbsp;&nbsp;&nbsp;名</label><input type="text" placeholder="" v-model="RegisterData.UserName" ref="chatpannel" @focus="focus"></div>
            <div class="login-inp"><label>手&nbsp;机&nbsp;号</label><input type="text" placeholder="" v-model="RegisterData.Phone" maxlength="11" ref="chatpannel" @focus="focus"></div>
            <div class="login-inp"><label>密&nbsp;&nbsp;&nbsp;&nbsp;码</label><input type="password" placeholder="" v-model="RegisterData.UserPwd" ref="chatpannel" @focus="focus"></div>
            <div class="login-inp"><label>确认密码</label><input type="password" placeholder=""  v-model="confirmUserPwd" ref="chatpannel" @focus="focus"></div>
            <div class="login-inp loginbtn" @click="postRegisterUser()"><a href="javascript:void(0)">立即注册</a></div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
            	RegisterData:{
            		UserName:'',
            		UserPwd:'',
            		Phone:''
            	},
                LoginData:{
                    UserPwd:'',
                    Phone:''
                },
            	confirmUserPwd:''
            }
        },
        created() {
        },
        methods: {
        	async postRegisterUser(){
        		let myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
        		if(this.RegisterData.UserName =='' || this.RegisterData.UserPwd =='' || this.RegisterData.Phone ==''){
        			this.$Message.error('注册信息不能为空！');
        		}else if(!myreg.test(this.RegisterData.Phone)){
        			this.$Message.error('不是有效的手机号！');
        		}else if(this.RegisterData.UserPwd !== this.confirmUserPwd){
        			this.$Message.error('确认密码不一致！');
        		}else{
        			let {Data,ErrorCode,ErrorMessage} = await this.$http.registerUser(this.RegisterData);
        			if(ErrorCode == 1){
                        sessionStorage.setItem('userPower',Data.UserPower);
                        this.$router.push('/');
        			}else{
        				this.$Message.error(ErrorMessage);
        			}
        		}
        	},
            focus(){
                let _this = this;
                setTimeout(function(){  
                    document.getElementsByTagName('body')[0].style.height = window.innerHeight+'px';  
                },20);
            }
        },
        computed: {},
        mounted() {
        }
    }
</script>
<style scoped>
    @import "../css/skin.css";
</style>
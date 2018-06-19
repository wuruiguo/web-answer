<template>
    <div class="login">
        <div class="welcome" style="padding:20% 0">管理员设定</div>
        <div class="login-form">
            <div class="login-inp"><label>手&nbsp;机&nbsp;号</label><input type="text" placeholder="" v-model="SetPwdData.Phone" maxlength="11" ref="chatpannel"></div>
            <div class="login-inp"><label>密&nbsp;&nbsp;&nbsp;&nbsp;码</label><input type="password" placeholder="" v-model="SetPwdData.UserPwd" ref="chatpannel"></div>
            <div class="login-inp"><label>新&nbsp;密&nbsp;码</label><input type="password" placeholder="" v-model="SetPwdData.publicPwd" ref="chatpannel"></div>
            <div class="login-inp"><label>确认密码</label><input type="password" placeholder=""  v-model="confirmUserPwd" ref="chatpannel"></div>
            <div class="login-inp loginbtn" @click="postSetUserPassword()"><a href="javascript:void(0)">确认修改</a></div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
            	SetPwdData:{
            		Phone:'',
            		UserPwd:'',
            		publicPwd:''
            	},
            	confirmUserPwd:''
            }
        },
        created() {
        },
        methods: {
        	async postSetUserPassword(){
        		let myreg=/^[1][3,4,5,7,8,9][0-9]{9}$/;
        		if(this.SetPwdData.Phone =='' || this.SetPwdData.UserPwd =='' || this.SetPwdData.publicPwd ==''){
        			this.$Message.error('修改信息不能为空！');
        		}else if(!myreg.test(this.SetPwdData.Phone)){
        			this.$Message.error('不是有效的手机号！');
        		}else if(this.SetPwdData.publicPwd !== this.confirmUserPwd){
        			this.$Message.error('确认密码不一致！');
        		}else{
        			let {Data,ErrorCode,ErrorMessage} = await this.$http.setUserPassword(this.SetPwdData);
        			if(ErrorCode == 1){
        				this.$Message.success(ErrorMessage);
                        this.$router.push('/login');
        			}else{
        				this.$Message.error(ErrorMessage);
        			}
        		}
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
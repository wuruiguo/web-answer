<template>
    <div>
        <div class="box">
			<div class="listR">
				<ul>
					<li v-for="userDatalist in userDataList" @click="storageTypeComment(userDatalist.StypeName)">
						<router-link :to="'/userscore/'+userDatalist.SpecialID">
							<div>分类：心理健康类</div>
							<div>测评得分：{{userDatalist.TotalScore}}</div>
							<div>题目：{{userDatalist.StypeName}}</div>
							<div>测评时间：{{userDatalist.AddTime | formatDate}}</div>
						</router-link>
					</li>
				</ul>
			</div>
        </div>
        <div class="footmenu">
            <router-link to="/">测评</router-link>
            <router-link to="/answerlist">我的</router-link>
        </div>
    </div>
</template>
<script>
	import {formatDate} from '../common/date.js';
    export default {
        data() {
            return {
            	userData:{
        			 Userid:sessionStorage.getItem('userId')
        		},
            	userDataList:[]
            }
        },
        created() {
        	this.getUserDataList();
        },
        methods: {
        	async getUserDataList(){
        		let {Data} = await this.$http.getUserList(this.userData)
        		this.userDataList = Data;
        	},
            storageTypeComment(typename){
                sessionStorage.setItem('typeName',typename);
            }
        },
        computed: {},
        mounted() {
        },
        filters: {
		    formatDate(time) {
		      var date = new Date(time);
		      return formatDate(date, 'yyyy-MM-dd');
		    }
		}
    }
</script>
<style scoped>
	.box{
		display: flex;
		flex-direction: row;
		position: absolute;
	    bottom: 0;
	    overflow: hidden;
	    width: 100%;
	    height: 100%;
        padding-bottom: 40px;
	}
	.listR{
		flex: 1;
		overflow-x: hidden;
    	overflow-y: auto;
    	background: #fff;
    	padding: 0 16px;
	}
	.listR li{
		border-bottom: 1px solid #e9e9e9;
		font-size: 1.2em;
		color: #4a4a4a;
		display: flex;
		flex-direction: row;
	}
	.listR li a{
		padding: 15px 0;
		display: block;
		color: #666;
		flex: 1;
	}
	.listR li a div{
		float: left;
		width: 50%;
		line-height: 28px;
	}
</style>
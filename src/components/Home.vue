<template>
    <div>
        <div class="box">
          <div class="listL" :style="userType == 0?'padding-bottom: 40px':''">
          	<ul>
          		<li v-for="(maxlist,index) in maxTypeList" @click="getSubjectList(maxlist.MaxID,index)" :class="{'active':index==activeIndex}"><div id="triangle-right"></div>{{maxlist.MaxName}}</li>
          	</ul>
          </div>
          <div class="listR" :style="userType == 0?'padding-bottom: 40px':''">
          	<ul>
          		<li v-for="subjectlist in SubjectList" @click="storageTypeComment(subjectlist.TypeComment,subjectlist.TypeName)"><router-link :to="userType==1?'/scorelist/'+subjectlist.StypeID:'/answer/'+subjectlist.StypeID">{{subjectlist.TypeName}}</router-link></li>
          	</ul>
          </div>
        </div>
        <div class="footmenu" v-if="userType == 0">
            <router-link to="/">测评</router-link>
            <router-link to="/answerlist">我的</router-link>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
            	activeIndex:0,
            	maxTypeData:{
        			pageNumber: 1,
        			pageSize: 20
        		},
            	maxTypeList:[],
            	SubjectList:[],
                userType:''
            }
        },
        created() {
        	this.getMaxList();
        },
        methods: {
        	async getMaxList(){
        		let {Data} = await this.$http.getMaxTypePage(this.maxTypeData)
        		this.maxTypeList = Data;
        		await this.getSubjectList(Data[0].MaxID,0);
        	},
        	async getSubjectList(maxid,index){
        		this.activeIndex = index;
        		let subjectTypeData = {
            		pageNumber: 1,
            		pageSize: 20,
            		id:maxid
            	};
        		let {Data} = await this.$http.getSubjectTypePages(subjectTypeData)
                this.SubjectList = Data;
        	},
        	storageTypeComment(typecomment,typename){
        		sessionStorage.setItem('typeComment',typecomment);
                sessionStorage.setItem('typeName',typename);
        	}
        },
        computed: {},
        mounted() {
            setTimeout(() => {
                this.userType = sessionStorage.getItem('userPower');
            },100);
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
	}
	.listL{
		width: 120px;
		background: #f1f1f1;
		height: 100%;
		box-shadow:-2px 0px 2px #dcdcdc inset;
        overflow-x: hidden;
        overflow-y: auto;
	}
	.listL li{
		font-size: 1.2em;
		color: #4a4a4a;
		padding: 15px 0 15px 16px;
		position: relative;
	}
	.listL li.active{
		padding-left: 12px;
		color: #5fb7dd;
		border-left: 4px solid #5fb7dd;
		background: #fff;
	}
	#triangle-right{
		position: absolute;
		width: 0; 
		height: 0; 
		border-top: 6px solid transparent; 
		border-left: 6px solid #5fb7dd; 
		border-bottom: 6px solid transparent;
		left: -1px;
		top:50%;
		display: none;
		margin-top: -6px;
	}
	.listL li.active #triangle-right{
		display: block;
	}
	.listR{
		flex: 1;
		overflow-x: hidden;
    	overflow-y: auto;
    	background: #fff;
    	padding: 0 10px;
	}
	.listR li{
		border-bottom: 1px solid #e9e9e9;
		font-size: 1.2em;
		color: #4a4a4a;
	}
	.listR li a{
		padding: 15px 0;
		display: block;
		color: #666;
	}
</style>
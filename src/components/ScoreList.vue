<template>
    <div class="answer">
    	<div class="answertitle">{{getTypeName}}测评结果</div>
    	<div class="answertext">
    		<div class="answerlist" v-for="subjectList in SubjectList">
    			<h3>姓名：{{subjectList.UserNick}}</h3>
                <span class="listfont">第一次得分：</span>
    			<span>总分：{{subjectList.Score}}</span>
                <span v-if="$route.params.stypeId == 3">阳性：{{subjectList.yangxing1}}</span>
                <span v-if="$route.params.stypeId == 3">因子分：{{subjectList.yinzi1}}</span>
                <span class="listfont" v-if="subjectList.Score2 != 0">第二次得分：</span>
    			<span v-if="subjectList.Score2 != 0">总分：：{{subjectList.Score2}}</span>
    			<span v-if="$route.params.stypeId == 3 && subjectList.Score2 != 0">阳性：{{subjectList.yangxing2}}</span>
                <span v-if="$route.params.stypeId == 3 && subjectList.Score2 != 0">因子分：{{subjectList.yinzi2}}</span>
    		</div>
    	</div>
    	<div class="answerbtn"><router-link to="/">返回列表</router-link></div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
            	SubjectList:[],
            	subjectTypeData:{
            		StypeID:this.$route.params.stypeId
            	},
                getTypeName:''
            }
        },
        created() {
        	this.getUserCommentData();
        },
        methods: {
        	async getUserCommentData(){
        		let {Data} = await this.$http.getUserSnameTable(this.subjectTypeData)
                this.SubjectList = Data;
        	}
        },
        computed: {},
        mounted() {
        	setTimeout(() => {
                this.getTypeName = sessionStorage.getItem('typeName');
            },100);
        }
    }
</script>
<style scoped>
	.answer{
		position: absolute;
		width: 100%;
		height: 100%;
		background: url(../assets/bg.png);
		overflow-y:auto;
	}
	.answertitle{
		margin-top: 10%;
		text-align: center;
		font-size: 1.5em;
		color: #000;
		font-weight: bold;
	}
    .answertext{
    	font-size: 14px;
	    line-height: 28px;
	    margin: 0 5%;
	    margin-top: 6%;
	    color: #000;
	    background: #fff;
	    border-radius: 8px;
	    padding: 10px 20px;
	    min-height: 400px;
    }
    .answerlist{
    	border-bottom: 1px solid #e9e9e9;
    	padding-bottom: 10px;
    	margin-bottom: 10px;
    	display: flex;
    	flex-direction: column;
    }
    .answerlist h3{
        font-weight: bold;
    }
    .answerlist span{
    	flex: 1
    }
    .answerlist .listfont{
        font-weight: bold;
    }
	.answerbtn{
    	width: 100%;
    	text-align: center;
    	margin: 40px 0;
    }
    .answerbtn a{
    	text-align: center;
    	width: 140px;
    	height: 40px;
    	line-height: 40px;
    	background: #2fb8e2;
    	color: #fff;
    	display: block;
    	margin: 0 auto;
    	border-radius: 5px;
    	font-size: 1.2em;
    }
</style>
<template>
    <div class="answer">
    	<div class="answertitle">{{getTypeName}}测评结果</div>
    	<div class="answertext">
    		<p>尊敬的{{getUserName}}：</p>
    		<div v-html="userComment.SContent" class="usercomment"></div>
    	</div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
            	userComment:'',
            	userUserSingleData:{
            		id:this.$route.params.specialId
            	},
                getTypeName:'',
                getUserName:''
            }
        },
        created() {
        	this.getUserSingleData();
        },
        methods: {
        	async getUserSingleData(){
        		let {Data} = await this.$http.getUserSingle(this.userUserSingleData)
        		this.userComment = Data;
        	}
        },
        computed: {},
        mounted() {
        	setTimeout(() => {
                this.getTypeName = sessionStorage.getItem('typeName');
                this.getUserName = sessionStorage.getItem('userName');
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
    	font-size: 1.2em;
	    line-height: 2.2em;
	    margin: 0 5%;
	    margin-top: 6%;
	    color: #000;
	    background: #fff;
	    border-radius: 8px;
	    padding: 20px;
	    min-height: 400px;
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
<template>
    <div class="list">
        <div class="listtitle">测评答题：</div>
    	<swiper :options="swiperOption">
		    <swiper-slide v-for="(slide,index) in swiperSlides" :key="index">
		    	<div class="listcont">
			    	<div class="answertitle">
			    		{{index+1}}、{{slide.Sname}}
			    	</div>
			    	<div class="answerda">
			    		<label v-for="sanswerlist in JSON.parse(slide.Sanswer)"><input type="radio" :name="'radio'+index" @click.stop="choiceAnswer(slide.Sid,slide.StypeID,slide.Comment,sanswerlist.Number,sanswerlist.Score)">{{sanswerlist.Number}}、{{sanswerlist.Content}}</label>
			    	</div>
		    	</div>
			</swiper-slide>
			
		</swiper>
		<div class="swiper-button-prev" slot="button-prev">上一题</div>
    	<div class="swiper-button-next" slot="button-next">下一题</div>
    	<div class="submitbtn" @click="submitData()">提交答案</div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
            	swiperOption: {
            		navigation: {
			          nextEl: '.swiper-button-next',
			          prevEl: '.swiper-button-prev'
			        }
		        },
		        swiperSlides: [],
		        SnamePagesData:{
        			pageNumber: "1",
        			pageSize: "100",
        			id:this.$route.params.stypeId
        		},
        		AnswerList:{
        			Sid:0,
        			AnswerComment:"",
        			Score:0,
        			StypeID:0,
        			EvaluatingMsg:''
        		},
        		submitAnswerList:[],
        		aryLength:''
            }
        },
        created() {
        	this.getSnamePagesList();
        },
        methods: {
        	async getSnamePagesList(){
        		let {Data} = await this.$http.getSnamePages(this.SnamePagesData)
        		this.swiperSlides = Data;
        		this.aryLength = Data.length;
        	},
        	choiceAnswer(Sid,StypeID,Comment,AnswerComment,Score){
        		this.AnswerList = {
        			Sid:Sid,
        			AnswerComment:AnswerComment,
        			Score:Score,
        			StypeID:StypeID,
        			EvaluatingMsg:Comment
        		}
        		this.submitAnswerList.push(this.AnswerList);
        		var hash = {};
				this.submitAnswerList = this.submitAnswerList.reduce(function(item, next) {
				    hash[next.Sid] ? item.pop() && item.push(next) : hash[next.Sid] = true && item.push(next);
				    return item
				}, [])
        	},
        	async submitData(){
        		if(this.submitAnswerList.length === this.aryLength){
        			let {ErrorCode,ErrorMessage} = await this.$http.SubmitSname(this.submitAnswerList);
        			if(ErrorCode === 1){
                        this.$router.push('/score/'+this.$route.params.stypeId);
                    }else{
                        this.$Message.error(ErrorMessage);
                    }
        		}else{
        			this.$Message.error('请答完题后提交');
        		}
        	}
        },
        computed: {},
        mounted() {
        },
        components: {
	  	}
    }
</script>
<style scoped>
    .list{
    	padding: 30px 20px;
    	position: relative;
    }
    .listtitle{
		font-size: 16px;
		color: #333;
		font-weight: bold;
		margin:20px 0 40px 0;
    }
    .answertitle{
    	margin-top: 30px;
    	color: #333;
    	font-size: 1.2em;
    }
    .answerda{
    	margin-top: 20px;
    	background: #fff;
    	border-radius: 5px;
    }
    .answerda label{
    	display: block;
    	font-size: 14px;
    	border-bottom: 1px solid #ccc;
    	padding: 15px 10px;
    }
    .answerda label input{
    	margin-right: 10px;
    }
    .swiper-button-prev,.swiper-button-next{
		top:100%;
		width: 100px;
		height: 30px;
		line-height: 30px;
		background: #2fb8e2;
		text-align: center;
		color: #fff;
		font-weight: bold;
		border-radius: 5px;
    }
    .swiper-container{
    	min-height: 350px;
    }
    .swiper-button-prev{
		left: 30px;
    }
    .swiper-button-next{
		right: 30px;
    }
    .submitbtn{
    	position: fixed;
    	left: 0;
    	bottom: 0;
    	width: 100%;
    	height: 50px;
		line-height: 50px;
		color: #fff;
		font-weight: bold;
    	background: #2fb8e2;
    	text-align: center;
    	font-size: 16px;
    }
</style>
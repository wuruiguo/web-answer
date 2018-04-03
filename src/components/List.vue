<template>
    <div class="list">
        <div class="listtitle">测评答题：</div>
        <div class="typename">{{getTypeName}}</div>
    	<swiper :options="swiperOption" ref="vueSwiper">
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
		<div @click="prevto()" class="button-prev" :class="prevclasss?'buttonactive':''">上一题</div>
		<div @click="nextto()" class="button-next" :class="nevtclasss?'buttonactive':''">下一题</div>
    	<div class="submitbtn" @click="submitData()" v-show="isSubmitBtn == true">提交答案</div>    	<div class="submitbtn" v-show="isSubmitBtn == false">题目：{{SnameNumber}}/{{totalCount}}</div>
    </div>
</template>
<script>
    export default {
        data(_this) {
            return {
            	swiperOption: {
            		navigation: {
			          nextEl: '.swiper-button-next',
			          prevEl: '.swiper-button-prev'
			        },
			        touchRatio: 0.5,
                    autoHeight: true, //高度随内容变化
			        on:{
					    slideChange:function(){
					    	_this.SnameNumber = this.activeIndex+1;
					    	if(this.isEnd){
					    		_this.nevtclasss = true;
					    		if(_this.SnamePagesData.pageNumber < (_this.totalCount/_this.SnamePagesData.pageSize)){
					    			_this.SnamePagesData.pageNumber+=1;
					    			_this.getSnamePagesList();
					    			_this.nevtclasss = false;
					    		}
					    		if(this.activeIndex == _this.totalCount-1){
					    			_this.isSubmitBtn = true;
					    		}
					    	}else{
					    		_this.isSubmitBtn = false;
					    		_this.nevtclasss = false;
					    	}
					    	if(this.isBeginning){
					    		_this.prevclasss = true;
					    	}else{
					    		_this.prevclasss = false;
					    	}
					    	if(this.activeIndex >= _this.submitAnswerList.length){
					    		this.allowSlideNext = false;
					    	}else{
					    		this.allowSlideNext = true;
					    	}
					    }

				  	}
		        },
		        swiperSlides: [],
		        SnamePagesData:{
        			pageNumber: 1,
        			pageSize: 20,
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
        		totalCount:'',
        		SnameNumber:1,
        		isSubmitBtn:false,
        		getTypeName:'',
        		prevclasss:true,
        		nevtclasss:false
            }
        },
        created() {
        	this.getSnamePagesList();
        },
        methods: {
        	async getSnamePagesList(){
        		let {Data,TotalCount,PageNumber} = await this.$http.getSnamePages(this.SnamePagesData)
        		if(this.SnamePagesData.pageNumber == 1){
        			this.swiperSlides = Data;
        		}else{
        			Data.forEach((item,index)=>this.swiperSlides.push(item));
        		}
        		this.totalCount = TotalCount;
        	},
        	choiceAnswer(Sid,StypeID,Comment,AnswerComment,Score){
        		this.AnswerList = {
        			Sid:Sid,
        			AnswerComment:AnswerComment,
        			Score:Score,
        			StypeID:StypeID,
        			EvaluatingMsg:Comment
        		}
        		let answer = this.submitAnswerList.find((item) => item.Sid == Sid );
        		if (answer) {
        			if (answer.AnswerComment == AnswerComment) return;
					this.submitAnswerList = this.submitAnswerList.map((item)=>{
					    if(item.Sid == Sid){
						    return this.AnswerList
					    }
					    return item;
				    });
        		} else {
        			this.submitAnswerList.push(this.AnswerList);
        		}			
				this.$refs.vueSwiper.swiper.allowSlideNext = true;
        	},
        	async submitData(){
        		if(this.submitAnswerList.length === this.totalCount){
        			let {ErrorCode,ErrorMessage} = await this.$http.SubmitSname(this.submitAnswerList);
        			if(ErrorCode === 1){
                        this.$router.push('/score/'+this.$route.params.stypeId);
                    }else{
                        this.$Message.error(ErrorMessage);
                    }
        		}else{
        			this.$Message.error('您还有未答的题目');
        		}
        	},
        	prevto(){
            	this.$refs.vueSwiper.swiper.slidePrev();
            	if(this.submitAnswerList.length != 0){
            		this.$refs.vueSwiper.swiper.allowSlideNext = true;
            	}
            },
        	nextto(){
            	this.$refs.vueSwiper.swiper.slideNext();
            	if(this.$refs.vueSwiper.swiper.activeIndex >= this.submitAnswerList.length){
            		this.$refs.vueSwiper.swiper.allowSlideNext = false;
            	}
            }
        },
        computed: {},
        mounted() {
        	setTimeout(() => {
                this.getTypeName = sessionStorage.getItem('typeName');
            },100);
            this.$refs.vueSwiper.swiper.allowSlideNext = false;
        },
        components: {
	  	}
    }
</script>
<style scoped>
    .list{
    	padding: 20px 20px 60px 20px;
    	position: relative;
        overflow: auto;
    }
    .listtitle{
		font-size: 16px;
		color: #333;
		font-weight: bold;
		margin-bottom:20px;
    }
    .typename{
    	color: #333;
    	font-size: 1.4em;
    	text-align: center;
        font-weight: bold;
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
    .button-prev,.button-next{
		width: 100px;
		height: 30px;
		line-height: 30px;
		background: #2fb8e2;
		text-align: center;
		color: #fff;
		font-weight: bold;
		border-radius: 5px;
        margin-top: 15px;
    }
    .swiper-container{
    	min-height: 335px;
    }
    .button-prev{
		float: left;
    }
    .button-next{
		float: right;
    }
    .buttonactive{
    	opacity: 0.35;
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
    .list .swiper-slide{
        visibility: hidden;
    }
    .list .swiper-slide-active{
        visibility: visible;
    }
</style>
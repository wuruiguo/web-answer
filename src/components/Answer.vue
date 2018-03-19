<template>
    <div class="answer">
    	<div class="answertitle">答题说明</div>
    	<div class="answertext" v-html="getTypeComment"></div>
        <div class="answerbtn"><router-link :to="'/list/'+$route.params.stypeId">开始答题</router-link></div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
            	getTypeComment:''
            }
        },
        created() {
        },
        methods: {},
        computed: {
        },
        mounted() {
            setTimeout(() => {
                this.getTypeComment = sessionStorage.getItem('typeComment');
            },0);
        }
    }
</script>
<style scoped>
	.answer{
		position: absolute;
		height: 100%;
		background: url(../assets/bg.png);
		width: 100%;
        overflow-y:auto;
	}
	.answertitle{
		margin-top: 25%;
		text-align: center;
		font-size: 1.5em;
		color: #000;
		font-weight: bold;
	}
    .answertext{
	    font-size: 1.2em;
	    line-height: 2em;
	    margin: 0 15%;
	    margin-top: 10%;
	    color: #000;
	    background: #fff;
	    padding: 20px;
	    border-radius: 10px;
        min-height: 300px;
        text-indent: 2em;
    }
    .answerbtn{
    	width: 100%;
    	text-align: center;
        margin-top: 10%;
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
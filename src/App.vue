<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
	@charset "utf-8";
	html,body,div,p,form,label,ul,li,dl,dt,dd,ol,img,button,b,em,strong,small,h1,h2,h3,h4,h5,h6{margin:0;padding:0;border:0;list-style:none;font-style:normal;}
	/* html{ height: 100%;} */
	body{font-family:SimHei,'Helvetica Neue',Arial,'Droid Sans',sans-serif;font-size:14px;color:#333;	background: #f1f1f1;}
	a, a.link{color:#666;text-decoration:none;font-weight:500;}
	a, a.link:hover{color:#666;}
	h1,h2,h3,h4,h5,h6{font-weight: normal;}
	/* ::-webkit-input-placeholder { WebKit, Blink, Edge
	    	color:#fff;
	}
	:-moz-placeholder { Mozilla Firefox 4 to 18
	   color:#fff;
	}
	::-moz-placeholder { Mozilla Firefox 19+
	   color:#fff;
	}
	:-ms-input-placeholder { Internet Explorer 10-11
	   color:#fff;
	} */
	.ivu-message{
		font-size: 1em;
	}
	#app{
		min-height: 100%;
	}
	.usercomment p{
        text-indent: 2em;
    }
</style>

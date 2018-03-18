import Vue from 'vue'
import Router from 'vue-router'

const Home = r => require.ensure([], () => r(require('../components/Home.vue')),'main');
const Login = r => require.ensure([], () => r(require('../components/Login.vue')),'main');
const Reg = r => require.ensure([], () => r(require('../components/Reg.vue')),'main');
const Answer = r => require.ensure([], () => r(require('../components/Answer.vue')),'main');
const List = r => require.ensure([], () => r(require('../components/List.vue')),'main');
const Score = r => require.ensure([], () => r(require('../components/Score.vue')),'main');
const ScoreList = r => require.ensure([], () => r(require('../components/ScoreList.vue')),'main');

Vue.use(Router)

export default new Router({
  routes: [
  	{
      path: '/',
      component: Home
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/register',
      component: Reg
    },
    {
      path: '/answer/:stypeId',
      component: Answer
    },
    {
      path: '/list/:stypeId',
      component: List
    },
    {
      path: '/score/:stypeId',
      component: Score
    },
    {
      path: '/scorelist/:stypeId',
      component: ScoreList
    }
  ]
})

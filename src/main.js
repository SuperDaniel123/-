// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import '@/common/css/style.css'
import '@/common/font/font-awesome/css/font-awesome.min.css'
import 'swiper/dist/css/swiper.css'
import '@/common/js/axios'
import store from './store'
import jsons from './common/js/information.json'
Vue.config.productionTip = false
import { 
    Button,
    Swipe, 
    SwipeItem,
    Tab,
    Tabs,
    List,
    Toast,
    GoodsAction,
    GoodsActionBigBtn,
    GoodsActionMiniBtn,
    Checkbox, 
    CheckboxGroup,
    Area,
    Popup,
    Switch,
    Cell, 
    CellGroup,
    Card,
    Loading,
    RadioGroup, 
    Radio,
    Search,
    Picker,
    Field
} from 'vant';
Vue.use(Button).use(Swipe)
.use(SwipeItem).use(Tab).use(Tabs)
.use(List).use(Toast).use(GoodsAction)
.use(GoodsActionBigBtn).use(GoodsActionMiniBtn)
.use(Checkbox).use(CheckboxGroup).use(Area).use(Popup)
.use(Switch).use(CellGroup).use(Cell).use(Card).use(Loading)
.use(RadioGroup).use(Radio).use(Search).use(Picker).use(jsons)
.use(Field)

//封装请求参数转换
Vue.prototype.$sess = function(id,opt){
    let obj = {}
    obj[id] = JSON.stringify(opt)
    return obj
}

Vue.prototype.$base = 'http://api.zymc.cakcc.cn:88'

Vue.prototype.$datas = jsons

router.beforeEach((to, from, next) => {
    let link = ['shoppingCart','address','addressEdit','orderform','collectionList','storeOther','recordDetails','bankCard','addBankCard','withdrawDeposit','recordDetails','storeOther']
    let names = to.name
    let isDate = Date.parse(new Date())
    let loginTime = localStorage.getItem('time')
    let goneLogin = ()=>{
        if(store.getters.setMID == ''){
            for(let i = 0; i <link.length; i++){
                if(link[i] == names){
                    return true;
                }
            }
        }
        return false
    }
    if(loginTime){
        for(let i = 0; i <link.length; i++){
            if(link[i] == names){
                if(isDate > loginTime){
                    Toast('登录超时，请重新登陆')
                    localStorage.removeItem('time')
                    localStorage.removeItem('MID')
                    next('/login')
                    return;
                }
            }
        }
        
    }
    
    if(goneLogin()){
        Toast('请先登录')
        next('/login')

    }
    next()
    
})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

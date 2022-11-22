import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import getVant from './plugins/index'
import VueMarquee from 'vue3-marquee'
import 'vue3-marquee/dist/style.css'
import 'vant/lib/index.css';
import animated from 'animate.css'
const app=createApp(App)
getVant(app)
app.use(animated)
app.use(store)
app.use(VueMarquee)
app.use(router).mount('#app')

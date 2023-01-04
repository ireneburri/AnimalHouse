import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './utilities/vuex'


const app = createApp(App)

app.use(store)
app.use(router).mount('#app')
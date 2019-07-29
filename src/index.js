import Vue from 'vue'
import App from './app.vue'
import '../src/assets/styles/index.styl'

//在body中创建一个div
const root=document.createElement('div')
document.body.appendChild(root)

//将app添加到root中进行展示
new Vue({
    render:(h)=>h(App)
}).$mount(root)
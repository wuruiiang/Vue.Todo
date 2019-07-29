<template>
    <div id="app">
        <div id="cover">
            <Header/>
            <Todo/>
            <Footer/>
        </div>
    </div>
</template>

<script>
import Header from './todo/Header.vue'
import Footer from './todo/Footer.jsx'
import Todo from './todo/Todo.vue'
export default {
    components:{
        Header,
        Footer,
        Todo
    }
}
</script>

<style lang="stylus" scoped>
#app
    position absolute
    float none 
    left 0
    top 0
    right 0
    bottom 0
    width 1000px
    margin auto
    width 1000px
    #cover
        position relative
        float none 
        left 0
        top 8rem
        right 0
        bottom 0
        margin auto
        background-color rgba(200,200,200,.5)
</style>




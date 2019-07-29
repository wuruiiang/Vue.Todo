<template>
    <div id="item">
        <input 
            type="checkbox"
            v-model="todo.completed"
            class="toggle"
        >
        <label class="title">{{todo.title}}</label>
        <button class="destory" @click="deleteTodo">
            删除
        </button>
    </div>
</template>

<script>
export default {
    props:{
        todo:{
            type:Object,
            required:true
        }
    },
    methods:{
        deleteTodo(){
            this.$emit("deleteSingle",this.todo.id)
        }
    }
}
</script>

<style lang="stylus" scoped>
#item
    width 100%
    border none
    border-bottom 1px solid #999999
    height 2rem
    font-size 1.2rem
    .toggle
        border 1px soild #999999
        height 1.2rem
        width 1.2rem
        background-color transparent
        margin 0.4rem 0
    .title
        color #333333
        line-height 2rem
        margin auto 1rem
    .destory
        display inline-block
        float right
        line-height 2rem
        border none
        background-color transparent
        opacity .5
        color #ff0000
        cursor pointer
        &:hover
            opacity 1
</style>



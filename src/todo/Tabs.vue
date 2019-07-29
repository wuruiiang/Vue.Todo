<template>
    <div id="tabs">
       <span class="left">{{undoCount}} items left</span>
        <button v-for="s in states" :key="s" @click="stateToggle(s)"
            :class="{selected:filter===s}">
            {{s}}
        </button>
       <span class="right" @click="doClearCompleted">clear completed</span>
    </div>
</template>

<script>
export default {
    props:{
        todos:{
            type:Array,
            required:true
        },
        filter:{
            type:String,
            required:true
        }
    },
    data(){
        return{
            states:["all","active","completed"]
        }
    },
    methods:{
        doClearCompleted(){
            this.$emit("clearCompleted");
        },
        stateToggle(state){
            this.$emit("onToggle",state);
        }
    },
    computed:{
        undoCount(){
            return this.todos.filter(todo=>!todo.completed).length
        }
    }
}
</script>


<style lang="stylus" scoped>
#tabs
    width 100%
    line-height 2rem
    .left
        display inline-block
        float left
        color #333333
    button 
        height 1.2rem
        width 80px
        margin 0 1rem  
        border 1px solid transparent
        border-radius 5px
        &.selected
            border 1px solid #0ff   
    .right
        right -100px
        cursor pointer
</style>


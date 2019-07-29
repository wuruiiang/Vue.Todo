<template>
    <div id="todo">
        <input 
            type="text" 
            placeholder="请输入代办事项"
            class="add-input"
            autofocus="autofocus"
            @keyup.enter="addTodo"
        >
        <Item v-for="todo in filteredTodos" :key="todo.id" :todo="todo"
            @deleteSingle="onDeleteSingle"
            />
        <Tabs 
            :filter="filter" :todos="todos"
            @clearCompleted="onClearCompleted"
            @onToggle="onStateSelectChanged"
            />
    </div>
</template>

<script>
import Item from './Item.vue'
import Tabs from './Tabs.vue'
let index=0
export default {
    data(){
        return{
            filter:'all',
            todos:[]
        }
    },
    components:{
        Item,
        Tabs
    },
    methods:{
        addTodo(e){
            this.todos.unshift({
                id:index++,
                title:e.target.value.trim(),
                completed:false
            })
            e.target.value=''
        },
        onStateSelectChanged(state){
            this.filter=state
        },
        onClearCompleted(){
            this.todos=this.todos.filter(todo=>!todo.completed)
        },
        onDeleteSingle(id){
            this.todos.splice(this.todos.findIndex(todo=>todo.id===id),1)
        }
    },
    computed:{
        filteredTodos(){
            console.log(this.filter);
            console.log(this.filter=='all');
            if(this.filter=='all')return this.todos;
            return this.todos.filter(todo=>todo.completed===(this.filter==='completed'))
        }
    }
}
</script>

<style lang="stylus" scoped>
#todo
    margin 1rem 10%
    width 80%
    .add-input
        line-height 2rem
        height 2rem
        border none
        border-bottom 1px solid #999999
        width 100%
        background-color transparent
        padding 0 1rem
        font-size 1.2rem
        box-sizing border-box
        
</style>



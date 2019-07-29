<template>
    <header>
        <h1>{{title}}</h1>
    </header>
</template>

<script>
export default {
    data(){
        return {
            title:"待办事项"
        }
    }
}
</script>

<style lang="stylus" scoped>
h1
    color rgba(255,80,10,0.7)
    text-align center
    line-height 5rem
</style>




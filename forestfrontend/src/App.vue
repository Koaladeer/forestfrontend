<script setup>
import HelloWorld from './components/HelloWorld.vue'
import TheWelcome from './components/TheWelcome.vue'
import Chat from "@/components/Chat.vue";
import DemoGrid from "@/components/Grid.vue";

</script>
<script>

export default {
    components: {
        DemoGrid
    },
    data: () => ({
        searchQuery: '',
        gridColumns: ['id', 'message'],
        gridData: [],
    }),
    methods: {
        async getData() {
            let result = await fetch("http://localhost:8080/messages").then(res => res.json()).catch(error => console.log(error));
            console.log(result);
            return result;
        },

    },
    async mounted() {
        const data = await this.getData();
        this.gridData = data;
    },
}
</script>
<template>
    <Chat/>
    <form id="search" class="bg-emerald-300 rounded">
        <label for="queryField">Search</label>
        <input id="queryField" name="query" v-model="searchQuery" class="border-2 border-b-gray-300 rounded">
    </form>
    <DemoGrid
            :data="gridData"
            :columns="gridColumns"
            :filter-key="searchQuery">
    </DemoGrid>
</template>

<style scoped>
header {
    line-height: 1.5;
}

.logo {
    display: block;
    margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
    header {
        display: flex;
        place-items: center;
        padding-right: calc(var(--section-gap) / 2);
    }

    .logo {
        margin: 0 2rem 0 0;
    }

    header .wrapper {
        display: flex;
        place-items: flex-start;
        flex-wrap: wrap;
    }
}
</style>

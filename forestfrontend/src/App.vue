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
         async  getData() {
            try {
                let result = await fetch("http://localhost:8080/messages").then(res => res.json()).catch(error => console.log(error));
                console.log(result);
                return result;
            }catch (error) {
                console.log(error);
                return null;
            }
        },

    },
    async mounted() {
        const data = await this.getData();
        this.gridData = data;
    },
};

</script>
<template>
    <div class="bg-gray-100 ">
        <header  class="bg-emerald-300 py-4 ">
            <div class=" text-black  " >
                <h1 class="text-2xl text-center font-semibold">Welcome</h1>
                <p class="mt-2 text-center">Demo Chat with GPT-3 </p>
            </div>
        </header>

        <Chat />

        <form id="search" class="bg-green-300 place-content-center rounded-md px-4 py-2 mt-4">
            <label for="queryField" class="text-gray-800">Search</label>
            <input id="queryField" name="query" v-model="searchQuery" class="border-2 border-gray-300 rounded-md p-2 w-full mt-1">
        </form>

        <DemoGrid
            :data="gridData"
            :columns="gridColumns"
            :filter-key="searchQuery"
            class="mt-4"
        ></DemoGrid>
    </div>
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

    h1 {
        color: #000;
        text-align: center;
        text-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
        font-family: Inter;
        font-size: 20px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
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

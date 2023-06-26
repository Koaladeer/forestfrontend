<template>
<!-- template from   https://v2.vuejs.org/v2/examples/grid-component.html -->
    <div class="max-w-lg min-w-fit">
    <button @click="isActive = !isActive ; changeButtonText()" class=" max-h-8 max-w-screen-sm text-amber-300 font-bold text-lg bg-cyan-800  rounded-full hover:delay-100 hover:text-amber-400 hover:bg-cyan-900">{{ buttonText }}</button>
    <table v-if="filteredData.length && isActive" class="border border-green-500 rounded bg-white">
        <thead>
        <tr class="bg-green-500 text-white">
            <th v-for="key in columns"
                @click="sortBy(key)"
                :class="{ 'bg-green-700 ': sortKey == key }"
                class="cursor-pointer px-4 py-2">
                {{ capitalize(key) }}
                <span v-if="sortOrders[key] > 0"
                      class="inline-block w-3 h-3 ml-1 rounded-full bg-white"></span>
                <span v-else
                      class="inline-block w-3 h-3 ml-1 rounded-full bg-white"></span>
            </th>
            <th></th>
            <th></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="entry in filteredData" class="border-b border-gray-200">
            <td v-for="key in columns" class="px-4 py-2">{{entry[key]}}</td>
            <td><button class="btn-select" @click="selectEntry(entry)">Select</button></td>
            <td><button class="btn-delete" @click="deleteEntry(entry)">Delete</button></td>
        </tr>
        </tbody>
    </table>
    <p v-else-if="awesome" class="text-center text-gray-600">No matches found.</p>
    </div>
</template>

<script>
export default {
    props: {
        data: Array,
        columns: Array,
        filterKey: String
    },
    data() {
        return {
            buttonText: 'Hide Datatable',
            isActive : true,
            sortKey: '',
            sortOrders: this.columns.reduce((o, key) => ((o[key] = 1), o), {}),
        }
    },
    computed: {
        filteredData() {
            const sortKey = this.sortKey
            const filterKey = this.filterKey && this.filterKey.toLowerCase()
            const order = this.sortOrders[sortKey] || 1
            let data = this.data
            if (filterKey) {
                data = data.filter((row) => {
                    return Object.keys(row).some((key) => {
                        return String(row[key]).toLowerCase().indexOf(filterKey) > -1
                    })
                })
            }
            if (sortKey) {
                data = data.slice().sort((a, b) => {
                    a = a[sortKey]
                    b = b[sortKey]
                    return (a === b ? 0 : a > b ? 1 : -1) * order
                })
            }
            return data
        }
    },
    methods: {
        changeButtonText(){
            if (this.isActive)
            this.buttonText = 'Hide Datatable'
            else this.buttonText = 'Show Datatable'
        },
        sortBy(key) {
            this.sortKey = key
            this.sortOrders[key] = this.sortOrders[key] * -1
        },
        capitalize(str) {
            return str.charAt(0).toUpperCase() + str.slice(1)
        },
        selectEntry(entry) {
            // Todo: handle select button click for the given entry
            console.log('Selected:', entry.id)
        },
        //messages/delete/{}
        async deleteEntry(entry) {
            // handle delete button click for the given entry
            let res = await fetch(`/messages/delete/${entry.id}`,{
                method: 'DELETE',
            }).then(res => res.json()).catch(error => console.log(error));
            console.log('Deleted:', entry)
            this.data.splice(this.data.indexOf(entry), 1)
        }
    }
}
</script>
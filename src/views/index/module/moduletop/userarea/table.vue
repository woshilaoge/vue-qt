<template>
    <table class="dataTable table nowrap" cellspacing="0" width="100%">
        <thead>
        <tr>
            <th>区域</th>
            <th>占比</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in data">
            <td>{{item.name}}</td>
            <td>
                <div class="progress">
                    <div class="progress-bar" :style="{width:item.value}"></div>
                    <span>{{item.value}}</span>
                </div>
            </td>
        </tr>
        </tbody>
    </table>
</template>
<script scoped>
    export default {
        data() {
            return {
            }
        },
        props: {
            data: {
                type: Array
            }
        },
    }
</script>

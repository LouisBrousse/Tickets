<template>

</template>
<script setup>
import { Ref } from 'vue';
import router from '../router'

const route2list = () => {
        router.push(`/tickets`)
};

const route2form = () => {
        router.push(`/`)
};



</script>
<template>
    <h1>Slug - {{ route.params.slug }}</h1>
</template>

<script setup>
const route = useRoute();
</script>
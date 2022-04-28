<template>
    <header>
        <h1>List of countries</h1>
    </header>
</template>

<script>


export default {
  name: 'HeaderBar',
}
</script>

<style scoped>
    header {
        background-color: var(--dark-grey);
        width: 100%;
        height: var(--header-height);
        box-sizing: border-box;
        position: fixed;
        top: 0;
        display: flex;
        align-items: center;
    }
</style>
<template>
    <header>
        <h1>List of countries</h1>
        <SearchBar/>
    </header>
</template>

<script>
import SearchBar from "@/components/SearchBar.vue"

export default {
  name: 'HeaderBar',
  components: {
      SearchBar,
  }
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
        justify-content: space-between;
        align-items: center;
        padding: 0 15px;
    }

    h1 {
        text-transform: uppercase;
    }
</style>
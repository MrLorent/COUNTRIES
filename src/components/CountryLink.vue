<template>
    <router-link
        :to="{name: 'country', params: {id: this.id}}"
        class="country_link"
    >
        <img v-if="flag" class="country_flag" :src="flag" alt="Country's flag"/>
        <h2 class="country_name">{{name}}</h2>
    </router-link>
</template>

<script>


export default {
  name: 'CountryLink',
  props: {
      id: Number,
      name: String,
      flag: String,
  },
}
</script>

<style scoped>
.country_link {
    background-color: var(--dark-grey);
    width: calc(50% - 10px);
    height: fit-content;
    border-radius: 5px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    padding: 20px;
    margin: 5px;
}

.country_flag {
    height: 1.5em;
}

h2 {
    font-size: 1.25em;
    margin: 0 0 0 20px;
}
</style>
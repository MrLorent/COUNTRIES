<template>
  <router-link
    :to="{name: 'country', params: {id: this.id}}"
    class="country_link"
  >
    <img v-if="flag" class="country_flag" :src="flag" :alt="name + ' flag'"/>
    <h2 class="country_name">{{name}}</h2>
  </router-link>
</template>

<script>


export default {
  /*====== ATTRIBUTS ======*/
  name: 'CountryLink',
  props: {
    id: Number,
    name: String,
    flag: String,
  },
}
</script>

<style scoped>
.country_link
{
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

.country_flag
{
  width: 37.5px;
  height: 25px;
  object-fit: cover;
}

h2
{
  font-size: 1.25em;
  margin: 0 0 0 20px;
}
</style>
<template>
    <!-- <router-link
        :to="{name: 'country', params: {id: this.id}}"
        class="country"
    > -->
    <div class="country">
        <h2 class="country_name">{{name}}</h2>
    </div>
    <!-- </router-link> -->
</template>

<script>


export default {
  name: 'CountryLink',
  props: {
      id: Number,
      name: String,
  },
}
</script>

<style scoped>

</style>
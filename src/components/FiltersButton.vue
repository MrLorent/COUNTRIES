<template>
  <div class="filters_button" @click="display_filter_bar">
    <FiltersIcon v-if="filters_displayed"/>
    <CrossIcon v-else/>
  </div>
</template>

<script>
import FiltersIcon from "@/components/icons/FiltersIcon.vue";
import CrossIcon from "@/components/icons/CrossIcon.vue";

export default {
  /*====== ATTRIBUTS ======*/
  name: 'FiltersButton',
  components: {
    FiltersIcon,
    CrossIcon,
  },
  data () {
    return {
      filters_displayed: true,
    }
  },

  /*====== METHODS ======*/
  methods: {
    display_filter_bar() {
      this.filters_displayed = this.filters_displayed ? false : true;
      document.querySelector('.filter_bar').classList.toggle('displayed');
    },
  },
}
</script>

<style scoped>
.filters_button
{
  display: none;
}

@media (max-width: 575.98px)
{
  .filters_button
  {
    cursor: pointer;
    background-color: var(--green);
    width: 50px;
    height: 50px;
    border-radius: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    right: 0;
    bottom: 0;
    margin: 15px;
    z-index: 2;
  }
}
</style>
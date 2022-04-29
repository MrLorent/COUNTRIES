<template>
    <div class="filter_bar">
      <!-- SORT TYPE SELECTOR -->
      <div class="filter sort_selector">
        <label for="country_sort">Sort by :</label>
        <select :value="countries_sort_type" @input="on_countries_sort_type_changed" id="country_sort">
          <option value="name">names</option>
          <option value="numericCode">numeric code</option>
        </select>
      </div>

      <!-- REVERSED ORDER TOGGLE -->
      <div class="filter reverse_toggle">
        <label for="reversed">Reverse order</label>
        <input @input="on_reversed_changed" type="checkbox" id="reversed" :checked="reversed === 'on'">
      </div>

      <!-- REGION SELECTOR FILTER -->
      <div class="filter region">
        <label for="region_filter">Filter by region :</label>
        <select :value="this.$store.getters.get_region_filter" @input="on_region_filter_changed" id="region_filter">
          <option value="all">All</option>
          <option
            v-for="(region, idx) in regions"
            :key="idx"
            :value="region"
          >
            {{ region }}
          </option>
        </select>
      </div>
    </div>
</template>

<script>
export default {
  /*====== ATTRIBUTS ======*/
  name: 'FilterBar',

  /*======= METHODS =======*/
  methods: {
    on_countries_sort_type_changed(event){
      this.$store.dispatch('update_countries_sort_type', event.target.value);
    },
    on_reversed_changed(){
      this.$store.dispatch('update_reversed', this.$store.getters.get_reversed == "off" ? "on" : "off");
    },
    on_region_filter_changed(event){
      this.$store.dispatch('update_region_filter', event.target.value);
    }
  },

  computed: {
    countries_sort_type() {
      // GETTER
      return this.$store.getters.get_countries_sort_type;
    },
    reversed () {
      // GETTER
      return this.$store.getters.get_reversed;
    },
    regions () {
      // GETTER
      return this.$store.getters.get_regions;
    }
  },
}
</script>

<style scoped>
.filter_bar {
  background-color: var(--dark-grey);
  border-bottom: 1px solid var(--light-grey);
  width: 100%;
  height: var(--filter-bar-height);
  box-sizing: border-box;
  display: flex;
  align-items: center;
  position: fixed;
  top: var(--header-height);
  padding: 0 20px;
}

.filter {
  display: flex;
  align-items: center;
  margin: 0 20px 0 0;
}

label {
  margin: 0 5px 0 0;
}

@media (max-width: 991.98px)
{
  
}

@media (max-width: 575.98px)
{
  .filter_bar
  {
    top: calc(2 * var(--header-height));
    transform: translateX(105vw);
  }
}
</style>
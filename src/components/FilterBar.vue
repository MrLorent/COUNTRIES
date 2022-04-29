<template>
    <div class="filter_bar">
          <div class="filter sort_selector">
              <label for="country_sort">Sort by :</label>
              <select :value="this.$store.getters.get_countries_sort_type" @input="on_countries_sort_type_changed" id="country_sort">
                  <option value="name">names</option>
                  <option value="numericCode">numeric code</option>
              </select>
          </div>
          <div class="filter reverse_toggle">
              <label for="reversed">Reverse order</label>
              <input @input="on_reversed_changed" type="checkbox" id="reversed" :checked="reversed === 'on'">
          </div>
          <div class="filter region">
              <label for="region_filter">Filter by region :</label>
              <select @input="on_region_filter_changed" id="region_filter">
                  <option value="all">all</option>
                  <option
                    v-for="(region, idx) in regions"
                    :key="idx"
                    :value="region"
                  >
                    {{region}}
                  </option>
              </select>
          </div>
    </div>
</template>

<script>

export default {
  name: 'FilterBar',
  methods: {
    on_countries_sort_type_changed(event){
      this.$store.dispatch('update_countries_sort_type', event.target.value);
    },
    on_reversed_changed(){
      this.$emit('update:reversed', this.reversed == "off" ? "on" : "off");
    },
    on_region_filter_changed(event){
      this.$emit('update:region_filter', event.target.value);
    }
  },
  computed: {
    regions () {
      return this.$store.getters.getRegions;
    }
  },
  watch: {
    reversed(new_reversed){
      localStorage.setItem("reversed", new_reversed);
    },
    region_filter(new_region_filter){
      localStorage.setItem("region_filter", new_region_filter);
    },
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
</style>
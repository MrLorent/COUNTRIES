<template>
    <div class="filter_bar">
          <div class="filter sort_selector">
              <label for="country_sort">Sort by : </label>
              <select :value="countries_sort_type" @input="on_countries_sort_type_changed" id="country_sort">
                  <option value="name">names</option>
                  <option value="numericCode">numeric code</option>
              </select>
          </div>
          <div class="filter reverse_toggle">
              <label for="reversed">Reverse order</label>
              <input :value="reversed" @input="on_reversed_changed" type="checkbox" id="reversed" :checked="reversed === 'on'">
          </div>
    </div>
</template>

<script>

export default {
  name: 'FilterBar',
  props: {
    countries_sort_type: String,
    reversed: String,
  },
  methods: {
    on_countries_sort_type_changed(event){
        this.$emit('update:countries_sort_type', event.target.value);
    },
    on_reversed_changed(){
        this.$emit('update:reversed', this.reversed == "off" ? "on" : "off");
    },
  },
  watch: {
    countries_sort_type(new_countries_sort_type) {
        localStorage.setItem("countries_sort_type", new_countries_sort_type);
    },
    reversed(new_reversed){
        localStorage.setItem("reversed", new_reversed);
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
</style>
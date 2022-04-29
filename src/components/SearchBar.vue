<template>
    <div class="search_container">
        <button class="clear_button" v-if="search" @click="clear_search">
            <CrossIcon/>
        </button>
        <input class="search_bar" v-model="search"  @keyup.enter="research" type="text" name="search" placeholder="Search a country">
    </div>
</template>

<script>
import CrossIcon from '@/components/icons/CrossIcon.vue';

export default {
  /*====== ATTRIBUTS ======*/
  name: 'SearchBar',
  components: {
      CrossIcon,
  },
  data() {
      return {
          search: localStorage.getItem("search") || "",
      }
  },

  /*======= METHODS =======*/
  methods: {
    clear_search: function() {
      this.search = "";
      localStorage.removeItem('current_countries');
      // action
      this.$store.dispatch('load_countries');
    },
    research(event){
      this.$store.dispatch("search_country_by_name", event.target.value);
    }
  },

  /*====== OBSERVERS ======*/
  watch: {
    search: function(new_search) {
      localStorage.setItem("search", new_search);
    },
  },
}
</script>

<style scoped>
.search_container
{
  height: 100%;
  display: flex;
  align-items: center;
}

.clear_button
{
  cursor: pointer;
  background: var(--light-grey);
  border: 1px solid var(--light-grey);
  width: 40px;
  height: 40px;
  box-sizing: border-box;
}

.search_bar
{
  background-color: var(--black);
  color: var(--white);
  font-size: 1em;
  border: 1px solid var(--light-grey);
  border-radius: 1px;
  height: 40px;
  box-sizing: border-box;
  padding: 5px 7.5px;
}

.search_bar::placeholder
{
  color: var(--discret-font-color);
  opacity: 1;
}

.search_bar:focus {
  outline: none;
  border: 1px solid var(--white);
}
</style>
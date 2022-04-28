<template>
  <router-view></router-view>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style>
/*------------ GLOBALS -------------*/
:root {
  /* COLORS */
  --black: #121212;
  --deep-dark-grey: #181818;
  --dark-grey: #202020;
  --light-grey: #323232;

  --discret-font-color: #838383;
  --white: #ffffff;

  /* HEADER */
  --header-height: 60px;
}

/*------------ GENERAL -------------*/
html,
body,
main {
  width: 100%;
  height: 100%;
  margin: 0;
}

h1, h2
{
  font-size: 1.25em;
  margin: 0 0 0 0;
}

ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

p {
  margin: 0;
}

a {
  color: var(--white);
  text-decoration: none;
}

a:hover {
  text-decoration: none;
}

#app {
  background-color: var(--deep-dark-grey);
  color: var(--white);
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  position: relative;
}
</style>

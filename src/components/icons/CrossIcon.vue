<template>
  <svg class="cross_icon" viewBox="0 0 24 24">
    <path d="M18,6l-12,12"></path>
    <path d="M6,6l12,12"></path>
  </svg>
</template>

<script>
/*====== ATTRIBUTS ======*/
export default {
    name: 'CrossIcon',
}
</script>

<style scoped>
.cross_icon
{
  fill: var(--light-grey);
  stroke-linecap: round;
  stroke-linejoin: round;
  width: 100%;
  height: 100%;
}

path
{
  stroke: var(--white);
  stroke-width: 1px;
}
</style>
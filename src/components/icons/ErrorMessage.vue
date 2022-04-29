<template>
  <div class="error_404">
      <p class="visual">¯\_(ツ)_/¯</p>
    <p class="text">Sorry, no country matches your research...</p>
  </div>
</template>

<script>
/*====== ATTRIBUTS ======*/
export default {
  name: 'ErrorMessage',
}
</script>

<style scoped>
.error_404
{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.error_404 .visual
{
  color: var(--white);
  font-size: 5em;
  margin: 10% 0 2.5% 0;
}

.error_404 .text
{
  font-size: 1.5em;
  font-weight: 500;
  letter-spacing: 0.025em;
}
</style>
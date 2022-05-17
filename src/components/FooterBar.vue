<template>
    <footer>
        <span>Made by Tanguy Lorent ᕙ(⇀‸↼‶) ᕗ</span>
    </footer>
</template>

<script>

export default {
  /*====== ATTRIBUTS ======*/
  name: 'FooterBar',
}
</script>

<style scoped>
footer
{
    width: 100%;
    height: var(--footer-height);
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    bottom: 0;
}

@media (max-width: 991.98px)
{
  
}

@media (max-width: 575.98px)
{
  
}
</style>
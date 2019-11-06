<template>
<div id="game-container">
  </div>
</template>


<script>
export default {
  name: "Games",
  data() {
    return {
      downloaded: false
    };
  },
  async mounted() {
    const game = await import("@/game/Game");
    this.downloaded = true;
    this.$nextTick(() => game.launch());
  }
};
</script>


<style lang="scss" scoped>
.game-container{
  font-size: 2rem;
  font-family: "Courier New", Courier, monospace;
  margin: 0;
  padding: 0;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
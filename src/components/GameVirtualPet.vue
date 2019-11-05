<template>
        <div id="game-container-virtualPet"></div>
</template>


<script>
export default {
  name: "GameVirtualPet",
  data() {
    return {
      downloaded: false
    };
  },
  async mounted() {
    const game = await import("@/game/GameVirtualPet");
    this.downloaded = true;
    this.$nextTick(() => game.launch());
  }
};
</script>


<style lang="scss" scoped>

.game-container-virtualPet {
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
<template>
<div id="game-container-farm">
  <!--   <v-layout v-if="downloaded">
      <v-flex align-center justify-center height="95%">  -->
      
<!--       </v-flex>
    </v-layout>
    <v-layout class="placeholder" v-else align-center justify-center row fill-height>
      <v-flex align-center justify-center row>
        <v-progress-circular :size="70" :width="7" color="purple" indeterminate></v-progress-circular>
      </v-flex>
    </v-layout> -->
  </div>
</template>


<script>
export default {
  name: "GameFarm",
  data() {
    return {
      downloaded: false
    };
  },
  async mounted() {
    const game = await import("@/game/GameFarm");
    this.downloaded = true;
    this.$nextTick(() => game.launch());
  }
};
</script>


<style lang="scss" scoped>
.game-container-farm {
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
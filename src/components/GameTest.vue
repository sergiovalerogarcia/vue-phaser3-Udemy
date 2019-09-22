<template>
  <v-container bg fill-height grid-list-md text-xs-center>
    <v-layout v-if="downloaded">
      <v-flex align-center justify-center row>
        <v-card id="game-container"/>
      </v-flex>
    </v-layout>
    <v-layout class="placeholder" v-else align-center justify-center row fill-height>
      <v-flex align-center justify-center row >
        <v-progress-circular :size="70" :width="7" color="purple" indeterminate></v-progress-circular>
      </v-flex>
    </v-layout>
  </v-container>
</template>


<script>


export default {
  name: "Game",
  data() {
    return {
      downloaded: false,
      jump: false
    };
  },
  async mounted() {
    const game = await import( "@/game/gameTest");
    this.downloaded = true;
    this.$nextTick(() => game.launch());
    
  }
};

</script>


<style lang="scss" scoped>
.placeholder {
  font-size: 2rem;
  font-family: "Courier New", Courier, monospace;
}
</style>
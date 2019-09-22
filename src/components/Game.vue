<template>
<!--   <v-container bg fill-height grid-list-md text-xs-center>
    <v-layout v-if="downloaded">
      <v-flex  align-center justify-center height = 95%>
          <div class= "game-container-height" id="game-container" ></div>
      </v-flex>
    </v-layout>
    <v-layout class="placeholder" v-else align-center justify-center row fill-height>
      <v-flex align-center justify-center row >
        <v-progress-circular :size="70" :width="7" color="purple" indeterminate></v-progress-circular>
      </v-flex>
    </v-layout>
  </v-container> -->
  <div id="game-container" />
</template>


<script>


export default {
  name: "Game",
  data() {
    return {
      downloaded: false
    };
  },
  async mounted() {
    const game = await import( "@/game/Game");
    this.downloaded = true;
    this.$nextTick(() => game.launch());
    
  }
};

</script>


<style lang="scss" scoped>
.game-container{
  font-size: 2rem;
  font-family: "Courier New", Courier, monospace;
}

.game-container{
    margin:0;
    padding:0;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%; 
}

</style>
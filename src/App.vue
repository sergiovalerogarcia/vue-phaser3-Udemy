<template>
<!--   <v-app> -->
<!--     <v-app-bar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>No</span>
        <span class="font-weight-light">GAMES</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-content> -->
      <Game/>
<!--     </v-content> -->
<!--   </v-app> -->
  
</template>

<script>
import Game from './components/Game.vue';

export default {
  name: 'App',
  components: {
    Game
  },
  data: () => ({
    //
  }),
};
</script>

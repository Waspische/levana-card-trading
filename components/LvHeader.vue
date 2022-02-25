<template>
  <v-container fluid class="pa-0">
    <v-app-bar app flat>
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer">
          Levana Card Trading Helper
          <div class="text-caption">
            Find people to trade cards
          </div>
        </router-link>
      </v-toolbar-title>
      <v-spacer />
    </v-app-bar>
  </v-container>
</template>

<script>
export default {
  name: 'LvHeader',
  data () {
    return {
      sidebar: false
    }
  }
}
</script>

<style scoped>

</style>

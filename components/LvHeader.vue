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
      <v-toolbar-title>
        User count: {{ userCount }}
      </v-toolbar-title>
    </v-app-bar>
  </v-container>
</template>

<script>
export default {
  name: 'LvHeader',
  data () {
    return {
      userCount: 0
    }
  },
  async mounted () {
    const response = await this.$axios.get('/levana-users')
    this.userCount = response.data.meta.pagination.total
  }
}
</script>

<style scoped>

</style>

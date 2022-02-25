<template>
  <div>
    <v-container class="pt-12 pb-0 pt-lg-15 text-center px-0">
      <v-row justify="center">
        <v-col cols="12" md="12">
          <h1 class="text-h4 text-sm-h4 text-md-h3 text-lg-h2">
            <span class="primary--text">Levana</span> Trading Card Helper
          </h1>
        </v-col>
      </v-row>
    </v-container>

    <v-container fluid class="pt-4">
      <v-sheet
        v-if="!levanaUser"
        class="py-6 px-md-12 px-4"
      >
        <v-form
          ref="userForm"
          v-model="userForm.valid"
          @submit="connect"
          @submit.prevent
        >
          <v-row>
            <v-col cols="12" md="12">
              <div class="text-center text-h6 text-sm-h5 text-md-h4 text-lg-h3">
                User information
              </div>
              <div class="text-center body-1 ma-2">
                They are needed to identify who has which card
              </div>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="userForm.discordUsername"
                :rules="discordRules"
                label="Discord username"
                required
              />
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field
                v-model="userForm.terraAddress"
                :rules="addressRules"
                label="Terra Wallet Address"
                required
              />
            </v-col>
            <v-btn
              :disabled="!userForm.valid"
              color="success"
              class="mr-4"
              type="submit"
            >
              Explore
            </v-btn>
          </v-row>
        </v-form>
      </v-sheet>
      <v-sheet
        v-else
        class="py-6 px-md-12 px-4"
      >
        <v-row>
          <v-col cols="12" md="12">
            <div class="text-center text-h6 text-sm-h5 text-md-h4 text-lg-h3">
              Hi {{ levanaUser.discordUsername }}
            </div>
          </v-col>
          <v-col cols="12" md="6">
            <v-list subheader two-line flat>
              <v-subheader v-if="levanaUser.ownedCards.length == 0" class="headline">
                You have 0 Cards, add some
              </v-subheader>
              <v-subheader v-else class="headline">
                Cards you own
              </v-subheader>
              <v-list-item-group>
                <v-list-item v-for="(ownedCard, i) in levanaUser.ownedCards" :key="i">
                  <v-list-item-content>
                    <v-list-item-title>
                      {{ ownedCard.faction }} {{ ownedCard.luckyNumber }}
                    </v-list-item-title>
                  </v-list-item-content>
                  <v-btn
                    fab
                    x-small
                    @click="removeOwnedCard(i)"
                  >
                    <v-icon class="white--text">
                      mdi-close
                    </v-icon>
                  </v-btn>
                </v-list-item>
              </v-list-item-group>
            </v-list>
            <v-list subheader>
              <v-subheader class="headline">
                Add Cards
              </v-subheader>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>
                    <v-form
                      ref="ownedCardForm"
                      v-model="ownedCardForm.valid"
                    >
                      <v-row>
                        <v-col cols="12" md="6">
                          <v-select
                            v-model="ownedCardForm.faction"
                            :items="factions"
                            label="Faction"
                          />
                        </v-col>
                        <v-col cols="12" md="6">
                          <v-select
                            v-model="ownedCardForm.luckyNumber"
                            :items="luckyNumbers"
                            label="Lucky number"
                          />
                        </v-col>
                      </v-row>
                      <v-btn
                        color="success"
                        class="mr-4"
                        @click="addOwnedCard"
                      >
                        Add
                      </v-btn>
                    </v-form>
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-col>
          <v-col cols="12" md="6">
            <v-list subheader two-line flat>
              <v-subheader v-if="levanaUser.searchedCards.length == 0" class="headline">
                Add some cards to search
              </v-subheader>
              <v-subheader v-else class="headline">
                Cards you want
              </v-subheader>
              <v-list-item-group>
                <v-list-item v-for="(searchedCard, i) in levanaUser.searchedCards" :key="i">
                  <v-list-item-content>
                    <v-list-item-title>
                      {{ searchedCard.faction }} {{ searchedCard.luckyNumber }}
                    </v-list-item-title>
                  </v-list-item-content>
                  <v-btn
                    fab
                    x-small
                    @click="removeSearchedCard(i)"
                  >
                    <v-icon class="white--text">
                      mdi-close
                    </v-icon>
                  </v-btn>
                </v-list-item>
              </v-list-item-group>
            </v-list>
            <v-list subheader>
              <v-subheader class="headline">
                Add Cards
              </v-subheader>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>
                    <v-form
                      ref="searchedCardForm"
                      v-model="searchedCardForm.valid"
                    >
                      <v-row>
                        <v-col cols="12" md="6">
                          <v-select
                            v-model="searchedCardForm.faction"
                            :items="factions"
                            label="Faction"
                          />
                        </v-col>
                        <v-col cols="12" md="6">
                          <v-select
                            v-model="searchedCardForm.luckyNumber"
                            :items="luckyNumbers"
                            label="Lucky number"
                          />
                        </v-col>
                      </v-row>
                      <v-btn
                        color="success"
                        class="mr-4"
                        @click="addSearchedCard"
                      >
                        Add
                      </v-btn>
                    </v-form>
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-col>
        </v-row>
      </v-sheet>
    </v-container>

    <v-container fluid class="pt-4">
      <v-sheet
        v-if="trades"
        class="py-6 px-md-12 px-4"
      >
        <v-btn
          @click="getTrades"
          color="info"
          class="mr-4"
        >
          Refresh
        </v-btn>
        <v-row>
          <v-col cols="12" md="12">
            <div class="text-center text-h7 text-sm-h6 text-md-h5 text-lg-h4">
              Player who has cards for you and you have for them
            </div>
          </v-col>
          <v-col cols="12" md="12">
            <v-list-item v-for="(trade, i) in trades" :key="i">
              <v-list-item-content>
                <v-list-item-title>
                  Player <strong>{{ trade.discordUsername }}</strong> has
                  <span v-for="(card, i) in trade.hasCard" :key="i"><strong> {{ card.faction }} {{ card.luckyNumber }}</strong></span>
                  <span> and he wants </span>
                  <span v-for="(card, i) in trade.myCard" :key="i"><strong> {{ card.faction }} {{ card.luckyNumber }}</strong></span>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item v-if="trades.length === 0">
              <v-list-item-content>
                <v-list-item-title>
                  Nobody has cards matchting your need
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-col>
        </v-row>
      </v-sheet>
    </v-container>

    <v-container fluid class="pt-4">
      <v-row class="my-4">
        <v-col cols="8" class="mx-auto">
          <div class="text-h5">
            Do you appreciate the content here ?
          </div>
          <div class="text-subtitle-1">
            Support me on Terra
            <span class="primary--text font-weight-bold"> terra1syt83hpsk9sefxypccvfa8x344z7uc2zfuw5wy</span>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'LvLanding',
  data: () => ({
    userForm: {
      valid: false,
      discordUsername: '',
      terraAddress: ''
    },
    ownedCardForm: {
      luckyNumber: null,
      faction: null
    },
    searchedCardForm: {
      luckyNumber: null,
      faction: null
    },
    factions: ['martian', 'guardian', 'terran', 'council'],
    luckyNumbers: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    discordRules: [
      v => !!v || 'Discord is required'
      // v => /^.{3,32}#[0-9]{4}$/.test(v) || 'Discord name is invalid' // TODO to add again
    ],
    addressRules: [
      v => !!v || 'Address is required'
    ],
    levanaUser: null,
    trades: null
  }),
  methods: {
    async connect () {
      this.$refs.userForm.validate()

      try {
        let responseData
        let res = await this.$axios.$get('/levana-users?populate=%2A&' +
          `filters[discordUsername][$eq]=${this.userForm.discordUsername}&` +
          `filters[terraWalletAddress][$eq]=${this.userForm.terraAddress}`)

        if (res.data.length === 0) { // user does not exists so create it
          console.log('user does not exist')
          const payload = {
            data: {
              discordUsername: this.userForm.discordUsername,
              terraWalletAddress: this.userForm.terraAddress
            }
          }
          res = await this.$axios.$post('/levana-users', payload)
          responseData = res.data
        } else {
          console.log('user already exist')
          responseData = res.data[0]

          this.levanaUser = {
            id: responseData.id,
            discordUsername: responseData.attributes.discordUsername,
            terraWalletAddress: responseData.attributes.terraWalletAddress,
            ownedCards: responseData.attributes.ownedCards.data.map((c) => {
              return {
                id: c.id,
                faction: c.attributes.faction,
                luckyNumber: c.attributes.luckyNumber
              }
            }),
            searchedCards: responseData.attributes.searchedCards.data.map((c) => {
              return {
                id: c.id,
                faction: c.attributes.faction,
                luckyNumber: c.attributes.luckyNumber
              }
            })
          }
        }

        this.getTrades()
      } catch (error) {
        console.log(JSON.stringify(error))
      }
    },
    async removeOwnedCard (index) {
      console.log(`You deleted owned ${JSON.stringify(this.levanaUser.ownedCards[index])}`)
      this.levanaUser.ownedCards.splice(index, 1)
      const userPayload = {
        data: {
          ownedCards: this.levanaUser.ownedCards
        }
      }
      await this.$axios.$put(`/levana-users/${this.levanaUser.id}`, userPayload)
    },
    async addOwnedCard () {
      this.$refs.ownedCardForm.validate()

      const cardPayload = {
        data: {
          faction: this.ownedCardForm.faction,
          luckyNumber: this.ownedCardForm.luckyNumber
        }
      }
      // create card
      const cardResponse = await this.$axios.$post('/levana-cards', cardPayload)
      const newCardData = {
        id: cardResponse.data.id,
        faction: cardResponse.data.attributes.faction,
        luckyNumber: cardResponse.data.attributes.luckyNumber
      }

      // add card to user
      this.levanaUser.ownedCards.push(newCardData)
      const userPayload = {
        data: {
          ownedCards: this.levanaUser.ownedCards
        }
      }
      await this.$axios.$put(`/levana-users/${this.levanaUser.id}`, userPayload)

      this.$refs.ownedCardForm.reset()
    },
    async removeSearchedCard (index) {
      console.log(`You deleted searched ${JSON.stringify(this.levanaUser.searchedCards[index])}`)
      this.levanaUser.searchedCards.splice(index, 1)
      const userPayload = {
        data: {
          searchedCards: this.levanaUser.searchedCards
        }
      }
      await this.$axios.$put(`/levana-users/${this.levanaUser.id}`, userPayload)
    },
    async addSearchedCard () {
      this.$refs.searchedCardForm.validate()

      const cardPayload = {
        data: {
          faction: this.searchedCardForm.faction,
          luckyNumber: this.searchedCardForm.luckyNumber
        }
      }
      // create card
      const cardResponse = await this.$axios.$post('/levana-cards', cardPayload)
      const newCardData = {
        id: cardResponse.data.id,
        faction: cardResponse.data.attributes.faction,
        luckyNumber: cardResponse.data.attributes.luckyNumber
      }

      // add card to user
      this.levanaUser.searchedCards.push(newCardData)
      const userPayload = {
        data: {
          searchedCards: this.levanaUser.searchedCards
        }
      }
      await this.$axios.$put(`/levana-users/${this.levanaUser.id}`, userPayload)

      this.$refs.searchedCardForm.reset()
    },
    async getTrades () {
      let result = []
      // for each of my wanted card, i'll look for users

      const asyncConcatPromises = async (cards) => {
        const results = []
        for (const wantedCard of cards) {
          results.push(await this.$axios.get('/levana-users?populate=%2A&pagination[pageSize]=100&pagination[page]=1&' +
          `filters[ownedCards][luckyNumber][$eq]=${wantedCard.luckyNumber}&` +
          `filters[ownedCards][faction][$eq]=${wantedCard.faction}`))
        }
        return results
      }
      result = await asyncConcatPromises(this.levanaUser.searchedCards)

      result = result.map(match => match.data.data).flat(1)

      result = result.filter((user) => {
        return user.attributes.searchedCards.data.some((wantedCard) => {
          for (const card of this.levanaUser.ownedCards) {
            if (wantedCard.attributes.luckyNumber === card.luckyNumber && wantedCard.attributes.faction === card.faction) {
              return true
            }
          }
          return false
        })
      })

      const trades = result.map((user) => {
        return {
          discordUsername: user.attributes.discordUsername,
          hasCard: user.attributes.ownedCards.data.map((c) => {
            return {
              id: c.id,
              faction: c.attributes.faction,
              luckyNumber: c.attributes.luckyNumber
            }
          }),
          myCard: this.levanaUser.ownedCards.map((c) => {
            return {
              id: c.id,
              faction: c.faction,
              luckyNumber: c.luckyNumber
            }
          })
        }
      })

      this.trades = trades
    }
  }
}
</script>

<style scoped>
</style>

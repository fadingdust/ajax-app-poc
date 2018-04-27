<template>

  <v-card class="list-item">

    <v-card-title>
      <v-layout align-center>
            <v-avatar tile class="mr-2"><img class="logo" :src="iconURL"></v-avatar>
            <h3 v-html="itemdata.Title"></h3>
            <v-flex align-content-end text-xs-right v-html="itemdata.BreachDate" class="date"></v-flex>
      </v-layout>
    </v-card-title>

    <v-card-text>
      <v-layout >
        <v-flex text-xs-center><v-icon mx-auto large color="grey" class="mb-1">fa-users</v-icon> <div v-html="hackedCount"></div> </v-flex>

        <v-flex text-xs-center>
          <div v-if="itemdata.IsVerified"><v-icon mx-auto large color="teal lighten-1" class="is-verified mb-1">fa-check-square</v-icon><p> Verified </p> </div>
          <div v-if="!itemdata.IsVerified"><v-icon mx-auto large color="yellow lighten-2" class="is-not-verified mb-1">fa-question-circle-o</v-icon><p> Not Verified </p> </div>
        </v-flex>

        <!--
          What these Mean..
          https://haveibeenpwned.com/API/v2#BreachModel
          IsFabricated?
          TODO: on-tap: slide up bottom / popup?
          -->

        <v-flex text-xs-center>
          <div v-if="itemdata.IsSpamList"><v-icon mx-auto large color="deep-orange darken-2" class="is-spam mb-1">fa-thumbs-o-down</v-icon> <p> Spam </p></div>
          <div v-if="!itemdata.IsSpamList"><v-icon mx-auto large color="teal lighten-1" class="is-not-spam  mb-1">fa-thumbs-o-up</v-icon> <p> Not Spam </p> </div>
        </v-flex>

      </v-layout>

      <p class="mt-3" v-html="itemdata.Description"></p>
    </v-card-text>

    <v-card-actions>
      <v-layout>
        <v-flex d-inline-block>
          <v-chip  v-for="type in itemdata.DataClasses" :key="type">{{type}}</v-chip>
        </v-flex>
      </v-layout>
    </v-card-actions>

  </v-card>

</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" >
.card{
  margin-bottom: 2rem;
}

.card__title{
  height:48px;
}

.date{
  min-width:90px;
}

.justify-space-around .icon{
  display:block;
}

</style>

<script>
import numeral from 'numeral'
import appApi from '@/services/appService'

export default {

  props: {
    itemdata: {
      type: Object
    }
  },

  data: function () {
    return {
      iconURL: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGNiYAAAAAkAAxkR2eQAAAAASUVORK5CYII=' // move into API/Store
    }
  },

  created: function () {
    this.logoURLFromService(this.itemdata.Domain)
  },

  computed: {
    hackedCount: function () {
      return numeral(this.itemdata.PwnCount).format('0,0')
    }
  },

  methods: {
    logoURLFromService: function (domain) {
      let logoResponse = appApi.Service.getIconFromAPI(domain)
      logoResponse.then(result => {
        if (result.iconURL !== '') this.iconURL = result.iconURL
      })
        .catch(err => {
          if (err.status === 404) {
            return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGNiYAAAAAkAAxkR2eQAAAAASUVORK5CYII=' // 1px png
          }
        })
    }
  }

}
</script>

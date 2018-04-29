<template>
<v-flex lg6 md12 sm12 xs12>
  <v-card class="list-item mr-1 ml-1">

    <v-card-title>
      <v-layout align-center>
        <v-avatar tile size="30%" class="mr-2"><img class="logo" :src="iconURL"></v-avatar>

        <v-flex >
        <h3 v-html="itemdata.Title"></h3>
        <div v-html="itemdata.BreachDate" class="date"></div>
        </v-flex>

        <v-btn icon @click.native="show = !show">
          <v-icon>{{ show ? 'fa-minus' : 'fa-plus' }}</v-icon>
        </v-btn>

      </v-layout>
    </v-card-title>
    <v-slide-y-transition>
       <v-card-text v-show="show">
          <v-layout >
            <v-flex text-xs-center><v-icon mx-auto large color="grey" class="mb-1">fa-users</v-icon> <div v-html="hackedCount"></div> </v-flex>

            <v-flex text-xs-center>
              <div v-if="itemdata.IsVerified"><v-icon mx-auto large color="green" class="is-verified mb-1">fa-check-square</v-icon><p> Verified </p> </div>
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
              <div v-if="!itemdata.IsSpamList"><v-icon mx-auto large color="green" class="is-not-spam  mb-1">fa-thumbs-o-up</v-icon> <p> Not Spam </p> </div>
            </v-flex>

          </v-layout>

          <p class="mt-3" v-html="itemdata.Description"></p>


        <v-card-actions>
          <v-layout>
            <v-flex d-inline-block>
              <v-chip  v-for="type in itemdata.DataClasses" :key="type">{{type}}</v-chip>
            </v-flex>
          </v-layout>
        </v-card-actions>
        </v-card-text>

    </v-slide-y-transition>
  </v-card>
</v-flex>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.list-item.card{
  margin: .5rem auto;
}

.card__title{
/*  height:48px;*/
}

img.logo{
  width:100%;
}

.date{
  min-width:90px;
}

.justify-space-around .icon{
  display:block;
}

.list-item.card .avatar,
.list-item.card img.logo{
  max-height:100px;
  max-width:100px;
}

@media (max-width:1263px){
  .list-item.card .avatar,
  .list-item.card img.logo{
    max-height:80px;
    max-width:80px;
  }
}

@media (max-width:940px){
  .list-item.card .avatar,
  .list-item.card img.logo{
    height:60px!important;
    width:60px!important;
  }
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
      show: false,
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

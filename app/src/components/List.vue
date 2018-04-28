<template>
  <div class="">

      <div v-if="!listData">
        <p>Hmm.. Something went wrong </p>
      </div>

      <div v-if="loading" class="loading">
        <img src="static/padlock.gif" />
        <p>Loading&hellip;</p>
      </div>

      <div v-if="error" class="status-message text-xs-center">
        <v-icon mx-auto x-large color="teal lighten-1" :class="['fa', errorIcon, 'mt-4 mb-4']">{{errorIcon}}</v-icon>
        <p class="xs8 offset-xs2" v-html="errorString"></p>
      </div>

      <div class="list layout column align-center" v-if="listData && !loading && !error">

             <v-tabs
                v-model="active_tab"
                color="transparent"
                dark
                slider-color="orange  lighten-1"
                class="tabs"
              >
                <div class="tabs-wrapper-custom flex md8 xs12">
                  <v-tab ripple> Results </v-tab>
                  <v-tab ripple> Summary </v-tab>
                </div>
                <v-tab-item>
                  <v-layout row wrap>
                      <ListItem v-for="item in listData" :itemdata="item" :key="item.AddedDate+item.Domain"></ListItem>
                  </v-layout>
                </v-tab-item>

                <v-tab-item>
                    <v-layout row pb-2>
                       <v-flex xs12 ml-3 d-inline-block class="summary" v-if="summary.informationLeaked">
                         <h3>{{summary.eventCount}} sources leaked:</h3>
                         <v-chip  v-for="type in summary.informationLeaked" :key="type">{{type}}</v-chip>
                       </v-flex>

                    </v-layout>
                </v-tab-item>

             </v-tabs>

      </div>

  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" >
.loading{
  text-align: center;
  background: white;
  padding: 2rem;

  img{
    max-width: 320px;
  }

}

h3{
  margin: 2rem auto 1rem auto;
}

.list{
  padding-top:0;
}

/**  Customization for fixed toolbars **/
.tabs{
  position:relative;
  overflow-x:hidden;
  width:100%;
}

.tabs-wrapper-custom{
  background:#789;
}

.tabs__bar{
  position: fixed!important;
  top:192px;
  width:100%;
  z-index:2000;
}

.tabs__items{
  margin-top:48px;
}
.tabs__item,
.tabs__div{
  height:100%;
  line-height:100%;
  min-height:48px;
}

</style>

<script>
import appApi from '@/services/appService'
import ListItem from '@/components/ListItem'
import _ from 'lodash'

export default {
  components: {
    ListItem
  },
  data: function () {
    return {
      email: '',
      active_tab: '',
      error: false,
      errorString: '',
      errorIcon: '',
      loading: true,
      listData: [],
      summary: {}
    }
  },
  created: function () {
    if (typeof this.$route !== 'undefined') this.email = this.$route.params.email

    if (this.email.length > 0) {
      const service = appApi.Service.getHacksFromAPI(this.email)
      service.then(result => {
        console.log('list.result:', result)
        this.listData = result.events
        this.summary = this.summarize(result.events)
        if (result.error && result.events.length === 0) {
          this.error = true
          this.errorString = 'Congratulations, we could not find anything!'
          this.errorIcon = 'fa-smile-o'
        }
        this.loading = false
      })
        .catch(err => {
          this.error = true
          this.loading = false
          console.log('Error:', err)
          if (err.ok === false) {
            this.errorString = ''
            this.errorIcon = 'fa-smile-o'
          }
          switch (err.status) {
            case 404:
              this.errorString = 'Congratulations, we could not find anything!'
              this.errorIcon = 'fa-smile-o'
              break
            case 500:
            case 502:
              this.errorString = 'Oh No! We could not get a response! Our services are down!'
              this.errorIcon = 'fa-chain-broken'
              break
            default:
            case 0:
              this.errorString = 'Oh No! We could not get a response! Either we are offline, or you are offline.'
              this.errorIcon = 'fa-chain-broken'
              break
          }
        })
    }
  },
  methods: {
    summarize: function (events) {
      let summary = {}
      summary.eventCount = events.length
      summary.informationLeaked = _.reduce(events, function (result, value, key) {
        result = _.union(result, value.DataClasses)
        return result
      }, [])
      return summary
    }
  }

}
</script>

<template>
  <div class="container fluid">

      <div v-if="!listData">
        <p>How about searching?</p>
      </div>

      <div v-if="error" class="status-message text-xs-center">
        <v-icon mx-auto x-large color="teal lighten-1" :class="['fa', errorIcon, 'mt-4 mb-4']">{{errorIcon}}</v-icon>
        <p class="xs8 offset-xs2" v-html="errorString"></p>
      </div>

      <div class="list layout column align-center" v-if="listData.length">
        <ListItem v-for="item in listData" :itemdata="item" :key="item.AddedDate+item.Domain"></ListItem>
      </div>

  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>


</style>

<script>
import pwnd from '@/services/haveibeenpwnd'
import ListItem from '@/components/ListItem'

export default {
  components: {
    ListItem
  },
  data: function () {
    return {
      email: '',
      error: false,
      errorString: '',
      errorIcon: '',
      listData: {}
    }
  },
  created: function () {
    if (typeof this.$route !== 'undefined') this.email = this.$route.params.email

    if (this.email.length > 0) {
      const service = pwnd.Service.getFromAPI(this.email)
      service.then(result => {
        this.listData = result.events
      })
        .catch(err => {
          this.error = true
          console.log('Error:', err)
          if (err.status === 404) {
            this.errorString = 'Congratulations, we could not find anything!'
            this.errorIcon = 'fa-smile-o'
          }
        })
    }
  }

}
</script>

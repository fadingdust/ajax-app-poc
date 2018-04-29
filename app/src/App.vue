<template>
  <v-app>
  <v-card flat>
    <v-toolbar dark color="grey darken-2" flat extended fixed>
    </v-toolbar>
   <v-layout row pb-2 class="content-wrapper">
      <v-flex md8 offset-md2 xs12>
        <v-card flat class="card--flex-toolbar">
          <v-toolbar
            class="white--text primary flex xs12 md8 offset-md2"
            card prominent fixed
            extended extension-height="64px"
          >
            <router-link :to="{ name:'Home' }">
            <v-avatar size="36px"><img
                      src="/static/img/icons/android-icon-36x36.png"
                      alt="Logo"
                    ></v-avatar>
                    </router-link>

            <v-toolbar-title v-text="title"></v-toolbar-title>

            <v-layout row slot="extension">
              <v-flex xs10  offset-xs1>

                <v-form v-model="form_valid" @submit.prevent="handleSearchSubmit" class="search-form">
                  <v-layout row>
                    <v-flex>
                      <v-text-field
                        name="input-email"
                        label="Enter your Email"
                        hint=""
                        v-model="user.email"
                        color="white"
                        :rules="emailRules"
                        required
                        append-icon="fa-envelope-o"
                      ></v-text-field>
                    </v-flex>

                    <v-flex class="flex--submit">
                      <v-btn type="submit" class="btn--submit">Search</v-btn>
                    </v-flex>
                  </v-layout>

                </v-form>
              </v-flex>
            </v-layout>

          </v-toolbar>

          <v-content>
             <router-view :key="this.$route.params.email" />
          </v-content>

          <!-- v-footer fixed app></v-footer -->

        </v-card>
      </v-flex>
    </v-layout>
    </v-card>
  </v-app>
</template>
<style>

.application .theme--light.list,
.theme--light .list,
.application .theme--light.card--flat,
.theme--light .card--flat{
  background-color:#fbfbfb!important;
}

.flex--submit{
  max-width:100px;
  margin-top: 8px;
}

.application .theme--light.input-group input,
.application .theme--light.input-group textarea,
.theme--light .input-group input,
.theme--light .input-group textarea,
.application .theme--light.input-group:not(.input-group--error) label,
.theme--light .input-group:not(.input-group--error) label{
  color: #fff!important;
  font-weight:bold;
}
.input-group.error--text{
  color: #fff!important;
  font-weight:bold;
  font-style: italic;
}

.toolbar--prominent{
  margin-top:64px!important;
}
main.content{
  margin-top: 192px;
}

.theme--light .toolbar--prominent{
 /* background-color:#d32f2f !important;  red.darken2*/
}

/** Color-change the search-bar **/
@media (min-width:961px){

  .theme--light .toolbar--prominent .input-group.white--text{
    color:#000!important;
  }

}
@media (max-width:960px){
  .toolbar--prominent{
    margin-top: 0!important;
  }
  main.content{
    margin-top: 128px;
  }

  .card--flex-toolbar{

  }


  .theme--light .toolbar--prominent.grey--text{
    color:#fff!important;
  }

  .application .theme--light.input-group input,
  .application .theme--light.input-group textarea,
  .theme--light .input-group input,
  .theme--light .input-group textarea{
      color:#fff!important;
  }
}

</style>

<script>
export default {
  // Data from: https://haveibeenpwned.com/api/v2/breachedaccount/email@domain.com
  name: 'App',
  data () {
    return {
      title: 'Have I Been Hacked?',
      user: {
        email: ''
      },
      form_valid: false,
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,4})+$/.test(v) || 'E-mail must be valid'
      ]
    }
  },
  created: function () {
    if (typeof this.$route !== 'undefined') this.user.email = this.$route.params.email

    // Hijack the router as a common event bus :/
    this.$router.app.$on('events-summary', (summary) => {
      this.handleSummary(summary)
    })
  },
  methods: {
    handleSearchSubmit () {
      // Send data to the server or update your stores and such.
      if (this.form_valid) {
        this.$router.push('/email/' + this.user.email)
        // TODO: Prime opportunity to get from service to store early.
      }
    }
  }
}
</script>

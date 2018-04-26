<template>
  <v-app>
  <v-card flat>
    <v-toolbar dark color="primary" flat extended>
    </v-toolbar>
   <v-layout row pb-2>
      <v-flex md8 offset-md2 xs12>
        <v-card flat class="card--flex-toolbar">
          <v-toolbar
            class="grey--text"
            card prominent
            extended extension-height="64px"
          >
            <router-link :to="{ name:'Home' }">
            <v-avatar size="36px"><img
                      src="/static/img/icons/android-icon-36x36.png"
                      alt="Logo"
                    ></v-avatar>
                    </router-link>

            <v-toolbar-title v-text="title"></v-toolbar-title>

            <v-layout row slot="extension"  pb-2>
              <v-flex xs10  offset-xs1>

                <v-form v-model="form_valid" @submit.prevent="handleSearchSubmit">

                  <v-text-field
                    name="input-email"
                    label="Enter your Email"
                    hint=""
                    v-model="user.email"
                    color="white"
                    :rules="emailRules"
                    required
                    append-icon="fa-search"
                  ></v-text-field>

                </v-form>
              </v-flex>
            </v-layout>

          </v-toolbar>

          <v-content>
            <router-view :key="this.$route.params.email"/>
          </v-content>

          <v-footer fixed app>
               <v-layout row pb-2>
                <v-flex xs12 ml-3>
                  <span>&copy; 2018</span>
              </v-flex>
              </v-layout>
          </v-footer>

        </v-card>
      </v-flex>
    </v-layout>
    </v-card>
  </v-app>
</template>
<style>

.input-group.error--text{
  color: #000!important;
}

.card--flex-toolbar{
  margin-top:-64px;
}

/** Color-change the search-bar **/
@media (min-width:941px){

  .theme--light .toolbar--prominent .input-group.white--text{
    color:#000!important;
  }

}
@media (max-width:940px){
  .card--flex-toolbar{
    margin-top:-110px;
  }

  .theme--light .toolbar--prominent{
    background-color:#ffa726 !important;
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
        v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
      ]
    }
  },
  created: function () {
    if (typeof this.$route !== 'undefined') this.user.email = this.$route.params.email
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

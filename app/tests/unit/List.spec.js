//import { shallow } from '@vue/test-utils'
import { mount, createLocalVue } from '@vue/test-utils';
import List from '@/components/List.vue'

import Vuetify from 'vuetify'
import resource from 'vue-resource'

describe('List.vue', () => {
  it('renders listData when passed', () => {

    /*
     * Vuetify-safe version:
     * http://fernandobasso.github.io/en/javascript/unit-testing-vue-vuetify-with-jest-and-vue-test-utils.html
     */
    const listData = [{
            "Name":"Adobe",
            "Title":"Adobe",
            "Domain":"adobe.com",
            "BreachDate":"2013-10-04",
            "AddedDate":"2013-12-04T00:00Z",
            "ModifiedDate":"2013-12-04T00:00Z",
            "PwnCount":152445165,
            "Description":"In October 2013, 153 million Adobe accounts were breached with each containing an internal ID, username, email, <em>encrypted</em> password and a password hint in plain text. The password cryptography was poorly done and <a href=\"http://stricture-group.com/files/adobe-top100.txt\" target=\"_blank\" rel=\"noopener\">many were quickly resolved back to plain text</a>. The unencrypted hints also <a href=\"http://www.troyhunt.com/2013/11/adobe-credentials-and-serious.html\" target=\"_blank\" rel=\"noopener\">disclosed much about the passwords</a> adding further to the risk that hundreds of millions of Adobe customers already faced.",
            "DataClasses":["Email addresses","Password hints","Passwords","Usernames"],
            "IsVerified":true,
            "IsSensitive":false,
            "IsRetired":false,
            "IsSpamList":false
            }]

    let wrapper;
    const localVue = createLocalVue();
    localVue.use(Vuetify)
    localVue.use(resource)

    wrapper = mount(List, {
      localVue: localVue
    })

    wrapper.setData({ // Replace data value with this fake data
      listData: listData,
      loading: false
    })

    expect(wrapper.find('.list').exists()).toBe(true)

    expect(wrapper.find('.list-item').exists()).toBe(true)

  }), // it

  it('renders loading screen', () => {

    /*
     * Vuetify-safe version:
     * http://fernandobasso.github.io/en/javascript/unit-testing-vue-vuetify-with-jest-and-vue-test-utils.html
     */
    const listData = [{
            "Name":"Adobe",
            "Title":"Adobe",
            "Domain":"adobe.com",
            "BreachDate":"2013-10-04",
            "AddedDate":"2013-12-04T00:00Z",
            "ModifiedDate":"2013-12-04T00:00Z",
            "PwnCount":152445165,
            "Description":"In October 2013, 153 million Adobe accounts were breached with each containing an internal ID, username, email, <em>encrypted</em> password and a password hint in plain text. The password cryptography was poorly done and <a href=\"http://stricture-group.com/files/adobe-top100.txt\" target=\"_blank\" rel=\"noopener\">many were quickly resolved back to plain text</a>. The unencrypted hints also <a href=\"http://www.troyhunt.com/2013/11/adobe-credentials-and-serious.html\" target=\"_blank\" rel=\"noopener\">disclosed much about the passwords</a> adding further to the risk that hundreds of millions of Adobe customers already faced.",
            "DataClasses":["Email addresses","Password hints","Passwords","Usernames"],
            "IsVerified":true,
            "IsSensitive":false,
            "IsRetired":false,
            "IsSpamList":false
            }]

    let wrapper;
    const localVue = createLocalVue();
    localVue.use(Vuetify)
    localVue.use(resource)

    wrapper = mount(List, {
      localVue: localVue
    })

    wrapper.setData({ // Replace data value with this fake data
      loading: true
    })

    expect(wrapper.find('.loading').exists()).toBe(true)

    expect(wrapper.find('img').exists()).toBe(true)

  }), // it

  it('renders errorString when passed', () => {
    let wrapper;
    const localVue = createLocalVue();
    localVue.use(Vuetify)
    localVue.use(resource)

    wrapper = mount(List, {
      localVue: localVue
    })

    wrapper.setData({ // Replace data value with this fake data
      error: true,
      errorString: 'Hello There'
    })

    expect(wrapper.find('.status-message').exists()).toBe(true)
    expect(wrapper.find('.status-message').html()).toMatch(new RegExp('Hello There'))

  }) // it

}) // describe

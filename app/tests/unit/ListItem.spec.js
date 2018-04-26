//import { shallow } from '@vue/test-utils'
import { mount, createLocalVue } from '@vue/test-utils';
import ListItem from '@/components/ListItem.vue'

import Vuetify from 'vuetify'

describe('ListItem.vue', () => {
  it('renders listData when passed', () => {

/*
  //Doesn't work with Vuetify
    const wrapper = shallow(List, {
      propsData: { msg: msg_text }
    })
*/

/*
 * Vuetify-safe version:
 * http://fernandobasso.github.io/en/javascript/unit-testing-vue-vuetify-with-jest-and-vue-test-utils.html
 */
    const itemData = {
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
            }

    let wrapper;
    const localVue = createLocalVue();
    localVue.use(Vuetify)

    wrapper = mount(ListItem, {
      localVue: localVue,
      propsData: {
        itemdata: itemData
      }
    });

    expect(wrapper.findAll('.list-item').length).toBe(1)

    expect(wrapper.find('.list-item').html()).toMatch(new RegExp(itemData.BreachDate))
    expect(wrapper.find('.list-item').html()).toMatch(new RegExp('is-verified'))
    expect(wrapper.find('.list-item').html()).toMatch(new RegExp('is-not-spam'))

  }),


  it('renders listData:not-verified:spam when passed', () => {

/*
  //Doesn't work with Vuetify
    const wrapper = shallow(List, {
      propsData: { msg: msg_text }
    })
*/

/*
 * Vuetify-safe version:
 * http://fernandobasso.github.io/en/javascript/unit-testing-vue-vuetify-with-jest-and-vue-test-utils.html
 */
    const itemData = {
            "Name":"Adobe",
            "Title":"Adobe",
            "Domain":"adobe.com",
            "BreachDate":"2013-10-04",
            "AddedDate":"2013-12-04T00:00Z",
            "ModifiedDate":"2013-12-04T00:00Z",
            "PwnCount":152445165,
            "Description":"In October 2013, 153 million Adobe accounts were breached with each containing an internal ID, username, email, <em>encrypted</em> password and a password hint in plain text. The password cryptography was poorly done and <a href=\"http://stricture-group.com/files/adobe-top100.txt\" target=\"_blank\" rel=\"noopener\">many were quickly resolved back to plain text</a>. The unencrypted hints also <a href=\"http://www.troyhunt.com/2013/11/adobe-credentials-and-serious.html\" target=\"_blank\" rel=\"noopener\">disclosed much about the passwords</a> adding further to the risk that hundreds of millions of Adobe customers already faced.",
            "DataClasses":["Email addresses","Password hints","Passwords","Usernames"],
            "IsVerified":false,
            "IsSensitive":false,
            "IsRetired":false,
            "IsSpamList":true
            }

    let wrapper;
    const localVue = createLocalVue();
    localVue.use(Vuetify)

    wrapper = mount(ListItem, {
      localVue: localVue,
      propsData: {
        itemdata: itemData
      }
    });

    expect(wrapper.findAll('.list-item').length).toBe(1)

    expect(wrapper.find('.list-item').html()).toMatch(new RegExp('is-not-verified'))

    expect(wrapper.find('.list-item').html()).toMatch(new RegExp('is-spam'))

  })

})

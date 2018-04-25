//import { shallow } from '@vue/test-utils'
import { mount, createLocalVue } from '@vue/test-utils';
import HelloWorld from '@/components/HelloWorld.vue'

import Vuetify from 'vuetify'

describe('HelloWorld.vue', () => {
  it('renders props.msg when passed', () => {

/*
  //Doesn't work with Vuetify
    const wrapper = shallow(HelloWorld, {
      propsData: { msg: msg_text }
    })
*/

/*
 * Vuetify-safe version:
 * http://fernandobasso.github.io/en/javascript/unit-testing-vue-vuetify-with-jest-and-vue-test-utils.html
 */
    const msg_text = 'new message'
    let cmp;
    const localVue = createLocalVue();
    localVue.use(Vuetify)

    cmp = mount(HelloWorld, {
      localVue: localVue,
    });

    cmp.setProps(
      { // Replace data value with this fake data
        msg: msg_text
      }
    );
    expect( cmp.find('blockquote').text() ).toMatch(msg_text)
  })

})

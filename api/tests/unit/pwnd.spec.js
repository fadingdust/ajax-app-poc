//import { shallow } from '@vue/test-utils'
import pwnd from '@/services/haveibeenpwnd'


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

describe('services.pwnd', () => {
  it('returns data when email is passed', async () => {

      expect.assertions(2);

      const email='tom@tom.com'

      return pwnd.Service.getFromAPI(email).then(data => {
        expect(typeof data).toBe('object')
        expect(data.email).toMatch(email)
      });


  }), // it

  it('returns a empty data when unknown domain is passed', async () => {

    expect.assertions(2);

    async function demo() {
      await sleep(1000);

      const email='jf@ffnreb.com'

      await sleep(1000);

      return pwnd.Service.getFromAPI(email).then(data => {
        expect(typeof data).toBe('object')
        expect(data.email).toMatch(email)
      });
    }
    return demo()
  }) // it


}) // describe

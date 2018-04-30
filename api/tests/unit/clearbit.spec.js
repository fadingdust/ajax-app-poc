//import { shallow } from '@vue/test-utils'
import cb from '@/services/clearbit'

describe('services.clearbit', () => {
  it('returns an icon when domain is passed', async () => {

    expect.assertions(3);

    const domain='adobe.com'

    return cb.Service.getFromAPI(domain).then(data => {
      expect(typeof data).toBe('object')
      expect(data.domain).toMatch(domain)
      expect(data.iconURL.length).toBeGreaterThan(1)
    });

  }), // it

  it('returns an data icon when unknown domain is passed', async () => {

    expect.assertions(3);

    const domain='ffnreb.com'

    return cb.Service.getFromAPI(domain).then(data => {
      expect(typeof data).toBe('object')
      expect(data.domain).toMatch(domain)
      expect(data.iconURL).toMatch(new RegExp('data'))
    });

  }) // it

}) // describe

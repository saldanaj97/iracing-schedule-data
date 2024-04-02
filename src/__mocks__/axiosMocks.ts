// Mock the post method of Axios
export const axiosMockPost = jest.fn().mockResolvedValueOnce({
  data: {
    authcode: '*****************',
    autoLoginSeries: null,
    autoLoginToken: null,
    custId: 693109,
    email: 'sampleEmail@email.com',
    ssoCookieDomain: '.iracing.com',
    ssoCookieName: 'irsso_membersv2',
    ssoCookiePath: '/',
    ssoCookieValue: '******',
  },
})

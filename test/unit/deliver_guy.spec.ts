// tslint:disable-next-line
import DeliveryGuy from '../../src/delivery_guy'
const fetchMock = require('fetch-mock')

describe('DeliveryGuy', () => {
  afterEach(() => {
    fetchMock.restore()
  })

  describe('get()', () => {
    it('delivers a JSON response', async () => {
      const mockData = { foo: 'bar' }

      fetchMock.get('/foo', mockData)

      const response = await DeliveryGuy.get('/foo')

      expect(response).toEqual(mockData)
    })

    it('delivers a text response', async () => {
      const mockData = 'Hello World!'

      fetchMock.get('/foo', mockData)

      const response = await DeliveryGuy.get('/foo')

      expect(response).toEqual(mockData)
    })
  })

  describe('post()', () => {
    it('delivers a JSON response from a POST request', async () => {
      const url = '/foo'
      const mockData = { foo: 'bar' }
      const postData = { bar: 'foo' }

      fetchMock.post((input: any, init: any) => {
        return (
          input === url &&
          init.body === JSON.stringify(postData) &&
          init.headers['content-type'] === 'application/json'
        )
      }, mockData)

      const jsonBody = await DeliveryGuy.post(url, postData)

      expect(jsonBody).toEqual(mockData)
    })
  })

  describe('put()', () => {
    it('delivers a JSON response from a PUT request', async () => {
      const url = '/foo'
      const mockData = { foo: 'bar' }
      const postData = { bar: 'foo' }

      fetchMock.put((input: any, init: any) => {
        return (
          input === url &&
          init.body === JSON.stringify(postData) &&
          init.headers['content-type'] === 'application/json'
        )
      }, mockData)

      const jsonBody = await DeliveryGuy.put(url, postData)

      expect(jsonBody).toEqual(mockData)
    })
  })

  describe('patch()', () => {
    it('delivers a JSON response from a PATCH request', async () => {
      const url = '/foo'
      const mockData = { foo: 'bar' }
      const postData = { bar: 'foo' }

      fetchMock.patch((input: any, init: any) => {
        return (
          input === url &&
          init.body === JSON.stringify(postData) &&
          init.headers['content-type'] === 'application/json'
        )
      }, mockData)

      const jsonBody = await DeliveryGuy.patch(url, postData)

      expect(jsonBody).toEqual(mockData)
    })
  })

  describe('delete()', () => {
    it('delivers a JSON response from a DELETE request', async () => {
      const mockData = { foo: 'bar' }

      fetchMock.delete('/foo', mockData)

      const response = await DeliveryGuy.delete('/foo')

      expect(response).toEqual(mockData)
    })
  })

  describe('head()', () => {
    it('delivers a JSON response from a HEAD request', async () => {
      const mockData = { foo: 'bar' }

      fetchMock.head('/foo', mockData)

      const response = await DeliveryGuy.head('/foo')

      expect(response).toEqual(mockData)
    })
  })

  describe('options()', () => {
    it('delivers a JSON response from a OPTIONS request', async () => {
      const mockData = { foo: 'bar' }

      fetchMock.mock('/foo', mockData, { method: 'OPTIONS' })

      const response = await DeliveryGuy.options('/foo')

      expect(response).toEqual(mockData)
    })
  })

  describe('error handling', () => {
    it('should throw an error', async () => {
      fetchMock.get('/foo', {
        body: {},
        status: 400
      })

      try {
        await DeliveryGuy.get('/foo')
      } catch(e) {
        expect(e).toBeInstanceOf(Error)
        expect(e.response).toBeTruthy()
        expect(e.response.status).toEqual(400)
      }
    })
  })

  describe('set options', () => {
    it('does apply a header', async () => {
      const url = '/foo'
      const userAgent = 'Mozilla/5.0 FOO!'
      const mockData = { foo: 'bar' }

      fetchMock.get((input: any, init: any) => {
        return input === url && init.headers['user-agent'] === userAgent
      }, mockData)

      const response = await DeliveryGuy.get(url, { headers: { 'user-agent': userAgent } })

      expect(response).toEqual(mockData)
    })

    it('does merge header correctly', async () => {
      const url = '/foo'
      const userAgent = 'Mozilla/5.0 FOO!'
      const payload = { bar: 'foo' }
      const mockData = { foo: 'bar' }

      fetchMock.post((input: any, init: any) => {
        return input === url
        && init.headers['user-agent'] === userAgent
        && init.headers['content-type'] === 'application/json'
      }, mockData)

      const response = await DeliveryGuy.post(url, payload, { headers: { 'user-agent': userAgent } })

      expect(response).toEqual(mockData)
    })

    it('does apply credentials settings', async () => {
      const url = '/foo'
      const mockData = { foo: 'bar' }

      fetchMock.get((input: any, init: any) => {
        return input === url && init.credentials === 'same-origin'
      }, mockData)

      const response = await DeliveryGuy.get(url, { credentials: 'same-origin' })

      expect(response).toEqual(mockData)
    })
  })

  describe('set global options', () => {
    beforeAll(() => {
      DeliveryGuy.reset()
    })

    afterAll(() => {
      DeliveryGuy.reset()
    })

    const userAgent = 'Mozilla/5.0 FOO!'
    const url = '/foo'
    const mockData = { foo: 'bar' }

    it('does apply a global header', async () => {


      fetchMock.get((input: any, init: any) => {
        return input === url && init.headers['user-agent'] === userAgent
      }, mockData)

      DeliveryGuy.addGlobalOption('headers', { 'user-agent': userAgent })

      const response = await DeliveryGuy.get(url)

      expect(response).toEqual(mockData)
    })

    it('does apply global credentials settings', async () => {
      fetchMock.get((input: any, init: any) => {
        return input === url && init.credentials === 'same-origin' && init.headers['user-agent'] === userAgent
      }, mockData)

      DeliveryGuy.addGlobalOption('credentials', 'same-origin')

      const response = await DeliveryGuy.get(url)

      expect(response).toEqual(mockData)
    })
  })

  describe('set interceptors', () => {
    it('should call interceptors', async () => {
      const url = '/foo'
      const requestInterceptor = jest.fn()
      const responseInterceptor = jest.fn()
      DeliveryGuy.intercept('request', requestInterceptor)
      DeliveryGuy.intercept('response', responseInterceptor)
      const mockData = { foo: 'bar' }

      fetchMock.get(url, mockData)

      expect(requestInterceptor.mock.calls.length).toBe(0)
      expect(responseInterceptor.mock.calls.length).toBe(0)

      const response = await DeliveryGuy.get(url)

      expect(response).toEqual(mockData)
      expect(requestInterceptor.mock.calls.length).toBe(1)
      expect(responseInterceptor.mock.calls.length).toBe(1)
      expect(requestInterceptor.mock.calls[0][0]).toBe(url)
      expect(responseInterceptor.mock.calls[0][0]).toBe(url)
    })
  })
})

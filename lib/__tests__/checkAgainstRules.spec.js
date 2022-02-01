import supertest from 'supertest'
import app from '../app'

const request = supertest(app)

describe('E2E Tests (Check Against Rules Middleware)', () => {
  test('should return OK if payload is correct', async () => {
    console.log(request)
    const { text } = await request
      .put('/api/account/profile')
      .set('Content-Type', 'application/json')
      .send({
        name: 'string',
        job_title: 'string',
        photo_url: 'string',
      })
      .expect(200)

    expect(text).toEqual('OK')
  })

  test('should throw error if payload does not include all the parameters or have extra', async () => {
    const { text } = await request
      .put('/api/account/profile')
      .set('Content-Type', 'application/json')
      .send({
        name: 'string',
        job_title: 'string',
      })
      .expect(400)

    expect(text).toContain(
      'All required parameters should be present and no extraneous parameters should be passed'
    )
  })

  test('should throw error if parameters are not correct type', async () => {
    const { text } = await request
      .put('/api/account/profile')
      .set('Content-Type', 'application/json')
      .send({
        name: 123,
        job_title: 'string',
        photo_url: 'string',
      })
      .expect(400)

    expect(text).toContain('All parameter data types should be correct!')
  })
})

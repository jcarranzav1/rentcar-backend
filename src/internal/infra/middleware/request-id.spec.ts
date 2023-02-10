import { RequestCorrelationID } from './request-id'

describe('RequestCorrelationID', () => {
  it('should be defined', () => {
    expect(new RequestCorrelationID()).toBeDefined()
  })
})

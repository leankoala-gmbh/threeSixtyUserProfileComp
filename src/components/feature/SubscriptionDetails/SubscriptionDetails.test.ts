import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import SubscriptionDetails from './SubscriptionDetails.vue'

describe('SubscriptionDetails.vue', () => {
  it('should render', () => {
    const wrapper = mount(SubscriptionDetails)
    expect(wrapper).toBeTruthy()
  })
})

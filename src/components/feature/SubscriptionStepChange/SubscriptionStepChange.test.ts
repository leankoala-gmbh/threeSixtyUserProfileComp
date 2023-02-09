import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import SubscriptionStepChange from './SubscriptionStepChange.vue'

describe('SubscriptionStepChange.vue', () => {
  it('should render', () => {
    const wrapper = mount(SubscriptionStepChange)
    expect(wrapper).toBeTruthy()
  })
})

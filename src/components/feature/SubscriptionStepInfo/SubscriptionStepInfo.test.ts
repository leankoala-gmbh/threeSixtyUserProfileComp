import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import SubscriptionStepInfo from './SubscriptionStepInfo.vue'

describe('SubscriptionStepInfo.vue', () => {
  it('should render', () => {
    const wrapper = mount(SubscriptionStepInfo)
    expect(wrapper).toBeTruthy()
  })
})

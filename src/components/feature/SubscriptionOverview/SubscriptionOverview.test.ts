import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import SubscriptionOverview from './SubscriptionOverview.vue'

describe('SubscriptionOverview.vue', () => {
  it('should render', () => {
    const wrapper = mount(SubscriptionOverview)
    expect(wrapper).toBeTruthy()
  })
})

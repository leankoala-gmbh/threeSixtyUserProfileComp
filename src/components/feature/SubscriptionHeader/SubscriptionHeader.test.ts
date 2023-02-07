import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import SubscriptionHeader from './SubscriptionHeader.vue'

describe('SubscriptionHeader.vue', () => {
  it('should render', () => {
    const wrapper = mount(SubscriptionHeader)
    expect(wrapper).toBeTruthy()
  })
})

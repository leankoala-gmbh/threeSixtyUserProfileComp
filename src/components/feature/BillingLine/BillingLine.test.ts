import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BillingLine from './BillingLine.vue'

describe('BillingLine.vue', () => {
  it('should render', () => {
    const wrapper = mount(BillingLine)
    expect(wrapper).toBeTruthy()
  })
})

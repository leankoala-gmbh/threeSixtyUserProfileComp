import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import QuantitySelector from './QuantitySelector.vue'

describe('QuantitySelector.vue', () => {
  it('should render', () => {
    const wrapper = mount(QuantitySelector)
    expect(wrapper).toBeTruthy()
  })
})

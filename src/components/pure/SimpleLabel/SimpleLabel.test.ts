import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import SimpleLabel from './SimpleLabel.vue'

describe('SimpleLabel.vue', () => {
  it('should render', () => {
    const wrapper = mount(SimpleLabel)
    expect(wrapper).toBeTruthy()
  })
})

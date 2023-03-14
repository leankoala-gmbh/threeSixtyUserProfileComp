import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MonitorAdditionHeader from './MonitorAdditionHeader.vue'

describe('MonitorAdditionHeader.vue', () => {
  it('should render', () => {
    const wrapper = mount(MonitorAdditionHeader)
    expect(wrapper).toBeTruthy()
  })
})

import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MonitorBoxHeader from './MonitorBoxHeader.vue'

describe('MonitorBoxHeader.vue', () => {
  it('should render', () => {
    const wrapper = mount(MonitorBoxHeader)
    expect(wrapper).toBeTruthy()
  })
})

import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MonitorDetailBox from './MonitorDetailBox.vue'

describe('MonitorDetailBox.vue', () => {
  it('should render', () => {
    const wrapper = mount(MonitorDetailBox)
    expect(wrapper).toBeTruthy()
  })
})

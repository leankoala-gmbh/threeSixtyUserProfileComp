import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MonitorAdditionInfo from './MonitorAdditionInfo.vue'

describe('MonitorAdditionInfo.vue', () => {
  it('should render', () => {
    const wrapper = mount(MonitorAdditionInfo)
    expect(wrapper).toBeTruthy()
  })
})

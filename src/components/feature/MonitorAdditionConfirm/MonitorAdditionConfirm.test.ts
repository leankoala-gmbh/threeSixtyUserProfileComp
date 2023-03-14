import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MonitorAdditionConfirm from './MonitorAdditionConfirm.vue'

describe('MonitorAdditionConfirm.vue', () => {
  it('should render', () => {
    const wrapper = mount(MonitorAdditionConfirm)
    expect(wrapper).toBeTruthy()
  })
})

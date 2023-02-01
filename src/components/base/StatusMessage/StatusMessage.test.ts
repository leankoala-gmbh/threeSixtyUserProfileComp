import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import StatusMessage from './StatusMessage.vue'

describe('StatusMessage.vue', () => {
  it('should render', () => {
    const wrapper = mount(StatusMessage)
    expect(wrapper).toBeTruthy()
  })
})

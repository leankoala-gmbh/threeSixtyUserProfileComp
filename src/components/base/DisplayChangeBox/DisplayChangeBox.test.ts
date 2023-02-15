import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import DisplayChangeBox from './DisplayChangeBox.vue'

describe('DisplayChangeBox.vue', () => {
  it('should render', () => {
    const wrapper = mount(DisplayChangeBox)
    expect(wrapper).toBeTruthy()
  })
})

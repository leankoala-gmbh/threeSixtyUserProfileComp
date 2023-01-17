import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import TabviewUserData from './TabviewUserData.vue'

describe('TabviewUserData.vue', () => {
  it('should render', () => {
    const wrapper = mount(TabviewUserData)
    expect(wrapper).toBeTruthy()
  })
})

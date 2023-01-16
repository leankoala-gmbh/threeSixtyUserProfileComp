import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import TabviewHeader from './TabviewHeader.vue'

describe('TabviewHeader.vue', () => {
  it('should render', () => {
    const wrapper = mount(TabviewHeader, {
      slots: {
        default: 'Hello World',
        subline: 'This is a subline'
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})

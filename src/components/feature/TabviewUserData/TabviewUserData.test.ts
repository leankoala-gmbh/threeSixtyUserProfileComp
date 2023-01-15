import { describe, it, expect} from 'vitest'
import { mount } from '@vue/test-utils'
import TabviewUserData from './TabviewUserData.vue'

describe('TabviewUserData.vue', () => {
  it('should render', () => {
    const wrapper = mount(TabviewUserData)
    expect(wrapper).toBeTruthy()
  })
})
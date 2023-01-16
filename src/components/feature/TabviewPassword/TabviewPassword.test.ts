import { describe, it, expect} from 'vitest'
import { mount } from '@vue/test-utils'
import TabviewPassword from './TabviewPassword.vue'

describe('TabviewPassword.vue', () => {
  it('should render', () => {
    const wrapper = mount(TabviewPassword)
    expect(wrapper).toBeTruthy()
  })
})
import { describe, it, expect} from 'vitest'
import { mount } from '@vue/test-utils'
import TabviewLicense from './TabviewLicense.vue'

describe('TabviewLicense.vue', () => {
  it('should render', () => {
    const wrapper = mount(TabviewLicense)
    expect(wrapper).toBeTruthy()
  })
})
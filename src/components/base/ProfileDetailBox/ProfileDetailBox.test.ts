import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ProfileDetailBox from './ProfileDetailBox.vue'

describe('ProfileDetailBox.vue', () => {
  it('should render', () => {
    const wrapper = mount(ProfileDetailBox)
    expect(wrapper).toBeTruthy()
  })
})

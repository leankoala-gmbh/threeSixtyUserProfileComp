import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ProfileAvatar from './ProfileAvatar.vue'

describe('ProfileAvatar.vue', () => {
  it('should render', () => {
    const wrapper = mount(ProfileAvatar)
    expect(wrapper).toBeTruthy()
  })
})

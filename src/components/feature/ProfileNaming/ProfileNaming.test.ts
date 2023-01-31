import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ProfileNaming from './ProfileNaming.vue'

describe('ProfileNaming.vue', () => {
  it('should render', () => {
    const wrapper = mount(ProfileNaming)
    expect(wrapper).toBeTruthy()
  })
})

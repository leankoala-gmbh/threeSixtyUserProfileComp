import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ProfileBoxHeader from './ProfileBoxHeader.vue'

describe('ProfileBoxHeader.vue', () => {
  it('should render', () => {
    const wrapper = mount(ProfileBoxHeader)
    expect(wrapper).toBeTruthy()
  })
})

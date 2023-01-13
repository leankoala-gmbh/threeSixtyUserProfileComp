import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ProfileInfos from './ProfileInfos.vue'

describe('ProfileInfos.vue', () => {
  it('should render', () => {
    const wrapper = mount(ProfileInfos)
    expect(wrapper).toBeTruthy()
  })
})

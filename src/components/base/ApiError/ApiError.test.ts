import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ApiError from './ApiError.vue'

describe('ApiError.vue', () => {
  it('should render', () => {
    const wrapper = mount(ApiError)
    expect(wrapper).toBeTruthy()
  })
})

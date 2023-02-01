import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AnnotationBox from './AnnotationBox.vue'

describe('AnnotationBox.vue', () => {
  it('should render', () => {
    const wrapper = mount(AnnotationBox)
    expect(wrapper).toBeTruthy()
  })
})

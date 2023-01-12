import { describe, it, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import TabviewGeneral from './TabviewGeneral.vue'

describe('TabviewGeneral.vue', () => {
  it('renders props.msg when passed', () => {
    const wrapper = shallowMount(TabviewGeneral, {
      props: {
        userDataObj: {
          name: 'test',
          email: 'features@leankoala.com'
        },
        inactiveFieldsArr: []
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})

import { shallowMount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
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

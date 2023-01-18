import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import TabviewPassword from './TabviewPassword.vue'

describe('TabviewPassword.vue', () => {
  it('should render', () => {
    const wrapper = mount(TabviewPassword)
    expect(wrapper).toBeTruthy()
  })

  it('should fails if no passwords are delivered', async () => {
    const wrapper = mount(TabviewPassword)
    const field = wrapper.get('#currentPassword')
    await wrapper.find('input[name=currentPassword]').setValue('ddd')
    expect(field.find('.errorMessage').text()).toBe('Password must be at least 8 characters long')
  })

  it('should fails if the new passwords are wrong', async () => {
    const wrapper = mount(TabviewPassword)
    const field1 = wrapper.get('#newPassword')
    await wrapper.find('input[name=newPassword]').setValue('ddd')
    await wrapper.find('input[name=newPasswordRepeat]').setValue('sds')
    expect(field1.find('.errorMessage').text()).toBe('Passwords do not match')
  })

  it('should work if passwords are correct', async () => {
    const wrapper = mount(TabviewPassword)
    const field1 = wrapper.get('#newPassword')
    const field2 = wrapper.get('#currentPassword')
    await wrapper.find('input[name=currentPassword]').setValue('3sded3223232')
    await wrapper.find('input[name=newPassword]').setValue('F13232fasd23e!')
    await wrapper.find('input[name=newPasswordRepeat]').setValue('F13232fasd23e!')
    expect(field1.find('.errorMessage').exists()).toBe(false)
    expect(field2.find('.errorMessage').exists()).toBe(false)
  })
})

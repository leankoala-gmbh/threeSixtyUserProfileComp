import { mount } from "@vue/test-utils"
import { describe, expect, it, test } from "vitest"
import TabviewUserData from "./TabviewUserData.vue"

describe("TabviewUserData.vue", () => {
  it("displays subline", () => {
    const wrapper = mount(TabviewUserData)
    expect(wrapper.text()).toContain("hello world")
  })

  it("displays the save button disabled", () => {
    const wrapper = mount(TabviewUserData)
    const button = wrapper.find('button[type="submit"]')
    expect(button.exists()).toBe(true)
    expect(button.attributes().disabled).toBeTruthy()
  })
  it("enables the save button after input", async () => {
    const wrapper = mount(TabviewUserData)
    const firstName = wrapper.find('input[name="firstname"]')
    const lastName = wrapper.find('input[name="lastname"]')
    await firstName.setValue("John")
    await lastName.setValue("Doe")
    const button = wrapper.find('button[type="submit"]')
    expect(button.attributes().disabled).toBe(undefined)
  })
})

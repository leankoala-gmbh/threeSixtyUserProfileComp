import type { Meta, StoryObj } from '@storybook/vue3'
import TabviewPassword from './TabviewPassword.vue'

const meta: Meta<typeof TabviewPassword> = {
  title: 'Components/Feature/TabviewPassword',
  component: TabviewPassword,
  tags: ['autodocs'],
  argTypes: {
    // Define your interactive Props here
    // example: {
    //  options: ['text', 'password', 'email', 'number'],
    //  control: {
    //    type: 'select'
    //  }
  },
  parameters: {
    docs: {
      description: {
        component: 'Some component _markdown_'
      }
    }
  }
}

export default meta
type Story = StoryObj<typeof TabviewPassword>

// First Story of the Component
export const TabviewPasswordStory: Story = {
  // name: 'Self defined Story Name',
  render: (args) => ({
    components: { TabviewPassword },
    setup() {
      return { args }
    },
    template: '<TabviewPassword v-bind="args" />'
  }),
  args: {
    // Define the Data for your props
    // example: 'Prefilled value'
  }
}

import type { Meta, StoryObj } from '@storybook/vue3'
import TabviewUserData from './TabviewUserData.vue'

const meta: Meta<typeof TabviewUserData> = {
  title: 'Components/Feature/TabviewUserData',
  component: TabviewUserData,
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
type Story = StoryObj<typeof TabviewUserData>

// First Story of the Component
export const TabviewUserDataStory: Story = {
  // name: 'Self defined Story Name',
  render: (args) => ({
    components: { TabviewUserData },
    setup() {
      return { args }
    },
    template: '<TabviewUserData v-bind="args" />'
  }),
  args: {
    // Define the Data for your props
    // example: 'Prefilled value'
  }
}

import type { Meta, StoryObj } from '@storybook/vue3'
import TabviewGeneral from './TabviewGeneral.vue'

const meta: Meta<typeof TabviewGeneral> = {
  title: 'Components/Feature/TabviewGeneral',
  component: TabviewGeneral,
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
type Story = StoryObj<typeof TabviewGeneral>

// First Story of the Component
export const TabviewGeneralStory: Story = {
  // name: 'Self defined Story Name',
  render: (args) => ({
    components: { TabviewGeneral },
    setup() {
      return { args }
    },
    template: '<TabviewGeneral v-bind="args" />'
  }),
  args: {
    // Define the Data for your props
    // example: 'Prefilled value'
  }
}

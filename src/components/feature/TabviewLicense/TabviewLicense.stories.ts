import type { Meta, StoryObj } from '@storybook/vue3'
import TabviewLicense from './TabviewLicense.vue'

const meta: Meta<typeof TabviewLicense> = {
  title: 'Components/Feature/TabviewLicense',
  component: TabviewLicense,
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
type Story = StoryObj<typeof TabviewLicense>

// First Story of the Component
export const TabviewLicenseStory: Story = {
  // name: 'Self defined Story Name',
  render: (args) => ({
    components: { TabviewLicense },
    setup() {
      return { args }
    },
    template: '<TabviewLicense v-bind="args" />'
  }),
  args: {
    // Define the Data for your props
    // example: 'Prefilled value'
  }
}

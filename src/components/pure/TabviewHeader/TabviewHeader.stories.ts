import type { Meta, StoryObj } from '@storybook/vue3'
import TabviewHeader from './TabviewHeader.vue'

const meta: Meta<typeof TabviewHeader> = {
  title: 'Components/Pure/TabviewHeader',
  component: TabviewHeader,
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
        component: 'A simple header element for tabviews'
      }
    }
  }
}

export default meta
type Story = StoryObj<typeof TabviewHeader>

export const TabviewHeaderStory: Story = {
  // name: 'TabHeader with subline',
  render: (args) => ({
    components: { TabviewHeader },
    setup() {
      return { args }
    },
    template: '<TabviewHeader>{{ args.default }}<template #subline>{{args.subline}}</template></TabviewHeader>'
  }),
  args: {
    // Define the Data for your props
    default: 'Hello World',
    subline: 'This is a subline'
  }
}

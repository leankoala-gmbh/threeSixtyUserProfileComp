import type { Meta, StoryObj } from '@storybook/vue3'
import ErrorMessage from './ErrorMessage.vue'

const meta: Meta<typeof ErrorMessage> = {
  title: 'Components/Pure/ErrorMessage',
  component: ErrorMessage,
  tags: ['autodocs'],
  argTypes: {
    slotContent: { control: { type: 'text' } }
  },
  parameters: {
    docs: {
      description: {
        component: 'Simple wrapper for error messages'
      }
    }
  }
}

export default meta
type Story = StoryObj<typeof ErrorMessage>

// First Story of the Component
export const ErrorMessageStory: Story = {
  // name: 'Self defined Story Name',
  render: (args) => ({
    components: { ErrorMessage },
    setup() {
      return { args }
    },
    template: '<ErrorMessage>{{ args.slotContent }}</ErrorMessage>'
  }),
  args: {
    slotContent: 'Error message'
  }
}

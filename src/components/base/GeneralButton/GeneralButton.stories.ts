import type { Meta, StoryObj } from '@storybook/vue3'
import GeneralButton from './GeneralButton.vue'

const meta: Meta<typeof GeneralButton> = {
  title: 'Components/Base/GeneralButton',
  component: GeneralButton,
  tags: ['autodocs'],
  argTypes: {
    tag: {
     options: ['a', 'button', 'div'],
     control: {
       type: 'select'
     }
    },
    isDisabled: {
      control: {
        type: 'boolean'
      }
    }
  },
  parameters: {
    docs: {
      description: {
        component: 'A button element'
      }
    }
  }
}

export default meta
type Story = StoryObj<typeof GeneralButton>

// First Story of the Component
export const GeneralButtonStory: Story = {
  // name: 'Self defined Story Name',
  render: (args) => ({
    components: { GeneralButton },
    setup() {
      return { args }
    },
    template: '<GeneralButton v-bind="args">This is Sparta!</GeneralButton>'
  }),
  args: {
    tag: 'button'
    // example: 'Prefilled value'
  }
}

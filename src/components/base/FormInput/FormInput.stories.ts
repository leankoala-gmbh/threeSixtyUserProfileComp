import type { Meta, StoryObj } from '@storybook/vue3'
import FormInput from './FormInput.vue'

const meta: Meta<typeof FormInput> = {
  title: 'FormInput',
  component: FormInput,
  tags: ['autodocs'],
  argTypes: {
    errorString: { control: { type: 'text' } },
    type: {
      options: ['text', 'password', 'email', 'number'],
      control: {
        type: 'select'
      }
    }
  },
  parameters: {
    docs: {
      description: {
        component: 'Some component _markdown_'
      }
    },
    source: {
      code: '<h1>Hello world</h1>',
      language: 'html',
      type: 'auto'
    }
  }
}

export default meta
type Story = StoryObj<typeof FormInput>

export const FormInputStory: Story = {
  render: (args) => ({
    components: { FormInput },
    setup() {
      return { args }
    },
    template: '<FormInput v-bind="args" />'
  }),
  args: {
    modelValue: 'Hello World'
  }
}

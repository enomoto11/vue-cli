import { shallowMount } from '@vue/test-utils'
import MemoIndex from '@/components/MemoIndex.vue'

describe('HelloWorld.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message'
    const wrapper = shallowMount(MemoIndex, {
      props: { msg }
    })
    expect(wrapper.text()).toMatch(msg)
  })
})

import { defineRule } from 'vee-validate'
import { required, email, min, max, one_of } from '@vee-validate/rules'

defineRule('required', required)
defineRule('email', email)
defineRule('min', min)
defineRule('max', max)
defineRule('one_of', one_of)

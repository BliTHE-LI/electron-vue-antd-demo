<template>
  <a-form layout="horizontal" :form="form" @submit="handleSubmit">
    <a-form-item :validate-status="userNameError() ? 'error' : ''" :help="userNameError() || ''">
      <a-input
        v-decorator="[
          'userName',
          { rules: [{ required: true, message: '请输入您的用户名!' }] },
        ]"
        placeholder="用户名/手机号"
      >
        <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)" />
      </a-input>
    </a-form-item>
    <a-form-item :validate-status="passwordError() ? 'error' : ''" :help="passwordError() || ''">
      <a-input
        v-decorator="[
          'password',
          { rules: [{ required: true, message: '请输入您的登录密码!' }] },
        ]"
        type="password"
        placeholder="登录密码"
      >
        <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)" />
      </a-input>
    </a-form-item>
    <a-form-item>
      <a-button
        type="primary"
        block
        html-type="submit"
        :disabled="hasErrors(form.getFieldsError())"
      >登 录</a-button>
    </a-form-item>
  </a-form>
</template>

<script>
import { mapActions } from 'vuex'
import { timeFix } from '@/utils/util'
function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field])
}
export default {
    data() {
        return {
            hasErrors,
            form: this.$form.createForm(this, { name: 'horizontal_login' })
        }
    },
    mounted() {
        this.$nextTick(() => {
            // To disabled submit button at the beginning.
            this.form.validateFields()
        })
    },
    methods: {
        ...mapActions(['Login', 'Logout']),
        // Only show error after a field is touched.
        userNameError() {
            const { getFieldError, isFieldTouched } = this.form
            return isFieldTouched('userName') && getFieldError('userName')
        },
        // Only show error after a field is touched.
        passwordError() {
            const { getFieldError, isFieldTouched } = this.form
            return isFieldTouched('password') && getFieldError('password')
        },
        handleSubmit(e) {
            e.preventDefault()
            const {
                form: { validateFields },
                Login
            } = this
            validateFields((err, values) => {
                if (!err) {
                    console.log('login form', values)
                    const loginParams = { ...values }
                    delete loginParams.userName
                    loginParams.userName = values.userName
                    loginParams.password = values.password
                    Login(loginParams)
                        .then(res => this.loginSuccess(res))
                        .catch(err => this.requestFailed(err))
                        .finally(() => {
                            console.log('请求完成')
                        })
                }
            })
        },
        loginSuccess(res) {
            console.log('loginSuccess', res)
            this.$router.push({ path: '/' })
            // 延迟 1 秒显示欢迎信息
            setTimeout(() => {
                this.$notification.success({
                    message: '欢迎',
                    description: `${timeFix()}，欢迎回来`
                })
            }, 1000)
        },
        requestFailed(err) {
            this.$notification.error({
                message: '错误',
                description:
                    ((err.response || {}).data || {}).message ||
                    '请求出现错误，请稍后再试',
                duration: 4
            })
        }
    }
}
</script>

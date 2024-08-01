import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { AUTHEN_TOKEN_KEY } from '@constants/key'
import { useAuthContext } from '@contexts/auth/context'
import { signIn } from '@graphql/query/auth/sign-in'
import { useTranslations } from '@hooks/translation'
import { App, Button, Form } from 'antd'
import Cookies from 'js-cookie'
import React, { useState } from 'react'
import {
  Container,
  FormItemStyled,
  FormStyled,
  Helper,
  HomeStyled,
  InputPasswordStyled,
  InputStyled,
  Label,
  Title,
} from './style'

type LoginContainerProps = {}

const LoginContainer: React.FC<React.PropsWithChildren<LoginContainerProps>> = () => {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState<boolean>(false)
  const { setLogin } = useAuthContext()

  const { notification } = App.useApp()

  const t = useTranslations('auth')

  const onFinish = () => {
    const input = {
      username: form.getFieldValue('username'),
      password: form.getFieldValue('password'),
    }
    setLoading(true)
    signIn({ input }).then(r => {
      setLoading(false)
      if (r.success) {
        Cookies.set(AUTHEN_TOKEN_KEY, r?.data ?? '')
        setLogin(true)
        return
      }
      notification.error({ message: t('messages.sign_in_failed') })
    })
  }

  return (
    <HomeStyled>
      <Container>
        <FormStyled
          form={form}
          onFinish={onFinish}
          layout="vertical"
          name="sign-in-form"
          autoComplete="on"
        >
          <Title>{t('labels.sign_in')}</Title>

          <FormItemStyled
            label={<Label>{t('labels.email_or_username')}</Label>}
            name="username"
            rules={[
              {
                required: true,
                message: <Helper>{t('errors.email_or_username.required')}</Helper>,
              },
            ]}
          >
            <InputStyled
              prefix={<UserOutlined />}
              placeholder={t('placeholder.email_or_username')}
            />
          </FormItemStyled>
          <FormItemStyled
            label={<Label>{t('labels.password')}</Label>}
            name="password"
            rules={[
              {
                required: true,
                message: <Helper>{t('errors.password.required')}</Helper>,
              },
            ]}
          >
            <InputPasswordStyled
              prefix={<LockOutlined />}
              placeholder="Tối thiểu 8 kí tự bao gồm cả chữ và số"
            />
          </FormItemStyled>

          <FormItemStyled>
            <Button style={{ width: '100%' }} loading={loading} htmlType="submit" type="primary">
              {t('actions.sign_in')}
            </Button>
          </FormItemStyled>
        </FormStyled>
      </Container>
    </HomeStyled>
  )
}

export default LoginContainer

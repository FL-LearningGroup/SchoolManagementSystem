import {
  LockOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Alert, Tabs } from 'antd';
import React, { useState, useEffect } from 'react';
import ProForm, {  ProFormCheckbox, ProFormText } from '@ant-design/pro-form';
import { useIntl, connect, FormattedMessage } from 'umi';
import type { Dispatch } from 'umi';

import  { TLoginParams, TLoginViewModel } from '@/modeltypes/LoginModel'
import type { ConnectState } from '@/models/connect';
import { checkTokenData } from '@/modeltypes/TokenModel';
import { ResponseBodyEnum } from '@/modeltypes/ResponseModel';

import styles from './index.less';

export type LoginProps = {
  dispatch: Dispatch;
  userLogin: TLoginViewModel;
  submitting?: boolean;
};

const LoginMessage: React.FC<{
  content: string;
}> = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);

const Login: React.FC<LoginProps> = (props) => {
  const { userLogin, submitting } = props;
  const { status } = userLogin;
  const [type, setType] = useState<string>('account');
  const [tokenLogin, setTokenLgin] = useState<boolean>(false);
  const intl = useIntl();

  useEffect(() => {
    if (!checkTokenData())
    {
      return;
    }
    setTokenLgin(true);
    
  });
  const handleSubmit = (values: TLoginParams) => {
    const { dispatch } = props;
    dispatch({
      type: 'login/login',
      payload: { ...values, type },
    });
  };
  return (
    <div>
    {!tokenLogin && (
      <div className={styles.main}>
        <ProForm
          initialValues={{
            autoLogin: true,
          }}
          submitter={{
            searchConfig: {
              submitText: intl.formatMessage({
                id: 'pages.login.signin',
                defaultMessage: 'Sign in',
              }),
            },
            render: (_, dom) => dom.pop(),
            submitButtonProps: {
              loading: submitting,
              size: 'large',
              style: {
                width: '100%',
              },
            },
          }}
          onFinish={(values) => {
            handleSubmit(values as TLoginParams);
            return Promise.resolve();
          }}
        >
          <Tabs activeKey={type} onChange={setType}>
            <Tabs.TabPane
              key="account"
              tab={intl.formatMessage({
                id: 'pages.login.accountLogin.tab',
                defaultMessage: 'Account password login',
              })}
            />
          </Tabs>

          {status.toUpperCase() === ResponseBodyEnum.Error.toUpperCase() && !submitting && (
            <LoginMessage
              content={intl.formatMessage({
                id: 'pages.login.accountLogin.errorMessage',
                defaultMessage: 'Incorrect account or password.',
              })}
            />
          )}
          {type === 'account' && (
            <>
              <ProFormText
                name="userName"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined className={styles.prefixIcon} />,
                }}
                placeholder={intl.formatMessage({
                  id: 'pages.login.username.placeholder',
                  defaultMessage: 'Username: ',
                })}
                rules={[
                  {
                    required: true,
                    message: (
                      <FormattedMessage
                        id="pages.login.username.required"
                        defaultMessage="Please enter user name!"
                      />
                    ),
                  },
                ]}
              />
              <ProFormText.Password
                name="password"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={styles.prefixIcon} />,
                }}
                placeholder={intl.formatMessage({
                  id: 'pages.login.password.placeholder',
                  defaultMessage: 'Password: ',
                })}
                rules={[
                  {
                    required: true,
                    message: (
                      <FormattedMessage
                        id="pages.login.password.required"
                        defaultMessage="Please enter password！"
                      />
                    ),
                  },
                ]}
              />
            </>
          )}
          <div
            style={{
              marginBottom: 24,
            }}
          >
            <ProFormCheckbox noStyle name="autoLogin">
              <FormattedMessage id="pages.login.rememberMe" defaultMessage="Auto login" />
            </ProFormCheckbox>
            <a
              style={{
                float: 'right',
              }}
            >
              <FormattedMessage id="pages.login.forgotPassword" defaultMessage="Forget password" />
            </a>
          </div>
        </ProForm>
      </div>
    )}
    </div>
  );
};

export default connect(({ login, loading }: ConnectState) => ({
  userLogin: login,
  submitting: loading.effects['login/login'],
}))(Login);

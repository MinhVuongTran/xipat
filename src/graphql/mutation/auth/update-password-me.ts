import { ApolloError, gql } from '@apollo/client'
import client from '@graphql/client/admin_client'

import { handleGraphqlError } from '@graphql/handle'
import { Account } from '@models/account'

const UpdatePasswordGql = gql`
  mutation ($data: AccountChangePassword!) {
    accountChangePassword(data: $data) {
      id
    }
  }
`

export const updatePasswordMe: BaseApiFunction<
  Account,
  {
    confirm_password?: string
    new_password?: string
    password?: string
  }
> = p => {
  return client
    .mutate<{
      accountChangePassword: BaseResponseData<Account>
    }>({
      mutation: UpdatePasswordGql,

      variables: {
        data: p.input,
      },
    })
    .then(r => {
      return {
        success: true,
        data: Account.fromJson(r.data?.accountChangePassword),
      }
    })
    .catch((e: ApolloError) => {
      return handleGraphqlError(e)
    })
}

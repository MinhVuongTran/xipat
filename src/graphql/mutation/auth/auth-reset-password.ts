import { ApolloError, gql } from '@apollo/client'
import client from '@graphql/client/admin_client'

import { handleGraphqlError } from '@graphql/handle'

const UpdatePasswordGql = gql`
  mutation ($data: AuthResetPassword!) {
    authResetPassword(data: $data) {
      data
      message
      status
    }
  }
`

export const authResetPassword: BaseApiFunction<
  {
    data: any
    message: string
    status: number
  },
  { account_id: string }
> = p => {
  return client
    .mutate<{
      authResetPassword: {
        data: any
        message: string
        status: number
      }
    }>({
      mutation: UpdatePasswordGql,

      variables: {
        data: p.input,
      },
    })
    .then(r => {
      return {
        success: true,
        data: r.data?.authResetPassword,
      }
    })
    .catch((e: ApolloError) => {
      return handleGraphqlError(e)
    })
}

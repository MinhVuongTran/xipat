import { ApolloError, gql } from '@apollo/client'
import client from '@graphql/client/admin_client'
import { handleGraphqlError } from '@graphql/handle'
import { Account } from '@models/account'

const getGql = gql`
  query {
    accountMe {
      id
      role
      status
      user_name
      password_status
      owner_name
      owner_id
      school_name
      school {
        code
        name
        type
      }
    }
  }
`

export const getAccountMe: BaseApiFunction<Account> = p => {
  return client
    .query<{
      accountMe: BaseResponseData<Account>
    }>({
      query: getGql,
      fetchPolicy: 'no-cache',
      variables: {},
      context: {
        headers: {
          token: p.authen,
        },
      },
    })
    .then(r => {
      return {
        success: true,
        data: Account.fromJson(r.data.accountMe),
      }
    })
    .catch((e: ApolloError) => {
      return handleGraphqlError(e)
    })
}

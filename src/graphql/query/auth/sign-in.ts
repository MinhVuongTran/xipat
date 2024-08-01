import { ApolloError, gql } from '@apollo/client'
import client from '@graphql/client/admin_client'
import { handleGraphqlError } from '@graphql/handle'

const signInGql = gql`
  query signIn($username: String!, $password: String!) {
    authAdminLogin(username: $username, password: $password) {
      access_token
    }
  }
`

export const signIn: BaseApiFunction<string, { username: string; password: string }> = p => {
  return client
    .query<{
      authAdminLogin: BaseResponseData<{ access_token: string }>
    }>({
      query: signInGql,
      fetchPolicy: 'no-cache',
      variables: { username: p.input?.username, password: p.input?.password },
    })
    .then(r => {
      return {
        success: true,
        data: r.data.authAdminLogin.access_token,
      }
    })
    .catch((e: ApolloError) => {
      return handleGraphqlError(e)
    })
}

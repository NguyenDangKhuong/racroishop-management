import { NextApiRequest, NextApiResponse } from 'next'
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import UserModel from '../../../models/User'
import connectDb from '../../../utils/connectDb'

connectDb()

// async function refreshAccessToken(tokenObject: any) {
//   console.log('tokenObject', tokenObject)
//   try {
//     // Get a new set of tokens with a refreshToken
//     const tokenResponse = await post('auth/refreshToken', {
//       token: tokenObject.refreshToken
//     })

//     console.log('tokenResponse', tokenResponse)
//     return {
//       ...tokenObject,
//       accessToken: tokenResponse.data.accessToken,
//       accessTokenExpiry: tokenResponse.data.accessTokenExpiry,
//       refreshToken: tokenResponse.data.refreshToken
//     }
//   } catch (error) {
//     return {
//       ...tokenObject,
//       error: 'RefreshAccessTokenError'
//     }
//   }
// }

const providers = [
  CredentialsProvider({
    name: 'credentials',
    credentials: {
      email: {},
      password: {}
    },
    authorize: async credentials => {
      try {
        const user = await UserModel.findOne({ email: credentials?.email })
        if (!user) {
          throw new Error('No user found with the email')
        }
        if (credentials?.password !== user?.password) {
          throw new Error('Invalid password')
        }
        if (
          credentials?.email === user?.email &&
          credentials?.password === user?.password
        ) {
          return user
        }
        return null
      } catch (err: any) {
        console.log(err)
        return null
      }
    }
  })
]

// const callbacks = {
//   // @ts-ignore: Unreachable code error
//   jwt: async ({ token, user }) => {
//     if (user) {
//       // This will only be executed at login. Each next invocation will skip this part.
//       token.accessToken = user.data.accessToken
//       token.accessTokenExpiry = user.data.accessTokenExpiry
//       token.refreshToken = user.data.refreshToken
//     }

//     // If accessTokenExpiry is 24 hours, we have to refresh token before 24 hours pass.
//     const shouldRefreshTime = Math.round(
//       token.accessTokenExpiry - 60 * 60 * 1000 - Date.now()
//     )

//     // If the token is still valid, just return it.
//     if (shouldRefreshTime > 0) {
//       return Promise.resolve(token)
//     }

//     // If the call arrives after 23 hours have passed, we allow to refresh the token.
//     token = await refreshAccessToken(token)
//     return Promise.resolve(token)
//   },
//   session: async ({ session, token }: { session: any; token: any }) => {
//     // Here we pass accessToken to the client to be used in authentication with your API
//     session.accessToken = token.accessToken
//     session.accessTokenExpiry = token.accessTokenExpiry
//     session.error = token.error

//     return Promise.resolve(session)
//   }
// }

const pages = {
  signIn: '/login' //Need to define custom login page (if using)
}

export const options = {
  providers,
  // callbacks,
  pages,
  secret: 'my_secret'
}

const Auth = (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, options)
export default Auth

import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import UserModel from '../../../models/User'
import connectDb from '../../../utils/connectDb'

connectDb()

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: {},
        password: {}
      },
      authorize: async credentials => {
        const user = await UserModel.findOne({ email: credentials?.email })
        if (!user) {
          return { error: 'No user found with the email' }
        }
        if (credentials?.password === user?.password) {
          return { error: 'Invalid password' }
        }
        if (
          credentials?.email === user?.email &&
          credentials?.password === user?.password
        ) {
          return user
        }
        return null
      }
    })
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.accessToken = user.access_token
      }
      console.log('token', token)
      console.log('token user', user)
      return token
    },
    session: async ({ session, token }) => {
      console.log('session', session)
      console.log('session token', token)
      if (token) {
        session.id = token.id
      }
      return session // The return type will match the one returned in `useSession()`
    }
  },
  secret: 'loginSecret',
  session: {
    strategy: 'jwt',
    // Seconds - How long until an idle session expires and is no longer valid.
    maxAge: 30 * 24 * 60 * 60, // 30 days
    // Seconds - Throttle how frequently to write to database to extend a session.
    // Use it to limit write operations. Set to 0 to always update the database.
    // Note: This option is ignored if using JSON Web Tokens
    updateAge: 24 * 60 * 60 // 24 hours
  },
  pages: {
    signIn: '/login' //Need to define custom login page (if using)
  }
})

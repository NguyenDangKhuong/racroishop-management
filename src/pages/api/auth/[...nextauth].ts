import NextAuth, { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { NEXT_AUTH_SECRET } from '../../../helpers/constants'
import UserModel from '../../../models/User'
import connectDb from '../../../utils/connectDb'

connectDb()

const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt'
  },
  secret: NEXT_AUTH_SECRET,
  providers: [
    CredentialsProvider({
      type: 'credentials',
      credentials: {
        // fill object if you want automatically create input fields inside of the hosted NextAuth.js authentication page!
        // username: {
        //   label: 'Username',
        //   type: 'text',
        //   placeholder: 'grafbase'
        // },
        // password: { label: 'Password', type: 'password' }
      },
      // @ts-ignore
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string
          password: string
        }
        // perform you login logic
        // find out user from db
        const user = await UserModel.findOne({ email }).lean()
        if (!user) {
          throw new Error('Không tìm thấy người dùng')
        }
        if (password !== user?.password) {
          throw new Error('Sai mật khẩu')
        }
        // if everything is fine
        return { ...user }
      }
    })
  ],
  pages: {
    signIn: '/auth/signin',
    error: '/error'
    // signOut: '/signout'
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      user && (token.user = user)
      return token
    },
    session: async ({ session, token }) => {
      ;(session as any).user = token.user // Setting token in session
      return session
    }
  }
}

export default NextAuth(authOptions)

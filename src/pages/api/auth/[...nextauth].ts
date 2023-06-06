import NextAuth, { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import UserModel from '../../../models/User'
import connectDb from '../../../utils/connectDb'

connectDb()

const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt'
  },
  providers: [
    CredentialsProvider({
      type: 'credentials',
      credentials: {
        // fill object if you want automatically create fields inside of the hosted NextAuth.js authentication page!
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

        console.log('user', user)
        if (!user) {
          throw new Error('Không tìm thấy người dùng')
        }
        if (password !== user?.password) {
          throw new Error('Sai mật khẩu')
        }
        // if everything is fine
        console.log(user)
        return user
      }
    })
  ],
  pages: {
    signIn: '/signin'
    // error: '/error',
    // signOut: '/signout'
  },
  callbacks: {
    jwt(params) {
      // update token
      if (params.user?.role) {
        params.token.role = params.user.role
      }
      // return final_token
      return params.token
    }
  }
}

export default NextAuth(authOptions)
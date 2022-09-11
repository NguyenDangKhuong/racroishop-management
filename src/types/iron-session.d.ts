// You may need the next line in some situations
import 'iron-session'
import { User } from '../models/User'

declare module 'iron-session' {
  interface IronSessionData {
    user?: {
      user: User
      isAdmin?: boolean
      isLoggedIn: boolean
    }
  }
}

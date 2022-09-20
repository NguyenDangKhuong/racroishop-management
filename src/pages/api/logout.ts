import { NextApiRequest, NextApiResponse } from 'next'
import { withIronSessionApiRoute } from 'iron-session/next'
import { sessionOptions } from '../../utils/withSession'

const logoutRoute = (req: NextApiRequest, res: NextApiResponse) => {
  req.session.destroy()
  res.json({ isLoggedIn: false })
}

export default withIronSessionApiRoute(logoutRoute, sessionOptions)

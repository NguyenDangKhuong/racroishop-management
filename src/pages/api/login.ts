import { NextApiRequest, NextApiResponse } from 'next'
import UserModel from '../../models/User'
import connectDb from '../../utils/connectDb'
import { withSessionRoute } from '../../utils/withSession'

connectDb()

const loginRoute = async(req: NextApiRequest, res: NextApiResponse) => {
  const { email, password } = req.body
  try {
    const user = await UserModel.findOne({ email })
    if (!user) {
      return res.status(401).send(`Không tìm thấy người dùng`)
    }
    if (password !== user?.password) {
      return res.status(401).send(`Sai mật khẩu`)
    }
    req.session.user = {
      user,
      isAdmin: user.role === 0
    }
    await req.session.save()
    return res.status(200).json(user)
  } catch (err) {
    res.status(500).send(`Xin vui lòng thử lại hoặc báo Khương lỗi là ${err}`)
  }
}

export default withSessionRoute(loginRoute)
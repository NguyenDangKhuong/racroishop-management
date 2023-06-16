import { NextApiRequest, NextApiResponse } from 'next'
import UserModel from '../../../models/User'
import connectDb from '../../../utils/connectDb'
import { sendEmail } from '../../../utils/sendEmail'

connectDb()

const forgotPassword = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email } = req.body
  const user = await UserModel.findOne({ email })

  if (!user)
    return res.status(404).send('Không tìm thấy người dùng khớp với email')

  // send reset password link to user via email
  await sendEmail(
    email,
    'test ahihi'

    // `<a href="http://localhost:3001/change-password?token=${resetToken}&userId=${user.id}">Bấm vào đây để sửa mật khẩu của bạn</a>`
  )

  return true
}

export default forgotPassword

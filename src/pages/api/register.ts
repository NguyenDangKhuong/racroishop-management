import argon2 from 'argon2'
import { NextApiRequest, NextApiResponse } from 'next'
import UserModel, { User } from '../../models/User'
import connectDb from '../../utils/connectDb'
import { validateRegisterInput } from '../../utils/validateRegisterInput'

connectDb()

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const validateRegisterInputErrors = validateRegisterInput(req.body)
  if (validateRegisterInputErrors !== null)
    return { code: 400, success: false, ...validateRegisterInputErrors }

  try {
    const { name, email, password } = req.body
    const existingUser = await UserModel.findOne({
      where: [{ name }, { email }]
    })
    if (existingUser)
      return {
        code: 400,
        success: false,
        message: 'Tên người dùng hoác email đã được đăng kí',
        errors: [
          {
            field: existingUser.name === name ? 'name' : 'email',
            message: `${existingUser.name === name ? 'Username' : 'Email'
              } đã được dùng`
          }
        ]
      }

    // const hashedPassword = await argon2.hash(password)

    const newUser: User = await new UserModel({
      name,
      password,
      // : hashedPassword,
      email,
      role: 1
    }).save()

    // req.session.userId = newUser.id
    return res.status(201).send('Đã đăng kí tài khoản thành công')
  } catch (err) {
    console.log(err)
    res.status(500).send(`Xin vui lòng thử lại hoặc báo Khương lỗi là ${err}`)
  }
}

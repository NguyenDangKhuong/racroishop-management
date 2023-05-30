// import argon2 from 'argon2'
import { NextApiRequest, NextApiResponse } from 'next'
import UserModel, { User } from '../../models/User'
import connectDb from '../../utils/connectDb'
import { validateRegisterInput } from '../../utils/validateRegisterInput'

connectDb()

const register = async (req: NextApiRequest, res: NextApiResponse) => {
  const validateRegisterInputErrors = validateRegisterInput(req.body)
  if (validateRegisterInputErrors !== null)
    return res.status(400).send(validateRegisterInputErrors)

  try {
    const { name, email, password } = req.body
    const existingUser = await UserModel.findOne({
      email
    }).lean()
    if (existingUser)
      return res
        .status(400)
        .send(
          `${existingUser.email === email ? 'Email' : 'Tên'} đã được đăng kí`
        )

    // không cài đc agron2 trên máy công ty, mai mốt fix lại sau
    // const hashedPassword = await argon2.hash(password)
    // const newUser: User = await new UserModel({
    //   name,
    //   password: hashedPassword,
    //   email,
    //   role: 1
    // }).save()

    const newUser: User = await new UserModel({
      name,
      password,
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

export default register

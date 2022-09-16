import { NextApiRequest, NextApiResponse } from 'next'
import OrderModel from '../../models/Order'
import connectDb from '../../utils/connectDb'

connectDb()

const orderRoute = async (req: NextApiRequest, res: NextApiResponse) => {
  const orders = await OrderModel.find()
  res.status(200).json({ orders })
}

export default orderRoute

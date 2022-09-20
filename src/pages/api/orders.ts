import { endOfDay, endOfMonth, startOfDay, startOfMonth } from 'date-fns'
import { NextApiRequest, NextApiResponse } from 'next'
import OrderModel from '../../models/Order'
import connectDb from '../../utils/connectDb'

connectDb()

const orderRoute = async (req: NextApiRequest, res: NextApiResponse) => {
  const { selectDate, isMonth } = req.query
  const orders = isMonth ? await OrderModel.find({
    createdAt: {
      $gte: startOfMonth(new Date(String(selectDate))),
      $lte: endOfMonth(new Date(String(selectDate)))
    }
  }) :
  await OrderModel.find({
    createdAt: {
      $gte: startOfDay(new Date(String(selectDate))),
      $lte: endOfDay(new Date(String(selectDate)))
    }
  })
  res.status(200).json({ orders })
}

export default orderRoute

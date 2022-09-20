import endOfDay from 'date-fns/endOfDay'
import startOfDay from 'date-fns/startOfDay'
import { NextApiRequest, NextApiResponse } from 'next'
import OrderModel from '../../models/Order'
import connectDb from '../../utils/connectDb'

connectDb()

const orderRoute = async (req: NextApiRequest, res: NextApiResponse) => {
  const { selectDate } = req.query
  const orders = await OrderModel.find({
    createdAt: {
      $gte: startOfDay(new Date(String(selectDate))),
      $lte: endOfDay(new Date(String(selectDate)))
    }
  })
  res.status(200).json({ orders })
}

export default orderRoute

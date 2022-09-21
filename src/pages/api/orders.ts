import {
  endOfDay,
  endOfMonth,
  startOfDay,
  startOfMonth,
  subDays
} from 'date-fns'
import { NextApiRequest, NextApiResponse } from 'next'
import OrderModel from '../../models/Order'
import connectDb from '../../utils/connectDb'

connectDb()

const orderRoute = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { selectDate, isMonth } = req.query
    const orders = JSON.parse(String(isMonth).toLowerCase())
      ? await OrderModel.find({
          createdAt: {
            $gte: startOfMonth(new Date(String(selectDate))),
            $lte: endOfMonth(new Date(String(selectDate)))
          }
        })
      : await OrderModel.find({
          createdAt: {
            $gte: startOfDay(subDays(new Date(String(selectDate)), 1)),
            $lte: endOfDay(subDays(new Date(String(selectDate)), 1))
          }
        })
    res.status(200).json({ orders })
  } catch (err) {
    console.log(err)
    res.status(500).send(`Xin vui lòng thử lại hoặc báo Khương lỗi là ${err}`)
  }
}

export default orderRoute

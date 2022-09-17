import { NextApiRequest, NextApiResponse } from 'next'
import OrderModel, { Order } from '../../models/Order'
import connectDb from '../../utils/connectDb'

connectDb()

const order = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'POST':
      await handlePostRequest(req, res)
      break
    case 'PUT':
      await handlePutRequest(req, res)
      break
    default:
      res.status(405).send(`Method ${req.method} not allowed!`)
      break
  }
}

export default order

async function handlePostRequest(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { products } = req.body
    if (products.length === 0) {
      return res.status(422).send('Không có sản phẩm')
    }
    console.log(req.body)

    // await Promise.all(
    //   products.map(
    //     async (item: any) =>
    //       await ProductModel.findByIdAndUpdate(
    //         item.product._id,
    //         { ...item.product, storage: item.product.storage - item.quantity }
    //       )
    //   )
    // )
    const order: Order = await new OrderModel({ ...req.body }).save()

    return res.status(201).json(order)
  } catch (err) {
    res.status(500).send(`Xin vui lòng thử lại hoặc báo Khương lỗi là ${err}`)
  }
}

async function handlePutRequest(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { _id, name } = req.body
    if (!name) {
      return res.status(422).send('Danh mục thiếu tên')
    }
    await OrderModel.findByIdAndUpdate(_id, req.body, { new: true })
    res.status(200).send(`Danh mục đã được cập nhật!`)
  } catch (err) {
    console.log(err)
    res.status(500).send(`Xin vui lòng thử lại hoặc báo Khương lỗi là ${err}`)
  }
}

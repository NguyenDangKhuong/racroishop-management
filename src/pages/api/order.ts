import { NextApiRequest, NextApiResponse } from 'next'
import OrderModel from '../../models/Order'
import ProductModel, { Product } from '../../models/Product'
import connectDb from '../../utils/connectDb'
import removeImage from '../../utils/removeImage'

connectDb()

const order = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'POST':
      await handlePostRequest(req, res)
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

    await Promise.all(
      products.map(async (item: any) => {
        if (item.product.storage - item.quantity === 0) {
          const deletedProduct: Product | null =
            await ProductModel.findByIdAndDelete(item.product._id)
          deletedProduct && removeImage(String(deletedProduct?.imagePublicId))
        } else {
          await ProductModel.findByIdAndUpdate(item.product._id, {
            ...item.product,
            storage: item.product.storage - item.quantity
          })
        }
      })
    )

    await new OrderModel({ ...req.body }).save()
    return res
      .status(201)
      .send('Đơn đặt hàng đã thanh toán, chuẩn bị in hóa đơn...')
  } catch (err) {
    res.status(500).send(`Xin vui lòng thử lại hoặc báo Khương lỗi là ${err}`)
    console.log(err)
  }
}

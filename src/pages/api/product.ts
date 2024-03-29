import { NextApiRequest, NextApiResponse } from 'next'
import ProductModel, { Product } from '../../models/Product'
import connectDb from '../../utils/connectDb'
import removeImage from '../../utils/removeImage'

connectDb()

const product = async (req: NextApiRequest, res: NextApiResponse) => {
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

export default product

async function handlePostRequest(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { name, price, storage } = req.body
    if (!name || !price || !storage) {
      return res.status(422).send('Sản phẩm thiếu một hay nhiều mục')
    }

    if (price < 1000) {
      return res.status(422).send('Giá sản phẩm không thể dưới 1000')
    }

    const existedName = await ProductModel.findOne({ name }).lean()
    if (existedName) {
      return res
        .status(422)
        .send(`Đã có sản phẩm tên này rồi, vui lòng đặt tên khác`)
    }

    const product: Product = await new ProductModel({ ...req.body }).save()
    return res.status(201).send('Sản phẩm đã được thêm!')
  } catch (err) {
    res.status(500).send(`Xin vui lòng thử lại hoặc báo Khương lỗi là ${err}`)
  }
}

async function handlePutRequest(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { _id, name, price, storage, imagePublicId } = req.body
    if (!name || !price || !storage) {
      return res.status(422).send('Sản phẩm thiếu một hay nhiều mục')
    }

    if (price < 1000) {
      return res.status(422).send('Giá sản phẩm không thể dưới 1000')
    }

    await ProductModel.findByIdAndUpdate(_id, req.body, { new: true })

    //remove unessesary image
    const currentProduct: Product | null = await ProductModel.findById({ _id })
    const currentImagePublicId = currentProduct?.imagePublicId
    currentImagePublicId !== imagePublicId &&
      removeImage(String(currentImagePublicId))

    res.status(200).send(`Sản phẩm đã được cập nhật!`)
  } catch (err) {
    console.error(err)
    res.status(500).send(`Xin vui lòng thử lại hoặc báo Khương lỗi là ${err}`)
  }
}

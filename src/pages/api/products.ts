import { NextApiRequest, NextApiResponse } from 'next'
import ProductModel from '../../models/Product'
import connectDb from '../../utils/connectDb'

connectDb()

const products = async (req: NextApiRequest, res: NextApiResponse) => {
  const { page, size, name } = req.query
  // Convert querystring values to number
  const pageNum = Number(page)
  const pageSize = Number(size)
  const totalDocs = await ProductModel.countDocuments()
  const totalPages = Math.ceil(totalDocs / pageSize)
  if (name) {
    const products = await ProductModel.find({
      name: { $regex: name, $options: 'i' }
    }).sort({ createdAt: -1 })
    return res.status(200).json({ products, totalPages })
  }
  if (pageNum === 1) {
    const products = await ProductModel.find()
      .limit(pageSize)
      .sort({ createdAt: -1 })
    return res.status(200).json({ products, totalPages })
  }
  const skip = pageSize * (pageNum - 1)
  const products = await ProductModel.find()
    .skip(skip)
    .limit(pageSize)
    .sort({ createdAt: -1 })

  res.status(200).json({ products, totalPages })
}

export default products

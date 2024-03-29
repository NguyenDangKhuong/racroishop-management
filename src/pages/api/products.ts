import { NextApiRequest, NextApiResponse } from 'next'
import ProductModel from '../../models/Product'
import connectDb from '../../utils/connectDb'

connectDb()

const products = async (req: NextApiRequest, res: NextApiResponse) => {
  const { page, size, name, isPublic } = req.query
  // Convert querystring values to number
  const pageNum = Number(page)
  const pageSize = Number(size)
  const totalDocs = await ProductModel.countDocuments()
  const totalPages = Math.ceil(totalDocs / pageSize)
  if (name) {
    const products = await ProductModel.find({
      name: { $regex: name, $options: 'i' }
    })
      .sort({ createdAt: -1 })
      .lean()
    return res.status(200).json({ products, totalPages, totalDocs })
  }
  if (pageNum === 1) {
    const products = await ProductModel.find({ isPublic })
      .limit(pageSize)
      .sort({ createdAt: -1 })
      .lean()
    return res.status(200).json({ products, totalPages, totalDocs })
  }
  const skip = pageSize * (pageNum - 1)
  const products = await ProductModel.find()
    .skip(skip)
    .limit(pageSize)
    .sort({ createdAt: -1 })
    .lean()

  res.status(200).json({ products, totalPages, totalDocs })
}

export default products

import { NextApiRequest } from 'next'

import ProductModel from '@/models/Product'
import connectDb from '@/utils/connectDb'

connectDb()

export const GET = async (request: NextApiRequest) => {
  const { searchParams } = new URL(String(request.url))
  // Convert querystring values to number
  const pageNum = Number(searchParams.get('page'))
  const pageSize = Number(searchParams.get('size'))
  const totalDocs = await ProductModel.countDocuments()
  const totalPages = Math.ceil(totalDocs / pageSize)
  if (searchParams.get('name')) {
    const products = await ProductModel.find({
      name: { $regex: name, $options: 'i' }
    })
      .sort({ createdAt: -1 })
      .lean()
    return Response.json({ products, totalPages, totalDocs }, { status: 200 })
  }
  if (pageNum === 1) {
    const products = await ProductModel.find({
      isPublic: !!searchParams.get('isPublic')
    })
      .limit(pageSize)
      .sort({ createdAt: -1 })
      .lean()
    return Response.json({ products, totalPages, totalDocs }, { status: 200 })
  }
  const skip = pageSize * (pageNum - 1)
  const products = await ProductModel.find()
    .skip(skip)
    .limit(pageSize)
    .sort({ createdAt: -1 })
    .lean()

  return Response.json({ products, totalPages, totalDocs }, { status: 200 })
}

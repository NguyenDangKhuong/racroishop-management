import CategoryModel from '@/models/Category'
import connectDb from '@/utils/connectDb'

connectDb()

export const GET = async () => {
  const categories = await CategoryModel.find().lean()
  const totalDocs = await CategoryModel.countDocuments()
  return Response.json({ categories, totalDocs }, { status: 200 })
}
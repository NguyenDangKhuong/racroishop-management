import CategoryModel from '@/models/Category'
import connectDb from '@/utils/connectDb'

connectDb()

export const GET = async () => {
  const categories = await CategoryModel.find().lean()
  return Response.json({ categories }, { status: 200 })
}

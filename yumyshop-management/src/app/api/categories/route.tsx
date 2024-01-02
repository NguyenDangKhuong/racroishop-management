import CategoryModel from '@/models/Category'
import connectDb from '@/utils/connectDb'
import { NextResponse } from 'next/server'

connectDb()

export const GET = async () => {
  const categories = await CategoryModel.find().sort().lean()
  const totalDocs = await CategoryModel.countDocuments()
  return NextResponse.json({ categories, totalDocs }, { status: 200 })
}
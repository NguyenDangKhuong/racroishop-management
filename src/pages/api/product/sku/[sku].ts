import { NextApiRequest, NextApiResponse } from 'next'
import ProductModel, { Product } from '../../../../models/Product'
import connectDb from '../../../../utils/connectDb'

connectDb()

const sku = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'GET':
      await handleGetRequest(req, res)
      break
    default:
      res.status(405).send(`Method ${req.method} not allowed!`)
      break
  }
}
export default sku
async function handleGetRequest(req: NextApiRequest, res: NextApiResponse) {
  const { sku } = req.query
  const product: Product | null = await ProductModel.findOne({ sku }).lean()
  return res.status(200).json(product)
}

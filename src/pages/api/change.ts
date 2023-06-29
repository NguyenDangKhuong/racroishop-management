import { NextApiRequest, NextApiResponse } from 'next'
import ChangeModel, { Change } from '../../models/Change'
import connectDb from '../../utils/connectDb'

connectDb()

const change = async (req: NextApiRequest, res: NextApiResponse) => {
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

export default change

async function handlePostRequest(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { cash } = req.body
    if (!cash) {
      return res.status(422).send('Thiếu tiền mục tiền nhập')
    }

    const change: Change = await new ChangeModel({
      ...req.body
    }).save()
    return res.status(201).send('Tiền thối đã được thêm!')
  } catch (err) {
    res.status(500).send(`Xin vui lòng thử lại hoặc báo Khương lỗi là ${err}`)
  }
}

async function handlePutRequest(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { _id, cash } = req.body
    if (!cash) {
      return res.status(422).send('Thiếu tiền mục tiền nhập')
    }
    await ChangeModel.findByIdAndUpdate(_id, req.body, { new: true })
    res.status(200).send(`Tiền thối đã được cập nhật!`)
  } catch (err) {
    console.error(err)
    res.status(500).send(`Xin vui lòng thử lại hoặc báo Khương lỗi là ${err}`)
  }
}

import { NextApiRequest, NextApiResponse } from 'next'
import connectDb from '../../utils/connectDb'

connectDb()
const checkConnection = (_: NextApiRequest, res: NextApiResponse) => {
  console.log('Checking connection')
  return res.status(200).send('OK')
}

export default checkConnection

import { NextApiRequest, NextApiResponse } from 'next'
import connectDb from '../../utils/connectDb'

const checkConnection = (_?: NextApiRequest, res?: NextApiResponse) => {
  connectDb()
  return res?.status(200).send('OK')
}

export default checkConnection

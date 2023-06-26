import connectDb from '../../utils/connectDb'

connectDb()
const checkConnection = () => {
  console.log('Checking connection')
  return true
}

export default checkConnection

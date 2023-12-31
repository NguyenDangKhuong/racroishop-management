import ProductModel, { Product } from '@/models/Product'
import connectDb from '@/utils/connectDb'
import removeImage from '@/utils/removeImage'
import { NextApiRequest, NextApiResponse } from 'next'
import { NextRequest, NextResponse } from 'next/server'

connectDb()

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json()
    const { name, price, storage } = body
    if (!name || !price || !storage) {
      return NextResponse.json({ message: 'Giá sản phẩm không thể dưới 1000', success: false }, {
        status: 422,
      })
    }

    if (price < 1000) {
      return NextResponse.json({ message: 'Giá sản phẩm không thể dưới 1000', success: false }, {
        status: 422,
      })
    }

    const existedName = await ProductModel.findOne({ name }).lean()
    if (existedName) {
      return NextResponse.json({ message: 'Đã có sản phẩm tên này rồi, vui lòng đặt tên khác', success: false }, {
        status: 422,
      })
    }

    // const product: Product = await new ProductModel({ ...request.json() }).save()
    return NextResponse.json({ message: 'Sản phẩm đã được thêm!', success: true }, {
      status: 201,
    })
  } catch (err) {
    return NextResponse.json({ message: `Xin vui lòng thử lại hoặc báo Khương lỗi là ${err}`, success: false }, {
      status: 500,
    })
  }
}

// async function handlePutRequest(req: NextApiRequest, res: NextApiResponse) {
//   try {
//     const { _id, name, price, storage, imagePublicId } = req.body
//     if (!name || !price || !storage) {
//       return res.status(422).send('Sản phẩm thiếu một hay nhiều mục')
//     }

//     if (price < 1000) {
//       return res.status(422).send('Giá sản phẩm không thể dưới 1000')
//     }

//     await ProductModel.findByIdAndUpdate(_id, req.body, { new: true })

//     //remove unessesary image
//     const currentProduct: Product | null = await ProductModel.findById({ _id })
//     const currentImagePublicId = currentProduct?.imagePublicId
//     currentImagePublicId !== imagePublicId &&
//       removeImage(String(currentImagePublicId))

//     res.status(200).send(`Sản phẩm đã được cập nhật!`)
//   } catch (err) {
//     console.error(err)
//     res.status(500).send(`Xin vui lòng thử lại hoặc báo Khương lỗi là ${err}`)
//   }
// }

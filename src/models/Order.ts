import { getModelForClass, prop } from '@typegoose/typegoose'
import { ProductCart } from './Cart'

export class Order {
  @prop({ type: () => String, required: true, unique: true })
  orderId!: string

  @prop({ type: () => [ProductCart] })
  products!: ProductCart[]

  @prop({ type: () => Number })
  customerCash!: number

  @prop({ type: () => Number })
  totalPrice!: number
  
  @prop({ type: () => Number })
  totalCart!: number

  @prop({ type: () => Number })
  exchange!: number

  @prop({ type: () => Date })
  createdAt?: Date

  @prop({ type: () => Date })
  updatedAt?: Date
}

const OrderModel = getModelForClass(Order, {
  schemaOptions: { timestamps: true }
})

export default OrderModel
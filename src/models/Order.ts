import { getModelForClass, prop } from '@typegoose/typegoose'
import { ProductCart } from './Cart'

export class Order {
  _id?: string

  @prop({ type: () => String })
  orderId!: string

  @prop()
  products?: ProductCart[]

  @prop({ type: () => Number })
  customerCash!: number

  @prop({ type: () => Number })
  totalPrice!: number
  
  @prop({ type: () => Number })
  totalCart!: number

  @prop({ type: () => Number })
  exchange!: number

  @prop({ type: () => String })
  createdAt?: String

  @prop({ type: () => Date })
  updatedAt?: Date
}

const OrderModel = getModelForClass(Order, {
  schemaOptions: { timestamps: true }
})

export default OrderModel
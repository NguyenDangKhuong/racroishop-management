import { getModelForClass, prop } from '@typegoose/typegoose'
import ProductModel, { Product } from './Product'

export class Order {
  @prop({ type: () => String, required: true, unique: true })
  _id!: string

  @prop()
  products?: ProductList 

  @prop({ type: () => Number })
  customerCash!: number

  @prop({ type: () => Number })
  totalPrice!: number
  
  @prop({ type: () => Number })
  totalCart!: number

  @prop({ type: () => Number })
  exchange!: number

  @prop({ type: () => Date })
  createAt!: Date

  @prop({ type: () => Date })
  updateAt!: Date
}

const OrderModel = getModelForClass(Order, {
  schemaOptions: { timestamps: true }
})

class ProductList {
  @prop()
  public quantity?: number;

  @prop({ type: () => ProductModel })
  public product?: Product;
}

export default OrderModel
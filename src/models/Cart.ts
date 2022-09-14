import { getModelForClass, prop } from '@typegoose/typegoose'
import ProductModel, { Product } from './Product'

export class Order {
  @prop({ type: () => String, required: true, unique: true })
  _id!: string

  @prop()
  products?: ProductCart[]
}

const CartModel = getModelForClass(Order, {
  schemaOptions: { timestamps: true }
})

export class ProductCart {
  @prop()
  public quantity?: number;

  @prop({ type: () => ProductModel })
  public product?: Product;
}

export default CartModel
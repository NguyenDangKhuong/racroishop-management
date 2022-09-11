import { prop, getModelForClass } from '@typegoose/typegoose'
import ProductModel, { Product } from './Product'

export class Order {
  @prop({ type: () => String, required: true, unique: true })
  _id!: string

  @prop()
  products?: ProductList 

  @prop({ type: () => Date })
  createAt!: Date

  @prop({ type: () => Date })
  updateAt!: Date
}

const CartModel = getModelForClass(Order, {
  schemaOptions: { timestamps: true }
})

class ProductList {
  @prop()
  public quantity?: number;

  @prop({ type: () => ProductModel })
  public product?: Product;
}

export default CartModel
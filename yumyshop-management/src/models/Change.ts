import { getModelForClass, prop } from '@typegoose/typegoose'

export class Change {
  _id!: string

  @prop({ type: () => Number })
  change!: number

  @prop({ type: () => Date })
  createdAt?: Date

  @prop({ type: () => Date })
  updatedAt?: Date
}

const ChangeModel = getModelForClass(Change, {
  schemaOptions: { timestamps: true }
})

export default ChangeModel
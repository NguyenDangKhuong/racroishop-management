import { Category } from "@/models/Category";
import { Product } from "@/models/Product";
import { post } from "@/utils/api";
import numberWithCommas from "@/utils/numberWithCommas";
import pushNotification from "@/utils/pushNotification";
import { AutoComplete, Button, Flex, Form, Input, InputNumber, Modal, Select } from "antd";
import { useEffect, useState } from "react";
import { initialProduct } from "./ProductTable";

const { Option } = Select;

const ProductModal = ({ isOpen, setIsOpen, editingProduct, setEditingProduct, categories }: {
  isOpen: boolean
  setIsOpen: (val: any) => void,
  editingProduct: Product,
  setEditingProduct: (val: any) => void
  categories: Category[]
}) => {
  //auto complete price
  const [options, setOptions] = useState<{ value: number }[]>([]);
  const getPanelValue = (price: number) =>
    !price && price > 0 && price < 999 ? [] : [
      { label: numberWithCommas(price * 1000), value: price * 1000 },
      { label: numberWithCommas(price * 10000), value: price * 10000 },
      { label: numberWithCommas(price * 100000), value: price * 100000 }];

  const [isLoading, setIsLoading] = useState(false)
  const [form] = Form.useForm()
  useEffect(() => form.setFieldsValue(editingProduct), [form, editingProduct])
  return <Modal
    title={`${editingProduct._id ? 'Sửa' : 'Thêm'} sản phẩm`}
    open={isOpen}
    onCancel={() => {
      setEditingProduct(initialProduct)
      setIsOpen(false)
    }}
    footer={false}
  >
    <Form
      name="products"
      form={form}
      initialValues={editingProduct}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      onFinish={async () => {
        const { _id, ...editingProductRemoveId } = editingProduct
        setIsLoading(true)
        const { message, success }: any = await post('api/product', editingProductRemoveId)
        setIsLoading(false)
        pushNotification(message, success)
        if (!success) return
        setEditingProduct(initialProduct)
        setIsOpen(false)
      }}
    >
      <Form.Item<Product>
        label="Tên"
        name="name"
        rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm' }]}
      >
        <Input onChange={(e) => setEditingProduct({
          ...editingProduct,
          name: e.target.value
        })} />
      </Form.Item>
      <Form.Item<Product>
        label="Giá"
        name="price"
        rules={[{ required: true, message: 'Vui lòng nhập giá sản phẩm' }]}
      >
        <AutoComplete
          className='w-full'
          allowClear
          options={options}
          onSelect={(val) =>
            setEditingProduct({
              ...editingProduct,
              price: val
            })
          }
          onSearch={(val) =>
            setOptions(val ? getPanelValue(Number(val)) : [])
          }
          placeholder="Nhập số tiền"
        />
      </Form.Item>
      <Form.Item<Product>
        label="Số lượng"
        name="storage"
        rules={[{ required: true, message: 'Vui lòng nhập số lượng sản phẩm' }]}
      >
        <InputNumber className="w-full" onChange={(e) => setEditingProduct({
          ...editingProduct,
          storage: e
        })} />
      </Form.Item>
      <Form.Item<Product>
        label="Danh mục"
        name="categoryId"
        rules={[{ required: true, message: 'Vui lòng chọn danh mục sản phẩm' }]}
      >
        <Select
          onChange={(val) =>
            setEditingProduct({
              ...editingProduct,
              categoryId: val
            })
          }
        >
          {categories.map(item => <Option key={item._id} value={item._id}>{item.name}</Option>)}
        </Select>
      </Form.Item>
      <Form.Item<Product>
        label="Ảnh"
        name="imageUrl"
        rules={[{ required: true, message: 'Vui lòng up hình sản phẩm' }]}
      >
        <Input />
      </Form.Item>
      <Flex justify="flex-end">
        <Form.Item>
          <Flex>
            <Button className="mr-2" onClick={() => {
              setIsOpen(false)
              setEditingProduct(initialProduct)
            }}>
              Hủy
            </Button>
            <Button type="primary" htmlType="submit" loading={isLoading}>
              Lưu
            </Button>
          </Flex>
        </Form.Item>
      </Flex>
    </Form>
  </Modal >
}

export default ProductModal

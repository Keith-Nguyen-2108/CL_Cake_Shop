export const CART_COLUMNS = [
  {
    title: 'Name',
    dataIndex: 'name',
    align: 'center',

    slots: { customRender: 'name' },
    width: 100
  },
  {
    title: 'Image',
    dataIndex: 'image_url',
    slots: { customRender: 'img' },
    align: 'center',
    responsive: ['md'],
    width: 100
  },
  {
    title: 'Price',
    dataIndex: 'price',
    align: 'center',
    slots: { customRender: 'price' },
    responsive: ['md'],
    width: 100
  },
  {
    title: 'Quantity',
    dataIndex: 'quantity',
    slots: { customRender: 'quantity' },
    align: 'center',
    responsive: ['md'],
    width: 100
  },
  {
    title: 'Total',
    dataIndex: 'total',
    align: 'center',
    slots: { customRender: 'total' },
    width: 100
  },
  {
    title: 'Action',
    slots: { customRender: 'action' },
    key: 'action',
    align: 'center',
    width: 70
  }
]

export const CHECKOUT_COLUMNS = [
  {
    title: 'Name',
    dataIndex: 'name',
    align: 'center',

    slots: { customRender: 'name' },
    width: 100
  },
  {
    title: 'Image',
    dataIndex: 'image_url',
    slots: { customRender: 'img' },
    align: 'center',
    responsive: ['md'],
    width: 100
  },
  {
    title: 'Price',
    dataIndex: 'price',
    align: 'center',
    slots: { customRender: 'price' },
    responsive: ['md'],
    width: 100
  },
  {
    title: 'Quantity',
    dataIndex: 'quantity',
    slots: { customRender: 'quantity' },
    align: 'center',
    responsive: ['md'],
    width: 100
  },
  {
    title: 'Total',
    dataIndex: 'total',
    align: 'center',
    slots: { customRender: 'total' },
    width: 100
  }
]

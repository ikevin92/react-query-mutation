import { type Product, productsApi } from '..'

interface GetProductsOptions {
  filterKey?: string
}

const sleep = (seconds: number = 0): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(resolve, seconds * 1000)
  })
}

export const getProducts = async ({
  filterKey
}: GetProductsOptions): Promise<Product[]> => {
  await sleep(2)

  const { data } = await productsApi.get<Product[]>('/products', {
    params: {
      category: filterKey
    }
  })

  return data
}

export const getProduct = async (id: number): Promise<Product> => {
  // await sleep(2)

  const { data } = await productsApi.get<Product>(`/products/${id}`)

  return data
}

export interface ProductLike {
  id?: number
  title: string
  price: number
  category: string
  description: string
  image: string
}

export const createProduct = async (
  product: ProductLike
): Promise<ProductLike> => {
  await sleep(2)

  const { data } = await productsApi.post<ProductLike>('/products', product)

  return data
}

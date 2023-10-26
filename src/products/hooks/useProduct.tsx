import { useQuery } from '@tanstack/react-query'
import { productActions } from '..'

interface useProductOptions {
  id: number
}

export const useProduct = ({ id }: useProductOptions) => {
  const {
    data: product,
    error,
    isError,
    isLoading,
    isPending
  } = useQuery({
    queryKey: ['product', { id }],
    queryFn: () => productActions.getProduct(id),
    staleTime: 1000 * 60 * 60
  })

  return {
    isLoading,
    isError,
    error,
    product,
    isPending
  }
}

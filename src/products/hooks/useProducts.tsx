import { useQuery } from '@tanstack/react-query'
import { productActions } from '..'

interface useProductsOptions {
  filterKey?: string
}

export const useProducts = ({ filterKey }: useProductsOptions) => {
  const {
    data: products = [],
    error,
    isError,
    isLoading,
    isPending
  } = useQuery({
    queryKey: ['products', { filterKey }],
    queryFn: () => productActions.getProducts({ filterKey }),
    staleTime: 1000 * 60 * 60
  })

  return {
    isLoading,
    isError,
    error,
    products,
    isPending
  }
}

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { productActions } from '..'
import { ProductLike } from '../services/actions'

export const useProductMutation = () => {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: productActions.createProduct,
    onMutate: async (product) => {
      console.log('mutando optimistic update', product)

      // Optimistic product
      const optimisticProduct: ProductLike = { id: Math.random(), ...product }

      // Almacenar producto en el cache  Add product to cache
      queryClient.setQueryData<ProductLike[]>(
        ['products', { filterKey: product.category }],
        (oldData) => {
          if (!oldData) return [optimisticProduct]

          return [...oldData, optimisticProduct]
        }
      )

      return { optimisticProduct }
    },
    onSuccess: (product, variables, context) => {
      console.log({ product, variables, context })

      // queryClient.invalidateQueries({
      //   queryKey: ['products', { filterKey: data.category }]
      // })
      queryClient.removeQueries({
        queryKey: ['products', { filterKey: context?.optimisticProduct?.id }]
      })

      queryClient.setQueryData<ProductLike[]>(
        ['products', { filterKey: product.category }],
        (oldData) => {
          if (!oldData) return [product]

          return oldData.map((cacheProduct) =>
            cacheProduct.id === context?.optimisticProduct.id
              ? product
              : cacheProduct
          )

          // return [...oldData, product]
        }
      )
    },
    onError: (error, variables, context) => {
      console.log({ error, variables, context })
      queryClient.removeQueries({
        queryKey: ['products', { filterKey: context?.optimisticProduct?.id }]
      })

      queryClient.setQueryData<ProductLike[]>(
        ['products', { filterKey: context?.optimisticProduct?.category }],
        (oldData) => {
          if (!oldData) return []

          return oldData.filter(
            (cacheProduct) => cacheProduct.id !== context?.optimisticProduct.id
          )
        }
      )
    },
    onSettled: () => {
      console.log('onSettled')
    }
  })

  return mutation
}

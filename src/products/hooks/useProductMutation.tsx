import { useMutation } from '@tanstack/react-query'
import { productActions } from '..'

export const useProductMutation = () => {
  const mutation = useMutation({
    mutationFn: productActions.createProduct,
    onSuccess: () => {
      alert('Producto creado')
    },
    onSettled: () => {
      console.log('onSettled')
    }
  })

  return mutation
}

import { Button, Image, Input, Textarea } from '@nextui-org/react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useProductMutation } from '..'

interface FormInputs {
  title: string
  price: number
  description: string
  category: string
  image: string
}

export const NewProduct = () => {
  const productMutation = useProductMutation()

  const { control, handleSubmit, watch } = useForm<FormInputs>({
    defaultValues: {
      title: 'Teclado',
      price: 150.2,
      description:
        'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dignissimos inventore labore neque eligendi at unde consequuntur adipisci recusandae deleniti. Qui dolore totam dolorum cupiditate quis suscipit culpa repudiandae amet error!',
      category: "men's clothing",
      image:
        'https://http2.mlstatic.com/D_NQ_NP_2X_652942-MLA45325964189_032021-F.webp'
    }
  })

  const newImage = watch('image')

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    console.log('submit', data)
    productMutation.mutate(data)
  }

  return (
    <div className="w-full flex-col">
      <h1 className="text-2xl font-bold">Nuevo producto</h1>

      <form
        className="w-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex justify-around items-center">
          <div className="flex-col w-[500px]">
            <Controller
              control={control}
              name="title"
              rules={{ required: true }}
              render={({ field }) => (
                <Input
                  value={field.value}
                  onChange={field.onChange}
                  className="mt-2"
                  type="text"
                  label="Titulo del producto"
                />
              )}
            />

            <Controller
              control={control}
              name="price"
              rules={{ required: true }}
              render={({ field }) => (
                <Input
                  value={field.value?.toString()}
                  onChange={(ev) => field.onChange(+ev.target.value)}
                  className="mt-2"
                  type="number"
                  label="Precio del producto"
                />
              )}
            />

            <Controller
              control={control}
              name="image"
              rules={{ required: true }}
              render={({ field }) => (
                <Input
                  value={field.value}
                  onChange={field.onChange}
                  className="mt-2"
                  type="url"
                  label="Url de la imagen producto"
                />
              )}
            />

            <Controller
              control={control}
              name="description"
              rules={{ required: true }}
              render={({ field }) => (
                <Textarea
                  value={field.value}
                  onChange={field.onChange}
                  className="mt-2"
                  label="Descripción del producto"
                />
              )}
            />

            <Controller
              control={control}
              name="category"
              rules={{ required: true }}
              render={({ field }) => (
                <select
                  className="rounded-md p-3 mt-2 bg-gray-800 w-full"
                  value={field.value}
                  onChange={field.onChange}
                >
                  <option value="men's clothing">Men's clothing</option>
                  <option value="women's clothing">Women's clothing</option>
                  <option value="jewelery">Jewelery</option>
                  <option value="electronics">Electronics</option>
                </select>
              )}
            />

            <br />
            <Button
              type="submit"
              className="mt-2"
              color="primary"
              isDisabled={productMutation.isPending}
            >
              {productMutation.isPending ? 'Creando...' : 'Crear'}
            </Button>
          </div>

          <div
            className="bg-white rounded-2xl p-10 flex items-center"
            style={{
              width: '500px',
              height: '600px'
            }}
          >
            <Image src={newImage} />
          </div>
        </div>
      </form>
    </div>
  )
}

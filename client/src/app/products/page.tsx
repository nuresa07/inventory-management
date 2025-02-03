"use client"

import { PlusCircleIcon, SearchIcon } from 'lucide-react'
import React, { useState } from 'react'
import Header from '../(components)/Header'
import { useCreateProductMutation, useGetProductsQuery } from '@/state/api'
import Rating from '../(components)/Rating'
import CreateProductModal from './CreateProductModal'
import { useDebounce } from "use-debounce";
// type
import { ProductFormData } from '@/types'

const Products = () => {

  const [searchTerm, setSearchTerm] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)

  const [debouncedSearchTerm] = useDebounce(searchTerm, 300)

  const { data: products, isLoading, isError } = useGetProductsQuery(debouncedSearchTerm)
  console.log("products = ", products);


  const [createProduct] = useCreateProductMutation()
  const handleCreateProduct = async (productData: ProductFormData) => {
    await createProduct(productData)
  }

  if (isLoading) {
    return (
      <div className='py-4'>
        Loading...
      </div>
    )
  }

  if (isError || !products) {
    return (
      <div className='text-center text-red-500 py-5'>
        failder to fetch products
      </div>
    )
  }

  return (
    <div className='mx-auto pb-5 w-full'>
      {/* Search Bar */}
      <div className="mb-6 relative">
        <div className="flex items-center rounded bg-white">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <SearchIcon className='w-5 h-5 m-2 text-[#a8d9fa]' />
          </div>
          <input
            className='pl-12 w-full py-2 px-2 rounded bg-white focus:outline-none focus:border-[#3B82F6] border-2 border-[#D1D5DB]'
            placeholder='Search Products...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Header Bar */}
      <div className="flex justify-between items-center mb-6">
        <Header name='Products' />
        <button
          className='flex items-center bg-blue-500 text-white hover:bg-blue-600 font-bold font-weight-100 py-2 px-2 rounded'
          onClick={() => setIsModalOpen(true)}
        >
          <PlusCircleIcon className='w-5 h-5 mr-2' /> Create Product
        </button>
      </div>

      {/* Body Product List */}
      <div className="grid  grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          products?.map((product) => (
            <div
              key={product.productId}
              className='border shadow rounded-md p-4 max-w-full w-full mx-auto hover:border-blue-600 bg-gray-900'
            >
              <div className="flex flex-col items-center">
                <span className=''>Image</span>
                <div className='text-lg font-semibold'>{product.name}</div> {/* text-gray-900 */}
                <p className=''>{product.price.toFixed(2)}</p> {/* text-gray-800 */}
                <div className="text-sm mt-1"> {/* text-gray-600 */}
                  Stock: {product.stockQuantity}
                </div>
                {product.rating && (
                  <div className="flex items-center mt-2">
                    <Rating rating={product.rating} />
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal */}
      <CreateProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreateProduct}
      />

    </div>
  )
}

export default Products

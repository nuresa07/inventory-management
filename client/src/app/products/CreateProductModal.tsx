import { CreateProductModalProps } from '@/types'
import React, { ChangeEvent, FormEvent, useState } from 'react'
import Header from '../(components)/Header';

const CreateProductModal = ({ isOpen, onClose, onCreate }: CreateProductModalProps) => {

  const [formData, setFormData] = useState({
    // productId: v4(),
    name: "",
    price: 0,
    stockQuantity: 0,
    rating: 0,
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "price" || name === "stockQuantity" || name === "rating"
        ? parseFloat(value)
        : value
    })
  }

  if (!isOpen) return null;

  const labelCssStyles = "block text-sm font-medium text-gray-400 my-2 text-xl"
  const inputCssStyles = "block w-full mb-2 p-2 border-gray-500 border-2 rounded-md bg-white focus:border-[#3B82F6] focus:outline-none"

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onCreate(formData)
    onClose()
  }

  return (
    <div className='fixed inset-0 bg-[#4B5563] bg-opacity-10 overflow-y-auto h-full w-full z-20'>
      <div className="relative top-20 mx-auto border p-5 w-96 shadow-lg rounded-md bg-white">
        <Header name='Create New Product' styles='text-center' />
        <hr className='mt-2' />
        <form className='mt-5' onSubmit={handleSubmit}>
          <label className={labelCssStyles} htmlFor="productName">
            Product Name :
          </label>
          <input
            type="text"
            name='name'
            placeholder='Name'
            onChange={handleChange}
            value={formData.name}
            className={inputCssStyles}
            required
          />

          <label className={labelCssStyles} htmlFor="productPrice">
            Price :
          </label>
          <input
            type="number"
            name='price'
            placeholder='Price'
            onChange={handleChange}
            value={formData.price}
            className={inputCssStyles}
            required
          />

          {/* Stock Quantity */}
          <label className={labelCssStyles} htmlFor="stockQuantity">
            Stock Quantity :
          </label>
          <input
            type="number"
            name='stockQuantity'
            placeholder='Stock Quantity'
            onChange={handleChange}
            value={formData.stockQuantity}
            className={inputCssStyles}
            required
          />

          {/* Rating */}
          <label className={labelCssStyles} htmlFor="rating">
            Rating :
          </label>
          <input
            type="number"
            name='rating'
            placeholder='Rating'
            onChange={handleChange}
            value={formData.rating}
            className={inputCssStyles}
            required
          />

          {/* Create Action */}
          <div className="flex justify-center mt-4">
            <button className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-2' type='submit'>
              Create
            </button>
            <button className='bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 ml-2' onClick={onClose} type='button'>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateProductModal
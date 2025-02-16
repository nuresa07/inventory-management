import { useGetDashboardMetricsQuery } from '@/state/api'
import React from 'react'
import { AlertCircle, Loader2, ShoppingBag } from 'lucide-react'
import Rating from '../(components)/Rating'
import Image from 'next/image'


const CardPopularProducts = () => {

  const { data: dashbordMetrics, isLoading, isError } = useGetDashboardMetricsQuery()

  if (isError || !dashbordMetrics) {
    return (
      <div className="flex items-center justify-center py-8 text-red-500">
        <AlertCircle className="w-6 h-6" />
        <span className="ml-2 font-medium">Failed to Fetch Popular Products</span>
      </div>
    );
  }

  return (
    <div className='row-span-3 xl:row-span-6 bg-white shadow-md rounded-2xl pb-16 dark:border border border-[#D1D5DB]'> {/**/}
      {isLoading ? (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="w-6 h-6 text-blue-500 animate-spin" />
          <span className="ml-2 text-blue-500 font-medium">Loading...</span>
        </div>
      ) : (
        <>
          <h3 className='text-lg fonst-semibold px-7 pt-5 pb-2'>Popular Products</h3>
          <hr />
          <div className="overflow-auto h-full">
            {dashbordMetrics?.popularProducts.map((product) => (
              <div className='flex items-center justify-between gap-3 px-5 py-7 border-b' key={product.productId}>
                <div className="flex items-center gap-3">
                  <Image
                    src={`https://my-s3-inventorymanagement-system.s3.us-east-2.amazonaws.com/product${Math.floor(Math.random() * 3) + 1}.png`}
                    alt={product.name}
                    width={48} height={48}
                    className='rounded-lg'
                  />
                  <div className="flex flex-col justify-between gap-1">
                    <div className="font-bold">
                      {product.name}
                    </div>
                    <div className="flex text-sm items-center">
                      <span className='font-bold text-[#3B82F6] text-xs'>
                        {product.price}
                      </span>
                      <span className='mx-2'>|</span>
                      <Rating rating={product.rating || 0} />
                    </div>
                  </div>
                </div>

                <div className="text-xs flex items-center">
                  <button className='p-2 rounded-full bg-[#EBF8FF] text-[#243c5a] mr-2 border-2'>
                    <ShoppingBag />
                  </button>
                  {Math.round(product.stockQuantity / 1000)}K Sold
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default CardPopularProducts

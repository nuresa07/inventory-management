"use client"

import React from 'react'
import Header from '../(components)/Header'
import { DataGrid } from "@mui/x-data-grid"
import { useGetProductsQuery } from '@/state/api'
import { columns } from '@/constants'
import { LinearProgress } from '@mui/material'

const Inventory = () => {

  const { data: products, isError, isLoading } = useGetProductsQuery()
  console.log(products);

  if (isLoading) {
    return (
      <div className='py-4'>
        <LinearProgress variant="determinate" />
        Loading...
      </div>
    )
  }

  if (isError || !products) {
    return (
      <div className="text-center text-red-950 py-4">
        Failed to fetch products
      </div>
    )
  }

  return (
    <div className='flex flex-col'>
      <Header name='Inventory' />
      <DataGrid
        columns={columns}
        rows={products}
        getRowId={(row) => row.productId}
        checkboxSelection
        className='!bg-[#fff] shadow rounded-lg mt-5 text-black'
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 8,
            },
          },
        }}
      />
    </div>
  )
}

export default Inventory

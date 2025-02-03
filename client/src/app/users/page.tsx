"use client"

import React from 'react'
import Header from '../(components)/Header'
import { DataGrid } from "@mui/x-data-grid"
import { useGetUsersQuery } from '@/state/api'
import { columnsUsers } from '@/constants'
import { LinearProgress } from '@mui/material'

const Users = () => {

  const { data: users, isError, isLoading } = useGetUsersQuery()
  console.log(users);

  if (isLoading) {
    return (
      <div className='py-4'>
        <LinearProgress variant="determinate" />
        Loading...
      </div>
    )
  }

  if (isError || !users) {
    return (
      <div className="text-center text-red-950 py-4">
        Failed to fetch users
      </div>
    )
  }

  return (
    <div className='flex flex-col'>
      <Header name='Users' />
      <DataGrid
        columns={columnsUsers}
        rows={users}
        getRowId={(row) => row.userId}
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

export default Users

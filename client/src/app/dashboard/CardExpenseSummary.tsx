import { useGetDashboardMetricsQuery } from '@/state/api'
import { ExpenseByCategorySummary, ExpenseSums } from '@/types';
import { AlertCircle, Loader2, TrendingUp } from 'lucide-react';
import React from 'react'
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'

const colors = ["#00C49F", "#0088FE", "#FFBB28"]

const CardExpenseSummary = () => {

  const { data: dashboardMetrics, isLoading, isError } = useGetDashboardMetricsQuery()

  // ringkasan biaya
  const expenseSummary = dashboardMetrics?.expenseSummary[0]
  const formatedTotalExpenses = expenseSummary?.totalExpenses.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }) || "0.00";

  // Ringkasan Biaya Berdasarkan Kategori
  const expenseByCategorySummary = dashboardMetrics?.expenseByCategorySummary || []

  // jumlah biaya
  const expenseSums = expenseByCategorySummary.reduce((acc: ExpenseSums, item: ExpenseByCategorySummary) => {
    const category = item.category + "Expenses";
    const amount = parseInt(item.amount, 10)
    if (!acc[category]) acc[category] = 0
    acc[category] += amount
    return acc
  }, {})

  const expenseCategories = Object.entries(expenseSums).map(([name, value]) => ({
    name,
    value
  }))

  const totalExpenses = expenseCategories.reduce(
    (acc, category: { value: number }) => acc + category.value, 0
  )

  const formattedTotalExpenses = totalExpenses.toFixed(2)

  if (isError) {
    return (
      <div className="flex items-center justify-center py-8 text-red-500">
        <AlertCircle className="w-6 h-6" />
        <span className="ml-2 font-medium">Failed to Fetch Expense Summary</span>
      </div>
    );
  }

  return (
    <div className="row-span-3 shadow-md rounded-2xl flex flex-col justify-between border border-[#D1D5DB]">
      {isLoading ? (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="w-6 h-6 text-blue-500 animate-spin" />
          <span className="ml-2 text-blue-500 font-medium">Loading...</span>
        </div>
      ) : (
        <>
          <div>
            <h2 className='text-lg font-semibold mb-2 px-7 pt-5'>
              Expense Summary
            </h2>
            <hr />
          </div>

          <div className="xl:flex justify-between pt-1">
            <div className="relative basis-3/5"> {/*  */}
              <ResponsiveContainer width="100%" height={120}>
                <PieChart>
                  <Tooltip
                    formatter={(value, name) => {
                      // Periksa apakah 'name' adalah string sebelum memanggil 'replace'
                      const formattedName =
                        typeof name === "string" ? name.replace(/Expenses$/, " Expenses") : name;
                      return [`${value}`, formattedName];
                    }}
                    labelClassName='text-[#00ebff]'
                  />
                  <Pie
                    data={expenseCategories}
                    innerRadius={50}
                    outerRadius={60}
                    fill='#8884d8'
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                  >
                    {expenseCategories.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={colors[index % colors.length]}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center basis-2/5" > {/**/}
                <span className='font-bold text-xl'>
                  {formattedTotalExpenses}
                </span>
              </div>
            </div>

            <ul className='flex flex-col justify-around xl:items-start items-center py-5 gap-3 '>
              {expenseCategories.map((entry, index) => {
                const formatedName = entry.name.replace(/Expenses$/, " Expenses")
                return (
                  <li className='flex items-center text-xs' key={`legend-${index}`}>
                    <span className='mr-2 w-3 h-3 rounded-full' style={{ backgroundColor: colors[index % colors.length] }}>
                    </span>
                    {formatedName}
                  </li>
                )
              })}
            </ul>
          </div>

          <div>
            {/* <hr /> */}
            {expenseSummary && (
              <div className="flex justify-between items-center px-7 mb-3">
                <div className=''>
                  <p className='text-sm'>
                    Average:{" "}
                    <span className='font-semibold'>
                      ${formatedTotalExpenses}
                    </span>
                  </p>
                </div>
                <span className="flex items-center mt-2">
                  <TrendingUp className='mr-2 text-[#4CAF50]' />
                  30%
                </span>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}

export default CardExpenseSummary


"use client"

import { useGetExpensesByCategoryQuery } from '@/state/api';
import React, { useMemo, useState } from 'react'
import Header from '../(components)/Header';
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { AggregatedData, AggregatedDataItem, ExpenseByCategorySummary } from '@/types';
import { AlertCircle, Loader2 } from 'lucide-react';


const Expenses = () => {

  const [activeIndex, setActiveIndex] = useState(0)
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")

  const { data: expensesData, isLoading, isError } = useGetExpensesByCategoryQuery()
  const expenses = useMemo(() => expensesData ?? [], [expensesData]);
  // console.log("expenses = ", expenses);

  const parseDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toISOString().split("T")[0] // ["2024-03-11", "08:04:25.000Z"] => [0] => "2024-03-11"
  }

  const aggregatedData: AggregatedDataItem[] = useMemo(() => {
    const filtered: AggregatedData = expenses
      .filter((data: ExpenseByCategorySummary) => {
        const matchesCategory = selectedCategory === "All" || data.category === selectedCategory
        const dataDate = parseDate(data.date)
        const matchesDate = !startDate || !endDate || (dataDate >= startDate && dataDate <= endDate);

        return matchesCategory && matchesDate
      })
      .reduce((acc: AggregatedData, data: ExpenseByCategorySummary) => {
        const amount = parseInt(data.amount)
        if (!acc[data.category]) {
          acc[data.category] = { name: data.category, amount: 0 };
          acc[data.category].color = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
          acc[data.category].amount += amount;
        }
        return acc
      }, {})

    console.log("filtered = ", filtered)

    return Object.values(filtered)
  }, [expenses, selectedCategory, startDate, endDate])

  // console.log("aggregatedData = ", aggregatedData);

  const classNames = {
    label: 'block text-sm font-medium text-gray-300',
    selectInput: 'mt-1 block w-full pl-3 pr-3 py-2 text-base border focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md bg-white'
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="w-6 h-6 text-blue-500 animate-spin" />
        <span className="ml-2 text-blue-500 font-medium">Loading...</span>
      </div>
    );
  }

  if (isError || !expensesData) {
    return (
      <div className="flex items-center justify-center py-8 text-red-500">
        <AlertCircle className="w-6 h-6" />
        <span className="ml-2 font-medium">Failed to Fetch Expenses</span>
      </div>
    );
  }

  return (
    <div className=''>
      {/* Header */}
      <div className="mb-5">
        <Header name="Expenses " />
        <p>A visual representation of expenses over time</p>
      </div>

      {/* Filter */}
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="1 border w-full md:w-1/3 bg-white shadow rounded-lg p-6">
          <h3 className='text-lg font-semibold mb-4'>
            filter by category and date
          </h3>
          <div className="space-y-4 ">
            {/* Category */}
            <div className=''>
              <label htmlFor="category" className={classNames.label} >
                Category
              </label>
              <select
                id="category"
                name="category"
                className={classNames.selectInput}
                defaultValue="All"
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option disabled>Select a category</option>
                <option>All</option>
                <option>Office</option>
                <option>Professional</option>
                <option>Salaries</option>
              </select>
            </div>
            {/* Start Date */}
            <div className="relative">
              <label className={classNames.label} htmlFor="start-date">
                Start Date
              </label>
              <input
                type="date"
                id='start-date'
                name='start-date'
                className={classNames.selectInput}
                onChange={(e) => setStartDate(e.target.value)}
              />
              <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-blue-500 top-7">
                📅 {/* Ikon kalender bisa diganti dengan ikon dari library */}
              </div>
            </div>
            {/* End Date */}
            <div className="relative">
              <label htmlFor="end-date" className={classNames.label} >
                End Date
              </label>
              <input
                type="date"
                id="end-date"
                name="end-date"
                className={classNames.selectInput}
                onChange={(e) => setEndDate(e.target.value)}
              />
              <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-blue-500 top-7">
                📅 {/* Ikon kalender bisa diganti dengan ikon dari library */}
              </div>
            </div>
          </div>
        </div>

        {/* PIE CHART */}
        <div className="flex-grow bg-white shadow rounded-lg p-4 md:p-6 border">
          <ResponsiveContainer width="100%" height={400} className="">
            <PieChart>
              <Pie
                data={aggregatedData}
                cx="50%"
                cy="50%"
                label
                outerRadius={150}
                dataKey="amount"
                onMouseEnter={(_, index) => setActiveIndex(index)}
              >
                {aggregatedData.map((entry: AggregatedDataItem, index: number) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={index === activeIndex ? "rgb(29,78,216)" : entry.color}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

export default Expenses

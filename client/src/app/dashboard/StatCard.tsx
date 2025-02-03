import { StateCardProps } from '@/types'
import React from 'react'



const StatCard = ({ title, primaryIcon, details, dateRange }: StateCardProps) => {

  const getChangeColor = (value: number) => value >= 0 ? "text-green-500" : "text-red-500"

  const formatPercentage = (value: number) => {
    const signal = value >= 0 ? "+" : "";
    return `${signal}${value.toFixed()}%`
  }

  return (
    <div className="md:row-span-1 xl:row-span-2 col-span-1 shadow-md rounded-2xl flex flex-col justify-between border border-[#D1D5DB]">
      {/* Header start */}
      <div>
        <div className="flex justify-between items-center mb-2 px-5 pt-4">
          <h2 className='font-semibold text-lg'>{title}</h2>
          <span className='text-xs text-gray-400'>{dateRange}</span>
        </div>
        <hr />
      </div>
      {/* Header end */}
      {/* Body Start */}
      <div className='flex items-center justify-around px-5 gap-4'>{/* */}
        <div className="rounded-full p-4 bg-[#3B82F6]">
          {primaryIcon}
        </div>
        <div className="flex-1">
          {details.map((detail, index) => (
            <React.Fragment key={index}>
              <div className="flex items-center justify-between my-2">
                <span>{detail.title}</span>
                <span className='font-bold'>{detail.amount}</span>
                <div className="flex items-center">
                  <detail.IconComponent className={`w-4 h-4 mr-1 ${getChangeColor(detail.changePercentage)}`} />
                </div>
                <span className={`font-medium ${getChangeColor(detail.changePercentage)}`}>
                  {formatPercentage(detail.changePercentage)}
                </span>
              </div>
              {index < details.length - 1 && <hr />}
            </React.Fragment>
          ))}
        </div>
      </div>
      {/* Body End */}
    </div>
  )
}

export default StatCard

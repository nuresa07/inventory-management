"use client"

import { useState } from "react"
import Header from "../(components)/Header"
import { UserSetting } from "@/types"
import { mockSettings } from "@/constants"

const Settings = () => {

  const [userSettings, setUserSettings] = useState<UserSetting[]>(mockSettings)

  const handleToggleChange = (index: number) => {
    const settingsCopy = [...userSettings]
    settingsCopy[index].value = !settingsCopy[index].value as boolean
    setUserSettings(settingsCopy)
  }

  return (
    <div className="w-full">
      <Header name="User Setting" />
      <div className="overflow-x-auto mt-5 shadow-md">
        <table className="min-w-full bg-white rounded-lg">
          <thead className="bg-gray-800">
            <tr>
              <th className="border text-left py-3 px-4 uppercase font-semibold text-sm">
                Setting
              </th>
              <th className="border text-left py-3 px-4 uppercase font-semibold text-sm">
                Value
              </th>
            </tr>
          </thead>
          <tbody>
            {userSettings.map((setting, index) => (
              <tr key={setting.label} className="border">
                <td className="py-2 px-4">{setting.label}</td>
                <td className="py-2 px-4 border" >
                  {
                    setting.type === "toggle" ? (
                      <label className="inline-flex items-center cursor-pointer relative">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={setting.value as boolean}
                          onChange={() => handleToggleChange(index)}
                        />
                        <div
                          className="w-11 h-6 bg-gray-600 rounded-full peer peer-focus:ring-blue-500  transition peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-gray-400 after:border-gray-800 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500 peer-checked:after:bg-white"
                        />
                      </label>
                    ) : (
                      <input
                        type="text"
                        className="px-4 py-2 border rounded-lg bg-white text-gray-200 focus:outline-none focus:border-blue-500"
                        value={setting.value as string}
                        onChange={(e) => {
                          const settingsCopy = [...userSettings]
                          settingsCopy[index].value = e.target.value
                          setUserSettings(settingsCopy)
                        }}
                      />
                    )
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div >

    </div >
  )
}

export default Settings

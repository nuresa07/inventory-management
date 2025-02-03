import React from 'react'

type HeaderProps = {
  name: string;
  styles?: string;
}

const Header = ({ name, styles }: HeaderProps) => {
  return <h1 className={`text-2xl font-semibold ${styles}`}>{name}</h1>
}

export default Header

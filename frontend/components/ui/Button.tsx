import React from 'react'

type Props = {
    placeholder: string,
}

export default function Button({placeholder}: Props) {
  return (
    <button type="button" className="bg-[#DCAF52] hover:bg-orange-300 text-white font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2s">{placeholder}</button>
  )
}
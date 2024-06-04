import React from 'react'
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <header className="bg-gray-900 text-white py-4 px-6 md:px-8 flex items-center justify-between">
    <Link href="#" className="text-xl font-bold" prefetch={false}>
      Book Reviews
    </Link>
    <div className="relative w-full max-w-md">
      <Input
        type="search"
        placeholder="Search books..."
        className="bg-gray-800 border-none pl-10 pr-4 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary-500"
      />
      {/* <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" /> */}
    </div>
  </header>
  )
}

export default Nav
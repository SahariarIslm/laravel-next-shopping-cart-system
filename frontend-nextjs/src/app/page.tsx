'use client'

import { useState } from 'react'
import { useGetProductsQuery } from '@/store/api/productApi'
import { ProductCard } from '@/components/ProductCard'

export default function HomePage() {
  const [page, setPage]     = useState(1)
  const [search, setSearch] = useState('')
  const [query, setQuery]   = useState('')

  const { data, isLoading, isError } = useGetProductsQuery({ page, per_page: 12, search: query })

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setQuery(search)
    setPage(1)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Products</h1>
        <p className="text-gray-500 mt-1">Browse and add items to your cart</p>
      </div>

      {/* Search */}
      <form onSubmit={handleSearch} className="flex gap-2 mb-6">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm"
        />
        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700"
        >
          Search
        </button>
      </form>

      {/* States */}
      {isLoading && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl h-64 animate-pulse border border-gray-100" />
          ))}
        </div>
      )}

      {isError && (
        <div className="text-center py-16">
          <p className="text-red-500 font-medium">Failed to load products. Is the backend running?</p>
        </div>
      )}

      {data && (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {data.data.data.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Pagination */}
          {data.data.last_page > 1 && (
            <div className="flex justify-center gap-2 mt-8">
              {[...Array(data.data.last_page)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className={`w-9 h-9 rounded-md text-sm font-medium ${
                    page === i + 1
                      ? 'bg-indigo-600 text-white'
                      : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}
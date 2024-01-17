import React from 'react'

const CreateListing = () => {
  const handleChange = () => {}
  return (
    <div className="flex flex-col items-center justify-center h-screen p-2 pb-16">
      <h1 className="text-center text-xl font-semibold mb-4">Create Listing</h1>
      <form className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col gap-4 w-full sm:max-w-xl">
          <input
            type="text"
            placeholder="Name"
            id="name"
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none"
            onChange={handleChange}
            required
          />
          <textarea
            placeholder="Description"
            id="description"
            className="border border-gray-300 rounded-lg p-3 focus:outline-none"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            placeholder="Address"
            id="address"
            className="border border-gray-300 rounded-lg p-3 focus:outline-none"
            onChange={handleChange}
            required
          />
          <div className="flex sm:flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <input type="checkbox" id="sell" className="h-4 w-4" />
              <span className="font-semibold">Sell</span>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="rent" className="h-4 w-4" />
              <span className="font-semibold">Rent</span>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="parking" className="h-4 w-4" />
              <span className="font-semibold">Parking</span>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="offer" className="h-4 w-4" />
              <span className="font-semibold">Offer</span>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bedrooms"
                min={0}
                max={15}
                step={1}
                className="w-18 p-3 border border-gray-300 rounded-lg focus:outline-none [appearance:textfield]
                [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                required
              />
              <span className="font-semibold">Beds</span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bathrooms"
                min={0}
                max={15}
                step={1}
                className="w-18 p-3 border border-gray-300 rounded-lg focus:outline-none [appearance:textfield]
                [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                required
              />
              <span className="font-semibold">Baths</span>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <span className="text-black sm:text-sm">$</span>
                </div>
                <input
                  type="number"
                  id="price"
                  className="p-3 pl-7 border border-gray-300 rounded-lg focus:outline-none [appearance:textfield]
                [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
              </div>
              <div className="flex flex-col items-center">
                <span className="font-semibold">Price</span>
                <span className="text-gray-500">($/Month)</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 w-full sm:max-w-xl">
          <div className="flex items-center gap-2">
            <span className="font-semibold">Images:</span>
            <span className="text-gray-500">Max 6 images.</span>
          </div>
          <div className="flex gap-2 border border-gray-500 rounded-lg p-2">
            <input
              type="file"
              id="images"
              accept="image/*"
              multiple
              className="p-3 border-gray-300 rounded-lg w-full"
            />
            <button
              type="button"
              className="px-6 uppercase bg-customBlue text-white font-semibold rounded-lg hover:bg-blue-500 transition duration-300"
            >
              Upload
            </button>
          </div>
          <button
            className={
              'py-3 uppercase bg-green-700 text-white font-semibold rounded-lg w-full hover:bg-green-600 transition duration-300'
            }
          >
            Create Listing
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreateListing

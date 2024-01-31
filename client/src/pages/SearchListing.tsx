import React from 'react'

const SearchListing = () => {
  return (
    <div className="flex flex-col md:flex-row p-2">
      <div className="flex border-b-2 md:border-r-2 md:border-b-0 md:min-h-screen mt-20 p-4">
        <form className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <label htmlFor="searchTerm" className="font-semibold">
              Search:
            </label>
            <input
              type="text"
              id="searchTerm"
              placeholder="Search..."
              className="border rounded-lg p-3 w-full"
            />
          </div>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <label htmlFor="sale" className="font-semibold">
                Sell
              </label>
              <input
                type="checkbox"
                id="sale"
                className="h-4 w-4"
                // onChange={handleChange}
                // checked={formData.listingType === 'sale'}
              />
            </div>
            <div className="flex items-center gap-2">
              <label htmlFor="rent" className="font-semibold">
                Rent
              </label>
              <input
                type="checkbox"
                id="rent"
                className="h-4 w-4"
                // onChange={handleChange}
                // checked={formData.listingType === 'rent'}
              />
            </div>

            <div className="flex items-center gap-2">
              <label htmlFor="furnished" className="font-semibold">
                Furnished
              </label>
              <input
                type="checkbox"
                id="furnished"
                className="h-4 w-4"
                //   onChange={handleChange}
                //   checked={formData.furnished}
              />
            </div>

            <div className="flex items-center gap-2">
              <label htmlFor="parking" className="font-semibold">
                Parking
              </label>
              <input
                type="checkbox"
                id="parking"
                className="h-4 w-4"
                // onChange={handleChange}
                // checked={formData.parking}
              />
            </div>
            <div className="flex items-center gap-2">
              <label htmlFor="offer" className="font-semibold">
                Offer
              </label>
              <input
                type="checkbox"
                id="offer"
                className="h-4 w-4"
                // onChange={handleChange}
                // checked={formData.offer}
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="sort" className="font-semibold">
              Sort:
            </label>
            <select
              name="sort"
              id="sort"
              className="border border-slate-300 rounded-lg p-2"
            >
              <option>Price high to low</option>
              <option>Price low to high</option>
              <option>Latest</option>
              <option>Oldest</option>
            </select>
          </div>
          <button className="w-full py-3 px-4 uppercase bg-customBlue text-white text-[12px] sm:text-[16px] font-semibold rounded-lg hover:bg-blue-500 ease-in duration-200">
            Search
          </button>
        </form>
      </div>
      <div className="mt-20 p-4">
        <h1>Listing Result</h1>
      </div>
    </div>
  )
}

export default SearchListing

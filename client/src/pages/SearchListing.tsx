import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { CreateListingFormData, SearchParams } from '../types'
import { useNavigate } from 'react-router-dom'
import useGetSearchListing from '../query/useGetSearchListing.ts'
import ListingResultCard from '../components/ListingResultCard.tsx'
import Spinner from '../components/Spinner.tsx'

const SearchListing = () => {
  const [searchParams, setSearchParams] = useState<SearchParams>({
    searchTerm: '',
    listingType: 'sale',
    furnished: false,
    parking: false,
    offer: false,
    sort: 'createdAt',
    order: 'desc',
  })
  const [searchQueryParams, setSearchQueryParams] = useState<string>('')

  const navigate = useNavigate()

  const { searchListing } = useGetSearchListing(searchQueryParams)
  const { data: searchResultData, refetch, isLoading, isError } = searchListing

  const searchResult = searchResultData?.data as CreateListingFormData[]

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search)
    const searchTermFromUrl = urlParams.get('searchTerm')
    const parkingFromUrl = urlParams.get('parking')
    const furnishedFromUrl = urlParams.get('furnished')
    const offerFromUrl = urlParams.get('offer')
    const listingTypeFromUrl = urlParams.get('listingType')
    const sortFromUrl = urlParams.get('sort')
    const orderFromUrl = urlParams.get('order')

    if (
      searchTermFromUrl ||
      parkingFromUrl ||
      furnishedFromUrl ||
      offerFromUrl ||
      listingTypeFromUrl ||
      sortFromUrl ||
      orderFromUrl
    ) {
      setSearchParams({
        searchTerm: searchTermFromUrl || '',
        listingType: listingTypeFromUrl === 'sale' ? 'sale' : 'rent',
        furnished: furnishedFromUrl === 'true' ? true : false,
        parking: parkingFromUrl === 'true' ? true : false,
        offer: offerFromUrl === 'true' ? true : false,
        sort: sortFromUrl === 'createdAt' ? 'createdAt' : 'regularPrice',
        order: orderFromUrl === 'asc' ? 'asc' : 'desc',
      })
    }
  }, [location.search])

  //type guard checks whether the target is an HTMLInputElement
  const isInputElement = (target: EventTarget): target is HTMLInputElement => {
    return 'checked' in target
  }

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    if (e.target.id === 'rent' || e.target.id === 'sale') {
      setSearchParams({
        ...searchParams,
        listingType: e.target.id,
      })
    }

    if (e.target.id === 'searchTerm') {
      setSearchParams({
        ...searchParams,
        searchTerm: e.target.value,
      })
    }

    if (isInputElement(e.target)) {
      if (
        e.target.id === 'parking' ||
        e.target.id === 'offer' ||
        e.target.id === 'furnished'
      ) {
        setSearchParams({
          ...searchParams,
          [e.target.id]: e.target.checked,
        })
      }
    }

    if (e.target.id === 'sort') {
      const sort = e.target.value.split('_')[0] as 'createdAt' | 'regularPrice'
      const order = e.target.value.split('_')[1] as 'asc' | 'desc'
      setSearchParams({
        ...searchParams,
        sort,
        order,
      })
    }
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const urlParams = new URLSearchParams(location.search)

    urlParams.set('searchTerm', searchParams.searchTerm)
    urlParams.set('parking', searchParams.parking.toString())
    urlParams.set('furnished', searchParams.furnished.toString())
    urlParams.set('offer', searchParams.offer.toString())
    urlParams.set('listingType', searchParams.listingType)
    urlParams.set('sort', searchParams.sort)
    urlParams.set('order', searchParams.order)

    const searchQuery = urlParams.toString()
    if (searchQuery) {
      setSearchQueryParams(searchQuery)
    }
    navigate(`/search?${searchQuery}`)
  }

  return (
    <div className="flex flex-col md:flex-row p-2 h-full">
      <div className="flex justify-center border-b-2 md:border-r-2 md:border-b-0 mt-20 p-4">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 w-full sm:min-w-[380px]"
        >
          <div className="flex items-center gap-2">
            <label htmlFor="searchTerm" className="font-semibold">
              Search:
            </label>
            <input
              type="text"
              id="searchTerm"
              placeholder="Search..."
              className="border rounded-lg p-3 w-full"
              onChange={handleChange}
              value={searchParams.searchTerm}
            />
          </div>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <label htmlFor="sale" className="font-semibold">
                Sale
              </label>
              <input
                type="checkbox"
                id="sale"
                className="h-4 w-4"
                onChange={handleChange}
                checked={searchParams.listingType === 'sale'}
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
                onChange={handleChange}
                checked={searchParams.listingType === 'rent'}
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
                onChange={handleChange}
                checked={searchParams.furnished}
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
                onChange={handleChange}
                checked={searchParams.parking}
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
                onChange={handleChange}
                checked={searchParams.offer}
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="sort" className="font-semibold">
              Sort by:
            </label>
            <select
              name="sort"
              id="sort"
              className="border border-slate-300 rounded-lg p-2"
              onChange={handleChange}
              defaultValue={'createdAt_desc'}
            >
              <option value={'regularPrice_desc'}>Price high to low</option>
              <option value={'regularPrice_asc'}>Price low to high</option>
              <option value={'createdAt_desc'}>Latest</option>
              <option value={'createdAt_asc'}>Oldest</option>
            </select>
          </div>
          <button
            className="flex items-center justify-center py-3 px-4 uppercase 
          bg-customBlue text-white text-[12px] sm:text-[16px] font-semibold 
          rounded-lg hover:bg-blue-500 ease-in duration-200"
          >
            {isLoading ? <Spinner /> : 'Search'}
          </button>
        </form>
      </div>
      <div className="flex flex-col sm:mt-20 p-4 w-full">
        <h1 className="font-semibold text-md sm:text-lg">Listing Results:</h1>
        <div
          className={`flex flex-wrap ${
            (isLoading || isError || !searchResult?.length) &&
            'justify-center items-center'
          } gap-4  mt-4 bg-slate-300 p-4 rounded-lg h-screen`}
        >
          {isLoading && !isError && !searchResult?.length && <Spinner />}
          {!isError && !isLoading && !searchResult?.length && (
            <p className="font-semibold">No results found</p>
          )}
          {isError && !isLoading && !searchResult?.length && (
            <p className="font-semibold">Error. Please try again!</p>
          )}
          {searchResult &&
            !isError &&
            !isLoading &&
            searchResult.map((result) => (
              <ListingResultCard cardData={result} key={result._id} />
            ))}
        </div>
      </div>
    </div>
  )
}

export default SearchListing

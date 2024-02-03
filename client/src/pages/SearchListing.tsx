import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { CreateListingFormData, SearchParams } from '../types'
import { useNavigate } from 'react-router-dom'
import ListingResultCard from '../components/ListingResultCard.tsx'
import Spinner from '../components/Spinner.tsx'

const SearchListing = () => {
  const navigate = useNavigate()

  const [searchParams, setSearchParams] = useState<SearchParams>({
    searchTerm: '',
    listingType: 'sale',
    furnished: false,
    parking: false,
    offer: false,
    sort: 'createdAt',
    order: 'desc',
  })
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isError, setIsError] = useState<boolean>(false)
  const [searchResult, setSearchResult] = useState<CreateListingFormData[]>()

  const urlParams = new URLSearchParams(location.search)
  const searchTermFromUrl = urlParams.get('searchTerm')
  const parkingFromUrl = urlParams.get('parking')
  const furnishedFromUrl = urlParams.get('furnished')
  const offerFromUrl = urlParams.get('offer')
  const listingTypeFromUrl = urlParams.get('listingType')
  const sortFromUrl = urlParams.get('sort')
  const orderFromUrl = urlParams.get('order')

  useEffect(() => {
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
        sort: sortFromUrl === 'createdAt' ? 'createdAt' : 'price',
        order: orderFromUrl === 'asc' ? 'asc' : 'desc',
      })
    }
    const fetchSearchListing = async () => {
      setIsLoading(true)
      const searchQuery = urlParams.toString()
      try {
        const res = await fetch(`/api/listing/searchListing?${searchQuery}`)
        const result = await res.json()
        setSearchResult(result.data)
      } catch (error) {
        console.log('error:', error)
        setIsError(true)
      } finally {
        setIsLoading(false)
      }
    }
    fetchSearchListing()
  }, [
    searchTermFromUrl,
    parkingFromUrl,
    furnishedFromUrl,
    offerFromUrl,
    listingTypeFromUrl,
    sortFromUrl,
    orderFromUrl,
    location.search,
  ])

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
      const sort = e.target.value.split('_')[0] as 'createdAt' | 'price'
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

    urlParams.set('searchTerm', searchParams.searchTerm)
    urlParams.set('parking', searchParams.parking.toString())
    urlParams.set('furnished', searchParams.furnished.toString())
    urlParams.set('offer', searchParams.offer.toString())
    urlParams.set('listingType', searchParams.listingType)
    urlParams.set('sort', searchParams.sort)
    urlParams.set('order', searchParams.order)

    const searchQuery = urlParams.toString()
    navigate(`/search?${searchQuery}`)
  }

  return (
    <div className="flex flex-col md:flex-row p-2 max-h-screen overflow-y-auto">
      <div className="border-b-2 md:border-r-2 md:border-b-0 p-4 h-screen">
        <form
          onSubmit={handleSubmit}
          // onKeyDown={(e) => {
          //   if (e.key === 'Enter') {
          //     handleSubmit
          //   }
          // }}
          className="flex flex-col gap-4 w-full sm:min-w-[380px] mt-20"
        >
          <div className="flex items-center gap-2">
            <label htmlFor="searchTerm" className="font-semibold">
              Search:
            </label>
            <input
              type="text"
              id="searchTerm"
              placeholder="Search..."
              className="border-2 border-slate-300 rounded-lg p-3 w-full"
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
              className="border-2 border-slate-300 rounded-lg p-2"
              onChange={handleChange}
              defaultValue={'createdAt_desc'}
            >
              <option value={'price_desc'}>Price high to low</option>
              <option value={'price_asc'}>Price low to high</option>
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
          className={
            isLoading || isError || !searchResult?.length
              ? 'flex items-center justify-center h-screen gap-4 mt-4 bg-slate-400 p-4 rounded-lg'
              : 'flex flex-wrap items-center justify-center md:justify-normal gap-4 mt-4 bg-slate-400 p-4 rounded-lg'
          }
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

export interface UserDataResponse {
  success: boolean
  statusCode: number
  message: string
  userData: FormData
}

export interface LoanDataTypes {
  downPayment: number
  insurance: number
  interest: number
  loanType: number
  propertyPrice: number
  taxes: number
  hoa: number
  rent: number
}

export interface FormData {
  username?: string
  email?: string
  _id?: string
  avatar?: string
  password?: string
}

export interface CreateListingFormData {
  listingType: 'sale' | 'rent'
  propertyType: 'apartment' | 'condo' | 'house' | 'multi family' | 'townhome'
  description: string
  address: string
  price: number
  bedrooms: number
  bathrooms: number
  parking: boolean
  furnished: boolean
  offer: boolean
  imageUrls: string[]
  userId: string
  _id?: string
}

export interface ListingDataResponse {
  success: boolean
  statusCode: number
  message: string
  data: CreateListingFormData[]
}

export interface SearchParams {
  searchTerm: string
  listingType: 'sale' | 'rent'
  furnished: boolean
  parking: boolean
  offer: boolean
  sort: 'createdAt' | 'price'
  order: 'desc' | 'asc'
}

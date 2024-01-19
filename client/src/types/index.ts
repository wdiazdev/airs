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
  type: string
  name: string
  description: string
  address: string
  price: number
  bedrooms: number
  bathrooms: number
  parking: boolean
  offer: boolean
  imageUrls: string[]
  userRef: string
}

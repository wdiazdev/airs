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

export interface IconTypes {
  width?: number
  stroke?: string
  color?: string
  height?: string
}

export interface FormData {
  username?: string
  email: string
  password: string
}

export interface UserDataResponse {
  success: boolean
  statusCode: number
  message: string
  userData: UserData
}

export interface UserData {
  username: string
  email: string
  _id: string
  avatar: string
}
export interface GoogleSignInData {
  username: string
  email: string
  avatar: string
}

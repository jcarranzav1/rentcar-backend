export interface PaymentInfo {
  amount: number
  carModel: string
  user: {
    name: string
    email: string
  }
  reservation: {
    startDate: Date
    endDate: Date
  }
}

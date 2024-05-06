export interface IUserInfo {
  userId: string
  jwt: string
  email: string
  refreshToken: string
  firstName: string
  lastName: string
  roles: string[]
  jwtExp: Date
}

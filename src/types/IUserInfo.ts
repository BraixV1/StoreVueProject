export interface IUserInfo {
  jwt: string
  email: string
  refreshToken: string
  firstName: string
  lastName: string
  roles: string[]
  jwtExp: Date
}

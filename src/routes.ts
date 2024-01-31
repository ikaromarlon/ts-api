import userRoutes from './modules/users/routes'
import { type AppRoute } from './utils/http'

export default [
  ...userRoutes
] as AppRoute[]

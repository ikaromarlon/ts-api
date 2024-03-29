export enum HttpStatus {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500
}

export interface AppRequest {
  headers: Record<string, any>
  params: Record<string, any>
  query: Record<string, any>
  body: any
}

export interface AppResponse {
  data: any
  status: HttpStatus
  headers: Record<string, any>
}

export interface AppController {
  handle: (request: AppRequest) => Promise<AppResponse>
}

export interface AppRoute {
  method: 'POST' | 'GET' | 'PUT' | 'PATCH' | 'DELETE'
  url: string
  handler: AppController
  schema?: Record<string, any>
}

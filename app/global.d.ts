declare namespace Express {
  export interface Request {
    user?: {
      id: string,
      internal_id: string,
      type_account: number,
      role: string
    }
  }
}

declare interface LooseObject {
  [key: string]: any
}

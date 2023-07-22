export interface User {
  id: string // This is socket id
  name: string
  roomName: string
}

export type Message = (
  | {
      type: 'text' | 'notification'
      data: string
    }
  | {
      type: 'image'
      data: CloudinaryImage[]
    }
) & {
  id: string
  sender: User
  createdAt: string
}

export interface Messages {
  [key: string]: Message[]
}

export type MessagePayload = (
  | {
      type: 'text' | 'notification'
      data: string
    }
  | {
      type: 'image'
      data: CloudinaryImage[]
    }
) & {
  senderId: string
  roomName: string
}

export interface CloudinaryImage {
  access_mode: string
  asset_id: string
  bytes: number
  created_at: string
  etag: string
  folder: string
  format: string
  height: number
  original_filename: string
  placeholder: boolean
  public_id: string
  resource_type: string
  secure_url: string
  signature: string
  tags: string[]
  type: string
  url: string
  version: number
  version_id: string
  width: number
}

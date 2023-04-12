export interface User {
  id: string // This is socket id
  name: string
  roomName: string
}

export type Message =
  | {
      id: string
      type: 'message' | 'notification'
      sender: User
      data: string
      createdAt: string
    }
  | {
      id: string
      type: 'image'
      sender: User
      data: CloudinaryImage[]
      createdAt: string
    }

export interface Messages {
  [key: string]: Message[]
}

export type MessagePayload =
  | {
      senderId: string
      roomName: string
      data: string
      type: 'message' | 'notification'
    }
  | {
      senderId: string
      roomName: string
      data: string[]
      type: 'image'
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

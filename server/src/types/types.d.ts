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
      data: string[]
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

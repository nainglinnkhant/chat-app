export interface Member {
  id: string
  name: string
}

export interface Message {
  id: string
  type: string
  sender: Member
  text: string
  createdAt: string
}
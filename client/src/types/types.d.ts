export interface Member {
  id: string
  name: string
}

export type Message = (
  | {
      type: 'message' | 'notification'
      data: string
    }
  | {
      type: 'image'
      data: CloudinaryImage[]
    }
) & {
  id: string
  sender: Member
  createdAt: string
}

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number
  color?: string
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

export interface Event {
  id: number
  category: string
  title: string
  description: string
  location: string
  date: string
  time: string
  petsAllowed: boolean
  organizer: Organizer
  images: string[]
}

export interface Organizer {
  id: number
  name: String
  images: string[]
  roles: string[]
}

export interface Participant {
  id: number
  name: string
  telNo: string

}


export interface MessageState {
  message: string
}

export interface EventState {
  event: Event | null
}

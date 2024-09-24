export interface Event {
  id: number
  category: string
  title: string
  description: string
  location: string
  date: string
  time: string
  petsAllowed: boolean
  // organizer: string
  organizer: Organizer
}

export interface Organizer {
  id: number
  // organizationName: string
  // address: string
  name: String
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

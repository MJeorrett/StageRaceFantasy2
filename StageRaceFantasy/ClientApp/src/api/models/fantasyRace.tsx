interface Core {
  name: string,
}

export interface CreateUpdateDto extends Core {
  fantasyTeamSize: number,
  startDate: Date,
  endDate: Date,
}

export interface Name extends Core {
  id: number,
}

export interface Summary extends Name {
  startDate: string,
  endDate: string,
}

export interface Details extends Summary {
  fantasyTeamSize: number,
}
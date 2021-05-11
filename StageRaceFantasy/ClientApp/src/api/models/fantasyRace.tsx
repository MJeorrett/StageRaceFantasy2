interface Core {
  name: string,
}

export interface CreateUpdateDto extends Core {
  fantasyTeamSize: number,
  startDate: Date,
  endDate: Date,
}

export interface Summary extends Core {
  id: number,
  startDate: string,
  endDate: string,
}

export interface Details extends Summary {
  fantasyTeamSize: number,
  startDate: string,
  endDate: string,
}
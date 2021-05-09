interface Core {
  name: string,
}

export interface CreateUpdateDto extends Core {
  fantasyTeamSize: number,
}

export interface Summary extends Core {
  id: number,
}

export interface Details extends Summary {
  fantasyTeamSize: number,
}
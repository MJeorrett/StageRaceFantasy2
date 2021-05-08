interface Core {
  name: string,
}

export interface CreateDto extends Core {
  fantasyTeamSize: number,
}

export interface Summary extends Core {
  id: number,
}
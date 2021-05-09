interface Core {
    name: string,
}

export interface Summary extends Core {
    id: number,
}

export interface Details extends Summary {
    fantasyTeamSize: number,
}
interface Core {
    name: string,
}

export interface Name extends Core {
    id: number,
}

export interface Summary extends Name {
    startDate: Date,
    endDate: Date,
}

export interface Details extends Summary {
    fantasyTeamSize: number,
}
interface Core {
    name: string,
    startDate: Date,
    endDate: Date,
}

export interface Summary extends Core {
    id: number,
}

export interface Details extends Summary {
    fantasyTeamSize: number,
}
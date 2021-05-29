interface Core {
    name: string,
}

export interface CreateUpdateDto extends Core {
    fantasyRaceId: number,
}

export interface Summary extends Core {
    id: number,
}

export type Details = Summary;
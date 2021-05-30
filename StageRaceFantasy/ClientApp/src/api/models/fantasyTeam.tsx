interface Core {
    name: string,
}

export interface CreateUpdateDto extends Core {
    raceId: number,
}

export interface Summary extends Core {
    id: number,
}

export type Details = Summary;
interface Core {
    name: string,
}

export interface CreateUpdateDto extends Core {
    fantasyRaceId: number,
}

export interface Summary extends Core {
    fantasyRaceName: string,
}
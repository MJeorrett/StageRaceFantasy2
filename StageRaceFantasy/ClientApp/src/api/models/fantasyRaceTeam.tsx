interface Core {
    name: string,
}

export interface CreateUpdateDto extends Core {
}

export interface Summary extends Core {
    id: number,
}
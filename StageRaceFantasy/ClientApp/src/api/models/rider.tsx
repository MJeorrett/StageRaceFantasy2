interface Core {
    firstName: string,
    lastName: string,
}

export interface Summary extends Core {
    id: number,
}

export type Details = Summary;

export type CreateUpdateDto = Core;

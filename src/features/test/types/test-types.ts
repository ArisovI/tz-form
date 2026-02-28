export type Tests = {
    id: number
}

export type Test = {
    id: number
}

export type TestBody = {
    context: string
    assignMode: string
    isRoutine: boolean
    routineName: string
    routineFrequency: string
    routineDescription: string
    executors: string[]
    deadlineDate: string
    deadlineTime: string
    theme: string
    tags: string[]
    files: string[] | null
}
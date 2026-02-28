import { api } from "../../../shared/api/api"
import type { Test, TestBody, Tests } from "../types/test-types"
import { participantOptions, teamOptions } from '../mock-data'
import { toaster } from "../../../components/ui/toaster"

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms))

export const testApi = {
    getTests: async () => {
        const { data } = await api<Tests[]>('/tests')

        return data
    },

    getTest: async ({ id }: { id: string | undefined }) => {
        const { data } = await api<Test>(`/tests/${id}`)

        return data
    },

    createTest: async ({ body }: { body: TestBody }) => {
        const { data } = await api.post('/tests', body)

        return data
    },

    editTest: async ({ id, body }: { id: string | undefined, body: TestBody }) => {
        const { data } = await api.put(`/tests/${id}`, body)

        return data
    },

    deleteTest: async ({ id }: { id: string }) => {
        const { data } = await api.delete(`/tests/${id}`)

        return data
    },

    searchExecutors: async (params: { query: string; mode: string }): Promise<{ value: string, label: string }[]> => {
        await delay(500)

        const source = params.mode === 'teams' ? teamOptions : participantOptions

        if (!params.query) return source

        return source.filter((opt) =>
            opt.label.toLowerCase().includes(params.query.toLowerCase())
        )
    },

    createTask: async ({ body }: { body: TestBody }) => {
        await delay(800)
        toaster.create({ title: 'Задача создана', description: JSON.stringify(body) })
    },

    editTask: async ({ body }: { body: TestBody }) => {
        await delay(800)
        toaster.create({ title: 'Задача обновлена', description: JSON.stringify(body) })
    },
}
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { testApi } from "../api/test-api"
import { toaster } from "../../../components/ui/toaster"
import type { Test, Tests } from "../types/test-types"
import { useState, useEffect } from "react"

export const useSearchExecutors = (search: string, mode: string) => {
    const [debouncedSearch, setDebouncedSearch] = useState(search)

    useEffect(() => {
        const timer = setTimeout(() => setDebouncedSearch(search), 300)
        return () => clearTimeout(timer)
    }, [search])

    return useQuery({
        queryKey: ['executors', debouncedSearch, mode],
        queryFn: () => testApi.searchExecutors({ query: debouncedSearch, mode }),
        placeholderData: (prev) => prev,
    })
}

export const useGetTests = () => {
    return useQuery<Tests[]>({
        queryKey: ['tests'],
        queryFn: testApi.getTests
    })
}

export const useGetTest = ({ id }: { id: string | undefined }) => {
    return useQuery<Test>({
        queryKey: ['tests', id],
        queryFn: () => testApi.getTest({ id })
    })
}

export const useCreateTest = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: testApi.createTask,
        onSuccess: () => {
            toaster.create({
                title: 'Успех',
                description: 'Задача успешно создана!',
                type: 'success'
            })
            queryClient.invalidateQueries({ queryKey: ['tests'] })
        },

        onError: (error) => {
            toaster.create({
                title: 'Ошибка',
                description: error instanceof Error ? error.message : 'Не удалось создать тест',
                type: 'error'
            })
        }
    })
}

export const useEditTest = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: testApi.editTest,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tests'] })
        },

        onError: (error) => {
            toaster.create({
                title: 'Ошибка',
                description: error ?? 'Не удалось обновить тест',
                type: 'error'
            })
        }
    })
}

export const useDeleteTest = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: testApi.deleteTest,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tests'] })
        },

        onError: (error) => {
            toaster.create({
                title: 'Ошибка',
                description: error ?? 'Не удалось удалить тест',
                type: 'error'
            })
        }
    })
}

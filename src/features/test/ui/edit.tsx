import { useParams } from "react-router-dom"
import { ErrorAlert } from "../../../shared/ui/error-alert"
import { useEditTest, useGetTest } from "../queries/test-queries"
import { TestForm } from "./form"
import type { TestBody } from "../types/test-types"
import { Spinner } from "@chakra-ui/react"

export const TestEdit = () => {
    const { id } = useParams()

    const { data, isLoading, isError, error, isSuccess } = useGetTest({ id })

    const { mutateAsync, isPending } = useEditTest()

    const submit = async (body: TestBody) => {
        try {
            await mutateAsync({ id, body })
        } catch (error) {
            return Promise.reject(error)
        }
    }

    return (
        <>
            {isError && <ErrorAlert message={error?.message} mt={'10px'} />}

            {isLoading && <Spinner />}

            {isSuccess && data !== null &&
                <TestForm
                    submit={submit}
                    loading={isPending}
                />
            }
        </>
    )
}
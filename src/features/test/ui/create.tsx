import { ErrorAlert } from "../../../shared/ui/error-alert"
import { useCreateTest } from "../queries/test-queries"
import type { TestBody } from "../types/test-types"
import { TestForm } from "./form"

export const TestCreate = () => {

  const { mutateAsync, isPending, error, isError } = useCreateTest()

  const submit = async (body: TestBody) => {
    try {
      await mutateAsync(body)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  return (
    <>
      {isError && <ErrorAlert message={error?.message} mt={'10px'} />}

      <TestForm submit={submit} loading={isPending} />
    </>
  )
}

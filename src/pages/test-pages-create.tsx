import { Stack } from "@chakra-ui/react"
import { TestCreate } from "../features/test/ui/create"
import { PageHead } from "../shared/ui"

const TestPagesCreate = () => {
    return (
        <Stack w="600px" m='auto' boxShadow="lg" >
            <PageHead title="Создание" />
            <TestCreate />
        </Stack>
    )
}

export default TestPagesCreate
import { Box, Text } from "@chakra-ui/react"
import type { FieldError } from "react-hook-form"

type Props = {
    label?: string
    required?: boolean
    error?: FieldError | string
    children: React.ReactNode
}

export const FormField = ({ label, required, error, children }: Props) => {
    return (
        <Box>
            {label && <Text fontSize="sm" fontWeight="500" color="gray.700" mb="1">
                {label}
                {required && (
                    <Text as="span" color="red.500" ml="1">
                        *
                    </Text>
                )}
            </Text>}
            {children}
            {error && <Text color="red.500" fontSize="sm" mt="1">
                {typeof error === 'string' ? error : error.message}
            </Text>}
        </Box>
    )
}

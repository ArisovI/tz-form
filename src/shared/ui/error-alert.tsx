import { Alert, type AlertRootProps } from "@chakra-ui/react"

interface ErrorAlertProps extends AlertRootProps {
    message: string
}

export const ErrorAlert = (props: ErrorAlertProps) => {
    const { message, ...otherProps } = props


    return (
        <Alert.Root status="error" title="Ошибка" w='90%' m='auto'  {...otherProps}>
            <Alert.Indicator />
            <Alert.Title>{message}</Alert.Title>
        </Alert.Root>
    )
}

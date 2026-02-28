import {
    Box,
    Button,
    FileUpload as FileUploadUI,
    Flex,
    Stack,
    Text,
    type FileUploadRootProps,
} from '@chakra-ui/react'
import { toaster } from '../../components/ui/toaster'

interface Props extends Omit<FileUploadRootProps, 'onChange'> {
    onChange: (files: File[] | null) => void
    maxSizeMb?: number
    description?: string
}

export const FileUpload = ({
    onChange,
    maxSizeMb = 5,
    description,
    accept = { 'image/png': ['.png'], 'image/jpeg': ['.jpg', '.jpeg'] },
    maxFiles = 5,
    ...uploadProps
}: Props) => {

    const acceptedTypes = Object.keys(accept).map(
        (type) => type.split('/')[1]
    )

    const defaultDescription = `Максимальный размер файла ${maxSizeMb} МБ | Формат ${acceptedTypes.join(', ')}`

    return (
        <FileUploadUI.Root
            maxFiles={maxFiles}
            accept={accept}
            onFileChange={(details) => {
                const validFiles: File[] = []

                details.acceptedFiles.forEach((file) => {
                    if (file.size > maxSizeMb * 1024 * 1024) {
                        toaster.create({
                            title: 'Файлы отклонены',
                            description: `Превышает ${maxSizeMb} МБ`,
                            type: 'error',
                        })
                    } else {
                        validFiles.push(file)
                    }
                })

                onChange(validFiles.length > 0 ? validFiles : null)
            }}
            {...uploadProps}
        >
            <FileUploadUI.Trigger asChild>
                <Button variant="outline" w="100%" py="8">
                    <Stack gap="-2">
                        <Text fontSize="sm" color="gray.500">
                            Нажмите чтобы выбрать файлы
                        </Text>
                        <Text fontSize="xs" color="gray.600">
                            {description || defaultDescription}
                        </Text>
                    </Stack>
                </Button>
            </FileUploadUI.Trigger>
            <FileUploadUI.ItemGroup>
                <FileUploadUI.Context>
                    {({ acceptedFiles }) =>
                        acceptedFiles.map((file) => (
                            <FileUploadUI.Item key={file.name} file={file}>
                                <Flex justify={'space-between'} w='100%'>
                                    <Box>
                                        <FileUploadUI.ItemName />
                                        <FileUploadUI.ItemSizeText />
                                    </Box>
                                    <FileUploadUI.ItemDeleteTrigger />
                                </Flex>
                            </FileUploadUI.Item>
                        ))
                    }
                </FileUploadUI.Context>
            </FileUploadUI.ItemGroup>
            <FileUploadUI.HiddenInput />
        </FileUploadUI.Root>
    )
}

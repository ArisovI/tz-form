import { useState, useMemo } from 'react'
import {
    Combobox,
    createListCollection,
    Portal,
    Spinner,
    Text,
    type ComboboxRootProps,
} from '@chakra-ui/react'


interface Props extends Omit<ComboboxRootProps, 'collection' | 'onValueChange' | 'onChange'> {
    options: {
        value: string
        label: string
    }[]
    value: string[]
    onChange: (value: string[]) => void
    isLoading?: boolean
    onSearchChange?: (query: string) => void
    clearable?: boolean
}

export const MultiSelect = ({
    options,
    value,
    onChange,
    isLoading = false,
    onSearchChange,
    clearable = false,
    ...comboboxProps
}: Props) => {
    const [inputValue, setInputValue] = useState('')

    const filteredOptions = useMemo(() => {
        if (onSearchChange) return options
        if (!inputValue) return options
        return options.filter((opt) =>
            opt.label.toLowerCase().includes(inputValue.toLowerCase())
        )
    }, [options, inputValue, onSearchChange])

    const collection = useMemo(
        () => createListCollection({ items: options }),
        [options]
    )

    const hasValue = value?.length > 0

    return (
        <Combobox.Root
            multiple
            collection={collection}
            value={value}
            onValueChange={(e) => onChange(e.value)}
            inputValue={inputValue}
            onInputValueChange={(e) => {
                setInputValue(e.inputValue)
                onSearchChange?.(e.inputValue)
            }}
            openOnClick
            closeOnSelect={false}
            {...comboboxProps}

        >

            <Combobox.Control >
                <Combobox.Input
                    borderColor="gray.200"
                    borderRadius="lg"
                    fontSize="sm"
                    placeholder={hasValue ? value.map((v) => options.find((o) => o.value === v)?.label ?? v).join(', ') : comboboxProps.placeholder}
                    _placeholder={{
                        color: hasValue ? 'inherit' : 'gray.500',
                        opacity: 1
                    }}
                />
                {clearable && (
                    <Combobox.IndicatorGroup>
                        {hasValue ? (
                            <Combobox.ClearTrigger />
                        ) : (
                            <Combobox.Trigger />
                        )}
                    </Combobox.IndicatorGroup>
                )}
            </Combobox.Control>

            <Portal>
                <Combobox.Positioner>
                    <Combobox.Content >
                        {isLoading ? (
                            <Combobox.Empty>
                                <Spinner size="sm" /> Загрузка...
                            </Combobox.Empty>
                        ) : filteredOptions.length === 0 ? (
                            <Combobox.Empty>
                                <Text fontSize="sm" color="gray.500">
                                    Ничего не найдено
                                </Text>
                            </Combobox.Empty>
                        ) : (
                            filteredOptions.map((opt) => (
                                <Combobox.Item key={opt.value} item={opt}>
                                    {opt.label}
                                    <Combobox.ItemIndicator />
                                </Combobox.Item>
                            ))
                        )}
                    </Combobox.Content>
                </Combobox.Positioner>
            </Portal>
        </Combobox.Root>
    )
}

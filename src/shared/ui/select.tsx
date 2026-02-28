import {
    createListCollection,
    Portal,
    Select as SelectUI,
    type SelectRootProps,
} from '@chakra-ui/react'
import { useMemo } from 'react'

interface Props extends Omit<SelectRootProps, 'collection' | 'onValueChange' | 'onChange' | 'value'> {
    options: { value: string, label: string }[]
    value: string | string[]
    onChange: (value: string | string[]) => void
    placeholder?: string
    clearable?: boolean
}

export const Select = ({
    options,
    value,
    onChange,
    placeholder,
    clearable = false,
    multiple,
    ...selectProps
}: Props) => {

    const collection = useMemo(
        () => createListCollection({ items: options }),
        [options]
    )

    const selectValue = multiple
        ? (value as string[]) || []
        : value ? [value as string] : []

    const hasValue = multiple
        ? (value as string[])?.length > 0
        : !!value

    return (
        <SelectUI.Root
            collection={collection}
            multiple={multiple}
            value={selectValue}
            onValueChange={(e) =>
                onChange(multiple ? e.value : e.value[0])
            }
            {...selectProps}
        >
            <SelectUI.Control>
                <SelectUI.Trigger
                    borderColor="gray.200"
                    borderRadius="lg"
                    fontSize="sm"
                >
                    <SelectUI.ValueText placeholder={placeholder} />
                </SelectUI.Trigger>
                {clearable ? (
                    <SelectUI.IndicatorGroup>
                        {hasValue ? (
                            <SelectUI.ClearTrigger />
                        ) : (
                            <SelectUI.Indicator />
                        )}
                    </SelectUI.IndicatorGroup>
                ) : null}
            </SelectUI.Control>
            <Portal>
                <SelectUI.Positioner>
                    <SelectUI.Content borderRadius="lg" fontSize="sm">
                        {options.map((opt) => (
                            <SelectUI.Item key={opt.value} item={opt}>
                                {opt.label}
                                <SelectUI.ItemIndicator />
                            </SelectUI.Item>
                        ))}
                    </SelectUI.Content>
                </SelectUI.Positioner>
            </Portal>
        </SelectUI.Root>
    )
}

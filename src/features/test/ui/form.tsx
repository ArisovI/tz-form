import {
  Box,
  Button,
  Checkbox,
  Flex,
  HStack,
  Input,
  RadioGroup,
  Stack,
  Tabs,
  Text,
  Textarea,
} from '@chakra-ui/react'
import type { TestBody } from '../types/test-types'
import { Controller, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { FormField, MultiSelect, Select, FileUpload } from '../../../shared/ui'
import { useSearchExecutors } from '../queries/test-queries'
import { useState } from 'react'
import { routineFrequencyOptions, tagOptions, themeOptions } from '../mock-data'

type Props = {
  submit: (body: TestBody) => Promise<unknown>
  initialValues?: TestBody
  loading: boolean
}

const INITIAL_VALUES: TestBody = {
  context: '',
  assignMode: 'participants',
  isRoutine: false,
  routineName: '',
  routineFrequency: '',
  routineDescription: '',
  executors: [],
  tags: [],
  files: [],
  theme: '',
  deadlineDate: '',
  deadlineTime: '',
}

export const TestForm = ({ submit, initialValues = INITIAL_VALUES, loading }: Props) => {
  const navigate = useNavigate()
  const [executorSearch, setExecutorSearch] = useState('')

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<TestBody>({
    defaultValues: initialValues
  })

  const onSubmit = async (values: TestBody) => {
    try {
      await submit(values).then(() => {
        navigate(-1)
        reset()
      })
    } catch (error) {
      return Promise.reject(error)
    }
  }

  const isRoutine = watch('isRoutine')
  const assignMode = watch('assignMode')

  const { data: executorData, isLoading: executorsLoading } = useSearchExecutors(executorSearch, assignMode)

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box >
        <Tabs.Root defaultValue="create" variant="line" colorPalette="purple" px="6" pt="4">
          <Tabs.List borderBottom="1px solid" borderColor="gray.100">
            <Tabs.Trigger
              value="create"
              fontSize="sm"
              fontWeight="600"
              _selected={{ color: '#7C3AED', borderColor: '#7C3AED' }}
            >
              Создание задач
            </Tabs.Trigger>
            <Tabs.Trigger
              value="report"
              fontSize="sm"
              fontWeight="600"
              _selected={{ color: '#7C3AED', borderColor: '#7C3AED' }}
            >
              Создание отчетности
            </Tabs.Trigger>
          </Tabs.List>
        </Tabs.Root>

        <Box p="6">
          <Stack gap="5">
            <FormField label="Контекст задачи" required error={errors.context}>
              <Controller
                name="context"
                control={control}
                rules={{ required: 'Обязательное поле' }}
                render={({ field }) => (
                  <Textarea
                    placeholder="Выполнить какую-нибудь задачу"
                    rows={4}
                    autoresize
                    {...field}
                  />
                )}
              />
            </FormField>

            <Flex align="end" justify="space-between">
              <Box>
                <FormField label="Назначить на команду">
                  <Controller
                    name="assignMode"
                    control={control}
                    render={({ field }) => (
                      <RadioGroup.Root
                        value={field.value}
                        onValueChange={(e) => {
                          field.onChange(e.value)
                          setValue('executors', [])
                        }}
                        colorPalette="purple"
                      >
                        <HStack gap="5">
                          <RadioGroup.Item value="participants">
                            <RadioGroup.ItemHiddenInput />
                            <RadioGroup.ItemIndicator />
                            <RadioGroup.ItemText fontSize="sm">
                              Участники
                            </RadioGroup.ItemText>
                          </RadioGroup.Item>
                          <RadioGroup.Item value="teams">
                            <RadioGroup.ItemHiddenInput />
                            <RadioGroup.ItemIndicator />
                            <RadioGroup.ItemText fontSize="sm">
                              Команды
                            </RadioGroup.ItemText>
                          </RadioGroup.Item>
                        </HStack>
                      </RadioGroup.Root>
                    )}
                  />
                </FormField>
              </Box>

              <Controller
                name="isRoutine"
                control={control}
                render={({ field }) => (
                  <Checkbox.Root
                    checked={field.value}
                    onCheckedChange={(e) => {
                      field.onChange(!!e.checked)
                      if (e.checked) {
                        setValue('routineName', '')
                        setValue('routineFrequency', '')
                        setValue('routineDescription', '')
                      }
                    }}
                    colorPalette="purple"
                    cursor="pointer"
                  >
                    <Checkbox.HiddenInput />
                    <Checkbox.Control
                      _checked={{ bg: '#7C3AED', borderColor: '#7C3AED' }}
                    >
                      <Checkbox.Indicator />
                    </Checkbox.Control>
                    <Checkbox.Label fontSize="sm" fontWeight="500">
                      Рутинная задача
                    </Checkbox.Label>
                  </Checkbox.Root>
                )}
              />
            </Flex>

            {watch('isRoutine') && (
              <Box
                p="4"
                border="1px solid"
                borderColor="purple.200"
                borderRadius="xl"
                bg="purple.50"
              >
                <Text fontWeight="600" color="purple.700" mb="3">
                  Ежедневная задача
                </Text>
                <Stack gap="3">
                  <FormField label="Название рутинной задачи" required error={errors.routineName}>
                    <Controller
                      name="routineName"
                      control={control}
                      rules={{ required: isRoutine && 'Обязательное поле' }}
                      render={({ field }) => (
                        <Input placeholder="Введите название" {...field} />
                      )}
                    />
                  </FormField>

                  <FormField label="Периодичность" required error={errors.routineFrequency}>
                    <Controller
                      name="routineFrequency"
                      control={control}
                      rules={{ required: isRoutine && 'Обязательное поле' }}
                      render={({ field }) => (
                        <Select
                          options={routineFrequencyOptions}
                          value={field.value}
                          onChange={field.onChange}
                          placeholder="Выберите периодичность"
                        />
                      )}
                    />
                  </FormField>

                  <FormField label="Описание рутинной задачи" required error={errors.routineDescription}>
                    <Controller
                      name="routineDescription"
                      control={control}
                      rules={{ required: isRoutine && 'Обязательное поле' }}
                      render={({ field }) => (
                        <Textarea placeholder="Описание..." rows={4} autoresize {...field} />
                      )}
                    />
                  </FormField>
                </Stack>
              </Box>
            )}

            <FormField
              label="Исполнители задачи"
              required
              error={errors.executors?.message}
            >
              <Controller
                name="executors"
                control={control}
                rules={{ validate: (v) => v?.length > 0 || 'Обязательное поле' }}
                render={({ field }) => (
                  <MultiSelect
                    options={executorData ?? []}
                    value={field.value || []}
                    onChange={field.onChange}
                    placeholder="Выберите исполнителей"
                    onSearchChange={setExecutorSearch}
                    isLoading={executorsLoading}
                    clearable
                  />
                )}
              />
            </FormField>

            <HStack gap="3" align="start">
              <FormField label="Дата" required error={errors.deadlineDate}>
                <Controller
                  name="deadlineDate"
                  control={control}
                  rules={{ required: 'Обязательное поле' }}
                  render={({ field }) => (
                    <Input type="date" {...field} />
                  )}
                />
              </FormField>
              <FormField label="Время" required error={errors.deadlineTime}>
                <Controller
                  name="deadlineTime"
                  control={control}
                  rules={{ required: 'Обязательное поле' }}
                  render={({ field }) => (
                    <Input type="time" {...field} />
                  )}
                />
              </FormField>
            </HStack>

            <FormField label="Указать тему" required error={errors.theme}>
              <Controller
                name="theme"
                control={control}
                rules={{ required: 'Обязательное поле' }}
                render={({ field }) => (
                  <Select
                    options={themeOptions}
                    value={field.value}
                    onChange={(v) => field.onChange(v)}
                    placeholder="Выберите тему"
                    clearable
                  />
                )}
              />
            </FormField>

            <FormField label="Теги" required error={errors.tags?.message}>
              <Controller
                name="tags"
                control={control}
                rules={{ required: 'Обязательное поле' }}
                render={({ field }) => (
                  <Select
                    options={tagOptions}
                    value={field.value || []}
                    onChange={(v) => field.onChange(v)}
                    placeholder="Выберите теги"
                    multiple
                    clearable
                  />
                )}
              />
            </FormField>

            <FormField label="Прикрепление файлов" required error={errors.files?.message}>
              <Controller
                name="files"
                control={control}
                rules={{ required: 'Обязательное поле' }}
                render={({ field: { onChange } }) => (
                  <FileUpload onChange={onChange} />
                )}
              />
            </FormField>

            <HStack gap="3" pt="2" justify="flex-end">
              <Button variant="outline" onClick={() => navigate(-1)}>
                Отмена
              </Button>
              <Button type="submit" loading={loading} >
                Создать задачу
              </Button>
            </HStack>
          </Stack>
        </Box>
      </Box>
    </form>
  )
}

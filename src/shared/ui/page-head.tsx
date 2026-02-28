import { Box, Flex, HStack, Text } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"

type Props = {
  title: string
}

export const PageHead = ({ title }: Props) => {
  const navigate = useNavigate()

  return (
    <Flex
      align="center"
      justify="space-between"
      px="6"
      py="4"
      borderBottom="1px solid"
      borderColor="gray.100"
    >
      <HStack gap="2">
        <Box
          w="8"
          h="8"
          borderRadius="lg"
          bg="#7C3AED"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Text color="white" fontSize="sm" fontWeight="bold">
            ✦
          </Text>
        </Box>
        <Text fontSize="lg" fontWeight="700" color="gray.800">
          {title}
        </Text>
      </HStack>
      <Box
        cursor="pointer"
        p="1"
        borderRadius="md"
        _hover={{ bg: 'gray.100' }}
        onClick={() => navigate(-1)}
      >
        <Text color="gray.400" fontSize="lg">
          ✕
        </Text>
      </Box>
    </Flex>
  )
}

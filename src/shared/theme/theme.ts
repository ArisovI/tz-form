import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react"

const focusStyles = {
    borderColor: "#7C3AED",
    boxShadow: "0 0 0 1px #7C3AED",
}

const config = defineConfig({
    theme: {
        tokens: {
            colors: {
                purple: {
                    50: { value: "#F5F3FF" },
                    100: { value: "#EDE9FE" },
                    500: { value: "#7C3AED" },
                    600: { value: "#6D28D9" },
                    700: { value: "#5B21B6" },
                },
            },
        },
        recipes: {
            textarea: {
                base: {
                    borderColor: "gray.200",
                    borderRadius: "lg",
                    fontSize: "sm",
                    _focus: focusStyles,
                },
            },
            input: {
                base: {
                    borderColor: "gray.200",
                    borderRadius: "lg",
                    fontSize: "sm",
                    _focus: focusStyles,
                },
            },
            button: {
                base: {
                    borderRadius: "xl",
                    fontWeight: "600",
                    fontSize: "sm",
                },
            },
        },
    },
})

export const theme = createSystem(defaultConfig, config)

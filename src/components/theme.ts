import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

export const theme = createSystem(defaultConfig, defineConfig({
    theme: {
        tokens: {
            colors: {
                primary: {value: "#899fe0"},
                secondary: {},
                accent: {},
            },
        },

        semanticTokens: {
            colors: {
                text: {
                    primary: { value: { _light: "#000000ff", _dark: "#ffffffff" } },
                    todoCompleted: { value: { _light: "#b0aeaeff", _dark: "#888888ff" } },
                    inverted: { value: { _light: "{colors.white}", _dark: "{colors.black}" } }} ,
                bg: {
                    canvas: { value: {_light: "#ffededff", _dark: "#0c0d14ff"}},
                    surface: { value: {_light: "#ffefefff", _dark: "#0c0d14ff"}},
                    muted: { value: {_light: "#fff7f7ff", _dark: "#0f1017ff"}},
                }   
            } 
        }
    }
}))
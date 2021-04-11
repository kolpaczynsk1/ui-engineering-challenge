export default function useTheme() {
    const createTheme = (theme) => {
        initTheme({
            "--select-primary": theme['primary'],
            "--select-secondary": theme['secondary'],
            "--select-background-primary": theme['background-primary'],
            "--select-background-secondary": theme['background-secondary'],
            "--select-text-primary": theme['text-primary'],
            "--select-text-secondary": theme['text-secondary']
        })
    }

    const documentEl = document.documentElement;
    const initTheme = (theme) => {
        for(let [key, value] of Object.entries(theme))
            documentEl.style.setProperty(encodeURI(key), encodeURI(value));
    }

    return {
        createTheme,
        initTheme
    }
}
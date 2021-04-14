export default function useTheme() {
    const setTheme = (theme) => {
        document.body.setAttribute('data-theme', decodeURIComponent(theme));
    }

    return {
        setTheme
    }
}
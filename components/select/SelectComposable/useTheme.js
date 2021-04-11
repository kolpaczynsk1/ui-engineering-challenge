export default function useTheme() {
    const documentEl = document.body;
    const setTheme = (theme) => {
        document.body.setAttribute('data-theme', decodeURI(theme));
    }

    return {
        setTheme
    }
}
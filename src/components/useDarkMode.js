import { useState, useEffect } from 'react'

const useDarkMode = () => {
    const [ mode, setMode ] = useState('light')

    const toggleMode = () => {
        mode === 'dark' ? setMode('light') : setMode('dark')
    }

    useEffect(() => {
        const localTheme = localStorage.getItem('theme')
        if (localTheme) {
            const theme = localTheme === 'dark' ? 'dark' : 'light'
            setMode(theme)
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('theme', mode)
    }, [mode])

    return [ mode, toggleMode ]
}
 
export default useDarkMode;
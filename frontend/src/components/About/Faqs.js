import React, { useEffect } from 'react'
import { useTheme } from '../../context/ThemeProvider'

const Faqs = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { darkMode } = useTheme();

  return (
    <div>Faqs</div>
  )
}

export default Faqs
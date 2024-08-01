import React, { useCallback, useEffect, useMemo } from 'react'
import { LocaleContext } from './context'
import nProgress from 'nprogress'
import { useLocation } from 'react-router'
import { I18nextProvider, initReactI18next } from 'react-i18next'
import i18next from 'i18next'
type LocaleProviderProps = {
  locale: string
  messages: {}
  children: React.ReactNode
}

const LocaleProvider: React.FC<LocaleProviderProps> = ({ locale: l, messages: m, children }) => {
  i18next.use(initReactI18next).init({
    interpolation: { escapeValue: false }, // React already does escaping
    lng: l,
    resources: {
      [l]: {
        translation: m,
      },
    },
  })

  const onChangeLocale = useCallback(() => {}, [])

  const value = useMemo(() => {
    return {
      onChangeLocale,
    }
  }, [onChangeLocale])

  const location = useLocation()
  const pathname = location.pathname

  useEffect(() => {
    nProgress.done()
  }, [pathname, location.search])

  return (
    <LocaleContext.Provider value={value}>
      <I18nextProvider i18n={i18next}>{children}</I18nextProvider>
    </LocaleContext.Provider>
  )
}

export default LocaleProvider

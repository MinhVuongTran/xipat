import PageAnimation from '@components/animation/page'
import SettingFormContainer from '@containers/settings'
import React from 'react'

type SettingPageProps = {}

const SettingPage: React.FC<React.PropsWithChildren<SettingPageProps>> = () => {
  return (
    <PageAnimation>
      <SettingFormContainer />
    </PageAnimation>
  )
}

export default SettingPage

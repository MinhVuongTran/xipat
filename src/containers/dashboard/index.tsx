import React, { useState } from 'react'
import { Container } from './styles'
import LineChart from './components/line-chart'
import BarChart from './components/bar-chart'
import { Radio, RadioChangeEvent } from 'antd'

type DashboardContainerProps = {}

enum CHART_TYPE {
  LINE_CHART = 1,
  BAR_CHART = 2,
}

const options = [
  { label: 'Subscription', value: CHART_TYPE.LINE_CHART },
  { label: 'Revenue', value: CHART_TYPE.BAR_CHART },
]

const DashboardContainer: React.FC<React.PropsWithChildren<DashboardContainerProps>> = () => {
  const [chart, setChart] = useState<CHART_TYPE>(CHART_TYPE.LINE_CHART)

  const onChange = ({ target: { value } }: RadioChangeEvent) => {
    setChart(value)
  }

  return (
    <Container>
      <Radio.Group
        options={options}
        onChange={onChange}
        value={chart}
        optionType="button"
        buttonStyle="solid"
        style={{ marginBottom: '1rem' }}
      />
      {chart === CHART_TYPE.LINE_CHART ? <LineChart /> : null}
      {chart === CHART_TYPE.BAR_CHART ? <BarChart /> : null}
    </Container>
  )
}

export default DashboardContainer

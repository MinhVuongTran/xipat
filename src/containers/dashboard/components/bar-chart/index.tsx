import React, { HTMLProps, useCallback, useEffect, useRef } from 'react'
import styled from 'styled-components'
import * as echarts from 'echarts'
import { debounce } from 'lodash'
import dateTime from '@commons/datetime'
import { DD_MM_YYYY } from '@commons/datetime/format'

type BarChartProps = {} & HTMLProps<HTMLDivElement>

const ChartDiv = styled.div`
  width: 100%;
  height: 35rem;
`

const BarChart: React.FC<React.PropsWithChildren<BarChartProps>> = ({ ...p }) => {
  const ref = useRef<HTMLDivElement>(null)
  const chart = useRef<echarts.ECharts>()

  const getLast7Days = useCallback(() => {
    const days = []
    const today = dateTime()

    for (let i = 6; i >= 0; i--) {
      const pastDay = today.subtract(i, 'day')
      days.push(pastDay.format(DD_MM_YYYY))
    }

    return days
  }, [])

  useEffect(() => {
    const initChart = () => {
      chart.current = echarts.init(ref.current, 'macarons')
      chart.current.setOption({
        backgroundColor: '#fff',
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        xAxis: {
          type: 'category',
          data: getLast7Days(),
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            data: [120, 200, 150, 80, 70, 110, 130],
            type: 'bar',
          },
        ],
      })
    }

    debounce(initChart, 300)()

    return () => {
      chart.current?.dispose()
    }
  }, [])

  return <ChartDiv {...p} ref={ref} />
}

export default BarChart

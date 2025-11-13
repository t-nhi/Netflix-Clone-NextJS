'use client'

import { useEffect, useState } from 'react'
import { CartesianGrid, Line, LineChart, XAxis } from 'recharts'
import { Card, CardContent } from '@/components/ui/card'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { formatNumber } from '@/utils/formatting/formatNumber'
import { cn } from '@/lib/utils'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Calendar } from '@/components/ui/calendar'
import { Button } from '@/components/ui/button'
import { format } from 'date-fns'
import { getMockChartData } from '@/app/[locale]/admin/dashboard/_mock/chart.mock'

const chartConfigKeys = ['watching_view', 'favorite_count'] as const
type ChartKeys = (typeof chartConfigKeys)[number]

export default function DirectorLineChart() {
    const today = new Date()
    const [mockChartData, setMockChartData] = useState<any[]>([])
    useEffect(() => {
        setMockChartData(getMockChartData(30, today))
    }, [])
    const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
        from: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 6),
        to: today
    })

    const fromDate = dateRange.from ? format(dateRange.from, 'yyyy-MM-dd') : ''
    const toDate = dateRange.to ? format(dateRange.to, 'yyyy-MM-dd') : ''

    const [activeChart, setActiveChart] = useState<ChartKeys>('watching_view')
    const [selectedGenre, setSelectedGenre] = useState<string>('All')

    const chartConfig = {
        watching_view: { label: 'Watching Views', color: '#0036D9' },
        favorite_count: { label: 'Favorite Counts', color: '#0036D9' }
    }

    const total = {
        watching_view: mockChartData.reduce((sum, item) => sum + item.watching_view, 0),
        favorite_count: mockChartData.reduce((sum, item) => sum + item.favorite_count, 0)
    }

    const chartData = mockChartData.filter((item) => item.date >= fromDate && item.date <= toDate)

    return (
        <>
            <div className='flex gap-4 items-center mb-4'>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button variant='outline' className='w-[250px] text-left'>
                            {fromDate && toDate ? `${fromDate} → ${toDate}` : 'Select date range'}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className='w-auto p-0'>
                        <Calendar
                            mode='range'
                            selected={dateRange}
                            onSelect={(range) =>
                                setDateRange({
                                    from: range?.from || undefined,
                                    to: range?.to || undefined
                                })
                            }
                        />
                    </PopoverContent>
                </Popover>

                <div className='ml-auto'>
                    <Select value={selectedGenre} onValueChange={(value) => setSelectedGenre(value)}>
                        <SelectTrigger className='w-[150px] font-semibold'>
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value='All'>All</SelectItem>
                            <SelectItem value='Action'>Action</SelectItem>
                            <SelectItem value='Comedy'>Comedy</SelectItem>
                            <SelectItem value='Drama'>Drama</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <Card className='rounded-[20px] overflow-hidden'>
                <div className='flex w-full border-b -mt-6'>
                    {chartConfigKeys.map((key) => (
                        <button
                            key={key}
                            data-active={activeChart === key}
                            className={cn(
                                'flex flex-1 justify-center gap-1 px-6 py-4 border-r last:border-r-0 border-t-4 border-t-transparent',
                                { 'border-t-[#0036D9]': activeChart === key }
                            )}
                            onClick={() => setActiveChart(key)}
                        >
                            <div className='text-center'>
                                <p className='font-semibold'>{chartConfig[key].label}</p>
                                <p className='font-bold text-lg'>{formatNumber.format(total[key])}</p>
                            </div>
                        </button>
                    ))}
                </div>

                <CardContent className='pt-4 pb-0'>
                    <ChartContainer className='h-80 w-full' config={chartConfig}>
                        <LineChart data={chartData} margin={{ top: 20, left: 12, right: 12, bottom: 12 }}>
                            <CartesianGrid vertical={false} />
                            <XAxis dataKey='date' tickLine={false} axisLine={false} tickMargin={8} />

                            <ChartTooltip
                                cursor={false}
                                content={
                                    <ChartTooltipContent
                                        labelFormatter={(label) => {
                                            return (
                                                <>
                                                    <p className='font-medium'>{label}</p>
                                                    <span>{chartConfig[activeChart].label}</span>
                                                </>
                                            )
                                        }}
                                        formatter={(value: number) => formatNumber.format(value)}
                                    />
                                }
                            />

                            <Line
                                type='monotone'
                                dataKey={activeChart}
                                stroke={chartConfig[activeChart].color}
                                strokeWidth={2}
                                dot={false}
                            />
                            {/* <ChartArea /> */}
                        </LineChart>
                    </ChartContainer>
                </CardContent>
            </Card>
        </>
    )
}

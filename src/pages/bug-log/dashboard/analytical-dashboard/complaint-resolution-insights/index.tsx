import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"
import { Link } from "react-router-dom"

export const description = "A bar chart"



const chartConfig = {
  count: {
    label: "Complaints Count",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

export default function index({dashboardData}:any) {
    
      
  return (
    <Card className="h-[370px]">
      <CardHeader>
       <div className="flex justify-between">
        <div> <CardTitle>Grievance Resolution Insights</CardTitle></div>
        <div><Link to={'/bug-log/dashboard/resolution-days-reports'}><Button size={'sm'} variant={'secondary'}>Explore <ChevronRight size={15} className="inline" /></Button></Link></div>
       </div>
        <CardDescription>FY : 2024 - 2025</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={dashboardData?.resolveTimeCounts}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="_id"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 6)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="count" fill="var(--color-count)" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

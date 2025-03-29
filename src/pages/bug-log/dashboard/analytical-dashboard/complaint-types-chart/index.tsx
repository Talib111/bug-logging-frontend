import { Label, Pie, PieChart } from "recharts"

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
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"

export const description = "A donut chart with text"
const chartConfig = {
  complaints: {
    label: "Grievances",
  },
  chrome: {
    label: "Received",
    color: "hsl(var(--chart-1))",
  },
  safari: {
    label: "Resolved",
    color: "hsl(var(--chart-2))",
  },
  firefox: {
    label: "Rejected",
    color: "hsl(var(--chart-3))",
  },
  edge: {
    label: "Pending",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig

export default function ComplaintTypeChart({ dashboardData }: any) {


  const donutchartData = [
    { browser: "chrome", complaints: dashboardData?.grievanceReceived, fill: "var(--color-chrome)" },
    { browser: "safari", complaints: dashboardData?.grievanceResolved, fill: "var(--color-safari)" },
    { browser: "firefox", complaints: dashboardData?.grievanceReject, fill: "var(--color-firefox)" },
    { browser: "edge", complaints: dashboardData?.grievancePending, fill: "var(--color-edge)" },
  ]


  return (
    <Card className="flex flex-col h-[370px]">
      <CardHeader className="items-center pb-0">
        <div className="flex justify-between space-x-4 items-center">
          <div> <CardTitle>Category Wise Grievances</CardTitle></div>
          <div><Link to={'/bug-log/dashboard/bug-log-sla-reports'}><Button size={'sm'} variant={'secondary'}>Explore <ChevronRight size={15} className="inline" /></Button></Link></div>
        </div>

        <CardDescription>Fy : 2024-2025</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={donutchartData}
              dataKey="complaints"
              nameKey="browser"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {dashboardData?.grievanceReceived.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Complaints
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

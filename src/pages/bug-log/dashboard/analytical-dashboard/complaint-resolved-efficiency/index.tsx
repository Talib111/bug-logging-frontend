import { LabelList, Pie, PieChart } from "recharts"

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

export const description = "A pie chart with a label list"


// const chartConfig = {
//   complaintEfficiency: {
//     label: "Grievance Efficiency",
//   },
//   pending: {
//     label: "Pending",
//     color: "hsl(var(--chart-1))",
//   },
//   resolved: {
//     label: "Resolved",
//     color: "hsl(var(--chart-2))",
//   },

// } satisfies ChartConfig

export default function ComplaintResolvedEfficiency({ dashboardData }: any) {

  const findPercent = (count: number) => {
    let total = parseInt(dashboardData?.grievanceReceived)
    let per: number = (count * 100) / total
    return parseFloat(per.toFixed(2))
  }

  const chartConfig = {
    complaintEfficiency: {
      label: "Grievance Efficiency ",
    },
    pending: {
      label: `Pending ${findPercent(dashboardData?.grievancePending)}%`,
      color: "hsl(var(--chart-1))",
    },
    resolved: {
      label: `Resolved ${findPercent(dashboardData?.grievanceResolved)}%`,
      color: "hsl(var(--chart-2))",
    },

  } satisfies ChartConfig

  const chartData = [
    { browser: "pending", complaintEfficiency: findPercent(dashboardData?.grievancePending), fill: "var(--color-pending)" },
    { browser: "resolved", complaintEfficiency: findPercent(dashboardData?.grievanceResolved), fill: "var(--color-resolved)" },
  ]
  // const chartData = [
  //   { browser: "pending", complaintEfficiency: dashboardData?.grievancePending, fill: "var(--color-pending)" },
  //   { browser: "resolved", complaintEfficiency: dashboardData?.grievanceResolved, fill: "var(--color-resolved)" },
  // ]

  return (
    <Card className="flex flex-col h-[370px]">
      <CardHeader className="items-center pb-0">
        <CardTitle>Grievance Resolved Efficiency</CardTitle>
        <CardDescription>FY : 2024 - 2025</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              content={<ChartTooltipContent nameKey="complaintEfficiency" hideLabel />}
            />
            <Pie data={chartData} dataKey="complaintEfficiency">
              <LabelList
                dataKey="browser"
                className="fill-background"
                stroke="none"
                fontSize={12}
                formatter={(value: keyof typeof chartConfig) =>
                  chartConfig[value]?.label
                }
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

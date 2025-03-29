// import { CartesianGrid, Line, LineChart, XAxis } from "recharts"
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card"
// import {
//   ChartConfig,
//   ChartContainer,
//   ChartTooltip,
//   ChartTooltipContent,
// } from "@/components/ui/chart"
// import { TrendingUp } from "lucide-react"
// const chartData = [
//   { month: "January", desktop: 186, mobile: 80 },
//   { month: "February", desktop: 305, mobile: 200 },
//   { month: "March", desktop: 237, mobile: 120 },
//   { month: "April", desktop: 73, mobile: 190 },
//   { month: "May", desktop: 209, mobile: 130 },
//   { month: "June", desktop: 214, mobile: 140 },
// ]
// const chartConfig = {
//   desktop: {
//     label: "Desktop",
//     color: "hsl(var(--chart-1))",
//   },
//   mobile: {
//     label: "Mobile",
//     color: "hsl(var(--chart-2))",
//   },
// } satisfies ChartConfig
// export default function Component() {
//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>Line Chart - Multiple</CardTitle>
//         <CardDescription>January - June 2024</CardDescription>
//       </CardHeader>
//       <CardContent>
//         <ChartContainer config={chartConfig}>
//           <LineChart
//             accessibilityLayer
//             data={chartData}
//             margin={{
//               left: 12,
//               right: 12,
//             }}
//           >
//             <CartesianGrid vertical={false} />
//             <XAxis
//               dataKey="month"
//               tickLine={false}
//               axisLine={false}
//               tickMargin={8}
//               tickFormatter={(value) => value.slice(0, 3)}
//             />
//             <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
//             <Line
//               dataKey="desktop"
//               type="monotone"
//               stroke="var(--color-desktop)"
//               strokeWidth={2}
//               dot={false}
//             />
//             <Line
//               dataKey="mobile"
//               type="monotone"
//               stroke="var(--color-mobile)"
//               strokeWidth={2}
//               dot={false}
//             />
//           </LineChart>
//         </ChartContainer>
//       </CardContent>
//       <CardFooter>
//         <div className="flex w-full items-start gap-2 text-sm">
//           <div className="grid gap-2">
//             <div className="flex items-center gap-2 font-medium leading-none">
//               Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
//             </div>
//             <div className="flex items-center gap-2 leading-none text-muted-foreground">
//               Showing total visitors for the last 6 months
//             </div>
//           </div>
//         </div>
//       </CardFooter>
//     </Card>
//   )
// }


import { CartesianGrid, Line, LineChart, XAxis } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { TrendingUp } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const chartData = [
  { month: "January", desktop: 186, mobile: 80, tablet: 50 },
  { month: "February", desktop: 305, mobile: 200, tablet: 70 },
  { month: "March", desktop: 237, mobile: 120, tablet: 60 },
  { month: "April", desktop: 73, mobile: 190, tablet: 40 },
  { month: "May", desktop: 300, mobile: 130, tablet: 90 },
  { month: "June", desktop: 214, mobile: 140, tablet: 200 },
  { month: "July", desktop: 214, mobile: 140, tablet: 70 },
  { month: "August", desktop: 200, mobile: 250, tablet: 100 },
  { month: "September", desktop: 150, mobile: 120, tablet: 50 },
  { month: "October", desktop: 220, mobile: 150, tablet: 40 },
  { month: "November", desktop: 120, mobile: 200, tablet: 30 },
  { month: "December", desktop: 300, mobile: 110, tablet: 20 },
]

const chartConfig = {
  desktop: {
    label: "Rejected",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Resolved",
    color: "hsl(var(--chart-2))",
  },
  tablet: {
    label: "Pending",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig

export default function Component() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Month Wise Grievance Count
          <div className="inline ml-4">
            <Badge className="bg-teal-600 mr-2">Resolved</Badge>
            <Badge className="bg-orange-600 mr-2">Rejected</Badge>
            <Badge className="bg-gray-700 mr-2">Pending</Badge>
          </div>
        </CardTitle>
        <CardDescription className="font-semibold text-md text-gray-700">January 2024 - December 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer className="h-[400px] w-full" config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line
              dataKey="desktop"
              type="monotone"
              stroke="var(--color-desktop)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="mobile"
              type="monotone"
              stroke="var(--color-mobile)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="tablet"
              type="monotone"
              stroke="var(--color-tablet)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}


// import { Bar, BarChart, XAxis, YAxis } from "recharts"

// import {
//     Card,
//     CardContent,
//     CardDescription,
//     CardHeader,
//     CardTitle,
// } from "@/components/ui/card"
// import {
//     ChartConfig,
//     ChartContainer,
//     ChartTooltip,
//     ChartTooltipContent,
// } from "@/components/ui/chart"

// export const description = "A horizontal bar chart with controlled bar width"

// const chartConfig = {
//     count: {
//         label: "Count",
//         color: "hsl(var(--chart-1))",
//     },
// } satisfies ChartConfig

// export default function RoleWiseUserCount({ dashboardData }: any) {
//     const chartData = dashboardData?.rolesUserCount

//     const leftMargin = 150;
//     const maxBarSize = 10; // Maximum width of the bars

//     return (
//         <Card className="w-full bg-white">
//             <CardHeader>
//                 <CardTitle>Roles wise user count</CardTitle>
//                 <CardDescription>FY : 2024-2025</CardDescription>
//             </CardHeader>
//             <CardContent>
//                 <ChartContainer config={chartConfig} className="h-[300px]">
//                     <BarChart
//                         accessibilityLayer
//                         data={chartData}
//                         layout="vertical"
//                         margin={{
//                             left: 10,
//                             right: 20,
//                             top: 0,
//                             bottom: 20,
//                         }}
//                     >
//                         <XAxis
//                             type="number"
//                             dataKey="count"
//                             tickCount={5} // Reduce the number of ticks on the X-axis
//                             domain={[0, 'dataMax']} // Set the domain from 0 to the maximum value in the data
//                         />
//                         <YAxis
//                             dataKey="roleName"
//                             type="category"
//                             tickLine={true}
//                             tickSize={1}
//                             tickMargin={5}
//                             axisLine={true}
//                             stroke="hsl(var(--border))"
//                             fontSize={10}
//                             width={100}
//                         />
//                         <ChartTooltip
//                             cursor={false}
//                             content={<ChartTooltipContent hideLabel />}
//                         />
//                         <Bar
//                             dataKey="count"
//                             fill="var(--color-count)"
//                             radius={2}
//                             maxBarSize={maxBarSize} // Control the maximum width of the bars
//                         />
//                     </BarChart>
//                 </ChartContainer>
//             </CardContent>
//         </Card>
//     )
// }

"use client"

import { Bar, BarChart, XAxis, YAxis } from "recharts"

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

export const description = "A horizontal bar chart"

const chartConfig = {
    count: {
        label: "Count",
        color: "hsl(var(--chart-1))",
    },
} satisfies ChartConfig

export default function RoleWiseUserCount({ dashboardData }: any) {
    const chartData = dashboardData?.rolesUserCount

    // Find the longest role name to set the left margin
    const longestRoleName = chartData?.reduce((max: string, item: any) => 
        item.roleName.length > max.length ? item.roleName : max
    , "")
    const leftMargin = longestRoleName ? longestRoleName.length * 7 : 100 // Estimate 7px per character

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Roles wise user count</CardTitle>
                <CardDescription>FY : 2024-2025</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className="h-[400px] w-[500px]">
                    <BarChart
                        accessibilityLayer
                        data={chartData}
                        layout="vertical"
                        margin={{
                            left: 10,
                            right: 20,
                            top: 20,
                            bottom: 20,
                        }}
                    >
                        <XAxis type="number" dataKey="count" />
                        <YAxis
                            dataKey="roleName"
                            type="category"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            width={100}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Bar dataKey="count" fill="var(--color-count)" radius={5} />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}


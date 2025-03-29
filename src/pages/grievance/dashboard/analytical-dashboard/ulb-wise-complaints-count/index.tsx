// // import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

// // import {
// //   Card,
// //   CardContent,
// //   CardDescription,
// //   CardHeader,
// //   CardTitle,
// // } from "@/components/ui/card"
// // import {
// //   ChartConfig,
// //   ChartContainer,
// //   ChartTooltip,
// //   ChartTooltipContent,
// // } from "@/components/ui/chart"

// // export const description = "A bar chart"



// // const chartConfig = {
// //   count: {
// //     label: "Grievances Count",
// //     color: "hsl(var(--chart-1))",
// //   },
// // } satisfies ChartConfig

// // export default function index({dashboardData}:any) {


// //   return (
// //     <Card>
// //       <CardHeader>
// //         <CardTitle>ULB Wise Grievance Count</CardTitle>
// //         <CardDescription>FY : 2024 - 2025</CardDescription>
// //       </CardHeader>
// //       <CardContent>
// //         <ChartContainer className="h-[400px]" config={chartConfig}>
// //           <BarChart accessibilityLayer data={dashboardData?.ulbComplaintCounts}>
// //             <CartesianGrid vertical={false} />
// //             <XAxis
// //               dataKey="ulbName"
// //               tickLine={false}
// //               tickMargin={10}
// //               axisLine={false}
// //               tickFormatter={(value) => value.slice(0, 6)}
// //             />
// //             <ChartTooltip
// //               cursor={false}
// //               content={<ChartTooltipContent hideLabel />}
// //             />
// //             <Bar dataKey="count" fill="var(--color-count)" radius={8} />
// //           </BarChart>
// //         </ChartContainer>
// //       </CardContent>
// //     </Card>
// //   )
// // }
// "use client"

// import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card"
// import {
//   ChartConfig,
//   ChartContainer,
//   ChartTooltip,
//   ChartTooltipContent,
// } from "@/components/ui/chart"

// export const description = "A vertical bar chart with fully visible labels"

// const chartConfig = {
//   count: {
//     label: "Grievances Count",
//     color: "hsl(var(--chart-1))",
//   },
// } satisfies ChartConfig

// export default function ULBWiseGrievanceCount({ dashboardData }: any) {


  // const STATIC_ULB_LIST = [
  //   { "ulbName": "Dumka Nagar Parishad", "count": 9 },
  //   { "ulbName": "Dhanbad Municipal Corporation", "count": 4 },
  //   { "ulbName": "Lohardaga Nagar Parishad", "count": 8 },
  //   { "ulbName": "Jugsalai Municipality", "count": 15 },
  //   { "ulbName": "Nagar Untari Nagar Panchayat", "count": 4 },
  //   { "ulbName": "Ranchi Municipal Corporation", "count": 8 },
  //   { "ulbName": "Simdega Nagar Parishad", "count": 9 },
  //   { "ulbName": "Barharwa Nagar Panchayat", "count": 15 },
  //   { "ulbName": "Garhwa Nagar Parishad", "count": 8 },
  //   { "ulbName": "Jamshedpur NAC", "count": 4 },
  //   { "ulbName": "Jhumritilaiya Nagar Parishad", "count": 15 },
  //   { "ulbName": "Mihijham Nagar Parishad", "count": 9 },
  //   { "ulbName": "Giridih Municipal Corporation", "count": 8 },
  //   { "ulbName": "Phusro Nagar Parishad", "count": 4 },
  //   { "ulbName": "Bishrampur Nagar Parishad", "count": 15 },
  //   { "ulbName": "Khunti Nagar Panchayat", "count": 9 },
  //   { "ulbName": "Bundu Nagar Panchayat", "count": 8 },
  //   { "ulbName": "Adityapur Municipal Corporation", "count": 4 },
  //   { "ulbName": "Chaibasa Nagar Parishad", "count": 9 },
  //   { "ulbName": "Latehar Nagar Panchayat", "count": 8 },
  //   { "ulbName": "Bachra Nagar Panchayat", "count": 4 },
  //   { "ulbName": "Gumla Nagar Parishad", "count": 15 },
  //   { "ulbName": "Hussainabad Nagar Panchayat", "count": 8 },
  //   { "ulbName": "Medininagar Municipal Corporation", "count": 9 },
  //   { "ulbName": "Bokaro Steel City", "count": 4 },
  //   { "ulbName": "Chandil Nagar Panchayat", "count": 15 },
  //   { "ulbName": "Ghatshila Nagar Panchayat", "count": 8 },
  //   { "ulbName": "Kharsawan Nagar Panchayat", "count": 9 },
  //   { "ulbName": "Koderma Municipal Corporation", "count": 4 },
  //   { "ulbName": "Patamda Nagar Panchayat", "count": 8 },
  //   { "ulbName": "Tenu Ghat Nagar Panchayat", "count": 9 },
  //   { "ulbName": "Tata Nagar Parishad", "count": 4 },
  //   { "ulbName": "Jorapokhar Nagar Panchayat", "count": 15 },
  //   { "ulbName": "Pipraigaon Nagar Panchayat", "count": 8 },
  //   { "ulbName": "Hazaribagh Municipal Corporation", "count": 9 },
  //   { "ulbName": "Ramgarh Nagar Parishad", "count": 4 },
  //   { "ulbName": "Palamu Nagar Panchayat", "count": 15 },
  //   { "ulbName": "Dumri Nagar Panchayat", "count": 8 },
  //   { "ulbName": "Pithoria Nagar Panchayat", "count": 9 },
  //   { "ulbName": "Raghunathganj Nagar Panchayat", "count": 4 },
  //   { "ulbName": "Jainagar Nagar Panchayat", "count": 15 },
  //   { "ulbName": "Bagodar Nagar Panchayat", "count": 8 },
  //   { "ulbName": "Daltonganj Nagar Panchayat", "count": 9 },
  //   { "ulbName": "Chandrapura Nagar Panchayat", "count": 4 },
  //   { "ulbName": "Tata Nagar Municipal Corporation", "count": 15 },
  //   { "ulbName": "Koderma Nagar Panchayat", "count": 8 },
  //   { "ulbName": "Gomia Nagar Panchayat", "count": 9 },
  //   { "ulbName": "Silli Nagar Panchayat", "count": 4 },
  //   { "ulbName": "Jaintia Hills Nagar Panchayat", "count": 15 },
  //   { "ulbName": "Pakur Nagar Panchayat", "count": 8 },
  //   { "ulbName": "Madhupur Nagar Panchayat", "count": 9 }
  // ]

//   return (
//     <Card className="w-full">
//       <CardHeader>
//         <CardTitle>ULB Wise Grievance Count</CardTitle>
//         <CardDescription>FY : 2024 - 2025</CardDescription>
//       </CardHeader>
//       <CardContent className="overflow-x-auto">
//         <ChartContainer className="h-[400px] w-full" config={chartConfig}>
//           <BarChart
//             accessibilityLayer
//             // data={dashboardData?.ulbComplaintCounts}
//             data={STATIC_ULB_LIST}
//             width={800}
//             height={400}
//             margin={{ top: 20, right: 30, left: 20, bottom: 100 }}
//           >
//             <CartesianGrid vertical={false} />
//             <XAxis
//               dataKey="ulbName"
//               tickLine={false}
//               axisLine={false}
//               interval={0}
//               tick={({ x, y, payload }) => (
//                 <text
//                   x={x}
//                   y={y}
//                   dy={16}
//                   textAnchor="end"
//                   transform={`rotate(-45 ${x} ${y})`}
//                   fontSize={10}
//                 >
//                   {payload.value}
//                 </text>
//               )}
//             />
//             <YAxis
//               tickLine={false}
//               axisLine={false}
//               width={50}
//             />
//             <ChartTooltip
//               cursor={false}
//               content={<ChartTooltipContent hideLabel />}
//             />
//             <Bar dataKey="count" fill="var(--color-count)" radius={[4, 4, 0, 0]} maxBarSize={30} />
//           </BarChart>
//         </ChartContainer>
//       </CardContent>
//     </Card>
//   )
// }

"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A vertical stacked bar chart";

const chartConfig = {
  resolved: {
    label: "Resolved Grievances",
    color: "hsl(var(--chart-1))",
  },
  rejected: {
    label: "Rejected Grievances",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export default function ULBWiseGrievanceCount({ dashboardData }: any) {
  const STATIC_ULB_LIST = [
    { ulbName: "Dumka Nagar Parishad", resolved: 6, rejected: 3 },
    { ulbName: "Dhanbad Municipal Corporation", resolved: 2, rejected: 2 },
    { ulbName: "Lohardaga Nagar Parishad", resolved: 5, rejected: 3 },
    { ulbName: "Jugsalai Municipality", resolved: 10, rejected: 5 },
    { ulbName: "Nagar Untari Nagar Panchayat", resolved: 3, rejected: 1 },
    { ulbName: "Ranchi Municipal Corporation", resolved: 6, rejected: 2 },
    { ulbName: "Simdega Nagar Parishad", resolved: 7, rejected: 2 },
    { ulbName: "Barharwa Nagar Panchayat", resolved: 12, rejected: 3 },
    { ulbName: "Garhwa Nagar Parishad", resolved: 5, rejected: 3 },
    { ulbName: "Jamshedpur NAC", resolved: 2, rejected: 2 },
    { ulbName: "Jhumritilaiya Nagar Parishad", resolved: 10, rejected: 5 },
    { ulbName: "Mihijham Nagar Parishad", resolved: 6, rejected: 3 },
    { ulbName: "Giridih Municipal Corporation", resolved: 5, rejected: 3 },
    { ulbName: "Phusro Nagar Parishad", resolved: 2, rejected: 2 },
    { ulbName: "Bishrampur Nagar Parishad", resolved: 10, rejected: 5 },
    { ulbName: "Khunti Nagar Panchayat", resolved: 6, rejected: 3 },
    { ulbName: "Bundu Nagar Panchayat", resolved: 5, rejected: 3 },
    { ulbName: "Adityapur Municipal Corporation", resolved: 2, rejected: 2 },
    { ulbName: "Chaibasa Nagar Parishad", resolved: 6, rejected: 3 },
    { ulbName: "Latehar Nagar Panchayat", resolved: 5, rejected: 3 },
    { ulbName: "Bachra Nagar Panchayat", resolved: 2, rejected: 2 },
    { ulbName: "Gumla Nagar Parishad", resolved: 10, rejected: 5 },
    { ulbName: "Hussainabad Nagar Panchayat", resolved: 5, rejected: 3 },
    { ulbName: "Medininagar Municipal Corporation", resolved: 6, rejected: 3 },
    { ulbName: "Bokaro Steel City", resolved: 2, rejected: 2 },
    { ulbName: "Chandil Nagar Panchayat", resolved: 10, rejected: 5 },
    { ulbName: "Ghatshila Nagar Panchayat", resolved: 5, rejected: 3 },
    { ulbName: "Kharsawan Nagar Panchayat", resolved: 6, rejected: 3 },
    { ulbName: "Koderma Municipal Corporation", resolved: 2, rejected: 2 },
    { ulbName: "Patamda Nagar Panchayat", resolved: 5, rejected: 3 },
    { ulbName: "Tenu Ghat Nagar Panchayat", resolved: 6, rejected: 3 },
    { ulbName: "Tata Nagar Parishad", resolved: 2, rejected: 2 },
    { ulbName: "Jorapokhar Nagar Panchayat", resolved: 10, rejected: 5 },
    { ulbName: "Pipraigaon Nagar Panchayat", resolved: 5, rejected: 3 },
    { ulbName: "Hazaribagh Municipal Corporation", resolved: 6, rejected: 3 },
    { ulbName: "Ramgarh Nagar Parishad", resolved: 2, rejected: 2 },
    { ulbName: "Palamu Nagar Panchayat", resolved: 10, rejected: 5 },
    { ulbName: "Dumri Nagar Panchayat", resolved: 5, rejected: 3 },
    { ulbName: "Pithoria Nagar Panchayat", resolved: 6, rejected: 3 },
    { ulbName: "Raghunathganj Nagar Panchayat", resolved: 2, rejected: 2 },
    { ulbName: "Jainagar Nagar Panchayat", resolved: 10, rejected: 5 },
    { ulbName: "Bagodar Nagar Panchayat", resolved: 5, rejected: 3 },
    { ulbName: "Daltonganj Nagar Panchayat", resolved: 6, rejected: 3 },
    { ulbName: "Chandrapura Nagar Panchayat", resolved: 2, rejected: 2 },
    { ulbName: "Tata Nagar Municipal Corporation", resolved: 10, rejected: 5 },
    { ulbName: "Koderma Nagar Panchayat", resolved: 5, rejected: 3 },
    { ulbName: "Gomia Nagar Panchayat", resolved: 6, rejected: 3 },
    { ulbName: "Silli Nagar Panchayat", resolved: 2, rejected: 2 },
    { ulbName: "Jaintia Hills Nagar Panchayat", resolved: 10, rejected: 5 },
    { ulbName: "Pakur Nagar Panchayat", resolved: 5, rejected: 3 },
    { ulbName: "Madhupur Nagar Panchayat", resolved: 6, rejected: 3 },
  ];
  

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>ULB Wise Grievance Count</CardTitle>
        <CardDescription>FY : 2024 - 2025</CardDescription>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <ChartContainer className="h-[400px] w-full" config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={STATIC_ULB_LIST}
            width={800}
            height={400}
            margin={{ top: 20, right: 30, left: 20, bottom: 100 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="ulbName"
              tickLine={false}
              axisLine={false}
              interval={0}
              tick={({ x, y, payload }) => (
                <text
                  x={x}
                  y={y}
                  dy={16}
                  textAnchor="end"
                  transform={`rotate(-45 ${x} ${y})`}
                  fontSize={10}
                >
                  {payload.value}
                </text>
              )}
            />
            <YAxis tickLine={false} axisLine={false} width={50} />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar
              dataKey="resolved"
              stackId="a"
              fill="skyblue"
              radius={[4, 4, 0, 0]}
              maxBarSize={30}
            />
            <Bar
              dataKey="rejected"
              stackId="a"
              fill="orange"
              radius={[0, 0, 0, 0]}
              maxBarSize={30}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

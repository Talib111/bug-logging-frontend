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
    
  const DepartmentData= [
    {
        "_id": "6766ad2394154896b205a32d",
        "department": "Water Board",
        "status": 1,
        "createdAt": "2024-12-21T11:57:23.527Z",
        "updatedAt": "2024-12-21T13:03:18.913Z",
        count:10,
    },
    {
        "_id": "6766ad1a94154896b205a32a",
        "department": "Swachhta",
        "status": 1,
        "createdAt": "2024-12-21T11:57:14.052Z",
        "updatedAt": "2024-12-21T11:57:14.052Z",
        count:15,
    },
    {
        "_id": "6766ad0d94154896b205a327",
        "department": "S.W.M",
        "status": 1,
        "createdAt": "2024-12-21T11:57:01.607Z",
        "updatedAt": "2024-12-21T11:57:01.607Z",
        count:20,
    },
    {
        "_id": "6766ad0494154896b205a324",
        "department": "Revenue",
        "status": 1,
        "createdAt": "2024-12-21T11:56:52.306Z",
        "updatedAt": "2024-12-21T11:56:52.306Z",
        count:50,
    },
    {
        "_id": "6766acf994154896b205a321",
        "department": "PMAY",
        "status": 1,
        "createdAt": "2024-12-21T11:56:41.506Z",
        "updatedAt": "2024-12-21T13:03:04.943Z",
        count:13,
    },
    {
        "_id": "6766acef94154896b205a31e",
        "department": "Light",
        "status": 1,
        "createdAt": "2024-12-21T11:56:31.928Z",
        "updatedAt": "2024-12-21T11:56:31.928Z",
        count:50,
    },
    {
        "_id": "6766ace394154896b205a31b",
        "department": "Health, Sanitation and SBM",
        "status": 1,
        "createdAt": "2024-12-21T11:56:19.321Z",
        "updatedAt": "2024-12-21T11:56:19.321Z",
        count:6,
    },
    {
        "_id": "6766acd294154896b205a318",
        "department": "Garden and Horticulture",
        "status": 1,
        "createdAt": "2024-12-21T11:56:02.294Z",
        "updatedAt": "2024-12-21T11:56:02.294Z",
        count:7,
    },
    {
        "_id": "6766acc794154896b205a315",
        "department": "Engineering",
        "status": 1,
        "createdAt": "2024-12-21T11:55:51.764Z",
        "updatedAt": "2024-12-21T11:55:51.764Z",
        count:18,
    },
    {
        "_id": "6766acbe94154896b205a312",
        "department": "Enforcement",
        "status": 1,
        "createdAt": "2024-12-21T11:55:42.471Z",
        "updatedAt": "2024-12-21T11:55:42.471Z",
        count:10,
    },
    {
        "_id": "6766acb294154896b205a30f",
        "department": "Day NULM",
        "status": 1,
        "createdAt": "2024-12-21T11:55:30.692Z",
        "updatedAt": "2024-12-21T11:55:30.692Z",
        count:5,
    },
    {
        "_id": "6766aca494154896b205a30c",
        "department": "Call Center Operator",
        "status": 1,
        "createdAt": "2024-12-21T11:55:16.515Z",
        "updatedAt": "2024-12-21T11:55:16.515Z",
        count:10,
    },
    {
        "_id": "67668b39c36f89b90d9a270e",
        "department": "Birth and Death",
        "status": 1,
        "createdAt": "2024-12-21T09:32:41.100Z",
        "updatedAt": "2024-12-21T09:32:41.100Z",
        count:10,
    }
]
      
  return (
    <Card className="h-[370px] w-full">
      <CardHeader>
       <div className="flex justify-between">
        <div> <CardTitle>Department Wise Grievance</CardTitle></div>
        <div><Link to={'/bug-log/dashboard/resolution-days-reports'}><Button size={'sm'} variant={'secondary'}>Explore <ChevronRight size={15} className="inline" /></Button></Link></div>
       </div>
        <CardDescription>FY : 2024 - 2025</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer className="w-full h-[200px]" config={chartConfig}>
          <BarChart accessibilityLayer data={DepartmentData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="department"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 6)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="count" fill="indigo" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

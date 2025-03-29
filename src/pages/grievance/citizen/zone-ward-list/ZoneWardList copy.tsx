import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from '@/components/ui/card'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useState } from "react";
import { district, ZoneWardListData } from './JSONDATA';
export default function ZoneWardList() {
  const [selectedDistrict, setSelectedDistrict] = useState<number | null>(null);

  const filteredZoneWardList = ZoneWardListData.filter(
    (item) => item.districtId === selectedDistrict
  );

  return (

    <div className="w-full md:w-8/12 p-2 mx-auto">
      <div className="mt-4">
        <h1 className="text-blue-800 font-bold text-2xl underline mb-2">Ulb Wise Ward List</h1>
      </div>
       <Card>
        <CardHeader className='px-7'>
          <CardDescription>
            <Select onValueChange={(value) => setSelectedDistrict(Number(value))}>
              <SelectTrigger className="md:w-[280px] ">
                <SelectValue placeholder="Select Your District" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {district.map((items) => (
                    <SelectItem key={items.districtId} value={items.districtId.toString()}>
                      {items.districtName}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className=''>#</TableHead>
                  <TableHead className=''>Zone Name</TableHead>
                  <TableHead className=''>Ward Name</TableHead>
                  <TableHead className=''>Address at</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredZoneWardList?.map((items, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{items?.zoneName}</TableCell>
                    <TableCell>{items.wardName}</TableCell>
                    <TableCell>{items.address}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </>
        </CardContent>
      </Card>
    </div>

  )
}

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet"

export default function CitizenReviewForm({ trigger, children }: any) {

  return (
    <Sheet>
      <SheetTrigger asChild>
        {trigger}
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          {/* <SheetTitle>Grievance Chatbot</SheetTitle> */}
        </SheetHeader>
        
        {children}
          
       


      </SheetContent>
    </Sheet>
  )
}


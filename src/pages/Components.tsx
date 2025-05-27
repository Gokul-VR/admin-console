import React, { useState } from "react";
import { CustomButton } from "../components/ui/custom-button";
import { CustomInput } from "../components/ui/custom-input";
import { CustomModal } from "../components/ui/custom-modal";
import { Search } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "../components/ui/alert";
import { Badge } from "../components/ui/badge";
import { Skeleton } from "../components/ui/skeleton";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "../components/ui/pagination";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
} from "../components/ui/table";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "../components/ui/tabs";
import { ToastProvider, Toast, ToastTitle, ToastDescription, ToastViewport } from "../components/ui/toast";
import { Toaster } from "../components/ui/toaster";
import { useToast } from "../hooks/use-toast";
import { Avatar, AvatarImage, AvatarFallback } from "../components/ui/avatar";
import { Switch } from "../components/ui/switch";
import { Checkbox } from "../components/ui/checkbox";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../components/ui/card";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "../components/ui/select";
import { Label } from "../components/ui/label";
import { Popover, PopoverTrigger, PopoverContent } from "../components/ui/popover";
import { Separator } from "../components/ui/separator";
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from "../components/ui/sheet";
import { Tooltip, TooltipTrigger, TooltipContent } from "../components/ui/tooltip";

const ComponentsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [time, setTime] = useState("12:00");

  return (
    <div className="bg-background text-foreground min-h-screen p-2 space-y-12">
      {/* Alert Section */}
      <section className="bg-card p-6 rounded-xl shadow-sm border border-border">
        <h2 className="text-xl font-semibold mb-6 text-foreground">Alert</h2>
        <div className="flex flex-col gap-4">
          <Alert>
            <AlertTitle>Default Alert</AlertTitle>
            <AlertDescription>This is a default alert.</AlertDescription>
          </Alert>
          <Alert variant="destructive">
            <AlertTitle>Destructive Alert</AlertTitle>
            <AlertDescription>This is a destructive alert.</AlertDescription>
          </Alert>
        </div>
      </section>
      {/* Toast Section */}
      <section className="bg-card p-6 rounded-xl shadow-sm border border-border">
        <h2 className="text-xl font-semibold mb-6 text-foreground">Toast</h2>
        <ToastDemo />
        <Toaster />
      </section>
      {/* Badge Section */}
      <section className="bg-card p-6 rounded-xl shadow-sm border border-border">
        <h2 className="text-xl font-semibold mb-6 text-foreground">Badge</h2>
        <div className="flex gap-4 flex-wrap">
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="destructive">Destructive</Badge>
          <Badge variant="outline">Outline</Badge>
        </div>
      </section>
      {/* Skeleton Section */}
      <section className="bg-card p-6 rounded-xl shadow-sm border border-border">
        <h2 className="text-xl font-semibold mb-6 text-foreground">Skeleton</h2>
        <div className="flex gap-4 items-end">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-16 w-16" />
        </div>
      </section>
      {/* Pagination Section */}
      <section className="bg-card p-6 rounded-xl shadow-sm border border-border">
        <h2 className="text-xl font-semibold mb-6 text-foreground">Pagination</h2>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>
                1
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </section>
      {/* Table Section */}
      <section className="bg-card p-6 rounded-xl shadow-sm border border-border">
        <h2 className="text-xl font-semibold mb-6 text-foreground">Table</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Jane Doe</TableCell>
              <TableCell>jane@example.com</TableCell>
              <TableCell>Active</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>John Smith</TableCell>
              <TableCell>john@example.com</TableCell>
              <TableCell>Inactive</TableCell>
            </TableRow>
          </TableBody>
          <TableCaption>Sample users</TableCaption>
        </Table>
      </section>
      {/* Tabs Section */}
      <section className="bg-card p-6 rounded-xl shadow-sm border border-border">
        <h2 className="text-xl font-semibold mb-6 text-foreground">Tabs</h2>
        <Tabs defaultValue="tab1">
          <TabsList>
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
            <TabsTrigger value="tab2">Tab 2</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">Content for Tab 1</TabsContent>
          <TabsContent value="tab2">Content for Tab 2</TabsContent>
        </Tabs>
      </section>
      {/* Switch & Checkbox Section */}
      <section className="bg-card p-6 rounded-xl shadow-sm border border-border">
        <h2 className="text-xl font-semibold mb-6 text-foreground">Switch & Checkbox</h2>
        <div className="flex gap-8 items-center">
          <div className="flex flex-col gap-2">
            <Label htmlFor="switch-demo">Switch</Label>
            <Switch id="switch-demo" />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="checkbox-demo">Checkbox</Label>
            <Checkbox id="checkbox-demo" />
          </div>
        </div>
      </section>
      {/* Avatar Section */}
      <section className="bg-card p-6 rounded-xl shadow-sm border border-border">
        <h2 className="text-xl font-semibold mb-6 text-foreground">Avatar</h2>
        <div className="flex gap-4 items-center">
          <Avatar>
            <AvatarImage src="https://randomuser.me/api/portraits/men/32.jpg" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarFallback>AB</AvatarFallback>
          </Avatar>
        </div>
      </section>
      {/* Card Section */}
      <section className="bg-card p-6 rounded-xl shadow-sm border border-border">
        <h2 className="text-xl font-semibold mb-6 text-foreground">Card</h2>
        <Card className="max-w-xs">
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Card description goes here.</CardDescription>
          </CardHeader>
          <CardContent>
            <p>This is the card content area.</p>
          </CardContent>
          <CardFooter>
            <CustomButton>Action</CustomButton>
          </CardFooter>
        </Card>
      </section>
      {/* Select Section */}
      <section className="bg-card p-6 rounded-xl shadow-sm border border-border">
        <h2 className="text-xl font-semibold mb-6 text-foreground">Select</h2>
        <SelectDemo />
      </section>
      {/* Label Section */}
      <section className="bg-card p-6 rounded-xl shadow-sm border border-border">
        <h2 className="text-xl font-semibold mb-6 text-foreground">Label</h2>
        <div className="flex flex-col gap-2">
          <Label htmlFor="label-demo">Label Example</Label>
          <input id="label-demo" className="border rounded px-2 py-1" placeholder="Input with label" />
        </div>
      </section>
      {/* Popover Section */}
      <section className="bg-card p-6 rounded-xl shadow-sm border border-border">
        <h2 className="text-xl font-semibold mb-6 text-foreground">Popover</h2>
        <PopoverDemo />
      </section>
      {/* Separator Section */}
      <section className="bg-card p-6 rounded-xl shadow-sm border border-border">
        <h2 className="text-xl font-semibold mb-6 text-foreground">Separator</h2>
        <div className="flex flex-col gap-4 w-40">
          <div>Above</div>
          <Separator />
          <div>Below</div>
        </div>
      </section>
      {/* Sheet Section */}
      <section className="bg-card p-6 rounded-xl shadow-sm border border-border">
        <h2 className="text-xl font-semibold mb-6 text-foreground">Sheet</h2>
        <SheetDemo />
      </section>
      {/* Tooltip Section */}
      <section className="bg-card p-6 rounded-xl shadow-sm border border-border">
        <h2 className="text-xl font-semibold mb-6 text-foreground">Tooltip</h2>
        <TooltipDemo />
      </section>
    </div>
  );
};

export default ComponentsPage;

// --- Demos for interactive components ---
function ToastDemo() {
  const { toast } = useToast();
  return (
    <CustomButton onClick={() => toast({ title: "Toast Title", description: "This is a toast message." })}>
      Show Toast
    </CustomButton>
  );
}

function SelectDemo() {
  const [value, setValue] = React.useState("");
  return (
    <Select value={value} onValueChange={setValue}>
      <SelectTrigger className="w-48">
        <SelectValue placeholder="Select an option" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="option1">Option 1</SelectItem>
        <SelectItem value="option2">Option 2</SelectItem>
        <SelectItem value="option3">Option 3</SelectItem>
      </SelectContent>
    </Select>
  );
}

function PopoverDemo() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <CustomButton>Open Popover</CustomButton>
      </PopoverTrigger>
      <PopoverContent>
        <div>This is a popover content.</div>
      </PopoverContent>
    </Popover>
  );
}

function SheetDemo() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <CustomButton>Open Sheet</CustomButton>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>Sheet Title</SheetTitle>
          <SheetDescription>This is a sheet description.</SheetDescription>
        </SheetHeader>
        <div className="py-4">Sheet content goes here.</div>
        <SheetFooter>
          <CustomButton>Action</CustomButton>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

function TooltipDemo() {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <CustomButton>Hover me</CustomButton>
      </TooltipTrigger>
      <TooltipContent>
        Tooltip content
      </TooltipContent>
    </Tooltip>
  );
}

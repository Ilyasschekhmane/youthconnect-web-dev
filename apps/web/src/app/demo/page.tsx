import * as React from 'react';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Breadcrumb,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  EmptyState,
  ErrorState,
  Input,
  LoadingState,
  Navbar,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Sidebar,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Toast,
} from '@youthconnect/ui';

export default function DesignSystemDemoPage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(37,99,235,0.16),_transparent_40%)] px-4 py-8 text-slate-900 dark:bg-[radial-gradient(circle_at_top,_rgba(96,165,250,0.2),_transparent_40%)] dark:text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-8">
        <Navbar
          brand={<div className="text-lg font-semibold">YouthConnect</div>}
          actions={
            <>
              <Button variant="outline">Preview</Button>
              <Button>Launch</Button>
            </>
          }
        />

        <div className="grid gap-8 lg:grid-cols-[280px_minmax(0,1fr)]">
          <Sidebar
            title="Navigation"
            items={[
              { label: 'Overview', active: true },
              { label: 'Applications' },
              { label: 'Training' },
              { label: 'Communication' },
            ]}
          />

          <div className="space-y-8">
            <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Design System' }, { label: 'Overview' }]} />

            <Card>
              <CardHeader>
                <div className="flex flex-wrap items-center gap-3">
                  <Badge>GovTech UI</Badge>
                  <Badge variant="success">Accessible</Badge>
                  <Badge variant="outline">Responsive</Badge>
                </div>
                <CardTitle>Modern public-service experience</CardTitle>
                <CardDescription>Working across dark mode, RTL readiness, accessibility, and responsive layouts.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-3">
                  <Button>Primary action</Button>
                  <Button>Secondary</Button>
                  <Button variant="ghost">Ghost</Button>
                </div>
                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium" htmlFor="city">City</label>
                    <Select>
                      <SelectTrigger id="city" aria-label="Select city">
                        <SelectValue placeholder="Select city" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="oujda">Oujda</SelectItem>
                        <SelectItem value="berkane">Berkane</SelectItem>
                        <SelectItem value="nador">Nador</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium" htmlFor="name">Applicant name</label>
                    <Input id="name" placeholder="Enter applicant name" />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80" alt="User" />
                    <AvatarFallback>Y</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">Youssra El Alaoui</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Operations lead</p>
                  </div>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">Open dialog</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Review application</DialogTitle>
                      <DialogDescription>Make a decision with full context and clear outcomes.</DialogDescription>
                    </DialogHeader>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline">Reject</Button>
                      <Button>Approve</Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardFooter>
            </Card>

            <Tabs defaultValue="overview">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="activity">Activity</TabsTrigger>
                <TabsTrigger value="reports">Reports</TabsTrigger>
              </TabsList>
              <TabsContent value="overview">
                <Card>
                  <CardHeader>
                    <CardTitle>Program pipeline</CardTitle>
                    <CardDescription>High-signal summary for staff and city leadership.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Applicant</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>City</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell>Amal Benali</TableCell>
                          <TableCell><Badge variant="success">Approved</Badge></TableCell>
                          <TableCell>Oujda</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Lina Meskine</TableCell>
                          <TableCell><Badge variant="warning">In review</Badge></TableCell>
                          <TableCell>Berkane</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="activity">
                <div className="space-y-4">
                  <Skeleton className="h-16 w-full" />
                  <Skeleton className="h-16 w-full" />
                </div>
              </TabsContent>
              <TabsContent value="reports">
                <EmptyState title="No reports yet" description="Reports will appear once your first cohort is published." />
              </TabsContent>
            </Tabs>

            <div className="grid gap-6 lg:grid-cols-3">
              <Toast title="Application saved" description="The latest changes were stored securely." />
              <LoadingState title="Syncing data" description="Preparing the latest records for the dashboard." />
              <ErrorState title="Unable to load documents" description="Please try again or contact support if the issue persists." />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

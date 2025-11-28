"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Progress,
} from "@/components/ui";
import { DashboardHeader } from "../_components";
import { CheckCircleIcon, CircleIcon, DownloadIcon, HeartIcon, HomeIcon, MapIcon, RadioIcon, TransportationIcon } from "@/components";
import { CalendarIcon } from "lucide-react";
import { useDashboard } from "../utils";
import { useState } from "react";

export default function PathwayPage() {
  const { phases, handleTaskClick, calculatePhase } = useDashboard();
  const [openItems, setOpenItems] = useState<string[]>(phases.map((p) => p.id));


  return (
    <div className="space-y-8">
      <DashboardHeader title="Pathway" />

      <div className="p-6 pt-0">
        <header className="text-center mb-12">
          <Badge variant="outline" className="mb-4">
            Student Pathway
          </Badge>
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Your Hildesheim Journey Roadmap
          </h1>
          <p className="text-lg max-w-2xl mx-auto">
            A step-by-step guide for a smooth start at the University of Hildesheim.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="gap-2">
              <DownloadIcon className="h-4 w-4" />
              Download Full Guide
            </Button>
            <Button variant="outline" className="gap-2">
              <MapIcon className="h-4 w-4" />
              Interactive Map
            </Button>
          </div>
        </header>

        <div className="grid grid-cols-1 gap-6 mb-12">
          <Accordion type="multiple" className="w-full flex flex-col gap-4" value={openItems} onValueChange={setOpenItems} // opens all items by default
          >
            {phases.map((phase) => {
              const { progress } = calculatePhase(phase);
              return <AccordionItem key={phase.id} value={phase.id}>
                <Card className="overflow-hidden">
                  <AccordionTrigger className="px-4 hover:no-underline">
                    <CardHeader className="w-full">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 rounded-md bg-primary/10 text-primary">
                          {<phase.icon className="h-4 w-4" />}
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-xl">{phase.title}</CardTitle>
                          <CardDescription>{phase.description}</CardDescription>
                        </div>
                      </div>
                      <div className="mt-4">
                        <Progress
                          value={progress}
                          className="h-2"
                        />
                        <p className="text-xs mt-1">
                          {progress}% complete
                          ({phase.tasks.filter(t => t.completed).length} of {phase.tasks.length} tasks)
                        </p>
                      </div>
                    </CardHeader>
                  </AccordionTrigger>
                  <AccordionContent>
                    <CardContent className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {phase.tasks.map((task) => (
                          <div
                            key={task.id}
                            className={`cursor-pointer p-4 rounded-lg border ${task.completed
                              ? "border-green-500/30 bg-green-500/10"
                              : "border-muted/30 bg-muted/10"
                              }`}
                            onClick={() => handleTaskClick(phase, task)}
                          >
                            <div className="flex items-start gap-3">
                              <div className="mt-0.5">
                                {task.completed ? (
                                  <CheckCircleIcon className="h-5 w-5 text-green-500" />
                                ) : (
                                  <CircleIcon className="h-5 w-5 text-muted-foreground" />
                                )}
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <h3
                                    className={`font-semibold text-sm ${task.completed ? "text-green-500" : ""
                                      }`}
                                  >
                                    {task.label}
                                  </h3>
                                </div>
                                <p className="text-xs text-muted-foreground mt-1">{task.description}</p>
                                {task.dueDate && (
                                  <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                                    <CalendarIcon className="h-3 w-3" />
                                    Due: {task.dueDate}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </AccordionContent>
                </Card>
              </AccordionItem>
            })}
          </Accordion>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HeartIcon className="h-5 w-5" />
              Essential Tips for Success
            </CardTitle>
            <CardDescription>
              Advice from current students to make your transition smoother
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-muted/30">
                <div className="flex items-center gap-2 mb-2">
                  <TransportationIcon className="h-4 w-4" />
                  <h4 className="font-medium">Transportation</h4>
                </div>
                <p className="text-sm">
                  Your semester ticket covers regional trains and buses. Download the DB Navigator app for schedules.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-muted/30">
                <div className="flex items-center gap-2 mb-2">
                  <RadioIcon className="h-4 w-4" />
                  <h4 className="font-medium">Broadcasting Fee</h4>
                </div>
                <p className="text-sm">
                  Register at rundfunkbeitrag.de. One fee per household, so you can split costs with roommates.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-muted/30">
                <div className="flex items-center gap-2 mb-2">
                  <HomeIcon className="h-4 w-4" />
                  <h4 className="font-medium">Housing</h4>
                </div>
                <p className="text-sm">
                  Check WG-Gesucht for shared apartments and Studentenwerk for dormitory options.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>
            Need help? Contact the International Office at international@uni-hildesheim.de
          </p>
          <p className="mt-2">
            © {new Date().getFullYear()} University of Hildesheim International Student Guide
          </p>
        </div>
      </div>
    </div>
  );
}
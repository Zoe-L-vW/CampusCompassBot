"use client";

import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Progress,
} from "@/components/ui";
import { DashboardHeader } from "./_components";
import { ArrowRightIcon, DownloadIcon } from "@/components";
import { useDashboard } from "./utils";
import Link from "next/link";

export default function Dashboard() {
  const { phases, calculatePhase } = useDashboard();

  return (
    <div className="space-y-8">
      <DashboardHeader title="Dashboard" />

      <div className="p-6 pt-0 flex flex-col gap-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Student Handbook & Roadmap
            </h1>
            <p className="text-muted-foreground">
              Track your progress through the essential steps for your student
              journey in Hildesheim
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <a href="/handbook_v3.pdf" download>
              <Button className="gap-2">
                <DownloadIcon className="h-4 w-4" />
                Download Handbook (PDF)
              </Button>
            </a>
            <Link href={"/dashboard/pathway"}>
              <Button variant="outline" className="gap-2">
                View Pathway
                <ArrowRightIcon className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {phases.map((phase) => {
            const { progress } = calculatePhase(phase);
            return (
              <Link key={phase.id} href={"/dashboard/pathway"}>
                <Card className="flex flex-col">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="p-2 rounded-md bg-primary/10">
                        {<phase.icon className="h-4 w-4" />}
                      </div>
                      <CardTitle className="text-lg">{phase.title}</CardTitle>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </CardHeader>
                  <CardContent className="flex-1">
                    <p className="text-sm text-muted-foreground">
                      {progress}% complete
                    </p>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Next Recommended Steps</CardTitle>
            <CardDescription>Based on your current progress</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {phases
                .map((phase) => {
                  const { totalCompletedTasks, incompletedTasks, totalTasks } =
                    calculatePhase(phase);

                  return (
                    <div key={phase.id} className="flex items-start gap-3">
                      <div className="mt-1">
                        <Badge>
                          {totalCompletedTasks}/{totalTasks}
                        </Badge>
                      </div>
                      <div>
                        <p className="font-medium">{phase.title}</p>
                        <p className="text-sm text-muted-foreground">
                          Next: {incompletedTasks[0].label}
                        </p>
                      </div>
                    </div>
                  );
                })
                .filter(Boolean)
                .slice(0, 3)}
            </div>
          </CardContent>
          {/* <CardFooter>
            <Button variant="outline" className="w-full gap-2">
              View All Recommendations
              <ArrowRightIcon className="h-4 w-4" />
            </Button>
          </CardFooter> */}
        </Card>
      </div>
    </div>
  );
}

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
} from "@/components/ui";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Container } from "./container";
import Link from "next/link";

// Types for better type safety
interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
  fallback: string;
  color: string;
  skills: string[];
}

interface ValueItem {
  id: string;
  title: string;
  description: string;
}

// Content objects for easier maintenance and potential localization
const teamMembers: TeamMember[] = [
  {
    id: "adi",
    name: "Aditya Chaturvedi",
    role: "Co-Founder & Content Lead",
    avatar: "/placeholder-avatar.jpg",
    fallback: "AC",
    color: "blue",
    skills: ["Content Creation", "UX Design", "Documentation"]
  },
  {
    id: "uttam",
    name: "Uttam",
    role: "Co-Founder & Tech Lead",
    avatar: "/placeholder-avatar.jpg",
    fallback: "UT",
    color: "purple",
    skills: ["Full-stack Development", "Technical Implementation", "System Architecture"]
  }
];

const values: ValueItem[] = [
  {
    id: "student-first",
    title: "Student-First Approach",
    description: "We prioritize the needs and experiences of students above all else, ensuring our platform remains relevant and valuable."
  },
  {
    id: "authentic-info",
    title: "Authentic Information",
    description: "We combine official resources with real student experiences to provide the most accurate and practical guidance."
  },
  {
    id: "community",
    title: "Community Building",
    description: "We foster connections between students, creating a supportive network that extends beyond the digital platform."
  }
];

// Reusable Team Member Card Component
function TeamMemberCard({ member }: { member: TeamMember }) {
  const colorClasses = {
    blue: {
      card: "bg-primary-50 dark:bg-primary-950/50 border-primary-200 dark:border-primary-900/25",
      avatar: "border-primary-200",
      fallback: "bg-primary-100 text-primary-800",
      dot: "bg-primary"
    },
    purple: {
      card: "bg-secondary-50 dark:bg-secondary-950/50 border-secondary-200 dark:border-secondary-900/25",
      avatar: "border-secondary-200",
      fallback: "bg-secondary-100 text-secondary-800",
      dot: "bg-primary"
    }
  };

  const colors = colorClasses[member.color as keyof typeof colorClasses];

  return (
    <Card className={colors.card}>
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3 mb-2">
          <Avatar className={`h-10 w-10 border-2 ${colors.avatar}`}>
            <AvatarImage src={member.avatar} alt={member.name} />
            <AvatarFallback className={colors.fallback}>
              {member.fallback}
            </AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-lg">{member.name}</CardTitle>
            <CardDescription>{member.role}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ul className="space-y-1 text-sm text-muted-foreground">
          {member.skills.map((skill, index) => (
            <li key={index} className="flex items-center">
              <span className={`w-1.5 h-1.5 rounded-full ${colors.dot} mr-2`}></span>
              {skill}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

// Reusable Value Accordion Component
function ValueAccordionItem({ value }: { value: ValueItem }) {
  return (
    <AccordionItem value={value.id}>
      <AccordionTrigger className="text-left hover:no-underline hover:bg-accent/50 px-4 rounded-lg">
        {value.title}
      </AccordionTrigger>
      <AccordionContent className="px-4 pb-4">
        <p className="text-muted-foreground">{value.description}</p>
      </AccordionContent>
    </AccordionItem>
  );
}

// Main About Component
export function About() {
  return (
    <section id="about-us" className="py-20">
      <Container>
        {/* Header Section */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 text-sm font-medium py-1 px-3">
            Our Story
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            About Campus Compass
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Helping students navigate their journey in Hildesheim
          </p>
        </div>

        <div className="grid gap-16 items-center">
          {/* Origin Story */}
          <div>
            <Card className="border-0 shadow-none bg-transparent">
              <CardHeader className="px-0">
                <CardTitle className="text-2xl md:text-3xl">
                  Our Origin
                </CardTitle>
              </CardHeader>
              <CardContent className="px-0 space-y-4">
                <p className="text-muted-foreground">
                  Campus Compass was created by{" "}
                  <span className="text-primary font-medium">
                    Adi (Aaditya Chaturvedi)
                  </span>{" "}
                  and <span className="text-primary font-medium">Uttam</span> to
                  help international and national students navigate their new
                  life in Hildesheim. We understand the challenges of moving to
                  a new country and want to make your transition as smooth as
                  possible.
                </p>
                <p className="text-muted-foreground">
                  Our platform combines official university information with
                  personal experiences to give you the most comprehensive guide
                  to student life in Hildesheim.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 mt-6">
                  <Button asChild variant="outline" className="flex-1 sm:flex-none">
                    <Link href="/dashboard">Learn More</Link>
                  </Button>
                  <Button asChild className="flex-1 sm:flex-none">
                    <Link href="#contact-us">Contact Us</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Team Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {teamMembers.map((member) => (
              <TeamMemberCard key={member.id} member={member} />
            ))}

            {/* Mission Card */}
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">🎯</span>
                  Our Mission
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  To empower students with the knowledge they need to thrive in
                  Hildesheim from day one. We believe that every student should
                  have access to the resources and community support necessary
                  for a successful academic journey.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Values Accordion */}
        <div className="mt-20">
          <h3 className="text-2xl font-bold text-center mb-8">Our Values</h3>
          <Accordion type="single" collapsible className="w-full">
            {values.map((value) => (
              <ValueAccordionItem key={value.id} value={value} />
            ))}
          </Accordion>
        </div>
      </Container>
    </section>
  );
}
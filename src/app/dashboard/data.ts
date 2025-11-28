import { BeforeArrivalPhaseIcon, SettlingInPhaseIcon, UponArrivalPhaseIcon } from "@/components";
import { TPhases } from "./types";

export const defaultPhases: TPhases = [
    {
        id: "beforeArrival",
        title: "Before Arrival",
        icon: BeforeArrivalPhaseIcon,
        description: "All the important tasks to complete before traveling to Germany.",
        tasks: [
            {
                id: "1",
                label: "Check Visa Requirements",
                description:
                    "Confirm the specific visa and residence permit requirements for your home country on the German embassy website.",
                completed: false,
                priority: "high",
                dueDate: null,
            },
            {
                id: "2",
                label: "Apply for Student Visa",
                description:
                    "Book and attend your visa appointment at the German embassy or consulate well in advance of your travel date.",
                completed: false,
                priority: "high",
                dueDate: "2025-07-20",
            },
            {
                id: "3",
                label: "Open a Blocked Account",
                description:
                    "Initiate the process to set up your blocked account to prove financial means for your visa application.",
                completed: false,
                priority: "high",
                dueDate: "2025-07-25",
            },
            {
                id: "4",
                label: "Transfer Funds",
                description:
                    "Transfer the required amount of money to your blocked account as soon as possible.",
                completed: false,
                priority: "high",
                dueDate: "2025-07-30",
            },
            {
                id: "5",
                label: "Research Health Insurance",
                description:
                    "Look into German statutory health insurance providers and secure a confirmation for your enrollment.",
                completed: false,
                priority: "medium",
                dueDate: "2025-08-01",
            },
            {
                id: "6",
                label: "Apply for Dormitory",
                description:
                    "Submit your application for a student dormitory through the Studierendenwerk portal.",
                completed: false,
                priority: "high",
                dueDate: "2025-08-05",
            },
            {
                id: "7",
                label: "Look for Private Housing",
                description:
                    "If you don't secure a dorm spot, explore private housing options on websites like WG-Gesucht.",
                completed: false,
                priority: "medium",
                dueDate: "2025-08-15",
            },
            {
                id: "8",
                label: "Secure a Lease Agreement",
                description:
                    "Sign your rental agreement for your new home, either in a dorm or private apartment.",
                completed: false,
                priority: "high",
                dueDate: "2025-08-20",
            },
            {
                id: "9",
                label: "Gather Enrollment Documents",
                description:
                    "Collect and scan all documents required for your university enrollment via the PLUS-Portal.",
                completed: false,
                priority: "high",
                dueDate: "2025-08-25",
            },
            {
                id: "10",
                label: "Pay Semester Fee",
                description:
                    "Pay your semester fee and social contribution to finalize your university enrollment.",
                completed: false,
                priority: "high",
                dueDate: "2025-08-30",
            },
            {
                id: "11",
                label: "Book Your Flight",
                description:
                    "Purchase your flight to Germany, keeping your arrival date in mind.",
                completed: false,
                priority: "high",
                dueDate: "2025-09-01",
            },
            {
                id: "12",
                label: "Plan Train to Hildesheim",
                description:
                    "Plan your train travel from your arrival airport to Hildesheim Hauptbahnhof (main train station).",
                completed: false,
                priority: "medium",
                dueDate: "2025-09-05",
            },
        ],
    },
    {
        id: "uponArrival",
        title: "Upon Arrival",
        icon: UponArrivalPhaseIcon,
        description: "Complete essential steps immediately after arriving in Germany.",
        tasks: [
            {
                id: "13",
                label: "Get a German SIM Card",
                description: "Upon arrival, purchase a German SIM card to stay connected.",
                completed: false,
                priority: "high",
                dueDate: "2025-09-10",
            },
            {
                id: "14",
                label: "Get Landlord's Confirmation",
                description:
                    "Get the signed Wohnungsgeberbestätigung from your landlord or dorm administrator. This is crucial for registration.",
                completed: false,
                priority: "high",
                dueDate: "2025-09-15",
            },
            {
                id: "15",
                label: "Book City Registration",
                description:
                    "Schedule your Anmeldung appointment online on the Hildesheim city website.",
                completed: false,
                priority: "high",
                dueDate: "2025-09-18",
            },
            {
                id: "16",
                label: "Attend Anmeldung Appointment",
                description:
                    "Go to the Bürgerbüro with your passport, visa, and the Wohnungsgeberbestätigung.",
                completed: false,
                priority: "high",
                dueDate: "2025-09-22",
            },
            {
                id: "17",
                label: "Open a German Bank Account",
                description:
                    "Visit a bank to open a student account using your new Anmeldebestätigung.",
                completed: false,
                priority: "medium",
                dueDate: "2025-09-25",
            },
        ],
    },
    {
        id: "settlingIn",
        title: "Settling In",
        icon: SettlingInPhaseIcon,
        description: "Get comfortable and set up everything for your student life.",
        tasks: [
            {
                id: "18",
                label: "Pay Public Broadcasting Fee",
                description:
                    "Register and pay the Rundfunkbeitrag (TV/radio fee) for your household.",
                completed: false,
                priority: "medium",
                dueDate: "2025-10-01",
            },
            {
                id: "19",
                label: "Apply for Residence Permit",
                description:
                    "Book an appointment at the Ausländerbehörde (Foreigners' Office) to convert your visa into a residence permit.",
                completed: false,
                priority: "high",
                dueDate: "2025-10-07",
            },
            {
                id: "20",
                label: "Activate University Accounts",
                description:
                    "Log in to your UNI-Account and other university platforms like Stud.IP and the webmail service.",
                completed: false,
                priority: "high",
                dueDate: "2025-10-10",
            },
            {
                id: "21",
                label: "Get Digital Semester Ticket",
                description:
                    "Follow the university's instructions to download and activate your Deutschlandsemesterticket.",
                completed: false,
                priority: "medium",
                dueDate: "2025-10-15",
            },
            {
                id: "22",
                label: "Find Your Grocery Stores",
                description:
                    "Locate the nearest supermarkets like REWE, Edeka, and Aldi to your home.",
                completed: false,
                priority: "low",
                dueDate: "2025-10-17",
            },
            {
                id: "23",
                label: "Explore the City",
                description:
                    "Take some time to explore the city center and get familiar with the bus system.",
                completed: false,
                priority: "low",
                dueDate: "2025-10-20",
            },
            {
                id: "24",
                label: "Visit the International Office",
                description:
                    "Stop by the International Office to introduce yourself and ask any remaining questions.",
                completed: false,
                priority: "medium",
                dueDate: "2025-10-25",
            },
            {
                id: "25",
                label: "Join a Student Club",
                description:
                    "Explore the various student clubs and organizations at the university and join one that aligns with your interests.",
                completed: false,
                priority: "low",
                dueDate: "2025-10-31",
            },
        ],
    },
];

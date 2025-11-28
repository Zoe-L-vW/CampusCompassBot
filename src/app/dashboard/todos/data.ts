import { Tag, Todo } from "./types";

export const defaultTags: Tag[] = [
    { id: '1', name: 'Work', color: 'bg-blue-500' },
    { id: '2', name: 'Study', color: 'bg-green-500' },
    { id: '3', name: 'Personal', color: 'bg-purple-500' },
    { id: '4', name: 'Urgent', color: 'bg-red-500' },
];


export const defaultTodos: Todo[] = [
    {
        "id": "1",
        "title": "Review the Student Handbook",
        "description": "Go through the entire Hildesheim Student Handbook to get a general overview of the process.",
        "completed": false,
        "category": "Getting Started",
        createdAt: new Date(),
        updatedAt: new Date(),
        tags: ["1"]
    },
    {
        "id": "2",
        "title": "Explore the Semester Ticket",
        "description": "Learn about the public transport options and the benefits of the Deutschlandsemesterticket.",
        "completed": false,
        "category": "Getting Started",
        createdAt: new Date(),
        updatedAt: new Date(),
        tags: ["1"]
    },
    {
        "id": "3",
        "title": "Find Your German Embassy",
        "description": "Locate the German embassy or consulate responsible for your region.",
        "completed": false,
        "category": "Before Arrival",
        createdAt: new Date(),
        updatedAt: new Date(),
        tags: ["1"]
    },
    {
        "id": "4",
        "title": "Research Visa Requirements",
        "description": "Check the specific documents and procedures required for your student visa application.",
        "completed": false,
        "category": "Before Arrival",
        createdAt: new Date(),
        updatedAt: new Date(),
        tags: ["1"]
    },
    {
        "id": "5",
        "title": "Open a Blocked Account (Non-EU)",
        "description": "Initiate the process to set up your blocked account as proof of financial means.",
        "completed": false,
        "category": "Before Arrival",
        createdAt: new Date(),
        updatedAt: new Date(),
        tags: ["1"]
    },
    {
        "id": "6",
        "title": "Apply to Studentenwerk",
        "description": "Submit your application for student dormitories through the official Studentenwerk portal.",
        "completed": false,
        "category": "Before Arrival",
        createdAt: new Date(),
        updatedAt: new Date(),
        tags: ["1"]
    },
    {
        "id": "7",
        "title": "Browse Private Housing on WG-Gesucht",
        "description": "Explore shared flat listings and contact potential roommates or landlords.",
        "completed": false,
        "category": "Before Arrival",
        createdAt: new Date(),
        updatedAt: new Date(),
        tags: ["1"]
    },
    {
        "id": "8",
        "title": "Choose a Health Insurance Provider",
        "description": "Select a German statutory health insurance provider for your enrollment.",
        "completed": false,
        "category": "Before Arrival",
        createdAt: new Date(),
        updatedAt: new Date(),
        tags: ["1"]
    },
    {
        "id": "9",
        "title": "Prepare Documents for Enrollment",
        "description": "Gather and scan all documents required for your university enrollment via the PLUS-Portal.",
        "completed": false,
        "category": "Before Arrival",
        createdAt: new Date(),
        updatedAt: new Date(),
        tags: ["1"]
    },
    {
        "id": "10",
        "title": "Book Your Flight & Train",
        "description": "Purchase your flight to Hannover and a train ticket to Hildesheim.",
        "completed": false,
        "category": "Before Arrival",
        createdAt: new Date(),
        updatedAt: new Date(),
        tags: ["1"]
    },
    {
        "id": "11",
        "title": "Get Landlord's Confirmation (Wohnungsgeberbestätigung)",
        "description": "Immediately upon arrival, get this document from your landlord or dorm administrator.",
        "completed": false,
        "category": "First Steps",
        createdAt: new Date(),
        updatedAt: new Date(),
        tags: ["1"]
    },
    {
        "id": "12",
        "title": "Book Your City Registration Appointment",
        "description": "Schedule your Anmeldung appointment online on the Hildesheim city website.",
        "completed": false,
        "category": "First Steps",
        createdAt: new Date(),
        updatedAt: new Date(),
        tags: ["1"]
    },
    {
        "id": "13",
        "title": "Go to Your Anmeldung Appointment",
        "description": "Go to the Bürgerbüro with your passport, visa, and Wohnungsgeberbestätigung.",
        "completed": false,
        "category": "First Steps",
        createdAt: new Date(),
        updatedAt: new Date(),
        tags: ["1"]
    },
    {
        "id": "14",
        "title": "Open a German Bank Account",
        "description": "Visit a bank to open a student account using your new Anmeldebestätigung.",
        "completed": false,
        "category": "First Steps",
        createdAt: new Date(),
        updatedAt: new Date(),
        tags: ["1"]
    },
    {
        "id": "15",
        "title": "Activate Your UNI-Account",
        "description": "Use your credentials to log in and get access to university IT services.",
        "completed": false,
        "category": "Settling In",
        createdAt: new Date(),
        updatedAt: new Date(),
        tags: ["1"]
    },
    {
        "id": "16",
        "title": "Get Your Digital Semester Ticket",
        "description": "Follow the university's instructions to download and activate your Deutschlandsemesterticket on your phone.",
        "completed": false,
        "category": "Settling In",
        createdAt: new Date(),
        updatedAt: new Date(),
        tags: ["1"]
    },
    {
        "id": "17",
        "title": "Find Your Local Grocery Store",
        "description": "Locate the nearest Rewe, Edeka, or Aldi to your new home.",
        "completed": false,
        "category": "Settling In",
        createdAt: new Date(),
        updatedAt: new Date(),
        tags: ["1"]
    }
]

export const CATEGORIES = [
    "Getting started",
    "Before arrival",
    "First Steps",
    "Settling In",
    "Work",
    "Personal",
    "Urgent",
    "Low Priority"
];
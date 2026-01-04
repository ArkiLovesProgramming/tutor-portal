import type { Lesson } from '../types';

export const MOCK_LESSONS: Lesson[] = [
  // Historic lessons (December 2025)
  {
    id: "L001",
    date: "2025-12-15T14:00:00Z",
    type: "Historic",
    subject: "Minecraft Game Design - Level 1",
    students: ["Ethan", "Ava"],
    tutor: "Sarah Tan",
    status: "Completed"
  },
  {
    id: "L002",
    date: "2025-12-18T09:00:00Z",
    type: "Historic",
    subject: "Roblox Coding Basics",
    students: ["Lucas"],
    tutor: "Sarah Tan",
    status: "Completed"
  },
  {
    id: "L003",
    date: "2025-12-20T16:00:00Z",
    type: "Historic",
    subject: "Python for Kids - Introduction",
    students: ["Chloe", "Aaron"],
    tutor: "Sarah Tan",
    status: "Completed"
  },
  // Today's lessons (January 4, 2026)
  {
    id: "L004",
    date: "2026-01-04T10:00:00Z",
    type: "Upcoming",
    subject: "Minecraft Redstone Logic",
    students: ["Emma", "Noah"],
    tutor: "Sarah Tan",
    status: "Confirmed"
  },
  {
    id: "L005",
    date: "2026-01-04T14:00:00Z",
    type: "Upcoming",
    subject: "Python Game Development",
    students: ["Olivia"],
    tutor: "Sarah Tan",
    status: "Confirmed"
  },
  // Upcoming lessons (Mid to late January 2026)
  {
    id: "L006",
    date: "2026-01-08T15:00:00Z",
    type: "Upcoming",
    subject: "Roblox Game Design - Level 2",
    students: ["Ryan", "Mia"],
    tutor: "Sarah Tan",
    status: "Confirmed"
  },
  {
    id: "L007",
    date: "2026-01-10T12:00:00Z",
    type: "Upcoming",
    subject: "Website Design for Beginners",
    students: ["Sophia"],
    tutor: "Sarah Tan",
    status: "Confirmed"
  },
  {
    id: "L008",
    date: "2026-01-15T10:00:00Z",
    type: "Upcoming",
    subject: "Python Automation for Kids",
    students: ["Elijah"],
    tutor: "Sarah Tan",
    status: "Confirmed"
  },
  {
    id: "L009",
    date: "2026-01-18T16:00:00Z",
    type: "Upcoming",
    subject: "Minecraft AI Coding Adventure",
    students: ["James", "Charlotte"],
    tutor: "Sarah Tan",
    status: "Confirmed"
  },
  // Available lessons (Late January 2026)
  {
    id: "L010",
    date: "2026-01-22T11:00:00Z",
    type: "Available",
    subject: "Python for Kids - Game Projects",
    students: [],
    tutor: null,
    status: "Available"
  },
  {
    id: "L011",
    date: "2026-01-25T14:00:00Z",
    type: "Available",
    subject: "Roblox Game Design - Level 1",
    students: [],
    tutor: null,
    status: "Available"
  },
  // Available lessons (February 2026)
  {
    id: "L012",
    date: "2026-02-02T10:00:00Z",
    type: "Available",
    subject: "Minecraft Game Design - Level 2",
    students: [],
    tutor: null,
    status: "Available"
  },
  {
    id: "L013",
    date: "2026-02-05T15:00:00Z",
    type: "Available",
    subject: "Web Development Basics",
    students: [],
    tutor: null,
    status: "Available"
  },
  {
    id: "L014",
    date: "2026-02-10T09:00:00Z",
    type: "Available",
    subject: "Python for Beginners",
    students: [],
    tutor: null,
    status: "Available"
  },
  {
    id: "L015",
    date: "2026-02-15T16:00:00Z",
    type: "Available",
    subject: "Roblox Scripting Advanced",
    students: [],
    tutor: null,
    status: "Available"
  }
];

export const MOCK_USER = {
  id: "U001",
  name: "Sarah Tan",
  email: "sarah.tan@champcode.com",
  avatar: undefined
};

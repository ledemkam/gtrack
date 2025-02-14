import { Budget } from "@/lib/types";

const budgets: Budget[] = [
  {
    id: "1",
    createdAt: new Date("2023-01-10"),
    name: "Essen",
    amount: 500,
    emoji: "🍎",
    transactions: [
      {
        id: "t1",
        amount: 50,
        emoji: "🍕",
        description: "Pizzeria",
        createdAt: new Date("2023-01-12"),
        budgetName: "Essen",
        budgetId: "1",
      },
      {
        id: "t2",
        amount: 30,
        emoji: "🍞",
        description: "Bäckerei",
        createdAt: new Date("2023-01-15"),
        budgetName: "Essen",
        budgetId: "1",
      },
    ],
  },
  {
    id: "2",
    createdAt: new Date("2023-01-05"),
    name: "Verkehrsmittel",
    amount: 300,
    emoji: "🚗",
    transactions: [
      {
        id: "t3",
        amount: 60,
        emoji: "⛽",
        description: "Essence",
        createdAt: new Date("2023-01-08"),
        budgetName: "verkehrsmittel",
        budgetId: "2",
      },
      {
        id: "t4",
        amount: 15,
        emoji: "🚕",
        description: "Taxi",
        createdAt: new Date("2023-01-20"),
        budgetName: "verkehrsmittel",
        budgetId: "2",
      },
    ],
  },
  {
    id: "3",
    createdAt: new Date("2023-02-01"),
    name: "Freizeit",
    amount: 200,
    emoji: "🎉",
    transactions: [
      {
        id: "t5",
        amount: 40,
        emoji: "🎬",
        description: "Kino",
        createdAt: new Date("2023-02-03"),
        budgetName: "Freizeit",
        budgetId: "3",
      },
    ],
  },
  {
    id: "4",
    createdAt: new Date("2023-02-15"),
    name: "Gesundheit",
    amount: 150,
    emoji: "💊",
    transactions: [
      {
        id: "t6",
        amount: 45,
        emoji: "🏥",
        description: "Consultation médicale",
        createdAt: new Date("2023-02-17"),
        budgetName: "Gesundheit",
        budgetId: "4",
      },
    ],
  },
  {
    id: "5",
    createdAt: new Date("2023-03-01"),
    name: "Bildung",
    amount: 400,
    emoji: "📚",
    transactions: [
      {
        id: "t7",
        amount: 100,
        emoji: "📖",
        description: "Livres scolaires",
        createdAt: new Date("2023-03-05"),
        budgetName: "Bildung",
        budgetId: "5",
      },
    ],
  },
  {
    id: "6",
    createdAt: new Date("2023-04-01"),
    name: "Wohnen",
    amount: 600,
    emoji: "🏠",
    transactions: [
      {
        id: "t8",
        amount: 250,
        emoji: "🛋️",
        description: "Möbel",
        createdAt: new Date("2023-04-10"),
        budgetName: "Wohnen",
        budgetId: "6",
      },
    ],
  },
];

export default budgets;
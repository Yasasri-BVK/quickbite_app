export type Category = "Meals" | "Beverages" | "Snacks";

export type MenuItem = {
  id: string;
  name: string;
  category: Category;
  price: number;
  emoji: string;
  description: string;
};

export const CATEGORIES = ["All", "Meals", "Beverages", "Snacks"] as const;

export const MENU_ITEMS: MenuItem[] = [
  {
    id: "1",
    name: "Chicken Fried Rice",
    category: "Meals",
    price: 650,
    emoji: "🍛",
    description: "Wok-fried rice with chicken, egg and vegetables.",
  },
  {
    id: "2",
    name: "Chicken Kottu",
    category: "Meals",
    price: 750,
    emoji: "🥘",
    description: "Chopped roti stir-fried with chicken and spices.",
  },
  {
    id: "3",
    name: "Rice and Curry",
    category: "Meals",
    price: 500,
    emoji: "🍚",
    description: "Steamed rice with dhal, vegetables and a curry of the day.",
  },
  {
    id: "4",
    name: "Milk Tea",
    category: "Beverages",
    price: 120,
    emoji: "🍵",
    description: "Hot Ceylon tea with fresh milk.",
  },
  {
    id: "5",
    name: "Iced Coffee",
    category: "Beverages",
    price: 250,
    emoji: "🧋",
    description: "Chilled coffee with milk and ice.",
  },
  {
    id: "6",
    name: "Fresh Orange Juice",
    category: "Beverages",
    price: 300,
    emoji: "🍊",
    description: "Freshly squeezed orange juice.",
  },
  {
    id: "7",
    name: "Fish Roll",
    category: "Snacks",
    price: 150,
    emoji: "🥟",
    description: "Crispy roll filled with spicy fish and potato.",
  },
  {
    id: "8",
    name: "Egg Sandwich",
    category: "Snacks",
    price: 200,
    emoji: "🥪",
    description: "Toasted sandwich with egg and lettuce.",
  },
  {
    id: "9",
    name: "Vegetable Samosa",
    category: "Snacks",
    price: 100,
    emoji: "🔺",
    description: "Deep-fried pastry with spiced vegetable filling.",
  },
];

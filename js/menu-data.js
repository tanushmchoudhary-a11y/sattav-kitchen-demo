/**
 * SATTVA KITCHEN — Menu Catalog & Dish Data
 * Pure vegetarian Indian dishes categorized with clear descriptions, prices, and high-quality photography.
 * Easily modify, add, or update menu items and pricing here.
 */

const MENU_ITEMS = [
  // --------------------------------------------------------------------------
  // 1. NORTH INDIAN
  // --------------------------------------------------------------------------
  {
    id: "ni-1",
    name: "Paneer Butter Masala",
    category: "north-indian",
    categoryName: "North Indian",
    price: 320,
    isVeg: true,
    isFeatured: true,
    description: "Tender cottage cheese cubes simmered in a velvety, rich tomato, butter, and cashew cream gravy flavored with kasuri methi.",
    image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=800&q=80",
    tags: ["Chef Special", "Bestseller"]
  },
  {
    id: "ni-2",
    name: "Dal Makhani",
    category: "north-indian",
    categoryName: "North Indian",
    price: 280,
    isVeg: true,
    isFeatured: true,
    description: "Slow-cooked black lentils and kidney beans simmered overnight over slow charcoal with churned butter and aromatic spices.",
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80",
    tags: ["Authentic", "Popular"]
  },
  {
    id: "ni-3",
    name: "Kadai Paneer",
    category: "north-indian",
    categoryName: "North Indian",
    price: 310,
    isVeg: true,
    isFeatured: false,
    description: "Fresh paneer tossed with crunchy bell peppers, onions, and freshly ground roasted kadai masala in a thick spiced gravy.",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80",
    tags: ["Spicy"]
  },
  {
    id: "ni-4",
    name: "Royal Veg Dum Biryani",
    category: "north-indian",
    categoryName: "North Indian",
    price: 290,
    isVeg: true,
    isFeatured: true,
    description: "Long-grain fragrant basmati rice layered with garden vegetables, saffron milk, fried onions, and whole royal spices, served with raita.",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80",
    tags: ["Aromatic", "Bestseller"]
  },
  {
    id: "ni-5",
    name: "Tandoori Butter Naan",
    category: "north-indian",
    categoryName: "North Indian",
    price: 60,
    isVeg: true,
    isFeatured: false,
    description: "Soft, pillowy Indian flatbread baked in traditional clay tandoor oven, brushed generously with clarified butter.",
    image: "https://images.unsplash.com/photo-1626074353765-517a681e40be?auto=format&fit=crop&w=800&q=80",
    tags: ["Tandoor"]
  },

  // --------------------------------------------------------------------------
  // 2. SOUTH INDIAN
  // --------------------------------------------------------------------------
  {
    id: "si-1",
    name: "Mysore Masala Dosa",
    category: "south-indian",
    categoryName: "South Indian",
    price: 170,
    isVeg: true,
    isFeatured: true,
    description: "Crispy golden fermented crepe lined with spicy red garlic chutney, filled with tempered potato masala, served with coconut chutney & sambar.",
    image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=800&q=80",
    tags: ["Crispy", "Popular"]
  },
  {
    id: "si-2",
    name: "Steamed Idli Sambar (3 Pcs)",
    category: "south-indian",
    categoryName: "South Indian",
    price: 120,
    isVeg: true,
    isFeatured: false,
    description: "Soft, cloud-like steamed rice and lentil cakes served with steaming drumstick sambar and fresh coconut mint chutney.",
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80",
    tags: ["Healthy", "Light"]
  },
  {
    id: "si-3",
    name: "Crispy Medu Vada (2 Pcs)",
    category: "south-indian",
    categoryName: "South Indian",
    price: 130,
    isVeg: true,
    isFeatured: false,
    description: "Golden fried savory lentil doughnuts, crunchy on the exterior and fluffy inside, spiced with crushed peppercorns and curry leaves.",
    image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&w=800&q=80",
    tags: ["Crunchy"]
  },
  {
    id: "si-4",
    name: "Onion Tomato Uttapam",
    category: "south-indian",
    categoryName: "South Indian",
    price: 160,
    isVeg: true,
    isFeatured: false,
    description: "Thick, soft fermented savory pancake topped with finely chopped caramelized red onions, juicy tomatoes, and green chilies.",
    image: "https://images.unsplash.com/photo-1516714435131-44d6b64dc6a2?auto=format&fit=crop&w=800&q=80",
    tags: ["Traditional"]
  },

  // --------------------------------------------------------------------------
  // 3. INDO-CHINESE
  // --------------------------------------------------------------------------
  {
    id: "ic-1",
    name: "Veg Hakka Noodles",
    category: "indo-chinese",
    categoryName: "Indo-Chinese",
    price: 240,
    isVeg: true,
    isFeatured: true,
    description: "Wok-tossed noodles with shredded cabbage, crunchy carrots, bell peppers, spring onions, and light aromatic soy seasoning.",
    image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=800&q=80",
    tags: ["Wok Tossed"]
  },
  {
    id: "ic-2",
    name: "Veg Manchurian Gravy",
    category: "indo-chinese",
    categoryName: "Indo-Chinese",
    price: 250,
    isVeg: true,
    isFeatured: false,
    description: "Crisp vegetable dumplings simmered in a tangy, spicy Indo-Chinese dark garlic and ginger scallion sauce.",
    image: "https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?auto=format&fit=crop&w=800&q=80",
    tags: ["Tangy & Spicy"]
  },
  {
    id: "ic-3",
    name: "Schezwan Fried Rice",
    category: "indo-chinese",
    categoryName: "Indo-Chinese",
    price: 260,
    isVeg: true,
    isFeatured: false,
    description: "Wok-fried rice tossed with fiery house-made schezwan chili sauce, crisp seasonal vegetables, and garnished with spring onion greens.",
    image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=800&q=80",
    tags: ["Fiery"]
  },
  {
    id: "ic-4",
    name: "Chilli Paneer Dry",
    category: "indo-chinese",
    categoryName: "Indo-Chinese",
    price: 280,
    isVeg: true,
    isFeatured: true,
    description: "Crispy batter-fried paneer cubes tossed in high flame with pungent green chilies, diced onions, bell peppers, and savory sauces.",
    image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=800&q=80",
    tags: ["Popular"]
  },

  // --------------------------------------------------------------------------
  // 4. SNACKS & STARTERS
  // --------------------------------------------------------------------------
  {
    id: "sn-1",
    name: "Tandoori Paneer Tikka",
    category: "snacks",
    categoryName: "Snacks & Starters",
    price: 310,
    isVeg: true,
    isFeatured: true,
    description: "Succulent cottage cheese cubes marinated in spiced mustard oil and hung yogurt, char-grilled to perfection in clay oven.",
    image: "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=800&q=80",
    tags: ["Tandoor Smoked"]
  },
  {
    id: "sn-2",
    name: "Crispy Punjabi Samosa (2 Pcs)",
    category: "snacks",
    categoryName: "Snacks & Starters",
    price: 80,
    isVeg: true,
    isFeatured: false,
    description: "Flaky golden pastry cones stuffed with spiced potatoes, green peas, and whole coriander seeds, served with tamarind and mint chutneys.",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80",
    tags: ["Classic"]
  },
  {
    id: "sn-3",
    name: "Hara Bhara Kebab (6 Pcs)",
    category: "snacks",
    categoryName: "Snacks & Starters",
    price: 230,
    isVeg: true,
    isFeatured: false,
    description: "Nutritious pan-fried patties made with fresh spinach, green peas, mashed potatoes, aromatic spices, and roasted cashews.",
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80",
    tags: ["Healthy Choice"]
  },

  // --------------------------------------------------------------------------
  // 5. DESSERTS
  // --------------------------------------------------------------------------
  {
    id: "ds-1",
    name: "Royal Gulab Jamun (2 Pcs)",
    category: "desserts",
    categoryName: "Desserts",
    price: 110,
    isVeg: true,
    isFeatured: true,
    description: "Warm, delicate mawa dumplings soaked in cardamom and rose water infused sugar syrup, garnished with slivered pistachios.",
    image: "https://images.unsplash.com/photo-1589998059171-988d887df646?auto=format&fit=crop&w=800&q=80",
    tags: ["Warm & Sweet"]
  },
  {
    id: "ds-2",
    name: "Kesar Pista Rasmalai (2 Pcs)",
    category: "desserts",
    categoryName: "Desserts",
    price: 140,
    isVeg: true,
    isFeatured: true,
    description: "Spongy, soft cottage cheese discs steeped in thick, chilled saffron-cardamom flavored clotted milk with almond flakes.",
    image: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=800&q=80",
    tags: ["Chilled Delicacy"]
  },
  {
    id: "ds-3",
    name: "Desi Ghee Gajar Halwa",
    category: "desserts",
    categoryName: "Desserts",
    price: 160,
    isVeg: true,
    isFeatured: false,
    description: "Slow-roasted winter red carrots simmered in pure desi cow ghee, condensed milk, mawa, and crushed dry fruits.",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
    tags: ["Winter Classic"]
  },

  // --------------------------------------------------------------------------
  // 6. BEVERAGES
  // --------------------------------------------------------------------------
  {
    id: "bv-1",
    name: "Amritsari Sweet Lassi",
    category: "beverages",
    categoryName: "Beverages",
    price: 110,
    isVeg: true,
    isFeatured: true,
    description: "Rich, thick churned yogurt beverage flavored with cardamom and rose water, topped with a thick dollop of fresh malai.",
    image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80",
    tags: ["Refreshing"]
  },
  {
    id: "bv-2",
    name: "Spiced Masala Chaas",
    category: "beverages",
    categoryName: "Beverages",
    price: 70,
    isVeg: true,
    isFeatured: false,
    description: "Light, soothing buttermilk tempered with roasted cumin powder, fresh coriander, ginger, rock salt, and green chilies.",
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80",
    tags: ["Digestive"]
  },
  {
    id: "bv-3",
    name: "Fresh Mint Lime Soda",
    category: "beverages",
    categoryName: "Beverages",
    price: 90,
    isVeg: true,
    isFeatured: false,
    description: "Freshly squeezed lemon juice, crushed garden mint, and chilled sparkling soda served sweet, salted, or mixed.",
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80",
    tags: ["Cooler"]
  }
];

if (typeof Object.freeze === "function") {
  Object.freeze(MENU_ITEMS);
}

/**
 * SATTVA KITCHEN — Central Business Configuration
 * Edit this file to update restaurant details, contact information, hours, and policies.
 * No code changes needed in HTML files when updating these business settings.
 */

const RESTAURANT_CONFIG = {
  name: "Sattva Kitchen",
  tagline: "Where Indian Flavours Come Alive",
  subTagline: "Discover the richness of pure vegetarian Indian cuisine, thoughtfully prepared and beautifully served.",
  
  // WhatsApp ordering integration
  // Number must be in international format without '+' or spaces for wa.me links
  whatsAppNumber: "919167184306",
  whatsAppDisplayNumber: "+91 9167184306",
  
  // Business address & contact details (Editable placeholders)
  address: {
    street: "Plot 42, Hill Road, Near Bandra Station",
    locality: "Bandra West",
    city: "Mumbai",
    state: "Maharashtra",
    postalCode: "400050",
    fullAddress: "Plot 42, Hill Road, Bandra West, Mumbai, Maharashtra 400050"
  },
  
  // Contact & Social placeholders
  email: "connect@sattvakitchen.example",
  phone: "+91 9167184306",
  socialLinks: {
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
    whatsapp: "https://wa.me/919167184306"
  },
  
  // Operating schedule
  openingHours: {
    days: "Monday – Sunday",
    timings: "11:30 AM – 11:00 PM",
    deliveryTimings: "11:30 AM – 10:30 PM",
    isOpenToday: true
  },
  
  // Order & Delivery Settings
  currency: "₹",
  currencyCode: "INR",
  orderTypes: {
    delivery: {
      id: "delivery",
      label: "Home Delivery",
      description: "Delivered hot to your doorstep. Cash on Delivery available.",
      paymentMethod: "Cash on Delivery (COD)",
      feeNotice: "Delivery charges & distance availability to be confirmed by restaurant upon order."
    },
    takeaway: {
      id: "takeaway",
      label: "Takeaway / Self-Pickup",
      description: "Pick up freshly packed food directly from our kitchen counter.",
      paymentMethod: "Pay on Pickup",
      feeNotice: "No delivery charges apply for takeaway orders."
    }
  },
  
  // Cuisine Categories
  categories: [
    { id: "north-indian", name: "North Indian", description: "Rich gravies, tandoori breads, and fragrant basmati preparations", icon: "curry" },
    { id: "south-indian", name: "South Indian", description: "Crisp dosas, fluffy idlis, and traditional coastal spiced sambar", icon: "dosa" },
    { id: "indo-chinese", name: "Indo-Chinese", description: "Wok-tossed noodles, crunchy manchurian, and fiery schezwan delicacies", icon: "wok" },
    { id: "snacks", name: "Snacks & Starters", description: "Golden fried samosas, spiced kebabs, and authentic street savouries", icon: "snack" },
    { id: "desserts", name: "Desserts", description: "Melt-in-mouth gulab jamuns, chilled rasmalai, and warm gajar halwa", icon: "dessert" },
    { id: "beverages", name: "Beverages", description: "Thick sweet lassis, spiced masala chaas, and refreshing coolers", icon: "drink" }
  ]
};

// Freeze configuration in production to prevent unintended runtime modification
if (typeof Object.freeze === "function") {
  Object.freeze(RESTAURANT_CONFIG);
}

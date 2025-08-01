export const books = [
  {
    _id: "1",
    images: [],
    title: "The Alchemist",
    category: "Reading Books (Novels)",
    condition: "Excellent",
    classType: "B.Com",
    subject: "Fiction",
    price: 300,
    author: "Paulo Coelho",
    edition: "25th Anniversary Edition",
    description:
      "A philosophical book about a shepherd's journey to realize his dreams.",
    finalPrice: 250,
    shippingCharge: 50,
    paymentMode: "UPI",
    paymentDetails: {
      upiId: "example@upi",
    },
    createdAt: new Date("2024-01-01"),
    seller: { name: "John Doe", contact: "1234567890" },
  },
  {
    _id: "2",
    images: [],
    title: "7 Habits of Highly Effective People",
    category: "Reading Books (Business)",
    condition: "Good",
    classType: "MBA",
    subject: "Self-Help",
    price: 500,
    author: "Stephen R. Covey",
    edition: "30th Anniversary Edition",
    description: "A guide to personal and professional effectiveness.",
    finalPrice: 450,
    shippingCharge: 30,
    paymentMode: "Bank Account",
    paymentDetails: {
      bankDetails: {
        accountNumber: "1234567890123456",
        ifscCode: "ABC1234567",
        bankName: "XYZ Bank",
      },
    },
    createdAt: new Date("2024-01-02"),
    seller: { name: "Jane Smith", contact: "0987654321" },
  },
  {
    _id: "3",
    images: [],
    title: "Ignited Minds",
    category: "Reading Books (Motivation)",
    condition: "Fair",
    classType: "B.Tech",
    subject: "Inspiration",
    price: 400,
    author: "APJ Abdul Kalam",
    edition: "1st Edition",
    description: "An inspiring book aimed at the youth of India.",
    finalPrice: 350,
    shippingCharge: 40,
    paymentMode: "UPI",
    paymentDetails: {
      upiId: "kalam@upi",
    },
    createdAt: new Date("2024-01-03"),
    seller: { name: "Rahul Gupta", contact: "1122334455" },
  },
  {
    _id: "4",
    images: [],
    title: "Introduction to Algorithms",
    category: "College Books (Higher Education Textbooks)",
    condition: "Excellent",
    classType: "M.Tech",
    subject: "Computer Science",
    price: 1200,
    author: "Thomas H. Cormen et al.",
    edition: "3rd Edition",
    description: "A comprehensive introduction to algorithms.",
    finalPrice: 1100,
    shippingCharge: 60,
    paymentMode: "Bank Account",
    paymentDetails: {
      bankDetails: {
        accountNumber: "6543210987654321",
        ifscCode: "XYZ9876543",
        bankName: "ABC Bank",
      },
    },
    createdAt: new Date("2024-01-04"),
    seller: { name: "Alice Brown", contact: "2233445566" },
  },
  {
    _id: "5",
    images: [],
    title: "Data Structures and Algorithms Made Easy",
    category: "College Books (Higher Education Textbooks)",
    condition: "Good",
    classType: "B.Sc",
    subject: "Computer Science",
    price: 800,
    author: "Narasimha Karumanchi",
    edition: "2nd Edition",
    description: "A comprehensive guide to data structures and algorithms.",
    finalPrice: 700,
    shippingCharge: 50,
    paymentMode: "UPI",
    paymentDetails: { upiId: "data.structures@upi" },
    createdAt: new Date("2024-01-05"),
    seller: { name: "Michael Johnson", contact: "3344556677" },
  },
  {
    _id: "6",
    images: [],
    title: "The Great Gatsby",
    category: "Reading Books (Novels)",
    condition: "Excellent",
    classType: "12th",
    subject: "Literature",
    price: 450,
    author: "F. Scott Fitzgerald",
    edition: "New Edition",
    description: "A classic novel exploring themes of wealth and society.",
    finalPrice: 400,
    shippingCharge: 20,
    paymentMode: "Bank Account",
    paymentDetails: {
      bankDetails: {
        accountNumber: "7890123456789012",
        ifscCode: "LMN4567890",
        bankName: "DEF Bank",
      },
    },
    createdAt: new Date("2024-01-06"),
    seller: { name: "Emily Davis", contact: "4455667788" },
  },
  {
    _id: "7",
    images: [],
    title: "Thinking, Fast and Slow",
    category: "Reading Books (Psychology)",
    condition: "Good",
    classType: "MBA",
    subject: "Psychology",
    price: 600,
    author: "Daniel Kahneman",
    edition: "1st Edition",
    description: "An exploration of how we think and make decisions.",
    finalPrice: 550,
    shippingCharge: 25,
    paymentMode: "UPI",
    paymentDetails: { upiId: "thinking.fast@upi" },
    createdAt: new Date("2024-01-07"),
    seller: { name: "Sarah Wilson", contact: "5566778899" },
  },
  {
    _id: "8",
    images: [],
    title: "The Catcher in the Rye",
    category: "Reading Books (Novels)",
    condition: "Fair",
    classType: "11th",
    subject: "Literature",
    price: 350,
    author: "J.D. Salinger",
    edition: "Revised Edition",
    description: "A novel about teenage rebellion and alienation.",
    finalPrice: 300,
    shippingCharge: 15,
    paymentMode: "Bank Account",
    paymentDetails: {
      bankDetails: {
        accountNumber: "1234567890123456",
        ifscCode: "OPQ1234567",
        bankName: "GHI Bank",
      },
    },
    createdAt: new Date("2024-01-08"),
    seller: { name: "David Lee", contact: "6677889900" },
  },
  {
    _id: "9",
    images: [],
    title: "Becoming",
    category: "Reading Books (Biography)",
    condition: "Excellent",
    classType: "MBA",
    subject: "Biography",
    price: 500,
    author: "Michelle Obama",
    edition: "1st Edition",
    description: "The memoir of the former First Lady of the United States.",
    finalPrice: 450,
    shippingCharge: 20,
    paymentMode: "UPI",
    paymentDetails: { upiId: "becoming@upi" },
    createdAt: new Date("2024-01-09"),
    seller: { name: "Laura Green", contact: "7788990011" },
  },
  {
    _id: "10",
    images: [],
    title: "Sapiens",
    category: "Reading Books (History)",
    condition: "Good",
    classType: "Ph.D",
    subject: "History",
    price: 700,
    author: "Yuval Noah Harari",
    edition: "1st Edition",
    description: "A brief history of humankind.",
    finalPrice: 650,
    shippingCharge: 35,
    paymentMode: "Bank Account",
    paymentDetails: {
      bankDetails: {
        accountNumber: "2345678901234567",
        ifscCode: "RST9876543",
        bankName: "JKL Bank",
      },
    },
    createdAt: new Date("2024-01-10"),
    seller: { name: "Chris Brown", contact: "8899001122" },
  },
];

export const filters = {
  condition: ["Excellent", "Good", "Fair"],
  category: [
    "College Books (Higher Education Textbooks)",
    "Exam/Test Preparation Books",
    "Reading Books (Novels, Children, Business, Literature, History, etc.)",
    "School Books (up to 12th)",
  ],
  classType: [
    "B.Tech",
    "B.Sc",
    "B.Com",
    "BCA",
    "MBA",
    "M.Tech",
    "M.Sc",
    "Ph.D",
    "12th",
    "11th",
    "10th",
    "9th",
    "8th",
    "7th",
    "6th",
    "5th",
  ],
};

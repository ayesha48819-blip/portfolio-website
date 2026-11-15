export const CONFIG = {
  whatsapp: "971582085220",
  email: "globalbusinessmanager4@gmail.com",
  linkedin: "https://www.linkedin.com/in/ayesha-nadeem-b378413a2/",
  github: "https://github.com/ayesha48819-blip",
};

// Same prices in US dollars for international and Dubai clients (approx. 1 USD = 280 PKR)
export const PRICES_USD = {
  types: { landing: [100, 125], business: [250, 500], webapp: [500, 750] },
  addons: { seo: [20, 35], contact: [20, 40], admin: [35, 90] },
};
export const NAMES = {
  landing: "Landing page", business: "Business website", webapp: "Web app",
  seo: "On-page SEO", contact: "Contact form and WhatsApp button", admin: "Admin panel",
};

export const STORY = [
  "I'm Ayesha, a web developer from Lahore who builds websites small businesses can be proud of.",
  "I studied Computer Science in Matric (1014 out of 1100) and in 2026 started a six-month Full Stack course at Arfa Software Technology Park, where I learned the MERN stack.",
  "I focus on three things: careful work, clear communication and clean delivery. I explain things in plain language, show you a design before I build it, and keep you updated until your site is live.",
];
export const SPECIALITY = "Mobile-first websites for small businesses, with a WhatsApp button so customers can reach you in one tap.";
export const BEST_FIT = ["Local shops and bakeries", "Boutiques and clothing brands", "Tuition academies and schools", "Clinics and service providers", "Freelancers who need a portfolio"];

export const TESTIMONIALS = [];

export const PROJECTS = [
  { label: "Demo project", title: "Restaurant Landing Page",
    text: "A modern, responsive website for a restaurant with a menu section, a reservation form and a mobile-friendly layout.",
    tech: ["HTML", "CSS", "JavaScript"], image: "/images/restaurant.jpg", live: "/demos/restaurant.html", code: "" },
  { label: "Demo project", title: "Online Store UI",
    text: "A clean e-commerce interface with product cards, category filter, a working shopping cart and a free-delivery progress bar.",
    tech: ["HTML", "CSS", "JavaScript"], image: "/images/store.jpg", live: "/demos/store.html", code: "" },
  { label: "Demo project", title: "Small Business Website",
    text: "A professional website for a small home-services business, with service cards, a quote request form and an FAQ.",
    tech: ["HTML", "CSS", "JavaScript"], image: "/images/business.jpg", live: "/demos/business.html", code: "" },
  { label: "Demo project", title: "Hair Salon Website",
    text: "A modern, responsive website for a hair salon with services, stylists, a before/after slider and a booking drawer.",
    tech: ["React", "Tailwind CSS", "React Router"], image: "images/haircut.jpg",
    live: "https://hair-salon-sigma-sooty.vercel.app", code: "https://github.com/ayesha48819-blip/Hair-cut" },
  { label: "Course project", title: "Student Management System",
    text: "A MERN stack app with full CRUD: add, view, edit and delete student records, stored in MongoDB.",
    tech: ["React", "Node.js", "Express", "MongoDB"], image: "images/student.jpg",
    live: "https://student-management-system-m-murex.vercel.app/", code: "https://github.com/ayesha48819-blip/Student-Management-System" },
];

ToTo Company - Export Business Website
A modern, full-stack Next.js 14 website for an export company with Firebase integration, admin dashboard, and mobile-first design.

🚀 Features
✅ Modern Tech Stack: Next.js 14, TypeScript, Tailwind CSS, Firebase
✅ Responsive Design: Mobile-first, works perfectly on all devices
✅ Product Management: Full CRUD operations via admin dashboard
✅ Image Uploads: Firebase Storage integration for product images
✅ Contact Form: EmailJS integration for client inquiries
✅ Smooth Animations: Framer Motion for professional transitions
✅ SEO Optimized: Proper metadata and semantic HTML
✅ Admin Dashboard: Protected route with password authentication
✅ Client Reviews: Showcase testimonials and client logos
📋 Prerequisites
Before you begin, ensure you have:

Node.js 18+ installed
npm or yarn package manager
Firebase account
EmailJS account (for contact form)
Git (optional, for version control)
🛠️ Installation Guide
Step 1: Create Next.js Project
bash
npx create-next-app@latest toto-company --typescript --tailwind --app --no-src-dir
cd toto-company
Step 2: Install Dependencies
bash
npm install firebase framer-motion lucide-react emailjs-com react-hot-toast
Step 3: Set Up Project Structure
Create the following folders and files:

toto-company/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   ├── products/
│   │   ├── page.tsx
│   │   └── [id]/page.tsx
│   ├── clients/
│   │   └── page.tsx
│   ├── contact/
│   │   └── page.tsx
│   └── admin/
│       ├── page.tsx
│       └── dashboard/
│           └── page.tsx
├── components/
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── Carousel.tsx
│   ├── ProductCard.tsx
│   ├── ReviewCard.tsx
│   └── AdminForm.tsx
├── lib/
│   ├── firebase.ts
│   └── auth.ts
├── types/
│   └── index.ts
├── public/
│   └── images/
│       ├── hero1.jpg
│       ├── hero2.jpg
│       └── hero3.jpg
└── .env.local
Copy all the code files I've provided into their respective locations.

🔥 Firebase Setup
1. Create Firebase Project
Go to Firebase Console
Click "Add project"
Name it "toto-company"
Disable Google Analytics (optional)
Click "Create project"
2. Enable Firestore Database
In Firebase Console, click "Firestore Database"
Click "Create database"
Choose "Start in production mode"
Select your preferred location
Click "Enable"
3. Set Up Firestore Collections
Create these collections manually or they'll be created automatically when you add data:

products - stores product information
clients - stores client logos
reviews - stores client testimonials
4. Configure Firestore Security Rules
In Firestore, go to "Rules" tab and paste:

javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
Note: For production, you'll want to implement proper authentication instead of allowing all reads.

5. Enable Firebase Storage
In Firebase Console, click "Storage"
Click "Get started"
Accept default security rules
Click "Done"
6. Configure Storage Security Rules
In Storage, go to "Rules" tab and paste:

javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /products/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
7. Get Firebase Configuration
Go to Project Settings (gear icon)
Scroll down to "Your apps"
Click the web icon (</>)
Register app name: "toto-company-web"
Copy the configuration object
📧 EmailJS Setup
1. Create EmailJS Account
Go to EmailJS
Sign up for a free account
Verify your email
2. Add Email Service
Go to "Email Services"
Click "Add New Service"
Choose your email provider (Gmail recommended)
Follow the connection steps
Note your Service ID
3. Create Email Template
Go to "Email Templates"
Click "Create New Template"
Use this template:
Subject: New Contact Form Submission from {{from_name}}

From: {{from_name}}
Email: {{from_email}}

Message:
{{message}}
Note your Template ID
4. Get Public Key
Go to "Account" → "General"
Copy your Public Key
⚙️ Environment Configuration
Create .env.local in your project root:

env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# EmailJS Configuration
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_xxxxxxx
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_xxxxxxx
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key

# Admin Password
NEXT_PUBLIC_ADMIN_PASSWORD=ToTo_Admin_2025
⚠️ Important: Never commit .env.local to Git!

🎨 Customization
Change Colors
Edit tailwind.config.ts:

typescript
theme: {
  extend: {
    colors: {
      primary: "#1a1a1a",    // Main text color
      secondary: "#f5f5f5",  // Background color
      accent: "#4a9eff",     // Accent color (buttons, links)
    },
  },
},
Add Placeholder Images
Place images in public/images/:

hero1.jpg, hero2.jpg, hero3.jpg - Homepage carousel
placeholder.jpg - Fallback product image
Update Company Information
Edit contact details in:

components/Footer.tsx
app/contact/page.tsx
🏃 Running Locally
Development Mode
bash
npm run dev
Open http://localhost:3000

Build for Production
bash
npm run build
npm start
🔐 Admin Access
Navigate to /admin
Enter password: ToTo_Admin_2025 (or your custom password)
Manage products from the dashboard
Admin Features:
✅ Add new products
✅ Edit existing products
✅ Delete products
✅ Upload multiple images per product
✅ Manage product categories
🚀 Deployment to Vercel
Option 1: Deploy via GitHub (Recommended)
Create GitHub Repository
bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/toto-company.git
   git push -u origin main
Deploy to Vercel
Go to vercel.com
Click "New Project"
Import your GitHub repository
Configure project:
Framework Preset: Next.js
Root Directory: ./
Add Environment Variables (copy from .env.local)
Click "Deploy"
Your site will be live at: https://your-project.vercel.app
Option 2: Deploy via Vercel CLI
bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel

# Follow prompts and add environment variables when asked
Post-Deployment
Add Environment Variables in Vercel Dashboard
Go to Project Settings
Click "Environment Variables"
Add all variables from .env.local
Redeploy if needed
Set Up Custom Domain (Optional)
Go to Project Settings → Domains
Add your custom domain
Update DNS records as instructed
📱 Testing Checklist
Before going live, test:

✅ All pages load correctly
✅ Navigation works on mobile
✅ Product images display properly
✅ Contact form sends emails
✅ Admin login works
✅ Product CRUD operations work
✅ Image uploads successful
✅ Responsive design on all devices
🐛 Troubleshooting
Firebase Connection Issues
Problem: "Firebase not initialized" error

Solution:

Check .env.local has correct Firebase credentials
Restart dev server after adding env variables
Ensure NEXT_PUBLIC_ prefix is used
Image Upload Fails
Problem: Images won't upload to Firebase Storage

Solution:

Check Storage security rules allow writes
Verify storage bucket name in Firebase config
Check file size (Firebase free tier has limits)
Contact Form Not Sending
Problem: Form submits but no email received

Solution:

Verify EmailJS credentials in .env.local
Check EmailJS dashboard for quota limits
Ensure template variables match: {{from_name}}, {{from_email}}, {{message}}
Admin Dashboard Not Loading
Problem: Redirects to login even after entering password

Solution:

Clear browser localStorage
Check password matches NEXT_PUBLIC_ADMIN_PASSWORD
Try incognito mode
Build Errors on Vercel
Problem: Build fails with TypeScript errors

Solution:

Run npm run build locally first
Fix any TypeScript errors
Ensure all dependencies are in package.json
📊 Database Structure
Products Collection
javascript
{
  id: "auto-generated",
  name: "Red Potato",
  category: "Fresh Vegetables",
  description: "Premium red potatoes...",
  origin: "Bangladesh",
  packaging: "10kg mesh bag",
  shipping: "CFR or CIF",
  moq: "20 metric tons",
  certifications: ["GAP", "ISO 9001"],
  images: ["url1", "url2", "url3"],
  createdAt: Timestamp
}
Clients Collection
javascript
{
  id: "auto-generated",
  name: "Company Name",
  logo: "firebase_storage_url",
  createdAt: Timestamp
}
Reviews Collection
javascript
{
  id: "auto-generated",
  clientName: "John Doe",
  companyName: "ABC Imports",
  review: "Excellent service...",
  createdAt: Timestamp
}
🔒 Security Best Practices
Never expose API keys: Use environment variables
Implement proper auth: The current admin system is basic; consider Firebase Auth for production
Rate limiting: Add rate limiting to contact form
Input validation: Validate all form inputs
HTTPS only: Vercel provides this automatically
Regular backups: Export Firestore data regularly
🎯 Next Steps After Deployment
Add Real Content
Replace placeholder images
Add actual products via admin dashboard
Update company information
SEO Optimization
Add sitemap.xml
Create robots.txt
Add meta descriptions to all pages
Submit to Google Search Console
Analytics
Add Google Analytics
Set up conversion tracking
Monitor user behavior
Performance
Optimize images (use WebP format)
Enable caching
Monitor Core Web Vitals
Additional Features (Optional)
Multi-language support
Product search functionality
Export catalog as PDF
WhatsApp chat integration
📞 Support
For issues or questions:

Check Firebase Console for database/storage issues
Check Vercel Dashboard for deployment logs
Check browser console for client-side errors
Review EmailJS dashboard for email delivery status
📄 License
This project is private and proprietary to ToTo Company.

🙏 Credits
Built with:

Next.js
Firebase
Tailwind CSS
Framer Motion
Lucide Icons



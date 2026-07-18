# 🚀 YouthConnect Demo - Quick Start Guide

## ⚡ Get Started in 5 Minutes

### Step 1: Navigate to the App
```bash
cd apps/web
```

### Step 2: Start the Development Server
```bash
npm run dev
```
Server will run on http://localhost:3000 (or 3001 if port is busy)

### Step 3: Open the Demo Workflow
Visit: **http://localhost:3000/demo-workflow**

This page shows:
- ✅ All 12 workflow steps
- ✅ Key features overview
- ✅ Technical stack
- ✅ Quick links to signup and login

---

## 🎯 Demo Workflow Checklist

### 👤 Citizen Flow (5-10 minutes)
- [ ] Navigate to `/signup`
- [ ] Create account with email
- [ ] Login with credentials
- [ ] Go to `/dashboard`
- [ ] See available programs
- [ ] Click "Apply" on a program
- [ ] Fill application form:
  - Business Name: "TechSolutions Morocco"
  - Description: "Your business idea"
  - Target Market: "Youth entrepreneurs"
  - Experience: "5 years"
  - Motivation: "To grow my business"
- [ ] Upload documents (can use any file)
- [ ] Submit application
- [ ] ✅ Status changes to "submitted"

### 👨‍💼 Admin Flow (5 minutes)
- [ ] Open another browser/incognito window
- [ ] Go to `/signup`
- [ ] Create admin account
- [ ] Login
- [ ] Navigate to `/dashboard/admin/applications`
- [ ] See pending applications
- [ ] Click "Review"
- [ ] View applicant details
- [ ] Add review notes
- [ ] Click "Approve Application"
- [ ] ✅ Status changes to "approved"

### 🔔 Notification Check
- [ ] Go back to citizen account
- [ ] Check notifications in sidebar
- [ ] See "Application Approved" notification
- [ ] ✅ Notification appears

### 📅 Appointment Booking (2 minutes)
- [ ] In citizen account, click approved application
- [ ] Scroll to "Book an Appointment"
- [ ] Select appointment type
- [ ] Pick a future date and time
- [ ] Add optional notes
- [ ] Click "Book Appointment"
- [ ] ✅ Appointment confirmed with notification

---

## 📍 Key URLs

| Page | URL | Purpose |
|------|-----|---------|
| Demo Overview | `/demo-workflow` | See all 12 steps |
| Signup | `/signup` | Create new account |
| Login | `/login` | Sign in |
| Citizen Dashboard | `/dashboard` | View programs & applications |
| My Applications | `/dashboard/applications` | List all applications |
| Application Detail | `/dashboard/applications/[id]` | View single application |
| Admin Dashboard | `/dashboard/admin/applications` | Review pending apps |
| Admin Review | `/dashboard/admin/applications/[id]` | Review single app |

---

## 🧪 Test Data (Pre-Configured)

### Organizations
- **Youth Entrepreneurship Center - Casablanca** (Active)

### Programs (Auto-populated)
1. **Digital Skills Bootcamp**
   - Duration: 12 weeks
   - Capacity: 50 spots
   - Location: Casablanca

2. **Business Incubation Program**
   - Duration: 6 months
   - Capacity: 25 spots
   - Location: Casablanca

3. **Green Energy Initiative**
   - Duration: 8 weeks
   - Capacity: 30 spots
   - Location: Fez

### Cities (Pre-seeded)
- Casablanca
- Fez
- Marrakech

---

## 💾 Database Setup

Database is already configured in Supabase with:
- ✅ All tables created
- ✅ Row-Level Security policies
- ✅ Triggers for `updated_at`
- ✅ Indexes for performance
- ✅ Demo data (organizations, programs, cities)

No additional setup needed!

---

## 🎨 Demo Application Form

Use these values to test:

```
Business Name: TechSolutions Morocco
Business Description: AI-powered retail solutions for small and medium enterprises
Target Market: SMEs and retail businesses in Morocco
Years of Experience: 5
Motivation: I want to scale my business and help other entrepreneurs succeed
```

---

## 📤 File Upload Test

Accepted file types:
- PDF
- DOC, DOCX
- XLS, XLSX
- JPG, JPEG, PNG

Document types to select:
- CV / Resume
- Identification Document
- Business License
- Business Plan
- Financial Statements
- Supporting Documents

---

## 🔔 Notifications

Notifications are automatically created for:
1. **Application Submitted** - When citizen submits application
2. **Application Approved** - When admin approves application
3. **Application Rejected** - When admin rejects application
4. **Appointment Confirmed** - When citizen books appointment

Check the notifications panel in the top-right corner!

---

## ⚙️ Environment Variables

Make sure `.env.local` has:
```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

If missing, the app won't connect to the database.

---

## 🐛 Troubleshooting

### App won't start
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Can't login
- Verify email is correct
- Check password (min 8 characters)
- Clear browser cookies and retry

### Documents not uploading
- Check file size (max 100MB)
- Verify file type is supported
- Check Supabase Storage bucket exists

### No notifications
- Refresh the page
- Check you're logged in
- Verify browser console for errors

### Admin dashboard shows no applications
- Verify you logged in as different user
- Check citizen submitted an application first
- Go to `/dashboard/applications` in citizen account to verify

---

## 🎬 Screen Recording Tips

To record the demo:
1. Open `/demo-workflow` page
2. Use browser DevTools to set mobile view (optional)
3. Record browser with two windows:
   - Left: Citizen account
   - Right: Admin account
4. Follow the checklist above
5. Talk through each step

---

## 📊 What Gets Created

When you complete the demo:
- ✅ 1 new user account (citizen)
- ✅ 1 application record
- ✅ Up to 3 document records
- ✅ 3+ notification records
- ✅ 1 appointment record
- ✅ Audit logs for each action

All data persists in Supabase database!

---

## ✨ Key Features to Highlight

Show your stakeholders:
1. **Multi-step form** with validation
2. **Document upload** to cloud storage
3. **Real-time notifications** system
4. **Admin review panel** with approval/rejection
5. **Appointment calendar** integration
6. **Role-based dashboards** (citizen vs admin)
7. **Application status tracking** with timestamps
8. **Full workflow automation**

---

## 🎓 Code Highlights

Show developers:
- **Server Components** - All pages use Server Components
- **Server Actions** - `'use server'` mutations
- **Type Safety** - Full TypeScript coverage
- **Reusable Components** - Button, Card, Form components
- **Clean Architecture** - Separation of concerns
- **Database Queries** - Type-safe queries.ts
- **Security** - RLS policies, input validation

---

## 🎉 Success Criteria

You've successfully completed the demo when:
- ✅ Citizen account created
- ✅ Application submitted (status: submitted)
- ✅ Admin reviewed application
- ✅ Application approved (status: approved)
- ✅ Notification received
- ✅ Appointment booked (status: scheduled)
- ✅ Appointment confirmation received

**Estimated time: 15-20 minutes for full flow** ⏱️

---

## 💡 Tips

- **Use two browsers** - One for citizen, one for admin
- **Slow down** - Click through slowly to see state changes
- **Check notifications** - Bell icon in top-right updates in real-time
- **Explain each step** - Talk about what's happening at each stage
- **Show the database** - Open Supabase console to show data being created
- **Mention the tech** - Next.js 15, React 19, Supabase, TypeScript

---

## 🚀 Ready to Go!

Everything is set up and ready to demo. Just:
1. Run `npm run dev`
2. Go to `/demo-workflow`
3. Follow the checklist above
4. Enjoy! 🎉

For detailed documentation, see `DEMO_SUMMARY.md` and `IMPLEMENTATION.md`

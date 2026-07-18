# YouthConnect Demo Workflow - Implementation Guide

## 🎯 Overview

This is a complete end-to-end demonstration of YouthConnect, a government SaaS platform for Youth Entrepreneurship Centers in Morocco. The implementation showcases a 12-step workflow from citizen registration to appointment booking.

## 📋 Workflow Steps

### Phase 1: Authentication (Steps 1-3)
1. **Citizen registers** - Creates account via `/signup`
2. **Citizen logs in** - Authenticates via `/login`
3. **Dashboard appears** - Views `/dashboard` with available programs

### Phase 2: Application (Steps 4-7)
4. **Clicks Apply** - Selects a program to apply for
5. **Fills form** - Completes application form with business details
6. **Uploads documents** - Submits CV, ID, business plan, etc.
7. **Submits application** - Status becomes "submitted"

### Phase 3: Admin Review (Steps 8-10)
8. **Admin logs in** - Reviews pending applications
9. **Admin reviews** - Examines documents and application details
10. **Admin approves** - Updates status to "approved" (or rejects)

### Phase 4: Citizen Sees Approval (Step 11)
11. **Receives notification** - In-app notification of approval

### Phase 5: Appointment Booking (Steps 12-13)
12. **Books appointment** - Schedules mentor meeting or training
13. **Confirmation** - Receives appointment confirmation notification

## 🗂️ Project Structure

```
apps/web/src/
├── app/
│   ├── demo-workflow/           # Demo showcase page
│   ├── (dashboard)/
│   │   └── dashboard/
│   │       ├── (citizen)/
│   │       │   └── applications/
│   │       │       ├── page.tsx          # List applications
│   │       │       ├── [id]/
│   │       │       │   └── page.tsx      # View application details
│   │       │       └── new/
│   │       │           └── page.tsx      # Create new application
│   │       └── (admin)/
│   │           └── applications/
│   │               ├── page.tsx          # Admin review dashboard
│   │               └── [id]/
│   │                   └── page.tsx      # Admin review details
│   ├── (auth)/
│   │   ├── login/
│   │   ├── signup/
│   │   └── ...
│   └── layout.tsx
├── components/
│   ├── button.tsx               # Reusable Button component
│   ├── card.tsx                 # Reusable Card components
│   ├── form.tsx                 # Form field components
│   ├── status-badge.tsx         # Status display component
│   └── ...
├── features/
│   ├── applications/
│   │   ├── application-form.tsx       # Multi-step form
│   │   ├── application-review.tsx     # Admin review panel
│   │   ├── citizen-dashboard.tsx      # Citizen dashboard
│   │   ├── admin-applications-list.tsx # Admin list view
│   │   ├── document-upload.tsx        # File upload component
│   │   └── ...
│   ├── appointments/
│   │   └── appointment-booking.tsx    # Booking form
│   ├── notifications/
│   │   ├── notification-bell.tsx      # Bell icon with badge
│   │   ├── notification-item.tsx      # Individual notification
│   │   └── notifications-list.tsx     # Notifications panel
│   └── ...
└── lib/
    ├── db/
    │   ├── queries.ts           # Server-side queries
    │   └── mutations.ts         # Server actions
    ├── supabase/
    ├── auth/
    └── utils.ts
```

## 📦 Key Components Created

### Reusable Components
- **Button** - Primary, secondary, danger, success variants
- **Card** - Base card with header, content, footer
- **Form** - Input, textarea, select, label, error, helper components
- **StatusBadge** - Color-coded status display

### Feature Components

#### Applications
- `ApplicationForm` - Multi-step form for citizen applications
- `DocumentUpload` - File upload with Supabase Storage integration
- `ApplicationReview` - Admin review and decision panel
- `CitizenDashboard` - Overview of citizen applications
- `AdminApplicationsList` - List of pending applications for review

#### Appointments
- `AppointmentBooking` - Calendar-based appointment scheduling

#### Notifications
- `NotificationBell` - Bell icon with unread count
- `NotificationItem` - Individual notification display
- `NotificationsList` - Panel showing all notifications

## 🔄 Data Flow

### Create Application
```
Citizen fills form
    ↓
submitApplication() server action
    ↓
Create application record in DB
    ↓
Create notification for applicant
    ↓
Redirect to dashboard
```

### Admin Review
```
Admin clicks Review
    ↓
Load application details with documents
    ↓
Admin adds notes & decision
    ↓
approveApplication() or rejectApplication() server action
    ↓
Create notification for applicant
    ↓
Redirect to admin list
```

### Book Appointment
```
Citizen books appointment
    ↓
bookAppointment() server action
    ↓
Create appointment record
    ↓
Create notification for applicant
    ↓
Show confirmation
```

## 🗄️ Database Schema

### Core Tables
- **organizations** - Tenant/organization
- **programs** - Programs offered by organization
- **cities** - Service areas
- **applications** - Application submissions
- **documents** - Uploaded files
- **appointments** - Scheduled meetings
- **notifications** - User notifications
- **audit_logs** - Activity tracking

### Key Relationships
```
organization
├── programs
├── cities
├── applications
│   ├── documents
│   └── appointments
└── notifications
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Supabase account
- Environment variables configured

### Setup

1. **Install dependencies**
```bash
cd apps/web
npm install
```

2. **Create Supabase tables** (if not already created)
```bash
# Migrations are in supabase/migrations/
# Apply via Supabase dashboard or CLI
```

3. **Seed demo data** (Optional)
- Execute the SQL from `supabase/migrations/20260717120001_seed_demo_data.sql`
- Replace UUIDs with actual user IDs from Supabase Auth

4. **Configure environment variables** in `.env.local`
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

5. **Run the application**
```bash
npm run dev
```

6. **Access the demo**
- Navigate to `http://localhost:3000/demo-workflow`
- Start the 12-step demo flow

## 📍 Key Pages

### Public Pages
- `/` - Homepage
- `/signup` - Registration
- `/login` - Authentication
- `/demo-workflow` - Complete demo showcase

### Citizen Pages (Authenticated)
- `/dashboard` - Main dashboard
- `/dashboard/applications` - All applications
- `/dashboard/applications/[id]` - Application details
- `/dashboard/applications/new` - New application form

### Admin Pages (Authenticated)
- `/dashboard/admin/applications` - Review applications list
- `/dashboard/admin/applications/[id]` - Review single application

## 🔐 Security Features

- **Row-Level Security** - Supabase RLS policies restrict data access
- **Server-side validation** - All mutations use server actions
- **Authentication required** - Protected routes redirect to login
- **File upload security** - Supabase Storage with browser-level auth
- **Audit logging** - All actions logged for compliance

## 🎨 Design System

### Colors
- Primary: Cyan (`cyan-500`)
- Success: Emerald (`emerald-500`)
- Warning: Amber (`amber-500`)
- Danger: Rose (`rose-500`)
- Neutral: Slate (`slate-*`)

### Status Colors
```
- draft: slate
- submitted: cyan
- under_review: amber
- approved: emerald
- rejected: rose
- pending: amber
```

## 📱 Responsive Design

All components are mobile-first and responsive:
- Mobile: Single column
- Tablet (md): 2 columns
- Desktop (lg): 3 columns

## 🧪 Demo Workflow

### For Citizens
1. Go to `/signup` and create account
2. Go to `/dashboard` and browse programs
3. Click "Apply" on a program
4. Fill application form
5. Upload documents
6. Submit application
7. Wait for admin review
8. Check notifications for approval
9. Book appointment when approved

### For Admins
1. Go to `/signup` and create admin account
2. Go to `/dashboard/admin/applications`
3. See pending applications
4. Click "Review" on an application
5. Review applicant info and documents
6. Add notes and approve/reject
7. Applicant receives notification

## 🔧 Server Actions

All mutations are server actions in `lib/db/mutations.ts`:

- `createApplication()` - Start new application
- `submitApplication()` - Submit form and documents
- `approveApplication()` - Admin approval
- `rejectApplication()` - Admin rejection
- `uploadDocument()` - Upload file to Supabase
- `bookAppointment()` - Schedule appointment
- `markNotificationAsRead()` - Clear notification

## 📊 Database Queries

Server-side queries in `lib/db/queries.ts`:

- `getCurrentUser()` - Get authenticated user
- `getUserApplications()` - Get user's applications
- `getApplicationById()` - Get single application
- `getOrganizationApplications()` - Get org applications
- `getPrograms()` - Get available programs
- `getUserNotifications()` - Get user notifications
- `getUserAppointments()` - Get user appointments

## 🌐 API Endpoints

Existing API endpoints:
- `GET /api/applications` - List applications
- `POST /api/applications` - Create application
- `GET /api/programs` - List programs
- `POST /api/programs` - Create program
- `GET /api/organizations` - List organizations

## 📝 Form Validations

### Application Form
- Business name: Required, text
- Business description: Required, 50+ characters
- Target market: Required, text
- Years of experience: Required, 0-50
- Motivation: Required, 100+ characters

### Document Upload
- Supported types: PDF, DOC, DOCX, XLS, XLSX, JPG, PNG
- Required document types: ID, CV, Business Plan
- Max file size: Supabase default (100MB)

### Appointment Booking
- Date: Future date only
- Time: Business hours
- Type: Consultation, Mentor, Training, etc.
- Duration: 1 hour default

## 🎯 Demo Data

Pre-seeded organizations and programs:
- **Organization**: "Youth Entrepreneurship Center - Casablanca"
- **Programs**:
  - Digital Skills Bootcamp (50 spots, 12 weeks)
  - Business Incubation Program (25 spots, 6 months)
  - Green Energy Initiative (30 spots, 8 weeks)

## 🐛 Testing Tips

1. **Test complete flow** - Go through all 12 steps in one session
2. **Use two browsers** - One for citizen, one for admin
3. **Check notifications** - Verify notifications appear at each step
4. **Test file upload** - Upload various document types
5. **Test rejection** - Admin reject and see notification
6. **Test appointment** - Approved applicant books appointment

## 📚 Documentation Files

- `IMPLEMENTATION.md` - This file
- `WORKFLOW.md` - Detailed workflow documentation
- `API.md` - API endpoint documentation
- `DATABASE.md` - Database schema reference

## 🚨 Known Limitations

1. Document storage uses Supabase Storage (requires bucket configuration)
2. Email notifications not configured (in-app only)
3. Demo uses mock data (replace with real organization IDs)
4. No payment processing
5. No SMS notifications

## 🔮 Future Enhancements

- [ ] Email notifications for status updates
- [ ] SMS reminders for appointments
- [ ] Video interview recording
- [ ] Application timeline/history
- [ ] Applicant notes section
- [ ] Bulk application export
- [ ] Analytics dashboard
- [ ] Mentor assignment
- [ ] Training materials upload
- [ ] Certificate generation

## 📞 Support

For issues or questions:
1. Check the demo workflow page at `/demo-workflow`
2. Review component source code
3. Check Supabase console for RLS errors
4. Verify environment variables are set

## 📄 License

This is part of the YouthConnect project.

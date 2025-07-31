# 🎓 UniBook - University Resource Booking Platform

A modern, full-stack university resource booking platform built with **Next.js 14**, **Supabase**, and **NextAuth.js**. This application enables students, faculty, and staff to seamlessly book university facilities including study rooms, computer labs, meeting rooms, gyms, and more.

## ✨ Live Demo

🌐 **Live Application**: [Deploy your app and add the URL here]

📱 **Features Demo**:

- Browse available resources with real-time availability
- Secure Google OAuth authentication
- Intuitive booking system with date/time selection
- Responsive design for all devices
- User dashboard with booking history

## 🚀 Key Features

### 📚 **Resource Management**

- **Comprehensive Resource Catalog**: Browse study rooms, labs, meeting spaces, and recreational facilities
- **Smart Filtering**: Filter by capacity
- **Real-time Availability**: Live updates showing current booking status
- **Detailed Information**: View pricing, capacity, descriptions, and images

### 📅 **Advanced Booking System**

- **Flexible Duration**: Book resources for hours or full days
- **Date/Time Selection**: Intuitive calendar interface with time slot selection
- **Instant Confirmation**: Real-time booking confirmations
- **Booking History**: Track past, current, and upcoming reservations
- **Past Booking Detection**: Smart logic to identify completed bookings

### 👤 **User Experience**

- **Google OAuth Integration**: Secure, one-click authentication
- **Personal Dashboard**: Manage bookings, profile, and preferences
- **Responsive Design**: Optimized for desktop, tablet, and mobile
- **Dark Theme**: Modern UI designed for academic environments

### 🛡️ **Security & Performance**

- **Server-side Rendering**: Fast loading with Next.js App Router
- **Database Security**: Supabase with Row Level Security (RLS)
- **Optimized Images**: Next.js Image optimization

## 🛠️ Technical Stack

### **Frontend**

- **Next.js 14** - React framework with App Router
- **React 18** - Modern React with hooks and concurrent features
- **Tailwind CSS** - Utility-first CSS framework
- **Heroicons** - Beautiful SVG icons

### **Backend & Database**

- **Supabase** - PostgreSQL database with real-time subscriptions
- **NextAuth.js** - Authentication with Google OAuth
- **Row Level Security** - Database-level security policies

### **Development Tools**

- **ESLint** - Code linting and formatting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

## 📦 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Supabase account and project

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd unibook-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create `.env.local`:

   ```env
   SUPABASE_URL=your_supabase_url
   SUPABASE_KEY=your_supabase_anon_key
   AUTH_GOOGLE_ID=your_google_oauth_client_id
   AUTH_GOOGLE_SECRET=your_google_oauth_client_secret
   AUTH_SECRET=your_nextauth_secret
   ```

4. **Start development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## 🗄️ Database Architecture

### Core Tables

**Resources Table**

```sql
CREATE TABLE resources (
  id SERIAL PRIMARY KEY,
  name VARCHAR NOT NULL,
  maxCapacity INTEGER NOT NULL,
  regularPrice DECIMAL NOT NULL,
  discount INTEGER DEFAULT 0,
  description TEXT,
  image VARCHAR,
  created_at TIMESTAMP DEFAULT NOW()
);
```

**Bookings Table**

```sql
CREATE TABLE bookings (
  id SERIAL PRIMARY KEY,
  created_at TIMESTAMP DEFAULT NOW(),
  startDate TIMESTAMP NOT NULL,
  endDate TIMESTAMP NOT NULL,
  numHours INTEGER NOT NULL,
  numGuests INTEGER NOT NULL,
  resourcePrice DECIMAL NOT NULL,
  totalPrice DECIMAL NOT NULL,
  status VARCHAR DEFAULT 'unconfirmed',
  observations TEXT,
  resourceId INTEGER REFERENCES resources(id),
  guestId INTEGER REFERENCES guests(id)
);
```

## 🚀 Deployment

### Vercel (Recommended)

1. Connect GitHub repository to Vercel
2. Configure environment variables
3. Automatic deployments on push to main

### Environment Variables

```env
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_anon_key
AUTH_GOOGLE_ID=your_google_oauth_client_id
AUTH_GOOGLE_SECRET=your_google_oauth_client_secret
AUTH_SECRET=your_nextauth_secret
```

## 📁 Project Structure

```
app/
├── _components/          # Reusable UI components
│   ├── ResourceCard.js   # Resource display
│   ├── ReservationCard.js # Booking display
│   ├── ReservationForm.js # Booking form
│   └── ...
├── _lib/                # Core utilities
│   ├── auth.js          # NextAuth configuration
│   ├── data-service.js  # Database operations
│   └── supabase.js      # Supabase client
├── _styles/             # Global styles
├── resources/           # Resource pages
├── account/             # User dashboard
├── about/               # About page
└── layout.js            # Root layout
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🎨 Key Technical Features

### **Smart Booking Logic**

- Past booking detection using `date-fns`
- Time slot validation and conflict prevention
- Real-time availability updates

### **Responsive Design**

- Mobile-first approach with Tailwind CSS
- Optimized for all screen sizes
- Touch-friendly interface

### **Performance Optimizations**

- Next.js Image optimization
- Server-side rendering for SEO
- Efficient database queries
- Optimistic UI updates

### **Security Features**

- Google OAuth authentication
- Row Level Security (RLS) policies
- Input validation and sanitization
- Secure environment variable handling

## 📱 Responsive Design

The application is fully responsive and optimized for:

- **Desktop** (1920px+)
- **Laptop** (1024px - 1919px)
- **Tablet** (768px - 1023px)
- **Mobile** (320px - 767px)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:

- Create an issue in the repository
- Contact the development team
- Check the documentation for common issues

## 🔄 Version History

- **v0.1.0** - Initial release
  - Complete resource booking system
  - Google OAuth authentication
  - Responsive design
  - Real-time availability updates
  - User dashboard with booking history

---

**UniBook** - Empowering university communities with seamless resource booking. Built with modern web technologies and best practices.

---

_Built with ❤️ using Next.js, Supabase, and NextAuth.js_

# Franchise Hub

## Project Overview
Franchise Hub is a comprehensive web application designed to streamline franchise application, management, and operations. The platform provides distinct dashboards for Admins, Applicants, and Franchise Users.

### Key Features
- Detailed Franchise Application Process
- Admin Dashboard for Application Management
- Franchisee Dashboard with Sales Tracking
- Role-based Access Control
- Secure Authentication

## Tech Stack
### Frontend
- React.js
- Vite
- React Router
- Tailwind CSS
- Axios

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication

## Prerequisites
- Node.js (v18+)
- npm or Yarn
- MongoDB

## Installation

### Clone the Repository
```bash
git clone https://github.com/kkkalpana/franchise-hub.git
cd franchise-hub
```

### Backend Setup
```bash
# Navigate to backend directory
cd nodejsbce

# Install dependencies
npm install

# Create .env file (use .env.example as reference)
cp .env.example .env

# Start the server
npx nodemon server
```

### Frontend Setup
```bash
# Navigate to frontend directory
cd vite-project

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Start development server
npm run dev
```

## Environment Variables
Create `.env` files in both backend and frontend directories with:

### Backend `.env`
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=2016
```

### Frontend `.env`
```
VITE_API_URL=http://localhost:2016/api
VITE_EMAIL_SERVICE_ID=your_email_service_id
```

## Project Structure
```
franchise-hub/
│
├── nodejsbce/              # Backend Node.js/Express
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── server.js
│
├── vite-project/           # Frontend React
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── App.jsx
│   └── vite.config.js
```

## Authentication
- JWT-based authentication
- Role-based access control
- Secure password hashing

## Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Contact
Your Name - kalpana_kalpana@sfu.ca

Project Link: [https://github.com/yourusername/franchise-hub](https://github.com/yourusername/franchise-hub)

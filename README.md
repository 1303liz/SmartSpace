# SmartSpace - Event Space Management System

## Overview 🌟

SmartSpace is a modern event space management system designed to streamline the process of booking and managing event spaces. This project will be completed in 3 weeks, focusing on essential features and clean architecture.

## 📋 Table of Contents
1. [Data Models](#data-models)
2. [3-Week Implementation Plan](#implementation-plan)
3. [Getting Started](#getting-started)
4. [Tech Stack](#tech-stack)

## � Data Models

### User Model
```typescript
type UserRole = 'admin' | 'staff' | 'external';

interface User {
  id: string;              // UUID
  email: string;           // Unique
  username: string;        // Unique
  password: string;        // Hashed
  firstName: string;
  lastName: string;
  role: UserRole;
  phone?: string;
  organization?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

### Space Model
```typescript
interface Space {
  id: string;              // UUID
  name: string;
  capacity: number;
  description: string;
  price_per_day: number;  // Daily rate
  price_per_day: number;   // Daily rate for full-day bookings
  equipment: string[];     // ['projector', 'whiteboard', etc.]
  features: string[];      // ['wifi', 'ac', 'parking', etc.]
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

### Booking Model
```typescript
type BookingStatus = 'pending' | 'approved' | 'rejected' | 'cancelled';
type EventType = 'meeting' | 'conference' | 'webinar' | 'workshop';

interface Booking {
  id: string;              // UUID
  eventName: string;
  startDateTime: Date;     // Full datetime
  endDateTime: Date;       // Full datetime
  startDate: string;       // YYYY-MM-DD
  endDate: string;         // YYYY-MM-DD
  isFullDay: boolean;      // Whether this is a full day event
  organizerName: string;
  organizerEmail: string;
  eventType: EventType;
  attendance: number;
  resources: string[];
  status: BookingStatus;
  userId: string;          // Reference to User
  spaceId: string;        // Reference to Space
  approvedBy?: string;    // Optional reference to User
  approvalDate?: Date;
  rejectionReason?: string;
  createdAt: Date;
  updatedAt: Date;
}
```

## 📅 Implementation Plan (3 Weeks)

### Week 1: Foundation & Core Features
- Project setup and environment configuration
- Database schema implementation
- User authentication system
- Basic CRUD operations for Spaces
- Simple booking creation form

### Week 2: Booking System & UI
- Complete booking workflow
- Calendar integration
- Admin approval system
- Basic email notifications
- UI components and styling

### Week 3: Polish & Deploy
- Form validations
- Error handling
- Testing and bug fixes
- Documentation
- Deployment

## 🚀 Getting Started

1. Clone the repository
   ```bash
   git clone https://github.com/your-username/SmartSpace.git
   ```

2. Set up the development environment
   ```bash
   # Backend setup
   cd backend
   python -m venv venv
   source venv/bin/activate  # or `venv\Scripts\activate` on Windows
   pip install -r requirements.txt
   python manage.py migrate

   # Frontend setup
   cd frontend
   npm install
   ```

3. Start the development servers
   ```bash
   # Backend
   python manage.py runserver

   # Frontend
   npm start
   ```

See [GIT_GUIDE.md](GIT_GUIDE.md) for detailed Git workflow instructions.

## 🛠 Tech Stack

### Backend
- Python 3.11
- Django 4.2
- PostgreSQL 14
- Django REST Framework

### Frontend
- React 18
- FullCalendar
- Axios
- TailwindCSS

### Development Tools
- Git
- VS Code
- Docker (optional)
- Postman
```

## 🧩 Key Components

### Booking Form Component
The BookingForm component handles the creation and editing of event space bookings:

```jsx
const BookingForm = ({ onSubmit, initialData = {} }) => {
  const { spaces, loading } = useSpaces();
  const [formData, setFormData] = useState({
    event_name: '',
    start_datetime: '',
    end_datetime: '',
    organizer_name: '',
    organizer_email: '',
    event_type: 'internal',
    attendance: '',
    resources: [],
    space: '',
    ...initialData
  });

  // Form implementation...
};
```

### Calendar Component
The BookingCalendar component provides an interactive calendar interface using FullCalendar:

```jsx
const BookingCalendar = ({ bookings, onDateSelect, onEventClick }) => {
  const calendarEvents = bookings.map(booking => ({
    id: booking.id,
    title: booking.event_name,
    start: booking.start_datetime,
    end: booking.end_datetime,
    color: booking.status === 'approved' ? '#28a745' : '#ffc107'
  }));

  return (
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      headerToolbar={{
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
      }}
      initialView="dayGridMonth"
      events={calendarEvents}
      selectable={true}
      selectMirror={true}
      select={onDateSelect}
      eventClick={onEventClick}
      editable={true}
      dayMaxEvents={true}
    />
  );
};
```

## 📅 Implementation Plan

### Phase 1: Foundation (Weeks 1-2)
- React application setup
- Routing configuration
- Authentication context
- Axios configuration
- Basic UI components

### Phase 2: Core Features (Weeks 3-4)
- Space listing and details
- Booking form creation
- Booking submission workflow
- User booking dashboard

### Phase 3: Advanced Features (Weeks 5-6)
- FullCalendar implementation
- Event visualization
- Drag-and-drop functionality
- Availability display

### Phase 4: Enhancement (Weeks 7-8)
- Responsive design
- Loading states
- Error handling
- Form validation

## 🧪 Testing Strategy

### Component Testing
```jsx
// components/__tests__/BookingForm.test.js
describe('BookingForm', () => {
  test('renders form fields correctly', () => {
    render(<MockedBookingForm />);
    
    expect(screen.getByLabelText(/event name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/start date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/end date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/organizer name/i)).toBeInTheDocument();
  });

  test('submits form with valid data', async () => {
    const mockSubmit = jest.fn();
    render(<BookingForm onSubmit={mockSubmit} />);
    
    // Fill form fields
    fireEvent.change(screen.getByLabelText(/event name/i), {
      target: { value: 'Test Event' }
    });
    
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));
    
    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalled();
    });
  });
});
```

### Testing Commands
```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Run end-to-end tests
npm run test:e2e
```

## 🚀 Deployment

### Vercel Configuration
```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "build"
      }
    }
  ],
  "routes": [
    {
      "src": "/static/(.*)",
      "headers": {
        "cache-control": "public, max-age=31536000, immutable"
      }
    },
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
```

### Environment Variables
```bash
REACT_APP_API_BASE_URL=https://api.yourdomain.com
REACT_APP_ENVIRONMENT=production
```

## 🔮 Future Enhancements

1. Mobile responsiveness improvements
2. Real-time updates using WebSocket
3. Advanced search functionality
4. Performance optimizations
5. Multi-language support
6. Theme customization
7. PWA support
8. Analytics integration
9. Accessibility improvements
10. Offline functionality

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
# Invoice Management Application

A fully functional, responsive invoice management application built with React, TypeScript, and Tailwind CSS. This application provides complete CRUD operations, form validation, status management, filtering capabilities, and light/dark mode theming.

## Features

### Core Functionality
- **Full CRUD Operations**
  - Create new invoices with comprehensive form validation
  - Read and view invoice details
  - Update existing invoices (drafts and pending)
  - Delete invoices with confirmation modal
  
- **Invoice Status Management**
  - Three status types: Draft, Pending, Paid
  - Save invoices as drafts for later editing
  - Mark pending invoices as paid
  - Visual status badges with color coding

- **Advanced Filtering**
  - Filter invoices by status (All, Draft, Pending, Paid)
  - Real-time list updates based on filter selection
  - Empty state displays when no invoices match filter

- **Form Validation**
  - Required field validation for all inputs
  - Email format validation
  - Positive number validation for quantities and prices
  - Real-time error messages with visual feedback
  - Prevents form submission when invalid

- **Theme Toggle**
  - Light and dark mode support
  - Smooth transitions between themes
  - Theme preference persisted in LocalStorage
  - WCAG AA compliant color contrast in both modes

- **Responsive Design**
  - Mobile-first approach (320px+)
  - Tablet optimization (768px+)
  - Desktop layout (1024px+)
  - Adaptive layouts and touch-friendly controls

- **Interactive States**
  - Hover effects on all interactive elements
  - Smooth transitions and animations
  - Loading states for async operations
  - Focus states for keyboard navigation

## Tech Stack

- **Framework**: React 18.3.1
- **Language**: TypeScript
- **Routing**: React Router 7.13.0
- **Styling**: Tailwind CSS 4.1.12
- **Form Management**: React Hook Form 7.55.0
- **Animations**: Motion (Framer Motion) 12.23.24
- **UI Components**: Custom components built with Radix UI primitives
- **Date Handling**: date-fns 3.6.0
- **Build Tool**: Vite 6.3.5
- **Data Persistence**: LocalStorage

## Architecture

### Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── ui/                    # Reusable UI components (buttons, inputs, etc.)
│   │   ├── FilterDropdown.tsx     # Status filter component
│   │   ├── InvoiceListItem.tsx    # Individual invoice list item
│   │   ├── Layout.tsx             # Main layout with header and theme toggle
│   │   └── StatusBadge.tsx        # Status indicator component
│   ├── contexts/
│   │   └── ThemeContext.tsx       # Theme provider and hook
│   ├── pages/
│   │   ├── InvoiceDetail.tsx      # Invoice detail view
│   │   ├── InvoiceForm.tsx        # Create/edit invoice form
│   │   └── InvoiceList.tsx        # Invoice list with filtering
│   ├── types/
│   │   └── invoice.ts             # TypeScript type definitions
│   ├── utils/
│   │   ├── invoice-helpers.ts     # Invoice calculation and formatting utilities
│   │   ├── seed-data.ts           # Sample invoice data
│   │   └── storage.ts             # LocalStorage operations
│   ├── routes.tsx                 # React Router configuration
│   └── App.tsx                    # Root application component
├── styles/
│   ├── fonts.css                  # Custom font imports
│   ├── index.css                  # Main stylesheet
│   ├── tailwind.css               # Tailwind directives
│   └── theme.css                  # Theme variables and base styles
└── package.json
```

### Component Hierarchy

```
App (ThemeProvider)
└── RouterProvider
    └── Layout (Header + Footer)
        ├── InvoiceList
        │   ├── FilterDropdown
        │   └── InvoiceListItem[]
        ├── InvoiceDetail
        │   ├── StatusBadge
        │   └── AlertDialog (Delete Confirmation)
        └── InvoiceForm
            └── Dynamic Item List
```

### State Management

- **Local Component State**: Used for UI interactions and form state
- **React Hook Form**: Manages form state, validation, and submission
- **LocalStorage**: Persists invoice data across sessions
- **Context API**: Manages global theme state

### Data Flow

1. **Reading**: Data loaded from LocalStorage → displayed in components
2. **Creating**: Form submission → validation → transform to invoice → save to LocalStorage → navigate
3. **Updating**: Load existing invoice → populate form → edit → validate → save → navigate
4. **Deleting**: Confirmation modal → delete from LocalStorage → navigate

## Setup Instructions

### Prerequisites
- Node.js 16+ and pnpm installed

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd invoice-app
```

2. Install dependencies
```bash
pnpm install
```

3. Start the development server
```bash
pnpm dev
```

The application will be available in the preview panel.

### Build for Production

```bash
pnpm build
```

## Design Decisions & Trade-offs

### LocalStorage vs Backend
**Decision**: Used LocalStorage for data persistence
**Rationale**: 
- Quick development and deployment
- No backend infrastructure needed
- Suitable for single-user scenarios
- Data persists across browser sessions

**Trade-offs**:
- Limited to ~5-10MB storage
- Data not synced across devices
- No multi-user support
- No server-side validation

**Future Enhancement**: Can easily migrate to Supabase or another backend by updating the storage utilities.

### React Router Data Mode
**Decision**: Used React Router 7 with data mode pattern
**Rationale**:
- Cleaner separation of routes and components
- Better type safety
- Simpler nested routing

### Form Validation
**Decision**: React Hook Form with inline validation
**Rationale**:
- Performance optimization (less re-renders)
- Built-in error handling
- Easy field array management for invoice items

### Component Library
**Decision**: Custom components built on Radix UI primitives
**Rationale**:
- Full control over styling
- Accessibility built-in
- Consistent design system
- Smaller bundle size than full UI libraries

### Styling Approach
**Decision**: Tailwind CSS with custom theme variables
**Rationale**:
- Rapid development
- Consistent spacing and colors
- Easy theme switching
- Responsive utilities

### TypeScript
**Decision**: Full TypeScript implementation
**Rationale**:
- Type safety reduces bugs
- Better IDE support
- Self-documenting code
- Easier refactoring

## Accessibility Features

- **Semantic HTML**: Proper use of `<header>`, `<main>`, `<footer>`, `<button>`, `<label>`
- **ARIA Labels**: Applied to icon-only buttons and interactive elements
- **Keyboard Navigation**: 
  - All interactive elements are keyboard accessible
  - Modal focus trap with ESC key support
  - Tab order follows logical flow
- **Form Accessibility**:
  - All inputs have associated labels
  - Error messages linked to inputs
  - Required fields marked
- **Color Contrast**: WCAG AA compliant in both light and dark modes
- **Focus Indicators**: Visible focus states on all interactive elements

## Improvements Beyond Requirements

1. **Animations**: Smooth page transitions and list item animations using Motion
2. **Enhanced UX**: 
   - Empty state illustrations
   - Loading states
   - Optimistic UI updates
   - Toast notifications (via sonner)
3. **Sample Data**: Pre-populated with realistic invoice examples
4. **Advanced Layout**: Sticky header with backdrop blur
5. **Typography**: Custom font pairing (Archivo + Instrument Serif) for refined aesthetic
6. **Item Management**: Dynamic add/remove items with real-time total calculation
7. **Date Formatting**: Human-friendly date displays
8. **Currency Formatting**: Proper GBP formatting with Intl API
9. **Payment Terms**: Dropdown with common payment term options
10. **Visual Polish**: Custom status badges, hover effects, and micro-interactions

## Browser Support

- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Mobile Safari (iOS 14+)
- Chrome Mobile (Android)

## Known Limitations

- Data stored locally (not synced across devices)
- No user authentication
- No invoice PDF export
- No email sending functionality
- Limited to browser storage capacity

## Future Enhancements

- [ ] Backend integration with Supabase
- [ ] PDF export functionality
- [ ] Email invoice to clients
- [ ] Multi-currency support
- [ ] Invoice templates
- [ ] Payment tracking and reminders
- [ ] Dashboard with analytics
- [ ] Search functionality
- [ ] Bulk operations
- [ ] Invoice duplication

## License

MIT

## Contact

For questions or feedback, please open an issue in the repository.

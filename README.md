# Smart Goal Planner

A modern, responsive financial goal tracking application built with React and JSON Server. Track your savings goals, make deposits, and monitor progress toward achieving your financial objectives.            
 Live URL: https://peaceful-mooncake-f4f870.netlify.app              



![Smart Goal Planner Screenshot](https://via.placeholder.com/800x400/2563eb/ffffff?text=Smart+Goal+Planner+Dashboard)

## Features

### Goal Management
- **Create Goals**: Add new financial goals with target amounts, categories, and deadlines
- **Edit Goals**: Modify existing goal details anytime
- **Delete Goals**: Remove goals with confirmation dialog
- **Category System**: Organize goals by type (Travel, Emergency, Electronics, etc.)

### Progress Tracking
- **Visual Progress Bars**: See completion percentage at a glance
- **Real-time Updates**: Progress updates immediately after deposits
- **Smart Status Indicators**: 
  - **Completed**: Goal reached 100%
  -  **Warning**: Deadline within 30 days
  - **Overdue**: Past deadline without completion
  -  **On Track**: Normal progress

### Deposit System
- **Easy Deposits**: Add money to any active goal
- **Instant Updates**: See progress change immediately
- **Remaining Calculations**: Know exactly how much more you need

### Overview Dashboard
- **Total Goals**: Count of all your goals
- **Total Saved**: Sum of all money saved across goals
- **Completion Stats**: Number of completed vs. in-progress goals
- **Quick Insights**: At-a-glance financial progress

###  Modern UI/UX
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Dark/Light Friendly**: Adapts to system preferences
- **Accessibility**: Keyboard navigation and screen reader support
- **Smooth Animations**: Polished interactions and transitions

## Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm  package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Jennifer-Nyambura/smart-goal-planner.git
   cd smart-goal-planner
   ```

2. **Install dependencies**
   ```bash
   npm install
   
   # Install json-server globally
   npm install -g json-server
   ```

3. **Start the development servers**
   
   **Option A: Run servers separately**
   ```bash
   # Terminal 1: Start JSON Server (Backend)
   json-server --watch db.json --port 3000
   
   # Terminal 2: Start React App (Frontend)
   npm start
   ```
   
   **Option B: Run both servers together**
   ```bash
   # Install concurrently first
   npm install concurrently --save-dev
   
   # Start both servers
   npm run dev
   ```

4. **Open your browser**
   - Frontend: [http://localhost:3001](http://localhost:3001)
   - Backend API: [http://localhost:3000](http://localhost:3000)

## Project Structure

```
smart-goal-planner/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── Navbar.js              # Header navigation
│   │   ├── Overview.js            # Statistics dashboard
│   │   ├── GoalCard.js            # Individual goal display
│   │   ├── AddGoalModal.js        # Create/edit goal form
│   │   ├── DepositModal.js        # Deposit money form
│   │   ├── LoadingSpinner.js      # Loading state
│   │   ├── EmptyState.js          # No goals state
│   │   └── ErrorMessage.js        # Error display
│   ├── App.js                     # Main application
│   ├── App.css                    # Global styles
│   └── index.js                   # React entry point
├── db.json                        # Mock API database
├──package.json                   # Dependencies & scripts
└──README.md                      # This file
```

## 🛠️ Available Scripts

```bash
# Development
npm start          # Start React development server
npm run server     # Start JSON server
npm run dev        # Start both servers concurrently

'''

## Usage Guide

### Creating Your First Goal

1. Click the **"Add Goal"** button in the header
2. Fill in the goal details:
   - **Name**: e.g., "Emergency Fund"
   - **Target Amount**: e.g., $10,000
   - **Category**: Select from dropdown
   - **Deadline**: Choose your target date
3. Click **"Create Goal"**

### Making Deposits

1. Find your goal card on the dashboard
2. Click the **"Deposit"** button
3. Enter the amount you want to add
4. Click **"Make Deposit"**
5. Watch your progress bar update instantly!

### Editing Goals

1. Click the **edit icon**  on any goal card
2. Modify the details as needed
3. Click **"Update Goal"**

### Tracking Progress

Your dashboard automatically shows:
- **Progress bars** with completion percentages
- **Status indicators** for deadline warnings
- **Remaining amounts** needed to reach goals
- **Overview statistics** across all goals

## 🔧 API Endpoints

The JSON Server provides these REST endpoints:

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/goals` | Fetch all goals |
| `POST` | `/goals` | Create new goal |
| `GET` | `/goals/:id` | Fetch specific goal |
| `PATCH` | `/goals/:id` | Update goal (deposits/edits) |
| `PUT` | `/goals/:id` | Replace entire goal |
| `DELETE` | `/goals/:id` | Delete goal |

### Example API Requests

```javascript
// Create a new goal
POST /goals
{
  "name": "Vacation Fund",
  "targetAmount": 3000,
  "savedAmount": 0,
  "category": "Travel",
  "deadline": "2025-12-31",
  "createdAt": "2024-01-15"
}

// Make a deposit
PATCH /goals/1
{
  "savedAmount": 1500
}
```

##  Customization

### Adding New Categories

Edit the categories array in `src/components/AddGoalModal.js`:

```javascript
const categories = [
  'Travel', 'Emergency', 'Electronics', 'Real Estate', 
  'Vehicle', 'Education', 'Shopping', 'Retirement', 
  'Home', 'Other', 'Your New Category' // Add here
];
```

### Styling Modifications

The application uses vanilla CSS with CSS custom properties. Key files:
- `src/App.css` - Main stylesheet
- CSS variables for easy theme customization
- Responsive breakpoints: 640px, 768px, 1024px, 1280px

### Status Thresholds

Modify warning thresholds in `src/components/GoalCard.js`:

```javascript
const getGoalStatus = () => {
  const daysLeft = getDaysUntilDeadline(goal.deadline);
  
  if (progress >= 100) return 'completed';
  if (daysLeft < 0) return 'overdue';
  if (daysLeft <= 30) return 'warning'; // Change this number
  return 'on-track';
};
```

## Testing

### Manual Testing Checklist

- [ ] Create a new goal
- [ ] Edit an existing goal
- [ ] Make a deposit to a goal
- [ ] Delete a goal
- [ ] Test responsive design on mobile
- [ ] Test with json-server offline (error handling)
- [ ] Verify progress calculations
- [ ] Check deadline warnings

### Component Testing

Each component is designed for easy unit testing:

```javascript
// Example test structure
import { render, screen } from '@testing-library/react';
import GoalCard from './components/GoalCard';

test('renders goal card with correct progress', () => {
  const mockGoal = {
    name: 'Test Goal',
    targetAmount: 1000,
    savedAmount: 500,
    // ... other props
  };
  
  render(<GoalCard goal={mockGoal} />);
  expect(screen.getByText('50.0%')).toBeInTheDocument();
});
```

##  Deployment

### Netlify Deployment

1. Build the project:
   ```bash
   npm run build
   ```

2. Deploy the `build` folder to Netlify

3. For the backend, consider using:
   - **JSON Server **
   - **Supabase** for a real database
   - **Firebase Firestore**


## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Development Guidelines

- Follow React best practices
- Use functional components with hooks
- Keep components small and focused
- Add PropTypes for type checking
- Write descriptive commit messages
- Test your changes thoroughly

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

##  Troubleshooting

### Common Issues

** "Failed to fetch goals"**
- Ensure json-server is running on port 3000
- Check if db.json exists in the root directory

** CORS errors**
- JSON Server should handle CORS automatically
- If issues persist, add `--cors` flag: `json-server --watch db.json --port 3000 --cors`

** Port conflicts**
- Change JSON Server port: `json-server --watch db.json --port 3001`
- Update API_BASE in App.js accordingly

** Goals not persisting**
- Verify db.json has write permissions
- Check console for API errors
- Ensure JSON Server is watching the correct file

### Getting Help

-  Check the [Issues](https://github.com/yourusername/smart-goal-planner/issues) page
-  Start a [Discussion](https://github.com/yourusername/smart-goal-planner/discussions)
- Email: your.email@example.com

##  Acknowledgments

- **Create React App** for the React boilerplate
- **JSON Server** for the mock REST API
- **Lucide React** for beautiful icons (if using)
- **React community** for inspiration and best practices


---

 **If you found this project helpful, please give it a star!** 

Built with  by Jennifer Nyambura
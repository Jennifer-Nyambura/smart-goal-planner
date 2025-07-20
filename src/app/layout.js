'use client';
import SmartGoalPlanner from './Components/SmartGoalPlanner';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SmartGoalPlanner />
        {children}
      </body>
    </html>
  );
}

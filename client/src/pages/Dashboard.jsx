import { FileCode, CheckCircle, Clock, Users } from 'lucide-react';
import StatCard from '../components/ui/StatCard';

/* Dashboard Component */
export default function Dashboard() {
  /** SAMPLE DATA **/
  const stats = [
    {
      title: 'Total Reviews',
      value: 24,
      icon: FileCode,
      trend: { value: 12, isPositive: true },
      iconColor: 'bg-blue-500'
    },
    {
      title: 'Approved',
      value: 18,
      icon: CheckCircle,
      trend: { value: 8, isPositive: true },
      iconColor: 'bg-green-500'
    },
    {
      title: 'Pending',
      value: 6,
      icon: Clock,
      trend: { value: 3, isPositive: false },
      iconColor: 'bg-yellow-500'
    },
    {
      title: 'Team Members',
      value: 12,
      icon: Users,
      iconColor: 'bg-purple-500'
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* 
        HEADER SECTION 
        Contains the page title and description
      */}
      <header className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Page title */}
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Dashboard
          </h1>
          
          {/* Subtitle/description */}
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Welcome back! Here's what's happening with your code reviews.
          </p>
        </div>
      </header>

      {/* 
        MAIN CONTENT SECTION 
        Contains all the dashboard content
      */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* 
          METRICS GRID
          Uses CSS Grid to create a responsive layout:
          - 1 column on mobile
          - 2 columns on tablets (md breakpoint)
          - 4 columns on desktop (lg breakpoint)
        */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
       
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
              trend={stat.trend}
              iconColor={stat.iconColor}
            />
          ))}
        </div>

        <div className="mt-8 bg-white  rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700 dark:bg-gray-900">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Recent Submissions
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Coming soon... We'll build this next! 
          </p>
        </div>
      </main>
    </div>
  );
}
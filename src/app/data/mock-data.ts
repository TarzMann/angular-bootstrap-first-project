/**
 * mock-data.ts
 *
 * All static data for the application lives here.
 * In a real app this would come from an API/service layer;
 * centralising it here keeps components free of business data.
 */

// ── Types ─────────────────────────────────────────────────────────────────────

export interface StatCard {
  label: string;
  value: string | number;
  trend: 'up' | 'down' | 'neutral';
  /** Optional icon class from Bootstrap Icons (bi-*) */
  icon: string;
}

export interface Project {
  id: number;
  projectName: string;
  owner: string;
  status: 'Active' | 'On Hold' | 'Complete';
  dueDate: string;      // ISO date string, e.g. "2025-06-30"
  budget: number;       // in USD
}

// ── Stats cards data ──────────────────────────────────────────────────────────

export const STATS_CARDS: StatCard[] = [
  {
    label: 'Active Projects',
    value: 12,
    trend: 'up',
    icon: 'bi-folder2-open',
  },
  {
    label: 'Team Members',
    value: 34,
    trend: 'neutral',
    icon: 'bi-people',
  },
  {
    label: 'Monthly Budget Used',
    value: '$84,200',
    trend: 'down',
    icon: 'bi-currency-dollar',
  },
];

// ── Projects table data ───────────────────────────────────────────────────────

export const PROJECTS: Project[] = [
  {
    id: 1,
    projectName: 'Website Redesign',
    owner: 'Alice Johnson',
    status: 'Active',
    dueDate: '2025-07-15',
    budget: 32000,
  },
  {
    id: 2,
    projectName: 'Mobile App v2',
    owner: 'Bob Martinez',
    status: 'Active',
    dueDate: '2025-09-01',
    budget: 75000,
  },
  {
    id: 3,
    projectName: 'Data Migration',
    owner: 'Carol White',
    status: 'On Hold',
    dueDate: '2025-06-30',
    budget: 18500,
  },
  {
    id: 4,
    projectName: 'API Gateway Upgrade',
    owner: 'David Lee',
    status: 'Active',
    dueDate: '2025-08-20',
    budget: 42000,
  },
  {
    id: 5,
    projectName: 'Brand Identity Refresh',
    owner: 'Eva Chen',
    status: 'Complete',
    dueDate: '2025-04-01',
    budget: 12000,
  },
  {
    id: 6,
    projectName: 'Customer Portal',
    owner: 'Frank Nguyen',
    status: 'Active',
    dueDate: '2025-10-15',
    budget: 61000,
  },
  {
    id: 7,
    projectName: 'Security Audit',
    owner: 'Grace Kim',
    status: 'Complete',
    dueDate: '2025-03-15',
    budget: 9800,
  },
  {
    id: 8,
    projectName: 'ERP Integration',
    owner: 'Henry Patel',
    status: 'On Hold',
    dueDate: '2025-11-30',
    budget: 130000,
  },
  {
    id: 9,
    projectName: 'Analytics Dashboard',
    owner: 'Isla Robinson',
    status: 'Active',
    dueDate: '2025-08-05',
    budget: 27500,
  },
  {
    id: 10,
    projectName: 'Cloud Cost Optimisation',
    owner: 'James Turner',
    status: 'Complete',
    dueDate: '2025-05-20',
    budget: 5000,
  },
];

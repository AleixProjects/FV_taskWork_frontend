import { Shield, Users, BarChart, Settings } from 'lucide-react';
import { BaseNavigation, type NavItem } from './BaseNavigation';

const adminNavItems: NavItem[] = [
  { name: "Dashboard", href: "/admin", icon: BarChart },
  { name: "User Management", href: "/admin/users", icon: Users },
  { name: "Roles & Permissions", href: "/admin/roles", icon: Shield },
  { name: "System Settings", href: "/admin/settings", icon: Settings },
];

export function AdminNavigation() {
  return <BaseNavigation title="Admin Panel" items={adminNavItems} />;
}


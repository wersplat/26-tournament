"use client";

import { AdminDashboard } from "@/components/admin/admin-dashboard";

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export default function AdminPage() {
  return <AdminDashboard />;
} 
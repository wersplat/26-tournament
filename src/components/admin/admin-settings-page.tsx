"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useAuth } from "@/context/auth-context";
import { Loader2, Settings, Users, Shield, Database, Bell, Globe, Key, Save, RefreshCw, AlertTriangle } from "lucide-react";

interface SystemSetting {
  id: string;
  name: string;
  value: string | boolean | number;
  type: 'string' | 'boolean' | 'number' | 'select';
  category: 'general' | 'security' | 'notifications' | 'performance';
  description: string;
  options?: string[];
}

interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'moderator' | 'viewer';
  lastActive: string;
  permissions: string[];
  isActive: boolean;
}

export function AdminSettingsPage() {
  const { user, isAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState("general");
  const [isSaving, setIsSaving] = useState(false);

  // Mock data - in real implementation, this would come from GraphQL
  const [systemSettings] = useState<SystemSetting[]>([
    {
      id: "1",
      name: "Site Name",
      value: "2K26 Tournament Series",
      type: "string",
      category: "general",
      description: "The name displayed throughout the application"
    },
    {
      id: "2",
      name: "Maintenance Mode",
      value: false,
      type: "boolean",
      category: "general",
      description: "Enable maintenance mode to restrict access"
    },
    {
      id: "3",
      name: "Max Players Per Team",
      value: 5,
      type: "number",
      category: "general",
      description: "Maximum number of players allowed per team"
    },
    {
      id: "4",
      name: "Default Time Zone",
      value: "UTC",
      type: "select",
      category: "general",
      description: "Default timezone for the application",
      options: ["UTC", "EST", "PST", "CST", "GMT"]
    },
    {
      id: "5",
      name: "Enable Two-Factor Authentication",
      value: true,
      type: "boolean",
      category: "security",
      description: "Require 2FA for admin accounts"
    },
    {
      id: "6",
      name: "Session Timeout",
      value: 30,
      type: "number",
      category: "security",
      description: "Session timeout in minutes"
    },
    {
      id: "7",
      name: "Email Notifications",
      value: true,
      type: "boolean",
      category: "notifications",
      description: "Enable email notifications for events"
    },
    {
      id: "8",
      name: "Push Notifications",
      value: false,
      type: "boolean",
      category: "notifications",
      description: "Enable push notifications"
    },
    {
      id: "9",
      name: "Cache Duration",
      value: 3600,
      type: "number",
      category: "performance",
      description: "Cache duration in seconds"
    },
    {
      id: "10",
      name: "Enable CDN",
      value: true,
      type: "boolean",
      category: "performance",
      description: "Use CDN for static assets"
    }
  ]);

  const [adminUsers] = useState<AdminUser[]>([
    {
      id: "1",
      email: "admin@bodegacatsgc.gg",
      name: "System Administrator",
      role: "admin",
      lastActive: "2024-01-16T10:30:00Z",
      permissions: ["all"],
      isActive: true
    },
    {
      id: "2",
      email: "moderator@bodegacatsgc.gg",
      name: "Tournament Moderator",
      role: "moderator",
      lastActive: "2024-01-15T16:45:00Z",
      permissions: ["manage_events", "manage_matches", "view_reports"],
      isActive: true
    },
    {
      id: "3",
      email: "viewer@bodegacatsgc.gg",
      name: "Data Viewer",
      role: "viewer",
      lastActive: "2024-01-14T09:15:00Z",
      permissions: ["view_reports", "view_analytics"],
      isActive: false
    }
  ]);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'general': return <Settings className="h-4 w-4" />;
      case 'security': return <Shield className="h-4 w-4" />;
      case 'notifications': return <Bell className="h-4 w-4" />;
      case 'performance': return <Database className="h-4 w-4" />;
      default: return <Settings className="h-4 w-4" />;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-100 text-red-800';
      case 'moderator': return 'bg-blue-100 text-blue-800';
      case 'viewer': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleSaveSettings = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSaving(false);
  };

  if (!isAdmin) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex flex-col items-center space-y-4">
          <AlertTriangle className="h-8 w-8 text-red-600" />
          <div className="text-lg text-red-600">Access Denied</div>
          <div className="text-sm text-muted-foreground">You need admin privileges to access settings.</div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">System Settings</h1>
          <p className="text-muted-foreground">Manage system configuration and administrative settings</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Reset to Defaults
          </Button>
          <Button onClick={handleSaveSettings} disabled={isSaving}>
            {isSaving ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Save className="h-4 w-4 mr-2" />
            )}
            Save Changes
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {systemSettings
              .filter(setting => setting.category === 'general')
              .map((setting) => (
                <Card key={setting.id}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center space-x-2">
                      {getCategoryIcon(setting.category)}
                      <CardTitle className="text-lg">{setting.name}</CardTitle>
                    </div>
                    <p className="text-sm text-muted-foreground">{setting.description}</p>
                  </CardHeader>
                  <CardContent>
                    {setting.type === 'string' && (
                      <Input
                        defaultValue={setting.value as string}
                        placeholder={`Enter ${setting.name.toLowerCase()}`}
                      />
                    )}
                    {setting.type === 'number' && (
                      <Input
                        type="number"
                        defaultValue={setting.value as number}
                        placeholder={`Enter ${setting.name.toLowerCase()}`}
                      />
                    )}
                    {setting.type === 'boolean' && (
                      <div className="flex items-center space-x-2">
                        <Switch defaultChecked={setting.value as boolean} />
                        <Label>Enable {setting.name.toLowerCase()}</Label>
                      </div>
                    )}
                    {setting.type === 'select' && setting.options && (
                      <Select defaultValue={setting.value as string}>
                        <SelectTrigger>
                          <SelectValue placeholder={`Select ${setting.name.toLowerCase()}`} />
                        </SelectTrigger>
                        <SelectContent>
                          {setting.options.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {systemSettings
              .filter(setting => setting.category === 'security')
              .map((setting) => (
                <Card key={setting.id}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center space-x-2">
                      {getCategoryIcon(setting.category)}
                      <CardTitle className="text-lg">{setting.name}</CardTitle>
                    </div>
                    <p className="text-sm text-muted-foreground">{setting.description}</p>
                  </CardHeader>
                  <CardContent>
                    {setting.type === 'string' && (
                      <Input
                        defaultValue={setting.value as string}
                        placeholder={`Enter ${setting.name.toLowerCase()}`}
                      />
                    )}
                    {setting.type === 'number' && (
                      <Input
                        type="number"
                        defaultValue={setting.value as number}
                        placeholder={`Enter ${setting.name.toLowerCase()}`}
                      />
                    )}
                    {setting.type === 'boolean' && (
                      <div className="flex items-center space-x-2">
                        <Switch defaultChecked={setting.value as boolean} />
                        <Label>Enable {setting.name.toLowerCase()}</Label>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Security Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Shield className="h-4 w-4 text-green-600" />
                    <span className="font-semibold">Authentication</span>
                  </div>
                  <p className="text-sm text-muted-foreground">2FA enabled for admin accounts</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Key className="h-4 w-4 text-blue-600" />
                    <span className="font-semibold">Session Management</span>
                  </div>
                  <p className="text-sm text-muted-foreground">30-minute session timeout</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Globe className="h-4 w-4 text-purple-600" />
                    <span className="font-semibold">Access Control</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Role-based permissions active</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Administrative Users</CardTitle>
                <Button>
                  <Users className="h-4 w-4 mr-2" />
                  Add User
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Last Active</TableHead>
                    <TableHead>Permissions</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {adminUsers.map((adminUser) => (
                    <TableRow key={adminUser.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{adminUser.name}</div>
                          <div className="text-sm text-muted-foreground">{adminUser.email}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getRoleColor(adminUser.role)}>
                          {adminUser.role}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {new Date(adminUser.lastActive).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {adminUser.permissions.map((permission) => (
                            <Badge key={permission} variant="outline" className="text-xs">
                              {permission}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={adminUser.isActive ? "default" : "secondary"}>
                          {adminUser.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Settings className="h-3 w-3" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Key className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="advanced" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {systemSettings
              .filter(setting => setting.category === 'notifications' || setting.category === 'performance')
              .map((setting) => (
                <Card key={setting.id}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center space-x-2">
                      {getCategoryIcon(setting.category)}
                      <CardTitle className="text-lg">{setting.name}</CardTitle>
                    </div>
                    <p className="text-sm text-muted-foreground">{setting.description}</p>
                  </CardHeader>
                  <CardContent>
                    {setting.type === 'string' && (
                      <Input
                        defaultValue={setting.value as string}
                        placeholder={`Enter ${setting.name.toLowerCase()}`}
                      />
                    )}
                    {setting.type === 'number' && (
                      <Input
                        type="number"
                        defaultValue={setting.value as number}
                        placeholder={`Enter ${setting.name.toLowerCase()}`}
                      />
                    )}
                    {setting.type === 'boolean' && (
                      <div className="flex items-center space-x-2">
                        <Switch defaultChecked={setting.value as boolean} />
                        <Label>Enable {setting.name.toLowerCase()}</Label>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>System Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Version:</span>
                    <span className="text-sm text-muted-foreground">2.1.0</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Environment:</span>
                    <span className="text-sm text-muted-foreground">Production</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Database:</span>
                    <span className="text-sm text-muted-foreground">PostgreSQL 14</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Last Backup:</span>
                    <span className="text-sm text-muted-foreground">2024-01-16 02:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Uptime:</span>
                    <span className="text-sm text-muted-foreground">15 days, 8 hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Memory Usage:</span>
                    <span className="text-sm text-muted-foreground">67%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 
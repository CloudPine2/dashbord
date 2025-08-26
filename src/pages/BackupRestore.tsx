
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Download, Upload, Archive, Cloud, HardDrive, Database, 
  Server, Users, FileText, Settings, Clock, RefreshCw, 
  Save, Edit, Trash2, Share2, Eye, Filter, Search, Plus, 
  Zap, Lightbulb, BarChart3, PieChart, LineChart, TrendingUp, 
  Target, BookOpen, Star, CheckCircle, AlertTriangle, XCircle, 
  Play, Pause, Square, RotateCcw, History, Code, ArrowUpRight, 
  ArrowDownRight, Minus, DollarSign, ChartBar, Cpu, 
  HardDrive, Globe, Lock, Unlock, Key, AlertCircle,
  WifiOff, ServerCrash, MemoryStick, Fan, 
  Temperature, Battery, Power,   Wifi as WifiIcon, Signal, SignalHigh,
  SignalMedium, SignalLow, Play as PlayIcon,
  Pause as PauseIcon, Stop, RotateCcw as RotateCcwIcon,
  Calendar, Clock as ClockIcon, AlertTriangle as AlertTriangleIcon,
  CheckCircle as CheckCircleIcon, XCircle as XCircleIcon,
  Info, HelpCircle, Shield, Key as KeyIcon, Lock as LockIcon,
  Unlock as UnlockIcon, Download as DownloadIcon, Upload as UploadIcon,
  Archive as ArchiveIcon, Cloud as CloudIcon, HardDrive as HardDriveIcon2,
  Database as DatabaseIcon2, Server as ServerIcon, Users as UsersIcon,
  FileText as FileTextIcon, Settings as SettingsIcon, Clock as ClockIcon2,
  RefreshCw as RefreshCwIcon, Save as SaveIcon, Edit as EditIcon,
  Trash2 as Trash2Icon, Share2 as Share2Icon, Eye as EyeIcon,
  Filter as FilterIcon, Search as SearchIcon, Plus as PlusIcon,
  Zap as ZapIcon, Lightbulb as LightbulbIcon, BarChart3 as BarChart3Icon,
  PieChart as PieChartIcon, LineChart as LineChartIcon, TrendingUp as TrendingUpIcon,
  Target as TargetIcon, BookOpen as BookOpenIcon, Star as StarIcon,
  CheckCircle as CheckCircleIcon2, AlertTriangle as AlertTriangleIcon2,
  XCircle as XCircleIcon2, Play as PlayIcon2, Pause as PauseIcon2,
  Square as SquareIcon, RotateCcw as RotateCcwIcon2, History as HistoryIcon,
  Code as CodeIcon, ArrowUpRight as ArrowUpRightIcon, ArrowDownRight as ArrowDownRightIcon,
  Minus as MinusIcon, DollarSign as DollarSignIcon, ChartBar as ChartBarIcon,
  Cpu as CpuIcon,
  Globe as GlobeIcon, Lock as LockIcon2, Unlock as UnlockIcon2,
  Key as KeyIcon2, AlertCircle as AlertCircleIcon2, WifiOff as WifiOffIcon,
  ServerCrash as ServerCrashIcon,
  MemoryStick as MemoryStickIcon, Fan as FanIcon, Temperature as TemperatureIcon,
  Battery as BatteryIcon,   Power as PowerIcon,
  Signal as SignalIcon, SignalHigh as SignalHighIcon, SignalMedium as SignalMediumIcon,
  SignalLow as SignalLowIcon
} from 'lucide-react';

// Mock data for backup and restore
const mockBackups = [
  {
    id: 1,
    name: "Full System Backup - June 15",
    description: "Complete system backup including all databases and files",
    type: "Full",
    status: "completed",
    size: 45.2,
    createdAt: "2024-06-15 14:30:00",
    completedAt: "2024-06-15 15:45:00",
    duration: "1h 15m",
    location: "Local Storage",
    compression: "GZIP",
    encryption: "AES-256",
    retention: "30 days",
    verified: true,
    integrity: "verified",
    components: ["Database", "Files", "Configuration", "User Data"],
    backupSize: "45.2 GB",
    originalSize: "52.8 GB",
    compressionRatio: "14.4%"
  },
  {
    id: 2,
    name: "Database Backup - June 14",
    description: "Database-only backup for critical data",
    type: "Database",
    status: "completed",
    size: 12.8,
    createdAt: "2024-06-14 02:00:00",
    completedAt: "2024-06-14 02:15:00",
    duration: "15m",
    location: "Cloud Storage",
    compression: "LZ4",
    encryption: "AES-256",
    retention: "90 days",
    verified: true,
    integrity: "verified",
    components: ["Database"],
    backupSize: "12.8 GB",
    originalSize: "15.2 GB",
    compressionRatio: "15.8%"
  },
  {
    id: 3,
    name: "Incremental Backup - June 13",
    description: "Incremental backup since last full backup",
    type: "Incremental",
    status: "completed",
    size: 3.2,
    createdAt: "2024-06-13 02:00:00",
    completedAt: "2024-06-13 02:08:00",
    duration: "8m",
    location: "Local Storage",
    compression: "GZIP",
    encryption: "AES-256",
    retention: "30 days",
    verified: true,
    integrity: "verified",
    components: ["Database Changes", "File Changes"],
    backupSize: "3.2 GB",
    originalSize: "3.8 GB",
    compressionRatio: "15.8%"
  },
  {
    id: 4,
    name: "Configuration Backup - June 12",
    description: "System configuration and settings backup",
    type: "Configuration",
    status: "completed",
    size: 0.8,
    createdAt: "2024-06-12 18:00:00",
    completedAt: "2024-06-12 18:02:00",
    duration: "2m",
    location: "Local Storage",
    compression: "GZIP",
    encryption: "AES-256",
    retention: "365 days",
    verified: true,
    integrity: "verified",
    components: ["System Config", "App Settings", "User Preferences"],
    backupSize: "0.8 GB",
    originalSize: "0.9 GB",
    compressionRatio: "11.1%"
  },
  {
    id: 5,
    name: "Full System Backup - June 8",
    description: "Weekly full system backup",
    type: "Full",
    status: "completed",
    size: 44.8,
    createdAt: "2024-06-08 02:00:00",
    completedAt: "2024-06-08 03:12:00",
    duration: "1h 12m",
    location: "Cloud Storage",
    compression: "GZIP",
    encryption: "AES-256",
    retention: "30 days",
    verified: true,
    integrity: "verified",
    components: ["Database", "Files", "Configuration", "User Data"],
    backupSize: "44.8 GB",
    originalSize: "52.1 GB",
    compressionRatio: "14.0%"
  }
];

const mockBackupSchedules = [
  {
    id: 1,
    name: "Daily Database Backup",
    description: "Automated daily database backup at 2:00 AM",
    type: "Database",
    frequency: "Daily",
    time: "02:00",
    days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    location: "Cloud Storage",
    retention: "90 days",
    compression: "LZ4",
    encryption: "AES-256",
    status: "active",
    lastRun: "2024-06-15 02:00:00",
    nextRun: "2024-06-16 02:00:00",
    successRate: 98.5,
    totalRuns: 156,
    failedRuns: 2
  },
  {
    id: 2,
    name: "Weekly Full Backup",
    description: "Complete system backup every Sunday at 2:00 AM",
    type: "Full",
    frequency: "Weekly",
    time: "02:00",
    days: ["Sun"],
    location: "Local Storage",
    retention: "30 days",
    compression: "GZIP",
    encryption: "AES-256",
    status: "active",
    lastRun: "2024-06-15 02:00:00",
    nextRun: "2024-06-22 02:00:00",
    successRate: 100.0,
    totalRuns: 52,
    failedRuns: 0
  },
  {
    id: 3,
    name: "Hourly Incremental",
    description: "Hourly incremental backup during business hours",
    type: "Incremental",
    frequency: "Hourly",
    time: "09:00-17:00",
    days: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    location: "Local Storage",
    retention: "7 days",
    compression: "GZIP",
    encryption: "AES-256",
    status: "active",
    lastRun: "2024-06-15 16:00:00",
    nextRun: "2024-06-15 17:00:00",
    successRate: 99.2,
    totalRuns: 1248,
    failedRuns: 10
  }
];

const mockBackupLocations = [
  {
    id: 1,
    name: "Local Storage",
    type: "Local",
    path: "/backups",
    capacity: 1000,
    used: 245.6,
    available: 754.4,
    status: "healthy",
    lastSync: "2024-06-15 15:45:00",
    syncStatus: "synced",
    encryption: "AES-256",
    compression: "enabled",
    backupCount: 45
  },
  {
    id: 2,
    name: "Cloud Storage - AWS S3",
    type: "Cloud",
    path: "s3://raas-backups",
    capacity: 5000,
    used: 1234.8,
    available: 3765.2,
    status: "healthy",
    lastSync: "2024-06-15 15:45:00",
    syncStatus: "synced",
    encryption: "AES-256",
    compression: "enabled",
    backupCount: 156
  },
  {
    id: 3,
    name: "Network Storage",
    type: "Network",
    path: "//nas/backups",
    capacity: 2000,
    used: 567.3,
    available: 1432.7,
    status: "warning",
    lastSync: "2024-06-15 14:30:00",
    syncStatus: "syncing",
    encryption: "AES-256",
    compression: "enabled",
    backupCount: 78
  }
];

const mockBackupAnalytics = {
  totalBackups: 156,
  totalSize: 2.45,
  averageSize: 15.7,
  successRate: 98.7,
  compressionRatio: 14.2,
  retentionEfficiency: 92.3,
  monthlyTrends: [
    { month: "Jan", backups: 28, size: 2.1, success: 27 },
    { month: "Feb", backups: 26, size: 2.3, success: 25 },
    { month: "Mar", backups: 30, size: 2.4, success: 29 },
    { month: "Apr", backups: 29, size: 2.5, success: 28 },
    { month: "May", backups: 31, size: 2.6, success: 30 },
    { month: "Jun", backups: 12, size: 2.45, success: 12 }
  ],
  typeDistribution: [
    { type: "Full", count: 52, size: 1.8, percentage: 33.3 },
    { type: "Database", count: 78, size: 0.4, percentage: 50.0 },
    { type: "Incremental", count: 20, size: 0.2, percentage: 12.8 },
    { type: "Configuration", count: 6, size: 0.05, percentage: 3.9 }
  ],
  locationDistribution: [
    { location: "Local Storage", count: 45, size: 0.25, percentage: 28.8 },
    { location: "Cloud Storage", count: 156, size: 1.23, percentage: 100.0 },
    { location: "Network Storage", count: 78, size: 0.57, percentage: 50.0 }
  ]
};

const mockRestoreHistory = [
  {
    id: 1,
    backupName: "Full System Backup - June 8",
    type: "Full Restore",
    status: "completed",
    startedAt: "2024-06-12 10:00:00",
    completedAt: "2024-06-12 11:30:00",
    duration: "1h 30m",
    size: 44.8,
    location: "Local Storage",
    restoredBy: "admin@raas.com",
    reason: "System recovery after hardware failure",
    components: ["Database", "Files", "Configuration", "User Data"],
    verification: "passed",
    notes: "Restore completed successfully. All systems operational."
  },
  {
    id: 2,
    backupName: "Database Backup - June 14",
    type: "Database Restore",
    status: "completed",
    startedAt: "2024-06-15 09:00:00",
    completedAt: "2024-06-15 09:25:00",
    duration: "25m",
    size: 12.8,
    location: "Cloud Storage",
    restoredBy: "dba@raas.com",
    reason: "Database corruption recovery",
    components: ["Database"],
    verification: "passed",
    notes: "Database restored successfully. Data integrity verified."
  },
  {
    id: 3,
    backupName: "Configuration Backup - June 12",
    type: "Configuration Restore",
    status: "completed",
    startedAt: "2024-06-14 16:00:00",
    completedAt: "2024-06-14 16:05:00",
    duration: "5m",
    size: 0.8,
    location: "Local Storage",
    restoredBy: "admin@raas.com",
    reason: "Configuration rollback after update issue",
    components: ["System Config", "App Settings"],
    verification: "passed",
    notes: "Configuration restored. System settings reverted."
  }
];

const BackupRestore = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 via-white to-forest-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-space font-bold text-forest-900">Backup & Restore</h1>
          <p className="text-forest-600">Manage system backups and data recovery</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
            <CardContent className="p-6 text-center">
              <Download className="w-12 h-12 mx-auto text-forest-600 mb-4" />
              <h3 className="font-semibold text-forest-900 mb-2">Create Backup</h3>
              <p className="text-sm text-forest-600 mb-4">Backup all your data</p>
              <Button className="bg-forest-600 hover:bg-forest-700">Create</Button>
            </CardContent>
          </Card>
          <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
            <CardContent className="p-6 text-center">
              <Upload className="w-12 h-12 mx-auto text-forest-600 mb-4" />
              <h3 className="font-semibold text-forest-900 mb-2">Restore Data</h3>
              <p className="text-sm text-forest-600 mb-4">Restore from backup</p>
              <Button variant="outline">Restore</Button>
            </CardContent>
          </Card>
          <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
            <CardContent className="p-6 text-center">
              <Archive className="w-12 h-12 mx-auto text-forest-600 mb-4" />
              <h3 className="font-semibold text-forest-900 mb-2">Archive</h3>
              <p className="text-sm text-forest-600 mb-4">Archive old data</p>
              <Button variant="outline">Archive</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BackupRestore;

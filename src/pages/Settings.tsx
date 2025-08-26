
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Settings as SettingsIcon, Key, Bell, Shield, User, Palette, Database, Zap, Save, Eye, EyeOff } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Settings = () => {
  const [groqKey, setGroqKey] = useState(localStorage.getItem('groq_api_key') || '');
  const [showGroqKey, setShowGroqKey] = useState(false);
  const [notifications, setNotifications] = useState({
    riskAlerts: true,
    marketUpdates: true,
    taskReminders: true,
    emailReports: false
  });
  const [appearance, setAppearance] = useState({
    theme: 'light',
    fontSize: 'medium',
    sidebarCollapsed: false
  });
  const [aiSettings, setAiSettings] = useState({
    model: 'llama-3.1-70b-versatile',
    temperature: 0.7,
    maxTokens: 2048,
    enableSuggestions: true
  });
  const { toast } = useToast();

  const handleSaveSettings = () => {
    // Save Groq API key to localStorage
    if (groqKey) {
      localStorage.setItem('groq_api_key', groqKey);
    } else {
      localStorage.removeItem('groq_api_key');
    }
    
    // Save other settings to localStorage
    localStorage.setItem('app_settings', JSON.stringify({
      notifications,
      appearance,
      aiSettings
    }));

    toast({
      title: "Settings Saved",
      description: "Your preferences have been updated successfully.",
    });
  };

  const testGroqConnection = async () => {
    if (!groqKey) {
      toast({
        title: "API Key Required",
        description: "Please enter your Groq API key first.",
        variant: "destructive"
      });
      return;
    }

    // Simulate API key test
    toast({
      title: "Testing Connection...",
      description: "Verifying your Groq API key...",
    });

    // Simulate async API call
    setTimeout(() => {
      toast({
        title: "Connection Successful",
        description: "Your Groq API key is valid and working.",
      });
    }, 2000);
  };

  const availableModels = [
    { value: 'llama-3.1-70b-versatile', label: 'Llama 3.1 70B Versatile' },
    { value: 'llama-3.1-8b-instant', label: 'Llama 3.1 8B Instant' },
    { value: 'mixtral-8x7b-32768', label: 'Mixtral 8x7B' },
    { value: 'gemma2-9b-it', label: 'Gemma 2 9B IT' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 via-white to-forest-50 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <SettingsIcon className="w-8 h-8 text-forest-600" />
          <div>
            <h1 className="text-3xl font-space font-bold text-forest-900">Settings</h1>
            <p className="text-forest-600">Manage your AI research platform preferences</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Settings */}
          <div className="lg:col-span-2 space-y-6">
            {/* API Configuration */}
            <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-forest-900">
                  <Key className="w-5 h-5" />
                  API Configuration
                </CardTitle>
                <CardDescription>Configure your AI service API keys and endpoints</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="groq-key">Groq API Key</Label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Input
                        id="groq-key"
                        type={showGroqKey ? "text" : "password"}
                        placeholder="Enter your Groq API key..."
                        value={groqKey}
                        onChange={(e) => setGroqKey(e.target.value)}
                        className="pr-10"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3"
                        onClick={() => setShowGroqKey(!showGroqKey)}
                      >
                        {showGroqKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                    </div>
                    <Button onClick={testGroqConnection} variant="outline">
                      Test Connection
                    </Button>
                  </div>
                  <p className="text-xs text-forest-500">
                    Get your API key from <a href="https://console.groq.com/keys" target="_blank" rel="noopener noreferrer" className="text-forest-600 hover:underline">Groq Console</a>
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="model-select">AI Model</Label>
                    <Select value={aiSettings.model} onValueChange={(value) => setAiSettings({...aiSettings, model: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {availableModels.map(model => (
                          <SelectItem key={model.value} value={model.value}>
                            {model.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="temperature">Temperature: {aiSettings.temperature}</Label>
                    <Input
                      id="temperature"
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={aiSettings.temperature}
                      onChange={(e) => setAiSettings({...aiSettings, temperature: parseFloat(e.target.value)})}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-forest-500">
                      <span>Focused</span>
                      <span>Creative</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="max-tokens">Max Tokens: {aiSettings.maxTokens}</Label>
                  <Input
                    id="max-tokens"
                    type="range"
                    min="256"
                    max="4096"
                    step="256"
                    value={aiSettings.maxTokens}
                    onChange={(e) => setAiSettings({...aiSettings, maxTokens: parseInt(e.target.value)})}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-forest-500">
                    <span>256</span>
                    <span>4096</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Notification Settings */}
            <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-forest-900">
                  <Bell className="w-5 h-5" />
                  Notifications
                </CardTitle>
                <CardDescription>Control how and when you receive alerts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="risk-alerts">Risk Alerts</Label>
                    <p className="text-sm text-forest-500">Get notified about high-risk market conditions</p>
                  </div>
                  <Switch
                    id="risk-alerts"
                    checked={notifications.riskAlerts}
                    onCheckedChange={(checked) => setNotifications({...notifications, riskAlerts: checked})}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="market-updates">Market Updates</Label>
                    <p className="text-sm text-forest-500">Receive real-time market movement notifications</p>
                  </div>
                  <Switch
                    id="market-updates"
                    checked={notifications.marketUpdates}
                    onCheckedChange={(checked) => setNotifications({...notifications, marketUpdates: checked})}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="task-reminders">Task Reminders</Label>
                    <p className="text-sm text-forest-500">Get reminded about upcoming research tasks</p>
                  </div>
                  <Switch
                    id="task-reminders"
                    checked={notifications.taskReminders}
                    onCheckedChange={(checked) => setNotifications({...notifications, taskReminders: checked})}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="email-reports">Email Reports</Label>
                    <p className="text-sm text-forest-500">Receive daily/weekly summary reports via email</p>
                  </div>
                  <Switch
                    id="email-reports"
                    checked={notifications.emailReports}
                    onCheckedChange={(checked) => setNotifications({...notifications, emailReports: checked})}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Appearance Settings */}
            <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-forest-900">
                  <Palette className="w-5 h-5" />
                  Appearance
                </CardTitle>
                <CardDescription>Customize the look and feel of your dashboard</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Theme</Label>
                    <Select value={appearance.theme} onValueChange={(value) => setAppearance({...appearance, theme: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="auto">Auto</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Font Size</Label>
                    <Select value={appearance.fontSize} onValueChange={(value) => setAppearance({...appearance, fontSize: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="small">Small</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="large">Large</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="sidebar-collapsed">Collapse Sidebar by Default</Label>
                    <p className="text-sm text-forest-500">Start with a collapsed navigation sidebar</p>
                  </div>
                  <Switch
                    id="sidebar-collapsed"
                    checked={appearance.sidebarCollapsed}
                    onCheckedChange={(checked) => setAppearance({...appearance, sidebarCollapsed: checked})}
                  />
                </div>
              </CardContent>
            </Card>

            {/* AI Assistant Settings */}
            <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-forest-900">
                  <Zap className="w-5 h-5" />
                  AI Assistant
                </CardTitle>
                <CardDescription>Configure AI assistant behavior and suggestions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="enable-suggestions">Enable AI Suggestions</Label>
                    <p className="text-sm text-forest-500">Get AI-powered recommendations and insights</p>
                  </div>
                  <Switch
                    id="enable-suggestions"
                    checked={aiSettings.enableSuggestions}
                    onCheckedChange={(checked) => setAiSettings({...aiSettings, enableSuggestions: checked})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="custom-prompt">Custom System Prompt</Label>
                  <Textarea
                    id="custom-prompt"
                    placeholder="Enter custom instructions for the AI assistant..."
                    className="min-h-[100px] resize-none"
                  />
                  <p className="text-xs text-forest-500">
                    Customize how the AI assistant behaves and responds to your queries
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Account Status */}
            <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-forest-900">
                  <User className="w-5 h-5" />
                  Account Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-forest-600">Plan</span>
                  <Badge variant="default" className="bg-forest-600">Professional</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-forest-600">API Calls Used</span>
                  <span className="font-medium text-forest-900">1,247 / 10,000</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-forest-600">Storage Used</span>
                  <span className="font-medium text-forest-900">2.3 GB / 50 GB</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-forest-600 h-2 rounded-full" style={{ width: '12.47%' }}></div>
                </div>
              </CardContent>
            </Card>

            {/* Security */}
            <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-forest-900">
                  <Shield className="w-5 h-5" />
                  Security
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  Change Password
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Two-Factor Authentication
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Download Data
                </Button>
                <Button variant="destructive" className="w-full justify-start">
                  Delete Account
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-forest-900">
                  <Database className="w-5 h-5" />
                  Data Management
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start text-sm">
                  Export Research Data
                </Button>
                <Button variant="outline" className="w-full justify-start text-sm">
                  Clear Cache
                </Button>
                <Button variant="outline" className="w-full justify-start text-sm">
                  Reset Preferences
                </Button>
              </CardContent>
            </Card>

            {/* Save Button */}
            <Button 
              onClick={handleSaveSettings}
              className="w-full bg-forest-600 hover:bg-forest-700"
              size="lg"
            >
              <Save className="w-4 h-4 mr-2" />
              Save All Settings
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;

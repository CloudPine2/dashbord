import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  User, 
  Mail, 
  Calendar, 
  MapPin, 
  Building, 
  Phone, 
  Globe, 
  Edit, 
  Save, 
  Camera,
  Shield,
  Key,
  Activity,
  Clock,
  Star,
  Award,
  BookOpen,
  Users,
  FileText,
  BarChart3
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { updateProfile } from 'firebase/auth';
import { fixGoogleProfilePicture, getInitials, getAvatarColor } from '@/lib/imageUtils';

interface UserProfileData {
  displayName: string;
  email: string;
  photoURL: string;
  bio: string;
  location: string;
  organization: string;
  phone: string;
  website: string;
  role: string;
  joinDate: string;
  lastActive: string;
  researchInterests: string[];
  publications: number;
  collaborations: number;
  projects: number;
}

export default function UserProfile() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [profileData, setProfileData] = useState<UserProfileData>({
    displayName: user?.displayName || '',
    email: user?.email || '',
    photoURL: user?.photoURL || '',
    bio: 'AI Research Specialist with expertise in machine learning and data analysis.',
    location: 'London, UK',
    organization: 'CloudPine Research Institute',
    phone: '+44 20 1234 5678',
    website: 'https://cloudpine.ai',
    role: 'Senior Research Scientist',
    joinDate: 'January 2024',
    lastActive: '2 hours ago',
    researchInterests: ['Machine Learning', 'AI Ethics', 'Data Science', 'Research Automation'],
    publications: 24,
    collaborations: 18,
    projects: 12
  });

  const [editData, setEditData] = useState<UserProfileData>(profileData);

  useEffect(() => {
    if (user) {
      setProfileData(prev => ({
        ...prev,
        displayName: user.displayName || prev.displayName,
        email: user.email || prev.email,
        photoURL: user.photoURL || prev.photoURL
      }));
      setEditData(prev => ({
        ...prev,
        displayName: user.displayName || prev.displayName,
        email: user.email || prev.email,
        photoURL: user.photoURL || prev.photoURL
      }));
    }
  }, [user]);

  const handleSave = async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      await updateProfile(user, {
        displayName: editData.displayName,
        photoURL: editData.photoURL
      });
      
      setProfileData(editData);
      setIsEditing(false);
      
      toast({
        title: "Profile updated successfully!",
        description: "Your profile changes have been saved.",
      });
    } catch (error) {
      toast({
        title: "Update failed",
        description: "Failed to update profile. Please try again.",
        variant: "destructive"
      });
    }
    setIsLoading(false);
  };

  const handleCancel = () => {
    setEditData(profileData);
    setIsEditing(false);
  };

  const handleInputChange = (field: keyof UserProfileData, value: string) => {
    setEditData(prev => ({ ...prev, [field]: value }));
  };

  const handleInterestChange = (index: number, value: string) => {
    const newInterests = [...editData.researchInterests];
    newInterests[index] = value;
    setEditData(prev => ({ ...prev, researchInterests: newInterests }));
  };

  const addInterest = () => {
    setEditData(prev => ({
      ...prev,
      researchInterests: [...prev.researchInterests, '']
    }));
  };

  const removeInterest = (index: number) => {
    setEditData(prev => ({
      ...prev,
      researchInterests: prev.researchInterests.filter((_, i) => i !== index)
    }));
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <User className="w-16 h-16 text-forest-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-forest-800">Please log in to view your profile</h3>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-forest-900">User Profile</h1>
          <p className="text-forest-600">Manage your account and research preferences</p>
        </div>
        <div className="flex gap-2">
          {isEditing ? (
            <>
              <Button onClick={handleCancel} variant="outline">
                Cancel
              </Button>
              <Button onClick={handleSave} disabled={isLoading}>
                {isLoading ? 'Saving...' : 'Save Changes'}
              </Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)}>
              <Edit className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
          )}
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="personal">Personal Info</TabsTrigger>
          <TabsTrigger value="research">Research</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Profile Card */}
            <Card className="lg:col-span-1">
              <CardHeader className="text-center">
                <div className="relative mx-auto w-32 h-32 mb-4">
                                     {isEditing ? (
                     <div className="w-32 h-32 rounded-full bg-forest-100 flex items-center justify-center border-2 border-dashed border-forest-300">
                       <Camera className="w-8 h-8 text-forest-400" />
                     </div>
                   ) : (
                     <>
                       {profileData.photoURL && profileData.photoURL !== 'null' ? (
                         <img
                           src={fixGoogleProfilePicture(profileData.photoURL) || profileData.photoURL}
                           alt="Profile"
                           className="w-32 h-32 rounded-full object-cover border-4 border-forest-100"
                           onError={(e) => {
                             console.log('Profile image failed to load, falling back to initials:', profileData.photoURL);
                             e.currentTarget.style.display = 'none';
                             // Show fallback avatar
                             const fallback = e.currentTarget.nextElementSibling;
                             if (fallback) fallback.style.display = 'flex';
                           }}
                         />
                       ) : null}
                       <div className={`w-32 h-32 rounded-full ${getAvatarColor(profileData.displayName || profileData.email || 'User')} flex items-center justify-center border-4 border-forest-100 text-white text-4xl font-bold ${profileData.photoURL && profileData.photoURL !== 'null' ? 'hidden' : ''}`}>
                         {getInitials(profileData.displayName, profileData.email)}
                       </div>
                     </>
                   )}
                </div>
                <CardTitle className="text-2xl">{profileData.displayName}</CardTitle>
                <CardDescription className="text-lg">{profileData.role}</CardDescription>
                <Badge variant="secondary" className="mt-2">
                  {profileData.organization}
                </Badge>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2 text-forest-600">
                  <Mail className="w-4 h-4" />
                  <span className="text-sm">{profileData.email}</span>
                </div>
                <div className="flex items-center gap-2 text-forest-600">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">{profileData.location}</span>
                </div>
                <div className="flex items-center gap-2 text-forest-600">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">Joined {profileData.joinDate}</span>
                </div>
              </CardContent>
            </Card>

            {/* Stats Cards */}
            <div className="lg:col-span-2 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-4 text-center">
                    <FileText className="w-8 h-8 text-forest-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-forest-900">{profileData.publications}</div>
                    <p className="text-sm text-forest-600">Publications</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <Users className="w-8 h-8 text-forest-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-forest-900">{profileData.collaborations}</div>
                    <p className="text-sm text-forest-600">Collaborations</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <BarChart3 className="w-8 h-8 text-forest-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-forest-900">{profileData.projects}</div>
                    <p className="text-sm text-forest-600">Active Projects</p>
                  </CardContent>
                </Card>
              </div>

              {/* Bio */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5" />
                    About
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-forest-700 leading-relaxed">{profileData.bio}</p>
                </CardContent>
              </Card>

              {/* Research Interests */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="w-5 h-5" />
                    Research Interests
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {profileData.researchInterests.map((interest, index) => (
                      <Badge key={index} variant="outline" className="text-forest-700">
                        {interest}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Personal Info Tab */}
        <TabsContent value="personal" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Update your personal details and contact information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="displayName">Full Name</Label>
                  <Input
                    id="displayName"
                    value={editData.displayName}
                    onChange={(e) => handleInputChange('displayName', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    value={editData.email}
                    disabled
                    className="bg-forest-50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={editData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={editData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="organization">Organization</Label>
                  <Input
                    id="organization"
                    value={editData.organization}
                    onChange={(e) => handleInputChange('organization', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    value={editData.website}
                    onChange={(e) => handleInputChange('website', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={editData.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  disabled={!isEditing}
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Research Tab */}
        <TabsContent value="research" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Research Interests</CardTitle>
              <CardDescription>Manage your research areas and specializations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {editData.researchInterests.map((interest, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={interest}
                    onChange={(e) => handleInterestChange(index, e.target.value)}
                    disabled={!isEditing}
                    placeholder="Enter research interest"
                  />
                  {isEditing && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeInterest(index)}
                      className="text-red-600 hover:text-red-700"
                    >
                      Remove
                    </Button>
                  )}
                </div>
              ))}
              {isEditing && (
                <Button variant="outline" onClick={addInterest}>
                  Add Interest
                </Button>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Account Security</CardTitle>
              <CardDescription>Manage your account security settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-forest-600" />
                  <div>
                    <p className="font-medium">Two-Factor Authentication</p>
                    <p className="text-sm text-forest-600">Add an extra layer of security</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Enable
                </Button>
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Key className="w-5 h-5 text-forest-600" />
                  <div>
                    <p className="font-medium">Change Password</p>
                    <p className="text-sm text-forest-600">Update your account password</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Change
                </Button>
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Activity className="w-5 h-5 text-forest-600" />
                  <div>
                    <p className="font-medium">Login Activity</p>
                    <p className="text-sm text-forest-600">View recent login attempts</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  View
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

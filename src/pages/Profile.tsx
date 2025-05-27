import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, Mail, Phone, MapPin, User, Bell, Lock, CreditCard, Shield } from "lucide-react";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "Gokul",
    email: "gokul@example.com",
    phone: "+91 1234567890",
    location: "Kerala, India",
    bio: "Software Developer passionate about creating amazing user experiences.",
  });

  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const activePillRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Security", icon: Shield },
    { id: "billing", label: "Billing", icon: CreditCard },
  ];

  useEffect(() => {
    const index = tabs.findIndex(tab => tab.id === activeTab);
    const activeButton = tabRefs.current[index];
    
    if (activeButton && activePillRef.current) {
      const { width } = activeButton.getBoundingClientRect();
      const leftPosition = activeButton.offsetLeft;
      
      activePillRef.current.style.width = `${width}px`;
      activePillRef.current.style.transform = `translateX(${leftPosition}px)`;
    }
  }, [activeTab]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const ProfileInformation = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="lg:col-span-1 w-full">
        <CardHeader>
          <CardTitle>Profile Picture</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-4">
          <Avatar className="w-32 h-32">
            <AvatarImage src={profileImage || undefined} />
            <AvatarFallback className="text-4xl">
              {formData.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-center gap-2">
            <Label htmlFor="image-upload" className="cursor-pointer">
              <Button variant="outline" className="gap-2">
                <Camera className="w-4 h-4" />
                Upload New Picture
              </Button>
            </Label>
            <Input
              id="image-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
          </div>
        </CardContent>
      </Card>

      <Card className="lg:col-span-2 w-full">
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="pl-9"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="pl-9"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="pl-9"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="pl-9"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
              className="w-full min-h-[100px] p-3 rounded-md border border-input bg-background resize-none"
            />
          </div>

          <div className="flex flex-col sm:flex-row justify-end gap-4">
            <Button variant="outline" className="w-full sm:w-auto">Cancel</Button>
            <Button className="w-full sm:w-auto">Save Changes</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const NotificationSettings = () => (
    <Card>
      <CardHeader>
        <CardTitle>Notification Preferences</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Email Notifications</Label>
              <p className="text-sm text-muted-foreground">Receive email updates about your account</p>
            </div>
            <Button variant="outline" size="sm">Configure</Button>
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Push Notifications</Label>
              <p className="text-sm text-muted-foreground">Receive push notifications on your devices</p>
            </div>
            <Button variant="outline" size="sm">Configure</Button>
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Marketing Emails</Label>
              <p className="text-sm text-muted-foreground">Receive emails about new features and updates</p>
            </div>
            <Button variant="outline" size="sm">Configure</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const SecuritySettings = () => (
    <Card>
      <CardHeader>
        <CardTitle>Security Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Two-Factor Authentication</Label>
              <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
            </div>
            <Button variant="outline" size="sm">Enable</Button>
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Change Password</Label>
              <p className="text-sm text-muted-foreground">Update your password regularly to keep your account secure</p>
            </div>
            <Button variant="outline" size="sm">Change</Button>
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Login History</Label>
              <p className="text-sm text-muted-foreground">View your recent login activity</p>
            </div>
            <Button variant="outline" size="sm">View</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const BillingSettings = () => (
    <Card>
      <CardHeader>
        <CardTitle>Billing Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Payment Methods</Label>
              <p className="text-sm text-muted-foreground">Manage your payment methods and billing information</p>
            </div>
            <Button variant="outline" size="sm">Manage</Button>
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Billing History</Label>
              <p className="text-sm text-muted-foreground">View your past invoices and payment history</p>
            </div>
            <Button variant="outline" size="sm">View</Button>
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Subscription Plan</Label>
              <p className="text-sm text-muted-foreground">Current plan: Professional</p>
            </div>
            <Button variant="outline" size="sm">Upgrade</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="bg-background text-foreground min-h-screen w-full max-w-full overflow-x-auto">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-foreground">Profile Settings</h1>
      <div className="space-y-6">
        <div 
          ref={containerRef}
          className="inline-flex flex-nowrap bg-muted p-1 rounded-lg relative overflow-x-auto max-w-full scrollbar-hide"
        >
          <div
            ref={activePillRef}
            className="absolute h-[calc(100%-8px)] top-1 bg-background shadow-sm rounded-lg transition-all duration-300 ease-out"
            style={{
              width: "0px",
              left: "0px",
            }}
          />

          {tabs.map((tab, index) => (
            <button
              key={tab.id}
              ref={(el) => {
                tabRefs.current[index] = el;
              }}
              className={`relative flex items-center gap-2 py-2 px-6 text-sm font-medium rounded-lg transition-colors hover:cursor-pointer ${
                activeTab === tab.id
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        <div className="mt-6">
          {activeTab === "profile" && <ProfileInformation />}
          {activeTab === "notifications" && <NotificationSettings />}
          {activeTab === "security" && <SecuritySettings />}
          {activeTab === "billing" && <BillingSettings />}
        </div>
      </div>
    </div>
  );
};

export default Profile; 

import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  LayoutDashboard, 
  Users, 
  Music, 
  Calendar, 
  Image, 
  FileText, 
  LogOut,
  ArrowRight
} from "lucide-react";
import logo from "@/assets/hype-house-logo.png";

const adminSections = [
  {
    title: "Promo Sliders",
    description: "Manage promotional banners across all pages",
    icon: Image,
    href: "/admin/promos",
    color: "text-blue-500",
  },
  {
    title: "Artists",
    description: "Add, edit, or remove artists from the roster",
    icon: Users,
    href: "/admin/artists",
    color: "text-purple-500",
  },
  {
    title: "Music Releases",
    description: "Upload and manage music releases",
    icon: Music,
    href: "/admin/music",
    color: "text-pink-500",
  },
  {
    title: "Events",
    description: "Create and manage upcoming events",
    icon: Calendar,
    href: "/admin/events",
    color: "text-green-500",
  },
  {
    title: "Demo Submissions",
    description: "Review artist demo submissions",
    icon: FileText,
    href: "/admin/demos",
    color: "text-orange-500",
  },
];

const AdminDashboard = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/admin");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/">
              <img src={logo} alt="Hype House Creative" className="h-10" />
            </Link>
            <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground">
              <LayoutDashboard className="h-4 w-4" />
              <span>Admin Dashboard</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground hidden md:block">
              {user?.email}
            </span>
            <Button variant="ghost" size="sm" onClick={handleSignOut}>
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-4 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-display-sm mb-2">Welcome back</h1>
          <p className="text-muted-foreground">
            Manage your website content from here.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {adminSections.map((section) => (
            <Card key={section.title} className="group hover:border-primary/50 transition-colors">
              <CardHeader>
                <section.icon className={`h-8 w-8 ${section.color} mb-2`} />
                <CardTitle className="flex items-center justify-between">
                  {section.title}
                  <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </CardTitle>
                <CardDescription>{section.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full" asChild>
                  <Link to={section.href}>Manage {section.title}</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick link back to site */}
        <div className="mt-12 text-center">
          <Button variant="ghost" asChild>
            <Link to="/">
              ← View Live Website
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;

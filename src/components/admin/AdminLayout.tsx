import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  Users, 
  Music, 
  Calendar, 
  Image, 
  FileText, 
  LogOut,
  ArrowLeft
} from "lucide-react";
import logo from "@/assets/hype-house-logo.png";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

const navItems = [
  { title: "Dashboard", icon: LayoutDashboard, href: "/admin/dashboard" },
  { title: "Promo Sliders", icon: Image, href: "/admin/promos" },
  { title: "Artists", icon: Users, href: "/admin/artists" },
  { title: "Music", icon: Music, href: "/admin/music" },
  { title: "Events", icon: Calendar, href: "/admin/events" },
  { title: "Demos", icon: FileText, href: "/admin/demos" },
];

interface AdminLayoutProps {
  children: ReactNode;
  title: string;
  description?: string;
}

export const AdminLayout = ({ children, title, description }: AdminLayoutProps) => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignOut = async () => {
    await signOut();
    navigate("/admin");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-border bg-card hidden lg:block">
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="border-b border-border p-4">
            <Link to="/">
              <img src={logo} alt="Hype House Creative" className="h-10" />
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 p-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                  location.pathname === item.href
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.title}
              </Link>
            ))}
          </nav>

          {/* User section */}
          <div className="border-t border-border p-4">
            <p className="text-xs text-muted-foreground mb-2 truncate">{user?.email}</p>
            <Button variant="ghost" size="sm" className="w-full justify-start" onClick={handleSignOut}>
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </aside>

      {/* Mobile header */}
      <header className="lg:hidden border-b border-border bg-card sticky top-0 z-30">
        <div className="flex items-center justify-between p-4">
          <Link to="/admin/dashboard">
            <img src={logo} alt="Hype House Creative" className="h-8" />
          </Link>
          <Button variant="ghost" size="sm" onClick={handleSignOut}>
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
        {/* Mobile nav */}
        <div className="flex overflow-x-auto gap-2 p-2 border-t border-border">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs whitespace-nowrap transition-colors",
                location.pathname === item.href
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent"
              )}
            >
              <item.icon className="h-3 w-3" />
              {item.title}
            </Link>
          ))}
        </div>
      </header>

      {/* Main content */}
      <main className="lg:pl-64">
        <div className="container mx-auto px-4 lg:px-8 py-8">
          {/* Page header */}
          <div className="mb-8">
            <Button variant="ghost" size="sm" asChild className="mb-4">
              <Link to="/admin/dashboard">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Link>
            </Button>
            <h1 className="text-display-sm mb-2">{title}</h1>
            {description && (
              <p className="text-muted-foreground">{description}</p>
            )}
          </div>

          {children}
        </div>
      </main>
    </div>
  );
};

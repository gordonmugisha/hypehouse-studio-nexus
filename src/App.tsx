import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/hooks/useTheme";
import { AuthProvider } from "@/hooks/useAuth";
import { ProtectedRoute } from "@/components/admin/ProtectedRoute";
import Index from "./pages/Index";
import SubmitDemo from "./pages/SubmitDemo";
import Artists from "./pages/Artists";
import ArtistDetail from "./pages/ArtistDetail";
import Music from "./pages/Music";
import Events from "./pages/Events";
import EventDetail from "./pages/EventDetail";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminPromos from "./pages/admin/AdminPromos";
import AdminArtists from "./pages/admin/AdminArtists";
import AdminMusic from "./pages/admin/AdminMusic";
import AdminEvents from "./pages/admin/AdminEvents";
import AdminDemos from "./pages/admin/AdminDemos";
import AdminMediaUpload from "./pages/admin/AdminMediaUpload";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/submit" element={<SubmitDemo />} />
              <Route path="/artists" element={<Artists />} />
              <Route path="/artists/:slug" element={<ArtistDetail />} />
              <Route path="/music" element={<Music />} />
              <Route path="/events" element={<Events />} />
              <Route path="/events/:id" element={<EventDetail />} />
              <Route path="/about" element={<About />} />
              
              {/* Admin routes */}
              <Route path="/admin" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
              <Route path="/admin/promos" element={<ProtectedRoute><AdminPromos /></ProtectedRoute>} />
              <Route path="/admin/artists" element={<ProtectedRoute><AdminArtists /></ProtectedRoute>} />
              <Route path="/admin/music" element={<ProtectedRoute><AdminMusic /></ProtectedRoute>} />
              <Route path="/admin/events" element={<ProtectedRoute><AdminEvents /></ProtectedRoute>} />
              <Route path="/admin/demos" element={<ProtectedRoute><AdminDemos /></ProtectedRoute>} />
              <Route path="/admin/media" element={<ProtectedRoute><AdminMediaUpload /></ProtectedRoute>} />
              
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;

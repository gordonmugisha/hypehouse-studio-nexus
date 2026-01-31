import { useState, useEffect } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Plus, Pencil, Trash2, Users } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Artist {
  id: string;
  name: string;
  slug: string;
  bio: string | null;
  short_bio: string | null;
  image_url: string | null;
  genre: string | null;
  spotify_url: string | null;
  soundcloud_url: string | null;
  instagram_url: string | null;
  youtube_url: string | null;
  is_featured: boolean;
  is_active: boolean;
}

const AdminArtists = () => {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingArtist, setEditingArtist] = useState<Artist | null>(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    bio: "",
    short_bio: "",
    image_url: "",
    genre: "",
    spotify_url: "",
    soundcloud_url: "",
    instagram_url: "",
    youtube_url: "",
    is_featured: false,
    is_active: true,
  });

  const fetchArtists = async () => {
    const { data, error } = await supabase
      .from("artists")
      .select("*")
      .order("name", { ascending: true });

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      setArtists(data || []);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchArtists();
  }, []);

  const generateSlug = (name: string) => {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  };

  const resetForm = () => {
    setFormData({
      name: "",
      slug: "",
      bio: "",
      short_bio: "",
      image_url: "",
      genre: "",
      spotify_url: "",
      soundcloud_url: "",
      instagram_url: "",
      youtube_url: "",
      is_featured: false,
      is_active: true,
    });
    setEditingArtist(null);
  };

  const openEditDialog = (artist: Artist) => {
    setEditingArtist(artist);
    setFormData({
      name: artist.name,
      slug: artist.slug,
      bio: artist.bio || "",
      short_bio: artist.short_bio || "",
      image_url: artist.image_url || "",
      genre: artist.genre || "",
      spotify_url: artist.spotify_url || "",
      soundcloud_url: artist.soundcloud_url || "",
      instagram_url: artist.instagram_url || "",
      youtube_url: artist.youtube_url || "",
      is_featured: artist.is_featured,
      is_active: artist.is_active,
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const artistData = {
      name: formData.name,
      slug: formData.slug || generateSlug(formData.name),
      bio: formData.bio || null,
      short_bio: formData.short_bio || null,
      image_url: formData.image_url || null,
      genre: formData.genre || null,
      spotify_url: formData.spotify_url || null,
      soundcloud_url: formData.soundcloud_url || null,
      instagram_url: formData.instagram_url || null,
      youtube_url: formData.youtube_url || null,
      is_featured: formData.is_featured,
      is_active: formData.is_active,
    };

    if (editingArtist) {
      const { error } = await supabase
        .from("artists")
        .update(artistData)
        .eq("id", editingArtist.id);

      if (error) {
        toast({ title: "Error", description: error.message, variant: "destructive" });
        return;
      }
      toast({ title: "Success", description: "Artist updated" });
    } else {
      const { error } = await supabase.from("artists").insert(artistData);

      if (error) {
        toast({ title: "Error", description: error.message, variant: "destructive" });
        return;
      }
      toast({ title: "Success", description: "Artist created" });
    }

    setIsDialogOpen(false);
    resetForm();
    fetchArtists();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this artist?")) return;

    const { error } = await supabase.from("artists").delete().eq("id", id);

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: "Deleted", description: "Artist removed" });
    fetchArtists();
  };

  const toggleActive = async (artist: Artist) => {
    const { error } = await supabase
      .from("artists")
      .update({ is_active: !artist.is_active })
      .eq("id", artist.id);

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
      return;
    }
    fetchArtists();
  };

  return (
    <AdminLayout
      title="Artists"
      description="Manage the artist roster"
    >
      <div className="flex justify-end mb-6">
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) resetForm();
        }}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Artist
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingArtist ? "Edit Artist" : "Add New Artist"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        name: e.target.value,
                        slug: generateSlug(e.target.value),
                      });
                    }}
                    placeholder="Artist Name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="slug">Slug</Label>
                  <Input
                    id="slug"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="artist-name"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="genre">Genre</Label>
                  <Input
                    id="genre"
                    value={formData.genre}
                    onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
                    placeholder="Hip-Hop, Electronic, etc."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="image_url">Image URL</Label>
                  <Input
                    id="image_url"
                    value={formData.image_url}
                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                    placeholder="https://..."
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="short_bio">Short Bio</Label>
                <Input
                  id="short_bio"
                  value={formData.short_bio}
                  onChange={(e) => setFormData({ ...formData, short_bio: e.target.value })}
                  placeholder="Brief description for cards"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Full Bio</Label>
                <Textarea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  placeholder="Full artist biography..."
                  rows={4}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="spotify_url">Spotify URL</Label>
                  <Input
                    id="spotify_url"
                    value={formData.spotify_url}
                    onChange={(e) => setFormData({ ...formData, spotify_url: e.target.value })}
                    placeholder="https://open.spotify.com/..."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="soundcloud_url">SoundCloud URL</Label>
                  <Input
                    id="soundcloud_url"
                    value={formData.soundcloud_url}
                    onChange={(e) => setFormData({ ...formData, soundcloud_url: e.target.value })}
                    placeholder="https://soundcloud.com/..."
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="instagram_url">Instagram URL</Label>
                  <Input
                    id="instagram_url"
                    value={formData.instagram_url}
                    onChange={(e) => setFormData({ ...formData, instagram_url: e.target.value })}
                    placeholder="https://instagram.com/..."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="youtube_url">YouTube URL</Label>
                  <Input
                    id="youtube_url"
                    value={formData.youtube_url}
                    onChange={(e) => setFormData({ ...formData, youtube_url: e.target.value })}
                    placeholder="https://youtube.com/..."
                  />
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <Switch
                    checked={formData.is_featured}
                    onCheckedChange={(checked) => setFormData({ ...formData, is_featured: checked })}
                  />
                  <Label>Featured</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={formData.is_active}
                    onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
                  />
                  <Label>Active</Label>
                </div>
              </div>
              <Button type="submit" className="w-full">
                {editingArtist ? "Update Artist" : "Create Artist"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <div className="text-center py-12 text-muted-foreground">Loading...</div>
      ) : artists.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No artists yet. Add your first one!</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {artists.map((artist) => (
            <Card key={artist.id} className={!artist.is_active ? "opacity-60" : ""}>
              <CardHeader className="pb-2">
                <div className="flex items-start gap-4">
                  {artist.image_url ? (
                    <img
                      src={artist.image_url}
                      alt={artist.name}
                      className="h-16 w-16 object-cover rounded-full"
                    />
                  ) : (
                    <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center">
                      <Users className="h-8 w-8 text-muted-foreground" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-lg truncate">
                      {artist.name}
                      {artist.is_featured && (
                        <span className="ml-2 text-xs bg-primary/20 text-primary px-2 py-0.5 rounded">
                          Featured
                        </span>
                      )}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">{artist.genre || "No genre"}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                  {artist.short_bio || "No bio available"}
                </p>
                <div className="flex items-center justify-between">
                  <Switch
                    checked={artist.is_active}
                    onCheckedChange={() => toggleActive(artist)}
                  />
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" onClick={() => openEditDialog(artist)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive"
                      onClick={() => handleDelete(artist.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminArtists;

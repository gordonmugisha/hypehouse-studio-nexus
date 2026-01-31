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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Plus, Pencil, Trash2, Music, Download } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Artist {
  id: string;
  name: string;
}

interface MusicRelease {
  id: string;
  title: string;
  artist_id: string | null;
  artist_name: string;
  cover_url: string | null;
  release_date: string;
  genre: string | null;
  spotify_url: string | null;
  apple_music_url: string | null;
  soundcloud_url: string | null;
  download_url: string | null;
  is_featured: boolean;
  is_active: boolean;
}

const AdminMusic = () => {
  const [releases, setReleases] = useState<MusicRelease[]>([]);
  const [artists, setArtists] = useState<Artist[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingRelease, setEditingRelease] = useState<MusicRelease | null>(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    title: "",
    artist_id: "",
    artist_name: "",
    cover_url: "",
    release_date: new Date().toISOString().split("T")[0],
    genre: "",
    spotify_url: "",
    apple_music_url: "",
    soundcloud_url: "",
    download_url: "",
    is_featured: false,
    is_active: true,
  });

  const fetchData = async () => {
    const [releasesRes, artistsRes] = await Promise.all([
      supabase.from("music_releases").select("*").order("release_date", { ascending: false }),
      supabase.from("artists").select("id, name").eq("is_active", true).order("name"),
    ]);

    if (releasesRes.error) {
      toast({ title: "Error", description: releasesRes.error.message, variant: "destructive" });
    } else {
      setReleases(releasesRes.data || []);
    }

    if (!artistsRes.error) {
      setArtists(artistsRes.data || []);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const resetForm = () => {
    setFormData({
      title: "",
      artist_id: "",
      artist_name: "",
      cover_url: "",
      release_date: new Date().toISOString().split("T")[0],
      genre: "",
      spotify_url: "",
      apple_music_url: "",
      soundcloud_url: "",
      download_url: "",
      is_featured: false,
      is_active: true,
    });
    setEditingRelease(null);
  };

  const openEditDialog = (release: MusicRelease) => {
    setEditingRelease(release);
    setFormData({
      title: release.title,
      artist_id: release.artist_id || "",
      artist_name: release.artist_name,
      cover_url: release.cover_url || "",
      release_date: release.release_date,
      genre: release.genre || "",
      spotify_url: release.spotify_url || "",
      apple_music_url: release.apple_music_url || "",
      soundcloud_url: release.soundcloud_url || "",
      download_url: release.download_url || "",
      is_featured: release.is_featured,
      is_active: release.is_active,
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const selectedArtist = artists.find((a) => a.id === formData.artist_id);
    const artistName = selectedArtist?.name || formData.artist_name;

    const releaseData = {
      title: formData.title,
      artist_id: formData.artist_id || null,
      artist_name: artistName,
      cover_url: formData.cover_url || null,
      release_date: formData.release_date,
      genre: formData.genre || null,
      spotify_url: formData.spotify_url || null,
      apple_music_url: formData.apple_music_url || null,
      soundcloud_url: formData.soundcloud_url || null,
      download_url: formData.download_url || null,
      is_featured: formData.is_featured,
      is_active: formData.is_active,
    };

    if (editingRelease) {
      const { error } = await supabase
        .from("music_releases")
        .update(releaseData)
        .eq("id", editingRelease.id);

      if (error) {
        toast({ title: "Error", description: error.message, variant: "destructive" });
        return;
      }
      toast({ title: "Success", description: "Release updated" });
    } else {
      const { error } = await supabase.from("music_releases").insert(releaseData);

      if (error) {
        toast({ title: "Error", description: error.message, variant: "destructive" });
        return;
      }
      toast({ title: "Success", description: "Release created" });
    }

    setIsDialogOpen(false);
    resetForm();
    fetchData();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this release?")) return;

    const { error } = await supabase.from("music_releases").delete().eq("id", id);

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: "Deleted", description: "Release removed" });
    fetchData();
  };

  const toggleActive = async (release: MusicRelease) => {
    const { error } = await supabase
      .from("music_releases")
      .update({ is_active: !release.is_active })
      .eq("id", release.id);

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
      return;
    }
    fetchData();
  };

  return (
    <AdminLayout
      title="Music Releases"
      description="Manage music releases and downloads"
    >
      <div className="flex justify-end mb-6">
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) resetForm();
        }}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Release
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingRelease ? "Edit Release" : "Add New Release"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Track or Album Title"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Artist</Label>
                  <Select
                    value={formData.artist_id}
                    onValueChange={(value) => setFormData({ ...formData, artist_id: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select artist" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Custom artist name</SelectItem>
                      {artists.map((artist) => (
                        <SelectItem key={artist.id} value={artist.id}>
                          {artist.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {!formData.artist_id && (
                  <div className="space-y-2">
                    <Label htmlFor="artist_name">Artist Name *</Label>
                    <Input
                      id="artist_name"
                      value={formData.artist_name}
                      onChange={(e) => setFormData({ ...formData, artist_name: e.target.value })}
                      placeholder="Artist name"
                      required={!formData.artist_id}
                    />
                  </div>
                )}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="release_date">Release Date</Label>
                  <Input
                    id="release_date"
                    type="date"
                    value={formData.release_date}
                    onChange={(e) => setFormData({ ...formData, release_date: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="genre">Genre</Label>
                  <Input
                    id="genre"
                    value={formData.genre}
                    onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
                    placeholder="Hip-Hop, Electronic, etc."
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="cover_url">Cover Image URL</Label>
                <Input
                  id="cover_url"
                  value={formData.cover_url}
                  onChange={(e) => setFormData({ ...formData, cover_url: e.target.value })}
                  placeholder="https://..."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="download_url">Download URL (for user downloads)</Label>
                <Input
                  id="download_url"
                  value={formData.download_url}
                  onChange={(e) => setFormData({ ...formData, download_url: e.target.value })}
                  placeholder="https://... (direct link to audio file)"
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="spotify_url">Spotify</Label>
                  <Input
                    id="spotify_url"
                    value={formData.spotify_url}
                    onChange={(e) => setFormData({ ...formData, spotify_url: e.target.value })}
                    placeholder="https://..."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="apple_music_url">Apple Music</Label>
                  <Input
                    id="apple_music_url"
                    value={formData.apple_music_url}
                    onChange={(e) => setFormData({ ...formData, apple_music_url: e.target.value })}
                    placeholder="https://..."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="soundcloud_url">SoundCloud</Label>
                  <Input
                    id="soundcloud_url"
                    value={formData.soundcloud_url}
                    onChange={(e) => setFormData({ ...formData, soundcloud_url: e.target.value })}
                    placeholder="https://..."
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
                {editingRelease ? "Update Release" : "Create Release"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <div className="text-center py-12 text-muted-foreground">Loading...</div>
      ) : releases.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <Music className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No releases yet. Add your first one!</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {releases.map((release) => (
            <Card key={release.id} className={!release.is_active ? "opacity-60" : ""}>
              <CardHeader className="pb-2">
                <div className="flex items-start gap-4">
                  {release.cover_url ? (
                    <img
                      src={release.cover_url}
                      alt={release.title}
                      className="h-16 w-16 object-cover rounded"
                    />
                  ) : (
                    <div className="h-16 w-16 rounded bg-muted flex items-center justify-center">
                      <Music className="h-8 w-8 text-muted-foreground" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-lg truncate">
                      {release.title}
                      {release.is_featured && (
                        <span className="ml-2 text-xs bg-primary/20 text-primary px-2 py-0.5 rounded">
                          Featured
                        </span>
                      )}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">{release.artist_name}</p>
                    <p className="text-xs text-muted-foreground">{release.release_date}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 mb-4">
                  {release.download_url && (
                    <a href={release.download_url} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" size="sm">
                        <Download className="h-3 w-3 mr-1" />
                        Download
                      </Button>
                    </a>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <Switch
                    checked={release.is_active}
                    onCheckedChange={() => toggleActive(release)}
                  />
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" onClick={() => openEditDialog(release)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive"
                      onClick={() => handleDelete(release.id)}
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

export default AdminMusic;

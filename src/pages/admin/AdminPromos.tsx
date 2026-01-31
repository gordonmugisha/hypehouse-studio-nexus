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
import { Plus, Pencil, Trash2, Image as ImageIcon } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface PromoSlide {
  id: string;
  image_url: string;
  title: string;
  subtitle: string | null;
  link: string | null;
  position: string;
  is_active: boolean;
  display_order: number;
}

const AdminPromos = () => {
  const [slides, setSlides] = useState<PromoSlide[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingSlide, setEditingSlide] = useState<PromoSlide | null>(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    image_url: "",
    title: "",
    subtitle: "",
    link: "",
    position: "both",
    is_active: true,
    display_order: 0,
  });

  const fetchSlides = async () => {
    const { data, error } = await supabase
      .from("promo_slides")
      .select("*")
      .order("display_order", { ascending: true });

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      setSlides(data || []);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchSlides();
  }, []);

  const resetForm = () => {
    setFormData({
      image_url: "",
      title: "",
      subtitle: "",
      link: "",
      position: "both",
      is_active: true,
      display_order: slides.length,
    });
    setEditingSlide(null);
  };

  const openEditDialog = (slide: PromoSlide) => {
    setEditingSlide(slide);
    setFormData({
      image_url: slide.image_url,
      title: slide.title,
      subtitle: slide.subtitle || "",
      link: slide.link || "",
      position: slide.position,
      is_active: slide.is_active,
      display_order: slide.display_order,
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const slideData = {
      image_url: formData.image_url,
      title: formData.title,
      subtitle: formData.subtitle || null,
      link: formData.link || null,
      position: formData.position,
      is_active: formData.is_active,
      display_order: formData.display_order,
    };

    if (editingSlide) {
      const { error } = await supabase
        .from("promo_slides")
        .update(slideData)
        .eq("id", editingSlide.id);

      if (error) {
        toast({ title: "Error", description: error.message, variant: "destructive" });
        return;
      }
      toast({ title: "Success", description: "Promo slide updated" });
    } else {
      const { error } = await supabase.from("promo_slides").insert(slideData);

      if (error) {
        toast({ title: "Error", description: error.message, variant: "destructive" });
        return;
      }
      toast({ title: "Success", description: "Promo slide created" });
    }

    setIsDialogOpen(false);
    resetForm();
    fetchSlides();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this promo slide?")) return;

    const { error } = await supabase.from("promo_slides").delete().eq("id", id);

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: "Deleted", description: "Promo slide removed" });
    fetchSlides();
  };

  const toggleActive = async (slide: PromoSlide) => {
    const { error } = await supabase
      .from("promo_slides")
      .update({ is_active: !slide.is_active })
      .eq("id", slide.id);

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
      return;
    }
    fetchSlides();
  };

  return (
    <AdminLayout
      title="Promo Sliders"
      description="Manage promotional banners displayed across all pages"
    >
      <div className="flex justify-end mb-6">
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) resetForm();
        }}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Promo Slide
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>
                {editingSlide ? "Edit Promo Slide" : "Add New Promo Slide"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="image_url">Image URL *</Label>
                <Input
                  id="image_url"
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  placeholder="https://example.com/image.jpg"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="New Album Out Now"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subtitle">Subtitle</Label>
                <Textarea
                  id="subtitle"
                  value={formData.subtitle}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  placeholder="Stream everywhere now"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="link">Link URL</Label>
                <Input
                  id="link"
                  value={formData.link}
                  onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                  placeholder="/music or https://..."
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Position</Label>
                  <Select
                    value={formData.position}
                    onValueChange={(value) => setFormData({ ...formData, position: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="both">Both (Top & Bottom)</SelectItem>
                      <SelectItem value="top">Top Only</SelectItem>
                      <SelectItem value="bottom">Bottom Only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="display_order">Display Order</Label>
                  <Input
                    id="display_order"
                    type="number"
                    value={formData.display_order}
                    onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) })}
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  checked={formData.is_active}
                  onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
                />
                <Label>Active</Label>
              </div>
              <Button type="submit" className="w-full">
                {editingSlide ? "Update Slide" : "Create Slide"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <div className="text-center py-12 text-muted-foreground">Loading...</div>
      ) : slides.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <ImageIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No promo slides yet. Add your first one!</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {slides.map((slide) => (
            <Card key={slide.id} className={!slide.is_active ? "opacity-60" : ""}>
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    {slide.image_url && (
                      <img
                        src={slide.image_url}
                        alt={slide.title}
                        className="h-16 w-24 object-cover rounded"
                      />
                    )}
                    <div>
                      <CardTitle className="text-lg">{slide.title}</CardTitle>
                      {slide.subtitle && (
                        <p className="text-sm text-muted-foreground">{slide.subtitle}</p>
                      )}
                      <p className="text-xs text-muted-foreground mt-1">
                        Position: {slide.position} | Order: {slide.display_order}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={slide.is_active}
                      onCheckedChange={() => toggleActive(slide)}
                    />
                    <Button variant="ghost" size="icon" onClick={() => openEditDialog(slide)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive"
                      onClick={() => handleDelete(slide.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminPromos;

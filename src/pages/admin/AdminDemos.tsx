import { useState, useEffect } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FileText, ExternalLink, Mail } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

interface DemoSubmission {
  id: string;
  artist_name: string;
  email: string;
  genre: string;
  music_link: string;
  bio: string | null;
  status: string;
  admin_notes: string | null;
  created_at: string;
}

const statusColors: Record<string, string> = {
  pending: "bg-yellow-500/20 text-yellow-500",
  reviewed: "bg-blue-500/20 text-blue-500",
  accepted: "bg-green-500/20 text-green-500",
  rejected: "bg-red-500/20 text-red-500",
};

const AdminDemos = () => {
  const [demos, setDemos] = useState<DemoSubmission[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");
  const { toast } = useToast();

  const fetchDemos = async () => {
    let query = supabase
      .from("demo_submissions")
      .select("*")
      .order("created_at", { ascending: false });

    if (filter !== "all") {
      query = query.eq("status", filter);
    }

    const { data, error } = await query;

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      setDemos(data || []);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchDemos();
  }, [filter]);

  const updateStatus = async (id: string, status: string) => {
    const { error } = await supabase
      .from("demo_submissions")
      .update({ status })
      .eq("id", id);

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: "Updated", description: `Status changed to ${status}` });
    fetchDemos();
  };

  const updateNotes = async (id: string, notes: string) => {
    const { error } = await supabase
      .from("demo_submissions")
      .update({ admin_notes: notes })
      .eq("id", id);

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: "Saved", description: "Notes updated" });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this submission?")) return;

    const { error } = await supabase.from("demo_submissions").delete().eq("id", id);

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: "Deleted", description: "Submission removed" });
    fetchDemos();
  };

  return (
    <AdminLayout
      title="Demo Submissions"
      description="Review artist demo submissions"
    >
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Filter:</span>
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="reviewed">Reviewed</SelectItem>
              <SelectItem value="accepted">Accepted</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <span className="text-sm text-muted-foreground">
          {demos.length} submission{demos.length !== 1 ? "s" : ""}
        </span>
      </div>

      {isLoading ? (
        <div className="text-center py-12 text-muted-foreground">Loading...</div>
      ) : demos.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No demo submissions yet.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {demos.map((demo) => (
            <Card key={demo.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg flex items-center gap-2">
                      {demo.artist_name}
                      <Badge className={statusColors[demo.status]}>{demo.status}</Badge>
                    </CardTitle>
                    <CardDescription className="flex items-center gap-4 mt-1">
                      <span className="flex items-center gap-1">
                        <Mail className="h-3 w-3" />
                        <a href={`mailto:${demo.email}`} className="hover:underline">
                          {demo.email}
                        </a>
                      </span>
                      <span>{demo.genre}</span>
                      <span>{format(new Date(demo.created_at), "PP")}</span>
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <a
                      href={demo.music_link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button variant="outline" size="sm">
                        <ExternalLink className="h-3 w-3 mr-1" />
                        Listen
                      </Button>
                    </a>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {demo.bio && (
                  <div>
                    <p className="text-sm font-medium mb-1">Artist Bio:</p>
                    <p className="text-sm text-muted-foreground">{demo.bio}</p>
                  </div>
                )}

                <div>
                  <p className="text-sm font-medium mb-1">Admin Notes:</p>
                  <Textarea
                    defaultValue={demo.admin_notes || ""}
                    placeholder="Add internal notes..."
                    onBlur={(e) => updateNotes(demo.id, e.target.value)}
                    rows={2}
                  />
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Status:</span>
                    <Select
                      value={demo.status}
                      onValueChange={(value) => updateStatus(demo.id, value)}
                    >
                      <SelectTrigger className="w-[130px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="reviewed">Reviewed</SelectItem>
                        <SelectItem value="accepted">Accepted</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-destructive"
                    onClick={() => handleDelete(demo.id)}
                  >
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminDemos;

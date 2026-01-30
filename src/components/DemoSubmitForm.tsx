import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Upload, Music, Link as LinkIcon, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

const formSchema = z.object({
  artistName: z.string().min(2, "Artist name must be at least 2 characters").max(100, "Artist name too long"),
  email: z.string().email("Please enter a valid email").max(255, "Email too long"),
  genre: z.string().min(1, "Please select a genre"),
  musicLink: z.string().url("Please enter a valid URL").max(500, "URL too long"),
  bio: z.string().min(50, "Please tell us more about yourself (at least 50 characters)").max(1000, "Bio too long"),
  socialLink: z.string().url("Please enter a valid URL").max(500, "URL too long").optional().or(z.literal("")),
});

type FormData = z.infer<typeof formSchema>;

const genres = [
  "Hip-Hop",
  "R&B",
  "Pop",
  "Electronic / Dance",
  "Rock",
  "Alternative",
  "Soul / Funk",
  "Jazz",
  "Afrobeats",
  "Latin",
  "Other",
];

export const DemoSubmitForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      artistName: "",
      email: "",
      genre: "",
      musicLink: "",
      bio: "",
      socialLink: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    console.log("Demo submission:", data);
    setIsSubmitting(false);
    setIsSubmitted(true);
    toast.success("Demo submitted successfully! We'll be in touch.");
  };

  if (isSubmitted) {
    return (
      <div className="text-center py-12">
        <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6">
          <Check className="h-10 w-10 text-primary" />
        </div>
        <h3 className="text-display-sm mb-4">Demo Submitted!</h3>
        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
          Thank you for your submission. Our A&R team will review your demo 
          and get back to you within 2 weeks.
        </p>
        <Button variant="outline" onClick={() => setIsSubmitted(false)}>
          Submit Another Demo
        </Button>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="artistName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Artist / Band Name</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Music className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Your artist name"
                      className="pl-10"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="genre"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Primary Genre</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a genre" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {genres.map((genre) => (
                      <SelectItem key={genre} value={genre}>
                        {genre}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="musicLink"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Music Link (SoundCloud, Spotify, etc.)</FormLabel>
                <FormControl>
                  <div className="relative">
                    <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="https://soundcloud.com/..."
                      className="pl-10"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tell Us About Yourself</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Share your story, influences, and what makes your music unique..."
                  className="min-h-32 resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="socialLink"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Social Media Link (Optional)</FormLabel>
              <FormControl>
                <div className="relative">
                  <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="https://instagram.com/..."
                    className="pl-10"
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          variant="hero"
          size="lg"
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-5 w-5 mr-2 animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              <Upload className="h-5 w-5 mr-2" />
              Submit Demo
            </>
          )}
        </Button>
      </form>
    </Form>
  );
};

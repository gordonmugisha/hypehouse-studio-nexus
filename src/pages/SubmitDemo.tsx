import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { DemoSubmitForm } from "@/components/DemoSubmitForm";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const SubmitDemo = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-32 pb-24">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Back link */}
          <Button variant="ghost" asChild className="mb-8">
            <Link to="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
          </Button>

          <div className="max-w-2xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <p className="text-sm font-medium text-primary uppercase tracking-wider mb-2">
                Join the Roster
              </p>
              <h1 className="text-display-md md:text-display-lg mb-4">
                Submit Your Demo
              </h1>
              <p className="text-muted-foreground">
                Share your music with our A&R team. We listen to every submission 
                and respond within 2 weeks.
              </p>
            </div>

            {/* Form card */}
            <div className="bg-card border border-border rounded-xl p-6 md:p-8">
              <DemoSubmitForm />
            </div>

            {/* Additional info */}
            <div className="mt-8 text-center">
              <p className="text-sm text-muted-foreground">
                Have questions? Email us at{" "}
                <a
                  href="mailto:demos@hypehousecreative.com"
                  className="text-primary hover:underline"
                >
                  demos@hypehousecreative.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SubmitDemo;

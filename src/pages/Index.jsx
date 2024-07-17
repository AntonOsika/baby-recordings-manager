import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Baby, Mic, PlayCircle } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="container mx-auto p-8">
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-4xl font-bold text-center mb-2">Welcome to BabyCry AI</CardTitle>
          <CardDescription className="text-center text-lg">
            Manage and analyze your baby's cries with ease
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex justify-center space-x-4">
            <Baby className="w-16 h-16 text-primary" />
            <Mic className="w-16 h-16 text-primary" />
            <PlayCircle className="w-16 h-16 text-primary" />
          </div>
          <p className="text-center text-lg">
            BabyCry AI helps you record, categorize, and understand your baby's cries.
            Start by recording or uploading audio clips, then use our AI to analyze them.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button asChild size="lg">
            <Link to="/recordings">Get Started</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Index;
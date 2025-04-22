
import { Card, CardContent } from "@/components/ui/card";

type AuthPageLayoutProps = {
  children: React.ReactNode;
};

export default function AuthPageLayout({ children }: AuthPageLayoutProps) {
  return (
    <div className="container flex min-h-screen justify-center items-center">
      <Card className="w-full max-w-md shadow-lg border">
        {children}
      </Card>
    </div>
  );
}

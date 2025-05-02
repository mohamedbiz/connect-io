
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import PaymentButton from "./PaymentButton";

interface ProviderPaymentCardProps {
  id: string;
  name: string;
  title?: string;
  description?: string;
  avatarUrl?: string;
  expertise?: string[];
  amount?: number;
}

const ProviderPaymentCard = ({
  id,
  name,
  title = "Email Marketing Specialist",
  description = "Professional email marketing services",
  avatarUrl,
  expertise = [],
  amount = 9900, // $99.00 in cents
}: ProviderPaymentCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .substring(0, 2);

  return (
    <Card className="border border-[#2D82B7]/30 transition-all duration-300 hover:border-[#2D82B7]">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="h-12 w-12">
          <AvatarImage src={avatarUrl} alt={name} />
          <AvatarFallback className="bg-[#2D82B7] text-white">
            {initials}
          </AvatarFallback>
        </Avatar>
        <div>
          <CardTitle className="text-lg text-[#0A2342]">{name}</CardTitle>
          <p className="text-sm text-[#0E3366]">{title}</p>
        </div>
      </CardHeader>
      <CardContent>
        <div className={`space-y-4 ${isExpanded ? "" : "line-clamp-3"}`}>
          <p className="text-[#0E3366]">{description}</p>
          
          <div className="flex flex-wrap gap-2 mt-2">
            {expertise.map((skill, index) => (
              <Badge key={index} variant="outline" className="bg-[#BFD7ED]/30">
                {skill}
              </Badge>
            ))}
          </div>
        </div>
        
        {description && description.length > 150 && (
          <Button
            variant="link"
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-2 p-0 h-auto text-[#2D82B7]"
          >
            {isExpanded ? "Show less" : "Read more"}
          </Button>
        )}
      </CardContent>
      <CardFooter className="flex justify-between items-center border-t pt-4">
        <div className="text-[#0A2342] font-medium">
          ${(amount / 100).toFixed(2)}
        </div>
        <PaymentButton
          amount={amount}
          providerId={id}
          description={`Payment for services - ${name}`}
          className="bg-[#2D82B7] hover:bg-[#3D9AD1]"
        />
      </CardFooter>
    </Card>
  );
};

export default ProviderPaymentCard;

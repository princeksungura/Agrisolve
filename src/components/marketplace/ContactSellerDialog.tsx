import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Phone, Mail, MessageSquare, MapPin, Calendar } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { formatDistanceToNow } from "date-fns";

interface ContactSellerDialogProps {
  isOpen: boolean;
  onClose: () => void;
  listing: {
    id: string;
    title: string;
    price: number;
    unit: string;
    seller_name: string;
    seller_phone: string;
    location: string;
    created_at: string;
  } | null;
}

const ContactSellerDialog = ({ isOpen, onClose, listing }: ContactSellerDialogProps) => {
  const [message, setMessage] = useState("");
  const [buyerName, setBuyerName] = useState("");
  const [buyerPhone, setBuyerPhone] = useState("");
  const [sending, setSending] = useState(false);
  const { toast } = useToast();

  const handleSendMessage = async () => {
    if (!message.trim() || !buyerName.trim() || !buyerPhone.trim()) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    setSending(true);
    
    // Simulate sending message
    setTimeout(() => {
      toast({
        title: "Message sent!",
        description: "The seller will receive your message and contact you soon.",
      });
      setSending(false);
      onClose();
      setMessage("");
      setBuyerName("");
      setBuyerPhone("");
    }, 1000);
  };

  if (!listing) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Contact Seller</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Listing Info */}
          <div className="bg-accent/10 rounded-lg p-4">
            <h3 className="font-semibold text-lg mb-2">{listing.title}</h3>
            <div className="space-y-1 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <span className="font-medium text-primary text-lg">KSh {listing.price.toLocaleString()}</span>
                <span>per {listing.unit}</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                <span>{listing.seller_name} • {listing.location}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                <span>Listed {formatDistanceToNow(new Date(listing.created_at), { addSuffix: true })}</span>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="buyerName">Your Name</Label>
              <Input
                id="buyerName"
                value={buyerName}
                onChange={(e) => setBuyerName(e.target.value)}
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <Label htmlFor="buyerPhone">Your Phone Number</Label>
              <Input
                id="buyerPhone"
                value={buyerPhone}
                onChange={(e) => setBuyerPhone(e.target.value)}
                placeholder="+254 7XX XXX XXX"
              />
            </div>

            <div>
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Hi, I'm interested in your produce. When would be a good time to discuss?"
                className="min-h-[100px]"
              />
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="w-full" asChild>
              <a href={`tel:${listing.seller_phone}`}>
                <Phone className="w-4 h-4 mr-2" />
                Call Now
              </a>
            </Button>
            <Button 
              variant="default" 
              className="w-full"
              onClick={handleSendMessage}
              disabled={sending}
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              {sending ? "Sending..." : "Send Message"}
            </Button>
          </div>

          {/* Tips */}
          <div className="bg-primary/10 rounded-lg p-3">
            <p className="text-sm font-medium text-primary mb-1">💡 Buying Tips:</p>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>• Ask about harvest date and freshness</li>
              <li>• Inquire about minimum order quantities</li>
              <li>• Discuss delivery or pickup options</li>
              <li>• Verify quality before making payment</li>
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ContactSellerDialog;
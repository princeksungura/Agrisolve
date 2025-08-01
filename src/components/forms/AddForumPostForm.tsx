import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { forumPostSchema, type ForumPostFormData } from "@/lib/validations";
import { useForumStore } from "@/stores";
import { useAuthStore } from "@/stores";
import { useState } from "react";
import { Upload, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const forumCategories = [
  "Crop Production",
  "Livestock & Poultry",
  "Pest & Disease Control",
  "Soil & Fertilizer",
  "Weather & Climate",
  "Equipment & Tools",
  "Marketing & Sales",
  "Organic Farming",
  "Water & Irrigation",
  "General Questions"
];

interface AddForumPostFormProps {
  onSuccess?: () => void;
}

const AddForumPostForm = ({ onSuccess }: AddForumPostFormProps) => {
  const { user } = useAuthStore();
  const { addPost } = useForumStore();
  const { toast } = useToast();
  const [images, setImages] = useState<string[]>([]);

  const form = useForm<ForumPostFormData>({
    resolver: zodResolver(forumPostSchema),
    defaultValues: {
      title: "",
      content: "",
      category: "",
    },
  });

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    // In a real app, you'd upload to storage service
    const newImages = Array.from(files).map((file, index) => 
      `https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=400&h=300&fit=crop&crop=center&q=80&${Date.now()}-${index}`
    );
    
    setImages(prev => [...prev, ...newImages].slice(0, 3)); // Max 3 images
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const onSubmit = (data: ForumPostFormData) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to ask a question",
        variant: "destructive",
      });
      return;
    }

    addPost({
      ...data,
      images,
      authorId: user.id,
      authorName: user.name,
      authorRole: user.role,
      status: "open",
    });

    toast({
      title: "Question posted successfully!",
      description: "Community members will help you solve this problem",
    });

    form.reset();
    setImages([]);
    onSuccess?.();
  };

  return (
    <Card className="earth-shadow">
      <CardHeader>
        <CardTitle>Ask the Community</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Question Title</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="e.g., Brown spots on my tomato leaves - what could this be?"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {forumCategories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
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
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Describe Your Problem</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Provide as much detail as possible about your problem. Include information about your location, crop type, what you've already tried, etc."
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Image Upload */}
            <div className="space-y-4">
              <FormLabel>Add Photos (Optional but helpful)</FormLabel>
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <div className="text-sm text-muted-foreground mb-4">
                  Upload up to 3 images to help others understand your problem
                </div>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="forum-image-upload"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById('forum-image-upload')?.click()}
                >
                  Choose Images
                </Button>
              </div>

              {images.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {images.map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        src={image}
                        alt={`Upload ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute -top-2 -right-2 h-6 w-6"
                        onClick={() => removeImage(index)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-primary/10 rounded-lg p-4">
              <h4 className="font-medium text-primary mb-2">💡 Tips for getting better answers:</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Be specific about your location and crop type</li>
                <li>• Include photos of the problem if possible</li>
                <li>• Mention what you've already tried</li>
                <li>• Describe symptoms in detail</li>
              </ul>
            </div>

            <Button 
              type="submit" 
              variant="earth" 
              className="w-full"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? "Posting Question..." : "Post Question"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default AddForumPostForm;
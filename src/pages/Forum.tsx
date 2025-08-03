import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { MessageSquare, ThumbsUp, Search, Plus, Tag } from "lucide-react";
import { useEffect, useState } from "react";
import { getForumPosts } from "@/services/supabase";
import { formatDistanceToNow } from "date-fns";
import AddForumPostForm from "@/components/forms/AddForumPostForm";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

const Forum = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const categories = [
    { name: "Crops", count: 0, color: "bg-green-100 text-green-800" },
    { name: "Livestock", count: 0, color: "bg-blue-100 text-blue-800" },
    { name: "Pest Control", count: 0, color: "bg-red-100 text-red-800" },
    { name: "Weather", count: 0, color: "bg-yellow-100 text-yellow-800" },
    { name: "Marketing", count: 0, color: "bg-purple-100 text-purple-800" },
  ];

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getForumPosts();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching forum posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handlePostAdded = () => {
    // Refresh posts after adding a new one
    const fetchPosts = async () => {
      try {
        const data = await getForumPosts();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching forum posts:', error);
      }
    };
    fetchPosts();
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Community Forum</h1>
            <p className="text-muted-foreground">Get help from fellow farmers and agricultural experts</p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="earth" className="mt-4 md:mt-0">
                <Plus className="w-4 h-4 mr-2" />
                Ask Question
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <AddForumPostForm onSuccess={handlePostAdded} />
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Search */}
            <Card className="earth-shadow">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Search Questions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search problems..." className="pl-10" />
                </div>
              </CardContent>
            </Card>

            {/* Categories */}
            <Card className="earth-shadow">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Categories</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {categories.map((category) => (
                  <div key={category.name} className="flex items-center justify-between p-2 rounded-lg hover:bg-accent cursor-pointer">
                    <div className="flex items-center gap-2">
                      <Tag className="w-4 h-4 text-muted-foreground" />
                      <span className="font-medium">{category.name}</span>
                    </div>
                    <Badge variant="secondary" className={category.color}>
                      {category.count}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Filter Tabs */}
            <div className="flex gap-2 overflow-x-auto">
              <Button variant="default" size="sm">Latest</Button>
              <Button variant="outline" size="sm">Trending</Button>
              <Button variant="outline" size="sm">Unsolved</Button>
              <Button variant="outline" size="sm">My Questions</Button>
            </div>

            {/* Questions List */}
            <div className="space-y-4">
              {loading ? (
                <div className="text-center py-8">
                  <div className="text-muted-foreground">Loading forum posts...</div>
                </div>
              ) : posts.length === 0 ? (
                <div className="text-center py-8">
                  <div className="text-muted-foreground mb-4">No questions yet. Be the first to ask!</div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline">
                        <Plus className="w-4 h-4 mr-2" />
                        Ask the First Question
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <AddForumPostForm onSuccess={handlePostAdded} />
                    </DialogContent>
                  </Dialog>
                </div>
              ) : (
                posts.map((post) => (
                  <Card key={post.id} className="earth-shadow hover:shadow-lg transition-shadow cursor-pointer">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant={post.status === "solved" ? "default" : "outline"} className="text-xs">
                              {post.status === "solved" ? "✓ Solved" : "Needs Help"}
                            </Badge>
                            <Badge variant="secondary">{post.category}</Badge>
                            {post.images && post.images.length > 0 && (
                              <Badge variant="outline" className="text-xs">📷 Photo</Badge>
                            )}
                          </div>
                          
                          <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-2">
                            {post.title}
                          </h3>
                          
                          <div className="flex items-center justify-between text-sm text-muted-foreground">
                            <span>Asked by {post.author_name} ({post.author_role})</span>
                            <span>{formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}</span>
                          </div>
                        </div>
                        
                        <div className="flex flex-col items-center gap-2 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <ThumbsUp className="w-4 h-4" />
                            <span>{post.likes}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MessageSquare className="w-4 h-4" />
                            <span>{post.views}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>

            {/* Load More */}
            <div className="text-center pt-6">
              <Button variant="outline">Load More Questions</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forum;
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, ArrowRight, ThumbsUp } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getForumPosts } from "@/services/supabase";
import { formatDistanceToNow } from "date-fns";

const ForumPreview = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getForumPosts();
        setPosts(data.slice(0, 3)); // Show only 3 most recent
      } catch (error) {
        console.error('Error fetching forum posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <Card className="earth-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <MessageSquare className="w-5 h-5 text-primary" />
            Recent Forum Activity
          </CardTitle>
          <Link to="/forum">
            <Button variant="ghost" size="sm" className="text-primary">
              View All <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {loading ? (
          <div className="text-center text-muted-foreground">Loading...</div>
        ) : posts.length === 0 ? (
          <div className="text-center text-muted-foreground">No questions yet. Be the first to ask!</div>
        ) : (
          posts.map((post) => (
            <div key={post.id} className="p-3 rounded-lg border border-border hover:bg-accent/50 transition-colors">
              <h4 className="font-medium text-sm line-clamp-2 mb-2">{post.title}</h4>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>by {post.author_name}</span>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <ThumbsUp className="w-3 h-3" />
                    <span>{post.likes}</span>
                  </div>
                  <span>{formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}</span>
                </div>
              </div>
            </div>
          ))
        )}
        
        <div className="pt-2">
          <Link to="/forum">
            <Button variant="outline" className="w-full">
              Ask a Question
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default ForumPreview;
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, ArrowRight, ThumbsUp } from "lucide-react";
import { Link } from "react-router-dom";

const ForumPreview = () => {
  const recentQuestions = [
    {
      id: 1,
      title: "Brown spots on tomato leaves - what could this be?",
      author: "John K.",
      replies: 5,
      likes: 12,
      timeAgo: "2 hours ago"
    },
    {
      id: 2,
      title: "Best time to plant maize in Nakuru region?",
      author: "Mary W.",
      replies: 8,
      likes: 15,
      timeAgo: "4 hours ago"
    },
    {
      id: 3,
      title: "Organic fertilizer recipes for vegetables",
      author: "Peter M.",
      replies: 12,
      likes: 23,
      timeAgo: "6 hours ago"
    }
  ];

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
        {recentQuestions.map((question) => (
          <div key={question.id} className="p-3 rounded-lg border border-border hover:bg-accent/50 transition-colors">
            <h4 className="font-medium text-sm line-clamp-2 mb-2">{question.title}</h4>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>by {question.author}</span>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <MessageSquare className="w-3 h-3" />
                  <span>{question.replies}</span>
                </div>
                <div className="flex items-center gap-1">
                  <ThumbsUp className="w-3 h-3" />
                  <span>{question.likes}</span>
                </div>
                <span>{question.timeAgo}</span>
              </div>
            </div>
          </div>
        ))}
        
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
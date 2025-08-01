import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { MessageSquare, ThumbsUp, Search, Plus, Tag } from "lucide-react";

const Forum = () => {
  const categories = [
    { name: "Crops", count: 156, color: "bg-green-100 text-green-800" },
    { name: "Livestock", count: 89, color: "bg-blue-100 text-blue-800" },
    { name: "Pest Control", count: 234, color: "bg-red-100 text-red-800" },
    { name: "Weather", count: 67, color: "bg-yellow-100 text-yellow-800" },
    { name: "Marketing", count: 145, color: "bg-purple-100 text-purple-800" },
  ];

  const questions = [
    {
      id: 1,
      title: "Brown spots appearing on my tomato leaves - need urgent help!",
      author: "John Kamau",
      category: "Pest Control",
      replies: 12,
      likes: 24,
      timeAgo: "2 hours ago",
      hasImage: true,
      solved: false
    },
    {
      id: 2,
      title: "When is the best time to plant maize in Nakuru county?",
      author: "Mary Wanjiku",
      category: "Crops",
      replies: 8,
      likes: 15,
      timeAgo: "4 hours ago",
      hasImage: false,
      solved: true
    },
    {
      id: 3,
      title: "Organic fertilizer recipe that really works",
      author: "Peter Mwangi",
      category: "Crops",
      replies: 25,
      likes: 45,
      timeAgo: "1 day ago",
      hasImage: true,
      solved: false
    },
    {
      id: 4,
      title: "My dairy cows are producing less milk - what could be wrong?",
      author: "Grace Njeri",
      category: "Livestock",
      replies: 15,
      likes: 28,
      timeAgo: "2 days ago",
      hasImage: false,
      solved: false
    }
  ];

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
          <Button variant="earth" className="mt-4 md:mt-0">
            <Plus className="w-4 h-4 mr-2" />
            Ask Question
          </Button>
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
              {questions.map((question) => (
                <Card key={question.id} className="earth-shadow hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant={question.solved ? "default" : "outline"} className="text-xs">
                            {question.solved ? "✓ Solved" : "Needs Help"}
                          </Badge>
                          <Badge variant="secondary">{question.category}</Badge>
                          {question.hasImage && (
                            <Badge variant="outline" className="text-xs">📷 Photo</Badge>
                          )}
                        </div>
                        
                        <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-2">
                          {question.title}
                        </h3>
                        
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <span>Asked by {question.author}</span>
                          <span>{question.timeAgo}</span>
                        </div>
                      </div>
                      
                      <div className="flex flex-col items-center gap-2 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <MessageSquare className="w-4 h-4" />
                          <span>{question.replies}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <ThumbsUp className="w-4 h-4" />
                          <span>{question.likes}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
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
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuthStore, useMarketplaceStore, useForumStore } from "@/stores";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MapPin, Phone, Mail, Edit, ShoppingBag, MessageSquare, Star } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

const Profile = () => {
  const { user, logout } = useAuthStore();
  const { listings } = useMarketplaceStore();
  const { posts } = useForumStore();

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">Please log in to view your profile</h1>
          </div>
        </div>
      </div>
    );
  }

  const userListings = listings.filter(listing => listing.sellerId === user.id);
  const userPosts = posts.filter(post => post.authorId === user.id);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <Card className="earth-shadow mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-start gap-6">
              <Avatar className="h-20 w-20">
                <AvatarFallback className="bg-primary text-primary-foreground text-2xl font-bold">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h1 className="text-2xl font-bold text-foreground">{user.name}</h1>
                    <Badge variant="default" className="mt-1">
                      {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </Badge>
                  </div>
                  <div className="flex gap-2 mt-4 md:mt-0">
                    <Button variant="outline" size="sm">
                      <Edit className="w-4 h-4 mr-2" />
                      Edit Profile
                    </Button>
                    <Button variant="outline" size="sm" onClick={logout}>
                      Logout
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{user.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    <span>{user.email}</span>
                  </div>
                  {user.phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      <span>{user.phone}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Activity Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="earth-shadow text-center">
            <CardContent className="pt-6">
              <ShoppingBag className="w-8 h-8 mx-auto mb-2 text-primary" />
              <div className="text-2xl font-bold">{userListings.length}</div>
              <div className="text-sm text-muted-foreground">Active Listings</div>
            </CardContent>
          </Card>
          <Card className="earth-shadow text-center">
            <CardContent className="pt-6">
              <MessageSquare className="w-8 h-8 mx-auto mb-2 text-accent" />
              <div className="text-2xl font-bold">{userPosts.length}</div>
              <div className="text-sm text-muted-foreground">Forum Posts</div>
            </CardContent>
          </Card>
          <Card className="earth-shadow text-center">
            <CardContent className="pt-6">
              <Star className="w-8 h-8 mx-auto mb-2 text-yellow-500" />
              <div className="text-2xl font-bold">4.8</div>
              <div className="text-sm text-muted-foreground">Rating</div>
            </CardContent>
          </Card>
          <Card className="earth-shadow text-center">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">156</div>
              <div className="text-sm text-muted-foreground">People Helped</div>
            </CardContent>
          </Card>
        </div>

        {/* Content Tabs */}
        <Tabs defaultValue="listings" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="listings">My Listings</TabsTrigger>
            <TabsTrigger value="posts">Forum Posts</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>

          <TabsContent value="listings" className="space-y-4">
            {userListings.length === 0 ? (
              <Card className="earth-shadow">
                <CardContent className="p-8 text-center">
                  <ShoppingBag className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-semibold mb-2">No listings yet</h3>
                  <p className="text-muted-foreground mb-4">Start selling your produce to connect with buyers</p>
                  <Button variant="earth">Create Your First Listing</Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {userListings.map((listing) => (
                  <Card key={listing.id} className="earth-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <Badge variant={
                          listing.status === "available" ? "default" : 
                          listing.status === "sold" ? "secondary" : "destructive"
                        }>
                          {listing.status}
                        </Badge>
                      </div>
                      <CardTitle className="text-lg">{listing.title}</CardTitle>
                      <div className="text-2xl font-bold text-primary">
                        KSh {listing.price}/{listing.unit}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                        {listing.description}
                      </p>
                      <div className="text-sm">
                        <div className="font-medium">{listing.quantity} available</div>
                        <div className="text-muted-foreground">
                          Listed {formatDistanceToNow(listing.createdAt)} ago
                        </div>
                      </div>
                      <div className="flex gap-2 mt-4">
                        <Button variant="outline" size="sm" className="flex-1">Edit</Button>
                        <Button variant="outline" size="sm" className="flex-1">Delete</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="posts" className="space-y-4">
            {userPosts.length === 0 ? (
              <Card className="earth-shadow">
                <CardContent className="p-8 text-center">
                  <MessageSquare className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-semibold mb-2">No forum posts yet</h3>
                  <p className="text-muted-foreground mb-4">Ask questions and share knowledge with the community</p>
                  <Button variant="earth">Ask Your First Question</Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {userPosts.map((post) => (
                  <Card key={post.id} className="earth-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <Badge variant={
                            post.status === "solved" ? "default" : 
                            post.status === "closed" ? "secondary" : "outline"
                          }>
                            {post.status === "solved" ? "✓ Solved" : 
                             post.status === "closed" ? "Closed" : "Open"}
                          </Badge>
                          <Badge variant="secondary">{post.category}</Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {formatDistanceToNow(post.createdAt)} ago
                        </div>
                      </div>
                      
                      <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
                      <p className="text-muted-foreground mb-4 line-clamp-3">{post.content}</p>
                      
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center gap-4">
                          <span>{post.replies.length} replies</span>
                          <span>{post.likes} likes</span>
                          <span>{post.views} views</span>
                        </div>
                        <Button variant="outline" size="sm">View Post</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="activity">
            <Card className="earth-shadow">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <div className="flex-1">
                      <div className="text-sm">Posted a new question in Forum</div>
                      <div className="text-xs text-muted-foreground">2 hours ago</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                    <div className="flex-1">
                      <div className="text-sm">Updated listing "Fresh Tomatoes"</div>
                      <div className="text-xs text-muted-foreground">1 day ago</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-2 h-2 bg-primary-glow rounded-full"></div>
                    <div className="flex-1">
                      <div className="text-sm">Received 5 likes on forum answer</div>
                      <div className="text-xs text-muted-foreground">2 days ago</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;
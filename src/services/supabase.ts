import { supabase } from '@/integrations/supabase/client';

export interface Listing {
  id: string;
  title: string;
  description: string;
  price: number;
  unit: string;
  quantity: string;
  category: string;
  location: string;
  images: string[];
  seller_id: string;
  seller_name: string;
  seller_phone: string;
  status: 'available' | 'sold' | 'reserved';
  created_at: string;
  updated_at: string;
}

export interface ForumPost {
  id: string;
  title: string;
  content: string;
  category: string;
  author_id: string;
  author_name: string;
  author_role: string;
  images: string[];
  likes: number;
  liked_by: string[];
  views: number;
  status: 'open' | 'solved' | 'closed';
  created_at: string;
  updated_at: string;
}

export interface ForumReply {
  id: string;
  post_id: string;
  content: string;
  author_id: string;
  author_name: string;
  author_role: string;
  likes: number;
  liked_by: string[];
  is_accepted: boolean;
  created_at: string;
}

// Listings
export const getListings = async () => {
  const { data, error } = await supabase
    .from('listings')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data;
};

export const createListing = async (listing: Omit<Listing, 'id' | 'created_at' | 'updated_at'>) => {
  const { data, error } = await supabase
    .from('listings')
    .insert([listing])
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

export const updateListing = async (id: string, updates: Partial<Listing>) => {
  const { data, error } = await supabase
    .from('listings')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

export const deleteListing = async (id: string) => {
  const { error } = await supabase
    .from('listings')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
};

// Forum Posts
export const getForumPosts = async () => {
  const { data, error } = await supabase
    .from('forum_posts')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data;
};

export const createForumPost = async (post: Omit<ForumPost, 'id' | 'likes' | 'liked_by' | 'views' | 'created_at' | 'updated_at'>) => {
  const { data, error } = await supabase
    .from('forum_posts')
    .insert([post])
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

export const getForumReplies = async (postId: string) => {
  const { data, error } = await supabase
    .from('forum_replies')
    .select('*')
    .eq('post_id', postId)
    .order('created_at', { ascending: true });
  
  if (error) throw error;
  return data;
};

export const createForumReply = async (reply: Omit<ForumReply, 'id' | 'likes' | 'liked_by' | 'is_accepted' | 'created_at'>) => {
  const { data, error } = await supabase
    .from('forum_replies')
    .insert([reply])
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

export const likeForumPost = async (postId: string, userId: string) => {
  const { data: post } = await supabase
    .from('forum_posts')
    .select('liked_by, likes')
    .eq('id', postId)
    .single();

  if (!post) throw new Error('Post not found');

  const likedBy = post.liked_by || [];
  const isLiked = likedBy.includes(userId);
  
  const updates = {
    liked_by: isLiked 
      ? likedBy.filter(id => id !== userId)
      : [...likedBy, userId],
    likes: isLiked ? post.likes - 1 : post.likes + 1
  };

  const { data, error } = await supabase
    .from('forum_posts')
    .update(updates)
    .eq('id', postId)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const incrementPostViews = async (postId: string) => {
  const { data: post } = await supabase
    .from('forum_posts')
    .select('views')
    .eq('id', postId)
    .single();

  if (post) {
    const { error } = await supabase
      .from('forum_posts')
      .update({ views: post.views + 1 })
      .eq('id', postId);
    
    if (error) throw error;
  }
};

// File upload
export const uploadFile = async (file: File, bucket: string = 'uploads') => {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Math.random()}.${fileExt}`;
  const filePath = `${fileName}`;

  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(filePath, file);

  if (error) throw error;

  const { data: { publicUrl } } = supabase.storage
    .from(bucket)
    .getPublicUrl(filePath);

  return publicUrl;
};
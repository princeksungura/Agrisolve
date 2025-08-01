import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// User State
interface User {
  id: string;
  email: string;
  name: string;
  role: 'farmer' | 'trader' | 'expert';
  location: string;
  phone?: string;
  avatar?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (user: User) => void;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      login: (user) => set({ user, isAuthenticated: true }),
      logout: () => set({ user: null, isAuthenticated: false }),
      updateProfile: (updates) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...updates } : null,
        })),
    }),
    {
      name: 'agrisolve-auth',
    }
  )
);

// Marketplace State
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
  sellerId: string;
  sellerName: string;
  sellerPhone: string;
  status: 'available' | 'sold' | 'reserved';
  createdAt: Date;
  updatedAt: Date;
}

interface MarketplaceState {
  listings: Listing[];
  filters: {
    category: string;
    location: string;
    priceRange: [number, number];
    searchQuery: string;
  };
  isLoading: boolean;
  addListing: (listing: Omit<Listing, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateListing: (id: string, updates: Partial<Listing>) => void;
  deleteListing: (id: string) => void;
  setFilters: (filters: Partial<MarketplaceState['filters']>) => void;
  resetFilters: () => void;
}

export const useMarketplaceStore = create<MarketplaceState>()((set) => ({
  listings: [],
  filters: {
    category: '',
    location: '',
    priceRange: [0, 1000],
    searchQuery: '',
  },
  isLoading: false,
  addListing: (listing) =>
    set((state) => ({
      listings: [
        {
          ...listing,
          id: Date.now().toString(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        ...state.listings,
      ],
    })),
  updateListing: (id, updates) =>
    set((state) => ({
      listings: state.listings.map((listing) =>
        listing.id === id
          ? { ...listing, ...updates, updatedAt: new Date() }
          : listing
      ),
    })),
  deleteListing: (id) =>
    set((state) => ({
      listings: state.listings.filter((listing) => listing.id !== id),
    })),
  setFilters: (filters) =>
    set((state) => ({
      filters: { ...state.filters, ...filters },
    })),
  resetFilters: () =>
    set({
      filters: {
        category: '',
        location: '',
        priceRange: [0, 1000],
        searchQuery: '',
      },
    }),
}));

// Forum State
export interface ForumPost {
  id: string;
  title: string;
  content: string;
  category: string;
  authorId: string;
  authorName: string;
  authorRole: string;
  images: string[];
  replies: ForumReply[];
  likes: number;
  likedBy: string[];
  views: number;
  status: 'open' | 'solved' | 'closed';
  createdAt: Date;
  updatedAt: Date;
}

export interface ForumReply {
  id: string;
  content: string;
  authorId: string;
  authorName: string;
  authorRole: string;
  likes: number;
  likedBy: string[];
  isAccepted: boolean;
  createdAt: Date;
}

interface ForumState {
  posts: ForumPost[];
  currentPost: ForumPost | null;
  isLoading: boolean;
  addPost: (post: Omit<ForumPost, 'id' | 'replies' | 'likes' | 'likedBy' | 'views' | 'createdAt' | 'updatedAt'>) => void;
  addReply: (postId: string, reply: Omit<ForumReply, 'id' | 'likes' | 'likedBy' | 'isAccepted' | 'createdAt'>) => void;
  likePost: (postId: string, userId: string) => void;
  likeReply: (postId: string, replyId: string, userId: string) => void;
  markReplyAsAccepted: (postId: string, replyId: string) => void;
  setCurrentPost: (post: ForumPost | null) => void;
  incrementViews: (postId: string) => void;
}

export const useForumStore = create<ForumState>()((set) => ({
  posts: [],
  currentPost: null,
  isLoading: false,
  addPost: (post) =>
    set((state) => ({
      posts: [
        {
          ...post,
          id: Date.now().toString(),
          replies: [],
          likes: 0,
          likedBy: [],
          views: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        ...state.posts,
      ],
    })),
  addReply: (postId, reply) =>
    set((state) => ({
      posts: state.posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              replies: [
                ...post.replies,
                {
                  ...reply,
                  id: Date.now().toString(),
                  likes: 0,
                  likedBy: [],
                  isAccepted: false,
                  createdAt: new Date(),
                },
              ],
              updatedAt: new Date(),
            }
          : post
      ),
    })),
  likePost: (postId, userId) =>
    set((state) => ({
      posts: state.posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              likes: post.likedBy.includes(userId)
                ? post.likes - 1
                : post.likes + 1,
              likedBy: post.likedBy.includes(userId)
                ? post.likedBy.filter((id) => id !== userId)
                : [...post.likedBy, userId],
            }
          : post
      ),
    })),
  likeReply: (postId, replyId, userId) =>
    set((state) => ({
      posts: state.posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              replies: post.replies.map((reply) =>
                reply.id === replyId
                  ? {
                      ...reply,
                      likes: reply.likedBy.includes(userId)
                        ? reply.likes - 1
                        : reply.likes + 1,
                      likedBy: reply.likedBy.includes(userId)
                        ? reply.likedBy.filter((id) => id !== userId)
                        : [...reply.likedBy, userId],
                    }
                  : reply
              ),
            }
          : post
      ),
    })),
  markReplyAsAccepted: (postId, replyId) =>
    set((state) => ({
      posts: state.posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              replies: post.replies.map((reply) => ({
                ...reply,
                isAccepted: reply.id === replyId,
              })),
              status: 'solved' as const,
            }
          : post
      ),
    })),
  setCurrentPost: (post) => set({ currentPost: post }),
  incrementViews: (postId) =>
    set((state) => ({
      posts: state.posts.map((post) =>
        post.id === postId ? { ...post, views: post.views + 1 } : post
      ),
    })),
}));
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import BlogCard from "@/components/BlogCard";
import Navbar from "@/components/Navbar";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface Post {
  id: string;
  title: string;
  excerpt: string;
  created_at: string;
  profiles: {
    username: string;
  };
}

const Home = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("posts")
      .select(`
        id,
        title,
        excerpt,
        created_at,
        profiles (
          username
        )
      `)
      .eq("published", true)
      .order("created_at", { ascending: false });

    if (error) {
      toast({ title: "Error loading posts", variant: "destructive" });
    } else {
      setPosts(data || []);
    }
    setLoading(false);
  };

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen gradient-bg">
      <Navbar />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-4 animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold text-gradient">
              Discover Amazing Stories
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Explore AI-powered content from creators around the world
            </p>
          </div>

          <div className="relative animate-slide-up">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input
              placeholder="Search posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-card border-border"
            />
          </div>

          {loading ? (
            <div className="text-center text-muted-foreground">Loading posts...</div>
          ) : filteredPosts.length > 0 ? (
            <div className="grid gap-6 animate-fade-in">
              {filteredPosts.map((post) => (
                <BlogCard
                  key={post.id}
                  id={post.id}
                  title={post.title}
                  excerpt={post.excerpt || ""}
                  authorName={post.profiles.username}
                  createdAt={post.created_at}
                />
              ))}
            </div>
          ) : (
            <div className="text-center text-muted-foreground py-12">
              {searchQuery ? "No posts found matching your search." : "No posts yet. Be the first to write!"}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Home;
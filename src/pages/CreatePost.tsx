import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import Editor from "@/components/Editor";
import Navbar from "@/components/Navbar";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

const CreatePost = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isPublishing, setIsPublishing] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate("/auth");
    }
  }, [user, navigate]);

  const handlePublish = async () => {
    if (!user) return;

    setIsPublishing(true);
    const excerpt = content.substring(0, 200).replace(/[#*_\[\]]/g, "");

    const { data, error } = await supabase
      .from("posts")
      .insert({
        author_id: user.id,
        title,
        content,
        excerpt,
        published: true,
      })
      .select()
      .single();

    if (error) {
      toast({ title: "Error publishing post", variant: "destructive" });
    } else {
      toast({ title: "Post published successfully!" });
      navigate(`/post/${data.id}`);
    }
    setIsPublishing(false);
  };

  const handleSaveDraft = async () => {
    if (!user) return;

    setIsPublishing(true);
    const excerpt = content.substring(0, 200).replace(/[#*_\[\]]/g, "");

    const { error } = await supabase
      .from("posts")
      .insert({
        author_id: user.id,
        title,
        content,
        excerpt,
        published: false,
      });

    if (error) {
      toast({ title: "Error saving draft", variant: "destructive" });
    } else {
      toast({ title: "Draft saved!" });
      navigate("/");
    }
    setIsPublishing(false);
  };

  return (
    <div className="min-h-screen gradient-bg">
      <Navbar />
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-gradient">Create New Post</h1>
          <Editor
            title={title}
            content={content}
            onTitleChange={setTitle}
            onContentChange={setContent}
            onPublish={handlePublish}
            onSaveDraft={handleSaveDraft}
            isPublishing={isPublishing}
          />
        </div>
      </main>
    </div>
  );
};

export default CreatePost;
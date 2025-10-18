import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Eye, Edit3 } from "lucide-react";

interface EditorProps {
  title: string;
  content: string;
  onTitleChange: (title: string) => void;
  onContentChange: (content: string) => void;
  onPublish: () => void;
  onSaveDraft: () => void;
  isPublishing: boolean;
}

const Editor = ({
  title,
  content,
  onTitleChange,
  onContentChange,
  onPublish,
  onSaveDraft,
  isPublishing,
}: EditorProps) => {
  const [activeTab, setActiveTab] = useState("edit");

  return (
    <div className="space-y-4">
      <Input
        placeholder="Post title..."
        value={title}
        onChange={(e) => onTitleChange(e.target.value)}
        className="text-3xl font-bold border-0 focus-visible:ring-0 bg-transparent"
      />
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="edit" className="gap-2">
            <Edit3 className="h-4 w-4" />
            Edit
          </TabsTrigger>
          <TabsTrigger value="preview" className="gap-2">
            <Eye className="h-4 w-4" />
            Preview
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="edit" className="mt-4">
          <Textarea
            placeholder="Write your post in Markdown..."
            value={content}
            onChange={(e) => onContentChange(e.target.value)}
            className="min-h-[500px] font-mono text-sm bg-card"
          />
        </TabsContent>
        
        <TabsContent value="preview" className="mt-4">
          <Card className="min-h-[500px] p-6 bg-card">
            <div className="prose prose-invert max-w-none">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {content || "*Nothing to preview yet...*"}
              </ReactMarkdown>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex gap-4">
        <Button
          onClick={onPublish}
          disabled={isPublishing || !title.trim() || !content.trim()}
          className="gradient-primary hover:opacity-90 transition-opacity"
        >
          {isPublishing ? "Publishing..." : "Publish"}
        </Button>
        <Button
          onClick={onSaveDraft}
          variant="outline"
          disabled={isPublishing || !title.trim() || !content.trim()}
        >
          Save Draft
        </Button>
      </div>
    </div>
  );
};

export default Editor;
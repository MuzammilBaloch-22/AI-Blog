import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Calendar, User } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface BlogCardProps {
  id: string;
  title: string;
  excerpt: string;
  authorName: string;
  createdAt: string;
}

const BlogCard = ({ id, title, excerpt, authorName, createdAt }: BlogCardProps) => {
  return (
    <Link to={`/post/${id}`}>
      <Card className="card-glow hover:scale-[1.02] transition-all duration-300 bg-card border-border group">
        <CardHeader>
          <h2 className="text-2xl font-bold group-hover:text-gradient transition-all">
            {title}
          </h2>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground line-clamp-3">{excerpt}</p>
        </CardContent>
        <CardFooter className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <User className="h-4 w-4" />
            <span>{authorName}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{formatDistanceToNow(new Date(createdAt), { addSuffix: true })}</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default BlogCard;
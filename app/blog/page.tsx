import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function BlogPage() {
    return (
        <div className="container mx-auto px-4 py-32 text-center">
            <h1 className="text-4xl font-bold tracking-tight mb-4">Blog</h1>
            <p className="text-muted-foreground mb-8 text-lg max-w-2xl mx-auto">
                Read the latest updates, tutorials, and insights from the A-Chroma team.
            </p>
            <Button asChild>
                <Link href="/">Back to Home</Link>
            </Button>
        </div>
    );
}

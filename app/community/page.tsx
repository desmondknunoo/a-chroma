import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CommunityPage() {
    return (
        <div className="container mx-auto px-4 py-32 text-center">
            <h1 className="text-4xl font-bold tracking-tight mb-4">Community</h1>
            <p className="text-muted-foreground mb-8 text-lg max-w-2xl mx-auto">
                Join our community of designers and developers. Connect, share, and learn.
            </p>
            <Button asChild>
                <Link href="/">Back to Home</Link>
            </Button>
        </div>
    );
}

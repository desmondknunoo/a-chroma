import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ColorTheoryPage() {
    return (
        <div className="container mx-auto px-4 py-32 text-center">
            <h1 className="text-4xl font-bold tracking-tight mb-4">Color Theory</h1>
            <p className="text-muted-foreground mb-8 text-lg max-w-2xl mx-auto">
                Learn about the science and art of using color. Our comprehensive guide and educational resources are coming soon.
            </p>
            <Button asChild>
                <Link href="/">Back to Home</Link>
            </Button>
        </div>
    );
}

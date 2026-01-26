import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function TermsPage() {
    return (
        <div className="container mx-auto px-4 py-32 text-center">
            <h1 className="text-4xl font-bold tracking-tight mb-4">Terms of Service</h1>
            <p className="text-muted-foreground mb-8 text-lg max-w-2xl mx-auto">
                By using A-Chroma, you agree to these terms. Please read them carefully.
            </p>
            <Button asChild>
                <Link href="/">Back to Home</Link>
            </Button>
        </div>
    );
}

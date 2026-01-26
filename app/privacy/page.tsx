import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function PrivacyPage() {
    return (
        <div className="container mx-auto px-4 py-32 text-center">
            <h1 className="text-4xl font-bold tracking-tight mb-4">Privacy Policy</h1>
            <p className="text-muted-foreground mb-8 text-lg max-w-2xl mx-auto">
                Your privacy is important to us. Read how we collect, use, and protect your data.
            </p>
            <Button asChild>
                <Link href="/">Back to Home</Link>
            </Button>
        </div>
    );
}

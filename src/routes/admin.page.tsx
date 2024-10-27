import { Link, Outlet } from 'react-router-dom';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Menu } from 'lucide-react';

const navigation = [
    { name: 'Players', href: '/admin/players' },
    { name: 'Reserve Lists', href: '/admin/reserve-lists' },
];

export const AdminPage = () => {
    return (
        <>
            <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
                <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
                    {navigation.map(item => (
                        <Link
                            key={item.href}
                            to={item.href}
                            className="text-muted-foreground transition-colors hover:text-foreground"
                        >
                            {item.name}
                        </Link>
                    ))}
                </nav>
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="outline" size="icon" className="shrink-0 md:hidden">
                            <Menu className="h-5 w-5" />
                            <span className="sr-only">Toggle navigation menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left">
                        <nav className="grid gap-6 text-lg font-medium">
                            {navigation.map(item => (
                                <Link
                                    key={item.href}
                                    to={item.href}
                                    className="text-muted-foreground hover:text-foreground"
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </nav>
                    </SheetContent>
                </Sheet>
            </header>
            <main>
                <Outlet />
            </main>
        </>
    );
};

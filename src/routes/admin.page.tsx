import {Link, Outlet} from "react-router-dom";
import {Sheet, SheetContent, SheetTrigger} from "@/components/ui/sheet.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Menu} from "lucide-react";
import {createClient} from "@supabase/supabase-js";
import {useEffect, useState} from "react";

const supabaseUrl = 'https://ptakgadlsitwkrgpgwhe.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB0YWtnYWRsc2l0d2tyZ3Bnd2hlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjE4NjQ0MzUsImV4cCI6MjAzNzQ0MDQzNX0.9eRCdNNJJ3qSqiTXlWSgoH7ZCYfVtM5xyDZy7LZgIqI';

const options = {
    auth: {
        localStorage: true,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true,
    },
};

const supabase = createClient(supabaseUrl,
    supabaseKey, options);


const navigation = [
    {name: 'Players', href: '/admin/players'},
    {name: 'Reserve Lists', href: '/admin/reserve-lists'},
]


export const AdminPage = () => {
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        getCountries();
    }, []);

    async function getCountries() {
        const { data, error } = await supabase.from("players").select();
        console.log('data', data);
        if (error) console.log('error', error);
        setCountries(data);
    }

    console.log(countries);


    return (
        <>
            <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
                <nav
                    className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
                    {
                        navigation.map((item) => (
                            <Link
                                key={item.href}
                                to={item.href}
                                className="text-muted-foreground transition-colors hover:text-foreground"
                            >
                                {item.name}
                            </Link>
                        ))
                    }

                </nav>
                <Sheet>
                    <SheetTrigger asChild>
                        <Button
                            variant="outline"
                            size="icon"
                            className="shrink-0 md:hidden"
                        >
                            <Menu className="h-5 w-5"/>
                            <span className="sr-only">Toggle navigation menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left">
                        <nav className="grid gap-6 text-lg font-medium">
                            {
                                navigation.map((item) => (
                                    <Link
                                        key={item.href}
                                        to={item.href}
                                        className="text-muted-foreground hover:text-foreground"
                                    >
                                        {item.name}
                                    </Link>
                                ))
                            }

                        </nav>
                    </SheetContent>
                </Sheet>
            </header>
            <main>
                <Outlet/>
            </main>
        </>
    );
}
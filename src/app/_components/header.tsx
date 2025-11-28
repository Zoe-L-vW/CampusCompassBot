import { Container } from "./container";
import { Navbar } from "./navbar";

export function Header() {
    return (
        <header className="sticky top-0 z-50 py-4 backdrop-blur-md bg-background/50 border-b border-gray-200 dark:border-gray-800">
            <Container>
                <div className="flex items-center justify-between">
                    <h1 className="text-xl lg:text-2xl font-bold">
                        <a href="#home">Campus Compass 🧭</a>
                        {/* <Image src={"/logo.png"} alt="Logo" width={250} height={40} /> */}
                    </h1>
                    <Navbar />
                </div>
            </Container>
        </header>
    )
}
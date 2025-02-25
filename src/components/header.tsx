import Link from "next/link";
import Container from "./container";

export default function Header() {
  return (
    <header className="h-[70px] border-b">
      <Container>
        <div className="h-[70px] flex items-center justify-center">
          <Link href="/">
            <h1 className="text-[20px] font-bold">ふむふむ.com</h1>
          </Link>
        </div>
      </Container>
    </header>
  );
}

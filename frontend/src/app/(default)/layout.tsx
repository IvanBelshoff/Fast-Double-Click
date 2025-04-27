import { Navbar } from "@/shared/components/Navbar";


type ILayout = Readonly<{ children: React.ReactNode }>;

export default function Layout({ children }: ILayout) {
  return (
    <>
      <Navbar/>
      {children}
    </>
  );
}
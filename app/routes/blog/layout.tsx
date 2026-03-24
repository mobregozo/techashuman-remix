import { Footer } from "@/components/footer";
import { Outlet } from "react-router";

export default function Index() {
  return (
    <>
      <Outlet />
      <div className="my-10">
        <Footer />
      </div>
    </>
  );
}

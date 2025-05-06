// import { Button } from "@nextui-org/react";
import HomeLayout from "@/components/layouts/HomeLayout/HomeLayout";
import Home from "@/components/views/Home/Home";

const Page = () => {
  return (
    // <section className="flex min-h-screen flex-col items-center justify-between p-24">
    //   <Button color="primary">Button</Button>
    // </section>
    <HomeLayout>
      <Home />
    </HomeLayout>
      
  );
};

export default Page;

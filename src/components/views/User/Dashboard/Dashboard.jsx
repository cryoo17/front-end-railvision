"use client";

import InputFile from "@/components/ui/InputFile/InputFile";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Image,
} from "@nextui-org/react";

const Dashboard = () => {
  return (
    <section>
      <Card className="mb-8 p-4">
        <CardHeader className="flex-col items-start">
          <Input label="Masukkan nama Stasiun" type="text" />
        </CardHeader>
        <CardBody className="flex flex-col gap-4 overflow-visible">
          <InputFile />
          <Button className="w-fit" color="primary">
            Button
          </Button>
        </CardBody>
      </Card>

      <div className="flex flex-col items-center justify-center">
        <Card className="flex w-2/3 p-4">
          <CardHeader className="flex-col px-4 pb-0 pt-2">
            <Image
              alt="Card background"
              className="rounded-xl object-cover"
              src="https://heroui.com/images/hero-card-complete.jpeg"
              width={1000}
            />
          </CardHeader>
          <CardBody className="p-4">
            <h2 className="text-2xl font-bold">Stasiun Manggarai</h2>
            <h4 className="text-2xl font-bold">Status: Padat</h4>
          </CardBody>
        </Card>
      </div>
    </section>
  );
};

export default Dashboard;

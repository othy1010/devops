import FileUploadComponent from "@/components/CustomForm2";
import { CardWithForm } from "@/components/cardWithForm";
import { InputForm } from "@/components/homeForm";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-10 p-24 mx-auto max-w-6xl pb-28 px-4 sm:px-6">
      <CardWithForm />
    </main>
  );
}

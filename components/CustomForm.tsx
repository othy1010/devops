"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast, useToast } from "@/components/ui/use-toast";
import { ToastAction } from "./ui/toast";
import { useRouter } from "next/navigation";

const FormSchema = z.object({
  inputfile: z.any(),
});

export function InputForm() {
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      inputfile: null,
    },
  });

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      form.setValue("inputfile", event.target.files, { shouldValidate: true });
    }
  };

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    const file = data.inputfile?.item(0);
    if (file) {
      const reader = new FileReader();

      reader.onload = (event: ProgressEvent<FileReader>) => {
        const base64String = event.target?.result;
        if (typeof base64String === "string") {
          localStorage.setItem("uploadedFile", base64String);
          toast({
            title: "File uploaded successfully!",
            description: "Your file has been stored in local storage.",
          });
          router.push("/display");
        }
      };

      reader.onerror = (error) => {
        console.error("Error reading file:", error);
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex w-full gap-2">
          <div className="w-full">
            <FormField
              control={form.control}
              name="inputfile"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Input your Model</FormLabel>
                  <FormControl>
                    <Input id="inputfile" type="file" onChange={onFileChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <Button className="mt-4 w-full" type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
}

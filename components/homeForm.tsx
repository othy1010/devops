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

const FormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  branchname: z.string().min(2, {
    message: "Branchname must be at least 2 characters.",
  }),
  url: z.string().url({
    message: "URL must be a valid URL.",
  }),
  projectType: z.enum([
    "static",
    "nextjs",
    "gatsby",
    "nuxtjs",
    "vuepress",
    "springboot",
    "static",
    "other",
  ]),
});

export function InputForm() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      branchname: "",
      username: "",
      url: "",
      projectType: "springboot",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
    console.log(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="">
        <div className="flex w-full gap-2">
          <div className="w-1/2">
            <FormField
              control={form.control}
              name="branchname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Branch name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-1/2">
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="projectType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Type</FormLabel>
                  <FormControl>
                    <Select {...field}>
                      <SelectTrigger className="w-full">
                        <span className="block truncate">{field.value}</span>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="static">Static</SelectItem>
                        <SelectItem value="nextjs">Next.js</SelectItem>
                        <SelectItem value="gatsby">Gatsby</SelectItem>
                        <SelectItem value="nuxtjs">Nuxt.js</SelectItem>
                        <SelectItem value="vuepress">VuePress</SelectItem>
                        <SelectItem value="springboot">Spring Boot</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />{" "}
          </div>
        </div>
        <Button className="mt-4 w-full" type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
}

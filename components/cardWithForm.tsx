"use client";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { InputForm } from "./CustomForm";
import FileUploadComponent from "./CustomForm2";

export function CardWithForm() {
  return (
    <Card className="w-2/3">
      <CardHeader>
        <CardTitle
          className="
          text-7xl font-bold text-center 
        "
        >
          DevOpsify
        </CardTitle>
        <CardDescription className="text-center">
          Deploy your new project in one-click.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <FileUploadComponent />
      </CardContent>
      <CardFooter>
        {/* <Button className="w-full">Deploy</Button> */}
      </CardFooter>
    </Card>
  );
}

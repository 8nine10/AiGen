'use client'

import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useUploadThing } from '@/lib/uploadthing';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import * as z from "zod";
import { usePathname, useRouter } from "next/navigation";
import { ThreadValidation } from "@/lib/validations/thread";
import { createThread } from "@/lib/actions/thread.actions";
import { ChangeEvent, useState } from "react";
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function PostThread({ userId }: { userId: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const { startUpload } = useUploadThing("media");

  const form = useForm({
    resolver: zodResolver(ThreadValidation),
    defaultValues: {
      agentName: '',
      description: '',
      category: '',
      price: '',
      aimodel: null,
      instructions: '',
      dependencies: '',
      license: '',
      accountId: JSON.parse(userId),
    },
  });

  const handleFileUpload = (
      e: ChangeEvent<HTMLInputElement>,
      fieldChange: (value: string) => void
    ) => {
      e.preventDefault();

      const fileReader = new FileReader();

      if (e.target.files && e.target.files.length > 0) {
        const file = e.target.files[0];

        // Store the full file list if needed
        setFiles(Array.from(e.target.files));

        // Read file as base64 URL (useful for uploads)
        fileReader.onload = async (event) => {
          const fileDataUrl = event.target?.result?.toString() || '';
          fieldChange(fileDataUrl);
        };

        fileReader.readAsDataURL(file);
      }
    };



  const onSubmit = async (values: z.infer<typeof ThreadValidation>) => {
  setIsSubmitting(true);
  try {
    const imgRes = await startUpload(files);
    
    if (imgRes && imgRes[0].url) {
        values.aimodel = imgRes[0].url;
    }
    await createThread({
      agentName: values.agentName,
      description: values.description,
      category: values.category,
      price: values.price,
      aimodel: values.aimodel,
      instructions: values.instructions,
      dependencies: values.dependencies,
      license: values.license,
      author: JSON.parse(userId),
      communityId: null,
      path: pathname,
    });

    router.push('/');
  } catch (error) {
    console.error("Failed to create thread:", error);
  } finally {
    setIsSubmitting(false);
  }
};

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-10 flex flex-col justify-start gap-10"
      >
        <FormField
          control={form.control}
          name="agentName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base-semibold text-light-2">Agent Name</FormLabel>
              <FormControl>
                <Input className="account-form_input no-focus" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base-semibold text-light-2">Description</FormLabel>
              <FormControl>
                <Textarea className="account-form_input no-focus" rows={5} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base-semibold text-light-2">Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {["Data Analysis", "Image Generation", "Code Helper", "Text Processing", "Productivity", "Creative", "Education", "Others"].map(c => (
                    <SelectItem key={c} value={c}>{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base-semibold text-light-2">Price</FormLabel>
              <FormControl>
                <Input className="account-form_input no-focus" type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="aimodel"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base-semibold text-light-2">AI Model</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="*"
                  onChange={(e) => handleFileUpload(e, field.onChange)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="instructions"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base-semibold text-light-2">Execution Instructions</FormLabel>
              <FormControl>
                <Textarea className="account-form_input no-focus" rows={5} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dependencies"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base-semibold text-light-2">Dependencies</FormLabel>
              <FormControl>
                <Textarea
                  rows={5}
                  className="account-form_input no-focus"
                  placeholder="Example: torch==1.9.0"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="license"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base-semibold text-light-2">License</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a license" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {["MIT License", "Apache License 2.0", "GNU GPL v3", "Proprietary(All Rights Reserved)", "Others"].map(l => (
                    <SelectItem key={l} value={l}>{l}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="bg-primary-500" disabled={isSubmitting}>
          {isSubmitting ? 'Uploading...' : 'Upload'}
        </Button>
      </form>
    </Form>
  );
}

export default PostThread;

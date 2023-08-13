"use client";

import axios from "axios";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

import { SongFormData, SongFormSchema } from "@/lib/form-validation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ImageUploader } from "@/components/image-uploader";
import { AudioUploader } from "@/components/audio-uploader";
import { Button } from "@/components/ui/button";

interface SongFormProps {
  initialData?: SongFormData | null;
}

export const SongForm = ({ initialData }: SongFormProps) => {
  const router = useRouter();

  const form = useForm<SongFormData>({
    resolver: zodResolver(SongFormSchema),
    defaultValues: initialData
      ? initialData
      : {
          title: "",
          artist: "",
          audioUrl: "",
          genre: "",
          imageUrl: "",
        },
  });

  const imageUrl = form.getValues("imageUrl");
  const audioUrl = form.getValues("audioUrl");

  const loading = form.formState.isSubmitting;

  const onSubmit = async (values: SongFormData) => {
    try {
      await axios.post("/api/songs", values);
      router.refresh();
      router.push("/");
      toast.success("Song created.");
    } catch (error) {
      toast.error("Something went wrong.");
    }
  };

  return (
    <Form {...form}>
      <form
        autoComplete="off"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div>
          <h3 className="mb-4 text-lg font-semibold">Song Information</h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Dancing Queen"
                      disabled={loading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="artist"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Artist</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="ABBA"
                      disabled={loading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="genre"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Genre</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Pop"
                      disabled={loading}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="mt-10">
          <h3 className="mb-4 text-lg font-semibold">Song Files</h3>
          <div className="flex flex-col items-center gap-5 lg:items-start lg:flex-row">
            <div>
              <div className="relative w-[250px] aspect-square">
                <Image
                  fill
                  src={imageUrl || "/assets/music-placeholder.png"}
                  alt=""
                  className="object-cover rounded-md"
                />
              </div>
            </div>
            <div className="">
              <div className="flex items-center gap-x-4">
                <FormField
                  control={form.control}
                  name="imageUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="sr-only">
                        upload song image cover
                      </FormLabel>
                      <FormControl>
                        <ImageUploader
                          disabled={loading}
                          onChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="audioUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="sr-only">
                        upload song audio
                      </FormLabel>
                      <FormControl>
                        <AudioUploader
                          disabled={loading}
                          onChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              {audioUrl && (
                <div className="mt-8">
                  <audio controls>
                    <source src={audioUrl} />
                  </audio>
                </div>
              )}
            </div>
          </div>
        </div>
        <Button
          className="w-full mt-10 lg:w-fit"
          size="lg"
          disabled={loading}
          type="submit"
        >
          Create
        </Button>
      </form>
    </Form>
  );
};

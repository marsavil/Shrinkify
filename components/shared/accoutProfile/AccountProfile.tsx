"use client";
import styles from './accountProfile.module.css'
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserValidation } from "@/lib/validations/user";
import { z } from "zod";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import { isBase64Image } from "@/lib/utils";
import { useUploadThing } from '@/lib/uploadthing'
import { updateUser } from "@/lib/actions/user.actions";
import { usePathname, useRouter } from "next/navigation";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "../../ui/form";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";

interface Props {
  user: {
    id: string;
    objectId: string;
    username: string;
    name: string;
    image: string;
  };
  btnTitle: string;
}

const AccountProfile = ({ user, btnTitle }: Props) => {
  const pathname = usePathname();
  const router = useRouter();
  const [files, setFiles] = useState<File[]>([]);
  const { startUpload } = useUploadThing('media');
  const form = useForm({
    resolver: zodResolver(UserValidation),
    defaultValues: {
      profile_photo: user?.image || "",
      name: user?.name || "",
      username: user?.username || "",
    },
  });
  async function onSubmit(values: z.infer<typeof UserValidation>) {
    const blob = values.profile_photo;

    const hasImageChanged = isBase64Image(blob)
    if (hasImageChanged){
      const imgRes = await startUpload(files)
      if(imgRes && imgRes[0].url){
        values.profile_photo = imgRes[0].url
      }
    }
    await updateUser({
      username: values.username,
      name: values.name,
      image: values.profile_photo,
      userId: user.id,
      path: pathname
  });
  if ( pathname === '/profile/edit') {
    router.back();
  } else {
    router.push('/');
  }  
}

  function handleImage(
    e: ChangeEvent<HTMLInputElement>,
    fieldChange: (value: string) => void
  ) {
    e.preventDefault();

    const fileReader = new FileReader(); // Lee el archivo

    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];

      setFiles(Array.from(e.target.files));

      if (!file.type.includes("image")) return;

      fileReader.onload = async (event) => {
        const imageDataUrl = event.target?.result?.toString() || "";
        fieldChange(imageDataUrl);
      };
      fileReader.readAsDataURL(file);
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={styles.formContainer}
      >
        <FormField
          control={form.control}
          name="profile_photo"
          render={({ field }) => (
            <FormItem className={styles.imageContainer}>
              <FormLabel className={styles.imageLabel}>
                {field.value ? (
                  <Image
                    src={field.value}
                    alt="profile photo"
                    width={96}
                    height={96}
                    priority
                    className={styles.profileImage}
                  />
                ) : (
                  <Image
                    src="/assets/profile.svg"
                    alt="profile photo"
                    width={24}
                    height={24}
                    className={styles.profileImage}
                  />
                )}
              </FormLabel>
              <FormControl className={styles.formControl}>
                <Input
                  placeholder="Upload a photo"
                  type="file"
                  accept="image/*"
                  className={styles.input}
                  onChange={(e) => handleImage(e, field.onChange)}
                />
              </FormControl>
              <FormMessage / >
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className={styles.nameFormItem}>
              <FormLabel className={styles.textLight2}>
                Name
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Write your name"
                  type="text"
                  className={styles.noFocus}
                  {...field}
                />
              </FormControl>
              <FormMessage / >
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className={styles.nameFormItem}>
              <FormLabel className={styles.textLight2}>
                Username
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Write your username"
                  type="text"
                  className={styles.noFocus}
                  {...field}
                />
              </FormControl>
              <FormMessage / >
            </FormItem>
          )}
        />
        <Button type="submit" className={styles.btn}>
          Submit
        </Button>
      </form>
    </Form>
  );
};
export default AccountProfile;
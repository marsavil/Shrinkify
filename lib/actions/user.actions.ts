'use server'
import { FilterQuery, SortOrder } from "mongoose";
import { revalidatePath } from "next/cache";
import Link from "../models/link.model";
import User from "../models/user.model";
import { connectToDB } from "../mongoose";

export async function fetchUser(userId: string) {
  try {
    console.log(userId)
    connectToDB();
    const user = await User.findOne({ id: userId })
    // .populate([{
    //   path: "link",
    //   model: Link,
    //   select: "_id url shortUrl"
    // }]);
    return user
  } catch (error: any) {
    throw new Error(`Failed to fetch user: ${error.message}`);
  }
}

interface Params {
  userId: string;
  username: string;
  name: string;
  image: string;
  path: string;
}

export async function updateUser({
  userId,
  name,
  path,
  username,
  image,
}: Params): Promise<void> {
  try {
    connectToDB();

    await User.findOneAndUpdate(
      { id: userId },
      {
        username: username.toLowerCase(),
        name,
        image,
        onboarded: true,
      },
      { upsert: true }
    );

    if (path === "/profile/edit") {
      revalidatePath(path);
    }
  } catch (error: any) {
    console.log(error.message)
    throw new Error(`Failed to create/update user: ${error.message}`);
  }
}
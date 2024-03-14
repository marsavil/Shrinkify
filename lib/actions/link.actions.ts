'use server'
import { FilterQuery, SortOrder } from "mongoose";
import { revalidatePath } from "next/cache";
import Link from "../models/link.model";
import User from "../models/user.model";
import { connectToDB } from "../mongoose";
import { fetchUser } from "./user.actions";
export async function generateLink (url: string, userId: string){
  console.log(url, userId)
  const shortUrl = Math.random().toString(36).substring(2,7);
  try {
    connectToDB();
    const user = await fetchUser(userId);
    console.log(user)
    const link = await Link.create({
      url,
      shortUrl,
    })
    console.log(user._id)
    if ( user ) {
      link.user = user._id;
      user.links.push(link._id)
      await link.save();
      await user.save();
    }
    return { url, shortUrl }
  } catch (error: any) {
    console.log(error.message)
    throw new Error(`Failed to generate link: ${error.message}`)
  }
}
export async function fetchLink (id: string){
  try {
    connectToDB();
    const link = await Link.findOne({shortUrl: id }).populate({
      path: "user",
      model: User,
      select: "id username name image"})
      .populate({
        path: "links",
        model: Link,
        select: "_id url shortUrl"
      })
      link.clicks = link.clicks + 1;
      console.log(link.url)
      link.save();

      return link.url
  } catch (error: any) {
    console.log(error.message)
    throw new Error(`Failed to fetch link: ${error.message}`)
  }

}

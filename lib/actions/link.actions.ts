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
  let verifiedUrl= ''
  url.startsWith('www.') ? verifiedUrl = url.slice(4, url.length) : verifiedUrl = url
  console.log(userId)
  try {
    connectToDB();

    if(userId) {
      const user = await fetchUser(userId);
      const link = await Link.create({
        url: verifiedUrl,
        shortUrl,
      })
      if ( user ) {
        link.user = user._id;
        user.links.push(link._id)
        await link.save();
        await user.save();
      }
    return { url, shortUrl }
  } else {
    const link = await Link.create({
      url: verifiedUrl,
      shortUrl,
    })
    return { url, shortUrl }
  } 
}catch (error: any) {
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
      // .populate({
      //   path: "links",
      //   model: Link,
      //   select: "_id url shortUrl"
      // })
      link.clicks = link.clicks + 1;
      console.log(link.url)
      link.save();

      return link.url
  } catch (error: any) {
    console.log(error.message)
    throw new Error(`Failed to fetch link: ${error.message}`)
  }
}
export async function fetchUserLinks ( id: string ){
  try {
    connectToDB();
    const user = await User.findOne({id});
    const { links} = user;
    return links
  } catch (error: any) {
    throw new Error(`Failed to fetch links: ${error.message}`)
  }
}

export async function fetchLinkById(id: any) {
  
  
  try {
    connectToDB();
    const link = await Link.findById(id);
    return link
  } catch (error:any) {
    throw new Error(`Failed to fetch link: ${error.message}`)
  }
}
import express from "express";
import Logger from "js-logger";

import IPost from "../interface/post.interface";
import IResponce from "../interface/responce.interface";
import Post from "../models/post";

export default class PostController {
  async newPost(req: express.Request, res: express.Response<IResponce>) {
    const data: IPost = req.body;
    try {
      const post = await Post.insertMany({
        about: data.about,
        advertiser: data.advertiser,
        area: data.area,
        characteristics: data.characteristics,
        city: data.city,
        constructionYear: data.constructionYear,
        floor: data.floor,
        heating: data.heating,
        microlocation: data.microlocation,
        monthlyUtilities: data.monthlyUtilities,
        municipality: data.municipality,
        parking: data.parking,
        price: data.price,
        rooms: data.rooms,
        state: data.state,
        street: data.street,
        title: data.title,
        totalFloors: data.totalFloors,
        type: data.type,
      });

      if (post) {
        return res.status(200).json();
      }
    } catch (error) {
      Logger.error(`${error}`);
    }

    return res.status(400).json({
      msg: "There is a problem with your post. Please make sure everyting is filled correctly",
    });
  }

  async updatePost(req: express.Request, res: express.Response<IResponce>) {
    const post: IPost = req.body;
    try {
      const result = await this.update(post);
      if (result) {
        return res.status(200).json();
      }
    } catch (error) {
      Logger.error(`${error}`);
    }
    return res.status(400).json({
      msg: "There is a problem with your post. Please make sure everyting is filled correctly",
    });
  }

  async getPosts(req: express.Request, res: express.Response<IResponce>) {
    const filter: IPost = req.body;
    try {
      let query = {};
      if (filter.characteristics) {
        query = {
          characteristics: {
            $all: filter.characteristics,
          },
        };
      }
      const posts: IPost[] = await Post.find(query);
      return res.status(200).json({ body: posts });
    } catch (error) {
      Logger.error(`${error}`);
      return res.status(500).json();
    }
  }

  private async update(updatedPost: IPost) {
    const post: IPost = await Post.findById(updatedPost.id);
    return await Post.updateOne(
      { id: post.id },
      {
        about: updatedPost.about || post.about,
        advertiser: updatedPost.advertiser || post.advertiser,
        area: updatedPost.area || post.area,
        characteristics: updatedPost.characteristics || post.characteristics,
        city: updatedPost.city || post.city,
        constructionYear: updatedPost.constructionYear || post.constructionYear,
        floor: updatedPost.floor || post.floor,
        heating: updatedPost.heating || post.heating,
        microlocation: updatedPost.microlocation || post.microlocation,
        monthlyUtilities: updatedPost.monthlyUtilities || post.monthlyUtilities,
        municipality: updatedPost.municipality || post.municipality,
        parking: updatedPost.parking || post.parking,
        price: updatedPost.price || post.price,
        rooms: updatedPost.rooms || post.rooms,
        state: updatedPost.state || post.state,
        street: updatedPost.street || post.street,
        title: updatedPost.title || post.title,
        totalFloors: updatedPost.totalFloors || post.totalFloors,
        type: updatedPost.type || post.type,
      }
    );
  }
}

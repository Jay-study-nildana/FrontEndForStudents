export interface GetImagesForPost {}
// DTO for adding an image to a post

import { CreatePostDto } from './dto/CreatePostDto';
import { UpdatePostDto } from './dto/UpdatePostDto';
import { PostResponseDto } from './dto/PostResponseDto';
import { GetPostsQueryDto } from './dto/GetPostsQueryDto';
import { AddImageToPostRequestDto } from './dto/AddImageToPostRequestDto';
import { AddImageToPostResponseDto } from './dto/AddImageToPostResponseDto';
import { GetImagesForPostResponseDto } from './dto/GetImagesForPostResponseDto';
import { AddImageToPostWithUUIDRequestDto } from './dto/AddImageToPostWithUUIDRequestDto';
import { AddImageToPostWithUUIDResponseDto } from './dto/AddImageToPostWithUUIDResponseDto';
import { GetImagesForPostWithUUIDResponseDto } from './dto/GetImagesForPostWithUUIDResponseDto';

export interface PostRepository {
  create(input: CreatePostDto): Promise<PostResponseDto>;
  findAll(): Promise<PostResponseDto[]>;
  findOne(id: number): Promise<PostResponseDto | null>;
  update(id: number, input: UpdatePostDto): Promise<PostResponseDto>;
  delete(id: number): Promise<PostResponseDto>;
  findWithQuery(query: GetPostsQueryDto): Promise<PostResponseDto[]>;
  addImageToPost(
    input: AddImageToPostRequestDto,
  ): Promise<AddImageToPostResponseDto>;
  addImageToPostWithUUID(
    input: AddImageToPostWithUUIDRequestDto,
  ): Promise<AddImageToPostWithUUIDResponseDto>;
  getImagesForPost(postId: number): Promise<GetImagesForPostResponseDto>;
  getImagesForPostWithUUID(
    postId: string,
  ): Promise<GetImagesForPostWithUUIDResponseDto>;
}

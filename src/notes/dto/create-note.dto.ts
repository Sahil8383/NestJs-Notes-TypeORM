import { CreateCommentDto } from "./create-comment.dto";
import { CreateTagDto } from "./create-tag.dto";

export class CreateNoteDto {
    title: string;
    content: string;
    comments: CreateCommentDto[];
    tags: CreateTagDto[];
}

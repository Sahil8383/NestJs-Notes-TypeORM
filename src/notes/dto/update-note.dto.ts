import { CreateCommentDto } from './create-comment.dto';

export class UpdateNoteDto {
    title: string;
    content: string;
    comments: CreateCommentDto[];
}

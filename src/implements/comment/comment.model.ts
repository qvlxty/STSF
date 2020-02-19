import { Model } from "../../core/base.model";

interface IComment {
  name: string;
  text: string;
}

export class CommentModel extends Model<IComment> {}

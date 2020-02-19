import { Model } from "core/base.model";

interface IPost {
  id: number;
  name: string;
  text: string;
}
export class PostModel extends Model<IPost> {}

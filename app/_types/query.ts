import { InferAccount, InsertComment } from "@/schema"

export type TInsertCommentData = {
    provider: InferAccount['provider'],
    providerId: string,
    commentData: InsertComment
}
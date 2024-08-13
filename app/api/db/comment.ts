'use server'

import { TInsertCommentData } from '@/app/_types/query';
import { db } from '@/drizzle/db';
import { accounts, comments, InferComment, InsertComment } from "@/schema";
import { and, eq } from 'drizzle-orm';

export async function createComment(
    data: string
): Promise<InsertComment> {
    let insertCommentData: TInsertCommentData = JSON.parse(data)
    // get accountId based on data.provider and data.id
    const accountId = await db
        .select({ value: accounts.accountId })
        .from(accounts)
        .where(and(
            eq(accounts.provider, insertCommentData.provider),
            eq(accounts.providerId, insertCommentData.providerId)
        ))
    // write to comment table using this accountId
    const { commentData } = insertCommentData;
    const comment: InsertComment = {
        accountId: accountId[0].value,
        articleId: commentData.articleId,
        content: commentData.content,
    }
    const insertedComment = await db
        .insert(comments)
        .values(comment)
        .returning();

    return insertedComment[0];
}

// export async function getCommentByArticleID(
//     articleId: string
// ): Promise<InferComment[]> {
//     const commentOnArticle = await db
//         .select()
//         .from(comments)
//         .leftJoin(accounts, eq(comments.accountId, accounts.accountId))
//         .where(eq(comments.articleId, articleId))

//     return commentOnArticle;
// }
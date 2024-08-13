'use client'

import '@/app/_css/globals.css'
import { Session } from 'next-auth';
import { effect, signal } from '@preact-signals/safe-react';
import Image from 'next/image';
import { useEditor, EditorContent, BubbleMenu } from '@tiptap/react';
import Placeholder from '@tiptap/extension-placeholder';
import Document from '@tiptap/extension-document';
import History from '@tiptap/extension-history';
import Heading from '@tiptap/extension-heading';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import TextAlign from '@tiptap/extension-text-align';
import Bold from '@tiptap/extension-bold';
import Italic from '@tiptap/extension-italic';
import Strike from '@tiptap/extension-strike';
import { Mathematics } from '@tiptap-pro/extension-mathematics';
import 'katex/dist/katex.min.css';
import CharacterCount from '@tiptap/extension-character-count';

import { createComment } from '@/app/api/db/comment';
import { InferAccount } from '@/schema';
import { TInsertCommentData } from '@/app/_types/query';

type RichTextEditorProps = {
    userSession: Session['user'],
    artikelId: string,
}

const characterCountLimit = 5000;

const warning = signal<"text-green-500" | "text-orange-500" | "text-red-500">("text-green-500")

const RichTextEditor = ({ userSession, artikelId }: RichTextEditorProps) => {
    const editor = useEditor({
        extensions: [
            Placeholder.configure({
                placeholder: 'Write your comments ...'
            }),
            Document,
            History,
            Heading,
            Paragraph,
            Text,
            TextAlign.configure({
                types: ['heading', 'paragraph']
            }),
            Bold,
            Italic,
            Strike,
            Mathematics,
            CharacterCount.configure({
                limit: characterCountLimit
            })
        ],
        enableContentCheck: true,
        
        editorProps: {
            attributes: {
                class: 'focus:outline-none min-h-[150px]'
            }
        },
        editable: true,
        autofocus: false,
        parseOptions: {
            preserveWhitespace: 'full'
        }
    })

    if (!editor) {
        return null
    }

    effect(() => {
        const remainingChar = characterCountLimit - editor.storage.characterCount.characters()
        const percentageLeft = remainingChar / characterCountLimit
        percentageLeft > 0.5 
            ? warning.value = "text-green-500"
            : percentageLeft > 0
                ? warning.value = "text-orange-500"
                : warning.value = "text-red-500"
    })

    const handleSubmit = async () => {
        const insertCommentData: TInsertCommentData = {
            provider: userSession.provider as InferAccount['provider'],
            providerId: userSession.id,
            commentData: {
                articleId: artikelId,
            accountId: userSession.id,
            content: editor.getJSON(),
            }
        }
        
        const insertedComment = await createComment(JSON.stringify(insertCommentData))

        if (insertedComment) {
            editor.commands.clearContent()
        }
    }

    return (
        <div className="flex flex-col w-full gap-2">
            <div className="flex justify-between items-center">
                <div className="flex gap-2 items-center">
                    <Image
                        src={userSession.image as string}
                        alt={userSession.name as string}
                        width={36}
                        height={36}
                        className="rounded-full grow"
                    />
                    <div className="flex flex-col font-wotfard">
                        <span>{userSession.name}</span>
                        <span className="text-[9px] text-gray-400">{`using ${userSession.provider}`}</span>
                    </div>
                </div>
                <div className="flex gap-2 items-center">
                    <div className="flex flex-col text-end font-inconsolata text-[11px] text-gray-400">
                        <span><span  className={`${warning.value}`}>{((characterCountLimit - editor.storage.characterCount.characters()) as number).toLocaleString('en-us')}</span> chars left</span>
                        <span>{(editor.storage.characterCount.words() as number).toLocaleString('en-us')} words written</span>
                    </div>
                    <div 
                        className="p-2 bg-vampire-black flex items-center cursor-pointer shadow-xl rounded-md active:scale-90"
                        onClick={() => handleSubmit()}
                    >
                        Submit
                    </div>
                </div>
            </div>
            <hr />
            <div className="overflow-y-scroll font-robotoMono text-[12px] grow">
                {editor && (
                    <BubbleMenu editor={editor} tippyOptions={{ duration: 100}}>
                        <div className="bubble-menu">
                            <button
                                onClick={() => editor.chain().focus().toggleBold().run()}
                                className={editor.isActive('bold') ? 'is-active' : ''}
                            >
                                Bold
                            </button>
                            <button
                                onClick={() => editor.chain().focus().toggleItalic().run()}
                                className={editor.isActive('italic') ? 'is-active' : ''}
                            >
                                Italic
                            </button>
                            <button
                                onClick={() => editor.chain().focus().toggleStrike().run()}
                                className={editor.isActive('strike') ? 'is-active' : ''}
                            >
                                Strike
                            </button>
                        </div>
                    </BubbleMenu>
                )}
                <EditorContent editor={editor} />
            </div>
        </div>
    )
}

export default RichTextEditor
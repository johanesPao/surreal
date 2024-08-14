'use client'

import '@/app/_css/globals.css'
import { Session } from 'next-auth';
import { effect, signal } from '@preact-signals/safe-react';
import Image from 'next/image';
import { useEditor, EditorContent, FloatingMenu } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Mathematics } from '@tiptap-pro/extension-mathematics';
import CharacterCount from '@tiptap/extension-character-count';
import Document from '@tiptap/extension-document';
import { Footnotes, FootnoteReference, Footnote } from 'tiptap-footnotes';
import Highlight from '@tiptap/extension-highlight';
import { Image as TTImage } from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import Subscript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import Table from '@tiptap/extension-table';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import TableRow from '@tiptap/extension-table-row';
import TaskItem from '@tiptap/extension-task-item';
import TaskList from '@tiptap/extension-task-list';
import TextAlign from '@tiptap/extension-text-align';
import Typography from '@tiptap/extension-typography';
import Underline from '@tiptap/extension-underline'
import 'katex/dist/katex.min.css';

import { createComment } from '@/app/api/db/comment';
import { InferAccount } from '@/schema';
import { TInsertCommentData } from '@/app/_types/query';
import { IconBold, IconFileExport, IconItalic, IconStrikethrough, IconSubscript, IconSuperscript, IconSwipeDown, IconUnderline } from '@tabler/icons-react';

type RichTextEditorProps = {
    userSession: Session['user'],
    artikelId: string,
}

const characterCountLimit = 5000;

const warning = signal<"text-green-500" | "text-orange-500" | "text-red-500">("text-green-500")

const RichTextEditor = ({ userSession, artikelId }: RichTextEditorProps) => {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                codeBlock: false,
                document: false
            }),
            Document.extend({
                content: 'block+ footnotes?',
            }),
            Mathematics,
            CharacterCount.configure({
                limit: characterCountLimit
            }),
            Footnotes,
            Footnote,
            FootnoteReference,
            Highlight,
            Placeholder.configure({
                placeholder: 'Write your comments ...'
            }),
            TextAlign.configure({
                types: ['heading', 'paragraph']
            }),
            Subscript,
            Superscript
        ],
        enableContentCheck: true,
        
        editorProps: {
            attributes: {
                class: (
                    'focus:outline-none h-[150px] prose dark:prose-invert max-w-none [&_ol]:list-decimal [&_ul]:list-disc'
                ),
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
            <div className="flex">
                <div className="flex flex-col items-center gap-1 px-3">
                    <span className="text-[9px] text-gray-400">Formatting</span>
                    <div className="grid grid-cols-4 grid-flow-row gap-1.5">
                        <span className="bg-white rounded-md p-0.5 cursor-pointer group">
                            <IconBold
                                size={15}
                                onClick={() => editor.chain().focus().toggleBold().run()}
                                className="text-eerie-black"
                            />
                        </span>
                        <span className="bg-white rounded-md p-0.5 cursor-pointer group">
                            <IconItalic
                                size={15}
                                onClick={() => editor.chain().focus().toggleItalic().run()}
                                className="text-eerie-black"
                            />
                        </span>
                        <span className="bg-white rounded-md p-0.5 cursor-pointer group">
                            <IconStrikethrough
                                size={15}
                                onClick={() => editor.chain().focus().toggleStrike().run()}
                                className="text-eerie-black"
                            />
                        </span>
                        <span className="bg-white rounded-md p-0.5 cursor-pointer group">
                            <IconUnderline
                                size={15}
                                onClick={() => editor.chain().focus().toggleUnderline().run()}
                                className="text-eerie-black"
                            />
                        </span>
                        <span className="bg-white rounded-md p-0.5 cursor-pointer group">
                            <IconSubscript
                                size={15}
                                onClick={() => editor.chain().focus().toggleSubscript().run()}
                                className="text-eerie-black"
                            />
                        </span>
                        <span className="bg-white rounded-md p-0.5 cursor-pointer group">
                            <IconSuperscript
                                size={15}
                                onClick={() => editor.chain().focus().toggleSuperscript().run()}
                                className="text-eerie-black"
                            />
                        </span>
                    </div>
                </div>
                <div className="flex flex-col items-center gap-1 px-3">
                    <span className="text-[9px] text-gray-400">References</span>
                    <div className="grid grid-cols-4 grid-flow-row gap-1">
                        <span className="bg-white rounded-md p-0.5 cursor-pointer group">
                            <IconFileExport
                                size={15}
                                onClick={() => editor.commands.addFootnote()}
                                className="text-eerie-black"
                            />
                        </span>
                    </div>
                </div>
            </div>
            <hr />
            <div className="overflow-y-scroll font-robotoMono text-[12px] grow">
                {editor && (
                    <FloatingMenu editor={editor} tippyOptions={{ duration: 100 }}>
                        <div className="floating-menu">
                            <button
                                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                                className={editor.isActive('heading', { level: 1}) ? 'is-active' : ''}
                            >
                                H1
                            </button>
                            <button
                                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                                className={editor.isActive('heading', { level: 2}) ? 'is-active' : ''}
                            >
                                H2
                            </button>
                            <button
                                onClick={() => editor.chain().focus().toggleBulletList().run()}
                                className={editor.isActive('bulletList') ? 'is-active' : ''}
                            >
                                Bullet List
                            </button>
                        </div>
                    </FloatingMenu>
                )}
                <EditorContent editor={editor} />
            </div>
        </div>
    )
}

export default RichTextEditor
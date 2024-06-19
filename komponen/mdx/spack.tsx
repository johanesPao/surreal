'use client'

import {
    Sandpack,
    SandpackProvider,
    SandpackLayout,
    SandpackCodeEditor,
    SandpackConsole,
    SandpackPreview
} from '@codesandbox/sandpack-react'
import { autocompletion, completionKeymap } from '@codemirror/autocomplete'
import { python } from '@codemirror/lang-python'
import { rust } from '@codemirror/lang-rust'
import { sql } from '@codemirror/lang-sql'
import { SandpackFileExplorer } from 'sandpack-file-explorer'
import { gruvboxDark } from '@codesandbox/sandpack-themes'

type SandpackProps = {
    template: any;
    namaFile: string;
    denganExplorer: boolean;
    denganPreview: boolean;
    denganConsole: boolean;
    children: string;
}

const Spack = ({
    denganExplorer = false,
    denganPreview = false, 
    denganConsole = false, 
    ...props
}: SandpackProps) => {
    const { children, namaFile, template } = props
    return (
        <SandpackProvider 
            template={template} 
            theme={gruvboxDark}
            files={{
                [namaFile]: {
                    code: children,
                    active: true
                }
            }}
        >
            <SandpackLayout>
                {denganExplorer && (
                    <div className="hidden lg:block">
                        <SandpackFileExplorer />
                    </div>)
                }
                <SandpackCodeEditor
                    showTabs
                    showLineNumbers
                    showInlineErrors
                    wrapContent
                    closableTabs
                    extensions={[autocompletion()]}
                    extensionsKeymap={[...completionKeymap]}
                    additionalLanguages={[
                        {
                            name: "python",
                            extensions: ["py"],
                            language: python()
                        },
                        {
                            name: "rust",
                            extensions: ["rs"],
                            language: rust()
                        },
                        {
                            name: "sql",
                            extensions: ["sql"],
                            language: sql()
                        },
                    ]}
                    className="shadow-xl"
                />
                {denganPreview && <SandpackPreview />}
                {denganConsole && <SandpackConsole />}
            </SandpackLayout>
        </SandpackProvider>
    )
}

export default Spack
'use client'

// import { Sandpack } from '@codesandbox/sandpack-react'
import {
    Sandpack,
    SandpackProvider,
    SandpackLayout,
    SandpackCodeEditor,
    SandpackCodeOptions,
    SandpackPreview
} from '@codesandbox/sandpack-react'
import { autocompletion, completionKeymap } from '@codemirror/autocomplete'
import { python } from '@codemirror/lang-python'
import { rust } from '@codemirror/lang-rust'
import { sql } from '@codemirror/lang-sql'
import { SandpackFileExplorer } from 'sandpack-file-explorer'
import { gruvboxLight } from '@codesandbox/sandpack-themes'

type SandpackProps = {
    template: any;
    namaFile: string;
    children: string;
}

const Spack = (props: SandpackProps) => {
    const { children, namaFile, template } = props
    // return (
    //     <Sandpack
    //         template={template}
    //         theme={cobalt2}
    //         files={{
    //             [namaFile]: {
    //                 code: children,
    //                 active: true
    //             }
    //         }}
    //         options={{
    //             showLineNumbers: true,
    //             showInlineErrors: true,
    //             showTabs: true,
    //             closableTabs: true
    //         }}
    //     />
    // )
    return (
        <SandpackProvider 
            template={template} 
            theme={gruvboxLight}
            files={{
                [namaFile]: {
                    code: children,
                    active: true
                }
            }}
        >
            <SandpackLayout>
                {/* {window.screen.width >= 770 && (
                    <SandpackFileExplorer />
                )} */}
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
                />
                <SandpackPreview />
            </SandpackLayout>
        </SandpackProvider>
    )
}

export default Spack
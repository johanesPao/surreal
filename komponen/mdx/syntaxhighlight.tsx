'use client'

import { Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import {gruvboxDark} from 'react-syntax-highlighter/dist/esm/styles/prism'


type SyntaxProps = {
    bahasa: string,
    kode: string
}

const SyntaxHighlight = ({...props}: SyntaxProps) => {
    const { bahasa, kode } = props

    return (
        <div className="flex flex-col">
            <div className="flex flex-row px-[5%] lg:px-[20%] w-0">
                <span className="px-4 py-0.5 bg-[#282828] text-lg rounded-tl-lg rounded-tr-lg">TSX</span>
            </div>
            <SyntaxHighlighter 
                customStyle={{
                    margin: '0',
                    background: '#282828',
                    paddingLeft: '5%',
                    paddingRight: '5%'
                }}
                language={bahasa} 
                style={gruvboxDark} 
                className="text-xs mt-0 shadow-lg"
                showLineNumbers
            >
                {kode}
            </SyntaxHighlighter>
        </div>
    )
}

export default SyntaxHighlight
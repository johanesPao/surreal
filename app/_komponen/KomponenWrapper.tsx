import { MDXRemote } from 'next-mdx-remote/rsc'
import JSXTest from './JSXTest'

const komponen = {
    JSXTest
}

export const KomponenWrapper = (props: any) => {
    return (
        <MDXRemote
            {...props}
            components={{
                ...komponen,
                ...(props.komponen || {})
            }}
        />
    )
}
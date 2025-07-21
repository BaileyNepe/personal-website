import glob from 'fast-glob'
import type { ComponentType } from 'react'

// --- Data interfaces ---
export interface Project {
    title: string
    description: string
    date: string
}

export interface Work {
    company: string
    title: string
    startDate: string
    endDate?: string
}

export interface Education {
    qualification: string
    institution: string
    startDate: string
    endDate?: string
}

// --- Helper types ---
export type WithSlug<T> = T & { slug: string }

type LoadOptions<T> = {
    dir: string
    exportName?: string
    sortFn: (a: WithSlug<T>, b: WithSlug<T>) => number
}

const slugify = (filename: string) => filename.split('/')[0]

const getAllEntries = async <T>({
    dir,
    exportName,
    sortFn,
}: LoadOptions<T>) => {
    const cwd = `./src/app/${dir}`
    const pattern = '*/page.mdx'
    const files = await glob(pattern, { cwd })

    const key = exportName ?? dir.replace(/s$/, '')

    const entries = await Promise.all(
        files.map(async filename => {
            const moduleExports = (await import(`../app/${dir}/${filename}`)) as { default: ComponentType } & Record<typeof key, T>
            return {
                slug: slugify(filename),
                ...moduleExports[key],
            }
        }),
    )

    return entries.sort(sortFn)
}

// --- Exports ---
export const getAllProjects = async () =>
    getAllEntries<Project>({
        dir: 'projects',
        exportName: 'project',
        sortFn: (a, b) => +new Date(b.date) - +new Date(a.date),
    })

export const getAllWork = async () =>
    getAllEntries<Work>({
        dir: 'work',
        sortFn: (a, b) => +new Date(b.startDate) - +new Date(a.startDate),
    })

export const getAllEducation = async () =>
    getAllEntries<Education>({
        dir: 'education',
        sortFn: (a, b) => +new Date(b.startDate) - +new Date(a.startDate),
    })

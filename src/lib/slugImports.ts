import glob from 'fast-glob'
import type { ComponentType } from 'react'

// --- Data interfaces ---
export interface Project {
    id: number
    title: string
    description: string
    image: string
    slug: string
    tags: string[]
    date?: string
    status?: 'in-progress' | 'completed' | 'archived'
    priority?: 'high' | 'medium' | 'low'
    completedDate?: string
}

export interface WorkRole {
    title: string
    startDate: string
    endDate?: string
    description?: string
}

export interface Work {
    company: string
    logo: string
    slug: string
    startDate: string
    endDate?: string
    description: string
    roles?: WorkRole[]
    url?: string
    location?: string
    type?: 'full-time' | 'part-time' | 'contract' | 'internship'
}

export interface Education {
    qualification: string
    institution: string
    logo: string
    slug: string
    startDate: string
    endDate?: string
    description: string
    url?: string
    location?: string
    achievements?: string[]
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
        sortFn: (a, b) => {
            // First sort by status (in-progress first)
            const statusOrder = { 'in-progress': 0, 'completed': 1, 'archived': 2 }
            const statusDiff = (statusOrder[a.status || 'completed'] || 1) - (statusOrder[b.status || 'completed'] || 1)
            if (statusDiff !== 0) return statusDiff

            // Then by priority (high first)
            const priorityOrder = { 'high': 0, 'medium': 1, 'low': 2 }
            const priorityDiff = (priorityOrder[a.priority || 'medium'] || 1) - (priorityOrder[b.priority || 'medium'] || 1)
            if (priorityDiff !== 0) return priorityDiff

            // Finally by completion date (recent first) or id
            if (a.completedDate && b.completedDate) {
                return new Date(b.completedDate).getTime() - new Date(a.completedDate).getTime()
            }
            return a.id - b.id
        },
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

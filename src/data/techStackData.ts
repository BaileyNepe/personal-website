import awsLogo from '@/images/logos/aws-color.svg'
import bunLogo from '@/images/logos/bun.svg'
import playwrightLogo from '@/images/logos/playwright.svg'

export interface TechData {
  name: string
  slug: string
  icon?: string
  description: string
  websiteUrl: string
  codeSnippet: string
  codeLanguage: string
}

export const techStackData: TechData[] = [
  {
    name: 'TypeScript',
    slug: 'typescript',
    description:
      'I use TypeScript extensively across all my projects for type safety and better developer experience. It helps catch bugs early and makes refactoring much safer.',
    websiteUrl: 'https://www.typescriptlang.org/',
    codeSnippet: `interface User {
  id: string
  name: string
  email: string
  createdAt: Date
}

const createUser = (userData: Omit<User, 'id' | 'createdAt'>): User => {
  return {
    id: crypto.randomUUID(),
    createdAt: new Date(),
    ...userData
  }
}`,
    codeLanguage: 'typescript'
  },
  {
    name: 'MongoDB',
    slug: 'mongodb',
    description:
      'I use MongoDB for projects requiring flexible document storage. Perfect for rapid prototyping and applications with evolving schemas.',
    websiteUrl: 'https://www.mongodb.com/',
    codeSnippet: `import { MongoClient } from 'mongodb'

const client = new MongoClient(process.env.MONGODB_URI!)

export const getUserById = async (id: string) => {
  const db = client.db('myapp')
  const user = await db.collection('users').findOne({ _id: id })
  return user
}

export const createUser = async (userData: any) => {
  const db = client.db('myapp')
  const result = await db.collection('users').insertOne(userData)
  return result
}`,
    codeLanguage: 'javascript'
  },
  {
    name: 'PostgreSQL',
    slug: 'postgresql',
    description:
      'My go-to relational database for applications requiring strong consistency, complex queries, and ACID compliance. I often use it with Prisma for type-safe database access.',
    websiteUrl: 'https://www.postgresql.org/',
    codeSnippet: `-- User management with relationships
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  content TEXT,
  author_id UUID REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW()
);`,
    codeLanguage: 'sql'
  },
  {
    name: 'AWS',
    slug: 'aws',
    icon: awsLogo,
    description:
      'I use various AWS services for cloud infrastructure, including S3 for file storage, Lambda for serverless functions, and EC2 for compute resources.',
    websiteUrl: 'https://aws.amazon.com/',
    codeSnippet: `import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'

const s3Client = new S3Client({ region: 'ap-southeast-2' })

export const uploadFile = async (file: Buffer, key: string) => {
  const command = new PutObjectCommand({
    Bucket: 'my-app-bucket',
    Key: key,
    Body: file,
    ContentType: 'image/jpeg'
  })
  
  const result = await s3Client.send(command)
  return result
}`,
    codeLanguage: 'typescript'
  },
  {
    name: 'Terraform',
    slug: 'terraform',
    description:
      'I use Terraform for Infrastructure as Code to manage AWS resources, ensuring reproducible and version-controlled infrastructure deployments.',
    websiteUrl: 'https://www.terraform.io/',
    codeSnippet: `resource "aws_s3_bucket" "app_storage" {
  bucket = "my-app-storage-\${random_id.bucket_suffix.hex}"
}

resource "aws_s3_bucket_versioning" "app_storage_versioning" {
  bucket = aws_s3_bucket.app_storage.id
  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_lambda_function" "api" {
  filename         = "api.zip"
  function_name    = "my-app-api"
  role            = aws_iam_role.lambda_role.arn
  handler         = "index.handler"
  runtime         = "nodejs18.x"
}`,
    codeLanguage: 'hcl'
  },
  {
    name: 'Railway',
    slug: 'railway',
    description:
      'Railway is my preferred platform for deploying full-stack applications. Its simplicity and automatic deployments from Git make it perfect for side projects.',
    websiteUrl: 'https://railway.app/',
    codeSnippet: `# railway.toml
[build]
  builder = "NIXPACKS"

[deploy]
  startCommand = "npm run start"
  restartPolicyType = "ON_FAILURE"
  restartPolicyMaxRetries = 10

[[services]]
  name = "web"
  source = "."

[[services]]
  name = "postgres"
  source = "postgres:15"`,
    codeLanguage: 'toml'
  },
  {
    name: 'Node.js',
    slug: 'nodedotjs',
    description:
      'Node.js is the foundation of my backend development. I use it to build APIs, serverless functions, and full-stack applications with Express and Next.js.',
    websiteUrl: 'https://nodejs.org/',
    codeSnippet: `import express from 'express'
import cors from 'cors'

const app = express()

app.use(cors())
app.use(express.json())

app.get('/api/users/:id', async (req, res) => {
  try {
    const { id } = req.params
    const user = await getUserById(id)
    res.json(user)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user' })
  }
})

app.listen(3000, () => {
  console.log('Server running on port 3000')
})`,
    codeLanguage: 'javascript'
  },
  {
    name: 'Bun',
    slug: 'bun',
    icon: bunLogo,
    description:
      'I use Bun as a fast JavaScript runtime and package manager. Its speed improvements in development and production make it a great alternative to Node.js.',
    websiteUrl: 'https://bun.sh/',
    codeSnippet: `// bun.ts
import { serve } from 'bun'

const server = serve({
  port: 3000,
  fetch(req) {
    const url = new URL(req.url)
    
    if (url.pathname === '/api/health') {
      return new Response('OK', { status: 200 })
    }
    
    return new Response('Not Found', { status: 404 })
  }
})

console.log(\`Server running at http://localhost:\${server.port}\`)`,
    codeLanguage: 'typescript'
  },
  {
    name: 'React',
    slug: 'react',
    description:
      'React is my primary frontend framework. I use it with hooks, context, and modern patterns to build interactive user interfaces.',
    websiteUrl: 'https://react.dev/',
    codeSnippet: `import { useState, useEffect } from 'react'

interface User {
  id: string
  name: string
  email: string
}

export const UserProfile = ({ userId }: { userId: string }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(\`/api/users/\${userId}\`)
        const userData = await response.json()
        setUser(userData)
      } finally {
        setLoading(false)
      }
    }
    
    fetchUser()
  }, [userId])

  if (loading) return <div>Loading...</div>
  if (!user) return <div>User not found</div>

  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  )
}`,
    codeLanguage: 'typescript'
  },
  {
    name: 'Redux',
    slug: 'redux',
    description:
      'I use Redux with Redux Toolkit for complex state management in larger React applications, particularly when state needs to be shared across many components.',
    websiteUrl: 'https://redux.js.org/',
    codeSnippet: `import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface User {
  id: string
  name: string
  email: string
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  loading: boolean
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true
    },
    loginSuccess: (state, action: PayloadAction<User>) => {
      state.user = action.payload
      state.isAuthenticated = true
      state.loading = false
    },
    logout: (state) => {
      state.user = null
      state.isAuthenticated = false
    }
  }
})`,
    codeLanguage: 'typescript'
  },
  {
    name: 'React Query',
    slug: 'reactquery',
    description:
      'React Query (TanStack Query) is my go-to solution for server state management. It handles caching, synchronisation, and error handling beautifully.',
    websiteUrl: 'https://tanstack.com/query/',
    codeSnippet: `import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

const useUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const response = await fetch('/api/users')
      return response.json()
    }
  })
}

const useCreateUser = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async (userData: CreateUserData) => {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      })
      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
    }
  })
}`,
    codeLanguage: 'typescript'
  },
  {
    name: 'Auth0',
    slug: 'auth0',
    description:
      'I use Auth0 for authentication and authorisation in my applications. It provides secure, scalable user management with social logins and multi-factor authentication.',
    websiteUrl: 'https://auth0.com/',
    codeSnippet: `import { useAuth0 } from '@auth0/auth0-react'

export const LoginButton = () => {
  const { loginWithRedirect, isAuthenticated, user, logout } = useAuth0()

  if (isAuthenticated) {
    return (
      <div>
        <p>Welcome, {user?.name}!</p>
        <button onClick={() => logout({ returnTo: window.location.origin })}>
          Log Out
        </button>
      </div>
    )
  }

  return (
    <button onClick={() => loginWithRedirect()}>
      Log In
    </button>
  )
}`,
    codeLanguage: 'typescript'
  },
  {
    name: 'Docker',
    slug: 'docker',
    description:
      'I use Docker for containerising applications, ensuring consistent environments across development, testing, and production.',
    websiteUrl: 'https://www.docker.com/',
    codeSnippet: `# Dockerfile
FROM node:18-alpine AS base
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

FROM base AS dev
RUN npm ci
COPY . .
CMD ["npm", "run", "dev"]

FROM base AS prod
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]

# docker-compose.yml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
  
  postgres:
    image: postgres:15
    environment:
      POSTGRES_DB: myapp
      POSTGRES_PASSWORD: password`,
    codeLanguage: 'dockerfile'
  },
  {
    name: 'tRPC',
    slug: 'trpc',
    description:
      'tRPC provides end-to-end type safety for my full-stack TypeScript applications. It eliminates the need for API documentation and catches errors at compile time.',
    websiteUrl: 'https://trpc.io/',
    codeSnippet: `import { z } from 'zod'
import { router, publicProcedure } from './trpc'

export const userRouter = router({
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      return await getUserById(input.id)
    }),
    
  create: publicProcedure
    .input(z.object({
      name: z.string().min(1),
      email: z.string().email()
    }))
    .mutation(async ({ input }) => {
      return await createUser(input)
    })
})

// Client usage
const user = await trpc.user.getById.query({ id: '123' })
const newUser = await trpc.user.create.mutate({
  name: 'John Doe',
  email: 'john@example.com'
})`,
    codeLanguage: 'typescript'
  },
  {
    name: 'Next.js',
    slug: 'nextdotjs',
    description:
      'Next.js is my framework of choice for React applications. I leverage its SSR, SSG, API routes, and file-based routing for building performant web applications.',
    websiteUrl: 'https://nextjs.org/',
    codeSnippet: `// app/api/users/route.ts
import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  const users = await getUsers()
  return NextResponse.json(users)
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  const user = await createUser(body)
  return NextResponse.json(user, { status: 201 })
}

// app/users/[id]/page.tsx
export default async function UserPage({ 
  params 
}: { 
  params: { id: string } 
}) {
  const user = await getUserById(params.id)
  
  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  )
}`,
    codeLanguage: 'typescript'
  },
  {
    name: 'Vitest',
    slug: 'vitest',
    description:
      'Vitest is my preferred testing framework for modern JavaScript/TypeScript projects. Its speed and excellent developer experience make testing enjoyable.',
    websiteUrl: 'https://vitest.dev/',
    codeSnippet: `import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { UserProfile } from './UserProfile'

describe('UserProfile', () => {
  it('displays user information', async () => {
    const mockUser = {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com'
    }
    
    render(<UserProfile user={mockUser} />)
    
    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('john@example.com')).toBeInTheDocument()
  })

  it('calculates total correctly', () => {
    expect(calculateTotal([10, 20, 30])).toBe(60)
    expect(calculateTotal([])).toBe(0)
  })
})`,
    codeLanguage: 'typescript'
  },
  {
    name: 'Playwright',
    slug: 'playwright',
    icon: playwrightLogo,
    description:
      'I use Playwright for end-to-end testing across different browsers. Its reliability and powerful debugging tools make it excellent for testing complex user flows.',
    websiteUrl: 'https://playwright.dev/',
    codeSnippet: `import { test, expect } from '@playwright/test'

test('user can log in and view dashboard', async ({ page }) => {
  await page.goto('/login')
  
  await page.fill('[data-testid="email"]', 'user@example.com')
  await page.fill('[data-testid="password"]', 'password123')
  await page.click('[data-testid="login-button"]')
  
  await expect(page).toHaveURL('/dashboard')
  await expect(page.locator('h1')).toContainText('Dashboard')
  
  // Test API response
  const response = await page.waitForResponse('/api/user')
  expect(response.status()).toBe(200)
})

test('mobile responsive design', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 667 })
  await page.goto('/')
  
  await expect(page.locator('[data-testid="mobile-menu"]')).toBeVisible()
})`,
    codeLanguage: 'typescript'
  },
  {
    name: 'Jest',
    slug: 'jest',
    description:
      'Jest is my testing framework for unit and integration tests. I use it with React Testing Library for comprehensive frontend testing.',
    websiteUrl: 'https://jestjs.io/',
    codeSnippet: `import { jest } from '@jest/globals'
import { render, screen, fireEvent } from '@testing-library/react'
import { LoginForm } from './LoginForm'

describe('LoginForm', () => {
  const mockOnSubmit = jest.fn()

  beforeEach(() => {
    mockOnSubmit.mockClear()
  })

  it('submits form with correct data', () => {
    render(<LoginForm onSubmit={mockOnSubmit} />)
    
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' }
    })
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'password123' }
    })
    
    fireEvent.click(screen.getByRole('button', { name: /log in/i }))
    
    expect(mockOnSubmit).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123'
    })
  })
})`,
    codeLanguage: 'typescript'
  },
  {
    name: 'React Testing Library',
    slug: 'testinglibrary',
    description:
      'React Testing Library is my go-to for testing React components. It encourages testing behaviour rather than implementation details.',
    websiteUrl: 'https://testing-library.com/docs/react-testing-library/intro/',
    codeSnippet: `import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { UserList } from './UserList'

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false }
    }
  })
  
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}

test('loads and displays users', async () => {
  const user = userEvent.setup()
  
  render(<UserList />, { wrapper: createWrapper() })
  
  await waitFor(() => {
    expect(screen.getByText('John Doe')).toBeInTheDocument()
  })
  
  await user.click(screen.getByText('Add User'))
  expect(screen.getByRole('dialog')).toBeInTheDocument()
})`,
    codeLanguage: 'typescript'
  },
  {
    name: 'Redis',
    slug: 'redis',
    description:
      'I use Redis for caching, session storage, and real-time features. Its speed and versatility make it perfect for improving application performance.',
    websiteUrl: 'https://redis.io/',
    codeSnippet: `import Redis from 'ioredis'

const redis = new Redis(process.env.REDIS_URL)

export const cacheUser = async (userId: string, userData: any) => {
  await redis.setex(\`user:\${userId}\`, 3600, JSON.stringify(userData))
}

export const getCachedUser = async (userId: string) => {
  const cached = await redis.get(\`user:\${userId}\`)
  return cached ? JSON.parse(cached) : null
}

export const invalidateUserCache = async (userId: string) => {
  await redis.del(\`user:\${userId}\`)
}

// Session management
export const createSession = async (userId: string, sessionData: any) => {
  const sessionId = crypto.randomUUID()
  await redis.setex(\`session:\${sessionId}\`, 86400, JSON.stringify({
    userId,
    ...sessionData
  }))
  return sessionId
}`,
    codeLanguage: 'typescript'
  },
  {
    name: 'Prisma',
    slug: 'prisma',
    description:
      'Prisma is my preferred ORM for TypeScript projects. It provides type-safe database access and excellent developer experience with auto-completion.',
    websiteUrl: 'https://www.prisma.io/',
    codeSnippet: `// schema.prisma
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String
  posts     Post[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Post {
  id        String   @id @default(cuid())
  title     String
  content   String?
  author    User     @relation(fields: [authorId], references: [id])
  authorId  String
  createdAt DateTime @default(now())
}

// Usage
import { prisma } from './lib/prisma'

export const getUserWithPosts = async (userId: string) => {
  return await prisma.user.findUnique({
    where: { id: userId },
    include: {
      posts: {
        orderBy: { createdAt: 'desc' }
      }
    }
  })
}`,
    codeLanguage: 'typescript'
  },
  {
    name: 'WebSockets',
    slug: 'socketdotio',
    description:
      'I use WebSockets (often with Socket.IO) for real-time features like chat applications, live updates, and collaborative editing.',
    websiteUrl: 'https://socket.io/',
    codeSnippet: `import { Server } from 'socket.io'
import { createServer } from 'http'

const httpServer = createServer()
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
})

io.on('connection', (socket) => {
  console.log('User connected:', socket.id)
  
  socket.on('join-room', (roomId) => {
    socket.join(roomId)
    socket.to(roomId).emit('user-joined', socket.id)
  })
  
  socket.on('send-message', (data) => {
    socket.to(data.roomId).emit('receive-message', {
      message: data.message,
      senderId: socket.id,
      timestamp: new Date()
    })
  })
  
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id)
  })
})`,
    codeLanguage: 'typescript'
  },
  {
    name: 'GitHub Actions',
    slug: 'githubactions',
    description:
      'I use GitHub Actions for CI/CD pipelines, automated testing, and deployments. It seamlessly integrates with my development workflow.',
    websiteUrl: 'https://github.com/features/actions',
    codeSnippet: `name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run tests
        run: npm run test
      
      - name: Run E2E tests
        run: npm run test:e2e

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v3
      
      - name: Deploy to Railway
        run: |
          npm install -g @railway/cli
          railway deploy
        env:
          RAILWAY_TOKEN: \${{ secrets.RAILWAY_TOKEN }}`,
    codeLanguage: 'yaml'
  }
]

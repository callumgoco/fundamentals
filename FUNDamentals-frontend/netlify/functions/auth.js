const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

// In production, use environment variables
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production'

// Mock database - replace with your actual database connection
let users = [
  {
    id: 1,
    username: 'demo',
    email: 'demo@example.com',
    password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
    onboarding_completed: true,
    goal: 'Save for retirement',
    confidence: 7,
    learning_style: 'visual'
  }
]

exports.handler = async (event, context) => {
  const { path, httpMethod, body } = event
  
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
  }

  // Handle preflight requests
  if (httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    }
  }

  try {
    const data = JSON.parse(body || '{}')
    
    if (path.endsWith('/login')) {
      return handleLogin(data, headers)
    } else if (path.endsWith('/register')) {
      return handleRegister(data, headers)
    } else if (path.endsWith('/validate')) {
      return handleValidateToken(event, headers)
    } else if (path.endsWith('/onboarding')) {
      return handleOnboarding(data, event, headers)
    } else {
      return {
        statusCode: 404,
        headers,
        body: JSON.stringify({ error: 'Endpoint not found' })
      }
    }
  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal server error' })
    }
  }
}

function handleLogin(data, headers) {
  const { username, password } = data
  
  if (!username || !password) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: 'Username and password are required' })
    }
  }

  const user = users.find(u => u.username === username)
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return {
      statusCode: 401,
      headers,
      body: JSON.stringify({ error: 'Invalid username or password' })
    }
  }

  const token = jwt.sign(
    { userId: user.id, username: user.username },
    JWT_SECRET,
    { expiresIn: '24h' }
  )

  const { password: _, ...userWithoutPassword } = user

  return {
    statusCode: 200,
    headers,
    body: JSON.stringify({
      token,
      user: userWithoutPassword
    })
  }
}

function handleRegister(data, headers) {
  const { username, email, password } = data
  
  if (!username || !email || !password) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: 'Username, email, and password are required' })
    }
  }

  if (users.find(u => u.username === username)) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: 'Username already exists' })
    }
  }

  if (users.find(u => u.email === email)) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: 'Email already exists' })
    }
  }

  const hashedPassword = bcrypt.hashSync(password, 10)
  const newUser = {
    id: users.length + 1,
    username,
    email,
    password: hashedPassword,
    onboarding_completed: false,
    goal: '',
    confidence: 0,
    learning_style: ''
  }

  users.push(newUser)

  const token = jwt.sign(
    { userId: newUser.id, username: newUser.username },
    JWT_SECRET,
    { expiresIn: '24h' }
  )

  const { password: _, ...userWithoutPassword } = newUser

  return {
    statusCode: 201,
    headers,
    body: JSON.stringify({
      token,
      user: userWithoutPassword
    })
  }
}

function handleValidateToken(event, headers) {
  const authHeader = event.headers.authorization || event.headers.Authorization
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return {
      statusCode: 401,
      headers,
      body: JSON.stringify({ error: 'No token provided' })
    }
  }

  const token = authHeader.substring(7)
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET)
    const user = users.find(u => u.id === decoded.userId)
    
    if (!user) {
      return {
        statusCode: 401,
        headers,
        body: JSON.stringify({ error: 'User not found' })
      }
    }

    const { password: _, ...userWithoutPassword } = user

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ user: userWithoutPassword })
    }
  } catch (error) {
    return {
      statusCode: 401,
      headers,
      body: JSON.stringify({ error: 'Invalid token' })
    }
  }
}

function handleOnboarding(data, event, headers) {
  const authHeader = event.headers.authorization || event.headers.Authorization
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return {
      statusCode: 401,
      headers,
      body: JSON.stringify({ error: 'No token provided' })
    }
  }

  const token = authHeader.substring(7)
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET)
    const user = users.find(u => u.id === decoded.userId)
    
    if (!user) {
      return {
        statusCode: 401,
        headers,
        body: JSON.stringify({ error: 'User not found' })
      }
    }

    const { goal, confidence, learn } = data
    
    user.goal = goal
    user.confidence = confidence
    user.learning_style = learn
    user.onboarding_completed = true

    const { password: _, ...userWithoutPassword } = user

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        success: true,
        user: userWithoutPassword
      })
    }
  } catch (error) {
    return {
      statusCode: 401,
      headers,
      body: JSON.stringify({ error: 'Invalid token' })
    }
  }
}
